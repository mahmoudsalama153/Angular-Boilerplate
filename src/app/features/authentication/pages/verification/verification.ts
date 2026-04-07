import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ResetButton } from '../../components/reset-button/reset-button';
import { TranslatePipe } from '../../../../shared/pipes';
import { ERoutes } from '../../../../shared/enums/routes.enum';
import { I18nService } from '../../../../shared/services/i18n';
import { ToasterService } from '../../../../shared/services/toaster/toaster.service';
import { AuthStore } from '@app/features/authentication/store/auth.store';
@Component({
  selector: 'app-verification',
  imports: [ButtonModule, TranslatePipe, ResetButton],
  templateUrl: './verification.html',
  styleUrl: './verification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Verification implements OnInit {
  authStore = inject(AuthStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toast = inject(ToasterService);
  i18nService = inject(I18nService);

  email = signal<string | null>(null);
  isButtonLoading = signal(false);
  resendSuccessToken = 0;

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const emailParam = queryParams.get('email');
    const shouldAutoResend = queryParams.get('autoResend') === '1';

    if (emailParam) {
      this.email.set(emailParam);

      if (shouldAutoResend) {
        this.resendVerificationEmail();
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { autoResend: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    }
  }

  resendVerificationEmail() {
    // const email = this.email();
    // if (email) {
    //   this.isButtonLoading.set(true);
    //   this.authStore.resentVerifyEmail(email)
    //     .pipe(finalize(() => this.isButtonLoading.set(false)))
    //     .subscribe({
    //       next: (response) => {
    //         // if (response.statusCodeK === 200 || response.statusCode === 201) {
    //           this.toast.success(this.i18nService.translate('auth.login.resendVerificationSuccess'));
    //           this.resendSuccessToken++;
    //         // }
    //       },
    //       error: (error) => {
    //         console.error('Resend verification email error:', error);
    //       },
    //     });
    // }
  }

  onBackToLogin() {
    this.router.navigate(['/', ERoutes.auth, ERoutes.login]);
  }
}
