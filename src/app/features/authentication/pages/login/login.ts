import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginFormService } from '../../services/login-form/login-form';
import { SkeletonModule } from 'primeng/skeleton';
import { TrimOnBlurDirective } from '../../../../core/directives';
import { TranslatePipe } from '../../../../core/pipes';
import { BaseErrorComponent } from '../../../../shared/components/base-components/base-error/base-error.component';
import { BaseLabelComponent } from '../../../../shared/components/base-components/base-label/base-label.component';
import { PasswordToggleComponent } from '../../../../shared/components/form/password-toggle/password-toggle.component';
import { ERoutes } from '../../../../shared/enums/routes.enum';
import { I18nService } from '../../../../shared/services/i18n';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import { AuthStore } from '@app/features/authentication/store/auth.store';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    RouterModule,
    BaseLabelComponent,
    BaseErrorComponent,
    TranslatePipe,
    TrimOnBlurDirective,
    PasswordToggleComponent,
    SkeletonModule,
  ],
  providers: [LoginFormService],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginFormService = inject(LoginFormService);
  authStore = inject(AuthStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toast = inject(ToasterService);
  i18nService = inject(I18nService);

  showResendVerification = signal<boolean>(false);
  unverifiedEmail = signal<string | null>(null);

  loginForm = this.loginFormService.loginForm;

  publicLogin() {
    // if (this.loginForm.valid) {
    //   const formValue = this.loginForm.value;
    //   this.authStore.login(formValue.email!, formValue.password!).subscribe({
    //     next: (response) => {
    //       const isUnverifiedEmail = response?.isEmailVerified === false;
    //       if (isUnverifiedEmail) {
    //         this.toast.error(this.i18nService.translate('auth.login.verifyEmailFirst'));
    //         this.unverifiedEmail.set(formValue.email!);
    //         this.showResendVerification.set(true);
    //         return;
    //       }
    //       if (response.success) {
    //         this.showResendVerification.set(false);
    //         this.unverifiedEmail.set(null);
    //         this.router.navigate(['/', ERoutes.dashboard]);
    //       }
    //     },
    //     error: (error) => {
    //       if (error.statusCode === 500) {
    //         this.toast.error(this.i18nService.translate('auth.login.generalError'));
    //       }
    //     },
    //   });
    // } else {
    //   this.loginForm.markAllAsTouched();
    // }
  }

  onCloseResendAlert() {
    this.router.navigate(['/', ERoutes.auth, ERoutes.login], {
      replaceUrl: true,
    });
  }

  onGoToVerification() {
    const email = this.unverifiedEmail();
    if (!email) {
      return;
    }

    this.router.navigate(['/', ERoutes.auth, ERoutes.verification], {
      queryParams: { email, autoResend: '1' },
    });
  }
}
