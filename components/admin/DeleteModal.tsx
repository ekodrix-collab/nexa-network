'use client'

import React, { useEffect } from 'react'
import { Trash2, X, Loader2 } from 'lucide-react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName?: string
  isDeleting?: boolean
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isDeleting = false,
}: DeleteModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, isDeleting])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060D10]/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={!isDeleting ? onClose : undefined}
      />
      
      {/* Modal Dialog container */}
      <div className="relative w-full max-w-md p-6 bg-[#0B1419]/95 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
        
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close Button */}
        {!isDeleting && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* Content Layout */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Danger Warning Icon Container */}
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10 mb-4">
            <Trash2 className="w-5 h-5 animate-pulse" />
          </div>
          
          {/* Title */}
          <h3 className="text-white text-base font-bold tracking-wide mb-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {message}
          </p>
          
          {/* Highlight Item to Delete */}
          {itemName && (
            <div className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-6 flex flex-col items-center justify-center">
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Item to Delete</span>
              <span className="text-white text-xs font-semibold mt-1 max-w-[320px] truncate text-center">
                {itemName}
              </span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              disabled={isDeleting}
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white/60 hover:text-white hover:bg-white/[0.07] text-sm font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
