'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export type ProfileTab = 'posts' | 'media' | 'attestations' | 'analytics'

const tabLabels: Record<ProfileTab, string> = {
  posts: 'Posts',
  media: 'Media',
  attestations: 'Attestations',
  analytics: 'Analytics',
}

export function ProfileTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}) {
  const tabs: ProfileTab[] = ['posts', 'media', 'attestations', 'analytics']

  return (
    <div className="border-b border-border flex items-center">
      <div className="max-w-4xl mx-auto w-full flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 px-4 py-4 font-semibold text-sm transition-colors relative ${
              activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tabLabels[tab]}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
