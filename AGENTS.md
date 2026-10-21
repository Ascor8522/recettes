# recettes

## Project Overview

This is a Deno application built with Fresh 2, Preact, Vite, and Tailwind CSS 4.
It is a server-rendered recipe aggregator from different Belgian grocery providers.
The application uses Fresh filesystem routing and
fetches recipe data from external provider APIs.

## Commands

- `deno task dev`: start the Vite/Fresh development server with file watching.
- `deno task build`: create a production build in `_fresh/`.
- `deno task start`: serve the production build from `_fresh/server.js`.
- `deno task check`: run formatting checks, Deno lint, and type checking.
- `deno task update`: update Fresh project dependencies/configuration using the
  Fresh updater.

Run `deno fmt` on changed files when `deno task check` reports formatting
differences. There are currently no automated test files or test task.

## Repository Layout

- `main.ts`: creates the Fresh app, adds locale middleware, serves static files,
  and enables filesystem routes.
- `routes/`: page routes and Fresh partial routes. Main pages are `/`,
  `/search`, and `/providers`; `/partials/search` serves the incremental
  search-results update.
- `components/`: reusable server-rendered Preact components.
- `islands/`: client-side interactive Preact islands, currently language
  selection and theme switching.
- `models/recipe/`: recipe types, difficulty/time models, provider metadata, and
  provider implementations.
- `utils/`: shared route typing and locale handling.
- `locales/`: translation JSON files for French, Dutch, German, and English.
- `static/`: public assets such as logos, favicon, and view-transition CSS.
- `assets/tailwind.css`: Tailwind entry point and the custom `data-theme`
  dark-mode variant.
- `vite.config.ts`: Fresh and Tailwind Vite plugin configuration.

The `@/` import alias resolves to the repository root. Follow the existing
TypeScript/TSX style and use two-space indentation. Deno is the configured
formatter, linter, and TypeScript checker; the VS Code workspace recommends the
Deno and Tailwind CSS extensions.

## Routes and Fresh Partials

`routes/_app.tsx` provides the shared document shell, header, language/theme
controls, footer, and the `body` Fresh partial. Search results use nested
partials for the result list and pagination. The “load more” control submits to
`/search` while using `f-partial` to request `/partials/search`; preserve both
URLs when changing pagination behavior.

Interactive browser behavior belongs in an island under `islands/`. Keep
ordinary page and reusable UI components server-rendered unless they need
client-side state or event handlers.

## Recipe Providers

Provider integration is defined by `BaseProvider` in
`models/recipe/providers/recipe_provider.ts`. A provider must:

1. Convert common search criteria in `customizeCriteria()`.
2. Fetch and validate provider-specific data in `doSearch()`.
3. Normalize provider results to the shared `Recipe` shape in
   `normalizeResults()`.

Register providers in `models/recipe/providers/index.ts` by adding the
`Provider` enum value and `providerMetadata` entry. A provider is active only
when its metadata includes a `fetcher`; metadata without a fetcher is displayed
as unsupported. `searchRecipes()` queries active providers concurrently with
`Promise.allSettled()`, so one provider failure does not prevent other providers
from returning results.

External provider APIs are runtime dependencies. Check response status and keep
provider-specific API types and URL construction inside that provider
implementation. The current Lidl integration uses a fixed `fr-BE`
`Accept-Language` header and provider-specific image/recipe URLs.

## Localization

Add or change translations in every locale JSON file under `locales/`. Keep all
locale files aligned with the `Translations` interface in `utils/locales.ts`;
the `satisfies` check catches missing or extra translation keys. Add supported
locale imports and update the translations map when introducing a new language.

Locale selection uses the `lang` query parameter first, then the request
`Accept-Language` header, and finally English. Route handlers receive the
resolved locale through `ctx.state.locale`; use `translations[locale]` rather
than hard-coded user-facing text.

## Generated and Ignored Files

Do not edit generated output in `_fresh/` or installed dependencies in
`node_modules/`. The source of truth is the TypeScript/TSX, JSON, CSS, and
static asset files outside those directories. Keep secrets out of the
repository; local `.env` variants are ignored by Git.
