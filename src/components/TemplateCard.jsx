import { FileText, ArrowRight } from 'lucide-react'

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  general:    { label: 'General',     bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200'   },
  criminal:   { label: 'Criminal',    bg: 'bg-red-50',     text: 'text-red-700',    border: 'border-red-200'    },
  financial:  { label: 'Financial',   bg: 'bg-green-50',   text: 'text-green-700',  border: 'border-green-200'  },
  family:     { label: 'Family',      bg: 'bg-pink-50',    text: 'text-pink-700',   border: 'border-pink-200'   },
  property:   { label: 'Property',    bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-200'  },
  tax:        { label: 'Tax',         bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200' },
  civil:      { label: 'Civil',       bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200' },
  immigration:{ label: 'Immigration', bg: 'bg-teal-50',    text: 'text-teal-700',   border: 'border-teal-200'   },
  ip:         { label: 'IP',          bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200' },
  labour:     { label: 'Labour',      bg: 'bg-cyan-50',    text: 'text-cyan-700',   border: 'border-cyan-200'   },
}

const FALLBACK_STYLE = { label: 'Other', bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }

// ─── Component ────────────────────────────────────────────────────────────────

export default function TemplateCard({ template, onUse }) {
  const style = CATEGORY_STYLES[template.category] ?? FALLBACK_STYLE

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">

      {/* Card header strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1e3a5f] to-[#2a5298]" />

      <div className="p-5 flex flex-col flex-1">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 bg-[#1e3a5f]/8 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#1e3a5f]" />
          </div>
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
            {style.label}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-[#1e3a5f] mb-1.5 leading-snug group-hover:text-[#2a5298] transition-colors">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* CTA */}
        <button
          onClick={() => onUse(template)}
          className="w-full flex items-center justify-center gap-1.5 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors group/btn"
        >
          Use Template
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
