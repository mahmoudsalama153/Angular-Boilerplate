import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemesService } from '../../../../../shared/services/themes/themes.service';

@Component({
  selector: 'app-navbar-theme-toggle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './NavbarThemeToggle.html',
  styleUrl: './NavbarThemeToggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarThemeToggle {
  private readonly themesService = inject(ThemesService);
  isDarkTheme = computed(() => this.themesService.isDarkTheme());
  toggleDarkMode(): void {
    this.themesService.toggleTheme();
  }
}
