import { Type } from './type.interface';

import { ActionHandler } from './actions/action-handler.interface';
import { EventHandler } from './events/event-handler.interface';

export interface CqrsOptions {
  actions: Type<ActionHandler>[];
  events: Type<EventHandler>[];
  sagas: Type<any>[];
}
