export default function Divider({ label, className = '' }) {
  if (!label) {
    return (
      <div className={`border-t border-white/[0.06] ${className}`} />
    )
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 border-t border-white/[0.06]" />
      <span className="text-xs text-slate-600 font-medium tracking-widest uppercase">
        {label}
      </span>
      <div className="flex-1 border-t border-white/[0.06]" />
    </div>
  )
}
