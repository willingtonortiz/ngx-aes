import { Injectable } from '@angular/core';
import { EventsHandler, EventHandler } from 'ngx-aes';

import { FirstPageLoaded } from './first-page-loaded.event';

@Injectable()
@EventsHandler(FirstPageLoaded)
export class FirstPageLoadedHandler implements EventHandler<FirstPageLoaded> {
  handle(event: FirstPageLoaded) {
    console.log('[FirstPageLoadedHandler]', event);
  }
}
