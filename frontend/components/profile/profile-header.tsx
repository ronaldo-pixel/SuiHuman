'use client'

import Link from 'next/link'
import { MoreHorizontal, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AuthenticityBadge } from '@/components/post/authenticity-badge'

export interface UserProfile {
  id: string
  name: string
  handle: string
  avatar: string
  bio: string
  isVerified: boolean
  nautilusScore?: number
  stats: {
    posts: number
    followers: number
    following: number
  }
}

export function ProfileHeader({ user, isOwnProfile }: { user: UserProfile; isOwnProfile: boolean }) {
  return (
    <div className="border-b border-border bg-card p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.handle}</p>
          </div>
          <div className="flex gap-2">
            {!isOwnProfile && (
              <>
                <Button className="px-6">Follow</Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                  <span className="sr-only">Share profile</span>
                </Button>
              </>
            )}
            {isOwnProfile && (
              <Button variant="outline" asChild>
                <Link href="/settings">Edit Profile</Link>
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>

        {/* Bio and Verification */}
        <div className="mb-6">
          <p className="text-foreground mb-3">{user.bio}</p>
          {user.isVerified && (
            <AuthenticityBadge
              info={{
                isVerified: true,
                nautilusScore: user.nautilusScore,
              }}
            />
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div>
            <p className="font-semibold text-lg">{user.stats.posts}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-lg">{user.stats.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-lg">{user.stats.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </div>
    </div>
  )
}
