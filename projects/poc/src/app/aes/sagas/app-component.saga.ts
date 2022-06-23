import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Action, ofType } from 'ngx-aes';
import { AppComponentLoaded } from '../events';
import { SendEmail } from '../actions';
import { Sagas } from '../../../../../ngx-aes/src/public-api';

@Injectable()
export class AppComponentSagas {
  @Sagas()
  appComponentLoaded = (events$: Observable<any>): Observable<Action> => {
    return events$.pipe(
      ofType(AppComponentLoaded),
      map((event) => new SendEmail())
    );
  };
}
