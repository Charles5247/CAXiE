import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ posts: [], error: 'Supabase not configured' });
    }
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ posts: data || [] });
  } catch (e) {
    return NextResponse.json({ posts: [], error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = createServerClient();
    if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

    const body = await request.json();
    const { data, error } = await supabase.from('blogs').insert([{
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || null,
      image_url: body.image_url || null,
      published: body.published ?? false,
    }]).select().single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
