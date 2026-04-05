import { effect, Injectable, signal } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private theme = signal<Theme>(Theme.LIGHT);
  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDarkTheme());
    });
  }

  isDarkTheme(): boolean {
    return this.theme() === Theme.DARK;
  }

  toggleTheme(): void {
    this.theme.update(theme => theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  }

  getTheme(): Theme {
    return this.theme();
  }
}
