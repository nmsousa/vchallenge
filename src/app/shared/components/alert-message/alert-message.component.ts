import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  showAlert: boolean;
  message: string;
  isSuccess: boolean;
  timer: ReturnType<typeof setTimeout>;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // Waiting for broadcasted messages
    this.alertService.getMessageBroadcaster().subscribe(message => {
      this.message = message.message;
      this.isSuccess = message.success;
      this.showTimedAlert();
    });
  }

  showTimedAlert() {
    this.showAlert = true;
    // Stop the timer is it's already running
    // So every alert will be open for the full duration
    if (this.timer) {
      clearTimeout(this.timer);
    }
    // Closes after 3 secs
    this.timer = setTimeout(() => {
      this.showAlert = false;
      this.message = '';
    }, 3000);
  }

  closeAlert() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
