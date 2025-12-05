import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const backgroundColor = category.metadata.color || '#64748b'
  
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
      style={{ backgroundColor }}
    >
      {category.metadata.name}
    </Link>
  )
}