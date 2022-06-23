import { Subject } from 'rxjs';
import { Action, ActionPublisher } from '../interfaces';

export class DefaultActionPubSub<ActionBase extends Action>
  implements ActionPublisher<ActionBase>
{
  constructor(private subject$: Subject<ActionBase>) {}

  publish<T extends ActionBase = ActionBase>(action: T) {
    this.subject$.next(action);
  }
}
