import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CommitCraft AI — AI Git Commit Message Generator for VS Code'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Logo badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}>✦</div>
        <span style={{ color: '#f0f0f0', fontSize: 28, fontWeight: 700 }}>CommitCraft AI</span>
      </div>

      {/* Main headline */}
      <div style={{
        color: '#f0f0f0',
        fontSize: 60,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.1,
        marginBottom: 24,
        letterSpacing: '-1px',
      }}>
        AI Git Commit Message
        <br />
        <span style={{ color: '#6366f1' }}>Generator</span> for VS Code
      </div>

      {/* Subtext */}
      <div style={{
        color: '#888',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40,
      }}>
        Generate conventional commits in one click · Free tier available
      </div>

      {/* Stats pills */}
      <div style={{ display: 'flex', gap: 16 }}>
        {['Claude AI Powered', 'Free: 20/month', 'Pro: $4.99/mo'].map(stat => (
          <div key={stat} style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: 100,
            padding: '8px 20px',
            color: '#ccc',
            fontSize: 16,
          }}>{stat}</div>
        ))}
      </div>
    </div>
  )
}
