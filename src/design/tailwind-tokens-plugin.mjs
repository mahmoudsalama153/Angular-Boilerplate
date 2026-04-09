/**
 * @file design/tailwind-tokens-plugin.ts
 * @description Registers all semantic design tokens as real Tailwind utility classes.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * GENERATED CLASS EXAMPLES
 * ─────────────────────────────────────────────────────────────────────────────
 *   bg-surface          → background-color: var(--p-bg-surface)
 *   bg-surface-alt      → background-color: var(--p-bg-surface-alt)
 *   bg-brand-solid      → background-color: var(--p-bg-brand-solid)
 *   text-muted          → color: var(--p-text-muted)
 *   text-error-primary  → color: var(--p-text-error-primary)
 *   border-subtle       → border-color: var(--p-border-subtle)
 *   border-brand        → border-color: var(--p-border-brand)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SETUP — add to tailwind.config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 *   import { designTokensPlugin } from './src/design/tailwind-tokens-plugin';
 *
 *   export default {
 *     plugins: [designTokensPlugin],
 *   } satisfies Config;
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * USAGE IN TEMPLATES
 * ─────────────────────────────────────────────────────────────────────────────
 *   <div class="bg-surface-alt text-muted border border-subtle">…</div>
 *   <button class="bg-brand-solid text-primary-on-brand">Save</button>
 *   <span class="text-error-primary border-error">Required</span>
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A TOKEN FROM FIGMA — 4 steps
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Add the hex to primitive{} in primeng-config.ts
 *   2. Map it in semantic.colorScheme.light/dark{} in primeng-config.ts
 *   3. Add an entry to the correct TOKEN_MAP below with a Figma JSDoc comment
 *   4. The class is available immediately — no other files to touch
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * RENAMING A TOKEN
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Update semantic.colorScheme in primeng-config.ts
 *   2. Rename the key here + update the JSDoc hex comment
 *   3. Search the codebase for the old class name — your IDE/linter will flag them
 */

import plugin from 'tailwindcss/plugin';

// ─────────────────────────────────────────────────────────────────────────────
// Token maps
// key   = class suffix   → generates  bg-{key} / text-{key} / border-{key}
// value = CSS var name   → must match the PrimeNG-generated custom property
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Background tokens
 * Class pattern: bg-{key}  →  background-color: var(--p-bg-{key})
 */
const BG_TOKENS = {

  // ── Surfaces ───────────────────────────────────────────────────────────────
  /** Figma: Background/Surface · #FFFFFF (light) / #0C0E12 (dark) */
  'surface':                 '--p-bg-surface',
  /** Figma: Background/Surface Alt · #F9FAFA (light) / #13161B (dark) */
  'surface-alt':             '--p-bg-surface-alt',
  /** Figma: Background/Elevated · #FFFFFF (light) / #13161B (dark) */
  'elevated':                '--p-bg-elevated',
  /** Figma: Background/Canvas · #F9FAFA (light) / #13161B (dark) */
  'canvas':                  '--p-bg-canvas',

  // ── Primary ────────────────────────────────────────────────────────────────
  /** Figma: Background/Primary · #FFFFFF (light) / #0C0E12 (dark) */
  'primary':                 '--p-bg-primary',
  /** Figma: Background/Primary Alt · #FFFFFF (light) / #13161B (dark) */
  'primary-alt':             '--p-bg-primary-alt',
  /** Figma: Background/Primary Hover · #F9FAFA (light) / #22262F (dark) */
  'primary-hover':           '--p-bg-primary-hover',
  /** Figma: Background/Primary Solid · #060607 (light) / #13161B (dark) */
  'primary-solid':           '--p-bg-primary-solid',

  // ── Secondary ──────────────────────────────────────────────────────────────
  /** Figma: Background/Secondary · #F9FAFA (light) / #13161B (dark) */
  'secondary':               '--p-bg-secondary',
  /** Figma: Background/Secondary Alt · #F9FAFA (light) / #0C0E12 (dark) */
  'secondary-alt':           '--p-bg-secondary-alt',
  /** Figma: Background/Secondary Hover · #ECEDF0 (light) / #22262F (dark) */
  'secondary-hover':         '--p-bg-secondary-hover',
  /** Figma: Background/Secondary Subtle · #F9FAFA (light) / #13161B (dark) */
  'secondary-subtle':        '--p-bg-secondary-subtle',
  /** Figma: Background/Secondary Solid · #606675 (light) / #61656C (dark) */
  'secondary-solid':         '--p-bg-secondary-solid',

  // ── Tertiary / Quaternary ──────────────────────────────────────────────────
  /** Figma: Background/Tertiary · #ECEDF0 (light) / #22262F (dark) */
  'tertiary':                '--p-bg-tertiary',
  /** Figma: Background/Quaternary · #D5D6DD (light) / #373A41 (dark) */
  'quaternary':              '--p-bg-quaternary',

  // ── States ─────────────────────────────────────────────────────────────────
  /** Figma: Background/Active · #F9FAFA (light) / #22262F (dark) */
  'active':                  '--p-bg-active',
  /** Figma: Background/Disabled · #ECEDF0 (light) / #22262F (dark) */
  'disabled':                '--p-bg-disabled',
  /** Figma: Background/Disabled Subtle · #F9FAFA (light) / #13161B (dark) */
  'disabled-subtle':         '--p-bg-disabled-subtle',
  /** Figma: Background/Overlay · #060607 (light) / #22262F (dark) */
  'overlay':                 '--p-bg-overlay',

  // ── Brand ──────────────────────────────────────────────────────────────────
  /** Figma: Background/Brand/Primary · #F4F7FA (light) / #4767A5 (dark) */
  'brand-primary':           '--p-bg-brand-primary',
  /** Figma: Background/Brand/Primary Alt · #F4F7FA (light) / #13161B (dark) */
  'brand-primary-alt':       '--p-bg-brand-primary-alt',
  /** Figma: Background/Brand/Secondary · #E8ECF4 (light) / #1E4691 (dark) */
  'brand-secondary':         '--p-bg-brand-secondary',
  /** Figma: Background/Brand/Solid · #1E4691 (light/dark) · primary CTA background */
  'brand-solid':             '--p-bg-brand-solid',
  /** Figma: Background/Brand/Solid Hover · #1B3F82 (light) / #4767A5 (dark) */
  'brand-solid-hover':       '--p-bg-brand-solid-hover',
  /** Figma: Background/Brand/Section · #183874 (light) / #13161B (dark) */
  'brand-section':           '--p-bg-brand-section',
  /** Figma: Background/Brand/Section Subtle · #1B3F82 (light) / #0C0E12 (dark) */
  'brand-section-subtle':    '--p-bg-brand-section-subtle',

  // ── Error ──────────────────────────────────────────────────────────────────
  /** Figma: Background/Error/Primary · #F7E9E8 (light) / #5A120C (dark) */
  'error-primary':           '--p-bg-error-primary',
  /** Figma: Background/Error/Secondary · #EAC1BE (light) / #B42318 (dark) */
  'error-secondary':         '--p-bg-error-secondary',
  /** Figma: Background/Error/Solid · #A22016 (light) / #B42318 (dark) */
  'error-solid':             '--p-bg-error-solid',

  // ── Warning ────────────────────────────────────────────────────────────────
  /** Figma: Background/Warning/Primary · #FFFAE7 (light) / #332802 (dark) */
  'warning-primary':         '--p-bg-warning-primary',
  /** Figma: Background/Warning/Secondary · #FFF0BB (light) / #FFC90C (dark) */
  'warning-secondary':       '--p-bg-warning-secondary',
  /** Figma: Background/Warning/Solid · #D6A90A (light/dark) */
  'warning-solid':           '--p-bg-warning-solid',

  // ── Success ────────────────────────────────────────────────────────────────
  /** Figma: Background/Success/Primary · #E6F1ED (light) / #022F1C (dark) */
  'success-primary':         '--p-bg-success-primary',
  /** Figma: Background/Success/Secondary · #B9D9CB (light) / #067647 (dark) */
  'success-secondary':       '--p-bg-success-secondary',
  /** Figma: Background/Success/Solid · #05683E (light) / #067647 (dark) */
  'success-solid':           '--p-bg-success-solid',
};

/**
 * Text / color tokens
 * Class pattern: text-{key}  →  color: var(--p-text-{key})
 */
const TEXT_TOKENS = {

  // ── Base ───────────────────────────────────────────────────────────────────
  /** Figma: Text/Primary · #1D1E23 (light) / #F7F7F7 (dark) */
  'primary':                    '--p-text-primary',
  /** Figma: Text/Color · alias of primary */
  'color':                      '--p-text-color',
  /** Figma: Text/Muted · #606675 (light) / #94979C (dark) */
  'muted':                      '--p-text-muted',
  /** Figma: Text/Subtle · #777E91 (light) / #85888E (dark) */
  'subtle':                     '--p-text-subtle',
  /** Figma: Text/Subtle Soft · #9197A6 (light/dark) */
  'subtle-soft':                '--p-text-subtle-soft',
  /** Figma: Text/Inverse · #FFFFFF (light/dark) */
  'inverse':                    '--p-text-inverse',
  /** Figma: Text/White · #FFFFFF */
  'white':                      '--p-text-white',
  /** Figma: Text/Disabled · #777E91 (light) / #85888E (dark) */
  'disabled':                   '--p-text-disabled',
  /** Figma: Text/Placeholder · #777E91 (light) / #85888E (dark) */
  'placeholder':                '--p-text-placeholder',
  /** Figma: Text/Placeholder Subtle · #BBBEC8 (light) / #373A41 (dark) */
  'placeholder-subtle':         '--p-text-placeholder-subtle',

  // ── Hierarchy ──────────────────────────────────────────────────────────────
  /** Figma: Text/Secondary · #4A4E5A (light) / #CECFD2 (dark) */
  'secondary':                  '--p-text-secondary',
  /** Figma: Text/Secondary Hover · #33363E (light) / #ECECED (dark) */
  'secondary-hover':            '--p-text-secondary-hover',
  /** Figma: Text/Tertiary · #606675 (light) / #94979C (dark) */
  'tertiary':                   '--p-text-tertiary',
  /** Figma: Text/Tertiary Hover · #4A4E5A (light) / #CECFD2 (dark) */
  'tertiary-hover':             '--p-text-tertiary-hover',
  /** Figma: Text/Quaternary · #777E91 (light) / #94979C (dark) */
  'quaternary':                 '--p-text-quaternary',

  // ── On-brand ───────────────────────────────────────────────────────────────
  /** Figma: Text/Primary on Brand · #FFFFFF (light) / #F7F7F7 (dark) */
  'primary-on-brand':           '--p-text-primary-on-brand',
  /** Figma: Text/Secondary on Brand · #C0CBE0 (light) / #97AACC (dark) */
  'secondary-on-brand':         '--p-text-secondary-on-brand',
  /** Figma: Text/Secondary on Brand Hover (dark) · #ECECED */
  'secondary-on-brand-hover':   '--p-text-secondary-on-brand-hover',
  /** Figma: Text/Tertiary on Brand · #C0CBE0 (light) / #94979C (dark) */
  'tertiary-on-brand':          '--p-text-tertiary-on-brand',
  /** Figma: Text/Quaternary on Brand · #97AACC (light) / #94979C (dark) */
  'quaternary-on-brand':        '--p-text-quaternary-on-brand',

  // ── Brand ──────────────────────────────────────────────────────────────────
  /** Figma: Text/Brand Primary · #153166 (light) / #F7F7F7 (dark) */
  'brand-primary':              '--p-text-brand-primary',
  /** Figma: Text/Brand Secondary · #1B3F82 (light) / #CECFD2 (dark) */
  'brand-secondary':            '--p-text-brand-secondary',
  /** Figma: Text/Brand Secondary Hover · #183874 (light) / #ECECED (dark) */
  'brand-secondary-hover':      '--p-text-brand-secondary-hover',
  /** Figma: Text/Brand Tertiary · #1E4691 (light) / #94979C (dark) */
  'brand-tertiary':             '--p-text-brand-tertiary',
  /** Figma: Text/Brand Tertiary Alt · #1E4691 (light) / #F7F7F7 (dark) */
  'brand-tertiary-alt':         '--p-text-brand-tertiary-alt',

  // ── Status ─────────────────────────────────────────────────────────────────
  /** Figma: Text/Error Primary · #A22016 (light) / #C24B42 (dark) */
  'error-primary':              '--p-text-error-primary',
  /** Figma: Text/Error Primary Hover · #901C13 (light) / #CF726B (dark) */
  'error-primary-hover':        '--p-text-error-primary-hover',
  /** Figma: Text/Warning Primary · #D6A90A (light) / #FFD338 (dark) */
  'warning-primary':            '--p-text-warning-primary',
  /** Figma: Text/Success Primary · #05683E (light) / #338F68 (dark) */
  'success-primary':            '--p-text-success-primary',

  // ── Link ───────────────────────────────────────────────────────────────────
  /** Figma: Text/Link · #1B3F82 (light) / #97AACC (dark) */
  'link':                       '--p-text-link',
  /** Figma: Text/Link Hover · #183874 (light) / #C0CBE0 (dark) */
  'link-hover':                 '--p-text-link-hover',
};

/**
 * Border tokens
 * Class pattern: border-{key}  →  border-color: var(--p-border-{key})
 */
const BORDER_TOKENS = {
  /** Figma: Border/Strong · #BBBEC8 (light) / #4A4E5A (dark) */
  'strong':           '--p-border-strong',
  /** Figma: Border/Subtle · #D5D6DD (light) / #33363E (dark) */
  'subtle':           '--p-border-subtle',
  /** Figma: Border/Focus · #4767A5 (light) / #6F89B9 (dark) · use for focus rings */
  'focus':            '--p-border-focus',
  /** Figma: Border/Primary · #BBBEC8 (light) / #4A4E5A (dark) */
  'primary':          '--p-border-primary',
  /** Figma: Border/Secondary · #D5D6DD (light) / #33363E (dark) */
  'secondary':        '--p-border-secondary',
  /** Figma: Border/Secondary Alt · rgba(0,0,0,8%) (light) / #4A4E5A (dark) */
  'secondary-alt':    '--p-border-secondary-alt',
  /** Figma: Border/Tertiary · #ECEDF0 (light) / #33363E (dark) */
  'tertiary':         '--p-border-tertiary',
  /** Figma: Border/Disabled · #BBBEC8 (light) / #4A4E5A (dark) */
  'disabled':         '--p-border-disabled',
  /** Figma: Border/Disabled Subtle · #D5D6DD (light) / #33363E (dark) */
  'disabled-subtle':  '--p-border-disabled-subtle',
  /** Figma: Border/Brand · #4767A5 (light) / #6F89B9 (dark) */
  'brand':            '--p-border-brand',
  /** Figma: Border/Brand Alt · #1E4691 (light) / #373A41 (dark) */
  'brand-alt':        '--p-border-brand-alt',
  /** Figma: Border/Error · #B42318 (light) / #C24B42 (dark) */
  'error':            '--p-border-error',
  /** Figma: Border/Error Subtle · #CF726B (light) / #B42318 (dark) */
  'error-subtle':     '--p-border-error-subtle',
};

// ─────────────────────────────────────────────────────────────────────────────
// Plugin — builds utility classes from the maps above
// ─────────────────────────────────────────────────────────────────────────────

export const designTokensPlugin = plugin(({ addUtilities }) => {
  const utilities = {};

  for (const [key, cssVar] of Object.entries(BG_TOKENS)) {
    utilities[`.bg-${key}`] = { 'background-color': `var(${cssVar})` };
  }

  for (const [key, cssVar] of Object.entries(TEXT_TOKENS)) {
    utilities[`.text-${key}`] = { color: `var(${cssVar})` };
  }

  for (const [key, cssVar] of Object.entries(BORDER_TOKENS)) {
    utilities[`.border-${key}`] = { 'border-color': `var(${cssVar})` };
  }

  addUtilities(utilities);
});

export default designTokensPlugin;
