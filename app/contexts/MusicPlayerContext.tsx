"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { Song } from '@/types/song'
import { api } from '@/lib/api'

type MusicPlayerContextType = {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  togglePlayPause: () => void
  setCurrentSongById: (url: string, metadata?: { title?: string; genre?: string }) => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  playNextSong: () => void
  playPreviousSong: () => void
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined)

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.src = currentSong.audioUrl
    audio.load()

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSong])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error)
      })
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const setCurrentSongById = useCallback((url: string, metadata?: { title?: string; genre?: string }) => {
    const song: Song = {
      id: url,
      title: metadata?.title || 'Generated Song',
      artist: metadata?.genre || 'AI',
      audioUrl: url,
      image: '',
      price: 0,
      gain: 1,
      data: [{ price: 0, date: new Date().toISOString() }],
      ticker: 'SONG',
      bondingCurve: 0
    }
    setCurrentSong(song)
    setCurrentTime(0)
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.load()
      setIsPlaying(false)
    }
  }, [])

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const playNextSong = useCallback(() => {
    // Placeholder for next song logic
    console.log('Play next song')
  }, [])

  const playPreviousSong = useCallback(() => {
    // Placeholder for previous song logic
    console.log('Play previous song')
  }, [])

  return (
    <MusicPlayerContext.Provider 
      value={{ 
        currentSong, 
        isPlaying, 
        currentTime,
        duration,
        volume,
        togglePlayPause,
        setCurrentSongById,
        seekTo,
        setVolume,
        playNextSong,
        playPreviousSong
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  )
}

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider')
  }
  return context
}

