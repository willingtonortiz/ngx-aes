import { Injectable } from '@angular/core';
import { ActionsHandler, ActionHandler, AesEventBus } from 'ngx-aes';
import { AppComponentLoaded } from '../events';

import { LoadAppComponent } from './load-app-component.action';

@Injectable()
@ActionsHandler(LoadAppComponent)
export class LoadAppComponentHandler
  implements ActionHandler<LoadAppComponent>
{
  constructor(private readonly eventBus: AesEventBus) {}

  async execute(action: LoadAppComponent): Promise<any> {
    console.log('[LoadAppComponentHandler]', action);

    this.eventBus.publish(new AppComponentLoaded());
  }
}
