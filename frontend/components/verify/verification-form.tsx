'use client'

import { useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function VerificationForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (query: string) => void
  isLoading: boolean
}) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Verify Content</h2>
        <p className="text-sm text-muted-foreground">
          Paste a post URL or ID to verify its authenticity
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Paste post URL or ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="bg-background"
        />
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="whitespace-nowrap"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Verify
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
