import { Injectable, NgModuleRef, OnDestroy } from '@angular/core';
import { filter, from, mergeMap, Observable, Subscription } from 'rxjs';

import { AesActionBus } from './action-bus';
import { EVENTS_HANDLER_METADATA, SAGA_METADATA } from './decorators';
import { InvalidSagaException } from './exceptions';
import {
  defaultGetEventId,
  DefaultPubSub,
  defaultReflectEventId,
} from './helpers';
import {
  Event,
  EventHandler,
  EventPublisher,
  Type,
  EventBus,
  Saga,
} from './interfaces';
import { ObservableBus } from './utils';

const isFunction = (value: any) => typeof value === 'function';

export type EventHandlerType<EventBase extends Event> = Type<
  EventHandler<EventBase>
>;

@Injectable()
export class AesEventBus<EventBase extends Event = Event>
  extends ObservableBus<EventBase>
  implements EventBus<EventBase>, OnDestroy
{
  protected getEventId: (event: EventBase) => string | null;
  protected readonly subscriptions: Subscription[];
  private _publisher!: EventPublisher<EventBase>;

  constructor(private readonly actionBus: AesActionBus) {
    super();
    this.subscriptions = [];
    this.getEventId = defaultGetEventId;
    this.useDefaultPublisher();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  publish<T extends EventBase>(event: T): void {
    this._publisher.publish(event);
  }

  publishAll<T extends EventBase>(events: T[]): void {
    if (this._publisher.publishAll) {
      this._publisher.publishAll(events);
    }

    (events || []).map((event) => this._publisher.publish(event));
  }

  register(
    handlers: EventHandlerType<EventBase>[] = [],
    moduleRef: NgModuleRef<any>
  ) {
    handlers.forEach((handler) => this.registerHandler(handler, moduleRef));
  }

  bind(handler: EventHandler<EventBase>, id: string) {
    const stream$ = id ? this.ofEventId(id) : this.subject$;
    const subscription = stream$
      .pipe(mergeMap((event) => from(Promise.resolve(handler.handle(event)))))
      .subscribe({
        error: (error) => {
          console.error(
            `"${handler.constructor.name}" has thrown an error.`,
            error
          );
          throw error;
        },
      });

    this.subscriptions.push(subscription);
  }

  registerSagas(types: Type<unknown>[] = [], moduleRef: NgModuleRef<any>) {
    const sagas = types
      .map((target) => {
        const metadata = Reflect.getMetadata(SAGA_METADATA, target) || [];
        const instance = moduleRef.injector.get(target);
        if (!instance) {
          throw new InvalidSagaException();
        }
        return metadata.map((key: string) => instance[key].bind(instance));
      })
      .reduce((a, b) => a.concat(b), []);

    sagas.forEach((saga: Saga<EventBase>) => this.registerSaga(saga));
  }

  protected registerSaga(saga: Saga<EventBase>) {
    if (!isFunction(saga)) {
      throw new InvalidSagaException();
    }

    const stream$ = saga(this.subject$);
    if (!(stream$ instanceof Observable)) {
      throw new InvalidSagaException();
    }

    const subscription = stream$
      .pipe(
        filter((e) => !!e),
        mergeMap((action) => from(this.actionBus.execute(action)))
      )
      .subscribe({
        error: (error) => {
          console.error(
            `Action handler which execution was triggered by Saga has thrown an error.`,
            error
          );
          throw error;
        },
      });
    this.subscriptions.push(subscription);
  }

  protected registerHandler(
    handler: EventHandlerType<EventBase>,
    moduleRef: NgModuleRef<any>
  ) {
    const instance = moduleRef.injector.get(handler);

    if (!instance) {
      return;
    }

    const events = this.reflectEvents(handler);
    events.map((event) =>
      this.bind(
        instance as EventHandler<EventBase>,
        defaultReflectEventId(event)
      )
    );
  }

  protected reflectEvents(
    handler: EventHandlerType<EventBase>
  ): FunctionConstructor[] {
    return Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
  }

  protected ofEventId(id: string) {
    return this.subject$.pipe(filter((event) => this.getEventId(event) === id));
  }

  private useDefaultPublisher(): void {
    this._publisher = new DefaultPubSub<EventBase>(this.subject$);
  }

  get stream(): Observable<EventBase> {
    return this.subject$.asObservable();
  }

  get publisher(): EventPublisher<EventBase> {
    return this._publisher;
  }

  set publisher(publisher: EventPublisher<EventBase>) {
    this._publisher = publisher;
  }
}
