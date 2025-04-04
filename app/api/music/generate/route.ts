import { NextRequest, NextResponse } from 'next/server';
import { fal } from "@fal-ai/client";

interface CassetteAIInput {
  prompt: string;
  duration: number;
}

interface CassetteAIResponse {
  audio_file: {
    url: string;
  };
  [key: string]: any;
}

// Initialize fal client
if (!process.env.FAL_KEY) {
  throw new Error('FAL_KEY is not configured');
}

fal.config({
  credentials: process.env.FAL_KEY
});

export async function POST(request: NextRequest) {
  try {
    console.log('Received request to generate music');
    const { prompt } = await request.json();
    console.log('Prompt received:', prompt);

    if (!prompt) {
      console.error('No prompt provided');
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log('Calling fal.ai API...');
    const result = await fal.subscribe("CassetteAI/music-generator", {
      input: {
        prompt,
        duration: 30
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach((msg) => console.log('Fal.ai log:', msg));
        }
      },
    });

    console.log('Generation result:', {
      data: result.data,
      requestId: result.requestId
    });

    if (!result.data?.audio_file?.url) {
      console.error('No audio URL in response');
      return NextResponse.json(
        { error: "No audio URL generated" },
        { status: 500 }
      );
    }

    const audioUrl = result.data.audio_file.url;
    console.log('Successfully generated audio URL:', audioUrl);
    return NextResponse.json({ 
      audioUrl,
      requestId: result.requestId 
    });
  } catch (error: any) { 
    const errorMessage = error?.message || "Failed to generate music";
    const errorDetails = {
      message: errorMessage,
      name: error?.name || 'UnknownError',
      stack: error?.stack,
      raw: error
    };
    
    console.error("Detailed error in music generation:", errorDetails);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
