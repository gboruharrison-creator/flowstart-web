export default function Card({
  children, className = '', variant = 'default',
  padding = 'md', hover = false
}) {
  const variants = {
    default: 'bg-[#0b1222] border border-white/[0.07]',
    raised:  'bg-[#111827] border border-white/[0.09]',
    accent:  'bg-[#0b1222] border border-emerald-500/20',
    ghost:   'bg-transparent border border-white/[0.06]',
  }
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-5',
    lg:   'p-6',
    xl:   'p-8',
  }
  return (
    <div className={`
      rounded-xl
      ${variants[variant]}
      ${paddings[padding]}
      ${hover ? 'transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0f1a2e]' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
