import { Component, OnInit } from '@angular/core';
import { AesEventBus } from 'ngx-aes';

import { FirstPageLoaded } from '../../events';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
})
export class FirstPageComponent implements OnInit {
  constructor(private readonly eventBus: AesEventBus) {}

  ngOnInit(): void {
    this.eventBus.publish(new FirstPageLoaded());
  }
}
