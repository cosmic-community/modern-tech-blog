// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    content: string
    excerpt?: string
    featured_image: {
      url: string
      imgix_url: string
    }
    author: Author
    categories?: Category[]
    published_date?: string
    reading_time?: number
  }
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name: string
    bio?: string
    avatar?: {
      url: string
      imgix_url: string
    }
    role?: string
    twitter?: string
    github?: string
    website?: string
  }
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name: string
    description?: string
    color?: string
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Type guard functions
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}