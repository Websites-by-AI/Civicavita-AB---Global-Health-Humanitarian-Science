# CIVICAVITA Cloudflare Pages + D1 setup

## 1. Cloudflare dashboard bindings
The Pages project must have a **D1 database** binding named `DB` pointing at `civicavita`. This is already configured in the dashboard.

## Optional Wrangler configuration
`wrangler.example.jsonc` is a template only. If you deploy with Wrangler, rename it to `wrangler.jsonc` and replace `REPLACE_WITH_YOUR_D1_DATABASE_ID`. For the current Cloudflare Pages Git deployment, the dashboard `DB` binding is sufficient.

## 2. Required production secrets
In **Workers & Pages → project → Settings → Variables and secrets**, add these as **Secret** values:

- `ADMIN_EMAIL` — the only production admin email
- `ADMIN_PASSWORD` — a long, unique password
- `JWT_SECRET` — a random value of at least 32 characters
- `OPENROUTER_API_KEY` — optional, Secret
- `GEMINI_API_KEY` — optional, Secret

Add `APP_ENV=production` as a plaintext variable. Rotate the Gemini key that was pasted into chat and re-add it as a Secret.

## 3. Run the SQL migration
Open the D1 console for `civicavita` and paste the entire contents of `migrations/0001_civicavita.sql` through `migrations/0005_refresh_editorial_posts.sql`, in numeric order, then run it.

## 4. Deploy and test
Push this project to `main`. After Pages deploys, sign into `/admin` using `ADMIN_EMAIL` and `ADMIN_PASSWORD`, then open:

`https://YOUR-DOMAIN/api/database-health`

It returns `ok: true` only to an authenticated admin.

## Security design
D1 is accessed only from Pages Functions via `env.DB`. Browser code uses `/api/posts`; writes require an encrypted HttpOnly session cookie. API secrets are never exposed as Vite `VITE_*` variables.
