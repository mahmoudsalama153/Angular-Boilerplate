import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { PRIMENG_LOCALE_AR, PRIMENG_LOCALE_EN } from './primeng-locale';

const APP_THEME_PRESET = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#F4F7FA',
      100: '#E8ECF4',
      200: '#C0CBE0',
      300: '#97AACC',
      400: '#6F89B9',
      500: '#4767A5',
      600: '#1E4691',
      700: '#1B3F82',
      800: '#183874',
      900: '#153166',
      950: '#122A57',
    },
  },
});

export const PRIMENG_CONFIG = [
  providePrimeNG({
    ripple: true,
    translation:
      localStorage.getItem('preferred-language') === 'ar' ? PRIMENG_LOCALE_AR : PRIMENG_LOCALE_EN,
    theme: {
      preset: APP_THEME_PRESET,
      options: {
        prefix: 'p',
        darkModeSelector: '[data-theme="dark"]',
        cssLayer: false,
      },
    },
  }),
];
