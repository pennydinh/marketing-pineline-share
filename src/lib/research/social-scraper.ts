import { ScrapedArticle } from './rss-scraper';

// Query X: AI ứng dụng thực chiến, tin mới, tương tác cao
// min_faves:200 = chỉ lấy bài có ít nhất 200 likes
// -is:retweet = không lấy retweet
// since: = chỉ lấy bài trong 48h gần nhất
const getXQuery = () => {
  // Rút gọn query vì RapidAPI thường bị lỗi trả về 0 kết quả nếu query quá dài
  return `("AI tools" OR "AI workflow" OR "AI marketing" OR "ChatGPT" OR "Claude AI" OR "Midjourney") -is:retweet min_faves:200 lang:en`;
};

// Hashtags IG: AI tools thực chiến, marketing AI, tin mới
const IG_HASHTAGS = [
  'aitools',
  'aimarketing',
  'artificialintelligence',
  'chatgpt',
  'aiforwork',
];

export async function searchSocialMedia(platform: 'x' | 'instagram'): Promise<ScrapedArticle[]> {
  const rapidApiKey = process.env.RAPID_API_KEY || "bf3904843emsh35b81dd984cad0dp101674jsnfec69e42f262";
  const braveApiKey = process.env.BRAVE_API_KEY;
  const sourceName = platform === 'x' ? 'X (Twitter)' : 'Instagram';

  try {
    if (platform === 'x') {
      console.log(`[X] Đang tìm bài AI tương tác cao, mới nhất 48h...`);
      const queryContent = getXQuery();
      const res = await fetch(
        `https://twitter-api47.p.rapidapi.com/v3/search?query=${encodeURIComponent(queryContent)}&type=Top`,
        { headers: { "x-rapidapi-host": "twitter-api47.p.rapidapi.com", "x-rapidapi-key": rapidApiKey } }
      );
      const data = await res.json();
      console.log(`[X-API] Status: ${res.status}, Keys:`, Object.keys(data || {}), 'data.length:', (data.data || []).length);

      let items: any[] = [];
      if (data.data) {
        items = data.data
          .filter((item: any) => item.type === 'tweet')
          .map((i: any) => i.content)
          // Sắp xếp theo likes cao nhất
          .sort((a: any, b: any) => (b.likeCount || 0) - (a.likeCount || 0))
          .slice(0, 15);
      }
      console.log(`[X-API] Filtered tweet items: ${items.length}`);

      if (items.length > 0) {
        return items.map((item: any) => {
          let mediaUrl: string | null = null;

          // 1. Ảnh/video đính kèm trực tiếp (main tweet)
          const media = item.media?.[0];
          if (media) {
            mediaUrl =
              media.thumbnailUrl ||
              media.previewImageUrl ||
              media.preview_image_url ||
              media.media_url_https ||
              media.url ||
              null;
          }

          // 2. Quoted tweet media (tweet được quote lại)
          if (!mediaUrl) {
            const quotedMedia =
              item.quotedTweet?.media?.[0] ||
              item.quoted_tweet?.media?.[0] ||
              item.quotedStatus?.media?.[0] ||
              item.quoted_status?.extended_entities?.media?.[0] ||
              null;
            if (quotedMedia) {
              mediaUrl =
                quotedMedia.thumbnailUrl ||
                quotedMedia.previewImageUrl ||
                quotedMedia.media_url_https ||
                quotedMedia.url ||
                null;
            }
          }

          // 3. Card image (ảnh preview từ link đính kèm — polymarket, báo, v.v.)
          if (!mediaUrl) {
            const card = item.card?.legacy?.binding_values || item.card?.bindingValues || {};
            const cardThumb =
              card.thumbnail_image_original?.image_value?.url ||
              card.thumbnail_image?.image_value?.url ||
              null;
            if (cardThumb) mediaUrl = cardThumb;
          }

          // 4. URL entities preview image
          if (!mediaUrl && item.entities?.urls?.length > 0) {
            for (const u of item.entities.urls) {
              const img = u.images?.[0]?.url || u.display_image?.url || null;
              if (img) { mediaUrl = img; break; }
            }
          }

          const username = item.user?.username || 'unknown';
          const likes = (item.likeCount || 0).toLocaleString();
          const rts = (item.retweetCount || 0).toLocaleString();
          
          let summaryText = item.text || item.fullText || '';
          if (item.entities?.urls?.length > 0) {
            const urls = item.entities.urls.map((u: any) => u.expanded_url || u.url).join(' ');
            summaryText += `\n[Shared URLs: ${urls}]`;
          }

          return {
            title: `@${username} — ${likes} Likes · ${rts} RTs`,
            url: `https://x.com/${username}/status/${item.id}`,
            summary: summaryText,
            imageUrl: mediaUrl,
            publishedAt: item.createdAt || new Date().toISOString(),
            sourceName,
          };
        });
      }
    } else if (platform === 'instagram') {
      console.log(`[IG] Đang tìm bài AI tương tác cao từ ${IG_HASHTAGS.length} hashtags...`);

      // Gọi nhiều hashtag, gom lại, sắp xếp theo likes
      const allItems: any[] = [];

      for (const hashtag of IG_HASHTAGS) {
        try {
          let data: any = null;

          // Thử endpoint 1: instagram-scraper-api2
          try {
            const res1 = await fetch(
              `https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag?hashtag=${hashtag}`,
              { headers: { "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com", "x-rapidapi-key": rapidApiKey } }
            );
            const d1 = await res1.json();
            console.log(`[IG-api2] #${hashtag} status:`, res1.status, 'keys:', Object.keys(d1 || {}));
            if (res1.ok && !d1.message && !d1.error) data = { source: 'api2', ...d1 };
          } catch (e1) {
            console.warn(`[IG-api2] #${hashtag} fail:`, e1);
          }

          // Fallback endpoint 2: instagram-scraper-stable-api
          if (!data) {
            try {
              const res2 = await fetch(
                `https://instagram-scraper-stable-api.p.rapidapi.com/search_hashtag.php?hashtag=${hashtag}`,
                { headers: { "x-rapidapi-host": "instagram-scraper-stable-api.p.rapidapi.com", "x-rapidapi-key": rapidApiKey } }
              );
              const d2 = await res2.json();
              console.log(`[IG-stable] #${hashtag} status:`, res2.status, 'keys:', Object.keys(d2 || {}));
              if (res2.ok) data = { source: 'stable', ...d2 };
            } catch (e2) {
              console.warn(`[IG-stable] #${hashtag} fail:`, e2);
            }
          }

          if (!data) { console.warn(`[IG] #${hashtag}: cả 2 endpoint đều fail`); continue; }

          // Parse nodes tuỳ theo source/format
          let nodes: any[] = [];
          if (data.source === 'api2') {
            if (data?.data?.items?.length > 0) {
              nodes = data.data.items;
            } else if (data?.data?.sections) {
              for (const sec of data.data.sections) {
                const medias = sec?.layout_content?.medias || [];
                nodes.push(...medias.map((m: any) => m.media).filter(Boolean));
              }
            } else if (Array.isArray(data?.items)) {
              nodes = data.items;
            }
          } else {
            // stable api format
            if (data.top_posts?.edges?.length > 0) {
              nodes = data.top_posts.edges.map((e: any) => e.node);
            } else if (data.posts?.edges?.length > 0) {
              nodes = data.posts.edges.map((e: any) => e.node);
            } else if (Array.isArray(data.data)) {
              nodes = data.data;
            } else if (data.hashtag?.edge_hashtag_to_media?.edges?.length > 0) {
              nodes = data.hashtag.edge_hashtag_to_media.edges.map((e: any) => e.node);
            }
          }
          console.log(`[IG] #${hashtag} nodes found:`, nodes.length, '(source:', data.source, ')');

          // Lọc bài mới trong 14 ngày (nới rộng để đủ data)
          const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
          const freshNodes = nodes.filter((n: any) => {
            const ts = (n.taken_at || n.taken_at_timestamp || 0) * 1000;
            return ts === 0 || ts > fourteenDaysAgo; // nếu không có timestamp thì vẫn giữ
          });

          allItems.push(...freshNodes.map((n: any) => ({ ...n, _hashtag: hashtag })));
        } catch (e) {
          console.warn(`[IG] Lỗi hashtag #${hashtag}:`, e);
        }
      }

      if (allItems.length > 0) {
        // Sắp xếp theo likes cao nhất, lấy top 15
        const sorted = allItems
          .sort((a, b) => {
            const likesA = a.like_count || a.edge_liked_by?.count || 0;
            const likesB = b.like_count || b.edge_liked_by?.count || 0;
            return likesB - likesA;
          })
          .slice(0, 15);

        return sorted.map((node: any) => {
          // Caption: api2 dùng caption.text, api cũ dùng edge_media_to_caption
          const caption =
            node.caption?.text ||
            node.edge_media_to_caption?.edges?.[0]?.node?.text || '';
          const likes = (node.like_count || node.edge_liked_by?.count || 0).toLocaleString();
          const hashtag = node._hashtag || '';
          // Ảnh: api2 dùng image_versions2.candidates[0].url
          const imgUrl =
            node.image_versions2?.candidates?.[0]?.url ||
            node.display_url ||
            node.thumbnail_src ||
            null;
          const shortcode = node.code || node.shortcode || node.pk || '';

          return {
            title: `IG #${hashtag} — ${likes} Likes · ${caption.substring(0, 40)}...`,
            url: `https://instagram.com/p/${shortcode}`,
            summary: caption,
            imageUrl: imgUrl,
            publishedAt: new Date((node.taken_at || node.taken_at_timestamp || 0) * 1000).toISOString(),
            sourceName,
          };
        });
      }
    }
  } catch (error: any) {
    console.warn(`[CẢNH BÁO] ${platform} API thất bại, chuyển sang Brave Search. Lỗi:`, error.message);
    throw new Error(`[DEBUG] X API parsing error: ${error.message} - Stack: ${error.stack}`);
  }

  // FALLBACK: Brave Search
  if (!braveApiKey) return [];

  const braveQuery = platform === 'x'
    ? `site:x.com/i/web/status OR site:twitter.com/i/web/status ("AI tools" OR "AI workflow" OR "AI marketing" OR "ChatGPT update" OR "new AI feature")`
    : `site:instagram.com/p (#aitools OR #aimarketing OR #chatgpt OR #aiforwork) AI`;

  try {
    const res = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(braveQuery)}&freshness=pw`,
      { headers: { 'X-Subscription-Token': braveApiKey, 'Accept': 'application/json' } }
    );
    const data = await res.json();

    const articles: ScrapedArticle[] = [];
    if (data.web?.results) {
      for (const r of data.web.results) {
        if (platform === 'x' && !r.url.includes('/status/')) continue;
        articles.push({
          title: r.title,
          url: r.url,
          summary: r.description || '',
          imageUrl: null,
          publishedAt: new Date().toISOString(),
          sourceName,
        });
      }
    }
    return articles;
  } catch (err) {
    console.error("Brave search error", err);
    return [];
  }
}
