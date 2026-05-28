import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { writeArticle } from '@/lib/ai/writer';
import { generateImageResponse } from '@/lib/ai/image-generator';

export async function POST(req: Request) {
  try {
    const { selections } = await req.json();

    for (const { id: articleId, format } of selections) {
      const [article] = await sql`SELECT * FROM articles WHERE id = ${articleId}`;
      if (!article) continue;
      
      const { content, hashtags } = await writeArticle(article.title, article.summary, format);
      const generatedImage = await generateImageResponse(article.title);
      
      const postId = "p_" + Math.random().toString(36).substring(7);
      await sql`INSERT INTO posts (id, article_id, format, content, hashtags, original_image_url, generated_image_url) VALUES (${postId}, ${article.id}, ${format}, ${content}, ${hashtags}, ${article.original_image_url}, ${generatedImage})`;
      await sql`UPDATE articles SET status = 'written' WHERE id = ${article.id}`;
    }
    return NextResponse.json({ success: true, count: selections.length });
  } catch (error) { return NextResponse.json({ error: String(error) }, { status: 500 }); }
}
