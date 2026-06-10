'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '@/components/admin/ImageUploader'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import {
  Plus, Pencil, Trash2, X, Save, Loader2, ChevronDown, ChevronUp,
  Eye, EyeOff, Briefcase
} from 'lucide-react'

type Service = {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  imageUrl: string | null
  features: string[]
  orderIndex: number
  active: boolean
}

const emptyService: Omit<Service, 'id'> = {
  title: '', subtitle: '', description: '', icon: '',
  imageUrl: '', features: [], orderIndex: 0, active: true
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [saving, setSaving] = useState(false)
  const [featuresText, setFeaturesText] = useState('')

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }

  const openEdit = (service: Service) => {
    setEditing(service)
    setFeaturesText(service.features.join('\n'))
  }

  const openNew = () => {
    setEditing({ id: '', ...emptyService })
    setFeaturesText('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)

    const payload = { ...editing, features: featuresText.split('\n').filter(f => f.trim()) }
    const isNew = !editing.id
    const url = isNew ? '/api/admin/services' : `/api/admin/services/${editing.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setSaving(false)
    if (res.ok) { setEditing(null); fetchServices() }
    else alert('Failed to save service')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return
    const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    if (res.ok) fetchServices()
    else alert('Failed to delete')
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="h-20 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  // ── Edit Form ──────────────────────────────────
  if (editing) {
    return (
      <div>
        {/* Back bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <span className="text-white/15">/</span>
            <span className="text-white/60 text-sm font-medium">
              {editing.id ? `Editing: ${editing.title}` : 'New Service'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Service Details</h3>
                <div className="space-y-4">
                  <FieldGrid cols={2}>
                    <Input
                      label="Title" required
                      value={editing.title}
                      onChange={e => setEditing({...editing, title: e.target.value})}
                      placeholder="Network Infrastructure"
                    />
                    <Input
                      label="Subtitle" required
                      value={editing.subtitle}
                      onChange={e => setEditing({...editing, subtitle: e.target.value})}
                      placeholder="Enterprise-grade networking"
                    />
                  </FieldGrid>
                  <Textarea
                    label="Description" required
                    value={editing.description}
                    onChange={e => setEditing({...editing, description: e.target.value})}
                    placeholder="Detailed service description shown on the services page..."
                    rows={4}
                  />
                  <Textarea
                    label="Features / Bullet Points"
                    hint="One feature per line — displayed as bullet points on the service card"
                    value={featuresText}
                    onChange={e => setFeaturesText(e.target.value)}
                    placeholder={"24/7 Network Monitoring\nRedundant Architecture\nFiber & Wireless Solutions"}
                    rows={5}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Icon Name"
                    hint="Lucide icon name, e.g. Shield, Network, Cloud"
                    value={editing.icon}
                    onChange={e => setEditing({...editing, icon: e.target.value})}
                    placeholder="Network"
                  />
                  <Input
                    label="Order / Position"
                    type="number"
                    value={editing.orderIndex.toString()}
                    onChange={e => setEditing({...editing, orderIndex: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <p className="text-white/70 text-xs font-medium">Active / Visible</p>
                      <p className="text-white/30 text-[10px] mt-0.5">Show on website</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing({...editing, active: !editing.active})}
                      className={`w-10 h-5 rounded-full transition-all duration-200 relative ${editing.active ? 'bg-[#F05B1B]' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editing.active ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Service Image</h3>
                <ImageUploader label="" value={editing.imageUrl || ''} onChange={val => setEditing({...editing, imageUrl: val})} />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Service</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // ── List View ──────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-1">
            {services.length} service{services.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-sm font-semibold transition-all shadow-lg shadow-[#F05B1B]/20"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {services.map(service => (
          <div
            key={service.id}
            className="flex items-center gap-4 p-4 bg-[#0B1419] border border-white/[0.07] rounded-xl hover:border-white/[0.12] transition-all duration-200 group"
          >
            {/* Image / Icon */}
            <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {service.imageUrl ? (
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <Briefcase className="w-5 h-5 text-white/20" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white text-sm font-semibold truncate">{service.title}</h3>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border flex-shrink-0 ${
                  service.active
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-white/5 text-white/25 border-white/10'
                }`}>
                  {service.active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="text-white/35 text-xs truncate">{service.subtitle}</p>
              {service.features.length > 0 && (
                <p className="text-white/20 text-[10px] mt-0.5">{service.features.length} feature{service.features.length !== 1 ? 's' : ''}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(service)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white/60 hover:text-white text-xs font-medium border border-white/[0.07] transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 text-xs font-medium border border-red-500/10 hover:border-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5 text-white/20" />
            </div>
            <p className="text-white/40 text-sm font-medium">No services yet</p>
            <p className="text-white/20 text-xs mt-1">Click "Add Service" to create your first service</p>
          </div>
        )}
      </div>
    </div>
  )
}
