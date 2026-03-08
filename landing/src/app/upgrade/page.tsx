'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UpgradePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpgrade(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json() as { checkoutUrl?: string; message?: string }
      if (!res.ok) throw new Error(data.message ?? 'Failed to create checkout')
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        <Link href="/" style={{ color: '#666', fontSize: '14px', display: 'block', marginBottom: '32px' }}>← Back to home</Link>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Upgrade to Pro</h1>
        <p style={{ color: '#999', marginBottom: '32px' }}>Unlimited AI commit messages for $4.99/month</p>

        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          {['Unlimited commit message generations', 'PR description generator', 'Changelog entry generator', 'All commit styles (conventional, gitmoji, simple)', 'Cancel anytime'].map(f => (
            <div key={f} style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#ccc' }}>
              <span style={{ color: '#86efac', flexShrink: 0 }}>✓</span> {f}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #222', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#999', fontSize: '14px' }}>Monthly</span>
            <span style={{ fontWeight: 700, fontSize: '20px' }}>$4.99/mo</span>
          </div>
        </div>

        <form onSubmit={handleUpgrade}>
          <label style={{ display: 'block', fontSize: '14px', color: '#999', marginBottom: '8px' }}>
            Your email (same one you used to install the extension)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{
              width: '100%', padding: '12px 16px', background: '#111', border: '1px solid #333',
              borderRadius: '8px', color: '#e5e5e5', fontSize: '16px', outline: 'none',
              marginBottom: '16px', fontFamily: 'inherit'
            }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', background: loading ? '#4338ca' : '#6366f1',
              color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px',
              fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit'
            }}
          >
            {loading ? 'Redirecting to checkout...' : 'Continue to Payment →'}
          </button>
        </form>
        <p style={{ marginTop: '16px', color: '#555', fontSize: '12px', textAlign: 'center' }}>
          Secure checkout powered by Dodo Payments · Cancel anytime
        </p>
      </div>
    </main>
  )
}
