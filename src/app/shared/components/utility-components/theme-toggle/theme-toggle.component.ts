import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemePreference, ThemeService } from '../../../../core/services/theme.service';

interface ThemeOption {
  value: ThemePreference;
  label: string;
  iconClass: string;
}

@Component({
  selector: 'app-theme-toggle',
  template: `
    <div class="fixed bottom-4 right-4 z-50">
      <div
        class="flex items-center gap-1 rounded-2xl border border-border bg-surface-elevated p-1 shadow-md"
      >
        @for (option of themeOptions; track option.value) {
          <button
            type="button"
            class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            [class.bg-primary]="isSelected(option.value)"
            [class.text-primary-foreground]="isSelected(option.value)"
            [class.text-muted]="!isSelected(option.value)"
            [attr.aria-label]="option.label"
            [attr.aria-pressed]="isSelected(option.value)"
            (click)="setTheme(option.value)"
          >
            <i [class]="option.iconClass" aria-hidden="true"></i>
            <span class="hidden sm:inline">{{ option.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly themeOptions: ThemeOption[] = [
    { value: 'light', label: 'Use light theme', iconClass: 'pi pi-sun' },
    { value: 'dark', label: 'Use dark theme', iconClass: 'pi pi-moon' },
    { value: 'system', label: 'Use system theme', iconClass: 'pi pi-desktop' },
  ];

  protected isSelected(option: ThemePreference): boolean {
    return this.themeService.preference() === option;
  }

  protected setTheme(option: ThemePreference): void {
    this.themeService.setPreference(option);
  }
}
