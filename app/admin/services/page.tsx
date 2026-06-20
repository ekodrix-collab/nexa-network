'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '@/components/admin/ImageUploader'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import {
  Plus, Pencil, Trash2, X, Save, Loader2, Briefcase, Eye, EyeOff,
  Sliders, Layout, Users, HelpCircle
} from 'lucide-react'
import DeleteModal from '@/components/admin/DeleteModal'

type Service = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  imageUrl: string | null
  features: string[]
  orderIndex: number
  active: boolean

  // Service Detail Page custom fields
  heroTitle: string | null
  heroHighlight: string | null
  heroDescription: string | null
  heroImage: string | null
  stats: { value: string; label: string }[] | null
  overviewTitle: string | null
  overviewDescription: string | null
  overviewImage: string | null
  partners: { name: string; imageUrl: string }[] | null
  projects: { category: string; title: string; description: string; image: string; link: string }[] | null
  faqs: { question: string; answer: string }[] | null
}

const emptyService: Omit<Service, 'id'> = {
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  icon: '',
  imageUrl: '',
  features: [],
  orderIndex: 0,
  active: true,
  heroTitle: '',
  heroHighlight: '',
  heroDescription: '',
  heroImage: '',
  stats: [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ],
  overviewTitle: '',
  overviewDescription: '',
  overviewImage: '',
  partners: [
    { name: '', imageUrl: '' },
    { name: '', imageUrl: '' },
    { name: '', imageUrl: '' },
    { name: '', imageUrl: '' },
    { name: '', imageUrl: '' },
    { name: '', imageUrl: '' }
  ],
  projects: [
    { category: '', title: '', description: '', image: '', link: '#' },
    { category: '', title: '', description: '', image: '', link: '#' },
    { category: '', title: '', description: '', image: '', link: '#' }
  ],
  faqs: []
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [originalService, setOriginalService] = useState<Service | null>(null)
  const [saving, setSaving] = useState(false)
  const [featuresText, setFeaturesText] = useState('')
  const [originalFeaturesText, setOriginalFeaturesText] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'hero-overview' | 'partners' | 'projects' | 'faqs'>('general')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/services', { cache: 'no-store' })
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }

  const openEdit = (service: Service) => {
    // Fill up empty spaces for nested fields if they are missing
    const filledService = {
      ...service,
      stats: service.stats && service.stats.length === 4 
        ? service.stats 
        : [
            { value: '', label: '' },
            { value: '', label: '' },
            { value: '', label: '' },
            { value: '', label: '' }
          ],
      partners: service.partners && service.partners.length === 6
        ? service.partners
        : Array.from({ length: 6 }).map((_, i) => (service.partners && service.partners[i]) || { name: '', imageUrl: '' }),
      projects: service.projects && service.projects.length === 3
        ? service.projects
        : Array.from({ length: 3 }).map((_, i) => (service.projects && service.projects[i]) || { category: '', title: '', description: '', image: '', link: '#' }),
      faqs: service.faqs || []
    }
    setEditing(filledService)
    setOriginalService(JSON.parse(JSON.stringify(filledService)))
    setFeaturesText(service.features.join('\n'))
    setOriginalFeaturesText(service.features.join('\n'))
    setActiveTab('general')
  }

  const openNew = () => {
    const newService = { id: '', ...emptyService }
    setEditing(newService)
    setOriginalService(JSON.parse(JSON.stringify(newService)))
    setFeaturesText('')
    setOriginalFeaturesText('')
    setActiveTab('general')
  }

  const hasChanges = () => {
    if (!editing || !originalService) return false
    if (featuresText !== originalFeaturesText) return true
    
    const current = { ...editing, features: [] }
    const original = { ...originalService, features: [] }
    return JSON.stringify(current) !== JSON.stringify(original)
  }

  const handleDiscard = () => {
    if (originalService) {
      setEditing(JSON.parse(JSON.stringify(originalService)))
      setFeaturesText(originalFeaturesText)
    }
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!editing) return
    setSaving(true)

    const payload = {
      ...editing,
      features: featuresText.split('\n').filter(f => f.trim())
    }
    
    const isNew = !editing.id
    const url = isNew ? '/api/admin/services' : `/api/admin/services/${editing.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setSaving(false)
    if (res.ok) {
      setEditing(null)
      setOriginalService(null)
      setOriginalFeaturesText('')
      fetchServices()
    } else {
      alert('Failed to save service')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (editing && hasChanges() && !saving) {
          handleSave()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editing, featuresText, originalFeaturesText, originalService, saving])

  const openDeleteModal = (service: Service) => {
    setServiceToDelete(service)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return
    setDeleting(true)
    const res = await fetch(`/api/admin/services/${serviceToDelete.id}`, { method: 'DELETE' })
    setDeleting(false)
    if (res.ok) {
      setDeleteModalOpen(false)
      setServiceToDelete(null)
      fetchServices()
    } else {
      alert('Failed to delete')
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  // ── Edit Form ──────────────────────────────────
  if (editing) {
    return (
      <div className="relative pb-16">
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
                onClick={() => handleSave()}
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

        {/* Sticky Header Action Bar (Shopify style) */}
        <div className="sticky top-0 z-30 bg-[#070f12]/90 backdrop-blur-md py-4 border-b border-white/[0.08] flex items-center justify-between mb-6 -mx-6 px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="flex items-center gap-1.5 text-white/50 hover:text-white hover:bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <span className="text-white/10 text-sm">/</span>
            <span className="text-white/80 text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">
              {editing.id ? `Editing: ${editing.title}` : 'New Service'}
            </span>
          </div>
        </div>

        {/* Tab Buttons with Icons */}
        <div className="flex border-b border-white/[0.08] mb-6 gap-2 overflow-x-auto pb-1">
          {[
            { id: 'general', label: 'General', icon: Sliders },
            { id: 'hero-overview', label: 'Hero & Overview', icon: Layout },
            { id: 'partners', label: 'Partners', icon: Users },
            { id: 'projects', label: 'Featured Projects', icon: Briefcase },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#F05B1B] text-white bg-white/[0.02]'
                    : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.01]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Tabs Area */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* GENERAL TAB */}
              {activeTab === 'general' && (
                <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5 space-y-4">
                  <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06]">General Settings</h3>
                  <FieldGrid cols={2}>
                    <Input
                      label="Title" required
                      value={editing.title}
                      onChange={e => {
                        const newTitle = e.target.value;
                        const newSlug = !editing.id ? slugify(newTitle) : editing.slug;
                        setEditing({ ...editing, title: newTitle, slug: newSlug });
                      }}
                      placeholder="Network Infrastructure"
                    />
                    <Input
                      label="URL Slug" required
                      value={editing.slug}
                      onChange={e => setEditing({ ...editing, slug: slugify(e.target.value) })}
                      placeholder="network-infrastructure"
                      hint="URL-friendly identifier"
                    />
                  </FieldGrid>
                  <Input
                    label="List Card Subtitle" required
                    value={editing.subtitle}
                    onChange={e => setEditing({ ...editing, subtitle: e.target.value })}
                    placeholder="Enterprise-grade networking"
                  />
                  <Textarea
                    label="List Card Description" required
                    value={editing.description}
                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Short description displayed on card listing..."
                    rows={3}
                  />
                  <Textarea
                    label="List Card Bullet Points / Features"
                    hint="One feature per line — displayed as bullet points on the service card and overview list"
                    value={featuresText}
                    onChange={e => setFeaturesText(e.target.value)}
                    placeholder={"Structured Cabling (Cat6/Cat6a/Fiber)\nEnterprise WiFi Solutions"}
                    rows={6}
                  />
                </div>
              )}

              {/* HERO & OVERVIEW TAB */}
              {activeTab === 'hero-overview' && (
                <div className="space-y-4">
                  {/* Hero Settings */}
                  <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5 space-y-4">
                    <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06]">Hero Section</h3>
                    <FieldGrid cols={2}>
                      <Input
                        label="Hero Title"
                        value={editing.heroTitle || ''}
                        onChange={e => setEditing({ ...editing, heroTitle: e.target.value })}
                        placeholder="Network Infrastructure &"
                      />
                      <Input
                        label="Hero Title Highlight"
                        value={editing.heroHighlight || ''}
                        onChange={e => setEditing({ ...editing, heroHighlight: e.target.value })}
                        placeholder="Passive Infrastructure"
                        hint="Renders in orange color"
                      />
                    </FieldGrid>
                    <Textarea
                      label="Hero Description"
                      value={editing.heroDescription || ''}
                      onChange={e => setEditing({ ...editing, heroDescription: e.target.value })}
                      placeholder="Detailed hero description..."
                      rows={3}
                    />
                    <ImageUploader
                      label="Hero Image"
                      value={editing.heroImage || ''}
                      onChange={val => setEditing({ ...editing, heroImage: val })}
                    />
                  </div>

                  {/* Statistics */}
                  <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                    <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06] mb-4">Hero Stat Bar (Exactly 4 Stats)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, idx) => {
                        const stat = (editing.stats && editing.stats[idx]) || { value: '', label: '' };
                        return (
                          <div key={idx} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                            <p className="text-white/40 text-[10px] font-bold uppercase">Stat {idx + 1}</p>
                            <FieldGrid cols={2}>
                              <Input
                                label="Value"
                                value={stat.value}
                                onChange={e => {
                                  const newStats = [...(editing.stats || [])];
                                  newStats[idx] = { ...newStats[idx], value: e.target.value };
                                  setEditing({ ...editing, stats: newStats });
                                }}
                                placeholder="10+ or 99.9%"
                              />
                              <Input
                                label="Label"
                                value={stat.label}
                                onChange={e => {
                                  const newStats = [...(editing.stats || [])];
                                  newStats[idx] = { ...newStats[idx], label: e.target.value };
                                  setEditing({ ...editing, stats: newStats });
                                }}
                                placeholder="Years Experience"
                              />
                            </FieldGrid>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Overview Settings */}
                  <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5 space-y-4">
                    <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06]">Overview Section</h3>
                    <Input
                      label="Overview Title"
                      value={editing.overviewTitle || ''}
                      onChange={e => setEditing({ ...editing, overviewTitle: e.target.value })}
                      placeholder="Secure & Scalable Network Infrastructure Solutions"
                    />
                    <Textarea
                      label="Overview Description"
                      value={editing.overviewDescription || ''}
                      onChange={e => setEditing({ ...editing, overviewDescription: e.target.value })}
                      placeholder="Detailed overview description..."
                      rows={4}
                    />
                    <ImageUploader
                      label="Overview Image"
                      value={editing.overviewImage || ''}
                      onChange={val => setEditing({ ...editing, overviewImage: val })}
                    />
                  </div>
                </div>
              )}

              {/* PARTNERS TAB */}
              {activeTab === 'partners' && (
                <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06] mb-4">Technology Partners (Up to 6)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => {
                      const partner = (editing.partners && editing.partners[idx]) || { name: '', imageUrl: '' };
                      return (
                        <div key={idx} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                          <p className="text-white/40 text-[10px] font-bold uppercase">Partner {idx + 1}</p>
                          <Input
                            label="Partner Name"
                            value={partner.name}
                            onChange={e => {
                              const newPartners = [...(editing.partners || [])];
                              newPartners[idx] = { ...newPartners[idx], name: e.target.value };
                              setEditing({ ...editing, partners: newPartners });
                            }}
                            placeholder="e.g. CISCO"
                          />
                          <ImageUploader
                            label="Logo Image"
                            value={partner.imageUrl}
                            onChange={val => {
                              const newPartners = [...(editing.partners || [])];
                              newPartners[idx] = { ...newPartners[idx], imageUrl: val };
                              setEditing({ ...editing, partners: newPartners });
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* FEATURED PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06] mb-4">Featured Projects (Exactly 3)</h3>
                  <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const project = (editing.projects && editing.projects[idx]) || { category: '', title: '', description: '', image: '', link: '#' };
                      return (
                        <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3">
                          <p className="text-[#F05B1B] text-xs font-bold uppercase">Project {idx + 1}</p>
                          <FieldGrid cols={2}>
                            <Input
                              label="Category"
                              value={project.category}
                              onChange={e => {
                                const newProjects = [...(editing.projects || [])];
                                newProjects[idx] = { ...newProjects[idx], category: e.target.value };
                                setEditing({ ...editing, projects: newProjects });
                              }}
                              placeholder="e.g. Data Center Infrastructure"
                            />
                            <Input
                              label="Title"
                              value={project.title}
                              onChange={e => {
                                const newProjects = [...(editing.projects || [])];
                                newProjects[idx] = { ...newProjects[idx], title: e.target.value };
                                setEditing({ ...editing, projects: newProjects });
                              }}
                              placeholder="Project Title"
                            />
                          </FieldGrid>
                          <div>
                            <Textarea
                              label="Description (Suggest max 2 lines / 120 chars)"
                              value={project.description}
                              onChange={e => {
                                const newProjects = [...(editing.projects || [])];
                                newProjects[idx] = { ...newProjects[idx], description: e.target.value };
                                setEditing({ ...editing, projects: newProjects });
                              }}
                              placeholder="Successfully migrated legacy servers..."
                              rows={2}
                            />
                            {project.description && project.description.length > 120 && (
                              <p className="text-amber-500 text-[10px] mt-1 font-medium">⚠️ Description is a bit long and might exceed 2 lines in the UI grid. Keep it concise.</p>
                            )}
                          </div>
                          <FieldGrid cols={2}>
                            <Input
                              label="Case Study Link"
                              value={project.link}
                              onChange={e => {
                                const newProjects = [...(editing.projects || [])];
                                newProjects[idx] = { ...newProjects[idx], link: e.target.value };
                                setEditing({ ...editing, projects: newProjects });
                              }}
                              placeholder="#"
                            />
                            <ImageUploader
                              label="Project Card Image"
                              value={project.image}
                              onChange={val => {
                                const newProjects = [...(editing.projects || [])];
                                newProjects[idx] = { ...newProjects[idx], image: val };
                                setEditing({ ...editing, projects: newProjects });
                              }}
                            />
                          </FieldGrid>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* FAQS TAB */}
              {activeTab === 'faqs' && (
                <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06] mb-4">Frequently Asked Questions (Max 5)</h3>

                  <div className="space-y-4">
                    {(editing.faqs || []).map((faq, idx) => (
                      <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3 relative">
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = (editing.faqs || []).filter((_, i) => i !== idx);
                            setEditing({ ...editing, faqs: newFaqs });
                          }}
                          className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-white/40 text-[10px] font-bold uppercase">FAQ #{idx + 1}</p>
                        <Input
                          label="Question" required
                          value={faq.question}
                          onChange={e => {
                            const newFaqs = [...(editing.faqs || [])];
                            newFaqs[idx] = { ...newFaqs[idx], question: e.target.value };
                            setEditing({ ...editing, faqs: newFaqs });
                          }}
                          placeholder="What is the difference between active and passive?"
                        />
                        <Textarea
                          label="Answer" required
                          value={faq.answer}
                          onChange={e => {
                            const newFaqs = [...(editing.faqs || [])];
                            newFaqs[idx] = { ...newFaqs[idx], answer: e.target.value };
                            setEditing({ ...editing, faqs: newFaqs });
                          }}
                          placeholder="Passive infrastructure includes non-electronic components..."
                          rows={3}
                        />
                      </div>
                    ))}

                    {/* Bottom Add FAQ Button (SaaS/Shopify standard) */}
                    {(editing.faqs || []).length < 5 ? (
                      <button
                        type="button"
                        onClick={() => {
                          const newFaqs = [...(editing.faqs || [])];
                          newFaqs.push({ question: '', answer: '' });
                          setEditing({ ...editing, faqs: newFaqs });
                          setTimeout(() => {
                            window.scrollBy({ top: 300, behavior: 'smooth' });
                          }, 50);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-dashed border-white/10 hover:border-[#F05B1B]/40 hover:bg-[#F05B1B]/5 text-white/60 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#F05B1B]" /> Add FAQ ({(editing.faqs || []).length}/5)
                      </button>
                    ) : (
                      <div className="text-center py-2 text-white/20 text-xs">
                        Maximum limit of 5 FAQs reached.
                      </div>
                    )}

                    {(editing.faqs || []).length === 0 && (
                      <div className="text-center py-8 text-white/30 text-xs">
                        No FAQs configured. Local fallback FAQs will be used.
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/[0.06] flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSave()}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50 cursor-pointer"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar (Always visible) */}
            <div className="space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Icon Name"
                    hint="Lucide icon name, e.g. Shield, Network, Cloud, Brain, Phone"
                    value={editing.icon}
                    onChange={e => setEditing({ ...editing, icon: e.target.value })}
                    placeholder="Network"
                  />
                  <Input
                    label="Order / Position"
                    type="number"
                    value={editing.orderIndex.toString()}
                    onChange={e => setEditing({ ...editing, orderIndex: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <p className="text-white/70 text-xs font-medium">Active / Visible</p>
                      <p className="text-white/30 text-[10px] mt-0.5">Show on website</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, active: !editing.active })}
                      className={`w-10 h-5 rounded-full transition-all duration-200 relative cursor-pointer ${editing.active ? 'bg-[#F05B1B]' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editing.active ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Service Card Thumbnail</h3>
                <ImageUploader label="" value={editing.imageUrl || ''} onChange={val => setEditing({ ...editing, imageUrl: val })} />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Service
                  </>
                )}
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-sm font-semibold transition-all shadow-lg shadow-[#F05B1B]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Service
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
              <p className="text-white/35 text-xs truncate">{service.subtitle || service.description}</p>
              <div className="flex items-center gap-3 mt-1 text-white/20 text-[9px]">
                <span>Slug: {service.slug}</span>
                <span>•</span>
                <span>{service.features.length} feature{service.features.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(service)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white/60 hover:text-white text-xs font-medium border border-white/[0.07] transition-all cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => openDeleteModal(service)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 text-xs font-medium border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
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
            <p className="text-white/20 text-xs mt-1">Click &quot;Add Service&quot; to create your first service</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone and will immediately remove the service and all its detail content from the website."
        itemName={serviceToDelete?.title}
        isDeleting={deleting}
      />
    </div>
  )
}
