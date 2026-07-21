# Content governance

## Public claims
Publish only content that has a source, an owner and a review date. Do not use founder employment history as evidence of a current CIVICAVITA partnership.

## Blog
- The starter articles in `migrations/0002_seed_editorial_posts.sql` are general editorial pieces, not claims of active programs.
- Create translations only after review by a qualified editor for Persian, Swedish, French and Arabic.
- Keep the source language, translation owner and review date with each translation.

## Team and biographies
Full CVs, contact details and staff records are private administrative data by default. Publish an individual profile only with written approval and a defined public purpose.

## Creating a translated post
In Admin → Posts, choose the **Post language** before publishing. Publish one reviewed post for each language. The public blog automatically requests the current interface language and falls back to English only when no reviewed translation exists.

## Founder-informed editorial policy
Posts may draw on documented themes in the founder’s CV, but must clearly distinguish past individual professional experience from CIVICAVITA AB’s current work. Do not claim current UN partnerships, funded programmes, beneficiaries or institutional endorsements without current written evidence.

## Persian publication status
Migration `0006_persian_editorial_translations.sql` contains the Persian versions of the four initial editorial posts. When the interface is Persian, these records are shown instead of the English records.
