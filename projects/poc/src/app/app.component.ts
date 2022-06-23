import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AesActionBus } from 'ngx-aes';

import { LoadAppComponent } from './aes/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly actionBus: AesActionBus
  ) {}

  ngOnInit(): void {
    this.actionBus.execute(new LoadAppComponent());
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
