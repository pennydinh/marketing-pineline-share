import { NextResponse } from 'next/server';
import { sql, initDb, seedDb } from '@/lib/db';
import { scrapeAllRSSFeeds, ScrapedArticle } from '@/lib/research/rss-scraper';
import { searchSocialMedia } from '@/lib/research/social-scraper';

export const maxDuration = 60; // Thêm dòng này để Vercel không bị Timeout

export async function POST(req: Request) {
  try {
    // Khởi tạo Database nếu chưa có
    try {
      await initDb();
      await seedDb();
    } catch(e) { console.error("DB Init Error:", e) }

    const { sourceFilter } = await req.json(); // 'all', 'news', 'x', 'instagram'

    
    let articles: ScrapedArticle[] = [];

    if (sourceFilter === 'all' || sourceFilter === 'news') {
      const rssSources = await sql`SELECT name, rss_url FROM sources WHERE type = 'rss' AND active = 1`;
      const rssData = await scrapeAllRSSFeeds(rssSources as any);
      articles = [...articles, ...rssData];
    }
    
    if (sourceFilter === 'all' || sourceFilter === 'x') {
      const xData = await searchSocialMedia('x');
      console.log(`[RESEARCH] X scan returned ${xData.length} results`);
      articles = [...articles, ...xData];
    }


    if (sourceFilter === 'all' || sourceFilter === 'instagram') {
      const igData = await searchSocialMedia('instagram');
      articles = [...articles, ...igData];
    }
    
    let count = 0;
    
    for (const a of articles) {
      // Create ad-hoc source if not exists
      let [source] = await sql`SELECT id FROM sources WHERE name = ${a.sourceName}`;
      if (!source) {
        const newSourceId = "s_" + Math.random().toString(36).substring(7);
        await sql`INSERT INTO sources (id, name, type) VALUES (${newSourceId}, ${a.sourceName}, 'social')`;
        source = { id: newSourceId };
      }

      try {
        const id = "a_" + Math.random().toString(36).substring(7);
        // Convert ảnh gốc sang base64 ngay lúc scrape để tránh URL expire
        let imageData = a.imageUrl;
        if (a.imageUrl && a.imageUrl.startsWith('http')) {
          // Chọn Referer phù hợp theo nguồn
          const referer = a.sourceName === 'Instagram'
            ? 'https://www.instagram.com/'
            : a.sourceName === 'X (Twitter)'
            ? 'https://twitter.com/'
            : undefined;

          try {
            const imgRes = await fetch(a.imageUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                ...(referer ? { 'Referer': referer } : {}),
              },
              signal: AbortSignal.timeout(5000),
            });
            if (imgRes.ok) {
              const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
              const buf = await imgRes.arrayBuffer();
              const base64 = Buffer.from(buf).toString('base64');
              imageData = `data:${contentType};base64,${base64}`;
            }
          } catch (e) { /* giữ URL gốc nếu fetch thất bại */ }
        }
        await sql`INSERT INTO articles (id, source_id, title, url, summary, original_image_url) VALUES (${id}, ${source.id}, ${a.title}, ${a.url}, ${a.summary}, ${imageData}) ON CONFLICT DO NOTHING`;
        count++;
      } catch (e) { /* ignore duplicate URL */ }
    }
    return NextResponse.json({ success: true, count });
  } catch (error) { return NextResponse.json({ error: String(error) }, { status: 500 }); }
}
