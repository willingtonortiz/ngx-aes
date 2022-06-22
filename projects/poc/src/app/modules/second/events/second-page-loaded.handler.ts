import { Injectable } from '@angular/core';
import { EventsHandler, IEventHandler } from 'ngx-aes';
import { v4 } from '@lukeed/uuid';

import { SecondPageLoaded } from './second-page-loaded.event';

@Injectable()
@EventsHandler(SecondPageLoaded)
export class SecondPageLoadedHandler
  implements IEventHandler<SecondPageLoaded>
{
  handle(event: SecondPageLoaded) {
    console.log('SecondPageLoadedHandler', v4());
  }
}
