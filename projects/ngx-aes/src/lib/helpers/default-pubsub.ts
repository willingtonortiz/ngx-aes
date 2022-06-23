import { Subject } from 'rxjs';
import { Event, EventPublisher, MessageSource } from '../interfaces';

export class DefaultPubSub<EventBase extends Event>
  implements EventPublisher<EventBase>, MessageSource<EventBase>
{
  constructor(private subject$: Subject<EventBase>) {}

  publish<T extends EventBase>(event: T): void {
    this.subject$.next(event);
  }

  bridgeEventsTo<T extends EventBase>(subject: Subject<T>): void {
    this.subject$ = subject as any;
  }
}
