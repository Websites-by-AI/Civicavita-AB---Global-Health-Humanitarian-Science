# Automatic D1 setup after GitHub upload

This repository includes `.github/workflows/d1-migrations.yml`.

When a change under `migrations/` is pushed to `main`, GitHub Actions runs:

```sh
npx wrangler@latest d1 migrations apply civicavita --remote
```

Wrangler records applied migrations in D1, so an already-applied numbered migration is not run again. This makes the workflow safe for normal deployments.

## One-time GitHub configuration

Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID containing D1 database `civicavita`.
- `CLOUDFLARE_API_TOKEN`: a restricted Cloudflare API token with **Account → D1 → Edit** permission for that account.

Never commit those values, add them to `.env`, or paste them in chat.

## How to check it

GitHub repository → **Actions** → **Apply CIVICAVITA D1 migrations**.

A successful run will show which migrations were applied. Cloudflare Pages deployment remains separate and continues through the existing Git integration.
