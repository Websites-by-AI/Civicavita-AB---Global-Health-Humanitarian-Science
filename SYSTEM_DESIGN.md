# CIVICAVITA AB — system design

## Public website
- **Vite + React** delivers the multilingual public interface.
- Public pages communicate CIVICAVITA's documented capabilities only: research, advisory work, scientific communication and responsible AI.
- The public site does not show a team roster, CV timeline, invented projects, partner logos, beneficiary claims or unverified performance metrics.

## Content and languages
- Public interface copy is maintained in `src/data/publicContent.ts` for English, Persian, Swedish, French and Arabic.
- The blog is stored in D1 and read through `/api/posts`.
- Recommended next database step: add a `post_translations` table keyed by `(post_id, locale)` before publishing translations. Every translation should have editorial review, source language, translator/reviewer and updated date.

## Protected administration
- `/admin` authenticates through Pages Functions, using `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `JWT_SECRET` Cloudflare secrets.
- A signed, HttpOnly, Secure, SameSite=Strict session cookie protects write operations.
- The full founder CV and any future staff records belong in the protected admin area, not the public UI.
- Keep API keys only in Cloudflare Secrets. Never add `VITE_OPENROUTER_API_KEY` or `VITE_GEMINI_API_KEY`.

## Data layer
- Cloudflare D1 binding name: `DB`.
- Public reads: `GET /api/posts`.
- Protected writes: `POST /api/posts`, `PUT/DELETE /api/posts/:id`.
- D1 health test: `GET /api/database-health` after an admin login.

## Publishing controls
1. Draft in admin.
2. Verify source, claims, author and dates.
3. Obtain a reviewed translation for each published locale.
4. Publish, with a revision date and audit record.
5. Do not imply institutional partnership based only on prior employment.
