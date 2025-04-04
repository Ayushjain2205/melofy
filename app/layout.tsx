import type React from "react"
import "./globals.css"
import { ThirdwebProvider } from "thirdweb/react";
import { Orbitron, Audiowide, Exo_2, Press_Start_2P } from "next/font/google"
import { MusicPlayerProvider } from "@/app/contexts/MusicPlayerContext"
import { MusicPlayer } from "@/components/MusicPlayer"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "sonner"

// Load fonts with Next.js font system
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
})

export const metadata = {
  title: "Melofy",
  description: "Craft Your Digital Melodies",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${audiowide.variable} ${exo2.variable} ${pressStart2P.variable}`}>
      <body className={orbitron.className}>
        <ThirdwebProvider>
          <MusicPlayerProvider>
            <Navbar />
            <main>{children}</main>
            <MusicPlayer />
            <Toaster 
              theme="dark" 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1A1522',
                  border: '1px solid #FF00FF',
                  color: '#FF99D1'
                }
              }}
            />
          </MusicPlayerProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
