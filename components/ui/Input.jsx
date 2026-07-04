export default function Input({
  label, error, hint, id,
  className = '', ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id}
          className="block text-sm font-medium text-slate-300">
          {label}
          {props.required && (
            <span className="text-emerald-400 ml-1">*</span>
          )}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full bg-slate-900/80 border rounded-lg
          px-3.5 py-2.5 text-sm text-white
          placeholder:text-slate-600
          transition-colors duration-150
          focus:outline-none focus:ring-0
          ${error
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-white/[0.08] focus:border-emerald-500/60 hover:border-white/[0.14]'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-slate-500 text-xs">{hint}</p>
      )}
    </div>
  )
}
