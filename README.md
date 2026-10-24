# recettes

Server-rendered recipe aggregator from multiple Belgian grocery providers, with
support for multiple locales. Built with TanStack Start and Solid, and deployed
to Cloudflare Workers.

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

`pnpm preview` previews the production build locally. `pnpm deploy` builds and
deploys it to Cloudflare Workers with Wrangler; authenticate with Cloudflare
before deploying.
