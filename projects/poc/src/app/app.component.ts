import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBus } from 'ngx-aes';

import { AppComponentLoaded } from './events/app-component-loaded.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly eventBus: EventBus
  ) {}

  ngOnInit(): void {
    this.eventBus.publish(new AppComponentLoaded());
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
