import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageErrorDirective } from '@app/shared/directives';
import { TranslatePipe } from '@app/shared/pipes';



@Component({
  selector: 'app-auth-side-layout',
  imports: [ImageErrorDirective, TranslatePipe],
  templateUrl: './auth-side-layout.html',
  styleUrl: './auth-side-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSideLayout {

}
