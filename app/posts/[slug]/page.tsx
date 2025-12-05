// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import MarkdownContent from '@/components/MarkdownContent'
import { format } from 'date-fns'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata.excerpt || post.title,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  return (
    <article className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.metadata.categories?.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          {post.metadata.author?.metadata.avatar && (
            <Link href={`/authors/${post.metadata.author.slug}`}>
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                className="w-16 h-16 rounded-full"
                width="64"
                height="64"
              />
            </Link>
          )}
          <div>
            <Link
              href={`/authors/${post.metadata.author?.slug}`}
              className="font-semibold text-lg hover:text-blue-600"
            >
              {post.metadata.author?.metadata.name}
            </Link>
            <p className="text-gray-600">
              {post.metadata.author?.metadata.role}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              {post.metadata.published_date && (
                <span>{format(new Date(post.metadata.published_date), 'MMM d, yyyy')}</span>
              )}
              {post.metadata.reading_time && (
                <span>{post.metadata.reading_time} min read</span>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full rounded-lg mb-12"
            width="800"
            height="450"
          />
        )}

        {/* Content */}
        <MarkdownContent content={post.metadata.content} />

        {/* Author Bio */}
        {post.metadata.author && (
          <div className="mt-16 pt-8 border-t">
            <div className="flex gap-6">
              {post.metadata.author.metadata.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  className="w-20 h-20 rounded-full"
                  width="80"
                  height="80"
                />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {post.metadata.author.metadata.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.metadata.author.metadata.bio}
                </p>
                <div className="flex gap-4">
                  {post.metadata.author.metadata.twitter && (
                    <a
                      href={`https://twitter.com/${post.metadata.author.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Twitter
                    </a>
                  )}
                  {post.metadata.author.metadata.github && (
                    <a
                      href={`https://github.com/${post.metadata.author.metadata.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      GitHub
                    </a>
                  )}
                  {post.metadata.author.metadata.website && (
                    <a
                      href={post.metadata.author.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}