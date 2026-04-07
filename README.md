# Angular Boilerplate

Frontend boilerplate built with Angular 21, standalone components, PrimeNG, Tailwind CSS, SCSS, and signal-based state.

This README is intended to be a long-term technical reference for onboarding, feature delivery, and architectural maintenance.

---

## Project Overview

### What the project does

This repository provides a structured Angular frontend foundation for an authenticated business application. The current implementation already includes:

- Authentication flows: login, register, forgot password, reset password, email verification
- A dashboard feature with filtering, table rendering, actions, and placeholder API data
- Shared UI building blocks such as tables, drawers, dialogs, form controls, skeletons, and reusable error messaging
- Cross-cutting concerns such as localization, theming, route guards, and local persistence

### Main business/domain purpose

The naming and current screens suggest an admin-style internal product. The authentication module and dashboard structure indicate a line-of-business platform rather than a marketing site.

### High-level technical summary

The application follows a feature-first Angular architecture with three main layers:

- `core`: application shell, layouts, guards, global config, design primitives
- `features`: domain-specific screens and state (`authentication`, `dashboard`)
- `shared`: reusable APIs, UI primitives, utilities, validators, interfaces, directives, and pipes

At runtime, the app is bootstrapped as a standalone Angular application, routes are lazy loaded where appropriate, feature data is managed with `@ngrx/signals`, and UI composition relies heavily on standalone components plus PrimeNG.

### Assumptions and current limitations

The following statements are based on code inspection and should be treated as current-state observations:

- `DashboardApiService` currently returns mock data via `of(...)` instead of a live backend call.
- Several authentication page submit handlers are present but commented out, so some flows appear scaffolded rather than fully wired.
- No end-to-end testing framework is configured in the inspected workspace.
- No CI/CD or deployment pipeline files were found in the repository root.
- Environment files exist, but explicit Angular `fileReplacements` were not found in `angular.json`.
- Multiple services inject `HttpClient`, but a global `provideHttpClient(...)` provider was not found in the inspected bootstrap config.

---

## Tech Stack

| Category             | Technology                                     | Notes                                                                      |
| -------------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| Framework            | Angular 21                                     | Standalone application using `bootstrapApplication(...)`                   |
| Language             | TypeScript 5.9                                 | Strict TypeScript configuration enabled                                    |
| State management     | `@ngrx/signals` + Angular signals              | Feature stores use `signalStore`; local state uses `signal` and `computed` |
| UI library           | PrimeNG 21                                     | Tables, buttons, inputs, password fields, select controls, overlays        |
| Theme system         | `@primeuix/themes`                             | Custom preset built on Aura                                                |
| Styling              | SCSS + Tailwind CSS v4 + `tailwindcss-primeui` | Global SCSS plus utility classes                                           |
| Icons                | PrimeIcons                                     | Imported globally                                                          |
| Data fetching        | Angular `HttpClient` + custom API services     | `AuthApiService`, `DashboardApiService`, `BaseHttpService`                 |
| Internationalization | Custom i18n service                            | JSON translation files in `src/assets/i18n`                                |
| Notifications        | PrimeNG `MessageService`                       | Wrapped by `ToasterService`                                                |
| Testing              | Angular TestBed + Vitest globals               | Co-located `*.spec.ts` tests                                               |
| Linting              | ESLint + angular-eslint                        | OnPush and Angular best-practice rules enabled                             |
| Formatting           | Prettier                                       | HTML uses Angular parser                                                   |
| Git hooks            | Husky + lint-staged                            | Pre-commit formats and lints staged files                                  |

---

## Architecture Overview

### Overall application architecture

This is a **feature-first, standalone Angular SPA** with a thin root bootstrap layer and clear separation between shell concerns, domain features, and reusable platform code.

The architecture is centered around:

1. **Standalone Angular components** instead of NgModules
2. **Signal-based local and global state**
3. **Lazy-loaded feature routing**
4. **Feature-scoped orchestration services** for forms and filters
5. **Shared UI and infrastructure libraries** under `shared`

### Design patterns used

- **Feature-first organization**: domain features live under `src/app/features`
- **Layout shell pattern**: `MainLayoutComponent` and `AuthLayout` wrap route areas
- **Store + service split**: stores own signal state, API services own transport, orchestration services adapt user interactions
- **Reusable UI primitives**: low-level components live under `shared/components/base-components`
- **Container/presenter tendency**: pages assemble data/services; shared components stay generic
- **Configuration centralization**: endpoints, themes, routes, and environment values are declared in dedicated files

### Feature/module organization strategy

Each feature is expected to own its:

- pages
- feature-specific components
- store
- feature services
- feature validators/classes
- route configuration when the feature has multiple screens

Examples:

- `features/authentication`: routes, pages, form services, store, validators
- `features/dashboard`: page, filter component, filter service, store, feature classes

### Separation of concerns

| Concern                 | Where it lives                                               |
| ----------------------- | ------------------------------------------------------------ |
| Application shell       | `src/app/core/layouts`                                       |
| Route definitions       | `src/app/app.routes.ts` and feature route files              |
| Business/domain screens | `src/app/features/*/pages`                                   |
| Feature state           | `src/app/features/*/store`                                   |
| API transport           | `src/app/shared/api` and `src/app/shared/services/Base-HTTP` |
| Cross-feature UI        | `src/app/shared/components`                                  |
| Validation              | `src/app/shared/validators` and feature validators           |
| Internationalization    | `src/app/shared/services/i18n` and `src/assets/i18n`         |
| Themes/design tokens    | `src/app/core/configs` and `src/styles.scss`                 |

### How data flows through the application

Typical flow for dashboard filtering:

1. `DashboardPage` provides `DashboardFilterService`
2. `DashboardFilter` updates the filter signal in that service
3. `DashboardFilterService` adapts UI filter state into API filter format
4. `DashboardStore` calls `DashboardApiService`
5. `DashboardStore` updates signal state via `patchState(...)`
6. `DashboardPage` reads store values and passes them to shared table components

Typical flow for auth:

1. Auth page injects a feature-specific form service
2. Auth page reads the reactive form from that service
3. Auth page calls an `AuthStore` method
4. `AuthStore` calls `AuthApiService`
5. `AuthStore` updates loading/auth state and persists auth data via `LocalStorage`

### Rendering strategy

- Client-side rendered SPA
- Lazy route loading is used for authentication routes and the dashboard page component
- Components generally use `ChangeDetectionStrategy.OnPush`
- Signals and `computed(...)` are preferred for reactive UI state

---

## Folder Structure

### Main tree

```text
.
├── angular.json
├── eslint.config.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   ├── core/
│   │   │   ├── configs/
│   │   │   ├── design/
│   │   │   ├── guards/
│   │   │   ├── i18n/
│   │   │   └── layouts/
│   │   ├── features/
│   │   │   ├── authentication/
│   │   │   └── dashboard/
│   │   └── shared/
│   │       ├── api/
│   │       ├── classes/
│   │       ├── components/
│   │       ├── data/
│   │       ├── directives/
│   │       ├── enums/
│   │       ├── interfaces/
│   │       ├── pipes/
│   │       ├── services/
│   │       ├── utlities/
│   │       └── validators/
│   ├── assets/
│   │   ├── i18n/
│   │   ├── images/
│   │   └── styles/
│   └── environments/
└── README.md
```

### Important directories

| Directory           | Purpose                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/app/core`      | App shell and cross-cutting framework concerns that should not depend on a specific business feature |
| `src/app/features`  | Domain modules; each feature owns its routes, pages, components, services, and store                 |
| `src/app/shared`    | Reusable building blocks that can be consumed across multiple features                               |
| `src/assets/i18n`   | Language dictionaries used by the custom translation service                                         |
| `src/assets/styles` | Global SCSS layers for core, layout, shared, and vendor styles                                       |
| `src/environments`  | Build-time environment constants                                                                     |

### Important root-level files

| File                 | Responsibility                                                     |
| -------------------- | ------------------------------------------------------------------ |
| `package.json`       | Scripts, dependencies, lint-staged configuration                   |
| `angular.json`       | Angular builder configuration, project options, production budgets |
| `eslint.config.js`   | ESLint rules for TypeScript, Angular, and templates                |
| `tsconfig.json`      | Strict TypeScript rules and the `@app/*` path alias                |
| `tsconfig.spec.json` | Test compilation config using Vitest globals                       |
| `.prettierrc`        | Formatting rules                                                   |
| `.editorconfig`      | Workspace editor consistency rules                                 |
| `.postcssrc.json`    | Tailwind CSS PostCSS plugin wiring                                 |
| `.husky/pre-commit`  | Runs `npm run check:staged` before commit                          |

### How folders relate to each other

- `app.routes.ts` chooses a layout from `core/layouts`
- layouts host feature pages via `RouterOutlet`
- feature pages compose shared components and inject feature services/stores
- feature stores call shared API services
- shared services consume environment and endpoint config
- shared pipes/directives/components support both feature and layout code

---

## File and Module Responsibilities

### Core application files

| File                    | Purpose                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `src/main.ts`           | Bootstraps the standalone application                                                |
| `src/app/app.config.ts` | Registers root providers such as router, PrimeNG config, and browser error listeners |
| `src/app/app.routes.ts` | Defines top-level route tree and shell layout boundaries                             |
| `src/app/app.ts`        | Root component; currently a lightweight `RouterOutlet` host                          |

### Where to place new code

| Code type                      | Recommended location                                                                    | Notes                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Pages / views                  | `src/app/features/<feature>/pages/<page-name>/`                                         | Route entry components belong here                                                                            |
| Feature-specific components    | `src/app/features/<feature>/components/`                                                | Use when the component is not reusable outside that feature                                                   |
| Shared reusable components     | `src/app/shared/components/`                                                            | Choose the right subfolder: `base-components`, `layout-components`, `form`, `utility-components`, `skeletons` |
| Stores / signal state          | `src/app/features/<feature>/store/`                                                     | One store per cohesive domain area                                                                            |
| API services                   | `src/app/shared/api/<domain>/`                                                          | Keep transport details out of pages/components                                                                |
| Feature orchestration services | `src/app/features/<feature>/services/`                                                  | Good for forms, filters, page-level coordination                                                              |
| Cross-feature services         | `src/app/shared/services/`                                                              | Use for i18n, themes, toaster, local storage, error-message generation                                        |
| Interfaces / types             | `src/app/shared/interfaces/` for cross-feature models; feature-local if truly isolated  | Existing code favors shared interfaces                                                                        |
| Validators                     | `src/app/shared/validators/` or `src/app/features/<feature>/validators/`                | Keep domain-specific rules local to the feature                                                               |
| Utilities / helper classes     | `src/app/shared/classes/` and `src/app/shared/utlities/`                                | Existing repo uses both helper classes and utility functions                                                  |
| Constants / configuration      | `src/app/core/configs/`, `src/app/shared/enums/`, `src/app/shared/api/api-endpoints.ts` | Keep static definitions centralized                                                                           |
| Tests                          | Co-located `*.spec.ts`                                                                  | Existing project keeps tests next to the implementation                                                       |

### Practical examples from the codebase

- `features/authentication/pages/login/login.ts`: route-level page component
- `features/authentication/services/login-form/login-form.ts`: feature-scoped form factory
- `features/authentication/store/auth.store.ts`: global auth state via signal store
- `features/dashboard/services/dashboard-filter.service.ts`: feature orchestration service
- `shared/api/auth/auth-api-service.ts`: backend transport service
- `shared/components/layout-components/data-table/data-table.component.ts`: reusable layout component
- `shared/components/form/phone-input/phone-input.component.ts`: reusable form control using `ControlValueAccessor`
- `shared/services/i18n/i18n.service.ts`: cross-cutting application service

---

## State Management

### What state management approach is used

The project uses a hybrid of:

- **Angular signals** for local UI state
- **`@ngrx/signals` signal stores** for global/feature application state
- **Reactive Forms** for form state
- **RxJS** for asynchronous streams, debouncing, and API orchestration

### State categories in this project

| State type          | Current approach                                 | Examples                                                                |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| Local UI state      | `signal(...)` inside components/services         | drawer visibility, loading flags, theme toggle state, sidebar expansion |
| Global client state | `signalStore(...)`                               | `AuthStore`, `DashboardStore`                                           |
| Server state        | Stored manually in signal stores after API calls | dashboard list/count, auth payload                                      |
| Derived state       | `computed(...)`                                  | `isAuthenticated`, filter counters, pagination values, RTL-aware icons  |
| Form state          | Angular Reactive Forms in feature services       | `LoginFormService`, `RegisterFormService`                               |

### Where state should live

Use the narrowest scope possible:

- **Component-only UI concerns**: keep in the component with `signal(...)`
- **Feature page coordination**: keep in a feature service provided at page level if the state should reset when leaving the page
- **Cross-route or app-wide data**: keep in a root-provided signal store
- **Form values/errors**: keep inside a reactive form service or form component

### Existing store pattern

Both stores follow the same shape:

1. define `initialState`
2. create `signalStore({ providedIn: 'root' }, ...)`
3. add `withState(...)`
4. add `withComputed(...)` for derived values
5. add `withMethods(...)` for commands that call APIs and update state

Minimal pattern based on current code:

```ts
export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isReady: computed(() => !store.loading()),
  })),
  withMethods((store) => {
    const api = inject(ExampleApiService);

    return {
      load() {
        patchState(store, { loading: true });
        return api.load().pipe(finalize(() => patchState(store, { loading: false })));
      },
    };
  }),
);
```

### How to create a new state module/store

1. Add a new file under `src/app/features/<feature>/store/`
2. Keep state serializable and minimal
3. Add derived properties via `computed(...)`, not duplicated fields
4. Inject only the APIs/services needed by that store
5. Patch state in one place per action path
6. Expose intention-revealing methods such as `loadList()`, `saveDraft()`, `logout()`

### Best practices in this codebase

- Prefer `computed(...)` over storing duplicate derived values
- Avoid keeping the same server payload in multiple places
- Keep feature filters near the page if they are page-specific
- Keep store methods focused on commands, not presentation logic
- Reset pagination when filters or sorting change, as done in the dashboard flow
- Use `OnPush` and signals together to minimize avoidable re-renders

---

## Routing and Navigation

### How routing is structured

Top-level routing is defined in `src/app/app.routes.ts`:

- `''` uses `MainLayoutComponent`
- the root child currently lazy-loads the dashboard page component
- `auth` uses `AuthLayout` and lazy-loads `authentication.routes.ts`

### Route organization patterns

- **Top-level shell routes** live in `app.routes.ts`
- **Feature child routes** live in the feature folder, for example `features/authentication/authentication.routes.ts`
- **Route components** are lazy loaded using `loadComponent(...)`
- **Feature route trees** are lazy loaded using `loadChildren(...)`

### Protected/authenticated routes

Current state:

- `visitorsGuard` is actively used on the login route to block authenticated users from visiting visitor-only screens
- `authGuard` exists but is not currently attached to the top-level dashboard route in the inspected route config

That means the guard infrastructure exists, but route protection is not yet applied consistently across all routes.

### How to add a new route/page

#### Add a page inside an existing feature

1. Create `features/<feature>/pages/<page-name>/`
2. Add the standalone component
3. Register it in the feature routes file with `loadComponent(...)`
4. Protect it with a guard if needed

Example pattern:

```ts
{
	path: 'settings',
	canActivate: [authGuard],
	loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsPage),
}
```

#### Add a brand-new feature route tree

1. Create `features/<feature>/<feature>.routes.ts`
2. Add pages/components/store/services for that feature
3. Mount it in `app.routes.ts` using `loadChildren(...)`
4. Choose `MainLayoutComponent` or a dedicated layout

---

## Data Fetching and API Integration

### How API calls are organized

API transport is centralized under `src/app/shared/api`.

Current examples:

- `shared/api/auth/auth-api-service.ts`
- `shared/api/dashboard/dashboard-api.service.ts`
- `shared/api/api-endpoints.ts`
- `shared/services/Base-HTTP/base-Http.service.ts`

### API structure in practice

| Layer               | Responsibility                                                     |
| ------------------- | ------------------------------------------------------------------ |
| `api-endpoints.ts`  | Endpoint string constants and base URL assembly                    |
| `BaseHttpService`   | Generic GET/POST/PUT/DELETE wrappers returning typed API responses |
| Domain API services | Feature/domain-specific calls such as auth and dashboard           |
| Stores              | Call APIs and persist result into signal state                     |
| Pages/services      | Trigger store methods or consume observables                       |

### Current fetching patterns

- Auth service calls `HttpClient` directly
- Dashboard service currently returns mock data through RxJS `of(...)`
- Loading state is controlled manually with `patchState(..., { loading: true/false })`
- Error handling is mostly local to the caller/store, not centralized through an interceptor

### Caching, loading, and error state handling

Current state is simple and explicit:

- **Caching**: no dedicated query cache library is used
- **Loading**: handled manually in stores/components via `signal` or `patchState`
- **Errors**: partially handled in stores and page components, plus form-specific error helpers

### Where API services live

- Shared transport/domain services: `src/app/shared/api/**`
- Generic HTTP wrapper: `src/app/shared/services/Base-HTTP/base-Http.service.ts`

### How to add a new endpoint/integration

1. Add the endpoint path to `shared/api/api-endpoints.ts`
2. Add or extend a domain API service under `shared/api/<domain>/`
3. Add request/response interfaces under `shared/interfaces/`
4. Call the service from a feature store or feature orchestration service
5. Expose the result to a page/component via signals

### How API models/types are managed

Shared interfaces are kept under `src/app/shared/interfaces`.

Examples include:

- `auth.interface.ts`
- `dashboard.interface.ts`
- `api.interface.ts`
- `filter.interface.ts`

Use shared interfaces when:

- the model crosses feature boundaries
- it represents server payloads
- it is reused in shared UI or shared services

Keep feature-local types in the feature folder only when the type is tightly coupled to one feature implementation.

---

## Components and UI Architecture

### Component categories used in this project

| Area                                   | Purpose                                    | Examples                                          |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| `shared/components/base-components`    | Low-level reusable wrappers and primitives | base dialog, base drawer, base tag, base error    |
| `shared/components/layout-components`  | Page sections and data display scaffolding | table layout, data table, cards page layout       |
| `shared/components/form`               | Form-oriented controls and helpers         | phone input, password toggle, signature pad       |
| `shared/components/utility-components` | Task-specific reusable helpers             | paginator, empty records, confirmation dialog     |
| `shared/components/skeletons`          | Loading placeholders                       | cards skeleton, table skeleton, timeline skeleton |
| `features/*/components`                | Feature-specific UI                        | dashboard filter, password policy, reset button   |
| `core/layouts/*/components`            | Shell/navigation UI                        | navbar, sidebar, footer, notification dropdowns   |

### Shared vs reusable vs feature-specific

- Put a component in `shared` if it can be reused without knowledge of one business feature
- Put a component in `features/<feature>/components` if its inputs, logic, or language are domain-specific
- Put layout-only components in `core/layouts/**` if they belong to the application shell rather than a feature

### Presentational vs container logic

The codebase trends toward this split:

- **Pages** act as composition roots and inject services/stores
- **Shared components** receive inputs/models and emit outputs
- **Feature services/stores** contain orchestration or state mutations

For example:

- `DashboardPage` coordinates table data and filter application
- `DataTableComponent` is a reusable renderer with configurable templates and sorting
- `DashboardFilterService` contains filter mutation logic and API trigger coordination

### How to create a new component

1. Decide whether it belongs to `shared`, `core`, or a feature
2. Make it standalone
3. Use `ChangeDetectionStrategy.OnPush`
4. Prefer `input()`, `output()`, and `model()` APIs
5. Keep the component focused and dependency-light
6. Add a co-located `*.spec.ts`

### Rules for component composition and reusability

- Shared components should be generic and accept typed inputs
- Feature pages should assemble shared components rather than duplicating markup patterns
- Prefer content projection/template inputs for flexible table/card rendering
- Keep data fetching out of shared presentational components
- Reuse base components before introducing new UI primitives

---

## Hooks, Utilities, and Shared Logic

### Custom hook patterns

This is an Angular codebase, so there are **no React-style hooks**. Equivalent reusable logic currently lives in:

- **Injectable services**: orchestration and stateful logic
- **Directives**: DOM/form behavior
- **Pipes**: formatting and translation
- **Helper classes/functions**: pure reusable logic

### Existing shared-logic patterns

| Pattern            | When it is used                                                | Examples                                                                   |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Injectable service | Needs DI, state, async orchestration, or cross-component reuse | `DashboardFilterService`, `I18nService`, `ToasterService`                  |
| Directive          | Enhances DOM/form behavior                                     | `TrimOnBlurDirective`, `PrimeInvalidDirective`, `TruncateTooltipDirective` |
| Pipe               | Read-only display transformation                               | `TranslatePipe`, `LocalizedDatePipe`, `TimeAgoPipe`                        |
| Helper class       | Encapsulates pure domain or structural logic                   | `Filter`, `Pagination`, `Sorting`                                          |
| Utility function   | Small standalone behavior                                      | `safe-parse-json.ts`, custom validators                                    |

### When logic should become a service vs helper vs directive

- Use a **service** when the logic needs DI, state, routing, APIs, or side effects
- Use a **helper/class** when the logic is pure and framework-independent
- Use a **directive** when the behavior is attached to an element or control lifecycle
- Use a **pipe** when the logic only transforms display values

---

## Styling System

### Styling methodology used

The project combines:

- **Global SCSS layers** via `src/styles.scss`
- **Component-scoped SCSS** via `styleUrl` / `styleUrls`
- **Tailwind utility classes**
- **PrimeNG theme tokens** via a custom preset in `core/configs/primeng-config.ts`

### Theme/token usage

PrimeNG is configured with a custom design preset built on Aura. This includes:

- primitive color tokens
- semantic light/dark token sets
- component-specific tokens, for example table colors

Dark mode support is coordinated through:

- `ThemesService`
- the `.app-dark` CSS class on `document.documentElement`
- Tailwind custom variant setup in `src/styles.scss`

### Responsive design approach

Responsive behavior is implemented through a mix of:

- Tailwind utility classes
- component logic for desktop/mobile shell behavior
- PrimeNG responsive capabilities

Example: `MainLayoutComponent` collapses or restores sidebar state based on a desktop breakpoint and persists that preference to local storage.

### How to add or update styles safely

1. Prefer component-local SCSS for feature-specific styling
2. Use shared/global layers only for true design-system concerns
3. Reuse existing PrimeNG tokens and utility classes before adding new ad hoc colors
4. Preserve dark mode compatibility when adding new color rules
5. Keep layout-wide conventions inside `src/assets/styles/layout` or theme config, not inside feature pages

---

## Forms and Validation

### Form architecture

Forms are built with **Reactive Forms** and are usually created in **feature-scoped services** rather than directly inside components.

Examples:

- `LoginFormService`
- `RegisterFormService`
- `ForgotPasswordFormService`
- `ResetPasswordFormService`

This pattern keeps form creation, validators, and typed getters reusable and testable.

### Validation strategy

Validation is layered:

1. Angular built-in validators (`required`, `email`, `maxLength`, etc.)
2. Feature validators such as `passwordMatchValidator`
3. Shared validators such as `onlyTextValidator`, `phoneNumberPatternValidator`, `trimmedRequiredValidator`
4. Shared error rendering components/services such as `BaseErrorMessages` and `ErrorMessagesService`

### Reusable form infrastructure

- `PhoneInputComponent` implements `ControlValueAccessor`
- `PasswordToggleComponent` enhances password fields
- `PrimeInvalidDirective` and error-message components help keep validation UI consistent

### How to add a new form

1. Create a feature service under `features/<feature>/services/<form-name>/`
2. Build the form with `FormBuilder`
3. Add typed getters for commonly used controls
4. Add custom validators in `shared/validators` or the feature validator folder
5. Render validation through shared error components rather than duplicating inline messages
6. Keep submit side effects in the page component or store, not in the form service

---

## Error Handling and Edge Cases

### What exists today

- `provideBrowserGlobalErrorListeners()` is registered in `app.config.ts`
- Store methods use `finalize(...)` to guarantee loading-state reset
- Auth verification explicitly maps `HttpErrorResponse` to a thrown `Error`
- `ToasterService` wraps user-facing success/warn/error messages
- Shared components exist for empty states and loading skeletons
- Validation messaging is centralized through shared components/services

### API error handling patterns

There is no evidence of a centralized HTTP interceptor-based error strategy in the inspected code. Error handling is currently local and explicit.

Recommended interpretation of current practice:

- handle expected business errors close to the feature
- use store/component loading flags for UX feedback
- use `ToasterService` for user-visible notifications
- use shared error components for form-level validation errors

### Empty/loading/error state conventions

Current reusable conventions include:

- **loading**: skeleton components such as `TableSkeletonComponent`
- **empty**: `EmptyRecordsComponent`
- **validation errors**: `BaseErrorMessages` / `BaseErrorComponent`
- **toast feedback**: `ToasterService`

### Notable edge-case observations

- Some debug `fetch(...)` calls and `console.log(...)` statements are still present in shared error components/services
- Several auth flows are scaffolded but commented out
- Route enums suggest a `/dashboard` path, but the current route config mounts the dashboard page at the empty root path

---

## Environment and Configuration

### Environment variables/configuration

Current environment files expose:

- `production`
- `baseUrl`
- `apiVersion`
- `appName`
- `enableDebug`

### Important config files

| File                                     | Why it matters                                      |
| ---------------------------------------- | --------------------------------------------------- |
| `src/environments/environment.ts`        | Development defaults                                |
| `src/environments/environment.prod.ts`   | Production defaults                                 |
| `src/app/shared/api/api-endpoints.ts`    | Assembles endpoint map from `baseUrl`               |
| `src/app/core/configs/primeng-config.ts` | Theme and PrimeNG platform config                   |
| `src/styles.scss`                        | Global style entry and Tailwind/PrimeUI integration |

### Runtime/build-time considerations

- `baseUrl` is empty in both inspected environment files and should be set per deployment target
- Production budgets are configured in `angular.json`
- No explicit Angular environment file replacements were found in the inspected build config
- Path alias `@app/*` is available for cleaner imports

---

## Testing Strategy

### Current setup

- Unit/component tests are co-located as `*.spec.ts`
- Test code uses Angular TestBed
- `tsconfig.spec.json` includes `vitest/globals`
- `ng test` is the defined test script

### What is currently covered

The inspected tests are mostly baseline creation tests for:

- standalone components
- services
- guards
- form services

### What is not present

- no end-to-end test framework was found
- no clear integration-test harness was found beyond standard component/service specs

### Where tests live

Tests live next to the implementation file, for example:

- `login-form.spec.ts`
- `auth-api-service.spec.ts`
- `dashboard-actions-menu.spec.ts`

### How to write tests for new features

At minimum, add tests for:

- page/component creation
- form validation rules
- store method state transitions
- service behavior for API wrappers and helper services
- route guards when access logic changes

### What should be tested

Priority order:

1. custom validators and form rules
2. feature stores and state transitions
3. route access behavior
4. reusable shared components with branching logic
5. data adaptation logic such as filter transformation

---

## Developer Workflow

### Install and run

```bash
npm install
npm start
```

The app serves through Angular CLI on the default Angular dev server port unless changed locally.

### Important scripts

| Script                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm start`            | Start local dev server              |
| `npm run build`        | Production build                    |
| `npm run watch`        | Development build in watch mode     |
| `npm run test`         | Run tests                           |
| `npm run lint`         | Lint the codebase                   |
| `npm run lint:fix`     | Auto-fix lint issues where possible |
| `npm run format`       | Format the repository               |
| `npm run format:check` | Validate formatting                 |
| `npm run check:staged` | Pre-commit staged-file checks       |

### Recommended development flow

1. Pull latest changes
2. Install dependencies if lockfile changed
3. Start the dev server
4. Work inside the relevant feature folder
5. Reuse shared UI/services before adding new primitives
6. Run lint and test before opening a PR

### Quality gates

- ESLint enforces Angular and TypeScript rules
- Prettier keeps formatting consistent
- Husky pre-commit hook runs staged-file checks
- Angular schematics are configured to default new components to SCSS and OnPush

---

## Feature Development Guide

### Adding a new feature

1. Create `src/app/features/<feature>/`
2. Add subfolders: `pages`, `components`, `services`, `store`, `validators` as needed
3. Add the feature route file if the feature has more than one page
4. Add feature interfaces/classes if truly feature-local; otherwise use `shared/interfaces`
5. Add API service methods under `shared/api/<feature>/`
6. Add a signal store if the feature owns cross-page or server-backed state
7. Reuse shared components instead of re-building tables/forms/dialogs

Suggested starting structure:

```text
src/app/features/example-feature/
├── example-feature.routes.ts
├── components/
├── pages/
├── services/
├── store/
└── validators/
```

### Updating an existing feature

1. Start from the feature route/page
2. Inspect its store and feature services
3. Check whether the change is UI-only, state-related, or API-related
4. Reuse existing shared validators/components/directives if the pattern already exists
5. Add or update specs close to the changed logic

### Adding a new API integration

1. Add endpoint constants to `api-endpoints.ts`
2. Add request/response types to `shared/interfaces`
3. Extend or create a domain API service
4. Integrate through a feature store
5. Expose loading/data/error state to the UI

### Adding a new state module/store/slice

1. Define a minimal `initialState`
2. Create a signal store in `features/<feature>/store`
3. Add derived values via `withComputed(...)`
4. Add command methods via `withMethods(...)`
5. Keep transport in API services, not inside components

### Adding a new reusable component

1. Decide the correct shared subfolder
2. Keep it standalone and OnPush
3. Expose typed inputs/outputs/models
4. Avoid hard-coding feature-specific text or behavior
5. Add at least a creation test and one behavior test if non-trivial

### Adding a new route/page

1. Create the page under the owning feature
2. Register it in the relevant route file
3. Wrap it in the appropriate layout
4. Apply `authGuard` or `visitorsGuard` as needed
5. Update navigation/sidebar enums if the route is user-facing

---

## Conventions and Best Practices

### Naming conventions

- Feature names use business/domain terminology
- Components generally use PascalCase class names with kebab-case folders
- Services end with `Service`
- Stores end with `.store.ts`
- Interfaces use `I` prefixes in the current codebase
- Enums use `E` prefixes in the current codebase

### File organization rules

- Keep domain logic inside the owning feature
- Keep shared logic framework-agnostic when possible
- Keep shell/layout code inside `core`
- Co-locate tests with implementation files

### Import conventions

- Use the `@app/*` alias for app-level imports when it improves readability
- Use relative imports for nearby implementation details when that is clearer
- Avoid deep cross-feature imports unless the dependency is intentional and stable

### Separation of responsibilities

- Pages compose and orchestrate
- Stores own state transitions
- API services own transport details
- Shared components own generic rendering
- Validators own field/business validation rules

### Reusability guidelines

- Check `shared/components` before adding a new component
- Check `shared/validators` before creating a validator from scratch
- Prefer extending an existing feature store/service over adding parallel state containers
- Put cross-feature models in `shared/interfaces`

### Performance considerations

- Keep `OnPush` everywhere practical
- Prefer signals/computed for reactive state
- Avoid duplicate state and unnecessary subscriptions
- Lazy load route components and feature route trees
- Reuse skeleton/empty-state components instead of complex conditional markup in every page

### Maintainability guidelines

- Keep feature APIs behind dedicated services
- Centralize endpoint strings
- Avoid leaking backend response shapes directly into multiple components
- Keep reusable UI generic and domain-agnostic
- Document assumptions in code when a feature is scaffolded or mocked

---

## Common Pitfalls

- Putting feature-specific logic into `shared`
- Duplicating API calls directly inside multiple components instead of going through a store/service
- Storing derived values instead of computing them
- Forgetting to reset pagination after filter/sort changes
- Adding forms directly into page components when a dedicated form service would keep logic cleaner
- Creating reusable components that secretly depend on one feature's data shape
- Ignoring RTL and language-switching behavior when building new shared UI
- Forgetting dark-mode compatibility when adding custom colors/styles
- Assuming all auth/dashboard flows are fully live; some are still scaffolded or mocked

---

## Suggested Improvements

These are architecture/documentation improvements suggested by the current code state:

1. **Wire `HttpClient` explicitly at bootstrap** if not already provided elsewhere, because several services depend on it.
2. **Remove debug-only `fetch(...)` and `console.log(...)` statements** from shared error components/services.
3. **Finish or remove scaffolded auth submit flows** to reduce ambiguity for future contributors.
4. **Align route enums with actual route registration**, especially the dashboard path.
5. **Add explicit environment file replacements** if production builds depend on separate environment files.
6. **Document or implement deployment strategy**.
7. **Add higher-value tests** around stores, validators, and route guards.
8. **Standardize naming/typos** such as `utlities`, `desin-tokens.ts`, and mixed file naming styles.
9. **Consider a centralized HTTP error/interceptor strategy** if API complexity grows.
10. **Clarify server-state ownership** if more data-heavy features are added.

---

## Quick Reference

### New developer onboarding checklist

- Install dependencies with `npm install`
- Run the app with `npm start`
- Read `src/app/app.routes.ts` to understand shell routing
- Inspect `src/app/core/layouts` to understand the app shell
- Inspect `src/app/features/authentication` and `src/app/features/dashboard` to learn the feature pattern
- Review `src/app/shared/components` before building new UI
- Review `src/app/shared/api/api-endpoints.ts` and `src/environments/*` before changing backend integration

### Where to look first when modifying a feature

| Change type             | Start here                                                  |
| ----------------------- | ----------------------------------------------------------- |
| Route/page change       | feature `pages/` + route file                               |
| Table/filter behavior   | feature `services/` + `store/` + shared table components    |
| Auth behavior           | `features/authentication/store` + pages + `shared/api/auth` |
| Shared form behavior    | `shared/components/form` + `shared/validators`              |
| Layout/navigation       | `core/layouts/main-layout`                                  |
| Language/theme behavior | `shared/services/i18n` and `shared/services/themes`         |

### Checklist before opening a PR

- Code is placed in the correct layer (`core`, `features`, `shared`)
- No duplicate state or duplicated API calls were introduced
- Shared components remain generic
- Lint passes
- Tests pass or were updated intentionally
- New routes are guarded appropriately
- New strings are localizable if user-facing
- New styles work in both default and dark theme contexts

---

## How to Extend This Project Safely

1. **Start by locating the owning feature**. Do not add business logic to `shared` unless it is truly cross-feature.
2. **Preserve the current layering**:
   - pages compose
   - stores manage state
   - API services call the backend
   - shared components render reusable UI
3. **Prefer existing patterns** over introducing a second pattern for the same problem.
4. **Keep new state narrow** and derived state computed.
5. **Keep feature transport and data adaptation out of templates**.
6. **Guard cross-cutting changes carefully**:
   - routing changes can affect layouts and guards
   - theme changes can affect Tailwind and PrimeNG tokens
   - i18n changes can affect RTL/LTR behavior
7. **Treat mock/stubbed code explicitly**. If a feature is still mocked, say so in comments and PR notes.
8. **Leave the codebase more consistent than you found it**: naming, typing, and structure matter in a boilerplate repository.

---

## How to Onboard in 30 Minutes

### First 10 minutes

- Run `npm install` and `npm start`
- Open `package.json` and `angular.json`
- Confirm the main scripts and Angular build setup

### Next 10 minutes

- Read `src/app/app.config.ts`, `src/app/app.routes.ts`, and `src/app/app.ts`
- Understand how layouts split the app into main and auth areas

### Final 10 minutes

- Read one end-to-end feature path:
  1.  `features/dashboard/pages/dashboard-page`
  2.  `features/dashboard/services/dashboard-filter.service.ts`
  3.  `features/dashboard/store/dashboard.store.ts`
  4.  `shared/api/dashboard/dashboard-api.service.ts`
- Then inspect one auth flow:
  1.  `features/authentication/pages/login`
  2.  `features/authentication/services/login-form`
  3.  `features/authentication/store/auth.store.ts`
  4.  `shared/api/auth/auth-api-service.ts`

If you understand those two feature paths plus the shared component library, you can contribute productively.

---

## Maintenance Checklist for Future Contributors

- Keep routes lazy loaded where practical
- Keep components standalone and OnPush
- Use signals for local state and signal stores for shared state
- Centralize endpoint changes in `api-endpoints.ts`
- Prefer reactive form services for medium/large forms
- Reuse shared validators/components/directives before adding new ones
- Remove debug code before merging
- Update tests with behavioral changes
- Keep README and feature assumptions up to date
