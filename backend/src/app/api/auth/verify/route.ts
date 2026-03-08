import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, checkQuota } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req)
  if (!auth.success) {
    return NextResponse.json({ message: auth.message }, { status: auth.status })
  }

  const quota = await checkQuota(auth.userId, auth.tier)

  // Calculate reset date (first day of next month)
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  return NextResponse.json({
    valid: true,
    email: auth.email,
    tier: auth.tier,
    used: quota.used,
    limit: quota.limit,
    resetDate
  })
}
