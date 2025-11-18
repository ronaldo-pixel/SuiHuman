'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export function AnalysisStatusPanel({ status }) {
  const getStatusIcon = (state) => {
    switch (state) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border border-primary/30 p-6 animate-slide-in-top">
      <h3 className="font-semibold text-foreground mb-4">Authenticity Analysis Results</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Walrus Hash</span>
          {getStatusIcon(status.walrusHash)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Seal Verification</span>
          {getStatusIcon(status.sealVerification)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Nautilus Analysis</span>
          {getStatusIcon(status.nautilusAnalysis)}
        </div>
      </div>
    </Card>
  )
}
