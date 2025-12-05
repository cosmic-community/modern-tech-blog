import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'
import { format } from 'date-fns'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-48 object-cover"
          width="400"
          height="225"
        />
      </Link>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.metadata.categories?.slice(0, 2).map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>
        
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-3 pt-4 border-t">
          {post.metadata.author?.metadata.avatar && (
            <Link href={`/authors/${post.metadata.author.slug}`}>
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                className="w-10 h-10 rounded-full"
                width="40"
                height="40"
              />
            </Link>
          )}
          <div className="flex-1 min-w-0">
            <Link
              href={`/authors/${post.metadata.author?.slug}`}
              className="font-semibold hover:text-blue-600 truncate block"
            >
              {post.metadata.author?.metadata.name}
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {post.metadata.published_date && (
                <span>{format(new Date(post.metadata.published_date), 'MMM d, yyyy')}</span>
              )}
              {post.metadata.reading_time && (
                <>
                  <span>•</span>
                  <span>{post.metadata.reading_time} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}