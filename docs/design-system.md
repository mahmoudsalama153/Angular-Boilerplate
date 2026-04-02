# Angular Boilerplate Design System

## Overview

This project uses a token-based design system built on top of CSS custom properties, Tailwind CSS v4, and PrimeNG.

The implementation is designed to achieve the following goals:

- keep colors and visual decisions centralized
- support light mode and dark mode from the same token source
- keep Tailwind and PrimeNG visually aligned
- avoid hardcoded hex values and direct `var(...)` usage in Angular templates and TypeScript
- make future rebranding or theme extension easier

---

## Core Principles

### 1. Semantic tokens over raw colors

Components should not think in terms of `#1E4691`, `blue-600`, or `gray-700`.

Components should use semantic names such as:

- `background`
- `surface`
- `foreground`
- `muted`
- `border`
- `primary`
- `success`
- `warning`
- `danger`
- `info`
- `soft`
- `muted`
- `strong`

This means the design language is expressed as meaning, not implementation detail.

### 2. One source of truth

The real source of truth for the theme is the token layer in [src/assets/styles/theme/\_tokens.scss](../src/assets/styles/theme/_tokens.scss).

Everything else consumes those tokens:

- Tailwind utility colors from [src/assets/styles/theme/\_tailwind-theme.scss](../src/assets/styles/theme/_tailwind-theme.scss)
- PrimeNG token bridge from [src/assets/styles/theme/\_primeng-bridge.scss](../src/assets/styles/theme/_primeng-bridge.scss)
- theme activation through [src/app/core/services/theme.service.ts](../src/app/core/services/theme.service.ts)

### 3. No direct `var(...)` in templates or TypeScript

Angular templates and TS class maps should use semantic utility names such as:

- `text-muted`
- `bg-surface`
- `border-border`
- `bg-success-soft`
- `text-danger-strong`
- `border-primary-muted`

Avoid:

- `text-[var(--app-primary-700)]`
- `border-[var(--app-success-200)]`
- raw hex values
- hardcoded Tailwind palette utilities like `text-gray-600`

---

## Architecture Layers

The design system is organized into four layers.

### Layer 1: Foundation palette

Defined in [src/assets/styles/theme/\_tokens.scss](../src/assets/styles/theme/_tokens.scss).

This layer contains raw palette scales derived from legacy application brand system to be replaced
the new application palettes.

Examples:

- `--app-gray-25` to `--app-gray-950`
- `--app-primary-25` to `--app-primary-950`
- `--app-success-*`
- `--app-warning-*`
- `--app-danger-*`
- `--app-blue-*`
- `--app-purple-*`
- `--app-pink-*`

This layer should be treated as the visual foundation only.

### Layer 2: Semantic tokens

Also defined in [src/assets/styles/theme/\_tokens.scss](../src/assets/styles/theme/_tokens.scss).

This layer maps foundation colors into reusable design meaning.

Examples:

- `--app-color-background`
- `--app-color-foreground`
- `--app-color-surface`
- `--app-color-border`
- `--app-color-muted`
- `--app-color-primary`
- `--app-color-primary-soft`
- `--app-color-primary-muted`
- `--app-color-primary-strong`
- `--app-color-success-soft`
- `--app-color-danger-strong`
- `--app-color-info-soft`
- `--app-color-violet-muted`
- `--app-color-neutral-strong`

This is the main contract used by the rest of the UI.

### Layer 3: Tailwind theme utilities

Defined in [src/assets/styles/theme/\_tailwind-theme.scss](../src/assets/styles/theme/_tailwind-theme.scss).

This layer exposes semantic tokens as Tailwind v4 utility colors.

Examples:

- `bg-background`
- `bg-surface`
- `bg-surface-subtle`
- `text-foreground`
- `text-muted`
- `border-border`
- `bg-primary`
- `bg-primary-soft`
- `border-primary-muted`
- `text-primary-strong`
- `bg-success-soft`
- `text-success-strong`
- `border-warning-muted`
- `bg-info-soft`
- `text-violet-strong`

### Layer 4: PrimeNG bridge

Defined in [src/assets/styles/theme/\_primeng-bridge.scss](../src/assets/styles/theme/_primeng-bridge.scss).

This layer maps app tokens into PrimeNG tokens so PrimeNG components follow the same system.

Examples:

- `--p-primary-color`
- `--p-text-color`
- `--p-content-background`
- `--p-content-border-color`
- `--p-input-border-color`
- `--p-danger-color`

---

## Key Files

### Global theme files

- [src/assets/styles/theme/\_tokens.scss](../src/assets/styles/theme/_tokens.scss) — foundation palette and semantic tokens
- [src/assets/styles/theme/\_tailwind-theme.scss](../src/assets/styles/theme/_tailwind-theme.scss) — Tailwind semantic utility mapping
- [src/assets/styles/theme/\_primeng-bridge.scss](../src/assets/styles/theme/_primeng-bridge.scss) — PrimeNG token bridge
- [src/styles.scss](../src/styles.scss) — theme imports, Tailwind plugin registration, dark variant registration

### Angular theme runtime

- [src/app/core/services/theme.service.ts](../src/app/core/services/theme.service.ts) — light/dark/system theme preference management
- [src/app/shared/components/utility-components/theme-toggle/theme-toggle.component.ts](../src/app/shared/components/utility-components/theme-toggle/theme-toggle.component.ts) — example theme switcher UI

### PrimeNG setup

- [src/app/core/configs/primeng-config.ts](../src/app/core/configs/primeng-config.ts) — PrimeNG preset and dark selector configuration

---

## Theme Modes

The system currently supports:

- `light`
- `dark`
- `system`

### How theme state works

The active theme is controlled by [src/app/core/services/theme.service.ts](../src/app/core/services/theme.service.ts).

Behavior:

- stores user preference in local storage under `app-theme-preference`
- supports `light`, `dark`, and `system`
- listens to `prefers-color-scheme: dark`
- applies the theme to the root element with:
  - `data-theme="light"` or `data-theme="dark"`
  - `data-theme-preference="light" | "dark" | "system"`
  - `color-scheme`
  - `.app-dark` class for compatibility

### Dark mode selector

Tailwind and PrimeNG are aligned to dark mode through:

- [src/styles.scss](../src/styles.scss)
- [src/app/core/configs/primeng-config.ts](../src/app/core/configs/primeng-config.ts)

The active dark selector is:

```scss
[data-theme='dark']
```

---

## Token Naming Convention

### Foundation tokens

Pattern:

```text
--app-{palette}-{step}
```

Examples:

- `--app-gray-100`
- `--app-primary-600`
- `--app-success-700`

### Semantic tokens

Pattern:

```text
--app-color-{role}
--app-color-{role}-{variant}
```

Examples:

- `--app-color-primary`
- `--app-color-primary-soft`
- `--app-color-primary-muted`
- `--app-color-primary-strong`
- `--app-color-success-soft`
- `--app-color-danger-strong`

### Tailwind utility names

Pattern:

```text
bg-{role}
bg-{role}-{variant}
text-{role}
text-{role}-{variant}
border-{role}
border-{role}-{variant}
```

Examples:

- `bg-primary`
- `bg-primary-soft`
- `text-primary-strong`
- `border-primary-muted`
- `bg-success-soft`
- `text-warning-strong`
- `border-info-muted`

---

## Currently Available Semantic Roles

### Base layout roles

- `background`
- `foreground`
- `surface`
- `surface-elevated`
- `surface-subtle`
- `border`
- `border-strong`
- `muted`
- `accent`
- `accent-foreground`

### Brand roles

- `primary`
- `primary-soft`
- `primary-muted`
- `primary-strong`
- `primary-foreground`

### State roles

- `success`
- `success-soft`
- `success-muted`
- `success-strong`
- `success-foreground`

- `warning`
- `warning-soft`
- `warning-muted`
- `warning-strong`
- `warning-foreground`

- `danger`
- `danger-soft`
- `danger-muted`
- `danger-strong`
- `danger-foreground`

### Support roles

- `info`
- `info-soft`
- `info-muted`
- `info-strong`

- `violet`
- `violet-soft`
- `violet-muted`
- `violet-strong`

- `rose`
- `rose-soft`
- `rose-muted`
- `rose-strong`

- `neutral-soft`
- `neutral-muted`
- `neutral-strong`

---

## Recommended Usage Rules

### Use these in components

Preferred examples:

```html
<div class="bg-surface text-foreground border border-border">
  <p class="text-muted">Description</p>
  <button class="bg-primary text-primary-foreground">Save</button>
</div>
```

Status examples:

```html
<span class="border border-success-muted bg-success-soft text-success-strong"> Active </span>
```

```html
<span class="border border-danger-muted bg-danger-soft text-danger-strong"> Failed </span>
```

### Avoid these in components

Avoid raw palette classes:

```html
text-gray-600 bg-blue-50 border-red-200
```

Avoid raw CSS variable classes:

```html
text-[var(--app-primary-700)] border-[var(--app-success-200)]
```

Avoid hardcoded colors:

```html
text-[#4767A5] bg-[#F2F9FD]
```

### Prefer semantic class maps in TypeScript

Preferred:

```ts
const colorMap = {
  primary: 'border-primary-muted bg-primary-soft text-primary-strong',
  success: 'border-success-muted bg-success-soft text-success-strong',
};
```

Avoid:

```ts
const colorMap = {
  primary:
    'border-[var(--app-primary-200)] bg-[var(--app-primary-50)] text-[var(--app-primary-700)]',
};
```

---

## Tailwind Integration Details

Tailwind v4 is configured through CSS, not a JavaScript theme file.

The relevant file is [src/assets/styles/theme/\_tailwind-theme.scss](../src/assets/styles/theme/_tailwind-theme.scss), imported from [src/styles.scss](../src/styles.scss).

The project also enables the PrimeUI plugin and custom dark variant in [src/styles.scss](../src/styles.scss).

Current dark variant registration:

```scss
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *, .app-dark, .app-dark *));
```

---

## PrimeNG Integration Details

PrimeNG is configured in two places:

- [src/app/core/configs/primeng-config.ts](../src/app/core/configs/primeng-config.ts)
- [src/assets/styles/theme/\_primeng-bridge.scss](../src/assets/styles/theme/_primeng-bridge.scss)

### PrimeNG approach

1. PrimeNG uses a preset based on Lara.
2. Dark mode is controlled by `data-theme="dark"`.
3. PrimeNG CSS tokens are mapped to app semantic tokens.

This keeps PrimeNG inputs, overlays, buttons, focus states, and text colors aligned with the app design system.

---

## Accessibility and UX Decisions

The current implementation includes:

- `color-scheme` support for browser-native form controls
- reduced motion handling through `prefers-reduced-motion`
- visible `:focus-visible` outline styling
- semantic foreground/background token pairing for contrast control

### Accessibility guidance

When adding or updating tokens:

- keep text contrast at WCAG AA minimum
- verify `soft` background tokens still allow readable `strong` text
- test both light and dark mode
- test focus states on interactive elements

---

## How to Add a New Semantic Role

Example: add an `info` family if not already present.

### Step 1: define token values in [src/assets/styles/theme/\_tokens.scss](../src/assets/styles/theme/_tokens.scss)

```scss
--app-color-info: var(--app-blue-600);
--app-color-info-soft: var(--app-blue-50);
--app-color-info-muted: var(--app-blue-200);
--app-color-info-strong: var(--app-blue-700);
```

### Step 2: expose it in [src/assets/styles/theme/\_tailwind-theme.scss](../src/assets/styles/theme/_tailwind-theme.scss)

```scss
--color-info: var(--app-color-info);
--color-info-soft: var(--app-color-info-soft);
--color-info-muted: var(--app-color-info-muted);
--color-info-strong: var(--app-color-info-strong);
```

### Step 3: use it semantically

```html
<div class="border border-info-muted bg-info-soft text-info-strong">Informational message</div>
```

---

## How to Add a New Brand Theme

If a new brand or tenant is needed later, keep the same semantic contract and only change token values.

Recommended approach:

1. keep utility names unchanged
2. create another theme scope based on `data-theme`
3. override semantic tokens only

Example:

```scss
[data-theme='brand-b'] {
  --app-color-primary: #0f766e;
  --app-color-primary-soft: #ecfeff;
  --app-color-primary-muted: #99f6e4;
  --app-color-primary-strong: #115e59;
}
```

Then the same component classes continue to work:

```html
<button class="bg-primary text-primary-foreground">Continue</button>
```

No template rewrite is needed.

---

## Migration Rules for Existing Code

When refactoring older components, follow this order:

1. replace raw hex values
2. replace old Tailwind palette classes like `text-gray-600`
3. replace direct CSS variable utility classes
4. map status-specific styling to semantic families
5. keep component logic free from brand-specific color names where possible

### Common replacements

| Old usage          | New usage                                 |
| ------------------ | ----------------------------------------- |
| `text-gray-900`    | `text-foreground`                         |
| `text-gray-600`    | `text-muted`                              |
| `bg-gray-50`       | `bg-surface-subtle` or `bg-neutral-soft`  |
| `border-gray-200`  | `border-border` or `border-neutral-muted` |
| `bg-primary-50`    | `bg-primary-soft`                         |
| `text-primary-700` | `text-primary-strong`                     |
| `bg-[#F7E9E8]`     | `bg-danger-soft`                          |
| `text-[#901C13]`   | `text-danger-strong`                      |

---

## Folder Structure

```text
src/
  assets/
    styles/
      theme/
        _tokens.scss
        _tailwind-theme.scss
        _primeng-bridge.scss
  app/
    core/
      configs/
        primeng-config.ts
      services/
        theme.service.ts
    shared/
      components/
        utility-components/
          theme-toggle/
            theme-toggle.component.ts
```

---

## Implementation Summary

The current design system uses the following approach:

1. define a foundation palette from the legacy product colors
2. map that palette into semantic app tokens
3. expose semantic tokens as Tailwind utilities
4. bridge the same tokens into PrimeNG
5. switch theme mode through a single Angular service
6. keep component code semantic and brand-agnostic

This gives the project:

- a scalable token system
- consistent Tailwind and PrimeNG styling
- dark mode support
- lower maintenance cost
- easier cleanup of old hardcoded colors
- easier brand extension later

---

## Future Recommendations

Recommended next improvements:

- create a dedicated `_component-overrides.scss` file if PrimeNG selector overrides grow
- continue migrating remaining layout and shell components to semantic utilities
- add visual regression coverage for light and dark mode
- run automated contrast checks across status colors
- document allowed semantic role usage per component category if the system grows further
