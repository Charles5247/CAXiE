import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function PUT(request, { params }) {
  try {
    const supabase = createServerClient();
    if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

    const body = await request.json();
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || null,
        image_url: body.image_url || null,
        published: body.published ?? false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const supabase = createServerClient();
    if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

    const { error } = await supabase.from('blogs').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
