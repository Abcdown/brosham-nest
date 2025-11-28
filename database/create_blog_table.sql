-- Blog Posts Table
-- Run this SQL in your database to create the blog_posts table

CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  cover_image VARCHAR(500),
  author_id INT,
  author_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'draft',
  tags TEXT, -- JSON array of tags
  views INT DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_published (published_at),
  INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
