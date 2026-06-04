'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import toast from 'react-hot-toast'

export default function SupportPage() {
  const [ticketId, setTicketId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      const mockId = 'NX-' + Math.floor(100000 + Math.random() * 900000)
      setTicketId(mockId)
      toast.success(`Support ticket ${mockId} created successfully!`)
    }, 1200)
  }

  return (
    <div className="pt-20 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <section className="relative py-24 bg-white dark:bg-[#0D1C22] border-b border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/5 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#F05B1B]" />
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">SLA Helpdesk</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight mb-6">
                Customer Support & <span className="text-[#F05B1B]">Service Tickets</span>
              </h1>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed">
                Submit maintenance support tickets, request technical assistance, or contact our engineers for urgent SLA support.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">Direct Contacts</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F05B1B]/10 flex items-center justify-center text-[#F05B1B] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-white/30 text-xs uppercase tracking-wider mb-1">Emergency Helpdesk</div>
                    <div className="text-slate-800 dark:text-white font-bold">+974 4145 9393</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F05B1B]/10 flex items-center justify-center text-[#F05B1B] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-white/30 text-xs uppercase tracking-wider mb-1">Email Support</div>
                    <div className="text-slate-800 dark:text-white font-bold">support@nexa.com.qa</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#0d1c22]/60 rounded-[32px] p-8 lg:p-10 border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-300">
                {ticketId ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">Ticket Submitted</h3>
                    <p className="text-slate-500 dark:text-white/50 max-w-sm mx-auto text-sm">
                      Your ticket has been logged inside our SLA system. An engineer will follow up shortly.
                    </p>
                    <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-slate-800 dark:text-white text-sm">
                      Ticket ID: {ticketId}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCreateTicket} className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">Log SLA Incident</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-600 dark:text-white/50 text-xs uppercase tracking-wider mb-2">Company Name</label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-[#070f12]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-[#F05B1B]" />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-white/50 text-xs uppercase tracking-wider mb-2">Contact Person</label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-[#070f12]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-[#F05B1B]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-white/50 text-xs uppercase tracking-wider mb-2">Issue Category</label>
                      <select required className="w-full bg-slate-50 dark:bg-[#070f12]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-[#F05B1B] appearance-none">
                        <option value="network" className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white">Network & Switching Down</option>
                        <option value="security" className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white">Cybersecurity / Firewall alert</option>
                        <option value="cctv" className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white">CCTV Camera / Storage failure</option>
                        <option value="access" className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white">Access Control / Gates locked</option>
                        <option value="other" className="bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white">Other Incident</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-white/50 text-xs uppercase tracking-wider mb-2">Incident Description</label>
                      <textarea required rows={4} className="w-full bg-slate-50 dark:bg-[#070f12]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-[#F05B1B]" />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#F05B1B] hover:bg-[#FF6B2B] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-orange"
                    >
                      {submitting ? 'Creating Ticket...' : 'Create SLA Ticket'}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
