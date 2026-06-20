'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye, Video, Save, Loader2 } from 'lucide-react'

async function savePageContent(data: any) {
  const res = await fetch('/api/admin/settings?page=home', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to save')
}

export default function HomeAdminPage() {
  const [settings, setSettings] = useState<any>({})
  const [originalSettings, setOriginalSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings?page=home', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setOriginalSettings(JSON.parse(JSON.stringify(data)))
        setLoading(false)
      })
  }, [])

  const set = (key: string) => (value: any) =>
    setSettings((prev: any) => ({ ...prev, [key]: value }))

  const hasChanges = () => {
    if (loading || !settings || !originalSettings) return false
    return JSON.stringify(settings) !== JSON.stringify(originalSettings)
  }

  const handleDiscard = () => {
    if (originalSettings) {
      setSettings(JSON.parse(JSON.stringify(originalSettings)))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await savePageContent(settings)
      setOriginalSettings(JSON.parse(JSON.stringify(settings)))
    } catch (e) {
      alert('Failed to save changes')
    }
    setSaving(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (hasChanges() && !saving) {
          handleSave()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings, originalSettings, saving])

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
      {/* Shopify-style Floating Save Bar */}
      {hasChanges() && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-6 py-3 bg-[#0B1419]/95 backdrop-blur-md border border-[#F05B1B]/30 rounded-full shadow-2xl shadow-black/85 animate-in fade-in slide-in-from-top-4 duration-300 w-[90%] max-w-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F05B1B] animate-pulse" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Unsaved Changes</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDiscard}
              className="text-white/60 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-white/5 cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F05B1B]/20 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Live Preview Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
        <Eye className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <p className="text-blue-300/70 text-xs">
          Changes saved here appear on the <strong className="text-blue-300">live website homepage</strong>.
        </p>
      </div>

      {/* Hero Section */}
      <SectionCard
        title="Hero Section"
        description="The large banner at the top of your homepage"
        badge="Homepage Top"
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-black text-2xl leading-tight">
              {settings.heroTitle || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-[#F05B1B] text-xs mt-1 font-medium">
              {settings.heroSubtitle || <span className="text-white/20 italic">No subtitle</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-2">
              {settings.heroDescription || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="Hero Title"
              hint='Displayed as the large headline, e.g. "INFRASTRUCTURE FOR THE FUTURE"'
              value={settings.heroTitle || ''}
              onChange={e => set('heroTitle')(e.target.value)}
              placeholder="INFRASTRUCTURE FOR THE FUTURE"
            />
            <Input
              label="Subtitle / Badge Text"
              hint="Small badge above the headline"
              value={settings.heroSubtitle || ''}
              onChange={e => set('heroSubtitle')(e.target.value)}
              placeholder="Empowering Businesses"
            />
          </FieldGrid>
          <Textarea
            label="Description"
            hint="Short paragraph below the headline"
            value={settings.heroDescription || ''}
            onChange={e => set('heroDescription')(e.target.value)}
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
                value={settings.heroVideo || ''}
                onChange={set('heroVideo')}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Fallback Image</p>
              <ImageUploader
                label=""
                value={settings.heroImage || ''}
                onChange={set('heroImage')}
              />
            </div>
          </FieldGrid>
        </div>
      </SectionCard>

      {/* Company Statistics Section */}
      <SectionCard
        title="Company Statistics"
        description='Numbers displayed in the "Numbers that reflect our commitment" grid on the homepage'
        badge="Homepage Stats"
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-3">Live Preview</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Years of Excellence', value: settings.statsYearsExp || '0', suffix: '+' },
                { label: 'Projects Delivered', value: settings.statsProjects || '0', suffix: '+' },
                { label: 'Business Clients', value: settings.statsClients || '0', suffix: '+' },
                { label: 'Tech Experts', value: settings.statsExperts || '0', suffix: '+' },
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
              value={settings.statsYearsExp || ''}
              onChange={e => set('statsYearsExp')(e.target.value)}
              placeholder="10"
            />
            <Input
              label="Projects Delivered"
              hint='Shows as "150+" on the site'
              type="number"
              value={settings.statsProjects || ''}
              onChange={e => set('statsProjects')(e.target.value)}
              placeholder="150"
            />
            <Input
              label="Business Clients"
              hint='Shows as "50+" on the site'
              type="number"
              value={settings.statsClients || ''}
              onChange={e => set('statsClients')(e.target.value)}
              placeholder="50"
            />
            <Input
              label="Technology Experts"
              hint='Shows as "25+" on the site'
              type="number"
              value={settings.statsExperts || ''}
              onChange={e => set('statsExperts')(e.target.value)}
              placeholder="25"
            />
          </FieldGrid>
        </div>
      </SectionCard>

      {/* Welcome Section */}
      <SectionCard
        title="Welcome Section"
        description='Section below hero — "Who We Are" content area'
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.welcomeTitle || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-3">
              {settings.welcomeDescription || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <Input
            label="Section Title"
            value={settings.welcomeTitle || ''}
            onChange={e => set('welcomeTitle')(e.target.value)}
            placeholder="Powering Qatar's Digital Future"
          />
          <Textarea
            label="Description"
            value={settings.welcomeDescription || ''}
            onChange={e => set('welcomeDescription')(e.target.value)}
            placeholder="We are a leading enterprise IT company..."
            rows={4}
          />
          <FieldGrid cols={2}>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Section Image</p>
              <ImageUploader label="" value={settings.welcomeImage || ''} onChange={set('welcomeImage')} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Section Icon</p>
              <ImageUploader label="" value={settings.welcomeIcon || ''} onChange={set('welcomeIcon')} />
            </div>
          </FieldGrid>
        </div>
      </SectionCard>

      {/* CTA Section */}
      <SectionCard
        title="CTA Section"
        description="Bottom call-to-action section with the Doha skyline background"
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.ctaTitle || <span className="text-white/20 italic font-normal text-sm">Using default: &quot;Let&apos;s build a smarter, safer future together.&quot;</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-2">
              {settings.ctaDescription || <span className="text-white/20 italic">Using default description</span>}
            </div>
          </div>

          <Input
            label="CTA Title"
            value={settings.ctaTitle || ''}
            onChange={e => set('ctaTitle')(e.target.value)}
            placeholder="Let's build a smarter, safer future together."
          />
          <Textarea
            label="CTA Description"
            value={settings.ctaDescription || ''}
            onChange={e => set('ctaDescription')(e.target.value)}
            placeholder="Partner with Nexa Network Solutions..."
            rows={3}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
            <ImageUploader label="" value={settings.ctaBgImage || ''} onChange={set('ctaBgImage')} />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
