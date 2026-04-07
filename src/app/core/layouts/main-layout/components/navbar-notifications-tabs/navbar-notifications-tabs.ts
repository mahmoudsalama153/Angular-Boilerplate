import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TimeAgoPipe } from '../../../../pipes';
import { INotification, INotificationItem } from '../../models/notifications.interface';
import { NotificationItemFactory } from '@app/core/layouts/main-layout/components/navbar-notifications/notification-item.factory';

@Component({
  selector: 'app-navbar-notifications-tabs',
  imports: [TimeAgoPipe, ProgressSpinnerModule],
  templateUrl: './navbar-notifications-tabs.html',
  styleUrl: './navbar-notifications-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNotificationsTabs {
  notifications = input<INotification[]>();
  loading = input<boolean>();
  readonly notificationClick = output<INotificationItem>();

  onNotificationClick(notification: INotificationItem) {
    const notificationToEmit = NotificationItemFactory.create(notification);
    this.notificationClick.emit(notificationToEmit);
  }
}
