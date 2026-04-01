import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAuthData,
  IRegisterRequest,
  IResetPasswordRequest,
} from '../../interfaces/auth.interface';
import { API_ENDPOINTS } from '../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_ENDPOINTS.baseUrl;

  login(email: string, password: string): Observable<IAuthData> {
    return this.http.post<IAuthData>(`${this.baseUrl}/${API_ENDPOINTS.auth.login}`, {
      email,
      password,
    });
  }

  register(registerRequest: IRegisterRequest) {
    return this.http.post<any>(`${this.baseUrl}/${API_ENDPOINTS.auth.register}`, registerRequest);
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${API_ENDPOINTS.auth.forgotPassword}`, {
      email,
    });
  }

  resendVerifyEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${API_ENDPOINTS.auth.resendVerifyEmail}`, {
      email,
    });
  }

  resetPassword(request: IResetPasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${API_ENDPOINTS.auth.resetPassword}`, request);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${API_ENDPOINTS.auth.verifyEmail}?token=${token}`);
  }

  passwordResetTokenExpiry(token: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/${API_ENDPOINTS.auth.passwordResetTokenExpiry}`,
      {
        token,
      },
    );
  }
}
