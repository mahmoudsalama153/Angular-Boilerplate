import { effect, Injectable, signal } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const LOCAL_STORAGE_THEME_KEY = 'app-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private theme = signal<Theme>(this.getStoredTheme());

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDarkTheme());
    });
  }

  private getStoredTheme(): Theme {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;

    if (storedTheme === Theme.DARK || storedTheme === Theme.LIGHT) {
      return storedTheme;
    }

    return Theme.LIGHT;
  }

  private storeTheme(theme: Theme): void {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }

  isDarkTheme(): boolean {
    return this.theme() === Theme.DARK;
  }

  toggleTheme(): void {
    this.theme.update((theme) => {
      const nextTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      this.storeTheme(nextTheme);
      return nextTheme;
    });
  }

  getTheme(): Theme {
    return this.theme();
  }
}
