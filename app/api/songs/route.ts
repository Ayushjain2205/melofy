import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data: songs, error } = await supabase
    .from('songs')
    .select('*')
    .limit(4);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Songs from DB:', songs);

  // Ensure songs have required fields
  const processedSongs = (songs || []).map(song => ({
    ...song,
    price: song.price || 0,
    gain: song.gain || 0,
    data: song.data || []
  }));

  return NextResponse.json(processedSongs);
}
