import { Injectable } from '@angular/core';
import { v4 } from '@lukeed/uuid';
import { EventsHandler, IEventHandler } from 'ngx-aes';

import { AppComponentLoaded } from './app-component-loaded.event';

@Injectable()
@EventsHandler(AppComponentLoaded)
export class AppComponentLoadedHandler
  implements IEventHandler<AppComponentLoaded>
{
  handle(event: AppComponentLoaded) {
    console.log('AppComponentLoadedHandler', v4());
  }
}
