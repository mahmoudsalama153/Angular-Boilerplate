import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PopoverModule } from 'primeng/popover';


@Component({
  selector: 'app-navbar-notifications',
  imports: [
    ButtonModule,
    OverlayBadgeModule,
    BadgeModule,
    MenuModule,
    PopoverModule,
  ],
  templateUrl: './navbar-notifications.component.html',
  styleUrl: './navbar-notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNotificationsComponent {
}
