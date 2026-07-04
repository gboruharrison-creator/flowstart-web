import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const payload = await request.json()
    const { message } = payload

    if (!message) {
      return Response.json({ received: true })
    }

    if (message.type === 'end-of-call-report') {
      const { call, transcript, summary } = message

      const assistantId = call?.assistantId
      if (!assistantId) {
        return Response.json({ received: true })
      }

      const { data: agentConfig } = await supabaseAdmin
        .from('agent_config')
        .select('tenant_id')
        .eq('vapi_assistant_id', assistantId)
        .single()

      if (!agentConfig) {
        console.warn('No agent found for VAPI assistant:', assistantId)
        return Response.json({ received: true })
      }

      const duration =
        call?.endedAt && call?.startedAt
          ? Math.round(
              (new Date(call.endedAt) - new Date(call.startedAt)) / 1000
            )
          : 0

      const intentKeywords = {
        booked:   ['prenotat', 'appuntamento', 'book', 'scheduled'],
        missed:   ['richiamere', 'callback', 'non disponibile'],
        escalated: ['trasferit', 'operatore', 'transfer', 'human']
      }

      let outcome = 'answered'
      const transcriptLower = (transcript || '').toLowerCase()
      for (const [key, keywords] of Object.entries(intentKeywords)) {
        if (keywords.some(kw => transcriptLower.includes(kw))) {
          outcome = key
          break
        }
      }

      await supabaseAdmin
        .from('call_logs')
        .insert({
          tenant_id:        agentConfig.tenant_id,
          caller_number:    call?.customer?.number || 'Sconosciuto',
          duration_seconds: duration,
          intent_detected:  summary || 'Chiamata gestita da Sofia',
          outcome,
          transcript,
          revenue_recovered: 0
        })

      console.log('Call logged for tenant:', agentConfig.tenant_id)
    }

    return Response.json({ received: true })

  } catch (error) {
    console.error('VAPI webhook error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
