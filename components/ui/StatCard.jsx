export default function StatCard({
  label, value, sub, trend, accent = false
}) {
  return (
    <div className={`
      rounded-xl p-5 border
      ${accent
        ? 'bg-emerald-950/40 border-emerald-500/20'
        : 'bg-[#0b1222] border-white/[0.07]'}
    `}>
      <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">
        {label}
      </div>
      <div className={`text-2xl font-bold tracking-tight ${
        accent ? 'text-emerald-400' : 'text-white'
      }`}>
        {value}
      </div>
      {sub && (
        <div className="text-slate-500 text-xs mt-1">{sub}</div>
      )}
      {trend !== undefined && (
        <div className={`text-xs mt-2 font-medium ${
          trend > 0 ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this month
        </div>
      )}
    </div>
  )
}
