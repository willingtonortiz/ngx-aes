import { Injectable, NgModuleRef, OnDestroy } from '@angular/core';
import { filter, from, mergeMap, Observable, Subscription } from 'rxjs';

import { EVENTS_HANDLER_METADATA } from './decorators';

import {
  defaultGetEventId,
  DefaultPubSub,
  defaultReflectEventId,
} from './helpers';
import {
  IEvent,
  IEventBus,
  IEventHandler,
  IEventPublisher,
  Type,
} from './interfaces';
import { ObservableBus } from './utils';

export type EventHandlerType<EventBase extends IEvent> = Type<
  IEventHandler<EventBase>
>;

@Injectable()
export class EventBus<EventBase extends IEvent = IEvent>
  extends ObservableBus<EventBase>
  implements IEventBus<EventBase>, OnDestroy
{
  protected getEventId: (event: EventBase) => string | null;
  protected readonly subscriptions: Subscription[];
  private _publisher!: IEventPublisher<EventBase>;

  constructor() {
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

  bind(handler: IEventHandler<EventBase>, id: string) {
    const stream$ = id ? this.ofEventId(id) : this.subject$;
    const subscription = stream$
      .pipe(mergeMap((event) => from(Promise.resolve(handler.handle(event)))))
      .subscribe({
        error: (error) => {
          console.log(
            `"${handler.constructor.name}" has thrown an error.`,
            error
          );
          throw error;
        },
      });

    this.subscriptions.push(subscription);
  }

  register(
    handlers: EventHandlerType<EventBase>[] = [],
    moduleRef: NgModuleRef<any>
  ) {
    handlers.forEach((handler) => this.registerHandler(handler, moduleRef));
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
        instance as IEventHandler<EventBase>,
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

  get publisher(): IEventPublisher<EventBase> {
    return this._publisher;
  }

  set publisher(publisher: IEventPublisher<EventBase>) {
    this._publisher = publisher;
  }
}
