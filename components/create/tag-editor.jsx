'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function TagEditor({ tags, onTagsChange }) {
  const [inputValue, setInputValue] = useState('')

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.toLowerCase())) {
      onTagsChange([...tags, inputValue.toLowerCase()])
      setInputValue('')
    }
  }

  const handleRemoveTag = (tag) => {
    onTagsChange(tags.filter((t) => t !== tag))
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/30 p-6">
      <label className="block text-sm font-semibold mb-3 text-foreground">
        Tags
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
          placeholder="Add a tag and press Enter..."
          className="flex-1 bg-muted/50 border border-border/30 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button
          onClick={handleAddTag}
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-accent/20 text-accent hover:bg-accent/30 cursor-pointer flex items-center gap-1"
            onClick={() => handleRemoveTag(tag)}
          >
            #{tag}
            <X className="w-3 h-3" />
          </Badge>
        ))}
      </div>
    </Card>
  )
}
