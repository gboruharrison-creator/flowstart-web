export default function EmptyState({
  title, description, action
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/[0.06] flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-slate-600" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
        </svg>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
      {description && (
        <p className="text-slate-500 text-sm max-w-xs">{description}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  )
}
