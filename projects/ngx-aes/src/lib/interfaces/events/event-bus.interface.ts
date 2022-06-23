import { Event } from './event.interface';

export interface EventBus<EventBase extends Event = Event> {
  publish<T extends EventBase>(event: T): void;
  publishAll(events: EventBase[]): void;
}
