import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CommitCraft AI — AI-Powered Git Commit Messages',
  description: 'Generate perfect git commit messages, PR descriptions & changelogs instantly from your code diff. VS Code extension powered by Claude AI. Free tier available.',
  keywords: 'git commit message generator, VS Code extension, AI commit, conventional commits, PR description generator',
  openGraph: {
    title: 'CommitCraft AI',
    description: 'Generate perfect git commit messages with one click',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; line-height: 1.6; }
          a { color: inherit; text-decoration: none; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
