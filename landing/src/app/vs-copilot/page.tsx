import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CommitCraft AI vs GitHub Copilot for Commit Messages | Honest Comparison',
  description: 'Comparing CommitCraft AI and GitHub Copilot for generating git commit messages in VS Code. Honest breakdown of features, pricing, and use cases.',
  alternates: { canonical: 'https://commitcraft-landing.vercel.app/vs-copilot' },
  openGraph: {
    title: 'CommitCraft AI vs GitHub Copilot for Commit Messages',
    description: 'Honest comparison of two VS Code AI tools — one specialized, one general-purpose.',
  },
}

const INSTALL_URL = 'https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai'
const UPGRADE_URL = 'https://serenitymind3.gumroad.com/l/opqpxp'

const tableRows = [
  {
    feature: 'Commit message generation',
    commitcraft: { value: 'Specialized, one-click', positive: true },
    copilot: { value: 'Basic inline suggestion only', positive: null },
  },
  {
    feature: 'PR description generation',
    commitcraft: { value: 'Full template with sections', positive: true },
    copilot: { value: 'Not included', positive: false },
  },
  {
    feature: 'Changelog entries',
    commitcraft: { value: 'Automatic from diff', positive: true },
    copilot: { value: 'Not included', positive: false },
  },
  {
    feature: 'Conventional Commits format',
    commitcraft: { value: 'Auto-enforced every time', positive: true },
    copilot: { value: 'Manual format required', positive: null },
  },
  {
    feature: 'GitMoji support',
    commitcraft: { value: 'Yes, built-in style option', positive: true },
    copilot: { value: 'No', positive: false },
  },
  {
    feature: 'Reads staged git diff',
    commitcraft: { value: 'Yes — core feature', positive: true },
    copilot: { value: 'Limited context awareness', positive: null },
  },
  {
    feature: 'Code completion',
    commitcraft: { value: 'Not its purpose', positive: false },
    copilot: { value: 'Core feature — excellent', positive: true },
  },
  {
    feature: 'AI chat assistant',
    commitcraft: { value: 'Not included', positive: false },
    copilot: { value: 'Yes, Copilot Chat', positive: true },
  },
  {
    feature: 'Code explanation',
    commitcraft: { value: 'Not included', positive: false },
    copilot: { value: 'Yes, via Chat', positive: true },
  },
  {
    feature: 'Free tier',
    commitcraft: { value: '5 generations/month free', positive: true },
    copilot: { value: '2,000 completions/month free', positive: true },
  },
  {
    feature: 'Paid pricing',
    commitcraft: { value: '$4.99/month', positive: true },
    copilot: { value: '$10/month minimum', positive: null },
  },
  {
    feature: 'Internet required',
    commitcraft: { value: 'Yes', positive: null },
    copilot: { value: 'Yes', positive: null },
  },
]

const useCasesCommitcraft = [
  'You commit code multiple times a day and want consistent, conventional commit messages without thinking about format',
  'Your team uses semantic-release, standard-version, or automated changelogs that depend on conventional commits',
  'You write PR descriptions manually and want to generate a complete, structured PR template from your diff in one click',
  'You maintain a CHANGELOG.md and want entries generated automatically from each release',
  'You prefer GitMoji-style commits and want the emoji chosen automatically based on change type',
  'You want a free tool that does one thing extremely well, rather than a broad AI assistant',
]

const useCasesCopilot = [
  'You want AI-powered code completion as you type — autocomplete for functions, boilerplate, and entire code blocks',
  'You want to have a conversation with an AI about your codebase: "Explain this function", "Refactor this", "Generate a test"',
  'You work across many IDEs and want a consistent AI experience in VS Code, JetBrains, Neovim, and others',
  'Your employer has a GitHub Enterprise license that includes Copilot at no additional cost',
  'You want AI assistance that extends beyond git workflow into active code writing and debugging',
]

export default function VsCopilotPage() {
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
      <section style={{ textAlign: 'center', padding: '88px 24px 64px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 16px', borderRadius: '100px', fontSize: '12px',
          fontWeight: 500, color: '#a78bfa',
          border: '1px solid rgba(99,102,241,0.25)',
          background: 'rgba(99,102,241,0.06)',
          marginBottom: '28px',
        }}>
          Honest comparison · No sponsored claims
        </div>

        <h1 style={{
          fontSize: 'clamp(30px, 5.5vw, 56px)',
          fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em',
          marginBottom: '24px', color: '#f0f0f0',
        }}>
          CommitCraft AI vs GitHub Copilot:<br />
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 40%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Which Is Better for Commit Messages?</span>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#888', marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Both are AI tools that live in VS Code. But they solve very different problems. This is an honest breakdown — including where Copilot wins and where CommitCraft excels.
        </p>

        {/* Hero comparison badges */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '10px', padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              fontSize: 14, flexShrink: 0,
            }}>✦</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0f0' }}>CommitCraft AI</div>
              <div style={{ fontSize: '11px', color: '#888' }}>Specialized · Git workflow focus</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', color: '#444', fontSize: '20px', fontWeight: 300 }}>vs</div>

          <div style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: '#24292e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
              🤖
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0f0' }}>GitHub Copilot</div>
              <div style={{ fontSize: '11px', color: '#888' }}>General-purpose · Code-first AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ maxWidth: '760px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{
          background: '#111111', border: '1px solid #1e1e1e',
          borderRadius: '12px', padding: '28px 32px',
        }}>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.85, margin: 0 }}>
            GitHub Copilot is a general-purpose AI coding assistant. It helps you write code faster through autocomplete, explains existing code, and offers an AI chat interface. It wasn&apos;t built specifically for git commit messages — that&apos;s a side feature, not the main event.
          </p>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.85, marginTop: '16px', marginBottom: 0 }}>
            CommitCraft AI is a single-purpose tool. It reads your staged git diff and generates a conventional commit message, PR description, or changelog entry. That&apos;s the entire product. No code completion, no chat, no code explanation — just excellent commit messages from your actual diff.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ maxWidth: '900px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Feature Comparison
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '32px' }}>
          Head-to-head on the features that matter for git workflow. Ratings are honest — we note where each tool wins.
        </p>

        <div style={{ background: '#111111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: '#161616', borderBottom: '1px solid #1e1e1e',
            padding: '16px 20px',
          }}>
            <span style={{ fontSize: '11px', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Feature</span>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
              CommitCraft AI
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#555' }} />
              GitHub Copilot
            </span>
          </div>

          {tableRows.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '14px 20px',
                borderBottom: i < tableRows.length - 1 ? '1px solid #161616' : 'none',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '13px', color: '#aaa', paddingRight: '16px' }}>{row.feature}</span>

              <span style={{ fontSize: '13px', color: row.commitcraft.positive === true ? '#86efac' : row.commitcraft.positive === false ? '#6b7280' : '#f0f0f0', paddingRight: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {row.commitcraft.positive === true && <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>}
                {row.commitcraft.positive === false && <span style={{ color: '#4b5563', flexShrink: 0 }}>✗</span>}
                {row.commitcraft.positive === null && <span style={{ color: '#f59e0b', flexShrink: 0 }}>~</span>}
                {row.commitcraft.value}
              </span>

              <span style={{ fontSize: '13px', color: row.copilot.positive === true ? '#86efac' : row.copilot.positive === false ? '#6b7280' : '#f0f0f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {row.copilot.positive === true && <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>}
                {row.copilot.positive === false && <span style={{ color: '#4b5563', flexShrink: 0 }}>✗</span>}
                {row.copilot.positive === null && <span style={{ color: '#f59e0b', flexShrink: 0 }}>~</span>}
                {row.copilot.value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { symbol: '✓', color: '#22c55e', label: 'Full support or clear advantage' },
            { symbol: '~', color: '#f59e0b', label: 'Partial or limited support' },
            { symbol: '✗', color: '#4b5563', label: 'Not supported' },
          ].map((l) => (
            <div key={l.symbol} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: l.color, fontSize: '13px' }}>{l.symbol}</span>
              <span style={{ color: '#555', fontSize: '12px' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO USE COMMITCRAFT */}
      <section style={{ maxWidth: '840px', margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          When CommitCraft AI Is the Right Choice
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '28px' }}>
          Choose CommitCraft when git workflow quality is the problem you want to solve.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {useCasesCommitcraft.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '10px', padding: '16px 20px',
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}
            >
              <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '1px', fontSize: '15px' }}>✓</span>
              <span style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.7 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO USE COPILOT */}
      <section style={{ maxWidth: '840px', margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          When GitHub Copilot Is the Right Choice
        </h2>
        <p style={{ color: '#888', fontSize: '15px', marginBottom: '28px' }}>
          Copilot wins when you need a broad AI assistant for the act of writing code itself.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {useCasesCopilot.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#111111', border: '1px solid #1e1e1e',
                borderRadius: '10px', padding: '16px 20px',
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}
            >
              <span style={{ color: '#818cf8', flexShrink: 0, marginTop: '1px', fontSize: '15px' }}>→</span>
              <span style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.7 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HONEST RECOMMENDATION */}
      <section style={{ maxWidth: '760px', margin: '0 auto 96px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '28px' }}>
          The Honest Recommendation
        </h2>

        <div style={{
          background: 'linear-gradient(145deg, #0f0f1f 0%, #0d0d1a 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '16px', padding: '36px',
        }}>
          <p style={{ color: '#ccc', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
            <strong style={{ color: '#f0f0f0' }}>They&apos;re not competitors.</strong> GitHub Copilot helps you write code. CommitCraft AI helps you document what you wrote. Most developers who use CommitCraft also use Copilot — they serve completely different moments in the development workflow.
          </p>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.85, marginBottom: '20px' }}>
            If you already pay for Copilot and want better commit messages, CommitCraft&apos;s free tier (5 generations/month) is worth installing alongside it. The $4.99/month Pro plan is about half the cost of Copilot for what it does — and it does its one job significantly better than Copilot&apos;s commit suggestion feature.
          </p>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.85, marginBottom: 0 }}>
            If you can&apos;t afford both and need to pick one: choose CommitCraft if git history and documentation quality matter to your team. Choose Copilot if you want AI assistance while actively writing code.
          </p>
        </div>

        {/* Quick verdict cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
          <div style={{
            background: '#111111', border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '10px', padding: '20px',
          }}>
            <div style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              CommitCraft wins at
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Commit message quality', 'PR description generation', 'Changelog automation', 'Conventional commit enforcement', 'Price-to-value ratio'].map(item => (
                <li key={item} style={{ fontSize: '13px', color: '#888', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#111111', border: '1px solid #1e1e1e',
            borderRadius: '10px', padding: '20px',
          }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Copilot wins at
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Real-time code completion', 'AI chat / explain code', 'Cross-IDE support', 'Enterprise integrations', 'Active code generation'].map(item => (
                <li key={item} style={{ fontSize: '13px', color: '#888', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#818cf8', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
          5 free generations/month · No credit card
        </div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Try CommitCraft free alongside Copilot
        </h2>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', maxWidth: '440px', margin: '0 auto 32px' }}>
          Install takes 30 seconds. The free tier covers most individual developers. Upgrade to Pro for unlimited generations at $4.99/month.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#6366f1', color: 'white',
              padding: '14px 28px', borderRadius: '10px',
              fontSize: '15px', fontWeight: 700,
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Install Free — VS Code Marketplace →
          </a>
          <a
            href={UPGRADE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent', color: '#a78bfa',
              padding: '14px 28px', borderRadius: '10px',
              fontSize: '15px', fontWeight: 600,
              display: 'inline-block',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          >
            See Pro pricing →
          </a>
        </div>
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/how-it-works" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            How it works →
          </Link>
          <Link href="/conventional-commits" style={{ color: '#6366f1', fontSize: '14px', fontWeight: 500 }}>
            Conventional Commits guide →
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
        <Link href="/how-it-works" style={{ color: '#555', fontSize: '13px' }}>How it works</Link>
        <span style={{ color: '#2a2a2a' }}>·</span>
        <a href="mailto:mohammad1820@icloud.com" style={{ color: '#555', fontSize: '13px' }}>Support</a>
      </footer>

    </main>
  )
}
