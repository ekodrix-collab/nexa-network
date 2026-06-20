'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X, Trash2 } from 'lucide-react'

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
}

const isVideo = (url: string) => {
  if (!url) return false
  const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase()
  return (
    cleanUrl.endsWith('.mp4') || 
    cleanUrl.endsWith('.webm') || 
    cleanUrl.endsWith('.ogg') || 
    cleanUrl.endsWith('.mov') ||
    url.includes('/videos/')
  )
}

export default function ImageUploader({ label, value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'url' | 'upload'>('url')
  const [previewError, setPreviewError] = useState(false)
  const [isFullView, setIsFullView] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Track mount state for React Portal rendering on client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFullView) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFullView])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    setUploading(true)
    setPreviewError(false)
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

  const handleValueChange = (newVal: string) => {
    setPreviewError(false)
    onChange(newVal)
  }

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>}
      <div className="flex gap-4 mb-2">
        <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">
          <input 
            type="radio" 
            checked={mode === 'url'} 
            onChange={() => setMode('url')} 
            className="accent-[#F05B1B]"
          />
          Enter URL
        </label>
        <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">
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
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder="https://... or /images/..."
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
        <div className="mt-3 p-3 rounded bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs text-white/40 truncate select-all" title={value}>
              Current: {value}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsFullView(true)}
                className="text-xs text-[#F05B1B] hover:text-[#FF7D44] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" /> View Full Size
              </button>
              <span className="text-white/10 text-xs">|</span>
              <button
                type="button"
                onClick={() => handleValueChange('')}
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
          
          <div className="relative rounded overflow-hidden border border-white/10 bg-black/40 aspect-video flex items-center justify-center max-w-xs group">
            {previewError ? (
              <div className="text-center p-4">
                <span className="text-[11px] text-white/40">No preview available (File not found or invalid URL)</span>
              </div>
            ) : (
              <>
                {isVideo(value) ? (
                  <video
                    src={value}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                    onError={() => setPreviewError(true)}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-contain cursor-zoom-in"
                    onClick={() => setIsFullView(true)}
                    onError={() => setPreviewError(true)}
                  />
                )}

                {/* Display Full View Hover Icon with Tooltip */}
                <div className="absolute top-2 right-2 z-10 group/btn">
                  <button
                    type="button"
                    onClick={() => setIsFullView(true)}
                    className="p-1.5 rounded bg-black/60 text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-md border border-white/10 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute right-0 bottom-full mb-1.5 w-max px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-opacity duration-150 shadow-lg border border-white/10 whitespace-nowrap">
                    Display Full View
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Full Size Modal View (Rendered via Portal at document.body) */}
      {isFullView && value && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsFullView(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFullView(false)}
              className="absolute top-4 right-4 z-[10000] p-2 bg-white/10 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors flex items-center justify-center cursor-pointer shadow border border-white/10"
              title="Close Full View"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content (fits perfectly in viewport) */}
            {isVideo(value) ? (
              <video
                src={value}
                controls
                autoPlay
                className="max-w-full max-h-full rounded object-contain select-none"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={value}
                alt="Full preview"
                className="max-w-full max-h-full rounded object-contain select-none"
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

