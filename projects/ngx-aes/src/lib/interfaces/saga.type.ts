import { Observable } from 'rxjs';

import { Action } from './actions/action.interface';
import { Event } from './events/event.interface';

export type Saga<
  EventBase extends Event = Event,
  ActionBase extends Action = Action
> = (events$: Observable<EventBase>) => Observable<ActionBase>;
