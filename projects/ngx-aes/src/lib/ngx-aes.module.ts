import {
  APP_INITIALIZER,
  Inject,
  ModuleWithProviders,
  NgModule,
  NgModuleRef,
  Optional,
  SkipSelf,
} from '@angular/core';
import { EventBus } from './event-bus';
import {
  MODULE_CONFIG,
  NgxAesModuleConfig,
} from './interfaces/module-config.interface';
import { ExplorerService } from './services';
import { _CHECK_ROOT_SERVICES_GUARO, _ROOT_SERVICES_GUARD } from './tokens';

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
    eventBus: EventBus,
    moduleRef: NgModuleRef<any>
  ) {
    const { eventHandlers: events } = config;
    eventBus.register(events, moduleRef);
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
        [EventBus],
        ExplorerService,
        config.eventHandlers ?? [],
        { provide: MODULE_CONFIG, useValue: config },
        {
          provide: _ROOT_SERVICES_GUARD,
          useFactory: _provideForRootGuard,
          deps: [[EventBus, new Optional(), new SkipSelf()]],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [ExplorerService, EventBus, NgModuleRef],
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
        config.eventHandlers ?? [],
        { provide: MODULE_CONFIG, useValue: config },
        {
          provide: _CHECK_ROOT_SERVICES_GUARO,
          useFactory: _initializeFeatureGuard,
          deps: [EventBus],
          multi: true,
        },
      ],
    };
  }
}

function appInitializerFactory(
  explorerService: ExplorerService,
  eventBus: EventBus,
  moduleRef: NgModuleRef<any>
) {
  return () => {
    const { events } = explorerService.explore();
    eventBus.register(events, moduleRef);
  };
}

function _provideForRootGuard(eventBus: EventBus) {
  if (eventBus) {
    throw new TypeError(
      `NgxAesModule.forRoot() called twice. Feature modules should use NgxAesModule.forFeature() instead.`
    );
  }
  return 'guard';
}

function _initializeFeatureGuard(eventBus: EventBus) {
  if (!eventBus) {
    throw new TypeError(
      `No provider for EventBus. NgxAesModule.forRoot() should be called before`
    );
  }

  return 'guard';
}
