import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface GenerateRequest {
  diff: string
  style: 'conventional' | 'gitmoji' | 'simple'
  branchName: string
  type: 'commit' | 'pr' | 'changelog'
}

interface GenerateResponse {
  title: string
  body: string
  bullets: string[]
  generationsRemaining: number
}

function buildPrompt(params: GenerateRequest): string {
  const { diff, style, branchName, type } = params
  const styleInstructions = {
    conventional: 'Conventional Commits format: type(scope): description\nCommon types: feat, fix, docs, style, refactor, test, chore',
    gitmoji: 'GitMoji format: start with an emoji that represents the change type, then a short description',
    simple: 'Simple format: just a clear, concise description of what changed'
  }

  if (type === 'commit') {
    return `You are an expert developer. Generate a git commit message for this diff.

Branch name: ${branchName}
Style: ${styleInstructions[style]}

Git diff:
\`\`\`
${diff.slice(0, 8000)}
\`\`\`

Respond with ONLY this JSON (no markdown fences, no explanation):
{"title": "the commit title (max 72 chars)", "bullets": ["specific change 1", "specific change 2", "specific change 3"]}

Rules:
- Title must be under 72 characters
- 2-4 bullet points describing specific changes
- Be specific, not generic ("add login button" not "update UI")
- Use present tense ("add" not "added")
- For conventional commits: choose the right type (feat for new feature, fix for bug fix, etc.)`
  }

  if (type === 'pr') {
    return `You are an expert developer. Generate a Pull Request description for these changes.

Branch name: ${branchName}
Git diff:
\`\`\`
${diff.slice(0, 8000)}
\`\`\`

Respond with ONLY this JSON (no markdown fences):
{
  "title": "PR title (max 72 chars)",
  "bullets": [
    "## Summary",
    "Brief 1-2 sentence summary",
    "## Changes",
    "• specific change 1",
    "• specific change 2",
    "## Testing",
    "How to test this PR"
  ]
}`
  }

  if (type === 'changelog') {
    return `Generate a changelog entry for these changes.

Git diff:
\`\`\`
${diff.slice(0, 8000)}
\`\`\`

Respond with ONLY this JSON (no markdown fences):
{"title": "Version X.X.X - Brief description", "bullets": ["Added: feature 1", "Fixed: bug 1", "Changed: something"]}`
  }

  return ''
}

function parseClaudeResponse(text: string): { title: string; bullets: string[] } {
  try {
    const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/\s*```$/i, '')
    const json = JSON.parse(cleaned)
    return {
      title: json.title || 'chore: update code',
      bullets: Array.isArray(json.bullets) ? json.bullets : []
    }
  } catch {
    const lines = text.trim().split('\n')
    return {
      title: lines[0]?.replace(/^["']|["']$/g, '') || 'chore: update code',
      bullets: lines.slice(1).filter(l => l.trim()).map(l => l.replace(/^[-•*]\s*/, ''))
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // For now (Task 1), no auth — we'll add it in Task 2
    // Just validate input and call Claude

    const body = await req.json() as GenerateRequest

    // Validate required fields
    if (!body.diff || typeof body.diff !== 'string') {
      return NextResponse.json({ message: 'diff is required' }, { status: 400 })
    }
    if (!['conventional', 'gitmoji', 'simple'].includes(body.style)) {
      return NextResponse.json({ message: 'invalid style' }, { status: 400 })
    }
    if (!['commit', 'pr', 'changelog'].includes(body.type)) {
      return NextResponse.json({ message: 'invalid type' }, { status: 400 })
    }

    // Limit diff size
    if (body.diff.length > 50000) {
      return NextResponse.json({ message: 'diff too large (max 50KB)' }, { status: 400 })
    }

    // Empty diff check
    if (body.diff.trim() === '') {
      return NextResponse.json({ message: 'diff is empty' }, { status: 400 })
    }

    const prompt = buildPrompt(body)

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }]
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    const parsed = parseClaudeResponse(responseText)

    const response: GenerateResponse = {
      title: parsed.title,
      body: parsed.bullets.join('\n'),
      bullets: parsed.bullets,
      generationsRemaining: -1 // Will be real value after auth is added in Task 2
    }

    return NextResponse.json(response)

  } catch (error: unknown) {
    console.error('[generate] Error:', error)
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json({ message: 'AI service configuration error' }, { status: 500 })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
