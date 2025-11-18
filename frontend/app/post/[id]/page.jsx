'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { AuthenticityBadge } from '@/components/post/authenticity-badge'
import { CommentItem } from '@/components/post/comment-item'
import { AuthenticityPanel } from '@/components/post/authenticity-panel'
import { CommentForm } from '@/components/post/comment-form'

const mockPostDetail = {
  id: '1',
  author: {
    id: 'user1',
    name: 'Alice Chen',
    handle: 'alicechen',
    avatar: '/woman-with-camera.png',
    isVerified: true,
  },
  content: 'Just captured this amazing sunset at the beach. The golden hour never disappoints!',
  image: '/sunset-beach-golden-hour.jpg',
  timestamp: '2 hours ago',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleDateString(),
  likes: 1240,
  comments: 89,
  shares: 45,
  liked: false,
  authenticity: {
    isVerified: true,
    nautilusScore: 98,
    sealValid: true,
  },
}

const mockComments = [
  {
    id: '1',
    author: {
      id: 'user2',
      name: 'Marcus Johnson',
      handle: 'marcusj',
      avatar: '/smiling-man-portrait.png',
      isVerified: true,
    },
    content: 'This is absolutely stunning! Were you there in person?',
    timestamp: '1 hour ago',
    likes: 234,
    liked: false,
  },
  {
    id: '2',
    author: {
      id: 'user3',
      name: 'Sofia Patel',
      handle: 'sofiapatel',
      avatar: '/woman-artist-creative.jpg',
      isVerified: false,
    },
    content: 'The colors are incredible. What camera did you use?',
    timestamp: '45 minutes ago',
    likes: 89,
    liked: false,
  },
]

export default function PostDetailPage() {
  const [liked, setLiked] = useState(mockPostDetail.liked)
  const [likeCount, setLikeCount] = useState(mockPostDetail.likes)
  const [comments, setComments] = useState(mockComments)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'You',
        handle: 'yourhandle',
        avatar: '/placeholder.svg',
        isVerified: false,
      },
      content: text,
      timestamp: 'now',
      likes: 0,
      liked: false,
    }
    setComments([...comments, newComment])
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="text-primary hover:text-accent mb-6 inline-block">
            ← Back to Feed
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Media */}
            <div className="lg:col-span-2">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/50 mb-6 animate-fade-in-scale">
                <Image
                  src={mockPostDetail.image || "/placeholder.svg"}
                  alt="Post"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-1 space-y-6">
              {/* Author Card */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6 animate-slide-in-bottom">
                <Link href={`/profile/${mockPostDetail.author.id}`} className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12 ring-2 ring-accent/30">
                    <AvatarImage src={mockPostDetail.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockPostDetail.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {mockPostDetail.author.name}
                      </h3>
                      {mockPostDetail.author.isVerified && (
                        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <span className="text-[0.625rem] text-background font-bold">✓</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{mockPostDetail.author.handle}</p>
                  </div>
                </Link>
                <Button className="w-full" variant="outline">
                  Follow
                </Button>
              </Card>

              {/* Authenticity Panel */}
              <AuthenticityPanel authenticity={mockPostDetail.authenticity} />

              {/* Engagement Stats */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{likeCount} likes</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={liked ? 'text-red-500' : ''}
                    >
                      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{mockPostDetail.comments} comments</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{mockPostDetail.shares} shares</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8 max-w-4xl" id="comments">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            <CommentForm onSubmit={handleAddComment} />

            <div className="space-y-4 mt-6">
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in-scale"
                >
                  <CommentItem comment={comment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
