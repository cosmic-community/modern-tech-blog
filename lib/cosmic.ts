import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function to check if error has status property
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all posts with author and category data
export async function getAllPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects
    
    // Manual sorting by published_date (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch post: ${slug}`)
  }
}

// Fetch all categories
export async function getAllCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch category: ${slug}`)
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects
    
    // Manual sorting by published_date (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by category')
  }
}

// Fetch all authors
export async function getAllAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

// Fetch a single author by slug
export async function getAuthorBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch author: ${slug}`)
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects
    
    // Manual sorting by published_date (newest first)
    return posts.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by author')
  }
}