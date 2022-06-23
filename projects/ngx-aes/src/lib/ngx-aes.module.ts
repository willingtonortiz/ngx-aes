import {
  APP_INITIALIZER,
  Inject,
  ModuleWithProviders,
  NgModule,
  NgModuleRef,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  MODULE_CONFIG,
  NgxAesModuleConfig,
} from './interfaces/module-config.interface';
import { ExplorerService } from './services';
import { _CHECK_ROOT_SERVICES_GUARO, _ROOT_SERVICES_GUARD } from './tokens';
import { AesEventBus } from './event-bus';
import { AesActionBus } from './action-bus';

@NgModule({})
export class NgxAesRootModule {
  constructor(
    @Optional()
    @Inject(_ROOT_SERVICES_GUARD)
    guard: any
  ) {}
}

@NgModule({})
export class NgxAesFeatureModule {
  constructor(
    @Optional()
    @Inject(_CHECK_ROOT_SERVICES_GUARO)
    guard: any,
    @Inject(MODULE_CONFIG)
    config: NgxAesModuleConfig,
    actionBus: AesActionBus,
    eventBus: AesEventBus,
    moduleRef: NgModuleRef<any>
  ) {
    const { eventHandlers, actionHandlers, sagas } = config;

    actionBus.register(actionHandlers, moduleRef);
    eventBus.register(eventHandlers, moduleRef);
    eventBus.registerSagas(sagas, moduleRef);
  }
}

@NgModule({})
export class NgxAesModule {
  constructor() {}

  static forRoot(
    config: NgxAesModuleConfig = {}
  ): ModuleWithProviders<NgxAesModule> {
    return {
      ngModule: NgxAesRootModule,
      providers: [
        // Registering handlers
        config.actionHandlers ?? [],
        config.eventHandlers ?? [],
        config.sagas ?? [],

        AesEventBus,
        AesActionBus,
        ExplorerService,
        { provide: MODULE_CONFIG, useValue: config },
        {
          provide: _ROOT_SERVICES_GUARD,
          useFactory: _provideForRootGuard,
          deps: [
            [AesEventBus, new Optional(), new SkipSelf()],
            [AesActionBus, new Optional(), new SkipSelf()],
          ],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [ExplorerService, AesActionBus, AesEventBus, NgModuleRef],
          multi: true,
        },
      ],
    };
  }

  static forFeature(
    config: NgxAesModuleConfig = {}
  ): ModuleWithProviders<NgxAesModule> {
    return {
      ngModule: NgxAesFeatureModule,
      providers: [
        // Registering handlers
        config.actionHandlers ?? [],
        config.eventHandlers ?? [],
        config.sagas ?? [],

        { provide: MODULE_CONFIG, useValue: config },
        {
          provide: _CHECK_ROOT_SERVICES_GUARO,
          useFactory: _initializeFeatureGuard,
          deps: [AesActionBus, AesEventBus],
          multi: true,
        },
      ],
    };
  }
}

function appInitializerFactory(
  explorerService: ExplorerService,
  actionBus: AesActionBus,
  eventBus: AesEventBus,
  moduleRef: NgModuleRef<any>
) {
  return () => {
    const { actions, events, sagas } = explorerService.explore();

    actionBus.register(actions, moduleRef);
    eventBus.register(events, moduleRef);
    eventBus.registerSagas(sagas, moduleRef);
  };
}

function _provideForRootGuard(actionBus: AesActionBus, eventBus: AesEventBus) {
  if (actionBus || eventBus) {
    throw new TypeError(
      `NgxAesModule.forRoot() called twice. Feature modules should use NgxAesModule.forFeature() instead.`
    );
  }
  return 'guard';
}

function _initializeFeatureGuard(
  actionBus: AesActionBus,
  eventBus: AesEventBus
) {
  if (!actionBus || !eventBus) {
    throw new TypeError(
      `No provider for EventBus. NgxAesModule.forRoot() should be called before`
    );
  }

  return 'guard';
}
