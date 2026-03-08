import type { Metadata } from 'next'
import Link from 'next/link'
import { allPosts } from './_posts/index'

export const metadata: Metadata = {
  title: 'Blog — Git Commit Best Practices & Developer Guides | CommitCraft AI',
  description: 'Free guides on writing better git commit messages, conventional commits, and improving your development workflow. From the CommitCraft AI team.',
  alternates: { canonical: 'https://commitcraft-landing.vercel.app/blog' },
  openGraph: {
    title: 'CommitCraft AI Blog — Git Commit Best Practices',
    description: 'Free guides on writing better git commits and improving your development workflow.',
  },
}

export default function BlogIndex() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f0f0' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#6366f1,#818cf8)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</span>
          <span style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 15 }}>CommitCraft AI</span>
        </Link>
        <a href="https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai" style={{ background: '#6366f1', color: 'white', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Install Free</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Blog</span>
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Git Commit Best Practices
        </h1>
        <p style={{ color: '#888', fontSize: '18px', marginBottom: '48px', lineHeight: 1.6 }}>
          Free guides on writing better commit messages, conventional commits, and improving your git workflow.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {allPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '28px', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '13px', color: '#555' }}>
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 style={{ color: '#f0f0f0', fontWeight: 700, fontSize: '20px', marginBottom: '10px', lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{post.description}</p>
              <div style={{ color: '#6366f1', fontSize: '14px', marginTop: '16px', fontWeight: 500 }}>Read article →</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
