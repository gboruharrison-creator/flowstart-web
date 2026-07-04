import { createClient } from '@supabase/supabase-js'

export async function PATCH(request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.N8N_CALLBACK_SECRET}`) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const {
      tenant_id,
      vapi_assistant_id,
      system_prompt,
      phone_number,
      is_active
    } = await request.json()

    if (!tenant_id) {
      return Response.json(
        { error: 'tenant_id required' },
        { status: 400 }
      )
    }

    const updateData = {}
    if (vapi_assistant_id !== undefined) updateData.vapi_assistant_id = vapi_assistant_id
    if (system_prompt !== undefined)     updateData.system_prompt = system_prompt
    if (phone_number !== undefined)      updateData.phone_number = phone_number
    if (is_active !== undefined)         updateData.is_active = is_active

    const { data, error } = await supabaseAdmin
      .from('agent_config')
      .update(updateData)
      .eq('tenant_id', tenant_id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    console.log('Agent config updated for tenant:', tenant_id)
    return Response.json({ success: true, data })

  } catch (error) {
    console.error('Update tenant error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
