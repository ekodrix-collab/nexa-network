'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '@/components/admin/ImageUploader'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import { Plus, Pencil, Trash2, X, Save, Loader2, FolderKanban, Star } from 'lucide-react'

type Project = {
  id: string
  title: string
  client: string
  category: string
  description: string
  imageUrl: string
  tags: string[]
  featured: boolean
  orderIndex: number
}

const emptyProject: Omit<Project, 'id'> = {
  title: '', client: '', category: '', description: '',
  imageUrl: '', tags: [], featured: false, orderIndex: 0
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [tagsText, setTagsText] = useState('')

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  const openEdit = (project: Project) => {
    setEditing(project)
    setTagsText(project.tags.join(', '))
  }

  const openNew = () => {
    setEditing({ id: '', ...emptyProject })
    setTagsText('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)

    const payload = {
      ...editing,
      tags: tagsText.split(',').map(t => t.trim()).filter(Boolean)
    }
    const isNew = !editing.id
    const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${editing.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setSaving(false)
    if (res.ok) { setEditing(null); fetchProjects() }
    else alert('Failed to save project')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) fetchProjects()
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
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setEditing(null)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <span className="text-white/15">/</span>
          <span className="text-white/60 text-sm font-medium">
            {editing.id ? `Editing: ${editing.title}` : 'New Project'}
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Project Details</h3>
                <div className="space-y-4">
                  <Input
                    label="Project Title" required
                    value={editing.title}
                    onChange={e => setEditing({...editing, title: e.target.value})}
                    placeholder="FedEx Qatar Infrastructure Upgrade"
                  />
                  <FieldGrid cols={2}>
                    <Input
                      label="Client Name" required
                      value={editing.client}
                      onChange={e => setEditing({...editing, client: e.target.value})}
                      placeholder="FedEx Qatar"
                    />
                    <Input
                      label="Category" required
                      value={editing.category}
                      onChange={e => setEditing({...editing, category: e.target.value})}
                      placeholder="Network & Infrastructure"
                    />
                  </FieldGrid>
                  <Textarea
                    label="Description" required
                    value={editing.description}
                    onChange={e => setEditing({...editing, description: e.target.value})}
                    placeholder="A comprehensive network upgrade covering..."
                    rows={4}
                  />
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">
                      Tags <span className="text-white/25 font-normal">(comma-separated)</span>
                    </label>
                    <input
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F05B1B]/50 focus:bg-white/[0.06] transition-all duration-200"
                      value={tagsText}
                      onChange={e => setTagsText(e.target.value)}
                      placeholder="Network, Fiber, Enterprise, Qatar"
                    />
                    <p className="text-white/25 text-[10px] mt-1">e.g: Network, Cloud, Cybersecurity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Order / Position"
                    type="number"
                    value={editing.orderIndex.toString()}
                    onChange={e => setEditing({...editing, orderIndex: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <p className="text-white/70 text-xs font-medium flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        Featured Project
                      </p>
                      <p className="text-white/30 text-[10px] mt-0.5">Highlighted on homepage</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing({...editing, featured: !editing.featured})}
                      className={`w-10 h-5 rounded-full transition-all duration-200 relative ${editing.featured ? 'bg-amber-500' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editing.featured ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Project Image</h3>
                <ImageUploader label="" value={editing.imageUrl} onChange={val => setEditing({...editing, imageUrl: val})} />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Project</>}
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
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase">
          {projects.length} project{projects.length !== 1 ? 's' : ''} total
        </p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-sm font-semibold transition-all shadow-lg shadow-[#F05B1B]/20"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="flex items-center gap-4 p-4 bg-[#0B1419] border border-white/[0.07] rounded-xl hover:border-white/[0.12] transition-all duration-200 group"
          >
            {/* Image */}
            <div className="w-14 h-14 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <FolderKanban className="w-5 h-5 text-white/20" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white text-sm font-semibold truncate">{project.title}</h3>
                {project.featured && (
                  <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-white/35 text-xs">
                <span className="text-[#F05B1B]">{project.client}</span>
                {project.category && <> &bull; {project.category}</>}
              </p>
              {project.tags.length > 0 && (
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] text-white/30 text-[9px] border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-white/20 text-[9px]">+{project.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(project)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white/60 hover:text-white text-xs font-medium border border-white/[0.07] transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 text-xs font-medium border border-red-500/10 hover:border-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
              <FolderKanban className="w-5 h-5 text-white/20" />
            </div>
            <p className="text-white/40 text-sm font-medium">No projects yet</p>
            <p className="text-white/20 text-xs mt-1">Click "Add Project" to create your first project</p>
          </div>
        )}
      </div>
    </div>
  )
}
