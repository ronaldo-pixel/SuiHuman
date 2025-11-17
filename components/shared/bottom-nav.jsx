'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Plus, Heart, User } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/create', icon: Plus, label: 'Create' },
  { href: '/likes', icon: Heart, label: 'Likes' },
  { href: '/profile/1', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 md:hidden left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'animate-glow-pulse' : ''}`} />
              <span className="text-xs sr-only">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
