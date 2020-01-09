import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from './notification';

declare type NotificationType = 'success' | 'warning' | 'error';

@Injectable({providedIn: 'root'})
export class NotificationService {
  message$ = new Subject<Notification>();
  public notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  type: NotificationType;

  success(text: string) {
    this.message$.next(new Notification({type: 'success', text: text}));
  }

  warning(text: string) {
    this.message$.next(new Notification({type: 'warning', text: text}));
  }

  error(text: string) {
    this.message$.next(new Notification({type: 'error', text: text}));
  }

  open(type: string, text: string) {
    const notification: Notification = new Notification({type, text});
    const notifications: Notification[] = this.notifications$.getValue();
    notifications.push(notification);
    this.notifications$.next(notifications);
  }

  close(notification: Notification) {
    const newArray = this.notifications$.getValue().filter((kek: Notification) => {
      return  kek !== notification;
    });
    this.notifications$.next(newArray);
  }
}
