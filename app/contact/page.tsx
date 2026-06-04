'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from '@/components/ui/ScrollReveal'

const serviceOptions = ['Network Infrastructure', 'Cyber Security', 'Cloud Computing', 'Smart Entry Management', 'CCTV & Surveillance', 'Vehicle Tracking', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok) { toast.success(data.message); setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' }) }
      else toast.error(data.error)
    } catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-[#0D1C22] overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4"><div className="w-8 h-px bg-[#F05B1B]" /><span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">Contact Us</span></div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">Get in <span className="text-[#F05B1B]">Touch</span></h1>
              <p className="text-white/50 text-lg">Ready to transform your IT infrastructure? Let&apos;s discuss your project.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#0a1518]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <h2 className="text-2xl font-black text-white mb-6">Contact Information</h2>
                {[
                  { icon: Phone, label: 'Phone', value: '+974 4145 9393', href: 'tel:+97441459393' },
                  { icon: Mail, label: 'Email', value: 'support@nexa.com.qa', href: 'mailto:support@nexa.com.qa' },
                  { icon: MapPin, label: 'Office', value: 'Hilalyton Tower, Floor 7\nAl Saflya St, Doha – Qatar' },
                  { icon: Clock, label: 'Working Hours', value: 'Sun – Thu: 8AM – 6PM' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 glass rounded-2xl border border-white/8">
                    <div className="w-10 h-10 bg-[#F05B1B]/10 rounded-xl flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-[#F05B1B]" /></div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-widest mb-1">{label}</div>
                      {href ? <a href={href} className="text-white/70 text-sm hover:text-white transition-colors whitespace-pre-line">{value}</a> : <div className="text-white/70 text-sm whitespace-pre-line">{value}</div>}
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8 border border-white/8 space-y-5">
                  <h3 className="text-white font-bold text-xl mb-2">Send us a Message</h3>
                  <p className="text-white/40 text-sm mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Full Name *</label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="John Doe" /></div>
                    <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Email *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="john@company.com" /></div>
                    <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="+974 XXXX XXXX" /></div>
                    <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Company</label><input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="Your Company" /></div>
                  </div>
                  <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Service Interested In</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#F05B1B]/50 focus:outline-none transition-colors appearance-none">
                      <option value="" className="bg-[#0a1518]">Select a service</option>
                      {serviceOptions.map(s => <option key={s} value={s} className="bg-[#0a1518]">{s}</option>)}
                    </select>
                  </div>
                  <div><label className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Message *</label><textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." /></div>
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 py-4 bg-[#F05B1B] hover:bg-[#FF6B2B] disabled:opacity-50 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-orange">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" />Send Message</>}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
