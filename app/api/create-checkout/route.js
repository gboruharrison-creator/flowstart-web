import { stripe } from '../../../lib/stripe'
import { createClient } from '../../../lib/supabase/server'

export async function POST(request) {
  try {
    const { priceId, planName } = await request.json()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const customerData = {
      metadata: {
        supabase_user_id: user?.id || 'anonymous',
        plan: planName
      }
    }

    if (user?.email) customerData.email = user.email

    const customer = await stripe.customers.create(customerData)

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#pricing`,
      locale: 'it',
      subscription_data: {
        metadata: {
          supabase_user_id: user?.id || 'anonymous',
          plan: planName
        }
      }
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
