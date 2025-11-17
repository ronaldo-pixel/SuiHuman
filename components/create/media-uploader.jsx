'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function MediaUploader({ media, onMediaChange }) {
  const [dragActive, setDragActive] = useState(false)

  const handleFile = (file) => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onMediaChange({
          file,
          preview: reader.result,
          type: file.type.startsWith('image/') ? 'image' : 'video',
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/30 border-2 border-dashed p-8">
      {!media ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`transition-all cursor-pointer text-center py-12 rounded-lg ${
            dragActive ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
          }`}
        >
          <label htmlFor="media-input" className="cursor-pointer block">
            <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
            <p className="text-lg font-semibold text-foreground mb-2">
              Drag and drop your media
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <input
              id="media-input"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="relative group animate-fade-in-scale">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/50">
            {media.type === 'image' ? (
              <Image
                src={media.preview || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <video src={media.preview} className="w-full h-full object-cover" />
            )}
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onMediaChange(null)}
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">{media.file.name}</p>
        </div>
      )}
    </Card>
  )
}
