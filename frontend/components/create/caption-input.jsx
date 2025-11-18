'use client'

import { Card } from '@/components/ui/card'

export function CaptionInput({ caption, onCaptionChange }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6">
      <label className="block text-sm font-semibold mb-3 text-foreground">
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        placeholder="What's on your mind? Share your thoughts, stories, and moments..."
        className="w-full h-32 bg-muted/50 border border-border/30 rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
      />
      <p className="text-xs text-muted-foreground mt-2">
        {caption.length}/2000 characters
      </p>
    </Card>
  )
}
