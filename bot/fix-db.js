require('dotenv').config({ path: '../.env.local' });
const { neon } = require('@neondatabase/serverless');

async function fix() {
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  await sql`UPDATE posts SET video_status = 'pending' WHERE video_status = 'error'`;
  console.log("Fixed Error Videos back to Pending!");
}
fix();
