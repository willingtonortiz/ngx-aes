import 'reflect-metadata';
import { Injectable, NgModuleRef } from '@angular/core';

import {
  Action,
  ActionBus,
  ActionHandler,
  ActionMetadata,
  ActionPublisher,
  Type,
} from './interfaces';
import { ObservableBus } from './utils';
import { ACTION_HANDLER_METADATA, ACTION_METADATA } from './decorators';
import {
  ActionHandlerNotFoundException,
  InvalidActionHandlerException,
} from './exceptions';
import { DefaultActionPubSub } from './helpers/default-action-pubsub';

export type ActionHandlerType = Type<ActionHandler<Action>>;

@Injectable()
export class AesActionBus<ActionBase extends Action = Action>
  extends ObservableBus<ActionBase>
  implements ActionBus<ActionBase>
{
  private handlers = new Map<string, ActionHandler<ActionBase>>();
  private _publisher!: ActionPublisher<ActionBase>;

  constructor() {
    super();
    this.useDefaultPublisher();
  }

  async execute<T extends ActionBase, R = any>(action: T): Promise<R> {
    const actionId = this.getActionId(action);
    const handler = this.handlers.get(actionId);

    if (!handler) {
      throw new ActionHandlerNotFoundException(actionId);
    }
    this.subject$.next(action);
    return handler.execute(action);
  }

  bind<T extends ActionBase>(handler: ActionHandler<T>, id: string) {
    this.handlers.set(id, handler);
  }

  register(handlers: ActionHandlerType[] = [], moduleRef: NgModuleRef<any>) {
    handlers.forEach((handler) => this.registerHandler(handler, moduleRef));
  }

  protected registerHandler(
    handler: ActionHandlerType,
    moduleRef: NgModuleRef<any>
  ) {
    const instance = moduleRef.injector.get(handler);
    if (!instance) {
      return;
    }

    const target = this.reflectActionId(handler);
    if (!target) {
      throw new InvalidActionHandlerException();
    }

    this.bind(instance as ActionHandler<ActionBase>, target);
  }

  private reflectActionId(handler: ActionHandlerType): string | undefined {
    const action: Type<Action> = Reflect.getMetadata(
      ACTION_HANDLER_METADATA,
      handler
    );
    const actionMetadata: ActionMetadata = Reflect.getMetadata(
      ACTION_METADATA,
      action
    );

    return actionMetadata.id;
  }

  private getActionId(action: ActionBase): string {
    const { constructor: actionType } = Object.getPrototypeOf(action);
    const actionMetadata: ActionMetadata = Reflect.getMetadata(
      ACTION_METADATA,
      actionType
    );

    if (!actionMetadata) {
      throw new ActionHandlerNotFoundException(actionType.name);
    }

    return actionMetadata.id;
  }

  useDefaultPublisher() {
    this._publisher = new DefaultActionPubSub<ActionBase>(this.subject$);
  }

  get publisher(): ActionPublisher<ActionBase> {
    return this._publisher;
  }

  set publisher(publisher: ActionPublisher<ActionBase>) {
    this._publisher = publisher;
  }
}
