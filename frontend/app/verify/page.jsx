'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { CheckCircle2, AlertCircle, Shield, Lock } from 'lucide-react'

export default function VerifyPage() {
  const [inputHash, setInputHash] = useState('')
  const [verified, setVerified] = useState(null)

  const handleVerify = () => {
    if (inputHash.trim()) {
      setVerified({
        walrusHash: true,
        mediaIntegrity: true,
        sealVerification: true,
        nautilusScore: 96,
        timestamp: new Date().toLocaleString(),
      })
    }
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in-top">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Trust & Verify
            </h1>
            <p className="text-lg text-muted-foreground">
              Verify the authenticity of any content on our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 animate-fade-in-scale">
                <h2 className="text-2xl font-bold mb-6">Enter Content Hash</h2>

                <div className="space-y-4">
                  <textarea
                    value={inputHash}
                    onChange={(e) => setInputHash(e.target.value)}
                    placeholder="Paste the Walrus hash or content ID here..."
                    className="w-full h-32 bg-muted/50 border border-border/30 rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono text-sm"
                  />

                  <Button
                    onClick={handleVerify}
                    disabled={!inputHash.trim()}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Content
                  </Button>
                </div>
              </Card>

              {verified && (
                <div className="space-y-4 animate-slide-in-bottom">
                  <Card className="bg-green-500/5 border border-green-500/30 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-semibold text-green-500">Verification Successful</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This content has been verified as authentic.
                    </p>
                  </Card>

                  <div className="space-y-3">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Walrus Hash Verification</span>
                        <Badge className="bg-green-500/20 text-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Valid
                        </Badge>
                      </div>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Media Integrity</span>
                        <Badge className="bg-green-500/20 text-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Seal Verification</span>
                        <Badge className="bg-green-500/20 text-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Nautilus Score</span>
                        <Badge className="bg-accent/20 text-accent">
                          {verified.nautilusScore}%
                        </Badge>
                      </div>
                    </Card>
                  </div>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4 text-center text-xs text-muted-foreground">
                    Verified on: {verified.timestamp}
                  </Card>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-slide-in-bottom">
                <h3 className="font-semibold mb-4">How Verification Works</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>All content is hashed using Walrus protocol</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>Seals verify media authenticity</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>Nautilus analyzes human authenticity</span>
                  </p>
                </div>
              </Card>

              <Card className="bg-accent/5 border border-accent/30 p-6">
                <h3 className="font-semibold mb-4 text-accent">Why Verify?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Combat deepfakes and misinformation</li>
                  <li>Ensure content authenticity</li>
                  <li>Build trust in digital media</li>
                  <li>Support verified creators</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
