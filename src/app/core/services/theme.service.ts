import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly STORAGE_KEY = 'app-theme-preference';

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly mediaQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  private readonly _preference = signal<ThemePreference>(this.getStoredPreference());
  readonly preference = this._preference.asReadonly();

  private readonly _systemTheme = signal<ThemeMode>(this.getSystemTheme());
  readonly systemTheme = this._systemTheme.asReadonly();

  readonly activeTheme = computed<ThemeMode>(() => {
    const preference = this._preference();
    return preference === 'system' ? this._systemTheme() : preference;
  });

  readonly isDark = computed(() => this.activeTheme() === 'dark');

  constructor() {
    this.bindSystemThemeListener();

    effect(() => {
      const preference = this._preference();
      const activeTheme = this.activeTheme();

      this.persistPreference(preference);
      this.applyTheme(activeTheme, preference);
    });
  }

  setPreference(preference: ThemePreference): void {
    this._preference.set(preference);
  }

  toggle(): void {
    const currentTheme = this.activeTheme();
    this._preference.set(currentTheme === 'dark' ? 'light' : 'dark');
  }

  private getStoredPreference(): ThemePreference {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'system';
    }

    const storedPreference = window.localStorage.getItem(ThemeService.STORAGE_KEY);

    if (
      storedPreference === 'light' ||
      storedPreference === 'dark' ||
      storedPreference === 'system'
    ) {
      return storedPreference;
    }

    return 'system';
  }

  private getSystemTheme(): ThemeMode {
    return this.mediaQuery?.matches ? 'dark' : 'light';
  }

  private persistPreference(preference: ThemePreference): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(ThemeService.STORAGE_KEY, preference);
  }

  private applyTheme(theme: ThemeMode, preference: ThemePreference): void {
    const root = this.document.documentElement;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-theme-preference', preference);
    root.style.colorScheme = theme;
    root.classList.toggle('app-dark', theme === 'dark');
  }

  private bindSystemThemeListener(): void {
    if (!this.mediaQuery) {
      return;
    }

    const onMediaQueryChange = (event: MediaQueryListEvent): void => {
      this._systemTheme.set(event.matches ? 'dark' : 'light');
    };

    this.mediaQuery.addEventListener('change', onMediaQueryChange);
    this.destroyRef.onDestroy(() =>
      this.mediaQuery?.removeEventListener('change', onMediaQueryChange),
    );
  }
}
