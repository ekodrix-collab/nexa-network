'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Send, MessageCircle } from 'lucide-react'

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const pathname = usePathname()

  // Show badge with a delay to attract attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setShowBadge(false)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  const triggerChat = (prefillText: string = '') => {
    const phone = '97441459393'
    const encodedText = encodeURIComponent(prefillText)
    const url = `https://wa.me/${phone}${prefillText ? `?text=${encodedText}` : ''}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (pathname?.startsWith('/admin')) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end pointer-events-none z-50">
      {/* Chat Window */}
      <div
        className={`w-[340px] sm:w-[360px] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0d1c22] transition-all duration-500 ease-out origin-bottom-right mb-4 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="relative bg-[#075E54] dark:bg-[#075E54]/90 p-5 text-white flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/20 p-1">
            <img
              src="/images/logo-light.png"
              alt="Nexa Network"
              className="w-8 h-8 object-contain"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide">Nexa Support</h4>
            <p className="text-[10px] text-white/80 flex items-center gap-1">
              <span>Typically replies in minutes</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div 
          className="p-5 space-y-4 bg-slate-50 dark:bg-[#070f12]/40 min-h-[160px] max-h-[240px] overflow-y-auto"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.04%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm1-61c3.108 0 5.627-2.519 5.627-5.627 0-3.108-2.519-5.627-5.627-5.627S29.373 15.265 29.373 18.373c0 3.108 2.519 5.627 5.627 5.627zm14 27c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm26-45c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z%22/%3E%3C/g%3E%3C/svg%3E')" }}
        >
          {/* Support Message Bubble */}
          <div className="flex flex-col items-start max-w-[85%]">
            <div className="bg-white dark:bg-[#0d1c22] border border-black/5 dark:border-white/5 p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-700 dark:text-white/90 text-xs sm:text-sm leading-relaxed">
              Hello! 👋 Welcome to Nexa Network Solutions. How can we assist you with your Enterprise IT Infrastructure, Cybersecurity, or Cloud requirements today?
            </div>
            <span className="text-[9px] text-slate-400 dark:text-white/20 mt-1.5 ml-1">Just now</span>
          </div>

          {/* Quick Inquiry Options */}
          <div className="space-y-2 pt-2">
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest pl-1">Select an option:</p>
            {[
              { label: '💬 IT Infrastructure Inquiry', text: 'Hi, I would like to inquire about Nexa Network IT Infrastructure solutions.' },
              { label: '🛡️ Cyber Security Solutions', text: 'Hi, I am interested in cybersecurity auditing/firewall services.' },
              { label: '📞 Request Call Back', text: 'Hi, please request a callback to discuss enterprise solutions.' }
            ].map(({ label, text }) => (
              <button
                key={label}
                onClick={() => triggerChat(text)}
                className="w-full text-left p-3 rounded-xl bg-white dark:bg-[#0d1c22] border border-black/5 dark:border-white/5 hover:border-[#F05B1B]/40 hover:bg-[#F05B1B]/5 text-slate-600 dark:text-white/70 hover:text-[#F05B1B] dark:hover:text-[#F05B1B] text-xs font-semibold transition-all duration-300 shadow-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="p-4 bg-white dark:bg-[#0d1c22] border-t border-black/5 dark:border-white/5 flex gap-2">
          <button
            onClick={() => triggerChat('Hi support, I would like to chat with an consultant.')}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#25D366]/10 hover:shadow-lg hover:shadow-[#25D366]/20"
          >
            <Send className="w-3.5 h-3.5" />
            Open Direct Chat
          </button>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label="Toggle WhatsApp Chat"
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 z-50 animate-pulse-orange pointer-events-auto"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white/10" />
        )}

        {/* Attention Badge */}
        {showBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F05B1B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md">
            1
          </span>
        )}
      </button>
    </div>
  )
}
