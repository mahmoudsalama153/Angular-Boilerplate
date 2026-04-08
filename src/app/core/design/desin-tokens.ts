import { ComponentsDesignTokens } from '@primeuix/themes/types';

const CONTROL_BORDER_RADIUS = '0.5rem';
const CONTROL_BORDER_COLOR = '{gray.200}';
const CONTROL_DISABLED_BACKGROUND = '{gray.100}';
const CONTROL_PADDING_Y = '0.625rem';
const CONTROL_SHADOW = '0px 1px 2px 0px #0A0D120D';

const PRIME_BUTTON_TOKENS: ComponentsDesignTokens = {
  button: {
    root: {
      borderRadius: CONTROL_BORDER_RADIUS,
      paddingX: '0.875rem',
      paddingY: CONTROL_PADDING_Y,
      raisedShadow: CONTROL_SHADOW,
      focusRing: {
        width: '0',
        style: 'none',
        offset: '0',
      },
      sm: {
        fontSize: '0.75rem',
      },
      secondary: {
        background: '{base.white}',
        borderColor: CONTROL_BORDER_COLOR,
      },
    },
    outlined: {
      secondary: {
        color: '{gray.700}',
        borderColor: '{gray.300}',
      },
    },
  },
};

const PRIME_FORM_CONTROL_TOKENS: ComponentsDesignTokens = {
  inputtext: {
    root: {
      borderRadius: CONTROL_BORDER_RADIUS,
      borderColor: CONTROL_BORDER_COLOR,
      // hoverBorderColor: CONTROL_BORDER_COLOR,
      // focusBorderColor: CONTROL_BORDER_COLOR,
      disabledBackground: CONTROL_DISABLED_BACKGROUND,
      paddingY: CONTROL_PADDING_Y,
      shadow: CONTROL_SHADOW,
      // focusRing: {
      // 	width: '0',
      // 	shadow: 'none',
      // },
    },
  },
  textarea: {
    root: {
      borderRadius: CONTROL_BORDER_RADIUS,
      borderColor: CONTROL_BORDER_COLOR,
      // hoverBorderColor: CONTROL_BORDER_COLOR,
      // focusBorderColor: CONTROL_BORDER_COLOR,
      disabledBackground: CONTROL_DISABLED_BACKGROUND,
      paddingY: CONTROL_PADDING_Y,
      shadow: CONTROL_SHADOW,
      // focusRing: {
      // 	width: '0',
      // 	shadow: 'none',
      // },
    },
  },
  select: {
    root: {
      borderRadius: CONTROL_BORDER_RADIUS,
      borderColor: CONTROL_BORDER_COLOR,
      // hoverBorderColor: CONTROL_BORDER_COLOR,
      // focusBorderColor: CONTROL_BORDER_COLOR,
      disabledBackground: CONTROL_DISABLED_BACKGROUND,
      paddingY: CONTROL_PADDING_Y,
      shadow: CONTROL_SHADOW,
      // focusRing: {
      // 	width: '0',
      // 	shadow: 'none',
      // },
    },
  },
  multiselect: {
    root: {
      borderRadius: CONTROL_BORDER_RADIUS,
      borderColor: CONTROL_BORDER_COLOR,
      // hoverBorderColor: CONTROL_BORDER_COLOR,
      // focusBorderColor: CONTROL_BORDER_COLOR,
      disabledBackground: CONTROL_DISABLED_BACKGROUND,
      paddingY: CONTROL_PADDING_Y,
      shadow: CONTROL_SHADOW,
      // focusRing: {
      // 	width: '0',
      // 	shadow: 'none',
      // },
    },
    chip: {
      borderRadius: '0.375rem',
    },
  },
  datepicker: {
    panel: {
      padding: '0.5rem',
      shadow: CONTROL_SHADOW,
    },
    header: {
      padding: '0 0 0.5rem 0',
    },
    date: {
      width: '1.75rem',
      height: '1.75rem',
    },
  },
};

const PRIME_SELECTION_CONTROL_TOKENS: ComponentsDesignTokens = {
  checkbox: {
    root: {
      width: '1.25rem',
      height: '1.25rem',
    },
    icon: {
      size: '0.75rem',
    },
  },
  radiobutton: {
    icon: {
      size: '0.5rem',
    },
  },
};

const PRIME_FEEDBACK_TOKENS: ComponentsDesignTokens = {
  tooltip: {
    root: {
      background: '{gray.900}',
    },
  },
  dialog: {
    footer: {
      padding: '0',
    },
  },
};

const PRIME_NAVIGATION_TOKENS: ComponentsDesignTokens = {
  tabs: {
    tablist: {
      borderWidth: '0 0 1px 0',
      background: 'transparent',
    },
    tab: {
      color: '{gray.500}',
      background: 'transparent',
      borderWidth: '0 0 1px 0',
      borderColor: 'transparent',
      hoverBorderColor: '{gray.200}',
      hoverBackground: 'transparent',
      activeBackground: 'transparent',
      activeBorderColor: '{primary.color}',
      padding: '12px',
      fontWeight: '600',
    },
    tabpanel: {
      padding: '0',
    },
  },
  paginator: {
    navButton: {
      selectedBackground: '{gray.50}',
      selectedColor: '{gray.700}',
      color: '{gray.500}',
      borderRadius: '0.5rem',
    },
  },
};

const PRIME_MISC_COMPONENT_TOKENS: ComponentsDesignTokens = {
  stepper: {
    steppanel: {
      background: '{gray.50}',
    },
  },
  fileupload: {
    header: {
      background: 'transparent',
      borderWidth: '0',
      padding: '0',
    },
    content: {
      padding: '0 1.25rem 1.25rem 1.25rem',
      gap: '0',
    },
    progressbar: {
      height: '0',
    },
  },
};

const PRIME_DATA_DISPLAY_TOKENS: ComponentsDesignTokens = {
  datatable: {
    css: `
			.p-datatable,
			.p-datatable-tbody > tr > td,
			.p-datatable-thead > tr > th {
				font-size: 0.875rem;
			}
		`,
    colorScheme: {
      light: {
        row: {
          background: '{bg-primary}',
          color: '{text-tertiary}',
        },
        headerCell: {
          background: '{primary.600}',
          color: '{text.white}',
        },
      },
    },
  },
};

export const PRIME_COMPONENT_TOKENS: ComponentsDesignTokens = {
  ...PRIME_BUTTON_TOKENS,
  ...PRIME_FORM_CONTROL_TOKENS,
  ...PRIME_SELECTION_CONTROL_TOKENS,
  ...PRIME_DATA_DISPLAY_TOKENS,
  ...PRIME_FEEDBACK_TOKENS,
  ...PRIME_NAVIGATION_TOKENS,
  ...PRIME_MISC_COMPONENT_TOKENS,
};
