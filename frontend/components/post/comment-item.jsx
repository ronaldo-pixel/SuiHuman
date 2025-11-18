'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function CommentItem({ comment }) {
  const [liked, setLiked] = useState(comment.liked)
  const [likeCount, setLikeCount] = useState(comment.likes)

  return (
    <div className="flex gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/80 transition-all animate-slide-in-bottom">
      <Link href={`/profile/${comment.author.id}`}>
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/profile/${comment.author.id}`}>
            <h4 className="font-semibold text-sm hover:text-primary transition-colors">
              {comment.author.name}
            </h4>
          </Link>
          {comment.author.isVerified && (
            <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
              <span className="text-[0.5rem] text-background font-bold">✓</span>
            </span>
          )}
          <span className="text-xs text-muted-foreground">@{comment.author.handle}</span>
        </div>

        <p className="text-sm text-foreground mb-2">{comment.content}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{comment.timestamp}</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-auto p-0 hover:text-primary"
            onClick={() => {
              setLiked(!liked)
              setLikeCount(liked ? likeCount - 1 : likeCount + 1)
            }}
          >
            <Heart className={`w-3 h-3 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            {likeCount > 0 && <span>{likeCount}</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
