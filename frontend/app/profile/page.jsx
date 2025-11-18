'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, LinkIcon, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { PostCard } from '@/components/post/post-card'
import { mockPosts } from '@/lib/mock-data'
import { useApp } from "@/components/context/appcontext"


const mockUserProfile = {
  id: 'user1',
  name: 'Alice Chen',
  handle: 'alicechen',
  avatar: '/woman-with-camera.png',
  bio: 'Photography enthusiast | Nature lover | Travel adventures',
  location: 'San Francisco, CA',
  website: 'alicechen.com',
  joinDate: 'Joined March 2024',
  isVerified: true,
  followers: 12400,
  following: 543,
  posts: 234,
  authenticity: {
    nautilusScore: 98,
    sealValid: true,
  },
}

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const {
    humanVerified,
    setHumanVerified,
    hasAccount,
    setHasAccount,
    walletAddress,
    setWalletAddress
  } = useApp();
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-shimmer animate-shimmer" />
          </div>

          {/* Profile Info */}
          <div className="px-4 md:px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10 mb-6">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background ring-2 ring-accent/50 animate-fade-in-scale">
                <AvatarImage src={mockUserProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback>{mockUserProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 flex flex-col justify-end gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{mockUserProfile.name}</h1>
                    {mockUserProfile.isVerified && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-accent/50">
                        <span className="text-sm text-background font-bold">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground">@{mockUserProfile.handle}</p>
                </div>

                <p className="text-foreground">{mockUserProfile.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {mockUserProfile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mockUserProfile.location}
                    </span>
                  )}
                  {mockUserProfile.website && (
                    <a href={`https://${mockUserProfile.website}`} className="flex items-center gap-1 text-primary hover:text-accent transition-colors">
                      <LinkIcon className="w-4 h-4" />
                      {mockUserProfile.website}
                    </a>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {mockUserProfile.joinDate}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? '' : 'bg-gradient-to-r from-primary to-accent'}
                    variant={isFollowing ? 'outline' : 'default'}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline">Message</Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4 text-center animate-fade-in-scale">
                <p className="text-2xl font-bold text-primary">{mockUserProfile.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4 text-center animate-fade-in-scale">
                <p className="text-2xl font-bold text-accent">{mockUserProfile.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4 text-center animate-fade-in-scale">
                <p className="text-2xl font-bold">{mockUserProfile.posts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start border-b border-border/30 rounded-none bg-transparent p-0">
                <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="media" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Media
                </TabsTrigger>
                <TabsTrigger value="attestations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Attestations
                </TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-0 mt-6">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="media" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockPosts.map((post) => post.image && (
                    <Link key={post.id} href={`/post/${post.id}`}>
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt="Media"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attestations" className="mt-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 text-center">
                  <p className="text-muted-foreground">Attestations will appear here</p>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-8 text-center">
                  <p className="text-muted-foreground">Analytics coming soon</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
