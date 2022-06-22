import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAesModule } from 'ngx-aes';

import { SecondRoutingModule } from './second-routing.module';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { SecondPageLoadedHandler } from './events/second-page-loaded.handler';

@NgModule({
  imports: [
    CommonModule,
    SecondRoutingModule,
    NgxAesModule.forFeature({
      eventHandlers: [SecondPageLoadedHandler],
    }),
  ],
  declarations: [SecondPageComponent],
})
export class SecondModule {}
