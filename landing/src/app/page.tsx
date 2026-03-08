import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Git Commit Message Generator for VS Code | CommitCraft AI',
  description: 'Generate perfect git commit messages, PR descriptions & changelogs from your diff in one click. VS Code extension powered by Claude AI. Free: 20/month. Pro: $4.99/month.',
  alternates: {
    canonical: 'https://commitcraft-landing.vercel.app',
  },
}

const INSTALL_URL = 'https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai'
const GITHUB_URL = 'https://github.com/Mohammad2460/commitcraft-vscode'

export default function HomePage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 40px', height: '60px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: '#f0f0f0' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            fontSize: 14,
          }}>✦</span>
          CommitCraft AI
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#features" className="nav-link" style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Features</a>
          <a href="#pricing" className="nav-link" style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Pricing</a>
          <a href="#faq" className="nav-link" style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>FAQ</a>
          <Link href="/blog" className="nav-link" style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Blog</Link>
          <Link href="/dashboard" className="nav-link" style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Dashboard</Link>
        </div>

        <a
          href={INSTALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            background: '#6366f1', color: 'white', padding: '7px 16px',
            borderRadius: '7px', fontSize: '13px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Install Free
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        textAlign: 'center', padding: '96px 24px 80px',
        maxWidth: '780px', margin: '0 auto',
      }}>
        {/* Badge */}
        <div className="hero-animate-1" style={{ display: 'inline-block', marginBottom: '28px' }}>
          <span className="badge-shimmer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 16px', borderRadius: '100px', fontSize: '12px',
            fontWeight: 500, color: '#a78bfa',
            border: '1px solid rgba(99,102,241,0.25)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              display: 'inline-block', boxShadow: '0 0 6px #22c55e',
            }} />
            Powered by Claude AI · Free tier available
          </span>
        </div>

        {/* H1 */}
        <h1 className="hero-animate-2" style={{
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em',
          marginBottom: '24px', color: '#f0f0f0',
        }}>
          <span className="gradient-text">AI Git Commit Message</span><br />
          Generator for VS Code
        </h1>

        {/* Subtext */}
        <p className="hero-animate-3" style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#888',
          marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Stop writing &ldquo;fix stuff&rdquo;. CommitCraft reads your staged diff and generates perfect conventional commit messages in one click.
        </p>

        {/* CTA buttons */}
        <div className="hero-animate-4 hero-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              background: '#6366f1', color: 'white',
              padding: '13px 24px', borderRadius: '9px',
              fontSize: '15px', fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install for VS Code — Free
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              background: 'rgba(255,255,255,0.04)', color: '#ccc',
              padding: '13px 24px', borderRadius: '9px',
              fontSize: '15px', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        <p className="hero-animate-4" style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
          20 free generations/month · No credit card required
        </p>

        <p style={{ color: '#888', fontSize: '15px', textAlign: 'center', maxWidth: '600px', margin: '24px auto 0' }}>
          CommitCraft AI is a VS Code extension that automatically generates conventional commit messages, PR descriptions, and changelog entries from your git diff. Powered by Claude AI, it supports Conventional Commits format, GitMoji, and Simple styles — free for 20 generations/month, Pro for $4.99/month.
        </p>

        {/* Animated terminal */}
        <div className="hero-animate-5" style={{ marginTop: '56px', textAlign: 'left' }}>
          <div style={{
            background: '#111111', border: '1px solid #1e1e1e',
            borderRadius: '14px', overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
          }}>
            {/* Title bar */}
            <div style={{
              background: '#161616', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: '8px',
              borderBottom: '1px solid #1e1e1e',
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ marginLeft: 8, color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                Source Control — CommitCraft AI
              </span>
              <span style={{
                marginLeft: 'auto', background: 'rgba(99,102,241,0.15)',
                color: '#818cf8', fontSize: '11px', padding: '2px 8px',
                borderRadius: '4px', fontFamily: 'Inter, sans-serif',
                border: '1px solid rgba(99,102,241,0.2)',
              }}>
                Claude AI
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: '24px', minHeight: '180px' }}>
              {/* Before */}
              <div className="terminal-line-1" style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', color: '#555', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>
                  BEFORE — developer wrote:
                </div>
                <div style={{ color: '#f87171', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#555' }}>$</span>
                  <span>git commit -m &quot;</span>
                  <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>fixed stuff</span>
                  <span>&quot;</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="terminal-line-2" style={{ color: '#6366f1', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✦</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#818cf8' }}>
                  CommitCraft AI analyzed 3 changed files...
                </span>
              </div>

              {/* After - line 1 */}
              <div className="terminal-line-3" style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', color: '#555', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>
                  AFTER — AI generated:
                </div>
                <div style={{ color: '#a78bfa', fontSize: '14px', fontWeight: 600 }}>
                  feat(auth): add Google OAuth login with session persistence
                </div>
              </div>

              {/* After - body */}
              <div className="terminal-line-4" style={{ paddingLeft: '0' }}>
                <div style={{ color: '#86efac', fontSize: '12px', lineHeight: 1.8 }}>
                  + Implement Google OAuth2 flow using passport.js<br />
                  + Add refresh token rotation for security<br />
                  + Persist user sessions in Redis with 7-day TTL
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <div style={{
                    background: '#6366f1', color: 'white', padding: '6px 16px',
                    borderRadius: '5px', fontSize: '12px', fontFamily: 'Inter, sans-serif',
                    fontWeight: 600, cursor: 'pointer',
                  }}>Accept &amp; Commit</div>
                  <div style={{
                    background: '#1a1a1a', color: '#888', padding: '6px 14px',
                    borderRadius: '5px', fontSize: '12px', fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer', border: '1px solid #2a2a2a',
                  }}>Regenerate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIVE DEMO TERMINAL ─── */}
      <section style={{ maxWidth: '780px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            See it in action
          </h2>
          <p style={{ color: '#888', fontSize: '15px' }}>A click turns vague messages into precise, conventional commits.</p>
        </div>

        <div style={{
          background: '#0d0d0d', border: '1px solid #1a1a1a',
          borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 32px 100px rgba(0,0,0,0.6)',
        }}>
          {/* VS Code-like header */}
          <div style={{ background: '#141414', borderBottom: '1px solid #1a1a1a' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                padding: '9px 18px', fontSize: '12px', color: '#ccc',
                borderRight: '1px solid #1a1a1a', background: '#0d0d0d',
                borderBottom: '2px solid #6366f1',
              }}>
                auth.service.ts
              </div>
              <div style={{ padding: '9px 18px', fontSize: '12px', color: '#555', borderRight: '1px solid #1a1a1a' }}>
                user.model.ts
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* Editor */}
            <div style={{
              padding: '20px',
              borderRight: '1px solid #1a1a1a',
              fontFamily: '"SF Mono", "Fira Code", monospace',
              fontSize: '12px', lineHeight: '1.8',
            }}>
              <div style={{ color: '#555', marginBottom: '8px', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>CODE CHANGES</div>
              <div style={{ color: '#86efac' }}>+ import {'{'} GoogleStrategy {'}'} from &apos;passport-google&apos;</div>
              <div style={{ color: '#86efac' }}>+ async function googleAuth(profile) {'{'}</div>
              <div style={{ color: '#86efac' }}>+   const user = await findOrCreate(profile)</div>
              <div style={{ color: '#86efac' }}>+   await redis.setex(user.id, 604800, token)</div>
              <div style={{ color: '#86efac' }}>+   return user</div>
              <div style={{ color: '#86efac' }}>+ {'}'}</div>
              <div style={{ color: '#f87171', marginTop: '4px' }}>- // TODO: implement oauth</div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: '#a78bfa', padding: '6px 12px',
                  borderRadius: '6px', fontSize: '11px',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>
                  <span style={{ fontSize: '13px' }}>✨</span> Generate Commit
                </div>
              </div>
            </div>

            {/* Output panel */}
            <div style={{
              padding: '20px',
              fontFamily: '"SF Mono", "Fira Code", monospace',
              fontSize: '12px', lineHeight: '1.8',
            }}>
              <div style={{ color: '#555', marginBottom: '8px', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>AI OUTPUT</div>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                feat(auth): add Google OAuth login<br />with session persistence
              </div>
              <div style={{ color: '#555', fontSize: '11px', marginBottom: '6px' }}>Body:</div>
              <div style={{ color: '#86efac', fontSize: '11px', lineHeight: 2 }}>
                + OAuth2 via passport-google-oauth20<br />
                + Redis session store (7d TTL)<br />
                + findOrCreate user pattern
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '6px' }}>
                <div style={{
                  background: '#6366f1', color: 'white',
                  padding: '5px 12px', borderRadius: '5px',
                  fontSize: '11px', fontFamily: 'Inter, sans-serif',
                  fontWeight: 600, cursor: 'pointer',
                }}>Accept</div>
                <div style={{
                  color: '#555', padding: '5px 10px', borderRadius: '5px',
                  fontSize: '11px', fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer', border: '1px solid #2a2a2a',
                }}>Edit</div>
                <div style={{
                  color: '#555', padding: '5px 10px', borderRadius: '5px',
                  fontSize: '11px', fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer', border: '1px solid #2a2a2a',
                }}>Retry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section style={{
        borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
        background: 'rgba(17,17,17,0.5)', padding: '24px',
        marginBottom: '100px',
      }}>
        <div className="stats-grid" style={{
          maxWidth: '800px', margin: '0 auto',
          display: 'flex', justifyContent: 'center',
          gap: '48px', alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '69%', label: 'install rate' },
            { value: 'Claude AI', label: 'powered by' },
            { value: 'Free tier', label: 'no credit card' },
            { value: '$4.99/mo', label: 'Pro plan' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ maxWidth: '1040px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.02em', marginBottom: '12px',
          }}>
            Everything you need for a{' '}
            <span className="gradient-text">clean git history</span>
          </h2>
          <p style={{ color: '#888', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
            Built for developers who care about quality but hate wasting time.
          </p>
        </div>

        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            {
              icon: '⚡',
              title: 'One-Click Generation',
              desc: 'Press Ctrl+Shift+G or click the button in Source Control. No copy-pasting, no context switching — done in a second.',
            },
            {
              icon: '🎯',
              title: 'Conventional Commits',
              desc: 'Auto-generates feat:, fix:, chore:, docs: with proper scope and description every time.',
            },
            {
              icon: '📋',
              title: 'PR Descriptions',
              desc: 'Complete pull request descriptions with summary, change list, and testing notes — from your diff.',
            },
            {
              icon: '📝',
              title: 'Changelog Entries',
              desc: 'Keep your CHANGELOG.md up to date automatically with formatted entries per release.',
            },
            {
              icon: '🎨',
              title: '3 Commit Styles',
              desc: 'Switch between conventional commits, gitmoji, and simple styles. Your team, your rules.',
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              desc: 'Only your git diff is sent for analysis. No source code stored, no logging of your changes.',
            },
          ].map(f => (
            <div
              key={f.title}
              className="feature-card"
              style={{
                background: '#111111', border: '1px solid #1a1a1a',
                borderRadius: '14px', padding: '28px',
                cursor: 'default',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '10px',
                background: 'rgba(99,102,241,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '16px',
                border: '1px solid rgba(99,102,241,0.1)',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '10px', color: '#f0f0f0' }}>{f.title}</h3>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ maxWidth: '700px', margin: '0 auto 100px', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: '#888', fontSize: '16px' }}>Start free. Upgrade when you love it. Cancel anytime.</p>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          {/* Free */}
          <div style={{
            background: '#111111', border: '1px solid #1e1e1e',
            borderRadius: '16px', padding: '32px', textAlign: 'left',
          }}>
            <div style={{ fontSize: '13px', color: '#666', fontWeight: 500, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Free</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
              <span style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '-0.03em', color: '#f0f0f0' }}>$0</span>
            </div>
            <div style={{ color: '#555', fontSize: '14px', marginBottom: '28px' }}>forever · no card needed</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px' }}>
              {[
                '20 generations/month',
                'All 3 generation types',
                'All commit styles',
                'VS Code integration',
              ].map(f => (
                <li key={f} style={{ fontSize: '14px', color: '#aaa', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', textAlign: 'center',
                background: 'rgba(255,255,255,0.05)',
                color: '#ccc', padding: '12px',
                borderRadius: '8px', border: '1px solid #2a2a2a',
                fontSize: '14px', fontWeight: 500,
                transition: 'background 0.15s',
              }}
            >
              Install Free
            </a>
          </div>

          {/* Pro */}
          <div
            className="pro-card"
            style={{
              background: 'linear-gradient(160deg, #0f0f1f 0%, #0d0d1a 100%)',
              border: '2px solid #6366f1',
              borderRadius: '16px', padding: '32px', textAlign: 'left',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', top: -13, left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #6366f1, #818cf8)',
              color: 'white', padding: '4px 16px',
              borderRadius: '100px', fontSize: '11px',
              fontWeight: 700, letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: '13px', color: '#a78bfa', fontWeight: 500, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pro</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
              <span style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '-0.03em', color: '#f0f0f0' }}>$4.99</span>
              <span style={{ color: '#555', fontSize: '14px' }}>/month</span>
            </div>
            <div style={{ color: '#555', fontSize: '14px', marginBottom: '28px' }}>or $39.99/year (save 33%)</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px' }}>
              {[
                'Unlimited generations',
                'All Free features',
                'Priority support',
                'Cancel anytime',
              ].map(f => (
                <li key={f} style={{ fontSize: '14px', color: '#ccc', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/upgrade"
              style={{
                display: 'block', textAlign: 'center',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                color: 'white', padding: '13px',
                borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
              }}
            >
              Upgrade to Pro →
            </Link>
          </div>
        </div>

        <p style={{ marginTop: '24px', color: '#444', fontSize: '13px' }}>
          Annual plan available on the upgrade page · Secure checkout by Dodo Payments
        </p>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ maxWidth: '640px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
        </div>

        {[
          {
            id: 'faq1',
            q: 'Does CommitCraft AI store my code?',
            a: 'No. Only your git diff is sent to our API for analysis. We do not store diffs, source code, or any file contents. Your work stays yours.',
          },
          {
            id: 'faq2',
            q: 'What languages and frameworks are supported?',
            a: 'Any language — CommitCraft reads git diffs which are language-agnostic. JavaScript, TypeScript, Python, Go, Rust, Java, C++, and everything else works perfectly.',
          },
          {
            id: 'faq3',
            q: 'What are Conventional Commits?',
            a: 'A standard format: type(scope): description. For example, feat(auth): add OAuth login. It makes git history readable and enables automated changelogs.',
          },
          {
            id: 'faq4',
            q: 'Can I use my own Claude API key?',
            a: 'The hosted plan uses our API key so you don\'t need one. Self-hosting with your own key is on our roadmap.',
          },
          {
            id: 'faq5',
            q: 'How do I cancel my Pro subscription?',
            a: 'Email us at mohammad1820@icloud.com or visit your dashboard. Cancellations take effect at the end of your current billing period.',
          },
        ].map((item, i) => (
          <div
            key={item.id}
            className="faq-item"
            style={{
              borderBottom: i < 4 ? '1px solid #1a1a1a' : 'none',
            }}
          >
            <input type="checkbox" id={item.id} />
            <label
              htmlFor={item.id}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 0', cursor: 'pointer',
                fontSize: '15px', fontWeight: 600, color: '#e0e0e0',
                userSelect: 'none',
              }}
            >
              {item.q}
              <span className="faq-chevron" style={{ color: '#555', fontSize: '18px', flexShrink: 0, marginLeft: 16 }}>
                ↓
              </span>
            </label>
            <div className="faq-answer" style={{ paddingBottom: '20px' }}>
              <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.75 }}>{item.a}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{
        textAlign: 'center', padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 100%)',
        borderTop: '1px solid #1a1a1a',
        marginBottom: 0,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
          color: '#818cf8', padding: '5px 14px', borderRadius: '100px',
          fontSize: '12px', fontWeight: 500, marginBottom: '24px',
        }}>
          Free to install · Takes 30 seconds
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900,
          letterSpacing: '-0.03em', marginBottom: '16px',
        }}>
          Save 5 minutes per commit.
        </h2>
        <p style={{ color: '#666', fontSize: '17px', marginBottom: '36px', maxWidth: '420px', margin: '0 auto 36px' }}>
          At 10 commits a day, that&apos;s <strong style={{ color: '#a78bfa' }}>50 minutes back</strong> every single day.
        </p>
        <a
          href={INSTALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            background: '#6366f1', color: 'white',
            padding: '15px 32px', borderRadius: '10px',
            fontSize: '16px', fontWeight: 700,
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Install Free — VS Code Marketplace
        </a>
      </section>

      {/* Blog Preview Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: '#f0f0f0' }}>
          Learn Git Best Practices
        </h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px', fontSize: '15px' }}>
          Free guides on writing better commit messages and improving your git workflow
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            {
              title: 'How to Write Better Git Commit Messages',
              excerpt: 'The complete guide to writing meaningful commits that your future self will thank you for.',
              slug: 'how-to-write-better-git-commit-messages',
              readTime: '10 min read',
            },
            {
              title: 'Conventional Commits: Complete Guide',
              excerpt: 'Learn the standard that top engineering teams use to structure their commit history.',
              slug: 'conventional-commits-guide',
              readTime: '8 min read',
            },
            {
              title: 'Git Commit Best Practices for Teams',
              excerpt: 'A practical checklist for teams who want consistent, meaningful git history.',
              slug: 'git-commit-best-practices',
              readTime: '7 min read',
            },
          ].map(post => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                background: '#111',
                border: '1px solid #1e1e1e',
                borderRadius: '12px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <div style={{ color: '#6366f1', fontSize: '12px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {post.readTime}
              </div>
              <h3 style={{ color: '#f0f0f0', fontWeight: 700, fontSize: '16px', marginBottom: '8px', lineHeight: 1.4 }}>
                {post.title}
              </h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                {post.excerpt}
              </p>
              <div style={{ color: '#6366f1', fontSize: '14px', marginTop: '16px', fontWeight: 500 }}>
                Read article →
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/blog" style={{ color: '#6366f1', fontSize: '15px', fontWeight: 500 }}>
            View all articles →
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid #141414',
        padding: '32px 24px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{ color: '#444', fontSize: '13px' }}>© 2026 CommitCraft AI</span>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/dashboard" style={{ color: '#555', fontSize: '13px' }}>Dashboard</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#555', fontSize: '13px' }}>GitHub</a>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <a href="mailto:mohammad1820@icloud.com" style={{ color: '#555', fontSize: '13px' }}>mohammad1820@icloud.com</a>
      </footer>

    </main>
  )
}
