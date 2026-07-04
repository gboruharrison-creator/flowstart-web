export default function Badge({
  children, variant = 'default', size = 'sm'
}) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    warning: 'bg-amber-950 text-amber-400 border-amber-800',
    error:   'bg-red-950 text-red-400 border-red-800',
    info:    'bg-blue-950 text-blue-400 border-blue-800',
    accent:  'bg-emerald-500 text-white border-emerald-400',
    outline: 'bg-transparent text-slate-400 border-slate-700',
  }
  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }
  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      border tracking-wide
      ${variants[variant]} ${sizes[size]}
    `}>
      {children}
    </span>
  )
}
