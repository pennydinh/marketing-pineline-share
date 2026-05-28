import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    
    // Đánh dấu bài viết là ready_for_groups để cho Bot nhận diện
    await sql`UPDATE posts SET status = 'ready_for_groups' WHERE id = ${postId}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
