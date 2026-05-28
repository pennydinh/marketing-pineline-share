require('dotenv').config({ path: '../.env.local' });
const { neon } = require('@neondatabase/serverless');

async function check() {
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  const posts = await sql`SELECT id, content, status, scheduled_time, facebook_post_id, create_video, video_status FROM posts ORDER BY created_at DESC LIMIT 5`;
  console.log(posts);
}
check();
