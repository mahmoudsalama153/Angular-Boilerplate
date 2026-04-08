import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@app/shared/pipes';

@Component({
  selector: 'app-auth-side-layout',
  imports: [TranslatePipe],
  templateUrl: './auth-side-layout.html',
  styleUrl: './auth-side-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSideLayout {}
