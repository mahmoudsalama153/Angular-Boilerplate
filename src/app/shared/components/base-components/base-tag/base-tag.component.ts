import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TruncateTooltipDirective } from '../../../../shared/directives/truncate-tooltip.directive';
import { TColors } from '../../../interfaces';

@Component({
  selector: 'app-base-tag',
  imports: [TagModule, TruncateTooltipDirective],
  templateUrl: './base-tag.component.html',
  styleUrl: './base-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTagComponent {
  color = input<TColors>('red');
  value = input<string>('');
  styleClass = input<string>('');
  maxChars = input<number>(30);
  disableTruncateTooltip = input<boolean>(false);

  getBadgeClasses(): string {
    const colorMap: Record<TColors, string> = {
      primary:
        'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-secondary)',
      blue: 'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-secondary)',
      fadedBlue:
        'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-tertiary)',
      red: 'border-(--p-border-error-subtle) bg-(--p-bg-error-primary) text-(--p-text-error-primary)',
      green:
        'border-(--p-border-subtle) bg-(--p-bg-success-primary) text-(--p-text-success-primary)',
      yellow:
        'border-(--p-border-subtle) bg-(--p-bg-warning-primary) text-(--p-text-warning-primary)',
      indigo: 'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-secondary)',
      purple: 'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-secondary)',
      pink: 'border-(--p-border-error-subtle) bg-(--p-bg-error-primary) text-(--p-text-error-primary)',
      gray: 'border-(--p-border-subtle) bg-(--p-bg-secondary) text-(--p-text-secondary)',
      orange:
        'border-(--p-border-subtle) bg-(--p-bg-warning-primary) text-(--p-text-warning-primary)',
      fadeGreen:
        'border-(--p-border-subtle) bg-(--p-bg-success-primary) text-(--p-text-success-primary)',
      cloudBlue:
        'border-(--p-border-brand) bg-(--p-bg-brand-primary) text-(--p-text-brand-secondary)',
    };
    return colorMap[this.color()];
  }

  getEffectiveClasses(): string {
    return this.styleClass() + ' ' + this.getBadgeClasses();
  }
}
