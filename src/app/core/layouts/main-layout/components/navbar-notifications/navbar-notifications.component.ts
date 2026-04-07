import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  signal,
  OnDestroy,
  HostListener,
  viewChild,
} from '@angular/core';
import { NavbarNotificationsTabs } from '@app/core/layouts/main-layout/components/navbar-notifications-tabs/navbar-notifications-tabs';
import { INotification } from '@app/core/layouts/main-layout/models/notifications.interface';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-navbar-notifications',
  imports: [
    ButtonModule,
    OverlayBadgeModule,
    BadgeModule,
    MenuModule,
    PopoverModule,
    NavbarNotificationsTabs,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar-notifications.component.html',
  styleUrl: './navbar-notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNotificationsComponent implements OnDestroy {
  private readonly notificationsModal = viewChild<Popover>('notificationsModal');

  readonly notifications = signal<INotification[]>([]);
  readonly unreadCount = signal(0);
  readonly isLoading = signal(false);
  readonly totalCount = signal(0);
  readonly isShowPreviousButtonClicked = signal(false);
  private isPopoverOpen = false;

  toggleNotificationTab(event: Event): void {
    const popover = this.notificationsModal();
    if (!popover) return;

    popover.toggle(event);
  }

  loadNotifications(): void {
    return;
  }

  onPopoverShow(): void {
    this.isPopoverOpen = true;
  }

  onPopoverHide(): void {
    this.isPopoverOpen = false;
  }

  markAllAsRead(): void {
    return;
  }

  onScroll(_event: Event): void {
    void _event;
  }

  onNotificationClick(_event: unknown): void {
    void _event;
  }

  loadPreviousNotifications(): void {
    this.isShowPreviousButtonClicked.set(true);
  }

  @HostListener('window:resize')
  onViewportChange(): void {
    if (!this.isPopoverOpen) return;
    this.repositionPopover();
  }

  private repositionPopover(): void {
    const popover = this.notificationsModal();
    if (!popover) return;

    // PrimeNG API differs across versions; try the common reposition methods.
    const anyPopover = popover as unknown as {
      align?: () => void;
      updatePosition?: () => void;
      hide?: () => void;
    };

    if (typeof anyPopover.align === 'function') {
      anyPopover.align();
      return;
    }

    if (typeof anyPopover.updatePosition === 'function') {
      anyPopover.updatePosition();
      return;
    }

    anyPopover.hide?.();
  }

  ngOnDestroy(): void {
    this.isPopoverOpen = false;
  }
}
