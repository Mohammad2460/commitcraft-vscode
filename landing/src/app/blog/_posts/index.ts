// Import all posts first (imports must be at the top)
import { post as post1 } from './how-to-write-better-git-commit-messages'
import { post as post2 } from './conventional-commits-guide'
import { post as post3 } from './ai-git-commits-vs-code'
import { post as post4 } from './git-commit-best-practices'
import { post as post5 } from './why-commit-messages-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  readTime: string
  keywords: string[]
  content: PostSection[]
}

export interface PostSection {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'code' | 'callout' | 'cta'
  content: string | string[]
  language?: string // for code blocks
}

export const allPosts: BlogPost[] = [post1, post2, post3, post4, post5]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug)
}
