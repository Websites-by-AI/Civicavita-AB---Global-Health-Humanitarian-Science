-- Run once after 0003. Adds generated editorial cover images to blog records.
ALTER TABLE posts ADD COLUMN cover_image TEXT;
