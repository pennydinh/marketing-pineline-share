import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    await sql`DELETE FROM articles`;
    await sql`DELETE FROM sources`;
    return NextResponse.json({ success: true, message: 'Database cleared' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
