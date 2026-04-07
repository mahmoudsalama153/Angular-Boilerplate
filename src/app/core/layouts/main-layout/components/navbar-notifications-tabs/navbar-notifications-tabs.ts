import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { INotification, INotificationItem } from '../../models/notifications.interface';
import { TimeAgoPipe } from '@app/shared/pipes';

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

  notificationItems = computed<INotificationItem[]>(() => {
    return [];
  });
  onNotificationClick(notification: INotificationItem) {
    this.notificationClick.emit(notification);
  }
}