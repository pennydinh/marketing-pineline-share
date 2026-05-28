import { NextResponse } from 'next/server';
import { sql, initDb, seedDb } from '@/lib/db';

export async function GET() {
  try {
    try {
      await initDb();
      await seedDb();
    } catch(e) { /* ignore on subsequent runs */ }

    const [tA] = await sql`SELECT count(*) as c FROM articles`;
    const [nA] = await sql`SELECT count(*) as c FROM articles WHERE status = 'new'`;
    const [tP] = await sql`SELECT count(*) as c FROM posts`;
    const [pT] = await sql`SELECT count(*) as c FROM posts WHERE status = 'posted' AND date(created_at) = CURRENT_DATE`;
    
    const recentPosts = await sql`
      SELECT p.id, a.title, p.status, p.format, p.created_at 
      FROM posts p JOIN articles a ON p.article_id = a.id 
      ORDER BY p.created_at DESC LIMIT 5`;

    return NextResponse.json({
      stats: { totalArticles: tA.c, newArticles: nA.c, totalPosts: tP.c, postedToday: pT.c },
      recentPosts
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
