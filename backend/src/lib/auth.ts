import { NextRequest } from 'next/server'
import { getSupabaseAdmin } from './supabase'

export type AuthResult = {
  success: true
  userId: string
  email: string
  tier: 'free' | 'pro'
} | {
  success: false
  status: number
  message: string
}

export async function validateApiKey(req: NextRequest): Promise<AuthResult> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { success: false, status: 401, message: 'Missing or invalid Authorization header' }
  }
  const apiKey = authHeader.slice(7).trim()
  if (!apiKey || !apiKey.startsWith('cc_live_')) {
    return { success: false, status: 401, message: 'Invalid API key format' }
  }

  const supabase = getSupabaseAdmin()
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, tier, is_active')
    .eq('api_key', apiKey)
    .single()

  if (error || !user) {
    return { success: false, status: 401, message: 'Invalid API key' }
  }
  if (!user.is_active) {
    return { success: false, status: 401, message: 'Account is inactive' }
  }

  return {
    success: true,
    userId: user.id,
    email: user.email,
    tier: user.tier as 'free' | 'pro'
  }
}

export async function checkQuota(userId: string, tier: 'free' | 'pro'): Promise<{
  allowed: boolean
  used: number
  limit: number
}> {
  if (tier === 'pro') {
    return { allowed: true, used: 0, limit: -1 }
  }

  const supabase = getSupabaseAdmin()
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', monthStart.toISOString())

  if (error) {
    // On error, allow but log
    console.error('[checkQuota] Error:', error)
    return { allowed: true, used: 0, limit: 20 }
  }

  const used = count ?? 0
  const limit = 20
  return { allowed: used < limit, used, limit }
}

export async function logUsage(userId: string, type: string, tokensUsed: number): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.from('usage_logs').insert({
    user_id: userId,
    type,
    tokens_used: tokensUsed
  })
}
