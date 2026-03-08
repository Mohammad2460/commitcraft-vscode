import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', borderBottom: '1px solid #1a1a1a',
        position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 100
      }}>
        <span style={{ fontWeight: 700, fontSize: '18px' }}>
          ✨ CommitCraft AI
        </span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#999', fontSize: '14px' }}>Features</a>
          <a href="#pricing" style={{ color: '#999', fontSize: '14px' }}>Pricing</a>
          <Link href="/dashboard" style={{ color: '#999', fontSize: '14px' }}>Dashboard</Link>
          <a
            href="vscode:extension/CommitCraftAI.commitcraft-ai"
            style={{
              background: '#6366f1', color: 'white', padding: '8px 16px',
              borderRadius: '6px', fontSize: '14px', fontWeight: 500
            }}
          >
            Install Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 40px 80px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', background: '#1a1a2e', color: '#6366f1',
          padding: '6px 16px', borderRadius: '100px', fontSize: '13px',
          marginBottom: '24px', border: '1px solid #2d2d5e'
        }}>
          🚀 Powered by Claude AI · 20 free generations/month
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          Stop writing<br />
          <span style={{ color: '#6366f1' }}>commit messages</span><br />
          by hand
        </h1>
        <p style={{ fontSize: '20px', color: '#999', marginBottom: '40px', lineHeight: 1.6 }}>
          CommitCraft AI reads your git diff and generates perfect conventional commit messages,
          PR descriptions, and changelog entries — in one click.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="vscode:extension/CommitCraftAI.commitcraft-ai"
            style={{
              background: '#6366f1', color: 'white', padding: '14px 28px',
              borderRadius: '8px', fontSize: '16px', fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}
          >
            Install for VS Code — Free
          </a>
          <a href="#pricing" style={{
            background: 'transparent', color: '#e5e5e5', padding: '14px 28px',
            borderRadius: '8px', fontSize: '16px', border: '1px solid #333'
          }}>
            See Pricing →
          </a>
        </div>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#666' }}>
          20 free generations/month · No credit card required
        </p>
      </section>

      {/* Demo */}
      <section style={{ maxWidth: '800px', margin: '0 auto 80px', padding: '0 40px' }}>
        <div style={{
          background: '#111', border: '1px solid #222', borderRadius: '12px',
          overflow: 'hidden', fontFamily: 'monospace'
        }}>
          <div style={{ background: '#1a1a1a', padding: '12px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}/>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }}/>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }}/>
            <span style={{ marginLeft: '12px', color: '#666', fontSize: '12px' }}>CommitCraft AI</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>Generated from your staged diff:</div>
            <div style={{ color: '#a78bfa', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              feat(auth): add Google OAuth2 login with session persistence
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>Changes:</div>
            <div style={{ color: '#86efac', fontSize: '14px', lineHeight: 2 }}>
              • Implement Google OAuth2 flow using passport.js<br/>
              • Add refresh token rotation for security<br/>
              • Persist user sessions in Redis with 7-day TTL<br/>
              • Update .env.example with required OAuth variables
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <div style={{
                background: '#6366f1', color: 'white', padding: '8px 20px',
                borderRadius: '6px', fontSize: '13px', cursor: 'pointer'
              }}>Accept & Commit</div>
              <div style={{
                background: '#1a1a1a', color: '#999', padding: '8px 20px',
                borderRadius: '6px', fontSize: '13px', cursor: 'pointer', border: '1px solid #333'
              }}>Regenerate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: '1000px', margin: '0 auto 100px', padding: '0 40px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 700, marginBottom: '60px' }}>
          Everything you need for better git history
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: '⚡', title: 'One-Click Generation', desc: 'Press Ctrl+Shift+G or click the button in Source Control — done. No copy-pasting, no switching windows.' },
            { icon: '🎯', title: 'Conventional Commits', desc: 'Automatically generates feat:, fix:, chore:, docs: — proper types with scope and description every time.' },
            { icon: '📋', title: 'PR Descriptions', desc: 'Generate complete pull request descriptions with summary, changes list, and testing instructions from your diff.' },
            { icon: '📝', title: 'Changelog Entries', desc: 'Keep your CHANGELOG.md up to date automatically. Generate formatted entries for every release.' },
            { icon: '🎨', title: 'Theme Aware', desc: 'The panel matches your VS Code theme perfectly — dark, light, or any custom theme you use.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Only your git diff is sent for analysis. No source code stored, no logging of your changes.' },
          ].map(f => (
            <div key={f.title} style={{
              background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px',
              padding: '28px', transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: '700px', margin: '0 auto 100px', padding: '0 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>Simple pricing</h2>
        <p style={{ color: '#999', marginBottom: '48px' }}>Start free. Upgrade when you love it.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Free */}
          <div style={{
            background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '32px', textAlign: 'left'
          }}>
            <div style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>Free</div>
            <div style={{ fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>$0</div>
            <div style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>forever</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {['20 generations/month', 'All 3 generation types', 'All commit styles', 'VS Code integration'].map(f => (
                <li key={f} style={{ fontSize: '14px', color: '#ccc', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#86efac' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="vscode:extension/CommitCraftAI.commitcraft-ai" style={{
              display: 'block', textAlign: 'center', background: '#1a1a1a',
              color: '#e5e5e5', padding: '12px', borderRadius: '8px',
              border: '1px solid #333', fontSize: '14px', fontWeight: 500
            }}>
              Install Free
            </a>
          </div>
          {/* Pro */}
          <div style={{
            background: '#0d0d1a', border: '2px solid #6366f1', borderRadius: '12px', padding: '32px',
            textAlign: 'left', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              background: '#6366f1', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600
            }}>MOST POPULAR</div>
            <div style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '8px' }}>Pro</div>
            <div style={{ fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>$4.99</div>
            <div style={{ color: '#666', fontSize: '14px', marginBottom: '28px' }}>per month</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {['Unlimited generations', 'All Free features', 'Priority support', 'Cancel anytime'].map(f => (
                <li key={f} style={{ fontSize: '14px', color: '#ccc', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#86efac' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/upgrade" style={{
              display: 'block', textAlign: 'center', background: '#6366f1',
              color: 'white', padding: '12px', borderRadius: '8px',
              fontSize: '14px', fontWeight: 600
            }}>
              Upgrade to Pro →
            </Link>
          </div>
        </div>
        <p style={{ marginTop: '24px', color: '#555', fontSize: '13px' }}>
          Annual plan: $39.99/year (save 33%) · Available on upgrade page
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto 100px', padding: '0 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>FAQ</h2>
        {[
          { q: 'Does it store my code?', a: 'No. Only the git diff is sent to our API for analysis. We do not store your code or diffs.' },
          { q: 'What languages/frameworks does it support?', a: 'Any language — it reads git diffs which are language-agnostic. Works with JavaScript, Python, Go, Rust, Java, and everything else.' },
          { q: 'What is Conventional Commits?', a: 'A standard format: type(scope): description. E.g. feat(auth): add OAuth login. Makes git history readable and enables automated changelogs.' },
          { q: 'Can I use my own Claude API key?', a: 'The hosted plan (what you get with the extension) uses our API key. Self-hosting with your own key is on our roadmap.' },
          { q: 'How do I cancel?', a: 'Email us or visit your dashboard. Cancellations take effect at the end of your billing period.' },
        ].map(item => (
          <div key={item.q} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '16px' }}>{item.q}</h3>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.7 }}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '80px 40px', background: '#0d0d1a',
        borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a'
      }}>
        <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>
          Save 5 minutes per commit.
        </h2>
        <p style={{ color: '#999', fontSize: '18px', marginBottom: '32px' }}>
          At 10 commits a day, that&apos;s 50 minutes back every day.
        </p>
        <a href="vscode:extension/CommitCraftAI.commitcraft-ai" style={{
          background: '#6366f1', color: 'white', padding: '16px 36px',
          borderRadius: '8px', fontSize: '18px', fontWeight: 700,
          display: 'inline-block'
        }}>
          Install Free — VS Code Marketplace
        </a>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '32px', color: '#555', fontSize: '13px' }}>
        <p>© 2026 CommitCraft AI · <Link href="/dashboard" style={{ color: '#666' }}>Dashboard</Link> · <a href="mailto:support@commitcraft.ai" style={{ color: '#666' }}>support@commitcraft.ai</a></p>
      </footer>
    </main>
  )
}
