require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if(!dbUrl) { console.log('No DB URL'); process.exit(1); }
const sql = neon(dbUrl);

async function purge() {
  try {
    const res1 = await sql`UPDATE posts SET video_status = 'completed' WHERE video_status IN ('pending', 'error')`;
    const res2 = await sql`UPDATE posts SET status = 'groups_posted' WHERE status = 'ready_for_groups'`;
    console.log(`Đã dọn dẹp DB sạch sẽ! (Video: ${res1.length}, Group: ${res2.length})`);
  } catch(e) { console.log(e); }
}
purge();
