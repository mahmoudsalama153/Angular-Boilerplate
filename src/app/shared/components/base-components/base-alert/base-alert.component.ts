import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { TColors } from '../../../interfaces';

@Component({
  selector: 'app-base-alert',
  standalone: true,
  imports: [],
  templateUrl: './base-alert.component.html',
  styleUrls: ['./base-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAlertComponent {
  title = input<string>('');
  message = input<string>('');
  color = input<TColors>('yellow');
  showClose = input<boolean>(true);
  readonly onClose = output<void>();

  private readonly alertClassesMap: Record<TColors, string> = {
    blue: 'border-info-muted bg-info-soft text-info-strong',
    yellow: 'border-warning-muted bg-warning-soft text-warning-strong',
    red: 'border-danger-muted bg-danger-soft text-danger-strong',
    fadedBlue: 'border-primary-muted bg-primary-soft text-primary-strong',
    green: 'border-success-muted bg-success-soft text-success-strong',
    indigo: 'border-violet-muted bg-violet-soft text-violet-strong',
    purple: 'border-violet-muted bg-violet-soft text-violet-strong',
    pink: 'border-rose-muted bg-rose-soft text-rose-strong',
    gray: 'border-border bg-surface-subtle text-foreground',
    orange: 'border-warning-muted bg-warning-soft text-warning-strong',
    primary: 'border-primary-muted bg-primary-soft text-primary-strong',
    fadeGreen: 'border-success-muted bg-success-soft text-success-strong',
    cloudBlue: 'border-info-muted bg-info-soft text-info-strong',
  };

  private readonly iconClassesMap: Record<TColors, string> = {
    blue: 'bg-info-soft text-info-strong',
    fadedBlue: 'bg-primary-soft text-primary',
    yellow: 'bg-warning-soft text-warning-strong',
    red: 'bg-danger-soft text-danger-strong',
    green: 'bg-success-soft text-success-strong',
    indigo: 'bg-violet-soft text-violet-strong',
    purple: 'bg-violet-soft text-violet-strong',
    pink: 'bg-rose-soft text-rose-strong',
    gray: 'bg-surface text-muted',
    orange: 'bg-warning-soft text-warning-strong',
    primary: 'bg-primary-soft text-primary',
    fadeGreen: 'bg-success-soft text-success-strong',
    cloudBlue: 'bg-info-soft text-info-strong',
  };

  private readonly iconMap: Record<TColors, string> = {
    blue: 'icon-info-circle',
    fadedBlue: 'border-slate-300 bg-slate-50 text-[#4767A5]',
    yellow: 'icon-info-circle',
    red: 'icon-error',
    green: 'icon-check-circle',
    indigo: 'icon-info-circle',
    purple: 'icon-info-circle',
    pink: 'icon-info-circle',
    gray: 'icon-info-circle',
    orange: 'icon-info-circle',
    primary: 'icon-info-circle',
    fadeGreen: 'icon-info-circle',
    cloudBlue: 'icon-info-circle',
  };

  alertClasses = computed(() => {
    const baseClasses = 'border p-4 flex items-start gap-4 rounded-xl mb-5 mx-auto animated fadeIn';
    return `${baseClasses} ${this.alertClassesMap[this.color()]}`;
  });

  iconClasses = computed(() => {
    const baseClasses = 'w-[32px] h-[32px] rounded-full grid place-content-center';
    return `${baseClasses} ${this.iconClassesMap[this.color()]}`;
  });

  iconName = computed(() => this.iconMap[this.color()]);

  onCloseClick() {
    this.onClose.emit();
  }
}
