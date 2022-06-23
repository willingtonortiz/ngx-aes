import { Injectable } from '@angular/core';
import { EventsHandler, EventHandler } from 'ngx-aes';

import { AppComponentLoaded } from './app-component-loaded.event';

@Injectable()
@EventsHandler(AppComponentLoaded)
export class AppComponentLoadedHandler
  implements EventHandler<AppComponentLoaded>
{
  handle(event: AppComponentLoaded) {
    console.log('[AppComponentLoadedHandler]', event);
  }
}
