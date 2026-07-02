# Franchise Broker

Franchise Broker is a modern landing page for discovering high-potential franchise investment opportunities. It connects investors with established restaurant franchises through expert guidance, market insights, and a carefully curated portfolio of proven brands.

> The repository homepage URL is automatically set to the Cloudflare Pages deployment URL on first deploy.

## Tech Stack

- **Framework**: Next.js 15 (static export, no SSR)
- **Language**: TypeScript
- **Styling**: Vanilla CSS / Inline Styles
- **Hosting**: Cloudflare Pages (static files)
- **CI/CD**: GitHub Actions — deploys on push to `main`, preview URLs on PRs
- **Dev Environment**: Nix (optional) + Bun

## Getting Started

### With Nix (recommended)

```bash
cp .env.example .env.local
nix develop          # drops you into a shell with bun, node, treefmt, lefthook
bun install
bun run dev
```

### Without Nix

Ensure you have [bun](https://bun.sh) and [lefthook](https://github.com/evilmartians/lefthook) installed.

```bash
cp .env.example .env.local
bun install
lefthook install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_APP_URL` | Public app URL | Your domain |

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with Turbopack |
| `bun run build` | Production static build (`out/` directory) |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with treefmt (prettier + nixfmt) |
| `bun run type-check` | TypeScript type checking |

## Deployment

Deployments are fully automated. The Cloudflare Pages project name is derived from the GitHub repository name — no manual configuration needed beyond org-level secrets:

- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages permissions
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
- `GH_ADMIN_TOKEN` (optional) — GitHub PAT with `administration:write` scope, for auto-setting the repo homepage URL

On first push to `main`, the workflow will:
1. Create the Cloudflare Pages project automatically
2. Deploy the static build output
3. Set the GitHub repository homepage URL to the deployment URL (requires `GH_ADMIN_TOKEN`)

PRs get preview deployments with a URL comment.

See the [CI/CD SOP](https://github.com/wezero-studio/sop/blob/main/ci-cd.md) for setup details.

## Project Structure

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Reusable UI components
  lib/          # Utility functions and shared logic
public/         # Static assets (favicon, og-image, _headers)
flake.nix       # Nix dev environment
treefmt.nix     # treefmt config (nix-native)
treefmt.toml    # treefmt config (non-nix fallback)
lefthook.yml    # Git hooks (lint, format, type-check on commit)
```
