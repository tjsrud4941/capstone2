-- 댓글 테이블
CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  author     TEXT    NOT NULL,
  content    TEXT    NOT NULL,
  created_at TEXT    NOT NULL
);

-- 문의 테이블
CREATE TABLE IF NOT EXISTS contacts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  message    TEXT    NOT NULL,
  created_at TEXT    NOT NULL
);
