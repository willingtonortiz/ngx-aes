import { Component, OnInit } from '@angular/core';
import { AesEventBus } from 'ngx-aes';

import { SecondPageLoaded } from '../../events/second-page-loaded.event';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
})
export class SecondPageComponent implements OnInit {
  constructor(private readonly eventBus: AesEventBus) {}

  ngOnInit(): void {
    this.eventBus.publish(new SecondPageLoaded());
  }
}
