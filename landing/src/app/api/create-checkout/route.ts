import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json() as { email?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Valid email required' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Look up user
    const { data: user } = await supabase
      .from('users')
      .select('id, tier')
      .eq('email', email.toLowerCase())
      .single()

    if (!user) {
      return NextResponse.json({ message: 'No account found for this email. Please sign in from VS Code first.' }, { status: 404 })
    }

    if (user.tier === 'pro') {
      return NextResponse.json({ message: 'Your account is already Pro!' }, { status: 400 })
    }

    const dodoApiKey = process.env.DODO_API_KEY
    const dodoProductId = process.env.DODO_PRODUCT_ID
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://commitcraft.ai'

    if (!dodoApiKey || !dodoProductId) {
      return NextResponse.json({ message: 'Payment service not configured' }, { status: 500 })
    }

    // Create Dodo Payments checkout session
    const response = await fetch('https://api.dodopayments.com/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dodoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: dodoProductId,
        quantity: 1,
        payment_link: true,
        customer: {
          email: email.toLowerCase(),
          name: email.split('@')[0],
          create_new_customer: false,
        },
        return_url: `${siteUrl}/dashboard?upgraded=true`,
        metadata: {
          user_id: user.id,
          source: 'landing_page',
        }
      }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      console.error('[create-checkout] Dodo error:', response.status, errBody)
      return NextResponse.json({ message: 'Failed to create checkout session' }, { status: 500 })
    }

    const checkout = await response.json() as { payment_link?: string; url?: string }
    const checkoutUrl = checkout.payment_link ?? checkout.url

    if (!checkoutUrl) {
      console.error('[create-checkout] No URL in Dodo response:', checkout)
      return NextResponse.json({ message: 'No checkout URL returned' }, { status: 500 })
    }

    return NextResponse.json({ checkoutUrl })

  } catch (error) {
    console.error('[create-checkout] Error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
