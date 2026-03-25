import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../../../pipes';
import { ImageErrorDirective } from '../../../../directives';


@Component({
  selector: 'app-auth-side-layout',
  imports: [ImageErrorDirective, TranslatePipe],
  templateUrl: './auth-side-layout.html',
  styleUrl: './auth-side-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSideLayout {

}
