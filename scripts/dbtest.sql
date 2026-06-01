-- Mirrors the statement shapes used in src/server/db.ts to validate them
-- against real SQLite (Cloudflare D1 is SQLite).
INSERT INTO articles
  (slug, title, excerpt, category, content_html, reading_time, published, date, created_at, updated_at)
  VALUES ('sqltest-1', 'SQL Test', 'ex', 'Direito', '<p>c</p>', '1 min', 1, '2026-05-31', '2026-05-31T00:00:00Z', '2026-05-31T00:00:00Z');

SELECT id, slug, title, published FROM articles WHERE published = 1 ORDER BY date DESC, id DESC LIMIT 3;

UPDATE articles
  SET slug='sqltest-1', title='SQL Test Edited', excerpt='ex2', category='Filosofia',
      content_html='<p>c2</p>', reading_time='1 min', published=0, date='2026-05-31', updated_at='now'
  WHERE slug='sqltest-1';

SELECT title, category, published FROM articles WHERE slug='sqltest-1';

INSERT OR IGNORE INTO categories (name, slug, created_at) VALUES ('Direito', 'direito', 'now');
INSERT OR IGNORE INTO categories (name, slug, created_at) VALUES ('Nova Categoria', 'nova-categoria', 'now');
SELECT id, name, slug FROM categories ORDER BY name ASC;

INSERT OR REPLACE INTO settings (key, value) VALUES ('admin_password_hash', 'pbkdf2$100000$aa$bb');
SELECT value FROM settings WHERE key='admin_password_hash';

INSERT OR REPLACE INTO images (key, content_type, size, created_at) VALUES ('img1.png', 'image/png', 1234, 'now');
SELECT key, content_type AS contentType, size FROM images ORDER BY created_at DESC;

DELETE FROM articles WHERE slug='sqltest-1';
DELETE FROM articles WHERE slug='smoke-test-xyz';
DELETE FROM categories WHERE slug='nova-categoria';
DELETE FROM images WHERE key='img1.png';
SELECT COUNT(*) AS remaining_test_articles FROM articles WHERE slug IN ('sqltest-1','smoke-test-xyz');
