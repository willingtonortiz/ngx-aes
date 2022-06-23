import { EVENT_METADATA } from '../decorators';
import { Event, Type } from '../interfaces';

export const defaultGetEventId = <EventBase extends Event = Event>(
  event: EventBase
): string => {
  const { constructor } = Object.getPrototypeOf(event);
  return Reflect.getMetadata(EVENT_METADATA, constructor)?.id ?? null;
};

export const defaultReflectEventId = <
  EventBase extends Type<Event> = Type<Event>
>(
  event: EventBase
): string => {
  return Reflect.getMetadata(EVENT_METADATA, event).id;
};
