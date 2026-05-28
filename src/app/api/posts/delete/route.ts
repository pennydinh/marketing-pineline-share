import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();
    
    if (ids && ids.length > 0) {
      for (const id of ids) {
        await sql`DELETE FROM posts WHERE id = ${id}`;
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) { 
    return NextResponse.json({ error: String(error) }, { status: 500 }); 
  }
}
