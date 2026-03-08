import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, allPosts, type PostSection } from '../_posts/index'

export async function generateStaticParams() {
  return allPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | CommitCraft AI`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://commitcraft-landing.vercel.app/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

function renderSection(section: PostSection, index: number): React.ReactNode {
  const styles = {
    h2: { fontSize: '28px', fontWeight: 800, color: '#f0f0f0', margin: '48px 0 16px', letterSpacing: '-0.01em' } as React.CSSProperties,
    h3: { fontSize: '20px', fontWeight: 700, color: '#f0f0f0', margin: '32px 0 12px' } as React.CSSProperties,
    p: { color: '#aaa', fontSize: '17px', lineHeight: 1.8, margin: '0 0 20px' } as React.CSSProperties,
    ul: { color: '#aaa', fontSize: '17px', lineHeight: 1.8, paddingLeft: '24px', margin: '0 0 20px' } as React.CSSProperties,
    ol: { color: '#aaa', fontSize: '17px', lineHeight: 1.8, paddingLeft: '24px', margin: '0 0 20px' } as React.CSSProperties,
  }

  switch (section.type) {
    case 'h2': return <h2 key={index} style={styles.h2}>{section.content as string}</h2>
    case 'h3': return <h3 key={index} style={styles.h3}>{section.content as string}</h3>
    case 'p': return <p key={index} style={styles.p}>{section.content as string}</p>
    case 'ul': return (
      <ul key={index} style={styles.ul}>
        {(section.content as string[]).map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
      </ul>
    )
    case 'ol': return (
      <ol key={index} style={styles.ol}>
        {(section.content as string[]).map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
      </ol>
    )
    case 'code': return (
      <pre key={index} style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '20px', overflowX: 'auto', margin: '0 0 24px', fontSize: '14px', lineHeight: 1.7, color: '#e5e5e5', fontFamily: 'monospace' }}>
        <code>{section.content as string}</code>
      </pre>
    )
    case 'callout': return (
      <div key={index} style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px', padding: '16px 20px', margin: '0 0 24px', color: '#a5b4fc', fontSize: '15px', lineHeight: 1.7 }}>
        {section.content as string}
      </div>
    )
    case 'cta': return (
      <div key={index} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '32px', margin: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#f0f0f0', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>Stop writing commits manually</p>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px' }}>CommitCraft AI generates them from your diff in one click. Free tier available.</p>
        <a href="https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai" style={{ display: 'inline-block', background: '#6366f1', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
          Install CommitCraft AI — Free
        </a>
      </div>
    )
    default: return null
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  // JSON-LD for articles
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'CommitCraft AI' },
    publisher: { '@type': 'Organization', name: 'CommitCraft AI', url: 'https://commitcraft-landing.vercel.app' },
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0f0f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#6366f1,#818cf8)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</span>
          <span style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 15 }}>CommitCraft AI</span>
        </Link>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/blog" style={{ color: '#888', fontSize: 14, textDecoration: 'none' }}>Blog</Link>
          <a href="https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai" style={{ background: '#6366f1', color: 'white', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Install Free</a>
        </div>
      </nav>

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#555' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: '#555', textDecoration: 'none' }}>Blog</Link>
          <span>/</span>
          <span style={{ color: '#888' }}>{post.title}</span>
        </div>

        {/* Post header */}
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', fontSize: '13px', color: '#555' }}>
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>{post.title}</h1>
        <p style={{ fontSize: '20px', color: '#888', lineHeight: 1.6, marginBottom: '48px', borderBottom: '1px solid #1e1e1e', paddingBottom: '40px' }}>{post.description}</p>

        {/* Post content */}
        {post.content.map((section, index) => renderSection(section, index))}

        {/* Bottom CTA */}
        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #1e1e1e' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Try CommitCraft AI Free</h2>
          <p style={{ color: '#888', marginBottom: '20px' }}>Generate conventional commits, PR descriptions & changelogs from your diff in one click. 20 free generations/month.</p>
          <a href="https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai" style={{ display: 'inline-block', background: '#6366f1', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
            Install for VS Code — Free
          </a>
        </div>

        {/* Related posts */}
        <div style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#888' }}>More articles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {allPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ color: '#6366f1', textDecoration: 'none', fontSize: '15px' }}>
                {p.title} →
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
