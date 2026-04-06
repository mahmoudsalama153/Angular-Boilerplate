import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { PRIMENG_LOCALE_EN } from './primeng-locale';
import { Translation } from 'primeng/api';
import { ComponentsDesignTokens } from '@primeuix/themes/types';

function getInitialPrimengLocale(): Translation {
  /* TODO: Add locale selection */
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   const lang = localStorage.getItem('preferred-language');
  //   return lang === 'ar' ? PRIMENG_LOCALE_AR : PRIMENG_LOCALE_EN;
  // }
  return PRIMENG_LOCALE_EN;
}

const TABLE_COMPONENT: ComponentsDesignTokens = {
  datatable: {
    colorScheme: {
      light: {
        row: {
          background: '{bg-primary}',
          color: '{text-tertiary}',
        },
        headerCell: {
          background: '{brand.600}',
          color: '{text.white}',
        },
      },
    },
  },
};

const MY_PRESET = definePreset(Aura, {
  primitive: {
    base: {
      white: '#ffffff',
      black: '#000000',
      transparent: '#FFFFFF00',
    },
    gray: {
      25: '#FCFCFC',
      50: '#F9FAFA',
      100: '#ECEDF0',
      200: '#D5D6DD',
      300: '#BBBEC8',
      400: '#9197A6',
      500: '#777E91',
      600: '#606675',
      700: '#4A4E5A',
      800: '#33363E',
      900: '#1D1E23',
      950: '#060607',
    },
    grayDark: {
      25: '#FAFAFA',
      50: '#F7F7F7',
      100: '#F0F0F1',
      200: '#ECECED',
      300: '#CECFD2',
      400: '#94979C',
      500: '#85888E',
      600: '#61656C',
      700: '#373A41',
      800: '#22262F',
      900: '#13161B',
      950: '#0C0E12',
    },
    brand: {
      25: '#FAFBFD',
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
    error: {
      25: '#FBF4F3',
      50: '#F7E9E8',
      100: '#EAC1BE',
      200: '#DD9A95',
      300: '#CF726B',
      400: '#C24B42',
      500: '#B42318',
      600: '#A22016',
      700: '#901C13',
      800: '#7E1911',
      900: '#6C150E',
      950: '#5A120C',
    },
    warning: {
      25: '#FFFDF3',
      50: '#FFFAE7',
      100: '#FFF0BB',
      200: '#FFE68F',
      300: '#FFDC63',
      400: '#FFD338',
      500: '#FFC90C',
      600: '#D6A90A',
      700: '#D6A90A',
      800: '#856906',
      900: '#5C4804',
      950: '#332802',
    },
    success: {
      25: '#F2F8F6',
      50: '#E6F1ED',
      100: '#B9D9CB',
      200: '#8CC0AA',
      300: '#60A789',
      400: '#338F68',
      500: '#067647',
      600: '#05683E',
      700: '#055A36',
      800: '#044C2D',
      900: '#033D25',
      950: '#022F1C',
    },
  },
  semantic: {
    colorScheme: {
      light: {
        text: {
          color: '{gray.900}',
          primaryOnBrand: '{base.white}',
          secondary: '{gray.700}',
          secondaryHover: 'gray.800',
          secondaryOnBrand: '{brand.200}',
          tertiary: '{gray.600}',
          tertiaryHover: '{gray.700}',
          tertiaryOnBrand: '{brand.200}',
          quaternary: '{gray.500}',
          quaternaryOnBrand: '{brand.300}',
          white: '{base.white}',
          disabled: '{gray.500}',
          placeholder: '{gray.500}',
          placeholderSubtle: '{gray.300}',
          brandPrimary: '{brand.900}',
          brandSecondary: '{brand.700}',
          brandSecondaryHover: '{brand.800}',
          brandTertiary: '{brand.600}',
          brandTertiaryAlt: '{brand.600}',
          errorPrimary: '{error.600}',
          errorPrimaryHover: '{error.700}',
          warningPrimary: '{warning.600}',
          successPrimary: '{success.600}',
        },
        bg: {
          primary: '{base.white}',
          primaryAlt: '{base.white}',
          primaryHover: '{gray.50}',
          primarySolid: '{gray.950}',
          secondary: '{gray.50}',
          secondaryAlt: '{gray.50}',
          secondaryHover: '{gray.100}',
          secondarySubtle: '{gray.50}',
          secondarySolid: '{gray.600}',
          tertiary: '{gray.100}',
          quaternary: '{gray.200}',
          active: '{gray.50}',
          disabled: '{gray.100}',
          disabledSubtle: '{gray.50}',
          overlay: '{gray.950}',
          brand: {
            primary: '{brand.50}',
            primaryAlt: '{brand.50}',
            secondary: '{brand.100}',
            solid: '{brand.600}',
            solidHover: '{brand.700}',
            section: '{brand.800}',
            sectionSubtle: '{brand.700}',
          },
          error: {
            primary: '{error.50}',
            secondary: '{error.100}',
            solid: '{error.600}',
          },
          warning: {
            primary: '{warning.50}',
            secondary: '{warning.100}',
            solid: '{warning.600}',
          },
          success: {
            primary: '{success.50}',
            secondary: '{success.100}',
            solid: '{success.600}',
          },
        },
      },
      dark: {
        text: {
          color: '{grayDark.50}',
          primaryOnBrand: '{grayDark.50}',
          secondary: '{grayDark.300}',
          secondaryHover: '{grayDark.200}',
          secondaryOnBrand: '{brand.300}',
          tertiary: '{grayDark.400}',
          tertiaryHover: '{grayDark.300}',
          tertiaryOnBrand: '{grayDark.400}',
          quaternary: '{grayDark.400}',
          quaternaryOnBrand: '{grayDark.400}',
          white: '{base.white}',
          disabled: '{grayDark.500}',
          placeholder: '{grayDark.500}',
          placeholderSubtle: '{grayDark.700}',
          brandPrimary: '{grayDark.50}',
          brandSecondary: '{grayDark.300}',
          brandSecondaryHover: '{grayDark.200}',
          brandTertiary: '{grayDark.400}',
          brandTertiaryAlt: '{grayDark.50}',
          errorPrimary: '{error.400}',
          errorPrimaryHover: '{error.300}',
          warningPrimary: '{warning.400}',
          successPrimary: '{success.400}',
        },
        bg: {
          primary: '{grayDark.950}',
          primaryAlt: '{grayDark.900}',
          primaryHover: '{grayDark.800}',
          primarySolid: '{graDark.900}',
          secondary: '{grayDark.900}',
          secondaryAlt: '{grayDark.950}',
          secondaryHover: '{grayDark.800}',
          secondarySubtle: '{grayDark.900}',
          secondarySolid: '{grayDark.600}',
          tertiary: '{grayDark.800}',
          quaternary: '{grayDark.700}',
          active: '{grayDark.800}',
          disabled: '{grayDark.800}',
          disabledSubtle: '{grayDark.900}',
          overlay: '{grayDark.800}',
          brand: {
            primary: '{brand.500}',
            primaryAlt: '{grayDark.900}',
            secondary: '{brand.600}',
            solid: '{brand.600}',
            solidHover: '{brand.500}',
            section: '{grayDark.900}',
            sectionSubtle: '{grayDark.950}',
          },
          error: {
            primary: '{error.950}',
            secondary: '{error.600}',
            solid: '{error.600}',
          },
          warning: {
            primary: '{warning.950}',
            secondary: '{warning.600}',
            solid: '{warning.600}',
          },
          success: {
            primary: '{success.950}',
            secondary: '{success.600}',
            solid: '{success.600}',
          },
        },
      },
    },
  },
  components: {
    ...TABLE_COMPONENT,
  },
});

export const PRIMENG_CONFIG = [
  providePrimeNG({
    // ripple: true,
    translation: getInitialPrimengLocale(),
    theme: {
      preset: MY_PRESET,
      options: {
        darkModeSelector: '.app-dark',
        prefix: 'p',
      },
    },
  }),
];
