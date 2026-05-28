export type BraveResult = {
  title: string;
  url: string;
  description: string;
  imageUrl: string | null;
  publishedAt: string;
  sourceName: string;
};

const AI_QUERIES = [
  'new AI tool launch',
  'AI agent startup',
  'AI marketing feature',
  'artificial intelligence new app',
  'generative AI update',
];

async function braveSearch(query: string, type: 'web' | 'news' = 'news'): Promise<BraveResult[]> {
  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) return [];

  try {
    const endpoint = type === 'news' 
      ? 'https://api.search.brave.com/res/v1/news/search'
      : 'https://api.search.brave.com/res/v1/web/search';

    const params = new URLSearchParams({
      q: query,
      freshness: 'pd', // last 24 hours
      count: '10',
    });

    const res = await fetch(`${endpoint}?${params}`, {
      headers: {
        'X-Subscription-Token': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Brave API error: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const results: BraveResult[] = [];

    const items = data.results || data.news?.results || [];
    for (const item of items) {
      results.push({
        title: item.title || '',
        url: item.url || '',
        description: item.description || '',
        imageUrl: item.thumbnail?.src || null,
        publishedAt: item.age ? new Date().toISOString() : new Date().toISOString(),
        sourceName: 'Brave Search',
      });
    }

    return results;
  } catch (error) {
    console.error(`Brave search error for "${query}":`, error);
    return [];
  }
}

export async function searchX(): Promise<BraveResult[]> {
  const queries = AI_QUERIES.map(q => `site:x.com ${q}`);
  const results = await Promise.allSettled(queries.map(q => braveSearch(q)));
  
  return results
    .filter((r): r is PromiseFulfilledResult<BraveResult[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .map(r => ({ ...r, sourceName: 'X (Twitter)' }));
}

export async function searchLinkedIn(): Promise<BraveResult[]> {
  const queries = AI_QUERIES.map(q => `site:linkedin.com ${q}`);
  const results = await Promise.allSettled(queries.map(q => braveSearch(q)));
  
  return results
    .filter((r): r is PromiseFulfilledResult<BraveResult[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .map(r => ({ ...r, sourceName: 'LinkedIn' }));
}

export async function searchGeneral(): Promise<BraveResult[]> {
  const results = await Promise.allSettled(AI_QUERIES.map(q => braveSearch(q)));
  
  return results
    .filter((r): r is PromiseFulfilledResult<BraveResult[]> => r.status === 'fulfilled')
    .flatMap(r => r.value);
}

export async function searchAll(): Promise<BraveResult[]> {
  const [xResults, linkedInResults, generalResults] = await Promise.all([
    searchX(),
    searchLinkedIn(), 
    searchGeneral(),
  ]);

  // Deduplicate by URL
  const seen = new Set<string>();
  const all: BraveResult[] = [];
  for (const r of [...xResults, ...linkedInResults, ...generalResults]) {
    if (!seen.has(r.url)) {
      seen.add(r.url);
      all.push(r);
    }
  }

  return all;
}
