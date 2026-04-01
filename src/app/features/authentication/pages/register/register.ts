import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { PasswordPolicy } from '../../components/password-policy/password-policy';
import { RegisterFormService } from '../../services/register-form/register-form';
import { TrimOnBlurDirective } from '../../../../core/directives';
import { TranslatePipe } from '../../../../core/pipes';
import { BaseErrorComponent } from '../../../../shared/components/base-components/base-error/base-error.component';
import { BaseLabelComponent } from '../../../../shared/components/base-components/base-label/base-label.component';
import { PasswordToggleComponent } from '../../../../shared/components/form/password-toggle/password-toggle.component';
import { PhoneInputComponent } from '../../../../shared/components/form/phone-input/phone-input.component';
import { I18nService } from '../../../../shared/services/i18n';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import { AuthStore } from '../../../../shared/stores/auth/auth.store';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
    PasswordPolicy,
    BaseLabelComponent,
    BaseErrorComponent,
    TranslatePipe,
    PhoneInputComponent,
    TrimOnBlurDirective,
    PasswordToggleComponent,
  ],
  providers: [RegisterFormService],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerFormService = inject(RegisterFormService);
  registerForm = this.registerFormService.registerForm;
  authStore = inject(AuthStore);
  router = inject(Router);
  toast = inject(ToasterService);
  i18nService = inject(I18nService);

  onSubmit() {
    // if (this.registerForm.valid) {
    //   var formValue = this.registerForm.value;
    //   console.log(formValue);
    //   var request: IRegisterRequest = {
    //     fullName: formValue.fullName!,
    //     email: formValue.email!,
    //     password: formValue.password!,
    //     confirmPassword: formValue.password!,
    //     countryCode: formValue.phone?.countryCode!,
    //     phoneNumber: formValue.phone?.phoneNumber?.replace(/\s/g, '') || '',
    //   };
    //   this.authStore.register(request).subscribe({
    //     next: (response) => {
    //       if (response.success) {
    //         this.toast.success(response.message as unknown as string || this.i18nService.translate('auth.register.verificationSentSuccess'));
    //         this.router.navigate(['/', ERoutes.auth, ERoutes.verification], {
    //           queryParams: { email: this.registerForm.value.email! },
    //         });
    //       }
    //     },
    //     error: (error) => {
    //       if (error.status === 500) {
    //         this.toast.error(this.i18nService.translate('auth.register.generalError'));
    //       } else if (error.status === 400) {
    //         //route to login page when email already exists
    //         //TODO: enhance this error, currently it depends on bad request which may be diffrenet error
    //         this.router.navigate(['/', ERoutes.auth, ERoutes.login]);
    //       }
    //     },
    //   });
    // } else {
    //   this.registerForm.markAllAsTouched();
    // }
  }
}
