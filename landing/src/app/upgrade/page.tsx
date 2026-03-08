'use client'

import Link from 'next/link'

const GUMROAD_URL = 'https://serenitymind3.gumroad.com/l/opqpxp'

const PRO_FEATURES = [
  { icon: '∞', label: 'Unlimited commit message generations' },
  { icon: '📋', label: 'PR description generator' },
  { icon: '📝', label: 'Changelog entry generator' },
  { icon: '🎨', label: 'All commit styles — conventional, gitmoji, simple' },
]

export default function UpgradePage() {
  function handleUpgrade() {
    window.location.href = GUMROAD_URL
  }

  return (
    <main style={{
      minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 24px',
    }}>
      <style>{`
        .upgrade-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none; }
        .upgrade-btn { transition: transform 0.15s, box-shadow 0.15s, background 0.15s; }
        .upgrade-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.4); background: #4f46e5 !important; }
        .upgrade-btn:active:not(:disabled) { transform: translateY(0); }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.3),0 0 40px rgba(99,102,241,0.1)} 50%{box-shadow:0 0 30px rgba(99,102,241,0.5),0 0 60px rgba(99,102,241,0.2)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .page-animate { animation: fadeInUp 0.5s ease forwards; }
      `}</style>

      <div className="page-animate" style={{ maxWidth: '460px', width: '100%' }}>

        {/* Back link */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#555', fontSize: '13px', marginBottom: '36px',
          transition: 'color 0.15s',
        }}>
          ← Back to home
        </Link>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            fontSize: 16, flexShrink: 0,
          }}>✦</span>
          <span style={{ fontWeight: 700, fontSize: '16px' }}>CommitCraft AI</span>
        </div>

        <h1 style={{ fontSize: '30px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Upgrade to Pro
        </h1>
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}>
          Unlimited AI commit messages for $4.99/month
        </p>

        {/* Feature list */}
        <div style={{
          background: '#111111', border: '1px solid #1e1e1e',
          borderRadius: '14px', padding: '24px', marginBottom: '28px',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}>
          <div style={{ marginBottom: '20px' }}>
            {PRO_FEATURES.map(f => (
              <div key={f.label} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                marginBottom: '13px', fontSize: '14px', color: '#ccc',
              }}>
                <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '1px', fontWeight: 700 }}>✓</span>
                {f.label}
              </div>
            ))}
            <div style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              fontSize: '14px', color: '#ccc',
            }}>
              <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '1px', fontWeight: 700 }}>✓</span>
              Cancel anytime · No questions asked
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #1e1e1e', paddingTop: '16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: '#888', fontSize: '13px' }}>Monthly plan</div>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>
                or $39.99/year (save 33%)
              </div>
            </div>
            <div style={{ fontWeight: 900, fontSize: '24px', letterSpacing: '-0.02em' }}>$4.99<span style={{ color: '#555', fontSize: '13px', fontWeight: 400 }}>/mo</span></div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleUpgrade}
          className="upgrade-btn"
          style={{
            width: '100%', padding: '16px',
            background: '#6366f1', color: 'white', border: 'none',
            borderRadius: '9px', fontSize: '16px',
            fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Upgrade to Pro — $4.99/month →
        </button>

        <p style={{ marginTop: '16px', color: '#444', fontSize: '12px', textAlign: 'center', lineHeight: 1.6 }}>
          7-day free trial · Cancel anytime · Secure checkout
        </p>
      </div>
    </main>
  )
}
