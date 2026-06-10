'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye } from 'lucide-react'

const ALL_KEYS = [
  'about_years_exp', 'about_projects_delivered', 'about_clients', 'about_experts',
  'about_title', 'about_description', 'about_bg_image'
]

async function saveSection(keys: string[], settings: Record<string, string>) {
  const payload: Record<string, string> = {}
  keys.forEach(k => { payload[k] = settings[k] || '' })
  const res = await fetch('/api/admin/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Failed to save')
}

export default function AboutAdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/settings?keys=${ALL_KEYS.join(',')}`)
      .then(res => res.json())
      .then(data => { setSettings(data); setLoading(false) })
  }, [])

  const set = (key: string) => (value: string) =>
    setSettings(prev => ({ ...prev, [key]: value }))

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2].map(i => (
          <div key={i} className="h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Info Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-500/5 border border-violet-500/10">
        <Eye className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
        <p className="text-violet-300/70 text-xs">
          Stats appear in the <strong className="text-violet-300">"About" section</strong> on the homepage.
        </p>
      </div>

      {/* Statistics Section */}
      <SectionCard
        title="Company Statistics"
        description='Numbers displayed in the "Numbers that reflect our commitment" grid'
        badge="Homepage"
        onSave={() => saveSection(['about_years_exp','about_projects_delivered','about_clients','about_experts'], settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-3">Live Preview</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Years of Excellence', value: settings.about_years_exp || '10', suffix: '+' },
                { label: 'Projects Delivered', value: settings.about_projects_delivered || '150', suffix: '+' },
                { label: 'Business Clients', value: settings.about_clients || '50', suffix: '+' },
                { label: 'Tech Experts', value: settings.about_experts || '25', suffix: '+' },
              ].map(({ label, value, suffix }) => (
                <div key={label} className="text-center">
                  <div className="text-[#F05B1B] font-black text-xl">{value}<span className="text-sm">{suffix}</span></div>
                  <div className="text-white/30 text-[9px] mt-0.5 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="Years of Experience"
              hint='Shows as "10+" on the site'
              type="number"
              value={settings.about_years_exp || ''}
              onChange={e => set('about_years_exp')(e.target.value)}
              placeholder="10"
            />
            <Input
              label="Projects Delivered"
              hint='Shows as "150+" on the site'
              type="number"
              value={settings.about_projects_delivered || ''}
              onChange={e => set('about_projects_delivered')(e.target.value)}
              placeholder="150"
            />
            <Input
              label="Business Clients"
              hint='Shows as "50+" on the site'
              type="number"
              value={settings.about_clients || ''}
              onChange={e => set('about_clients')(e.target.value)}
              placeholder="50"
            />
            <Input
              label="Technology Experts"
              hint='Shows as "25+" on the site'
              type="number"
              value={settings.about_experts || ''}
              onChange={e => set('about_experts')(e.target.value)}
              placeholder="25"
            />
          </FieldGrid>
        </div>
      </SectionCard>

      {/* Page Content Section */}
      <SectionCard
        title="About Page Content"
        description="Title, description text and background image for the About page"
        onSave={() => saveSection(['about_title','about_description','about_bg_image'], settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.about_title || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-3">
              {settings.about_description || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <Input
            label="Page Title"
            value={settings.about_title || ''}
            onChange={e => set('about_title')(e.target.value)}
            placeholder="About Nexa Network Solutions"
          />
          <Textarea
            label="Description"
            value={settings.about_description || ''}
            onChange={e => set('about_description')(e.target.value)}
            placeholder="We are Qatar's leading enterprise IT company..."
            rows={4}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
            <ImageUploader label="" value={settings.about_bg_image || ''} onChange={set('about_bg_image')} />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
