import { InjectionToken } from '@angular/core';

import { IEventHandler } from './event-handler.interface';
import { IEvent } from './event.interface';
import { Type } from './type.interface';

export const MODULE_CONFIG = new InjectionToken<NgxAesModuleConfig>(
  'MODULE_CONFIG'
);

export interface NgxAesModuleConfig<EventBase extends IEvent = IEvent> {
  eventHandlers?: Type<IEventHandler<EventBase>>[];
}
