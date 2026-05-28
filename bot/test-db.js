require('dotenv').config({ path: '../.env.local' });
const { neon } = require('@neondatabase/serverless');

async function test() {
  try {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    const sql = neon(dbUrl);
    
    // Check table schema
    const result = await sql`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'posts'
    `;
    console.log("POSTS SCHEMA:");
    console.table(result);

    // Let's manually trigger the same INSERT that /api/write does
    const postId = "p_test123";
    console.log("Attempting insert...");
    await sql`INSERT INTO posts (id, article_id, format, content, hashtags, original_image_url, generated_image_url) VALUES (${postId}, 'a_test', 'pov', 'test', '#test', null, null)`;
    console.log("INSERT successful!");
    await sql`DELETE FROM posts WHERE id = ${postId}`;
  } catch(e) {
    console.log("ERROR:", e);
  }
}
test();
