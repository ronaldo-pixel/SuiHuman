'use client'

import { TopNav } from './top-nav'
import { BottomNav } from './bottom-nav'

export function LayoutWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1 md:pb-0 pb-16">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
