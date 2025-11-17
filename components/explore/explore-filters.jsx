'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function ExploreFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (filterKey) => {
    onFiltersChange({
      ...filters,
      [filterKey]: !filters[filterKey],
    })
  }

  const filterOptions = [
    { key: 'verifiedOnly', label: 'Verified Only' },
    { key: 'trending', label: 'Trending' },
    { key: 'withReports', label: 'With Reports' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.key}
          onClick={() => handleFilterChange(option.key)}
          variant={filters[option.key] ? 'default' : 'outline'}
          className={`transition-all ${
            filters[option.key]
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
              : 'hover:border-primary/50'
          }`}
        >
          {filters[option.key] && <Check className="w-4 h-4 mr-2" />}
          {option.label}
        </Button>
      ))}
    </div>
  )
}
