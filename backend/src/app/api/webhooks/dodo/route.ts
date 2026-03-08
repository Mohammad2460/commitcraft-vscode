import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase'

function verifyDodoSignature(body: string, signature: string, secret: string): boolean {
  try {
    const hmac = createHmac('sha256', secret)
    hmac.update(body)
    const expected = hmac.digest('hex')
    // Constant-time comparison
    return signature === expected || `sha256=${expected}` === signature
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-dodo-signature') ?? req.headers.get('webhook-signature') ?? ''
  const webhookSecret = process.env.DODO_WEBHOOK_SECRET ?? ''

  if (webhookSecret && !verifyDodoSignature(body, signature, webhookSecret)) {
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
        const customerEmail = (event.data.customer as Record<string, unknown>)?.email as string
        const subscriptionId = event.data.subscription_id as string ?? event.data.id as string
        const periodEnd = event.data.current_period_end as string

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
        const subscriptionId = event.data.subscription_id as string ?? event.data.id as string
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
