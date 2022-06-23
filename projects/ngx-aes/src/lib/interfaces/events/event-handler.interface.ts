import { Event } from './event.interface';

export interface EventHandler<T extends Event = any> {
  handle(event: T): any;
}
