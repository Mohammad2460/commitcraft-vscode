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
