import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { type Observable, catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthApiService } from '../../api/auth/auth-api-service';
import {
  IAuthData,
  IRegisterRequest,
  IResetPasswordRequest,
} from '../../interfaces/auth.interface';
import { LocalStorage } from '../../services/local-storage/local-storage';

const initialState: {
  authResponse: IAuthData | null;
  loading: boolean;
} = {
  authResponse: null,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    return {
      isAuthenticated: computed(() => store.authResponse() !== null),
    };
  }),
  withMethods((store) => {
    const authApiService = inject(AuthApiService);
    const localStorage = inject(LocalStorage);

    return {
      login(email: string, password: string): Observable<IAuthData> {
        patchState(store, { loading: true });
        return this.handleLoginMethod(authApiService.login(email, password));
      },

      updateAuthDataInStorage(authResponse: IAuthData): void {
        patchState(store, {
          authResponse: authResponse,
        });
        localStorage.saveAuthDataToStorage(authResponse);
      },

      handleLoginMethod(login$: Observable<IAuthData>): Observable<IAuthData> {
        return login$.pipe(
          switchMap((response: IAuthData) => {
            this.updateAuthDataInStorage(response);
            return of(response);
          }),
          finalize(() => {
            patchState(store, { loading: false });
          }),
        );
      },

      register(registerRequest: IRegisterRequest): Observable<IAuthData> {
        patchState(store, { loading: true });
        return authApiService.register(registerRequest).pipe(
          finalize(() => {
            patchState(store, { loading: false });
          }),
        );
      },

      resetPassword(request: IResetPasswordRequest): Observable<IAuthData> {
        patchState(store, { loading: true });
        return authApiService.resetPassword(request).pipe(
          finalize(() => {
            patchState(store, { loading: false });
          }),
        );
      },

      forgotPassword(email: string): Observable<void> {
        patchState(store, { loading: true });
        return authApiService.forgotPassword(email).pipe(
          finalize(() => {
            patchState(store, { loading: false });
          }),
        );
      },

      resentVerifyEmail(email: string): Observable<void> {
        patchState(store, { loading: true });
        return authApiService.resendVerifyEmail(email).pipe(
          finalize(() => {
            patchState(store, { loading: false });
          }),
        );
      },

      verifyEmail(token: string): Observable<void> {
        patchState(store, { loading: true });
        return authApiService.verifyEmail(token).pipe(
          catchError((error: HttpErrorResponse) => {
            const errors = error.error.errors;
            return throwError(() => new Error(errors));
          }),
          finalize(() => {
            console.log('finalize');
            patchState(store, { loading: false });
          }),
        );
      },
    };
  }),
);
