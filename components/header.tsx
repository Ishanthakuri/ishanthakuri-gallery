"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-foreground">
              Ishan Singh Thakuri
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="https://www.instagram.com/ishansthakuri?igsh=aTF2bWhoZHp5NWs3&utm_source=qr" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
