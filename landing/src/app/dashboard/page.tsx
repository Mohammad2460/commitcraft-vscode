'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface UserDashboard {
  email: string
  tier: 'free' | 'pro'
  used: number
  limit: number
  resetDate: string
}

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState('')
  const [data, setData] = useState<UserDashboard | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check URL params for post-upgrade redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('upgraded') === 'true') {
      setError('')
      // Will show success when they check their key
    }
  }, [])

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    if (!apiKey.startsWith('cc_live_')) {
      setError('API key must start with cc_live_')
      return
    }
    setLoading(true)
    setError('')
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://commitcraft-backend.vercel.app'
      const res = await fetch(`${backendUrl}/api/auth/verify`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      })
      const json = await res.json() as UserDashboard & { valid?: boolean; message?: string }
      if (!res.ok || !json.valid) throw new Error(json.message ?? 'Invalid API key')
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const resetDate = data ? new Date(data.resetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''

  return (
    <main style={{ minHeight: '100vh', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#666', fontSize: '14px', display: 'block', marginBottom: '32px' }}>← Back to home</Link>
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>My Dashboard</h1>
      <p style={{ color: '#999', marginBottom: '32px' }}>Check your usage and manage your subscription.</p>

      {!data ? (
        <form onSubmit={handleCheck}>
          <label style={{ display: 'block', fontSize: '14px', color: '#999', marginBottom: '8px' }}>Enter your API key</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="cc_live_..."
            style={{
              width: '100%', padding: '12px', background: '#111', border: '1px solid #333',
              borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', marginBottom: '12px',
              fontFamily: 'monospace', outline: 'none'
            }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            padding: '10px 24px', background: '#6366f1', color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600
          }}>
            {loading ? 'Loading...' : 'View Dashboard'}
          </button>
        </form>
      ) : (
        <div>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{data.email}</div>
                <div style={{ display: 'inline-block', background: data.tier === 'pro' ? '#1a1a2e' : '#1a1a1a', color: data.tier === 'pro' ? '#a78bfa' : '#999', padding: '2px 12px', borderRadius: '100px', fontSize: '12px', border: `1px solid ${data.tier === 'pro' ? '#4c1d95' : '#333'}` }}>
                  {data.tier === 'pro' ? '✨ Pro' : 'Free'}
                </div>
              </div>
            </div>
            {data.tier === 'free' ? (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                    <span style={{ color: '#999' }}>Generations used</span>
                    <span style={{ fontWeight: 600 }}>{data.used} / {data.limit}</span>
                  </div>
                  <div style={{ height: '6px', background: '#222', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: data.used / data.limit > 0.8 ? '#f87171' : '#6366f1', borderRadius: '3px', width: `${(data.used / data.limit) * 100}%` }} />
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>Resets on {resetDate}</div>
              </>
            ) : (
              <div style={{ color: '#86efac', fontSize: '14px' }}>✓ Unlimited generations</div>
            )}
          </div>
          {data.tier === 'free' && (
            <Link href="/upgrade" style={{
              display: 'block', textAlign: 'center', background: '#6366f1', color: 'white',
              padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '14px'
            }}>
              Upgrade to Pro — $4.99/mo →
            </Link>
          )}
          <button onClick={() => { setData(null); setApiKey('') }} style={{
            marginTop: '16px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px'
          }}>
            ← Check a different key
          </button>
        </div>
      )}
    </main>
  )
}
