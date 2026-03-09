import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, checkQuota } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req)
  if (!auth.success) {
    return NextResponse.json({ message: auth.message }, { status: auth.status, headers: CORS_HEADERS })
  }

  const quota = await checkQuota(auth.userId, auth.tier)

  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  return NextResponse.json({
    valid: true,
    email: auth.email,
    tier: auth.tier,
    used: quota.used,
    limit: quota.limit,
    resetDate
  }, { headers: CORS_HEADERS })
}
