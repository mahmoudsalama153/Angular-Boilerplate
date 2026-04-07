import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { ERoutes } from '../../../shared/enums/routes.enum';
import { AuthStore } from '@app/features/authentication/store/auth.store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated()) {
    return true;
  } else {
    return router.navigate(['/', ERoutes.anonymous]);
  }
};
