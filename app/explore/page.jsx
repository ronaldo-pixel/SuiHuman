'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { ExploreFilters } from '@/components/explore/explore-filters'
import { ExploreGridItem } from '@/components/explore/explore-grid-item'

const explorePosts = [
  {
    id: '1',
    image: '/sunset-landscape.jpg',
    author: 'Alex Turner',
    authorHandle: 'alexturner',
    isVerified: true,
    likes: 2450,
    comments: 156,
  },
  {
    id: '2',
    image: '/mountain-peak.jpg',
    author: 'Sam Park',
    authorHandle: 'sampark',
    isVerified: true,
    likes: 1890,
    comments: 243,
  },
  {
    id: '3',
    image: '/urban-street-photography.jpg',
    author: 'Jordan Lee',
    authorHandle: 'jordanlee',
    isVerified: false,
    likes: 945,
    comments: 89,
  },
  {
    id: '4',
    image: '/forest-nature.jpg',
    author: 'Casey Brown',
    authorHandle: 'caseybrown',
    isVerified: true,
    likes: 3210,
    comments: 412,
  },
  {
    id: '5',
    image: '/powerful-ocean-waves.png',
    author: 'Morgan White',
    authorHandle: 'morganwhite',
    isVerified: true,
    likes: 1567,
    comments: 198,
  },
  {
    id: '6',
    image: '/desert-dunes.jpg',
    author: 'Taylor Swift',
    authorHandle: 'taylorswift',
    isVerified: true,
    likes: 4532,
    comments: 876,
  },
  {
    id: '7',
    image: '/vibrant-city-night.png',
    author: 'River Jones',
    authorHandle: 'riverjones',
    isVerified: false,
    likes: 678,
    comments: 92,
  },
  {
    id: '8',
    image: '/tropical-paradise-beach.jpg',
    author: 'Phoenix Lee',
    authorHandle: 'phoenixlee',
    isVerified: true,
    likes: 2890,
    comments: 334,
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    trending: false,
    withReports: false,
  })

  const filteredPosts = explorePosts.filter((post) => {
    if (filters.verifiedOnly && !post.isVerified) return false
    if (filters.trending && post.likes < 1000) return false
    if (filters.withReports) return false
    return true
  })

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8 animate-slide-in-top">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Explore
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Input
                type="search"
                placeholder="Search posts, hashtags, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card/50 border-border/50 focus:ring-2 focus:ring-primary/50 py-3"
              />
            </div>

            {/* Filters */}
            <ExploreFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-in-scale"
              >
                <ExploreGridItem post={post} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}
