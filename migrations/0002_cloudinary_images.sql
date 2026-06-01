-- Switch image storage from R2 to Cloudinary: track public_id + delivered URL.
DROP TABLE IF EXISTS images;

CREATE TABLE images (
  public_id    TEXT PRIMARY KEY,
  url          TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size         INTEGER NOT NULL,
  created_at   TEXT NOT NULL
);
