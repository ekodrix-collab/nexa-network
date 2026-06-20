'use client'

import { useState, useEffect } from 'react'
import ImageUploader from '@/components/admin/ImageUploader'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import { Plus, Pencil, Trash2, X, Save, Loader2, FolderKanban, Star } from 'lucide-react'
import DeleteModal from '@/components/admin/DeleteModal'

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
  imageUrl: '', tags: [], featured: true, orderIndex: 0
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [originalProject, setOriginalProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/projects', { cache: 'no-store' })
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  const openEdit = (project: Project) => {
    setEditing(project)
    setOriginalProject(JSON.parse(JSON.stringify(project)))
  }

  const openNew = () => {
    const newProject = { id: '', ...emptyProject }
    setEditing(newProject)
    setOriginalProject(JSON.parse(JSON.stringify(newProject)))
  }

  const hasChanges = () => {
    if (!editing || !originalProject) return false
    return JSON.stringify(editing) !== JSON.stringify(originalProject)
  }

  const handleDiscard = () => {
    if (originalProject) {
      setEditing(JSON.parse(JSON.stringify(originalProject)))
    }
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!editing) return
    setSaving(true)

    const payload = {
      ...editing,
      client: editing.client || '',
      description: editing.description || '',
      tags: editing.tags || [],
      featured: true
    }
    const isNew = !editing.id
    const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${editing.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setSaving(false)
    if (res.ok) {
      setEditing(null)
      setOriginalProject(null)
      fetchProjects()
    } else {
      alert('Failed to save project')
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
  }, [editing, saving, originalProject])

  const openDeleteModal = (project: Project) => {
    setProjectToDelete(project)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!projectToDelete) return
    setDeleting(true)
    const res = await fetch(`/api/admin/projects/${projectToDelete.id}`, { method: 'DELETE' })
    setDeleting(false)
    if (res.ok) {
      setDeleteModalOpen(false)
      setProjectToDelete(null)
      fetchProjects()
    } else {
      alert('Failed to delete')
    }
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
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-1.5">Project Image</p>
                    <ImageUploader label="" value={editing.imageUrl} onChange={val => setEditing({...editing, imageUrl: val})} />
                  </div>
                  <Input
                    label="Category" required
                    value={editing.category}
                    onChange={e => setEditing({...editing, category: e.target.value})}
                    placeholder="Network & Infrastructure"
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
                    label="Order / Position"
                    type="number"
                    value={editing.orderIndex.toString()}
                    onChange={e => setEditing({...editing, orderIndex: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                  {/* Featured project is enabled by default */}
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50 cursor-pointer"
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
                {project.category}
              </p>
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
                onClick={() => openDeleteModal(project)}
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
            <p className="text-white/20 text-xs mt-1">Click &quot;Add Project&quot; to create your first project</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone and will immediately remove the project from the website showcase."
        itemName={projectToDelete?.title}
        isDeleting={deleting}
      />
    </div>
  )
}
