import { NextRequest, NextResponse } from 'next/server';
import { Song } from "@/types/song";

const generatePriceData = (startPrice: number, days: number) => {
  const data = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < days; i++) {
    // Add some realistic price movements
    const change = (Math.random() - 0.45) * 0.01 * currentPrice;
    currentPrice = Math.max(0.001, currentPrice + change);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(3))
    });
  }
  
  return data;
};

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Cyber Dreams",
    artist: "Neural Beats",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%207.56.45%E2%80%AFAM-8Mp4TeEjhrlAB3q3qRKXY16VmVt5Ex.png",
    price: 0.328,
    gain: 15.3,
    ticker: "$CYBER",
    bondingCurve: 85.5,
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    data: generatePriceData(0.25, 30)
  },
  {
    id: "2",
    title: "Digital Horizon",
    artist: "AI Ensemble",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%207.56.45%E2%80%AFAM-8Mp4TeEjhrlAB3q3qRKXY16VmVt5Ex.png",
    price: 0.18,
    gain: -5.2,
    ticker: "$DIGI",
    bondingCurve: 62.7,
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3",
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 0.20 + Math.random() * 0.15
    }))
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const song = mockSongs.find((s) => s.id === params.id);
  if (!song) {
    console.warn(`Song with id ${params.id} not found. Returning a default song.`);
    return NextResponse.json({
      id: "default",
      title: "Default Song",
      artist: "Unknown Artist",
      image: "/placeholder.svg?height=64&width=64",
      price: 0.1,
      gain: 0,
      ticker: "$DEFAULT",
      bondingCurve: 50,
      audioUrl: "https://v3.fal.media/files/panda/T-GP6cbpo1lgL8ll4oKGj_generated.wav",
      data: [{ price: 0.1, date: new Date().toISOString().split('T')[0] }],
    });
  }
  
  return NextResponse.json(song);
}
