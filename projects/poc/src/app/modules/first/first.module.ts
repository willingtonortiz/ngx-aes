import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAesModule } from 'ngx-aes';

import { FirstRoutingModule } from './first-routing.module';
import { FirstPageComponent } from './pages';
import { FirstPageLoadedHandler } from './events';

@NgModule({
  imports: [
    CommonModule,
    FirstRoutingModule,
    NgxAesModule.forFeature({
      eventHandlers: [FirstPageLoadedHandler],
    }),
  ],
  declarations: [FirstPageComponent],
})
export class FirstModule {}
