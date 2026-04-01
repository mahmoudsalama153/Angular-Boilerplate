import { Injectable } from '@angular/core';
import { IAuthData } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private readonly AUTH_STORAGE_KEY = 'auth_data';

  saveAuthDataToStorage(authResponse: IAuthData): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(authResponse));
    }
  }

  getAuthData(): IAuthData | null {
    const stored = localStorage.getItem(this.AUTH_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as IAuthData) : null;
  }

  cleanAuthData() {
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
  }

  cleanAll() {
    this.cleanAuthData();
  }
}
