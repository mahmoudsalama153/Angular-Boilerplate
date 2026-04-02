import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';

import { PRIMENG_LOCALE_AR, PRIMENG_LOCALE_EN } from './primeng-locale';

const APP_THEME_PRESET = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
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
