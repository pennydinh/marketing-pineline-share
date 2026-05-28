import { NextResponse } from 'next/server';

export const maxDuration = 30;

const getXQuery = () => {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0];
  return `(
    "AI tools" OR "AI workflow" OR "AI for marketing" OR "AI marketing" OR
    "ChatGPT" OR "Claude AI" OR "Gemini" OR "GPT-4" OR "GPT-5" OR
    "new AI" OR "AI update" OR "AI just" OR "AI can now" OR
    "use AI" OR "using AI" OR "AI automation" OR "AI agent" OR
    "AI content" OR "AI productivity" OR "prompt engineering" OR
    "GitHub repos" OR "GitHub projects" OR "open source AI" OR
    "AI directory" OR "AI tools list" OR "built on GitHub" OR
    "growing repos" OR "exploding this week" OR "quietly built" OR
    "voice cloning directory" OR "models in it is free" OR "share tài liệu" OR
    "free AI" OR "AI resource" OR "best AI tools"
  )
  -is:retweet
  min_faves:200
  since:${since}
  lang:en`.replace(/\s+/g, ' ').trim();
};

export async function GET() {
  const rapidApiKey = process.env.RAPID_API_KEY || "";
  const query = getXQuery();
  
  try {
    const res = await fetch(
      `https://twitter-api47.p.rapidapi.com/v3/search?query=${encodeURIComponent(query)}&type=Top`,
      { headers: { "x-rapidapi-host": "twitter-api47.p.rapidapi.com", "x-rapidapi-key": rapidApiKey } }
    );
    
    const data = await res.json();
    
    return NextResponse.json({
      status: res.status,
      query: query,
      keys: Object.keys(data),
      dataLength: (data.data || []).length,
      message: data.message || data.error || null,
      firstItem: (data.data || [])[0] || null
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
