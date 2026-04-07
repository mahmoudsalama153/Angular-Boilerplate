import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  imports: [],
  templateUrl: './layout-footer.component.html',
  styleUrl: './layout-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFooterComponent {
  protected readonly currentYear = computed(() => new Date().getFullYear());
}
