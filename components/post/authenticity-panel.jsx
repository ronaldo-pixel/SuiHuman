'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Shield, Lock } from 'lucide-react'

export function AuthenticityPanel({ authenticity }) {
  return (
    <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/30 p-6 animate-fade-in-scale">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-accent" />
        Authenticity Verification
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
          <span className="text-sm text-foreground">Verified Human</span>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Yes
          </Badge>
        </div>

        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
          <span className="text-sm text-foreground">Nautilus Score</span>
          <Badge className="bg-accent/20 text-accent border-accent/30">
            {authenticity.nautilusScore}%
          </Badge>
        </div>

        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
          <span className="text-sm text-foreground">Seal Verification</span>
          <Badge className={authenticity.sealValid ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}>
            {authenticity.sealValid ? 'Valid' : 'Invalid'}
          </Badge>
        </div>

        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/30">
          <p className="text-xs text-muted-foreground">
            <Lock className="w-3 h-3 inline mr-1" />
            Content verified through decentralized protocols
          </p>
        </div>
      </div>
    </Card>
  )
}
