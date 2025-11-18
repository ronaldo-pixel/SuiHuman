import { CheckCircle, AlertCircle, XCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface VerificationResult {
  postId: string
  author: string
  status: 'verified' | 'warning' | 'failed'
  checks: {
    walrusMatch: boolean
    mediaIntact: boolean
    sealValid: boolean
    nautilusScore: number
  }
  message: string
}

export function VerificationResultCard({ result }: { result: VerificationResult }) {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'verified':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-8 h-8 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (result.status) {
      case 'verified':
        return 'from-green-500/10 to-green-500/5 border-green-500/20'
      case 'warning':
        return 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/20'
      case 'failed':
        return 'from-red-500/10 to-red-500/5 border-red-500/20'
    }
  }

  return (
    <Card className={`p-6 bg-gradient-to-br ${getStatusColor()}`}>
      <div className="flex items-start gap-4 mb-6">
        {getStatusIcon()}
        <div>
          <h3 className="text-lg font-semibold">
            {result.status === 'verified' && 'Content Verified'}
            {result.status === 'warning' && 'Content Warning'}
            {result.status === 'failed' && 'Verification Failed'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
        </div>
      </div>

      {/* Verification Checks */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Verification Checks</h4>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between p-3 rounded bg-background/50 border border-border">
              <span>Walrus Hash Match</span>
              {result.checks.walrusMatch ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-background/50 border border-border">
              <span>Media Integrity</span>
              {result.checks.mediaIntact ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-background/50 border border-border">
              <span>Seal Verification</span>
              {result.checks.sealValid ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-background/50 border border-border">
              <span>Nautilus Authenticity Score</span>
              <span className="font-semibold">{result.checks.nautilusScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="p-3 rounded bg-background/50 border border-border mb-6">
        <p className="text-xs text-muted-foreground mb-1">Posted by</p>
        <p className="font-semibold">{result.author}</p>
      </div>

      <Button className="w-full" variant="outline" size="sm">
        <ExternalLink className="w-4 h-4 mr-2" />
        View Post
      </Button>
    </Card>
  )
}
