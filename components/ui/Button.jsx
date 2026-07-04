export default function Button({
  children, variant = 'primary', size = 'md',
  disabled = false, loading = false,
  onClick, type = 'button', className = ''
}) {
  const variants = {
    primary:   'bg-emerald-500 hover:bg-emerald-400 text-white border-transparent',
    secondary: 'bg-white/[0.06] hover:bg-white/[0.10] text-white border-white/[0.10]',
    ghost:     'bg-transparent hover:bg-white/[0.05] text-slate-300 border-transparent',
    danger:    'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20',
    outline:   'bg-transparent hover:bg-white/[0.05] text-white border-white/[0.15]',
  }
  const sizes = {
    sm:  'text-xs px-3 py-1.5 rounded-lg',
    md:  'text-sm px-4 py-2.5 rounded-lg',
    lg:  'text-sm px-6 py-3 rounded-xl',
    xl:  'text-base px-8 py-4 rounded-xl',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium border transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading && (
        <svg className="animate-spin w-3.5 h-3.5"
          viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
