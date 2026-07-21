-- Run once after 0001 and 0002. Enables one editorial record per language.
ALTER TABLE posts ADD COLUMN locale TEXT NOT NULL DEFAULT 'en';
ALTER TABLE posts ADD COLUMN translation_key TEXT;
CREATE INDEX IF NOT EXISTS idx_posts_locale_date ON posts(locale, date DESC);
