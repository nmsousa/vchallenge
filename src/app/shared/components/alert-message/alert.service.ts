import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  messageReceiver = new Subject<string>();

  constructor() { }

  getMessageBroadcaster(): Observable<string> {
    return this.messageReceiver.asObservable();
  }

  showMessage(message: string): void {
    this.messageReceiver.next(message);
  }

}
