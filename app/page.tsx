import { Button } from "@/components/ui/button"
import { SongCard } from "@/components/SongCard"

export default function Home() {
  const songs = [
    {
      id: "0xC479...bb62",
      title: "Cyber Dreams",
      artist: "Neural Beats",
      image: "/placeholder.svg?height=64&width=64",
      price: 0.25,
      gain: 15.3,
      ticker: "CYBER",
      bondingCurve: 0.1,
      audioUrl: "/songs/cyber-dreams.mp3",
      data: [
        { price: 0.22, date: "2025-03-28" },
        { price: 0.2, date: "2025-03-29" },
        { price: 0.23, date: "2025-03-30" },
        { price: 0.21, date: "2025-03-31" },
        { price: 0.24, date: "2025-04-01" },
        { price: 0.22, date: "2025-04-02" },
        { price: 0.25, date: "2025-04-03" },
      ],
    },
    {
      id: "0xd893...DEBF",
      title: "Digital Horizon",
      artist: "AI Ensemble",
      image: "/placeholder.svg?height=64&width=64",
      price: 0.09,
      gain: -5.2,
      ticker: "HRZN",
      bondingCurve: 0.15,
      audioUrl: "/songs/digital-horizon.mp3",
      data: [
        { price: 0.1, date: "2025-03-28" },
        { price: 0.11, date: "2025-03-29" },
        { price: 0.095, date: "2025-03-30" },
        { price: 0.1, date: "2025-03-31" },
        { price: 0.085, date: "2025-04-01" },
        { price: 0.09, date: "2025-04-02" },
        { price: 0.09, date: "2025-04-03" },
      ],
    },
    {
      id: "0xC479...bbe2",
      title: "Quantum Pulse",
      artist: "ByteBeats",
      image: "/placeholder.svg?height=64&width=64",
      price: 0.06,
      gain: 3.4,
      ticker: "QNTM",
      bondingCurve: 0.12,
      audioUrl: "/songs/quantum-pulse.mp3",
      data: [
        { price: 0.058, date: "2025-03-28" },
        { price: 0.059, date: "2025-03-29" },
        { price: 0.061, date: "2025-03-30" },
        { price: 0.057, date: "2025-03-31" },
        { price: 0.062, date: "2025-04-01" },
        { price: 0.059, date: "2025-04-02" },
        { price: 0.06, date: "2025-04-03" },
      ],
    },
    {
      id: "0xf677...8068",
      title: "Neural Symphony",
      artist: "DataFlow",
      image: "/placeholder.svg?height=64&width=64",
      price: 0.18,
      gain: 22.7,
      ticker: "NRAL",
      bondingCurve: 0.08,
      audioUrl: "/songs/neural-symphony.mp3",
      data: [
        { price: 0.15, date: "2025-03-28" },
        { price: 0.16, date: "2025-03-29" },
        { price: 0.17, date: "2025-03-30" },
        { price: 0.165, date: "2025-03-31" },
        { price: 0.18, date: "2025-04-01" },
        { price: 0.175, date: "2025-04-02" },
        { price: 0.18, date: "2025-04-03" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D15] text-white">
      {/* Hero */}
      <section className="text-center py-28">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 gradient-text font-audiowide">
          Make money with your AI music.
        </h2>
        <p className="text-lg md:text-xl text-[#FF99D1] font-exo2">
          Generate unreleased tracks and profit when they gain traction.
        </p>
      </section>

      {/* Song List */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="space-y-2">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Trading Stats */}
      <section className="text-center py-16">
        <p className="text-xl text-[#FF99D1] font-exo2">
          Over <span className="text-[#00FFFF]">$330,000</span> in Melofy songs traded.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button size="lg" className="bg-[#FF00FF] text-white hover:bg-[#FF66B8] font-exo2">
            Start trading
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0D0D15] font-exo2"
          >
            Launch a track
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <Button size="lg" className="bg-[#FF00FF] text-white hover:bg-[#FF66B8] font-exo2">
          Launch your own track in 1 minute
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-[#FF99D1] font-exo2">
        <p>2024 Melofy, Inc.</p>
      </footer>
    </div>
  )
}
