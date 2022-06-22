import { Injectable } from '@angular/core';
import { v4 } from '@lukeed/uuid';
import { EventsHandler, IEventHandler } from 'ngx-aes';

import { FirstPageLoaded } from './first-page-loaded.event';

@Injectable()
@EventsHandler(FirstPageLoaded)
export class FirstPageLoadedHandler implements IEventHandler<FirstPageLoaded> {
  handle(event: FirstPageLoaded) {
    console.log('FirstPageLoadedHandler', v4());
  }
}
