import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAesModule } from 'ngx-aes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponentLoadedHandler } from './events/app-component-loaded.handler';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAesModule.forRoot({
      eventHandlers: [AppComponentLoadedHandler],
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
