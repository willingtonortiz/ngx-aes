import { EVENT_METADATA } from '../decorators';
import { IEvent, Type } from '../interfaces';

export const defaultGetEventId = <EventBase extends IEvent = IEvent>(
  event: EventBase
): string => {
  const { constructor } = Object.getPrototypeOf(event);
  return Reflect.getMetadata(EVENT_METADATA, constructor)?.id ?? null;
};

export const defaultReflectEventId = <
  EventBase extends Type<IEvent> = Type<IEvent>
>(
  event: EventBase
): string => {
  return Reflect.getMetadata(EVENT_METADATA, event).id;
};
