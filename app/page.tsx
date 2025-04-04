"use client"

import { SongCard } from "@/components/SongCard"
import Link from "next/link"
import { Song } from "@/types/song"
import { useEffect, useState } from "react"

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs')
        const data = await response.json()
        if (Array.isArray(data)) {
          setSongs(data)
        }
      } catch (error) {
        console.error('Error fetching songs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  const defaultSongs = [
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

  const displaySongs = songs.length > 0 ? songs : defaultSongs;

  return (
    <div className="min-h-screen bg-[#0D0D15] text-white">
      {/* Hero */}
      <section className="text-center py-15">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 gradient-text font-audiowide">
          Own Your Sound.
        </h2>
        <p className="text-lg md:text-xl text-[#FF99D1] font-exo2">
          Create original AI music, mint it on-chain, and trade it with the world.
        </p>
      </section>

      {/* Song List */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-[#FF00FF] rounded-full opacity-20 animate-ping"></div>
                <div className="absolute inset-0 bg-[#FF00FF] rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-[#FF00FF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-xl font-bold text-[#00FFFF] font-audiowide">Loading Songs...</p>
              <p className="text-[#FF99D1] font-exo2">Discovering your next favorite tracks</p>
            </div>
          ) : songs.length > 0 ? (
            songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))
          ) : defaultSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      

      {/* CTA */}
      <section className="text-center py-10">
        <Link href="/create" className="bg-[#FF00FF] text-white hover:bg-[#FF66B8] font-exo2 px-6 py-3 rounded-md">
          Launch your own track in 1 minute
        </Link>
      </section>

      
    </div>
  )
}
