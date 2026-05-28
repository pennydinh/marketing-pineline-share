import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  const posts = await sql`SELECT p.*, a.title as article_title, a.url as article_url FROM posts p JOIN articles a ON p.article_id = a.id ORDER BY p.created_at DESC`;
  return NextResponse.json({ posts });
}

export async function PATCH(req: Request) {
  const { id, content, hashtags } = await req.json();
  await sql`UPDATE posts SET content = ${content}, hashtags = ${hashtags} WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
