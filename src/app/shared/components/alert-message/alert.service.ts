import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { AlertMessage } from './alert-message.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  messageBroadcaster = new Subject<AlertMessage>();

  constructor() { }

  getMessageBroadcaster(): Observable<AlertMessage> {
    return this.messageBroadcaster.asObservable();
  }

  showMessage(message: string): void {
    this.messageBroadcaster.next(new AlertMessage(message));
  }

  showErrorMessage(message: string): void {
    this.messageBroadcaster.next(new AlertMessage(message, false));
  }

}
