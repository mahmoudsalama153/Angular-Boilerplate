import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@app/shared/pipes';
import { NavbarThemeToggle } from '@app/core/layouts/main-layout/components/NavbarThemeToggle/NavbarThemeToggle';

@Component({
  selector: 'app-auth-side-layout',
  imports: [TranslatePipe, NavbarThemeToggle],
  templateUrl: './auth-side-layout.html',
  styleUrl: './auth-side-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSideLayout {}
