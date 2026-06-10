'use client'

import { ReactNode, useState } from 'react'
import { CheckCircle, Loader2, Save } from 'lucide-react'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
  onSave: () => Promise<void>
  badge?: string
}

export default function SectionCard({ title, description, children, onSave, badge }: SectionCardProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await onSave()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      // error handled by caller
    }
    setSaving(false)
  }

  return (
    <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              {badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide bg-[#F05B1B]/10 text-[#F05B1B] border border-[#F05B1B]/20 uppercase">
                  {badge}
                </span>
              )}
            </div>
            {description && <p className="text-white/35 text-xs mt-0.5">{description}</p>}
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            saved
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : saving
              ? 'bg-[#F05B1B]/10 text-[#F05B1B]/60 border border-[#F05B1B]/15 cursor-not-allowed'
              : 'bg-[#F05B1B] hover:bg-[#FF6B2B] text-white shadow-lg shadow-[#F05B1B]/20 hover:shadow-[#F05B1B]/30'
          }`}
        >
          {saving ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving...</>
          ) : saved ? (
            <><CheckCircle className="w-3.5 h-3.5" />Saved!</>
          ) : (
            <><Save className="w-3.5 h-3.5" />Save Section</>
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}
