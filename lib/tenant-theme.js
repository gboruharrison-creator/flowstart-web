export function getTenantCSSVars(tenant) {
  if (!tenant) return {}
  return {
    '--brand-primary': tenant.brand_color || '#10b981',
    '--brand-primary-dark': tenant.brand_color_dark || '#059669',
    '--brand-primary-rgb': hexToRgb(tenant.brand_color || '#10b981'),
  }
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '16, 185, 129'
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(', ')
}

export function getTenantMeta(tenant) {
  return {
    businessName: tenant?.business_name || 'Flowstart AI',
    agentName: tenant?.agent_config?.[0]?.agent_name || 'Sofia',
    tagline: tenant?.company_tagline || 'Il tuo assistente AI',
    logoUrl: tenant?.logo_url || null,
    brandColor: tenant?.brand_color || '#10b981',
    supportEmail: tenant?.support_email || 'hello@flowstart.it',
    plan: tenant?.plan || 'starter',
    phoneNumber: tenant?.agent_config?.[0]?.phone_number || null,
    isAgentActive: tenant?.agent_config?.[0]?.is_active || false
  }
}
