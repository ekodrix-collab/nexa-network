'use client'

import { useState, useEffect } from 'react'
import { Input, Textarea } from '@/components/admin/AdminFields'
import { Plus, Pencil, Trash2, X, Save, Loader2, Briefcase, MapPin } from 'lucide-react'
import DeleteModal from '@/components/admin/DeleteModal'

type Career = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  active: boolean
  createdAt: string
}

const emptyCareer: Omit<Career, 'id' | 'createdAt'> = {
  title: '', department: '', location: 'Doha, Qatar', type: 'Full-time', description: '', requirements: '', active: true
}

export default function CareersAdminPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [originalCareer, setOriginalCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Career | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [careerToDelete, setCareerToDelete] = useState<Career | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchCareers() }, [])

  const fetchCareers = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/careers', { cache: 'no-store' })
    const data = await res.json()
    setCareers(data)
    setLoading(false)
  }

  const openEdit = (career: Career) => {
    setEditing(career)
    setOriginalCareer(JSON.parse(JSON.stringify(career)))
  }

  const openNew = () => {
    const newCareer = { id: '', createdAt: '', ...emptyCareer }
    setEditing(newCareer as any)
    setOriginalCareer(JSON.parse(JSON.stringify(newCareer)))
  }

  const hasChanges = () => {
    if (!editing || !originalCareer) return false
    return JSON.stringify(editing) !== JSON.stringify(originalCareer)
  }

  const handleDiscard = () => {
    if (originalCareer) {
      setEditing(JSON.parse(JSON.stringify(originalCareer)))
    }
  }

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!editing) return
    setSaving(true)

    const isNew = !editing.id
    const url = isNew ? '/api/admin/careers' : `/api/admin/careers/${editing.id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing)
    })

    setSaving(false)
    if (res.ok) {
      setEditing(null)
      setOriginalCareer(null)
      fetchCareers()
    } else {
      alert('Failed to save career opening')
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
  }, [editing, saving, originalCareer])

  const openDeleteModal = (career: Career) => {
    setCareerToDelete(career)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!careerToDelete) return
    setDeleting(true)
    const res = await fetch(`/api/admin/careers/${careerToDelete.id}`, { method: 'DELETE' })
    setDeleting(false)
    if (res.ok) {
      setDeleteModalOpen(false)
      setCareerToDelete(null)
      fetchCareers()
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
            type="button"
            onClick={() => setEditing(null)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <span className="text-white/15">/</span>
          <span className="text-white/60 text-sm font-medium">
            {editing.id ? `Editing: ${editing.title}` : 'New Career Opening'}
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Opening Details</h3>
                <div className="space-y-4">
                  <Input
                    label="Job Title" required
                    value={editing.title}
                    onChange={e => setEditing({...editing, title: e.target.value})}
                    placeholder="E.g., Senior Systems Integrator"
                  />
                  <Input
                    label="Department / Category" required
                    value={editing.department}
                    onChange={e => setEditing({...editing, department: e.target.value})}
                    placeholder="E.g., IT Engineering"
                  />
                  <Input
                    label="Location" required
                    value={editing.location}
                    onChange={e => setEditing({...editing, location: e.target.value})}
                    placeholder="E.g., Doha, Qatar"
                  />
                  <Input
                    label="Job Type" required
                    value={editing.type}
                    onChange={e => setEditing({...editing, type: e.target.value})}
                    placeholder="E.g., Full-time, Contract"
                  />
                  <Textarea
                    label="Job Description" required
                    value={editing.description}
                    onChange={e => setEditing({...editing, description: e.target.value})}
                    placeholder="Brief outline of the job role..."
                    rows={4}
                  />
                  <Textarea
                    label="Requirements" required
                    value={editing.requirements}
                    onChange={e => setEditing({...editing, requirements: e.target.value})}
                    placeholder="Requirements and qualifications (one per line recommended)..."
                    rows={6}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#0B1419] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4 pb-3 border-b border-white/[0.06]">Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <p className="text-white/70 text-xs font-medium flex items-center gap-1.5">
                        Active Opening
                      </p>
                      <p className="text-white/30 text-[10px] mt-0.5">Show this job on the website</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing({...editing, active: !editing.active})}
                      className={`w-10 h-5 rounded-full transition-all duration-200 relative ${editing.active ? 'bg-emerald-500' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${editing.active ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20 disabled:opacity-50 cursor-pointer"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Opening</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase">
          {careers.length} job opening{careers.length !== 1 ? 's' : ''} total
        </p>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] text-white text-sm font-semibold transition-all shadow-lg shadow-[#F05B1B]/20"
        >
          <Plus className="w-4 h-4" />
          Add Job Opening
        </button>
      </div>

      <div className="space-y-3">
        {careers.map(career => (
          <div
            key={career.id}
            className="flex items-center gap-4 p-4 bg-[#0B1419] border border-white/[0.07] rounded-xl hover:border-white/[0.12] transition-all duration-200 group"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-white/20" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white text-sm font-semibold truncate">{career.title}</h3>
                {!career.active && (
                  <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 font-bold uppercase">Inactive</span>
                )}
              </div>
              <p className="text-white/35 text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F05B1B] flex-shrink-0" />
                {career.location} &bull; {career.type} &bull; {career.department}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(career)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white/60 hover:text-white text-xs font-medium border border-white/[0.07] transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(career)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 text-xs font-medium border border-red-500/10 hover:border-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {careers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5 text-white/20" />
            </div>
            <p className="text-white/40 text-sm font-medium">No job openings yet</p>
            <p className="text-white/20 text-xs mt-1">Click "Add Job Opening" to list your first vacancy</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Career Opening"
        message="Are you sure you want to delete this career opening? This action cannot be undone and will immediately remove the listing from the careers page."
        itemName={careerToDelete?.title}
        isDeleting={deleting}
      />
    </div>
  )
}
