'use client'
import { useState } from 'react'
import { createClient } from '../../../lib/supabase/client'
import Link from 'next/link'

const PRESET_COLORS = [
  { name: 'Emerald', value: '#10b981', dark: '#059669' },
  { name: 'Blue',    value: '#3b82f6', dark: '#2563eb' },
  { name: 'Violet',  value: '#8b5cf6', dark: '#7c3aed' },
  { name: 'Rose',    value: '#f43f5e', dark: '#e11d48' },
  { name: 'Amber',   value: '#f59e0b', dark: '#d97706' },
  { name: 'Cyan',    value: '#06b6d4', dark: '#0891b2' },
]

export default function BrandingSettings({ tenant }) {
  const [form, setForm] = useState({
    business_name:   tenant?.business_name   || '',
    company_tagline: tenant?.company_tagline || '',
    brand_color:     tenant?.brand_color     || '#10b981',
    brand_color_dark: tenant?.brand_color_dark || '#059669',
    logo_url:        tenant?.logo_url        || '',
    support_email:   tenant?.support_email   || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function setField(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { error: saveError } = await supabase
      .from('tenants')
      .update(form)
      .eq('id', tenant.id)
    if (saveError) {
      setError(saveError.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 ' +
    'focus:border-[var(--brand-primary)] focus:ring-1 ' +
    'focus:ring-[var(--brand-primary)] focus:outline-none ' +
    'text-white placeholder:text-slate-500 rounded-lg px-4 py-3 text-sm'

  const labelClass = 'text-slate-300 text-sm mb-1.5 block'

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard"
          className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
          ← Dashboard
        </Link>
        <h1 className="text-white text-xl font-bold">Impostazioni brand</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">

        {/* Identity */}
        <div className="border border-slate-800 rounded-xl p-6"
          style={{ background: '#0b1222' }}>
          <h2 className="text-white font-semibold mb-4">Identità aziendale</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nome studio / azienda</label>
              <input
                className={inputClass}
                value={form.business_name}
                onChange={e => setField('business_name', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                className={inputClass}
                placeholder="Es. Il tuo studio dentistico a Milano"
                value={form.company_tagline}
                onChange={e => setField('company_tagline', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Email di supporto</label>
              <input
                type="email"
                className={inputClass}
                placeholder="info@tuostudio.it"
                value={form.support_email}
                onChange={e => setField('support_email', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>URL logo</label>
              <input
                className={inputClass}
                placeholder="https://tuosito.it/logo.png"
                value={form.logo_url}
                onChange={e => setField('logo_url', e.target.value)}
              />
              <p className="text-slate-600 text-xs mt-1">
                Link diretto a un&apos;immagine PNG o SVG. Altezza consigliata: 32–48px.
              </p>
            </div>
          </div>
        </div>

        {/* Brand color */}
        <div className="border border-slate-800 rounded-xl p-6"
          style={{ background: '#0b1222' }}>
          <h2 className="text-white font-semibold mb-4">Colore brand</h2>

          {/* Presets */}
          <div className="grid grid-cols-6 gap-3 mb-4">
            {PRESET_COLORS.map(color => (
              <button
                key={color.value}
                type="button"
                onClick={() => {
                  setField('brand_color', color.value)
                  setField('brand_color_dark', color.dark)
                }}
                style={{ background: color.value }}
                className={`h-10 rounded-lg transition-all ${
                  form.brand_color === color.value
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110'
                    : 'hover:scale-105'
                }`}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom hex */}
          <div>
            <label className={labelClass}>Colore personalizzato (HEX)</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={form.brand_color}
                onChange={e => setField('brand_color', e.target.value)}
                className="w-12 h-10 rounded cursor-pointer bg-transparent border border-slate-700"
              />
              <input
                className={inputClass}
                placeholder="#10b981"
                value={form.brand_color}
                onChange={e => setField('brand_color', e.target.value)}
              />
            </div>
          </div>

          {/* Live preview */}
          <div className="mt-4 p-4 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-xs mb-3">Anteprima</p>
            <div className="flex items-center gap-3">
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: form.brand_color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0
              }}>
                {form.business_name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold truncate">
                  {form.business_name || 'Nome studio'}
                </div>
                <div className="text-slate-500 text-xs truncate">
                  {form.company_tagline || 'Tagline'}
                </div>
              </div>
              <button
                type="button"
                style={{
                  background: form.brand_color,
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                Prenota
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{ background: 'var(--brand-primary)' }}
          className="px-8 py-3 text-white font-semibold rounded-lg text-sm transition-opacity disabled:opacity-50 hover:opacity-90">
          {saving ? 'Salvataggio...' : saved ? 'Salvato ✓' : 'Salva impostazioni'}
        </button>

      </form>
    </div>
  )
}
