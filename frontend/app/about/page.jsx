'use client'

import { Card } from '@/components/ui/card'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { Shield, Zap, Users, Lock } from 'lucide-react'

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-slide-in-top">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              About Verify
            </h1>
            <p className="text-xl text-muted-foreground">
              The future of authentic social media
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 animate-fade-in-scale">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Verified Human</h3>
              <p className="text-muted-foreground">
                Every user is verified as human through our advanced authentication protocols, ensuring genuine connections.
              </p>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Media Authenticity</h3>
              <p className="text-muted-foreground">
                Using Walrus protocol, every post is cryptographically verified to ensure content hasn't been tampered with.
              </p>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Verification</h3>
              <p className="text-muted-foreground">
                Real-time authenticity checks with our Nautilus scoring system keep your feed trustworthy and up-to-date.
              </p>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Built on decentralized protocols, Verify puts power back in the hands of users and creators.
              </p>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border border-primary/30 p-8 mb-12 animate-slide-in-bottom">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-foreground mb-4">
              To create a social media platform where every user and every piece of content is verified as authentic. We believe the future of the internet depends on trust, transparency, and decentralization.
            </p>
            <p className="text-muted-foreground">
              In a world of deepfakes and misinformation, Verify stands as your beacon of truth, leveraging cutting-edge cryptography and human verification protocols to ensure that what you see is what's real.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 animate-fade-in-scale">
              <p className="text-3xl font-bold text-primary mb-2">1M+</p>
              <p className="text-muted-foreground">Verified Users</p>
            </div>
            <div className="p-6 animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
              <p className="text-3xl font-bold text-accent mb-2">50M+</p>
              <p className="text-muted-foreground">Verified Posts</p>
            </div>
            <div className="p-6 animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
              <p className="text-3xl font-bold text-primary mb-2">99.9%</p>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
