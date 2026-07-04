'use client'
import { useState } from 'react'

export default function PricingButton({
  priceId, planName, label, disabled, className
}) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (disabled) return
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, planName })
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className={className}>
      {loading ? 'Reindirizzamento...' : label}
    </button>
  )
}
