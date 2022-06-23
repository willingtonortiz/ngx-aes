import { Action } from './action.interface';

export interface ActionBus<ActionBase extends Action = Action> {
  execute<T extends ActionBase, R = any>(action: T): Promise<R>;
}
