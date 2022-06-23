import { Action } from './action.interface';

export interface ActionHandler<TAction extends Action = any, TResult = any> {
  execute(action: TAction): Promise<TResult>;
}
