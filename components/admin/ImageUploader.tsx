'use client'

import { useState } from 'react'

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export default function ImageUploader({ label, value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'url' | 'upload'>('url')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok && data.url) {
        onChange(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
      <div className="flex gap-4 mb-2">
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input 
            type="radio" 
            checked={mode === 'url'} 
            onChange={() => setMode('url')} 
            className="accent-[#F05B1B]"
          />
          Enter URL
        </label>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input 
            type="radio" 
            checked={mode === 'upload'} 
            onChange={() => setMode('upload')} 
            className="accent-[#F05B1B]"
          />
          Upload File
        </label>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-[#F05B1B] transition-colors"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
        />
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            disabled={uploading}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:border-[#F05B1B] transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#F05B1B] file:text-white hover:file:bg-[#FF7D44]"
          />
          {uploading && <span className="absolute right-4 top-2 text-sm text-[#F05B1B] animate-pulse">Uploading...</span>}
        </div>
      )}
      
      {value && (
        <div className="mt-2 text-xs text-white/50">Current: {value}</div>
      )}
    </div>
  )
}
