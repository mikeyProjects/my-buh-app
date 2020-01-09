import { NotificationInterface } from '../../interfaces';

export class Notification {
  type: string;
  text: string;

  constructor(
    options: NotificationInterface
  ) {
    Object.assign(this, options);
  }
}
