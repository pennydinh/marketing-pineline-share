require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!dbUrl) {
  console.log('Không tìm thấy DATABASE_URL');
  process.exit(1);
}

const sql = neon(dbUrl);

async function purge() {
  console.log('🧹 Đang quét dọn toàn bộ bài rác cũ trong Database...');
  try {
    // Đánh dấu tất cả video bị kẹt thành hoàn tất
    const res1 = await sql`UPDATE posts SET video_status = 'completed' WHERE video_status IN ('pending', 'error') RETURNING id`;
    // Đánh dấu tất cả lệnh group bị kẹt thành hoàn tất
    const res2 = await sql`UPDATE posts SET status = 'groups_posted' WHERE status = 'ready_for_groups' RETURNING id`;
    
    console.log(`✅ Đã vứt vào sọt rác: ${res1.length} kẹt Video, ${res2.length} kẹt Group.`);
    console.log('🎉 Database đã sạch bóng! Bạn có thể lên Vercel tạo bài mới tinh rồi nha!');
  } catch (e) {
    console.log('❌ Lỗi:', e.message);
  }
}

purge();
