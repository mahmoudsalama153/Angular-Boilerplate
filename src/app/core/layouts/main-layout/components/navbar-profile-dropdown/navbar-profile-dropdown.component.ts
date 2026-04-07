import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { Popover } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { ERoutes } from '@app/shared/enums/routes.enum';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

type ProfileDropdownAction = 'my-profile' | 'sign-out';

interface ProfileDropdownItem {
  readonly label: string;
  readonly icon: string;
  readonly action: ProfileDropdownAction;
}

@Component({
  selector: 'app-navbar-profile-dropdown',
  imports: [PopoverModule, AvatarModule],
  templateUrl: './navbar-profile-dropdown.component.html',
  styleUrl: './navbar-profile-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarProfileDropdownComponent {
  readonly isOpen = signal(false);
  readonly userName = signal('John Doe');
  readonly userTitle = signal('Product Manager');
  readonly userProfilePicture = signal('assets/images/user_placeholder.svg');

  private readonly router = inject(Router);

  dropdownItems = computed(() => {
    const items: MenuItem[] = [
      {
        label: 'My Profile',
        icon: 'icon-user',
        routerLink: [ERoutes.myProfile],
      },
    ];

    items.push({
      label: 'Sign Out',
      icon: 'icon-log-out',
      command: () => {
        this.router.navigate(['/', ERoutes.auth, ERoutes.login]);
      },
    });
    return items;
  });

  readonly profileItemSelected = output<ProfileDropdownAction>();

  private readonly profilePopover = viewChild<Popover>('profilePopover');

  executeItemCommand(item: MenuItem) {
    if (item.command) {
      item.command({ item, originalEvent: new MouseEvent('click') });
    }
    this.profilePopover()?.hide();
  }

  toggleProfilePopover(event: Event): void {
    if (!this.dropdownItems().length) return;
    this.profilePopover()?.toggle(event);
  }

  onPopoverShow(): void {
    this.isOpen.set(true);
  }

  onPopoverHide(): void {
    this.isOpen.set(false);
  }

  onDropdownItemClick(action: ProfileDropdownAction): void {
    this.profileItemSelected.emit(action);
    this.profilePopover()?.hide();
  }
}
