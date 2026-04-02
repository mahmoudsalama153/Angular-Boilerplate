import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TruncateTooltipDirective } from '../../../../core/directives/truncate-tooltip.directive';
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
      primary: 'border-primary-muted bg-primary-soft text-primary-strong',
      blue: 'border-info-muted bg-info-soft text-info-strong',
      fadedBlue: 'border-primary-muted bg-primary-soft text-primary-strong',
      red: 'border-danger-muted bg-danger-soft text-danger-strong',
      green: 'border-success-muted bg-success-soft text-success-strong',
      yellow: 'border-warning-muted bg-warning-soft text-warning-strong',
      indigo: 'border-violet-muted bg-violet-soft text-violet-strong',
      purple: 'border-violet-muted bg-violet-soft text-violet-strong',
      pink: 'border-rose-muted bg-rose-soft text-rose-strong',
      gray: 'border-border bg-surface-subtle text-foreground',
      orange: 'border-warning-muted bg-warning-soft text-warning-strong',
      fadeGreen: 'border-success-muted bg-success-soft text-success-strong',
      cloudBlue: 'border-info-muted bg-info-soft text-info-strong',
    };
    return colorMap[this.color()];
  }

  getEffectiveClasses(): string {
    return this.styleClass() + ' ' + this.getBadgeClasses();
  }
}
