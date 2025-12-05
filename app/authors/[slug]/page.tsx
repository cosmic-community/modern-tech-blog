// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author: Author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.name} - Modern Tech Blog`,
    description: author.metadata.bio || `Articles by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Author Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          {author.metadata.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              className="w-40 h-40 rounded-full"
              width="160"
              height="160"
            />
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{author.metadata.name}</h1>
            {author.metadata.role && (
              <p className="text-xl text-gray-600 mb-4">{author.metadata.role}</p>
            )}
            {author.metadata.bio && (
              <p className="text-gray-700 mb-6">{author.metadata.bio}</p>
            )}
            <div className="flex justify-center md:justify-start gap-4">
              {author.metadata.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Twitter
                </a>
              )}
              {author.metadata.github && (
                <a
                  href={`https://github.com/${author.metadata.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  GitHub
                </a>
              )}
              {author.metadata.website && (
                <a
                  href={author.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">
            Articles by {author.metadata.name} ({posts.length})
          </h2>
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts by this author yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}