'use client'

import { CheckCircle2, Shield } from 'lucide-react'

export function AuthenticityBadge({ info }) {
  if (!info?.isVerified) return null

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/30 rounded-lg animate-fade-in-scale">
      <div className="flex items-center gap-1">
        <Shield className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-accent">Verified Human</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-accent/80">
        <CheckCircle2 className="w-3 h-3" />
        <span>Nautilus: {info.nautilusScore}%</span>
      </div>
    </div>
  )
}
