import { Inject, Injectable } from '@angular/core';

import { CqrsOptions } from '../interfaces';
import {
  MODULE_CONFIG,
  NgxAesModuleConfig,
} from '../interfaces/module-config.interface';

@Injectable()
export class ExplorerService {
  constructor(
    @Inject(MODULE_CONFIG)
    private readonly config: NgxAesModuleConfig
  ) {}

  explore(): CqrsOptions {
    const events = this.config.eventHandlers ?? [];
    return { events };
  }
}
