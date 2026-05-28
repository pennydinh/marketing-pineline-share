import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; AIContentBot/1.0)',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['post-thumbnail', 'postThumbnail'],
    ]
  }
});

const AI_KEYWORDS = [
  // Tin tức AI mới
  'ai', 'artificial intelligence', 'generative ai', 'gen ai',
  'gpt', 'chatgpt', 'openai', 'claude', 'anthropic', 'gemini', 'google ai',
  'llm', 'large language model', 'ai agent', 'ai update', 'new ai',
  // Ứng dụng AI thực chiến
  'ai tools', 'ai workflow', 'ai automation', 'ai productivity',
  'ai marketing', 'ai content', 'ai for business', 'ai for work',
  'prompt engineering', 'ai writing', 'ai image', 'ai video',
  'copilot', 'midjourney', 'dall-e', 'sora', 'runway',
  // Tin ấn tượng
  'launch', 'raises', 'funding', 'breakthrough', 'new feature',
  'beats', 'surpasses', 'acquires', 'partnership',
];

function isAIRelated(title: string, summary: string): boolean {
  const text = `${title} ${summary}`.toLowerCase();
  return AI_KEYWORDS.some(keyword => text.includes(keyword));
}

export type ScrapedArticle = {
  title: string;
  url: string;
  summary: string;
  imageUrl: string | null;
  publishedAt: string;
  sourceName: string;
};

export async function scrapeRSSFeed(feedUrl: string, sourceName: string): Promise<ScrapedArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48h to be safe

    const articles: ScrapedArticle[] = [];

    for (const item of feed.items || []) {
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
      
      if (pubDate < oneDayAgo) continue;

      const title = item.title || '';
      const summary = item.contentSnippet || item.content || '';

      if (!isAIRelated(title, summary)) continue;

      // Try to extract image
      let imageUrl: string | null = null;
      if (item.enclosure?.url) {
        imageUrl = item.enclosure.url;
      } else if (item.mediaContent?.$?.url) {
        imageUrl = item.mediaContent.$.url;
      } else if (item.mediaThumbnail?.$?.url) {
        imageUrl = item.mediaThumbnail.$.url;
      } else {
        const imgMatch = (item.content || '').match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      // Fallback: fetch og:image từ trang bài báo nếu chưa có ảnh
      if (!imageUrl && item.link) {
        try {
          const pageRes = await fetch(item.link, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
            signal: AbortSignal.timeout(5000),
          });
          if (pageRes.ok) {
            const html = await pageRes.text();
            const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                         || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
            if (ogMatch) imageUrl = ogMatch[1];
          }
        } catch (e) { /* bỏ qua nếu timeout */ }
      }

      articles.push({
        title: title.trim(),
        url: item.link || '',
        summary: summary.substring(0, 500).trim(),
        imageUrl,
        publishedAt: pubDate.toISOString(),
        sourceName,
      });
    }

    return articles;
  } catch (error) {
    console.error(`Error scraping RSS ${feedUrl}:`, error);
    return [];
  }
}

export async function scrapeAllRSSFeeds(sources: Array<{ name: string; rss_url: string }>): Promise<ScrapedArticle[]> {
  const results = await Promise.allSettled(
    sources.map(s => scrapeRSSFeed(s.rss_url, s.name))
  );

  const articles: ScrapedArticle[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  return articles;
}
