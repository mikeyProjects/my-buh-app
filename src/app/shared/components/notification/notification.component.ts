import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  type = 'success';
  text = '';
  timeToHide = 5000;

  constructor(
    private notificationService: NotificationService

  ) { }

  ngOnInit() {
    // this.notificationService.message$
    //   .subscribe((notification: Notification) => {
    //     this.type = notification.type;
    //     this.text = notification.text;
    //
    //     const timeout = setTimeout(() => {
    //       this.close();
    //       clearTimeout(timeout);
    //     }, this.timeToHide);
    //   });
  }

  close() {
    this.text = '';
  }
}
