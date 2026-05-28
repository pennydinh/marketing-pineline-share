import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const filter = url.searchParams.get('filter') || 'all';

  const articles = await sql`
    SELECT a.*, s.name as source_name, s.type as source_type 
    FROM articles a JOIN sources s ON a.source_id = s.id 
    ORDER BY a.published_at DESC LIMIT 50
  `;

  const filtered = articles.filter((a: any) => {
    if (filter === 'news') return a.source_type === 'rss';
    if (filter === 'x') return a.source_name === 'X (Twitter)';
    if (filter === 'instagram') return a.source_name === 'Instagram';
    return true;
  });

  return NextResponse.json({ articles: filtered });
}
