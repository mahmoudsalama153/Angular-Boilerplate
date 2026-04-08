import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { SidebarDropdownComponent } from '../sidebar-dropdown/sidebar-dropdown.component';
import { SidebarLinkComponent } from '../sidebar-link/sidebar-link.component';
import type { ISideBarLink } from './../../models/sidebar.interface';
import { ButtonModule } from 'primeng/button';
import { I18nService } from '../../../../../shared/services/i18n';

@Component({
  selector: 'app-sidebar-content',
  imports: [
    NgClass,
    SidebarLinkComponent,
    PanelModule,
    SidebarDropdownComponent,
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './sidebar-content.component.html',
  styleUrl: './sidebar-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContentComponent {
  private readonly i18nService = inject(I18nService);
  contactUsFormVisibility = signal(false);

  AddContactUsDialogVisible = signal<boolean>(false);
  sidebarDrawerVisibility = model(false);
  /** When true, show icons only (for mobile drawer collapsed state) */
  collapsed = input<boolean>(false);
  /** When provided, controlled mode (desktop sidebar) - use this for display instead of minimizedSidebarDrawer */
  expanded = input<boolean | null>(null);
  readonly onToggleCollapsed = output<void>();

  minimizedSidebarDrawer = model<boolean>(false);
  displayCollapsed = computed(() =>
    this.expanded() !== null && this.expanded() !== undefined
      ? !this.expanded()!
      : this.minimizedSidebarDrawer(),
  );

  /** LTR: expand=right, collapse=left. RTL: expand=left, collapse=right */
  sidebarToggleIcon = computed(() => {
    const collapsed = this.displayCollapsed();
    const rtl = this.i18nService.currentLanguage() === 'ar';
    if (collapsed) return rtl ? 'pi pi-arrow-left' : 'pi pi-arrow-right';
    return rtl ? 'pi pi-arrow-right' : 'pi pi-arrow-left';
  });

  /** Toggle button position: RTL uses left, LTR uses right */
  togglePositionClass = computed(() => {
    const rtl = this.i18nService.currentLanguage() === 'ar';
    return rtl ? 'left-[-30px]' : 'right-[-30px]';
  });

  sidebarLinks = computed<ISideBarLink[]>((): ISideBarLink[] => {
    // Access currentLanguage to make computed reactive to language changes
    this.i18nService.currentLanguage();

    return [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
        show: true,
      },
    ];
  });

  helpLink = computed<ISideBarLink>(() => {
    // Access currentLanguage to make computed reactive to language changes
    this.i18nService.currentLanguage();
    return {
      label: this.i18nService.translate('navigation.help'),
      icon: 'icon-help',
      routerLink: 'https://rmgsegypt.sharepoint.com/sites/PalantyrKB',
      external: true,
      show: true,
    };
  });

  closeSidebarDrawer() {
    this.sidebarDrawerVisibility.set(false);
  }

  toggleSidebarDrawerCollapsed() {
    if (this.expanded() !== null && this.expanded() !== undefined) {
      this.onToggleCollapsed.emit();
    } else {
      this.minimizedSidebarDrawer.set(!this.minimizedSidebarDrawer());
    }
  }
}
