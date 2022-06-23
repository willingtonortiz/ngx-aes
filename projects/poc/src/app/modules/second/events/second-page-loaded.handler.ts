import { Injectable } from '@angular/core';
import { EventsHandler, EventHandler } from 'ngx-aes';

import { SecondPageLoaded } from './second-page-loaded.event';

@Injectable()
@EventsHandler(SecondPageLoaded)
export class SecondPageLoadedHandler implements EventHandler<SecondPageLoaded> {
  handle(event: SecondPageLoaded) {
    console.log('[SecondPageLoadedHandler]', event);
  }
}
