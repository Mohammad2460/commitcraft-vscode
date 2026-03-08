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
  const [upgraded, setUpgraded] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('upgraded') === 'true') {
      setUpgraded(true)
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
        headers: { Authorization: `Bearer ${apiKey}` },
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

  const resetDate = data
    ? new Date(data.resetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : ''

  const usagePercent = data ? Math.min((data.used / data.limit) * 100, 100) : 0
  const isNearLimit = data ? data.used / data.limit > 0.8 : false

  return (
    <main style={{
      minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0',
      padding: '40px 24px',
    }}>
      <style>{`
        .dash-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none; }
        .dash-btn { transition: transform 0.15s, background 0.15s; }
        .dash-btn:hover:not(:disabled) { transform: translateY(-1px); background: #4f46e5 !important; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fillBar { from { width: 0%; } to { width: var(--target-width); } }
        .page-animate { animation: fadeInUp 0.5s ease forwards; }
        .usage-bar-fill { animation: fillBar 1s ease forwards 0.3s; width: 0%; }
        .upgrade-cta { transition: transform 0.15s, box-shadow 0.15s; }
        .upgrade-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.35); }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 35px rgba(99,102,241,0.4)} }
      `}</style>

      <div className="page-animate" style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Back link */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#555', fontSize: '13px', marginBottom: '36px',
        }}>
          ← Back to home
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            fontSize: 16, flexShrink: 0,
          }}>✦</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>My Dashboard</h1>
        </div>
        <p style={{ color: '#888', marginBottom: '36px', fontSize: '14px' }}>
          Check your usage and manage your subscription.
        </p>

        {/* Upgrade success banner */}
        {upgraded && !data && (
          <div style={{
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '10px', padding: '14px 18px', marginBottom: '24px',
            display: 'flex', gap: '10px', alignItems: 'center',
            fontSize: '14px', color: '#86efac',
          }}>
            <span style={{ fontSize: '18px' }}>🎉</span>
            Welcome to Pro! Enter your API key below to confirm your upgrade.
          </div>
        )}

        {!data ? (
          /* ── API Key form ── */
          <div>
            <div style={{
              background: '#111111', border: '1px solid #1a1a1a',
              borderRadius: '14px', padding: '28px', marginBottom: '24px',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Enter your API key</h2>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
                Find it in VS Code: CommitCraft AI panel → Settings → API Key
              </p>

              <form onSubmit={handleCheck}>
                <input
                  type="text"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="cc_live_..."
                  className="dash-input"
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: '#0d0d0d', border: '1px solid #2a2a2a',
                    borderRadius: '8px', color: '#f0f0f0',
                    fontSize: '14px', fontFamily: '"SF Mono", "Fira Code", monospace',
                    marginBottom: '14px',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                />

                {error && (
                  <div style={{
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    borderRadius: '8px', padding: '10px 14px',
                    color: '#f87171', fontSize: '13px', marginBottom: '14px',
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="dash-btn"
                  style={{
                    padding: '11px 24px',
                    background: loading ? '#4338ca' : '#6366f1',
                    color: 'white', border: 'none',
                    borderRadius: '8px', fontSize: '14px',
                    fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {loading ? 'Loading...' : 'View Dashboard'}
                </button>
              </form>
            </div>

            <p style={{ color: '#444', fontSize: '13px', textAlign: 'center' }}>
              Don&apos;t have an account yet?{' '}
              <a
                href="https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#6366f1' }}
              >
                Install the extension for free →
              </a>
            </p>
          </div>

        ) : (
          /* ── Dashboard view ── */
          <div>
            {/* Account card */}
            <div style={{
              background: '#111111', border: '1px solid #1a1a1a',
              borderRadius: '14px', padding: '28px', marginBottom: '20px',
              ...(data.tier === 'pro' ? { animation: 'pulse-glow 3s ease-in-out infinite' } : {}),
            }}>
              {/* Account header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>{data.email}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: data.tier === 'pro' ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.04)',
                    color: data.tier === 'pro' ? '#a78bfa' : '#888',
                    padding: '3px 10px', borderRadius: '100px',
                    fontSize: '12px', fontWeight: 600,
                    border: `1px solid ${data.tier === 'pro' ? 'rgba(99,102,241,0.25)' : '#2a2a2a'}`,
                  }}>
                    {data.tier === 'pro' ? '✦ Pro' : 'Free'}
                  </div>
                </div>
                {data.tier === 'pro' && (
                  <span style={{ fontSize: '28px' }}>🎉</span>
                )}
              </div>

              {/* Usage section */}
              {data.tier === 'free' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: '#888', fontSize: '13px' }}>Generations used this month</span>
                    <span style={{
                      fontWeight: 700, fontSize: '14px',
                      color: isNearLimit ? '#f87171' : '#f0f0f0',
                    }}>
                      {data.used} / {data.limit}
                    </span>
                  </div>

                  {/* Usage bar */}
                  <div style={{ height: '6px', background: '#1e1e1e', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div
                      className="usage-bar-fill"
                      style={{
                        height: '100%', borderRadius: '3px',
                        background: isNearLimit
                          ? 'linear-gradient(90deg, #f87171, #ef4444)'
                          : 'linear-gradient(90deg, #6366f1, #818cf8)',
                        // @ts-expect-error CSS custom property
                        '--target-width': `${usagePercent}%`,
                      }}
                    />
                  </div>

                  <div style={{ fontSize: '12px', color: '#555' }}>
                    Resets on {resetDate}
                    {isNearLimit && (
                      <span style={{ color: '#f87171', marginLeft: '8px' }}>
                        · Running low
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '14px' }}>
                  <span style={{ fontWeight: 700 }}>✓</span>
                  Unlimited generations · Pro plan active
                </div>
              )}
            </div>

            {/* Upgrade CTA for free users */}
            {data.tier === 'free' && (
              <Link
                href="/upgrade"
                className="upgrade-cta"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                  color: 'white', padding: '16px 20px',
                  borderRadius: '12px', fontWeight: 700, fontSize: '14px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                }}
              >
                <div>
                  <div style={{ marginBottom: '2px' }}>Upgrade to Pro — $4.99/mo</div>
                  <div style={{ fontWeight: 400, fontSize: '12px', opacity: 0.8 }}>Unlimited generations · Cancel anytime</div>
                </div>
                <span style={{ fontSize: '18px' }}>→</span>
              </Link>
            )}

            {/* Back button */}
            <button
              onClick={() => { setData(null); setApiKey(''); setError('') }}
              style={{
                background: 'none', border: 'none',
                color: '#555', cursor: 'pointer',
                fontSize: '13px', padding: '8px 0',
                fontFamily: 'inherit',
              }}
            >
              ← Check a different key
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
