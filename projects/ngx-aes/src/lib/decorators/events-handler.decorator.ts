import 'reflect-metadata';
import { v4 } from '@lukeed/uuid';

import { IEvent } from '../interfaces';
import { EVENTS_HANDLER_METADATA, EVENT_METADATA } from './constants';

export const EventsHandler = (...events: IEvent[]): ClassDecorator => {
  return (target: object) => {
    events.forEach((event) => {
      if (!Reflect.hasOwnMetadata(EVENT_METADATA, event)) {
        Reflect.defineMetadata(EVENT_METADATA, { id: v4() }, event);
      }
    });

    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  };
};
