import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase'

function verifyDodoSignature(body: string, signature: string, secret: string): boolean {
  try {
    const hmac = createHmac('sha256', secret)
    hmac.update(body)
    const expected = hmac.digest('hex')
    // Try both raw hex and sha256= prefixed formats using constant-time comparison
    const sigBuffer = Buffer.from(signature.replace(/^sha256=/, ''), 'hex')
    const expBuffer = Buffer.from(expected, 'hex')
    if (sigBuffer.length !== expBuffer.length) return false
    return timingSafeEqual(sigBuffer, expBuffer)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-dodo-signature') ?? req.headers.get('webhook-signature') ?? ''
  const webhookSecret = process.env.DODO_WEBHOOK_SECRET

  // Require webhook secret — reject all requests if not configured
  if (!webhookSecret) {
    console.error('[dodo-webhook] DODO_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  if (!verifyDodoSignature(body, signature, webhookSecret)) {
    console.error('[dodo-webhook] Invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: { type: string; data: Record<string, unknown> }
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  console.log('[dodo-webhook] Event type:', event.type)

  try {
    switch (event.type) {
      case 'payment.succeeded':
      case 'subscription.active': {
        const customer = event.data.customer
        const customerEmail = typeof customer === 'object' && customer !== null && 'email' in customer
          ? String((customer as Record<string, unknown>).email)
          : undefined
        const subscriptionId = typeof event.data.subscription_id === 'string'
          ? event.data.subscription_id
          : typeof event.data.id === 'string' ? event.data.id : undefined
        const periodEnd = typeof event.data.current_period_end === 'string'
          ? event.data.current_period_end
          : undefined

        if (customerEmail) {
          await supabase
            .from('users')
            .update({ tier: 'pro' })
            .eq('email', customerEmail.toLowerCase())

          if (subscriptionId) {
            const { data: user } = await supabase
              .from('users')
              .select('id')
              .eq('email', customerEmail.toLowerCase())
              .single()

            if (user) {
              await supabase.from('subscriptions').upsert({
                user_id: user.id,
                dodo_subscription_id: subscriptionId,
                status: 'active',
                current_period_end: periodEnd ?? null
              }, { onConflict: 'dodo_subscription_id' })
            }
          }
        }
        break
      }

      case 'subscription.cancelled':
      case 'subscription.expired': {
        const subscriptionId = typeof event.data.subscription_id === 'string'
          ? event.data.subscription_id
          : typeof event.data.id === 'string' ? event.data.id : undefined
        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('dodo_subscription_id', subscriptionId)

          const { data: sub } = await supabase
            .from('subscriptions')
            .select('user_id')
            .eq('dodo_subscription_id', subscriptionId)
            .single()

          if (sub) {
            await supabase
              .from('users')
              .update({ tier: 'free' })
              .eq('id', sub.user_id)
          }
        }
        break
      }

      default:
        console.log('[dodo-webhook] Unhandled event type:', event.type)
    }
  } catch (error) {
    console.error('[dodo-webhook] Processing error:', error)
    // Return 200 to prevent Dodo from retrying - we log but don't fail
  }

  return NextResponse.json({ received: true })
}
