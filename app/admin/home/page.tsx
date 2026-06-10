'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye, Video, AlignLeft, Star } from 'lucide-react'

const ALL_KEYS = [
  'hero_title', 'hero_subtitle', 'hero_description', 'hero_video', 'hero_image',
  'welcome_title', 'welcome_description', 'welcome_image', 'welcome_icon',
  'cta_title', 'cta_description', 'cta_bg_image'
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

export default function HomeAdminPage() {
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
        {[1,2,3].map(i => (
          <div key={i} className="h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Live Preview Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
        <Eye className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <p className="text-blue-300/70 text-xs">
          Changes saved here appear on the <strong className="text-blue-300">live website homepage</strong>. Each section saves independently.
        </p>
      </div>

      {/* Hero Section */}
      <SectionCard
        title="Hero Section"
        description="The large banner at the top of your homepage"
        badge="Homepage Top"
        onSave={() => saveSection(['hero_title','hero_subtitle','hero_description','hero_video','hero_image'], settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-black text-2xl leading-tight">
              {settings.hero_title || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-[#F05B1B] text-xs mt-1 font-medium">
              {settings.hero_subtitle || <span className="text-white/20 italic">No subtitle</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-2">
              {settings.hero_description || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="Hero Title"
              hint='Displayed as the large headline, e.g. "INFRASTRUCTURE FOR THE FUTURE"'
              value={settings.hero_title || ''}
              onChange={e => set('hero_title')(e.target.value)}
              placeholder="INFRASTRUCTURE FOR THE FUTURE"
            />
            <Input
              label="Subtitle / Badge Text"
              hint="Small badge above the headline"
              value={settings.hero_subtitle || ''}
              onChange={e => set('hero_subtitle')(e.target.value)}
              placeholder="Empowering Businesses"
            />
          </FieldGrid>
          <Textarea
            label="Description"
            hint="Short paragraph below the headline"
            value={settings.hero_description || ''}
            onChange={e => set('hero_description')(e.target.value)}
            placeholder="Secure. Scalable. Intelligent..."
            rows={3}
          />
          <FieldGrid cols={2}>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> Background Video
              </p>
              <ImageUploader
                label=""
                value={settings.hero_video || ''}
                onChange={set('hero_video')}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Fallback Image</p>
              <ImageUploader
                label=""
                value={settings.hero_image || ''}
                onChange={set('hero_image')}
              />
            </div>
          </FieldGrid>
        </div>
      </SectionCard>

      {/* Welcome Section */}
      <SectionCard
        title="Welcome Section"
        description='Section below hero — "Who We Are" content area'
        onSave={() => saveSection(['welcome_title','welcome_description','welcome_image','welcome_icon'], settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.welcome_title || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-3">
              {settings.welcome_description || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <Input
            label="Section Title"
            value={settings.welcome_title || ''}
            onChange={e => set('welcome_title')(e.target.value)}
            placeholder="Powering Qatar's Digital Future"
          />
          <Textarea
            label="Description"
            value={settings.welcome_description || ''}
            onChange={e => set('welcome_description')(e.target.value)}
            placeholder="We are a leading enterprise IT company..."
            rows={4}
          />
          <FieldGrid cols={2}>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Section Image</p>
              <ImageUploader label="" value={settings.welcome_image || ''} onChange={set('welcome_image')} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Section Icon</p>
              <ImageUploader label="" value={settings.welcome_icon || ''} onChange={set('welcome_icon')} />
            </div>
          </FieldGrid>
        </div>
      </SectionCard>

      {/* CTA Section */}
      <SectionCard
        title="CTA Section"
        description="Bottom call-to-action section with the Doha skyline background"
        onSave={() => saveSection(['cta_title','cta_description','cta_bg_image'], settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.cta_title || <span className="text-white/20 italic font-normal text-sm">Using default: "Let's build a smarter, safer future together."</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-2">
              {settings.cta_description || <span className="text-white/20 italic">Using default description</span>}
            </div>
          </div>

          <Input
            label="CTA Title"
            value={settings.cta_title || ''}
            onChange={e => set('cta_title')(e.target.value)}
            placeholder="Let's build a smarter, safer future together."
          />
          <Textarea
            label="CTA Description"
            value={settings.cta_description || ''}
            onChange={e => set('cta_description')(e.target.value)}
            placeholder="Partner with Nexa Network Solutions..."
            rows={3}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
            <ImageUploader label="" value={settings.cta_bg_image || ''} onChange={set('cta_bg_image')} />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
