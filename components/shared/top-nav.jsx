'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Bell, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in-scale">
          Verify
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, people..."
              className="w-full bg-muted text-foreground rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
