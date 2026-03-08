import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, checkQuota, logUsage } from '@/lib/auth'

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

interface OpenAIErrorResponse {
  error?: {
    message?: string
    code?: string
  }
}

interface OpenAIChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | null
    }
  }>
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    total_tokens?: number
  }
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

  throw new Error(`Unhandled type: ${type}`)
}

function parseModelResponse(text: string): { title: string; bullets: string[] } {
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

async function generateWithOpenAI(prompt: string, type: GenerateRequest['type']) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('Missing OpenAI API key')
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: type === 'commit' ? 512 : 1024,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You generate git commit messages, PR descriptions, and changelog entries. Return valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  if (!response.ok) {
    let errorData: OpenAIErrorResponse = {}
    try {
      errorData = await response.json() as OpenAIErrorResponse
    } catch {
      // Ignore parse failures and fall back to the HTTP status.
    }

    throw {
      status: response.status,
      message: errorData.error?.message ?? `OpenAI request failed with status ${response.status}`,
      code: errorData.error?.code
    }
  }

  const data = await response.json() as OpenAIChatCompletionResponse
  const text = data.choices?.[0]?.message?.content ?? ''
  const totalTokens = data.usage?.total_tokens
    ?? ((data.usage?.prompt_tokens ?? 0) + (data.usage?.completion_tokens ?? 0))

  return { text, totalTokens }
}

export async function POST(req: NextRequest) {
  try {
    // Validate API key
    const auth = await validateApiKey(req)
    if (!auth.success) {
      return NextResponse.json({ message: auth.message }, { status: auth.status })
    }

    // Check quota
    const quota = await checkQuota(auth.userId, auth.tier)
    if (!quota.allowed) {
      return NextResponse.json({
        message: 'Monthly generation limit reached. Upgrade to Pro for unlimited generations.',
        code: 'quota_exceeded',
        used: quota.used,
        limit: quota.limit
      }, { status: 402 })
    }

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

    if (!body.branchName || typeof body.branchName !== 'string') {
      return NextResponse.json({ message: 'branchName is required' }, { status: 400 })
    }
    if (body.branchName.length > 255) {
      return NextResponse.json({ message: 'branchName too long' }, { status: 400 })
    }
    // Sanitize branch name for prompt injection - remove backticks and newlines
    body.branchName = body.branchName.replace(/[`\n\r]/g, '').slice(0, 255)

    // Limit diff size
    if (body.diff.length > 50000) {
      return NextResponse.json({ message: 'diff too large (max 50KB)' }, { status: 400 })
    }

    // Empty diff check
    if (body.diff.trim() === '') {
      return NextResponse.json({ message: 'diff is empty' }, { status: 400 })
    }

    const prompt = buildPrompt(body)

    const completion = await generateWithOpenAI(prompt, body.type)
    const parsed = parseModelResponse(completion.text)

    // Log usage
    await logUsage(auth.userId, body.type, completion.totalTokens)

    const response: GenerateResponse = {
      title: parsed.title,
      body: parsed.bullets.join('\n'),
      bullets: parsed.bullets,
      generationsRemaining: auth.tier === 'pro' ? -1 : quota.limit - quota.used - 1
    }

    return NextResponse.json(response)

  } catch (error: unknown) {
    console.error('[generate] Error:', error)

    // Handle OpenAI API errors specifically
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as { status: number; message: string; code?: string }
      if (apiError.status === 429) {
        return NextResponse.json({ message: 'AI service rate limit reached, please try again', code: 'rate_limited' }, { status: 429 })
      }
      if (apiError.status >= 500) {
        return NextResponse.json({ message: 'AI service temporarily overloaded', code: 'model_unavailable' }, { status: 503 })
      }
      if (apiError.status === 400) {
        return NextResponse.json({ message: 'Invalid request to AI service', code: 'invalid_request' }, { status: 400 })
      }
    }

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json({ message: 'AI service configuration error', code: 'config_error' }, { status: 500 })
    }
    return NextResponse.json({ message: 'Internal server error', code: 'server_error' }, { status: 500 })
  }
}
