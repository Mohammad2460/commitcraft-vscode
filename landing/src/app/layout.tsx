import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://commitcraft-landing.vercel.app'),
  title: {
    default: 'CommitCraft AI — AI Git Commit Message Generator for VS Code',
    template: '%s | CommitCraft AI',
  },
  description: 'Generate perfect git commit messages, PR descriptions & changelogs instantly from your code diff. VS Code extension powered by Claude AI. Free tier: 5 generations/month.',
  keywords: ['git commit message generator', 'ai commit message', 'conventional commits generator', 'vscode extension', 'git commit ai', 'commit message generator', 'pr description generator'],
  authors: [{ name: 'CommitCraft AI' }],
  creator: 'CommitCraft AI',
  openGraph: {
    title: 'CommitCraft AI — AI Git Commit Message Generator for VS Code',
    description: 'Generate perfect git commit messages from your diff in one click. Free tier available.',
    url: 'https://commitcraft-landing.vercel.app',
    siteName: 'CommitCraft AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommitCraft AI — AI Git Commit Message Generator',
    description: 'Generate perfect git commit messages from your diff in one click.',
    creator: '@commitcraftai',
  },
  alternates: {
    canonical: 'https://commitcraft-landing.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'CommitCraft AI',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Visual Studio Code',
      offers: [
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          name: 'Free',
          description: '5 generations per month',
        },
        {
          '@type': 'Offer',
          price: '4.99',
          priceCurrency: 'USD',
          name: 'Pro',
          description: 'Unlimited generations',
        },
      ],
      url: 'https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai',
      description: 'AI-powered git commit message generator for VS Code. Generates conventional commits, PR descriptions & changelogs from your code diff.',
      screenshot: 'https://commitcraft-landing.vercel.app/opengraph-image',
      featureList: ['Conventional Commits', 'GitMoji', 'PR Descriptions', 'Changelog Entries'],
    },
    {
      '@type': 'Organization',
      name: 'CommitCraft AI',
      url: 'https://commitcraft-landing.vercel.app',
      logo: 'https://commitcraft-landing.vercel.app/opengraph-image',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'mohammad1820@icloud.com',
        contactType: 'customer support',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #f0f0f0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          a { color: inherit; text-decoration: none; }
          button { font-family: inherit; }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.1); }
            50% { box-shadow: 0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2); }
          }
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-8px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes terminalLine1 {
            0%, 100% { opacity: 0; }
            5%, 30% { opacity: 1; }
          }
          @keyframes terminalLine2 {
            0%, 15% { opacity: 0; }
            20%, 50% { opacity: 1; }
            55%, 100% { opacity: 0; }
          }
          @keyframes terminalLine3 {
            0%, 30% { opacity: 0; }
            35%, 65% { opacity: 1; }
            70%, 100% { opacity: 0; }
          }
          @keyframes terminalLine4 {
            0%, 50% { opacity: 0; }
            55%, 85% { opacity: 1; }
            90%, 100% { opacity: 0; }
          }
          @keyframes terminalCursor {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .hero-animate-1 { animation: fadeInUp 0.7s ease forwards; animation-delay: 0.1s; opacity: 0; }
          .hero-animate-2 { animation: fadeInUp 0.7s ease forwards; animation-delay: 0.2s; opacity: 0; }
          .hero-animate-3 { animation: fadeInUp 0.7s ease forwards; animation-delay: 0.35s; opacity: 0; }
          .hero-animate-4 { animation: fadeInUp 0.7s ease forwards; animation-delay: 0.5s; opacity: 0; }
          .hero-animate-5 { animation: fadeInUp 0.7s ease forwards; animation-delay: 0.65s; opacity: 0; }

          .feature-card {
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .feature-card:hover {
            transform: translateY(-4px) scale(1.01);
            border-color: rgba(99,102,241,0.4) !important;
            box-shadow: 0 0 0 1px rgba(99,102,241,0.15), 0 12px 40px rgba(0,0,0,0.4);
          }

          .btn-primary {
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          }
          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(99,102,241,0.4);
            background: #4f46e5 !important;
          }
          .btn-primary:active { transform: translateY(0); }

          .btn-secondary {
            transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
          }
          .btn-secondary:hover {
            border-color: #555 !important;
            color: #fff !important;
            background: rgba(255,255,255,0.04) !important;
          }

          .nav-link {
            transition: color 0.15s ease;
          }
          .nav-link:hover { color: #f0f0f0 !important; }

          .pro-card {
            animation: pulse-glow 3s ease-in-out infinite;
          }

          .badge-shimmer {
            background: linear-gradient(90deg, #1a1a2e 0%, #2d2d5e 40%, #1a1a2e 60%, #1a1a2e 100%);
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }

          .gradient-text {
            background: linear-gradient(135deg, #a78bfa 0%, #6366f1 40%, #818cf8 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 4s ease infinite;
          }

          .faq-item input[type="checkbox"] { display: none; }
          .faq-item input[type="checkbox"]:checked + label .faq-chevron {
            transform: rotate(180deg);
          }
          .faq-item input[type="checkbox"]:checked ~ .faq-answer {
            max-height: 200px;
            padding-top: 12px;
            opacity: 1;
          }
          .faq-chevron { transition: transform 0.25s ease; }
          .faq-answer {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.35s ease, padding-top 0.25s ease, opacity 0.25s ease;
          }

          .terminal-line-1 { animation: terminalLine1 8s ease-in-out infinite; opacity: 0; }
          .terminal-line-2 { animation: terminalLine2 8s ease-in-out infinite; opacity: 0; }
          .terminal-line-3 { animation: terminalLine3 8s ease-in-out infinite; opacity: 0; }
          .terminal-line-4 { animation: terminalLine4 8s ease-in-out infinite; opacity: 0; }
          .terminal-cursor { animation: terminalCursor 1s step-end infinite; }

          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            .hero-btns { flex-direction: column !important; align-items: stretch !important; }
            .hero-btns a { text-align: center !important; }
            .pricing-grid { grid-template-columns: 1fr !important; }
            .features-grid { grid-template-columns: 1fr !important; }
            .stats-grid { gap: 24px !important; flex-wrap: wrap !important; }
          }
        `}</style>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
