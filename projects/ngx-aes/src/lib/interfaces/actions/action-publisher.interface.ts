import { Action } from './action.interface';

export interface ActionPublisher<ActionBase extends Action = Action> {
  publish<T extends ActionBase = ActionBase>(action: T): any;
}
