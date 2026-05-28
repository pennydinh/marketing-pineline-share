import { neon } from '@neondatabase/serverless';

if (!process.env.POSTGRES_URL) {
  console.warn("POSTGRES_URL is not defined in environment variables. Database operations will fail.");
}

export const sql = neon(process.env.POSTGRES_URL || 'postgresql://dummy:dummy@dummy/dummy');

export async function initDb() {
  await sql`CREATE TABLE IF NOT EXISTS sources (id TEXT PRIMARY KEY, name TEXT, url TEXT, type TEXT DEFAULT 'rss', rss_url TEXT, active INTEGER DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`CREATE TABLE IF NOT EXISTS articles (id TEXT PRIMARY KEY, source_id TEXT, title TEXT, url TEXT UNIQUE, summary TEXT, original_image_url TEXT, published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, status TEXT DEFAULT 'new', format TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, article_id TEXT, format TEXT, content TEXT, hashtags TEXT, generated_image_url TEXT, original_image_url TEXT, facebook_post_id TEXT, scheduled_time TEXT, status TEXT DEFAULT 'draft', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
}

export async function seedDb() {
  await sql`
  INSERT INTO sources (id, name, url, type, rss_url) VALUES
    ('s1', 'TechCrunch', 'https://techcrunch.com/', 'rss', 'https://techcrunch.com/feed/'),
    ('s2', 'NFX', 'https://www.nfx.com/', 'rss', 'https://www.nfx.com/feed/'),
    ('s3', 'Indie Hackers', 'https://www.indiehackers.com/', 'rss', 'https://www.indiehackers.com/feed'),
    ('s4', 'a16z', 'https://a16z.com/', 'rss', 'https://a16z.com/feed/'),
    ('s5', 'Crunchbase News', 'https://news.crunchbase.com/', 'rss', 'https://news.crunchbase.com/feed/'),
    ('s6', 'TechStartups', 'https://techstartups.com/', 'rss', 'https://techstartups.com/feed/')
  ON CONFLICT (id) DO NOTHING;
  `;
}
