import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How CommitCraft AI Generates Git Commit Messages | VS Code Extension',
  description: 'Learn how CommitCraft AI reads your staged git diff and uses Claude AI to generate perfect conventional commit messages in VS Code. Technical explainer with examples.',
  alternates: { canonical: 'https://commitcraft-landing.vercel.app/how-it-works' },
  openGraph: {
    title: 'How CommitCraft AI Generates Git Commit Messages',
    description: 'Technical walkthrough: staged diff → Claude AI → conventional commit, all inside VS Code.',
  },
}

const INSTALL_URL = 'https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai'

const steps = [
  {
    num: '01',
    icon: '📁',
    title: 'You stage your changes',
    body: 'Use `git add .` in the terminal, or stage individual files in VS Code\'s Source Control panel. CommitCraft only reads staged changes — unstaged work is never touched. This keeps you in full control of what gets included in the commit.',
    code: '$ git add src/auth/oauth.ts\n$ git add src/middleware/session.ts\n# Or stage via VS Code Source Control UI',
    codeColor: '#86efac',
  },
  {
    num: '02',
    icon: '✨',
    title: 'Click the ✨ button in Source Control',
    body: 'A ✨ icon appears directly in the VS Code Source Control toolbar — no extra panels, no external apps. Click it once. You can also trigger generation with the keyboard shortcut Ctrl+Shift+G (Cmd+Shift+G on Mac) or via the Command Palette.',
    code: null,
    codeColor: '',
  },
  {
    num: '03',
    icon: '🔍',
    title: 'CommitCraft reads your staged diff',
    body: 'The extension calls VS Code\'s built-in Git API to retrieve your staged diff. This is the same diff you\'d see with `git diff --staged`. Only the diff text is read — not your full files, not your project tree, not any configuration.',
    code: '// Internally calls:\nconst diff = await repo.diff(true) // true = staged only\n// Large diffs are trimmed to 8KB before analysis',
    codeColor: '#818cf8',
  },
  {
    num: '04',
    icon: '🤖',
    title: 'The diff is analyzed by Claude AI',
    body: 'The diff is sent to Claude Haiku — Anthropic\'s fast, cost-efficient model — with a structured prompt that instructs it to identify the change type, scope, and a precise description. The model is specifically prompted to output conventional commit format, not free-form text.',
    code: null,
    codeColor: '',
  },
  {
    num: '05',
    icon: '✅',
    title: 'A commit message appears — review and accept',
    body: 'Claude\'s response is parsed into a title (the conventional commit line) and optional bullet points for the body. These appear in a VS Code panel for you to review. Click Accept to fill the Source Control input box, then commit as normal. Or regenerate if you want a different take.',
    code: 'feat(auth): add Google OAuth login with session persistence\n\n+ Implement OAuth2 flow via passport-google-oauth20\n+ Add Redis session store with 7-day TTL\n+ Handle findOrCreate pattern for new users',
    codeColor: '#a78bfa',
  },
]

const commitStyles = [
  {
    name: 'Conventional Commits',
    badge: 'Most popular',
    badgeColor: '#6366f1',
    desc: 'The industry standard. Works with semantic-release, standard-version, and automated changelog tools.',
    example: 'feat(auth): add Google OAuth login with session persistence\n\n+ Implement OAuth2 flow\n+ Add Redis session store (7d TTL)',
  },
  {
    name: 'GitMoji',
    badge: 'Fun & expressive',
    badgeColor: '#f59e0b',
    desc: 'Emoji-prefixed commits that are visually scannable at a glance. Popular in design-oriented and open-source projects.',
    example: '✨ feat(auth): add Google OAuth login\n\n+ OAuth2 flow via passport-google\n+ Redis sessions with 7-day TTL',
  },
  {
    name: 'Simple',
    badge: 'Minimal',
    badgeColor: '#6b7280',
    desc: 'Clean, plain-English commit messages for teams that prefer simplicity over strict formatting conventions.',
    example: 'Add Google OAuth login with session persistence\n\n- OAuth2 integration via passport\n- Redis-backed user sessions',
  },
]

const faqs = [
  {
    q: 'Does it work with any programming language?',
    a: 'Yes — CommitCraft reads git diffs, which are language-agnostic. Whether you\'re working in TypeScript, Python, Go, Rust, Java, Ruby, C++, Swift, or anything else, the diff format is identical. The AI understands code changes across all languages and frameworks.',
  },
  {
    q: 'What if the diff is very large?',
    a: 'Large diffs are automatically truncated to approximately 8KB before being sent to Claude AI. The truncation is front-loaded — the most important changes at the top of the diff are preserved. For very large commits, consider splitting them into smaller, focused commits for the best results.',
  },
  {
    q: 'Can I use my own Claude API key?',
    a: 'Not yet. Currently, CommitCraft uses a managed API key so you don\'t need to configure anything. Support for bring-your-own API key (BYOK) is on the roadmap for a future release.',
  },
  {
    q: 'Does it work offline?',
    a: 'No — CommitCraft requires an internet connection to reach the Claude AI API. The diff analysis happens server-side. However, all other VS Code Git functionality works offline as normal; CommitCraft only activates when you click the generate button.',
  },
]

export default function HowItWorksPage() {
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
          }}
        >
          Install Free
        </a>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '88px 24px 72px', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 16px', borderRadius: '100px', fontSize: '12px',
          fontWeight: 500, color: '#a78bfa',
          border: '1px solid rgba(99,102,241,0.25)',
          background: 'rgba(99,102,241,0.06)',
          marginBottom: '28px',
        }}>
          Technical walkthrough · For developers
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 58px)',
          fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em',
          marginBottom: '24px', color: '#f0f0f0',
        }}>
          How CommitCraft AI Generates<br />
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 40%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Perfect Commit Messages</span>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#888', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.8 }}>
          From staged diff to conventional commit in under 3 seconds. Here&apos;s exactly what happens under the hood — no magic, just a well-engineered pipeline inside VS Code.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#6366f1', color: 'white',
              padding: '12px 22px', borderRadius: '9px',
              fontSize: '14px', fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Install Free
          </a>
          <Link
            href="/conventional-commits"
            style={{
              background: 'transparent', color: '#a78bfa',
              padding: '12px 22px', borderRadius: '9px',
              fontSize: '14px', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            Conventional Commits guide →
          </Link>
        </div>
      </section>

      {/* 5-STEP PROCESS */}
      <section style={{ maxWidth: '840px', margin: '0 auto 100px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          The 5-Step Process
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px' }}>
          Every commit generation follows the exact same deterministic pipeline.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {steps.map((step, i) => (
            <div key={step.num}>
              <div style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '12px', padding: '28px 32px',
                display: 'flex', gap: '24px', alignItems: 'flex-start',
              }}>
                {/* Step number + connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '48px' }}>
                  <div style={{
                    width: 48, height: 48,
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"SF Mono", monospace',
                    fontSize: '12px', color: '#6366f1', fontWeight: 700,
                    flexShrink: 0,
                  }}>{step.num}</div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{step.icon}</span>
                    <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#f0f0f0', margin: 0 }}>{step.title}</h3>
                  </div>
                  <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.8, marginBottom: step.code ? '16px' : 0 }}>
                    {step.body}
                  </p>
                  {step.code && (
                    <pre style={{
                      background: '#0d0d0d', border: '1px solid #1a1a1a',
                      borderRadius: '8px', padding: '14px 18px',
                      fontFamily: '"SF Mono", "Fira Code", monospace',
                      fontSize: '12px', lineHeight: 1.9,
                      color: step.codeColor, overflowX: 'auto', margin: 0,
                    }}>
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
              </div>

              {i < steps.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '24px' }}>
                  <div style={{ width: '48px', display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                    <div style={{ width: '2px', height: '20px', background: 'linear-gradient(180deg, rgba(99,102,241,0.3), rgba(99,102,241,0.05))' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* UNDER THE HOOD */}
      <section style={{ maxWidth: '840px', margin: '0 auto 100px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Under the Hood
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px', lineHeight: 1.75 }}>
          For engineers who want to understand the technical implementation before trusting a tool with their workflow.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            {
              title: 'VS Code Git API',
              desc: 'CommitCraft uses VS Code\'s built-in Git extension API — specifically `repo.diff(true)` to fetch only staged changes. This is the same API surface that VS Code\'s own Source Control UI uses, so it\'s stable and well-supported.',
              code: 'const diff = await repo.diff(true)\n// true = staged (index) only',
            },
            {
              title: 'Diff size limit',
              desc: 'Before sending to the AI, diffs are trimmed to approximately 8,000 characters (8KB). This keeps API costs low, latency fast, and ensures the model focuses on the most semantically significant changes.',
              code: 'const trimmed = diff.slice(0, 8000)\n// Front-loaded: top changes preserved',
            },
            {
              title: 'Claude Haiku model',
              desc: 'CommitCraft uses Claude Haiku — the fastest and most cost-efficient model in the Claude family. It\'s well-suited for structured output tasks like commit message generation where speed matters more than creative depth.',
              code: 'model: "claude-haiku-*"\nmax_tokens: 300\ntemperature: 0.3',
            },
            {
              title: 'SCM input box injection',
              desc: 'On Accept, the generated message is written directly to VS Code\'s Source Control input box using `repo.inputBox.value`. No clipboard tricks, no terminal commands — it just appears in the right place.',
              code: 'repo.inputBox.value = generatedMessage\n// Ready to commit with Ctrl+Enter',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '12px', padding: '24px',
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#f0f0f0', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.75, marginBottom: '14px' }}>{item.desc}</p>
              <pre style={{
                background: '#0d0d0d', border: '1px solid #1a1a1a',
                borderRadius: '7px', padding: '12px 14px',
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: '11px', lineHeight: 1.9,
                color: '#818cf8', overflowX: 'auto', margin: 0,
              }}>
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* THREE COMMIT STYLES */}
      <section style={{ maxWidth: '840px', margin: '0 auto 100px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Three Commit Styles
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px', lineHeight: 1.75 }}>
          CommitCraft adapts to your team&apos;s conventions. Switch styles from the VS Code settings panel — the same diff, different format.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {commitStyles.map((style) => (
            <div
              key={style.name}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '12px', padding: '24px 28px',
                display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'start',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#f0f0f0', margin: 0 }}>{style.name}</h3>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, padding: '2px 8px',
                    borderRadius: '100px', background: `${style.badgeColor}22`,
                    color: style.badgeColor, border: `1px solid ${style.badgeColor}44`,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>{style.badge}</span>
                </div>
                <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{style.desc}</p>
              </div>
              <pre style={{
                background: '#0d0d0d', border: '1px solid #1a1a1a',
                borderRadius: '8px', padding: '14px 16px',
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: '12px', lineHeight: 1.9,
                color: '#a78bfa', overflowX: 'auto', margin: 0,
              }}>
                <code>{style.example}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section style={{ maxWidth: '840px', margin: '0 auto 100px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Your Code Stays Private
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '36px', lineHeight: 1.75 }}>
          CommitCraft is designed with privacy as a first principle. We built it to work with the minimum necessary data.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            {
              icon: '🔍',
              title: 'Only the diff is sent',
              desc: 'CommitCraft sends only the staged git diff — not your full source files, not your project structure, not any file outside the diff.',
            },
            {
              icon: '🚫',
              title: 'No code storage',
              desc: 'We do not store, log, or retain diffs or commit messages on our servers. Each request is processed and discarded.',
            },
            {
              icon: '📋',
              title: 'No commit history logging',
              desc: 'We don\'t track which commits you generate, how often you use the extension, or any metadata about your repository.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '12px', padding: '24px',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '10px',
                background: 'rgba(99,102,241,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '14px',
                border: '1px solid rgba(99,102,241,0.1)',
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#f0f0f0', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '680px', margin: '0 auto 100px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Technical Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                borderBottom: i < faqs.length - 1 ? '1px solid #1a1a1a' : 'none',
                padding: '28px 0',
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#e0e0e0', marginBottom: '10px' }}>
                {faq.q}
              </h3>
              <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)',
        borderTop: '1px solid #1a1a1a',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
          color: '#818cf8', padding: '5px 14px', borderRadius: '100px',
          fontSize: '12px', fontWeight: 500, marginBottom: '24px',
        }}>
          Free to install · Takes 30 seconds
        </div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Ready to auto-generate your commits?
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
          Install CommitCraft AI and get 20 free generations per month. No API key needed, no config required.
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
          Install Free — VS Code Marketplace →
        </a>
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/conventional-commits" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            Conventional Commits guide →
          </Link>
          <Link href="/vs-copilot" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            CommitCraft vs Copilot →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #141414',
        padding: '32px 24px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{ color: '#444', fontSize: '13px' }}>© 2026 CommitCraft AI</span>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/" style={{ color: '#555', fontSize: '13px' }}>Home</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/conventional-commits" style={{ color: '#555', fontSize: '13px' }}>Conventional Commits</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <Link href="/vs-copilot" style={{ color: '#555', fontSize: '13px' }}>vs Copilot</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <a href="mailto:mohammad1820@icloud.com" style={{ color: '#555', fontSize: '13px' }}>Support</a>
      </footer>

    </main>
  )
}
