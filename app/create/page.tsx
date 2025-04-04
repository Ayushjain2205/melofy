"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import SongPixelArt from "@/components/SongPixelArt"
import { MusicPlayer } from "@/components/MusicPlayer"
import { useMusicPlayer } from "@/app/contexts/MusicPlayerContext"
import { Loader2, Play, Pause, Share2, Zap, Rocket } from "lucide-react"
import { toast } from "sonner"

const genres = ["Synthwave", "Cyberpunk", "Vaporwave", "Chiptune", "Darksynth", "Retrowave"]
const moods = ["Energetic", "Melancholic", "Dreamy", "Intense", "Relaxed", "Mysterious"]

export default function CreatePage() {
  const [songTitle, setSongTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [genre, setGenre] = useState("")
  const [mood, setMood] = useState("")
  const [duration, setDuration] = useState(30)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { currentSong, isPlaying, togglePlayPause, setCurrentSongById } = useMusicPlayer()

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt for your song");
      return;
    }

    setIsGenerating(true);
    try {
      // Create a detailed prompt combining all the user inputs
      const fullPrompt = `Create a ${duration}-second ${genre ? genre.toLowerCase() : ''} music track${
        mood ? ` with a ${mood.toLowerCase()} mood` : ''
      }. ${prompt}`.trim();
      
      console.log('Sending generation request with prompt:', fullPrompt);

      // Call our API endpoint
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate music');
      }

      console.log('Setting generated audio URL:', data.audioUrl);
      console.log('Request ID:', data.requestId);
      setGeneratedAudio(data.audioUrl);

      // Set the generated song as the current song in the music player
      setCurrentSongById("generated-song-id");
      
      toast.success("Your AI song has been generated!");
    } catch (error) {
      console.error("Detailed error in handleGenerate:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate music. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    // Update the music player context when a new song is generated
    if (generatedAudio) {
      setCurrentSongById("generated-song-id")
    }
  }, [generatedAudio, setCurrentSongById])

  const getTicker = (title: string) => {
    return `$${title.replace(/\s+/g, "").slice(0, 4).toUpperCase()}`
  }

  return (
    <div className="min-h-screen bg-[#0D0D15] text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-[#00FFFF] font-audiowide mb-4">Craft Your AI Melody</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label htmlFor="songTitle" className="block text-lg font-medium text-[#FF99D1] mb-2">
                Song Title
              </label>
              <Input
                id="songTitle"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Enter your song title..."
                className="w-full bg-[#1A1522] border-[#FF00FF] text-white"
              />
            </div>

            <div>
              <label htmlFor="prompt" className="block text-lg font-medium text-[#FF99D1] mb-2">
                Song Prompt
              </label>
              <Textarea
                id="prompt"
                placeholder="Describe your song idea..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#1A1522] border-[#FF00FF] text-white h-32"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-[#FF99D1] mb-2">Genre</label>
              <div className="grid grid-cols-3 gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`p-2 rounded-md text-sm font-medium ${
                      genre === g ? "bg-[#FF00FF] text-white" : "bg-[#1A1522] text-[#FF99D1] hover:bg-[#FF00FF]/20"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-[#FF99D1] mb-2">Mood</label>
              <div className="grid grid-cols-3 gap-2">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`p-2 rounded-md text-sm font-medium ${
                      mood === m ? "bg-[#00FFFF] text-[#0D0D15]" : "bg-[#1A1522] text-[#00FFFF] hover:bg-[#00FFFF]/20"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block text-lg font-medium text-[#FF99D1] mb-2">
                Duration
              </label>
              <Slider
                id="duration"
                min={5}
                max={60}
                step={1}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                className="w-full"
              />
              <span className="text-sm text-[#FF99D1] mt-1">{duration} seconds</span>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#FF00FF] text-white hover:bg-[#FF66B8] text-lg py-6"
            >
              {isGenerating ? "Generating..." : generatedAudio ? "Regenerate" : "Generate AI Song"}
            </Button>
          </div>

          <div className="space-y-8">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-[#FF00FF] rounded-full opacity-20 animate-ping"></div>
                  <div className="absolute inset-0 bg-[#FF00FF] rounded-full opacity-30 animate-pulse"></div>
                  <Loader2 className="w-32 h-32 text-[#FF00FF] animate-spin" />
                </div>
                <p className="text-xl font-bold text-[#00FFFF] font-audiowide">Crafting Your Masterpiece...</p>
                <p className="text-[#FF99D1] font-exo2">Our AI is composing your unique tune</p>
              </div>
            ) : generatedAudio ? (
              <div className="bg-gradient-to-br from-[#1A1522] to-[#2A2532] p-6 rounded-lg shadow-lg border border-[#FF00FF]/20 hover:border-[#FF00FF]/40 transition-all transform hover:scale-[1.02]">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-32 h-32 relative group">
                    <SongPixelArt title={songTitle} artist="AI" price={0} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={togglePlayPause} className="text-white hover:text-[#00FFFF] transition-colors">
                        {isPlaying && currentSong?.id === "generated-song-id" ? (
                          <Pause className="w-12 h-12" />
                        ) : (
                          <Play className="w-12 h-12" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#FF99D1] font-audiowide mb-1">{songTitle || "Untitled"}</h3>
                    <p className="text-[#00FFFF] font-exo2 text-lg">{genre || "No genre selected"}</p>
                    <p className="text-[#FF00FF] font-mono text-xl mt-2">{getTicker(songTitle || "SONG")}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="text-[#FF00FF] w-5 h-5" />
                      <p className="text-[#FF99D1] font-exo2">{duration} seconds</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-white"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-[#0D0D15] hover:from-[#66FFFF] hover:to-[#FF66B8] font-exo2 text-lg py-4 flex items-center justify-center">
                    <Rocket className="w-6 h-6 mr-2" />
                    Deploy Song
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 relative group">
                    <SongPixelArt title="Your Next Hit" artist="You" price={0} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-12 h-12 text-[#00FFFF]" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#00FFFF] font-audiowide mb-2">Your AI Masterpiece Awaits</p>
                  <p className="text-[#FF99D1] font-exo2">Fill in the details and generate your unique AI song</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}
