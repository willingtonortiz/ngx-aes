import { Type } from './type.interface';

import { IEventHandler } from './event-handler.interface';

export interface CqrsOptions {
  events: Type<IEventHandler>[];
}
