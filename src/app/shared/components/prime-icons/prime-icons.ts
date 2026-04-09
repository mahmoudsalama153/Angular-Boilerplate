import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-prime-icons',
  standalone: true,
  imports: [],
  templateUrl: './prime-icons.html',
  styleUrl: './prime-icons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeIcons {
  readonly icon = input.required<string>();
}
