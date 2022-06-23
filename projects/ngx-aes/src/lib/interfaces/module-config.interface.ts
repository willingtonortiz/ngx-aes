import { InjectionToken } from '@angular/core';

import { Type } from './type.interface';
import { ActionHandler } from './actions/action-handler.interface';
import { EventHandler } from './events/event-handler.interface';
import { Event } from './events/event.interface';
import { Action } from './actions/action.interface';

export const MODULE_CONFIG = new InjectionToken<NgxAesModuleConfig>(
  'MODULE_CONFIG'
);

export interface NgxAesModuleConfig {
  eventHandlers?: Type<EventHandler<Event>>[];
  actionHandlers?: Type<ActionHandler<Action>>[];
  sagas?: Type<any>[];
}
