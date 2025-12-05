# Modern Tech Blog

![Modern Tech Blog](https://imgix.cosmicjs.com/b49620a0-d211-11f0-b693-79ceb5783a41-photo-1677442136019-21780ecad995-1764963393349.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive tech blog built with Next.js 16 and powered by Cosmic CMS. Features dynamic routing, category filtering, author profiles, and beautiful markdown rendering.

## Features

- 📝 **Dynamic Blog Posts** - Full markdown support with syntax highlighting
- 👤 **Author Profiles** - Complete author information with social links
- 🏷️ **Category Organization** - Browse posts by topic with color-coded badges
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🚀 **Performance Optimized** - Server-side rendering and image optimization
- 🔍 **SEO Ready** - Proper meta tags and structured data
- 💅 **Modern UI** - Clean, contemporary design with Tailwind CSS

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=693330252794e7afddb5382a&clone_repository=6933353b2794e7afddb5388f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a modern tech blog with posts, authors, and categories"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a modern tech blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering with syntax highlighting
- **Imgix** - Image optimization and transformation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the content model set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.categories': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket using three main object types:

### Posts
- **Content** - Markdown content for blog posts
- **Excerpt** - Short summary for previews
- **Featured Image** - Main post image
- **Author** - Connected author object
- **Categories** - Multiple category connections
- **Published Date** - Publication date
- **Reading Time** - Estimated reading time

### Authors
- **Name** - Author's full name
- **Bio** - Short biography
- **Avatar** - Profile photo
- **Role** - Job title
- **Social Links** - Twitter, GitHub, website

### Categories
- **Name** - Category name
- **Description** - Category description
- **Color** - Badge color

All content is fetched server-side for optimal performance and SEO. The depth parameter ensures related content (authors and categories) is included in a single query.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add your environment variables
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx    # Category page
│   └── authors/
│       └── [slug]/
│           └── page.tsx    # Author page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── PostCard.tsx        # Post preview card
│   ├── CategoryBadge.tsx   # Category badge
│   ├── AuthorCard.tsx      # Author information
│   └── MarkdownContent.tsx # Markdown renderer
├── lib/
│   └── cosmic.ts           # Cosmic SDK setup
└── types.ts                # TypeScript types
```

## Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

<!-- README_END -->