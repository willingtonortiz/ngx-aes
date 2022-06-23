import { Subject } from 'rxjs';

import { Event } from './event.interface';

export interface MessageSource<EventBase extends Event = Event> {
  bridgeEventsTo<T extends EventBase>(subject: Subject<T>): void;
}
