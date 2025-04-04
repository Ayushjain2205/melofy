import Link from "next/link"
import { client } from "@/lib/client"
import { ConnectButton } from "thirdweb/react"
import { baseSepolia } from "thirdweb/chains"

export function Navbar() {
  return (
    <nav className="bg-[#1A1522] border-b border-[#FF00FF]/20 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold"
          style={{
            fontFamily: "var(--font-press-start-2p)",
            letterSpacing: "0.15em",
          }}
        >
          <span className="retro-wave-text">MELOFY</span>
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/create" className="text-[#FF99D1] hover:text-[#FF00FF] transition-colors font-exo2">
            Create
          </Link>
          <Link href="/" className="text-[#FF99D1] hover:text-[#FF00FF] transition-colors font-exo2">
            Explore
          </Link>
        <ConnectButton client={client} chain={baseSepolia} />
        </div>
      </div>
    </nav>
  )
}

