'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment)
      setComment('')
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-4 animate-slide-in-top">
      <div className="flex gap-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 bg-muted/50 border border-border/30 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none max-h-24"
          rows="2"
        />
        <Button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="self-end bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
        >
          Post
        </Button>
      </div>
    </Card>
  )
}
