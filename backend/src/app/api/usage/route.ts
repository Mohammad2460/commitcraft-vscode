import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, checkQuota } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req)
  if (!auth.success) {
    return NextResponse.json({ message: auth.message }, { status: auth.status })
  }

  const quota = await checkQuota(auth.userId, auth.tier)
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  return NextResponse.json({
    used: quota.used,
    limit: quota.limit,
    tier: auth.tier,
    resetDate
  })
}
