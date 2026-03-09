import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conventional Commits Generator — Auto-Format Git Messages in VS Code',
  description: 'Generate perfectly formatted Conventional Commits automatically in VS Code. CommitCraft AI reads your code diff and creates feat:, fix:, docs: commit messages in one click. Free tier available.',
  alternates: { canonical: 'https://commitcraft-landing.vercel.app/conventional-commits' },
  openGraph: {
    title: 'Conventional Commits Generator for VS Code',
    description: 'Auto-generate conventional commits from your diff in one click.',
  },
}

const INSTALL_URL = 'https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai'

const commitTypes = [
  { type: 'feat', when: 'New feature for the user', example: 'feat(auth): add OAuth login' },
  { type: 'fix', when: 'Bug fix for the user', example: 'fix(api): handle null response' },
  { type: 'docs', when: 'Documentation changes only', example: 'docs(readme): update setup guide' },
  { type: 'style', when: 'Formatting, no logic change', example: 'style: fix inconsistent spacing' },
  { type: 'refactor', when: 'Code restructure, no bug fix or feature', example: 'refactor(db): extract pool logic' },
  { type: 'test', when: 'Adding or correcting tests', example: 'test(auth): add OAuth unit tests' },
  { type: 'chore', when: 'Build process or tooling changes', example: 'chore(deps): upgrade dependencies' },
  { type: 'perf', when: 'Performance improvements', example: 'perf(query): add database index' },
  { type: 'ci', when: 'CI pipeline configuration changes', example: 'ci: add GitHub Actions workflow' },
  { type: 'build', when: 'Build system or external dependency changes', example: 'build: switch to esbuild' },
]

export default function ConventionalCommitsPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#f0f0f0' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 40px', height: '60px',
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '14px', fontWeight: 500 }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>←</span>
          Back to home
        </Link>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: '#f0f0f0' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            fontSize: 14,
          }}>✦</span>
          CommitCraft AI
        </Link>

        <a
          href={INSTALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#6366f1', color: 'white', padding: '7px 16px',
            borderRadius: '7px', fontSize: '13px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          Install Free
        </a>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '88px 24px 72px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 16px', borderRadius: '100px', fontSize: '12px',
          fontWeight: 500, color: '#a78bfa',
          border: '1px solid rgba(99,102,241,0.25)',
          background: 'rgba(99,102,241,0.06)',
          marginBottom: '28px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
          Conventional Commits · Automated in VS Code
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em',
          marginBottom: '24px', color: '#f0f0f0',
        }}>
          Conventional Commits<br />
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 40%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Generator for VS Code</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#888', marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px', lineHeight: 1.75 }}>
          Stop hand-writing <code style={{ fontFamily: 'monospace', color: '#a78bfa', background: 'rgba(99,102,241,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>feat(scope): description</code> every time.
          CommitCraft AI reads your staged git diff and generates a perfectly formatted conventional commit message in one click — directly inside VS Code.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            Install Free — VS Code Marketplace
          </a>
          <Link
            href="/how-it-works"
            style={{
              background: 'rgba(255,255,255,0.04)', color: '#ccc',
              padding: '13px 24px', borderRadius: '9px',
              fontSize: '15px', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            How it works →
          </Link>
        </div>
        <p style={{ fontSize: '13px', color: '#555' }}>20 free generations/month · No credit card required</p>
      </section>

      {/* WHAT ARE CONVENTIONAL COMMITS */}
      <section style={{ maxWidth: '840px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px' }}>
          What are Conventional Commits?
        </h2>
        <p style={{ color: '#888', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
          Conventional Commits is a lightweight specification for writing commit messages with a structured format. Adopted by thousands of open-source projects and engineering teams, the format makes your git history readable by both humans and machines — enabling automated changelogs, semantic versioning, and better code review.
        </p>
        <p style={{ color: '#888', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
          The structure is simple: a <strong style={{ color: '#ccc' }}>type</strong>, an optional <strong style={{ color: '#ccc' }}>scope</strong> in parentheses, a colon, and a short <strong style={{ color: '#ccc' }}>description</strong>. Optionally, a longer body and footer can follow. The problem? Writing this consistently, every single commit, is tedious — and most developers skip it under pressure.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
            The format
          </div>
          <pre style={{
            background: '#0d0d0d', border: '1px solid #1e1e1e',
            borderRadius: '10px', padding: '20px 24px',
            fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
            fontSize: '14px', lineHeight: 1.9, overflowX: 'auto',
            color: '#f0f0f0',
          }}>
            <code>{`<type>(<scope>): <description>

[optional body]

[optional footer(s)]`}</code>
          </pre>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
            Real examples CommitCraft AI generates
          </div>
          <pre style={{
            background: '#0d0d0d', border: '1px solid #1e1e1e',
            borderRadius: '10px', padding: '20px 24px',
            fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
            fontSize: '13px', lineHeight: 2.1, overflowX: 'auto',
          }}>
            <code>
              <span style={{ color: '#a78bfa' }}>feat(auth)</span><span style={{ color: '#888' }}>:</span><span style={{ color: '#f0f0f0' }}> add Google OAuth login with session persistence</span>{'\n'}
              <span style={{ color: '#f87171' }}>fix(api)</span><span style={{ color: '#888' }}>:</span><span style={{ color: '#f0f0f0' }}> resolve null pointer in user endpoint when profile missing</span>{'\n'}
              <span style={{ color: '#86efac' }}>docs(readme)</span><span style={{ color: '#888' }}>:</span><span style={{ color: '#f0f0f0' }}> update installation instructions for Windows</span>{'\n'}
              <span style={{ color: '#fbbf24' }}>chore(deps)</span><span style={{ color: '#888' }}>:</span><span style={{ color: '#f0f0f0' }}> upgrade React to 18.3 and update peer deps</span>{'\n'}
              <span style={{ color: '#60a5fa' }}>refactor(db)</span><span style={{ color: '#888' }}>:</span><span style={{ color: '#f0f0f0' }}> extract connection pooling logic into separate module</span>
            </code>
          </pre>
        </div>

        <div style={{
          background: '#111111', border: '1px solid #1e1e1e',
          borderRadius: '10px', padding: '20px 24px',
          borderLeft: '3px solid #6366f1',
        }}>
          <p style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: '#f0f0f0' }}>Why it matters:</strong> Conventional Commits unlock automated tools like <code style={{ fontFamily: 'monospace', color: '#a78bfa', fontSize: '0.9em' }}>semantic-release</code>, <code style={{ fontFamily: 'monospace', color: '#a78bfa', fontSize: '0.9em' }}>standard-version</code>, and GitHub's auto-release notes. They also make <code style={{ fontFamily: 'monospace', color: '#a78bfa', fontSize: '0.9em' }}>git log</code> instantly scannable for any engineer joining your project.
          </p>
        </div>
      </section>

      {/* COMMIT TYPE TABLE */}
      <section style={{ maxWidth: '900px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          All Conventional Commit Types
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '32px', lineHeight: 1.7 }}>
          CommitCraft AI automatically selects the right type based on what your diff actually shows — no manual selection needed.
        </p>

        <div style={{
          background: '#111111', border: '1px solid #1e1e1e',
          borderRadius: '12px', overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '100px 1fr 1fr',
            background: '#161616', borderBottom: '1px solid #1e1e1e',
            padding: '14px 20px',
          }}>
            <span style={{ fontSize: '11px', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Type</span>
            <span style={{ fontSize: '11px', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>When to use</span>
            <span style={{ fontSize: '11px', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Example</span>
          </div>

          {commitTypes.map((row, i) => (
            <div
              key={row.type}
              style={{
                display: 'grid', gridTemplateColumns: '100px 1fr 1fr',
                padding: '14px 20px',
                borderBottom: i < commitTypes.length - 1 ? '1px solid #161616' : 'none',
                alignItems: 'center',
              }}
            >
              <code style={{
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: '13px', fontWeight: 700,
                color: '#a78bfa',
                background: 'rgba(99,102,241,0.08)',
                padding: '3px 8px', borderRadius: '5px',
                display: 'inline-block',
              }}>{row.type}</code>
              <span style={{ fontSize: '13px', color: '#888', paddingRight: '16px' }}>{row.when}</span>
              <code style={{
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: '12px', color: '#6b7280',
              }}>{row.example}</code>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section style={{ maxWidth: '840px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Stop Writing Bad Commits Manually
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px', lineHeight: 1.7 }}>
          Every developer has been there: you&apos;re deep in a flow state, you finish a change, and you just want to commit and move on. The result is a git history full of messages like &quot;fix&quot;, &quot;wip&quot;, &quot;changes&quot;, and the notorious &quot;asdfgh&quot;. CommitCraft AI eliminates this entirely.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Before */}
          <div style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#1a1212', padding: '12px 16px', borderBottom: '1px solid #2a1a1a' }}>
              <span style={{ fontSize: '12px', color: '#f87171', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ✗ Before — vague, useless commits
              </span>
            </div>
            <div style={{ padding: '16px', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '12px', lineHeight: 2 }}>
              <div style={{ color: '#f87171' }}>&quot;fixed login bug&quot;</div>
              <div style={{ color: '#f87171' }}>&quot;wip&quot;</div>
              <div style={{ color: '#f87171' }}>&quot;changes&quot;</div>
              <div style={{ color: '#f87171' }}>&quot;fix&quot;</div>
              <div style={{ color: '#f87171' }}>&quot;update stuff&quot;</div>
              <div style={{ color: '#f87171' }}>&quot;asdfgh&quot;</div>
            </div>
          </div>

          {/* After */}
          <div style={{ background: '#111111', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#0f0f1a', padding: '12px 16px', borderBottom: '1px solid rgba(99,102,241,0.15)' }}>
              <span style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ✓ After — CommitCraft AI generated
              </span>
            </div>
            <div style={{ padding: '16px', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '12px', lineHeight: 2 }}>
              <div style={{ color: '#86efac' }}>fix(auth): resolve token expiration not cleared on logout</div>
              <div style={{ color: '#86efac' }}>feat(dashboard): add real-time data refresh every 30s</div>
              <div style={{ color: '#86efac' }}>refactor(api): consolidate error handling middleware</div>
              <div style={{ color: '#86efac' }}>fix(ui): correct button alignment on mobile breakpoint</div>
              <div style={{ color: '#86efac' }}>chore(deps): bump axios from 1.6.0 to 1.7.2</div>
              <div style={{ color: '#86efac' }}>docs(api): add endpoint descriptions for v2 routes</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Result of vague commits</div>
            <div style={{ fontSize: '13px', color: '#888' }}>No one knows what changed or why. Code review is slower, debugging takes longer, releases break unexpectedly.</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#a78bfa', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Result of conventional commits</div>
            <div style={{ fontSize: '13px', color: '#888' }}>Automated changelogs, instant code archaeology, faster PR reviews, clean semantic versioning.</div>
          </div>
        </div>
      </section>

      {/* HOW COMMITCRAFT GENERATES THEM */}
      <section style={{ maxWidth: '840px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          How CommitCraft AI Generates Them
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px', lineHeight: 1.7 }}>
          CommitCraft AI is a VS Code extension powered by Claude AI. It integrates directly into the Source Control panel — no terminal commands, no copy-pasting diffs, no context switching.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              step: '01',
              title: 'Stage your changes',
              desc: 'Use `git add` in the terminal or stage files via VS Code\'s Source Control panel. CommitCraft only analyzes staged changes — so you stay in control of what gets included.',
              code: '$ git add src/auth/oauth.ts src/middleware/session.ts',
            },
            {
              step: '02',
              title: 'Click the ✨ generate button',
              desc: 'A single ✨ button appears in your VS Code Source Control toolbar. One click is all it takes. Alternatively, use the keyboard shortcut Ctrl+Shift+G (Cmd+Shift+G on Mac).',
              code: null,
            },
            {
              step: '03',
              title: 'Review the generated message',
              desc: 'CommitCraft reads your staged diff, sends it to Claude AI (Haiku model), and returns a structured conventional commit message — with a title, scope, and optional bullet-point body. Review it, edit if needed, then accept to fill the VS Code commit input box.',
              code: 'feat(auth): add Google OAuth login with session persistence\n\n+ Implement OAuth2 flow via passport-google-oauth20\n+ Add Redis session store with 7-day TTL\n+ Handle findOrCreate user pattern for new signups',
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '12px', padding: '28px',
                display: 'flex', gap: '24px', alignItems: 'flex-start',
              }}
            >
              <div style={{
                minWidth: 48, height: 48,
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"SF Mono", monospace',
                fontSize: '13px', color: '#6366f1', fontWeight: 700,
              }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: '#f0f0f0' }}>{item.title}</h3>
                <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.75, marginBottom: item.code ? '16px' : 0 }}>{item.desc}</p>
                {item.code && (
                  <pre style={{
                    background: '#0d0d0d', border: '1px solid #1a1a1a',
                    borderRadius: '8px', padding: '14px 16px',
                    fontFamily: '"SF Mono", "Fira Code", monospace',
                    fontSize: '12px', lineHeight: 1.9,
                    color: '#a78bfa', overflowX: 'auto', margin: 0,
                  }}>
                    <code>{item.code}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)',
        borderTop: '1px solid #1a1a1a',
        maxWidth: '700px', margin: '0 auto',
        borderRadius: '16px 16px 0 0',
      }}>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Start generating conventional commits now
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>
          Free tier includes 5 generations per month. No credit card, no setup, no configuration required.
        </p>
        <a
          href={INSTALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#6366f1', color: 'white',
            padding: '15px 32px', borderRadius: '10px',
            fontSize: '16px', fontWeight: 700,
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Install from VS Code Marketplace →
        </a>
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/how-it-works" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            How it works →
          </Link>
          <Link href="/blog/conventional-commits-guide" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            Conventional Commits guide →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #141414',
        padding: '32px 24px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px', marginTop: '48px',
      }}>
        <span style={{ color: '#444', fontSize: '13px' }}>© 2026 CommitCraft AI</span>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/" style={{ color: '#555', fontSize: '13px' }}>Home</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/how-it-works" style={{ color: '#555', fontSize: '13px' }}>How it works</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/vs-copilot" style={{ color: '#555', fontSize: '13px' }}>vs Copilot</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <a href="mailto:mohammad1820@icloud.com" style={{ color: '#555', fontSize: '13px' }}>Support</a>
      </footer>

    </main>
  )
}
