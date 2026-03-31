import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStore } from '../../../shared/stores/auth/auth.store';
import { ERoutes } from '../../../shared/enums/routes.enum';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated()) {
    return true;
  } else {
    return router.navigate(['/', ERoutes.anonymous]);
  }
};
