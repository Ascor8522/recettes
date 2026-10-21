# recettes

## Project Overview

This is a SolidStart application built with Solid, Vite, Tailwind CSS 4, and
pnpm. It aggregates server-rendered recipes from Belgian grocery providers and
is deployed to Cloudflare Workers using the Cloudflare Vite plugin.

## Commands

- `pnpm dev`: start the Vite/SolidStart development server.
- `pnpm check`: run Oxlint, Oxfmt formatting checks, and TypeScript checking.
- `pnpm build`: create the production build for Cloudflare Workers.
- `pnpm preview`: build and run the production Worker locally with Wrangler.
- `pnpm deploy`: build and deploy with Wrangler.
- `pnpm format`: format the source and project config with Oxfmt.

## Repository Layout

- `src/app.tsx`: Solid Router setup and shared page shell.
- `src/entry-client.tsx` and `src/entry-server.tsx`: SolidStart entry points.
- `src/routes/`: filesystem routes for `/`, `/search`, `/providers`, and the
  `/api/search` JSON endpoint.
- `src/components/`: reusable Solid components, including the interactive
  language and theme controls.
- `src/models/recipe/`: recipe types, provider metadata, and provider
  implementations.
- `src/utils/`: shared route typing and locale handling.
- `src/locales/`: translation JSON files for French, Dutch, German, and English.
- `public/`: public assets served at the site root.
- `vite.config.ts`: SolidStart, Cloudflare, and Tailwind Vite plugin setup.
- `wrangler.jsonc`: Cloudflare Worker configuration.

The `@/` import alias resolves to `src/`. Follow the existing TypeScript/TSX
style. Keep server-only provider fetching in route/server code and keep
interactive browser state in Solid components.

## Recipe Providers

Provider integration is defined by `BaseProvider` in
`src/models/recipe/providers/recipe_provider.ts`. A provider must:

1. Convert common search criteria in `customizeCriteria()`.
2. Fetch and validate provider-specific data in `doSearch()`.
3. Normalize provider results to the shared `Recipe` shape in
   `normalizeResults()`.

Register providers in `src/models/recipe/providers/index.ts` by adding the
`Provider` enum value and `providerMetadata` entry. A provider is active only
when its metadata includes a `fetcher`; metadata without a fetcher is displayed
as unsupported. `searchRecipes()` queries active providers concurrently with
`Promise.allSettled()`, so one provider failure does not prevent other providers
from returning results.

External provider APIs are runtime dependencies. Keep provider-specific API
types and URL construction inside that provider implementation.

## Localization

Add or change translations in every locale JSON file under `src/locales/`. Keep
all locale files aligned with the `Translations` interface in
`src/utils/locales.ts`. Locale selection uses the `lang` query parameter first,
then the request `Accept-Language` header, and finally English.

## Generated and Ignored Files

Do not edit generated output in `dist/` or installed dependencies in
`node_modules/`. Keep secrets out of the repository; local `.env` variants are
ignored by Git.
