'use client'

import { LayoutWrapper } from '@/components/shared/layout-wrapper'
import { PostCard } from '@/components/post/post-card'
import { mockPosts } from '@/lib/mock-data'

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="flex">
        {/* Feed - Desktop */}
        <div className="w-full max-w-2xl mx-auto border-x border-border/30">
          {/* Stories */}
          <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm p-4 md:p-6 flex gap-4 overflow-x-auto animate-slide-in-top">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-0.5 cursor-pointer hover:scale-110 transition-transform hover:shadow-lg hover:shadow-accent/50 animate-fade-in-scale"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-semibold hover:bg-muted/80 transition-colors">
                  {i}
                </div>
              </div>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="space-y-0">
            {mockPosts.map((post, index) => (
              <div key={post.id} style={{ animationDelay: `${index * 100}ms` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-80 border-l border-border/30 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-6 space-y-6 bg-card/30 backdrop-blur-sm">
          {/* Suggestions */}
          <div className="animate-slide-in-top">
            <h3 className="font-semibold text-sm mb-4 text-accent">Suggested for you</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">User {i}</p>
                      <p className="text-xs text-muted-foreground">Followed by others</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:text-accent hover:scale-105 transition-all bg-primary/10 px-3 py-1 rounded-full">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border/30">
            <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
            <p>&copy; 2025 Verify. All rights reserved.</p>
          </div>
        </aside>
      </div>
    </LayoutWrapper>
  )
}
