import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAesModule } from 'ngx-aes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponentLoadedHandler } from './aes/events';
import { LoadAppComponentHandler, SendEmailHandler } from './aes/actions';
import { AppComponentSagas } from './aes/sagas/app-component.saga';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAesModule.forRoot({
      actionHandlers: [LoadAppComponentHandler, SendEmailHandler],
      eventHandlers: [AppComponentLoadedHandler],
      sagas: [AppComponentSagas],
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
