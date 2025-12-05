import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  const featuredPost = posts[0] as Post | undefined
  const recentPosts = posts.slice(1, 7) as Post[]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex gap-2 mb-4">
                  {featuredPost.metadata.categories?.map((category) => (
                    <CategoryBadge key={category.id} category={category} />
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {featuredPost.title}
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  {featuredPost.metadata.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  {featuredPost.metadata.author?.metadata.avatar && (
                    <img
                      src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={featuredPost.metadata.author.metadata.name}
                      className="w-12 h-12 rounded-full"
                      width="48"
                      height="48"
                    />
                  )}
                  <div>
                    <p className="font-semibold">
                      {featuredPost.metadata.author?.metadata.name}
                    </p>
                    <p className="text-sm text-blue-200">
                      {featuredPost.metadata.reading_time} min read
                    </p>
                  </div>
                </div>
                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Read Article
                </Link>
              </div>
              <div className="lg:block">
                <img
                  src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={featuredPost.title}
                  className="rounded-lg shadow-2xl"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {(categories as Category[]).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.metadata.color || '#64748b' }}
                />
                <span className="font-semibold">{category.metadata.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Recent Articles</h2>
          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-12">
              No posts available yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </div>
  )
}