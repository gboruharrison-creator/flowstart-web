import { stripe } from '../../../../lib/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature error:', error)
    return Response.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object
        const customerId = session.customer
        const subscriptionId = session.subscription
        const supabaseUserId = session.metadata?.supabase_user_id
        const plan = session.metadata?.plan || 'starter'

        const customer = await stripe.customers.retrieve(customerId)

        const { data: tenant, error: tenantError } = await supabaseAdmin
          .from('tenants')
          .insert({
            business_name: customer.name || customer.email || 'New Client',
            plan: plan,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            owner_id: supabaseUserId !== 'anonymous' ? supabaseUserId : null
          })
          .select()
          .single()

        if (tenantError) {
          console.error('Tenant creation error:', tenantError)
          break
        }

        await supabaseAdmin
          .from('agent_config')
          .insert({
            tenant_id: tenant.id,
            agent_name: 'Sofia',
            is_active: false
          })

        if (process.env.N8N_WEBHOOK_URL) {
          await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'new_client_onboarding',
              tenant_id: tenant.id,
              business_name: tenant.business_name,
              plan: plan,
              stripe_customer_id: customerId,
              customer_email: customer.email,
              timestamp: new Date().toISOString()
            })
          })
        }

        console.log('Tenant created and n8n notified:', tenant.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await supabaseAdmin
          .from('tenants')
          .update({ plan: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        console.error('Payment failed for customer:', invoice.customer)
        break
      }
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return Response.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
