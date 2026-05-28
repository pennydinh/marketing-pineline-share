import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { postToFacebook, postToGroups } from '@/lib/facebook/poster';

export async function POST(req: Request) {
  try {
    const { postId, imageType, scheduledTime, overrideContent, overrideHashtags, postTarget = 'page', createVideo = false } = await req.json();
    const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    if (!post) throw new Error("Post not found");

    const imgUrl = imageType === 'generated' ? post.generated_image_url : post.original_image_url;
    const finalContent = overrideContent ?? post.content;
    const finalHashtags = overrideHashtags ?? post.hashtags;

    if (scheduledTime) {
      const nowEpoch = Math.floor(Date.now() / 1000);
      if (scheduledTime < nowEpoch + 15 * 60) {
        return NextResponse.json({ error: "Thời gian hẹn giờ bị lỗi: Thời gian hẹn đăng phải cách hiện tại ít nhất 15 phút theo quy định của Facebook Meta Reels." }, { status: 400 });
      }
    }

    // Thêm các cột cho tính năng Video và lưu vết Ảnh đã chọn
    try {
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS create_video BOOLEAN DEFAULT FALSE`;
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS video_status VARCHAR(20) DEFAULT 'none'`;
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS selected_image_url TEXT`;
    } catch (e) {
      console.warn('Cột video hoặc ảnh đã tồn tại', e);
    }

    // Lưu nội dung đã chỉnh sửa, cắm cờ flag video, và LƯU ẢNH ƯU TIÊN vào DB để thằng Bot biết đường đi lấy
    await sql`UPDATE posts SET content = ${finalContent}, hashtags = ${finalHashtags}, create_video = ${createVideo}, video_status = ${createVideo ? 'pending' : 'none'}, selected_image_url = ${imgUrl} WHERE id = ${postId}`;

    const results: any = {};

    // --- Đăng Page (có thể schedule) ---
    if (postTarget === 'page' || postTarget === 'all') {
      const fbRes = await postToFacebook(finalContent, finalHashtags, imgUrl, scheduledTime);
      if (fbRes.id) {
        results.page = { success: true, id: fbRes.post_id || fbRes.id };
        await sql`UPDATE posts SET status = 'posted', facebook_post_id = ${fbRes.post_id || fbRes.id} WHERE id = ${postId}`;
      } else {
        results.page = { success: false, error: fbRes.error?.message || 'FB API Error' };
      }
    }

    // --- Đăng Hội Nhóm ---
    if (postTarget === 'groups' || postTarget === 'all') {
      try {
        await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS scheduled_time bigint`;
      } catch (e) {
        console.warn('Cột scheduled_time có thể đã tồn tại', e);
      }
      
      const ts = scheduledTime || null;
      await sql`UPDATE posts SET status = 'ready_for_groups', scheduled_time = ${ts} WHERE id = ${postId}`;
      results.groups = [{ success: true, message: 'Đã đánh dấu chờ Bot xử lý (có thể hẹn giờ)' }];
    }

    // --- Chỉ Tạo Video Reel (không đăng nhóm) ---
    if (postTarget === 'reels') {
      const ts = scheduledTime || null;
      await sql`UPDATE posts SET create_video = true, video_status = 'pending', status = 'posted', scheduled_time = ${ts} WHERE id = ${postId}`;
      results.reels = { success: true, message: 'Đã gửi lệnh tạo Video Reel cho Bot' };
    }

    // Kiểm tra có thành công không
    const pageOk = !results.page || results.page.success;
    const groupsOk = !results.groups || results.groups.some((r: any) => r.success);
    const overallSuccess = pageOk && groupsOk;

    if (!overallSuccess && postTarget === 'page') {
      return NextResponse.json({ error: results.page?.error || 'FB API Error' }, { status: 400 });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) { return NextResponse.json({ error: String(error) }, { status: 500 }); }
}
