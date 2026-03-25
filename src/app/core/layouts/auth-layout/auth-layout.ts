import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthSideLayout } from './components/auth-side-layout/auth-side-layout';
import { ImageErrorDirective } from '../../directives';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    AuthSideLayout,
    ImageErrorDirective,
  ],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {

}
