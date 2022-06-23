import { Injectable } from '@angular/core';
import { ActionHandler, ActionsHandler, AesEventBus } from 'ngx-aes';

import { SendEmail } from './send-email.action';

@Injectable()
@ActionsHandler(SendEmail)
export class SendEmailHandler implements ActionHandler<SendEmail> {
  constructor(private readonly eventBus: AesEventBus) {}

  async execute(action: SendEmail): Promise<any> {
    console.log('[SendEmailHandler]', action);
  }
}
