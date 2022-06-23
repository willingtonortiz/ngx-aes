import { Event } from './event.interface';

export interface EventPublisher<EventBase extends Event = Event> {
  publish<T extends EventBase>(event: T): void;
  publishAll?<T extends EventBase = EventBase>(events: T[]): void;
}
