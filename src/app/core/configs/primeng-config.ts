import { definePreset } from "@primeuix/themes";
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from "primeng/config";
import { PRIMENG_LOCALE_AR, PRIMENG_LOCALE_EN } from './primeng-locale';
import { Translation } from "primeng/api";

function getInitialPrimengLocale(): Translation {
  /* TODO: Add locale selection */
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   const lang = localStorage.getItem('preferred-language');
  //   return lang === 'ar' ? PRIMENG_LOCALE_AR : PRIMENG_LOCALE_EN;
  // }
  return PRIMENG_LOCALE_EN;
}

const MY_PRESET = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },
    colorScheme: {
      light: {
        surface: {
          50: '{gray.50}',
          100: '{gray.100}',
          200: '{gray.200}',
          300: '{gray.300}',
          400: '{gray.400}',
          500: '{gray.500}',
          600: '{gray.600}',
          700: '{gray.700}',
          800: '{gray.800}',
          900: '{gray.900}',
          950: '{gray.950}'
        },
        primary: {
          color: '{primary.950}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.700}'
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{primary.50}',
          contrastColor: '{primary.950}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.300}'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.300}',
          color: '{primary.950}',
          focusColor: '{primary.950}'
        }
      }
    }
  }
});

export const PRIMENG_CONFIG = [
  providePrimeNG({
    ripple: true,
    translation: getInitialPrimengLocale(),
    theme: {
      preset: MY_PRESET,
      options: {
        prefix: "p",
        darkModeSelector: ".app-dark",
        cssLayer: false,
      },
    },
  }),
];
