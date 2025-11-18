import Image from 'image'
import Link from 'next/link'

interface ProfilePost {
  id: string
  image: string
  likes: number
  comments: number
}

export function ProfileGrid({ posts }: { posts: ProfilePost[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No posts yet</p>
        </div>
      )}
    </div>
  )
}
