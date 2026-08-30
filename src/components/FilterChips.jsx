// FilterChips — NZ-style toggleable radio-group chip component
// Used inline in SearchBar and in Search results sections

export default function FilterChips({ options, value, onChange, label, size = 'md' }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`
            rounded-full font-semibold border transition-colors
            focus:outline-none focus:ring-2 focus:ring-nzCyan/40
            ${size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}
            ${value === opt
              ? 'bg-nzDarkTeal text-white border-nzDarkTeal'
              : 'bg-white text-slate-600 border-slate-300 hover:border-nzDarkTeal hover:text-nzDarkTeal'
            }
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
