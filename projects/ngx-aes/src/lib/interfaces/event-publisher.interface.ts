import { IEvent } from './event.interface';

export interface IEventPublisher<EventBase extends IEvent = IEvent> {
  publish<T extends EventBase>(event: T): void;
  publishAll?<T extends EventBase = EventBase>(events: T[]): void;
}
