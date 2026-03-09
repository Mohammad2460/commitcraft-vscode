import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendApiKeyEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = body.email?.toString().trim().toLowerCase()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('api_key')
      .eq('email', email)
      .single()

    if (existingUser) {
      // Send email too (best effort, don't fail if email breaks)
      sendApiKeyEmail(email, existingUser.api_key).catch(e =>
        console.error('[register] Email failed:', e)
      )
      return NextResponse.json({
        message: 'Welcome back! Here is your API key.',
        apiKey: existingUser.api_key,
        isExisting: true
      })
    }

    // Create new user
    const apiKey = 'cc_live_' + randomBytes(16).toString('hex')
    const { error } = await supabase.from('users').insert({
      email,
      api_key: apiKey,
      tier: 'free'
    })

    if (error) {
      console.error('[register] Supabase error:', error)
      return NextResponse.json({ message: 'Failed to create account' }, { status: 500 })
    }

    // Send email too (best effort)
    sendApiKeyEmail(email, apiKey).catch(e =>
      console.error('[register] Email failed:', e)
    )

    return NextResponse.json({
      message: 'Account created! Here is your API key.',
      apiKey,
      isExisting: false
    })
  } catch (error) {
    console.error('[register] Error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
