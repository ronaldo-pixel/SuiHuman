import { Card } from '@/components/ui/card'

export function PostSkeleton() {
  return (
    <Card className="border-b border-border rounded-none p-4 md:p-6">
      {/* Header Skeleton */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-muted animate-pulse rounded-lg mb-4" />

      {/* Actions Skeleton */}
      <div className="flex justify-between pt-3 border-t border-border/50">
        <div className="h-8 w-16 bg-muted animate-pulse rounded" />
        <div className="h-8 w-16 bg-muted animate-pulse rounded" />
        <div className="h-8 w-16 bg-muted animate-pulse rounded" />
      </div>
    </Card>
  )
}
