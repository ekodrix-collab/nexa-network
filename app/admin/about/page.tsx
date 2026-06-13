'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye } from 'lucide-react'

async function savePageContent(data: any) {
  const res = await fetch('/api/admin/settings?page=about', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to save')
}

export default function AboutAdminPage() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/settings?page=about')
      .then(res => res.json())
      .then(data => { setSettings(data); setLoading(false) })
  }, [])

  const set = (key: string) => (value: any) =>
    setSettings((prev: any) => ({ ...prev, [key]: value }))

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
      {/* Page Content Section */}
      <SectionCard
        title="About Page Content"
        description="Title, description text and background image for the About page"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-4">
          {/* Live Preview */}
          <div className="p-4 rounded-lg bg-[#0D1C22] border border-white/[0.06] mb-2">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">Live Preview</p>
            <div className="text-white font-bold text-base">
              {settings.title || <span className="text-white/20 italic font-normal text-sm">No title set</span>}
            </div>
            <div className="text-white/50 text-xs mt-1 line-clamp-3">
              {settings.description || <span className="text-white/20 italic">No description</span>}
            </div>
          </div>

          <Input
            label="Page Title"
            value={settings.title || ''}
            onChange={e => set('title')(e.target.value)}
            placeholder="About Nexa Network Solutions"
          />
          <Textarea
            label="Description"
            value={settings.description || ''}
            onChange={e => set('description')(e.target.value)}
            placeholder="We are Qatar's leading enterprise IT company..."
            rows={4}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
            <ImageUploader label="" value={settings.bgImage || ''} onChange={set('bgImage')} />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
