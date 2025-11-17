'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ExploreGridItem({ post }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/post/${post.id}`}>
      <div
        className="relative aspect-square rounded-lg overflow-hidden bg-muted/50 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={post.image || "/placeholder.svg"}
          alt={`Post by ${post.author}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Verified Badge */}
        {post.isVerified && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-accent/90 text-accent-foreground hover:bg-accent flex items-center gap-1">
              <span className="text-xs">✓</span>
              Verified
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-6 animate-fade-in-scale">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <span className="font-semibold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">{post.comments}</span>
            </div>
          </div>
        )}

        {/* Stats Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  )
}
