import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// Gumroad sends form-encoded POST data (not JSON)
// Event types: sale, subscription_ended, subscription_restarted, subscription_cancelled

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const event = formData.get('alert_name')?.toString() ?? ''
    const buyerEmail = formData.get('email')?.toString()?.toLowerCase()
    const productId = formData.get('product_permalink')?.toString()
    const subscriptionId = formData.get('subscription_id')?.toString()
    const saleId = formData.get('sale_id')?.toString()

    // Optional: verify it's from our product
    const GUMROAD_PRODUCT = 'opqpxp'
    if (productId && productId !== GUMROAD_PRODUCT) {
      console.log('[gumroad] Ignoring event for different product:', productId)
      return NextResponse.json({ received: true })
    }

    console.log('[gumroad] Event:', event, '| Email:', buyerEmail)

    const supabase = getSupabaseAdmin()

    switch (event) {
      case 'sale': {
        // New purchase or subscription started
        if (!buyerEmail) break

        // Check if user exists
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('email', buyerEmail)
          .single()

        if (user) {
          // Upgrade existing user
          await supabase
            .from('users')
            .update({ tier: 'pro' })
            .eq('email', buyerEmail)

          // Record subscription
          if (subscriptionId) {
            await supabase.from('subscriptions').upsert({
              user_id: user.id,
              dodo_subscription_id: `gumroad_${subscriptionId}`,
              status: 'active',
              current_period_end: null
            }, { onConflict: 'dodo_subscription_id' })
          }

          console.log('[gumroad] Upgraded user to pro:', buyerEmail)
        } else {
          // User doesn't exist yet — create them with pro tier
          // (they may not have installed the extension yet)
          const { randomBytes } = await import('crypto')
          const apiKey = 'cc_live_' + randomBytes(16).toString('hex')

          const { data: newUser } = await supabase.from('users').insert({
            email: buyerEmail,
            api_key: apiKey,
            tier: 'pro'
          }).select('id').single()

          if (newUser && subscriptionId) {
            await supabase.from('subscriptions').insert({
              user_id: newUser.id,
              dodo_subscription_id: `gumroad_${subscriptionId}`,
              status: 'active',
              current_period_end: null
            })
          }

          console.log('[gumroad] Created new pro user:', buyerEmail)

          // Send them their API key via email
          try {
            const { sendApiKeyEmail } = await import('@/lib/email')
            await sendApiKeyEmail(buyerEmail, apiKey)
          } catch (e) {
            console.error('[gumroad] Failed to send email:', e)
          }
        }
        break
      }

      case 'subscription_cancelled':
      case 'subscription_ended': {
        // Subscription cancelled or expired — downgrade to free
        if (!buyerEmail) break

        await supabase
          .from('users')
          .update({ tier: 'free' })
          .eq('email', buyerEmail)

        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({ status: 'cancelled' })
            .eq('dodo_subscription_id', `gumroad_${subscriptionId}`)
        }

        console.log('[gumroad] Downgraded user to free:', buyerEmail)
        break
      }

      case 'subscription_restarted': {
        // User re-subscribed after cancelling
        if (!buyerEmail) break

        await supabase
          .from('users')
          .update({ tier: 'pro' })
          .eq('email', buyerEmail)

        console.log('[gumroad] Re-upgraded user to pro:', buyerEmail)
        break
      }

      default:
        console.log('[gumroad] Unhandled event:', event)
    }

    // Always return 200 — Gumroad retries if it gets anything else
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('[gumroad] Webhook error:', error)
    // Still return 200 to prevent Gumroad retrying indefinitely
    return NextResponse.json({ received: true })
  }
}
