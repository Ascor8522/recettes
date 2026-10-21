# recettes

Server-rendered recipe aggregator from multiple Belgian grocery providers, with
support for multiple locales. Built with SolidStart and deployed to Cloudflare
Workers.

## Requirements

- Node.js 24 or newer
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm check
pnpm build
pnpm preview
pnpm deploy
```

`pnpm preview` builds the app and runs the production Worker locally with
Wrangler. `pnpm deploy` builds and deploys it to Cloudflare Workers; authenticate
with Cloudflare before deploying.
