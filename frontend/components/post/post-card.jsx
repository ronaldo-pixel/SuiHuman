'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AuthenticityBadge } from './authenticity-badge'

export function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article className="border-b border-border/30 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:border-border/50 animate-slide-in-bottom">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Link href={`/profile/${post.author.id}`} className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 ring-2 ring-accent/30 hover:ring-accent transition-all">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm md:text-base truncate hover:text-primary transition-colors">{post.author.name}</h3>
                {post.author.isVerified && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-accent/50">
                    <span className="text-[0.625rem] text-background font-bold">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">@{post.author.handle}</p>
              <p className="text-xs text-muted-foreground mt-1">{post.timestamp}</p>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-primary/10 hover:text-primary">
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>

        {/* Authenticity Badges */}
        {post.authenticity.isVerified && (
          <div className="mb-4">
            <AuthenticityBadge info={post.authenticity} />
          </div>
        )}

        {/* Content */}
        <Link href={`/post/${post.id}`} className="block mb-4">
          <p className="text-sm md:text-base text-foreground line-clamp-3 hover:text-primary transition-colors hover:underline">
            {post.content}
          </p>
        </Link>

        {/* Media */}
        {post.image && (
          <Link href={`/post/${post.id}`} className="block mb-4 -mx-4 md:-mx-6">
            <div className="relative w-full aspect-square bg-muted overflow-hidden rounded-xl group">
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Post media"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between text-muted-foreground pt-3 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs md:text-sm hover:text-primary hover:bg-primary/10 transition-all"
            asChild
          >
            <Link href={`/post/${post.id}#comments`}>
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{post.comments}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 text-xs md:text-sm transition-all ${liked ? 'text-red-500 bg-red-500/10' : 'hover:text-primary hover:bg-primary/10'}`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current animate-glow-pulse' : ''}`} />
            <span className="hidden sm:inline">{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs md:text-sm hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{post.shares}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
