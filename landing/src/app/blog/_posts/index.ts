export type { BlogPost, PostSection } from './types'

import { post as post1 } from './how-to-write-better-git-commit-messages'
import { post as post2 } from './conventional-commits-guide'
import { post as post3 } from './ai-git-commits-vs-code'
import { post as post4 } from './git-commit-best-practices'
import { post as post5 } from './why-commit-messages-matter'
import type { BlogPost } from './types'

export const allPosts: BlogPost[] = [post1, post2, post3, post4, post5]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug)
}
