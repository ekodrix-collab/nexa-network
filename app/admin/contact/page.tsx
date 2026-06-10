'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye, Mail, Phone, MapPin, Share2 } from 'lucide-react'

const ALL_KEYS = [
  'contact_title', 'contact_description', 'contact_bg_image', 'contact_banner_image',
  'contact_email1', 'contact_email2', 'contact_phone1', 'contact_phone2',
  'contact_address', 'contact_facebook', 'contact_twitter', 'contact_linkedin', 'contact_instagram'
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

export default function ContactAdminPage() {
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
          <div key={i} className="h-40 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Info Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
        <Eye className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
        <p className="text-rose-300/70 text-xs">
          Contact details appear on the <strong className="text-rose-300">Contact page</strong> and in the site footer.
        </p>
      </div>

      {/* Page Header */}
      <SectionCard
        title="Page Header"
        description="Title, description and images shown at the top of the Contact page"
        onSave={() => saveSection(['contact_title','contact_description','contact_bg_image','contact_banner_image'], settings)}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.contact_title || <span className="text-white/20 italic font-normal text-sm">No title set — using default</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-2">
              {settings.contact_description || <span className="text-white/20 italic">No description set</span>}
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="Page Title"
              value={settings.contact_title || ''}
              onChange={e => set('contact_title')(e.target.value)}
              placeholder="Get In Touch"
            />
            <div className="col-span-1" />
          </FieldGrid>
          <Textarea
            label="Description"
            value={settings.contact_description || ''}
            onChange={e => set('contact_description')(e.target.value)}
            placeholder="We're here to help you with any queries..."
            rows={3}
          />
          <FieldGrid cols={2}>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
              <ImageUploader label="" value={settings.contact_bg_image || ''} onChange={set('contact_bg_image')} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Banner Image</p>
              <ImageUploader label="" value={settings.contact_banner_image || ''} onChange={set('contact_banner_image')} />
            </div>
          </FieldGrid>
        </div>
      </SectionCard>

      {/* Contact Details */}
      <SectionCard
        title="Contact Details"
        description="Phone numbers, email addresses and office address"
        onSave={() => saveSection(['contact_email1','contact_email2','contact_phone1','contact_phone2','contact_address'], settings)}
      >
        <div className="space-y-4">
          {/* Quick Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-3">Live Preview</p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-3 h-3 text-[#F05B1B]" />
                <span className="truncate">{settings.contact_email1 || 'info@nexa.com.qa'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Phone className="w-3 h-3 text-[#F05B1B]" />
                <span>{settings.contact_phone1 || '+974 4145 9393'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-3 h-3 text-[#F05B1B]" />
                <span className="truncate">{settings.contact_address ? settings.contact_address.split('\n')[0] : 'Doha, Qatar'}</span>
              </div>
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="Primary Email"
              type="email"
              value={settings.contact_email1 || ''}
              onChange={e => set('contact_email1')(e.target.value)}
              placeholder="info@nexa.com.qa"
            />
            <Input
              label="Secondary Email"
              type="email"
              value={settings.contact_email2 || ''}
              onChange={e => set('contact_email2')(e.target.value)}
              placeholder="support@nexa.com.qa"
            />
            <Input
              label="Primary Phone"
              value={settings.contact_phone1 || ''}
              onChange={e => set('contact_phone1')(e.target.value)}
              placeholder="+974 4145 9393"
            />
            <Input
              label="Secondary Phone"
              value={settings.contact_phone2 || ''}
              onChange={e => set('contact_phone2')(e.target.value)}
              placeholder="+974 5555 1234"
            />
          </FieldGrid>
          <Textarea
            label="Office Address"
            hint="Full address shown on the contact page and map"
            value={settings.contact_address || ''}
            onChange={e => set('contact_address')(e.target.value)}
            placeholder="Zone 55, Street 850, Building 67&#10;Al Rayyan, Doha, Qatar"
            rows={3}
          />
        </div>
      </SectionCard>

      {/* Social Media */}
      <SectionCard
        title="Social Media Links"
        description="URLs for your social media profiles shown in the footer and contact page"
        onSave={() => saveSection(['contact_facebook','contact_twitter','contact_linkedin','contact_instagram'], settings)}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Active Links</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'contact_linkedin', label: 'LinkedIn' },
                { key: 'contact_twitter', label: 'Twitter/X' },
                { key: 'contact_facebook', label: 'Facebook' },
                { key: 'contact_instagram', label: 'Instagram' },
              ].map(({ key, label }) => (
                <span key={key} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${settings[key] ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/25 border-white/10'}`}>
                  {label}: {settings[key] ? '✓ Set' : 'Not set'}
                </span>
              ))}
            </div>
          </div>

          <FieldGrid cols={2}>
            <Input
              label="LinkedIn URL"
              value={settings.contact_linkedin || ''}
              onChange={e => set('contact_linkedin')(e.target.value)}
              placeholder="https://linkedin.com/company/nexa"
            />
            <Input
              label="Twitter / X URL"
              value={settings.contact_twitter || ''}
              onChange={e => set('contact_twitter')(e.target.value)}
              placeholder="https://twitter.com/nexaqatar"
            />
            <Input
              label="Facebook URL"
              value={settings.contact_facebook || ''}
              onChange={e => set('contact_facebook')(e.target.value)}
              placeholder="https://facebook.com/nexaqatar"
            />
            <Input
              label="Instagram URL"
              value={settings.contact_instagram || ''}
              onChange={e => set('contact_instagram')(e.target.value)}
              placeholder="https://instagram.com/nexaqatar"
            />
          </FieldGrid>
        </div>
      </SectionCard>
    </div>
  )
}
