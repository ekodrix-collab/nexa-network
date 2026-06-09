'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from '@/components/ui/ScrollReveal'

const serviceOptions = ['Network Infrastructure', 'Cyber Security', 'Cloud Computing', 'Smart Entry Management', 'CCTV & Surveillance', 'Vehicle Tracking', 'Other']

function ContactContent() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      // Find closest match or exact match
      const matched = serviceOptions.find(opt =>
        opt.toLowerCase().includes(serviceParam.toLowerCase()) ||
        serviceParam.toLowerCase().includes(opt.toLowerCase())
      )
      if (matched) {
        setForm(prev => ({ ...prev, service: matched }))
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message)
        // Reset form but retain selected service from search params if it was set
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' })
      }
      else toast.error(data.error)
    } catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className=" bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <section
        className="relative py-20 border-b min-h-[450px] border-black/5 dark:border-white/[0.03] overflow-hidden transition-colors duration-300 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/contanct-us.png')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Orange Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F05B1B]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-5">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#F05B1B] text-xs font-bold tracking-[0.25em] uppercase">
                  Contact Us
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black font-bold text-white leading-tight mb-6">
                Get in <span className="text-[#F05B1B]">Touch</span>
              </h1>

              <p className="text-white/80 text-sm">
                Ready to transform your IT infrastructure? Let's discuss your project. Our team specializes in delivering secure, scalable, and innovative technology solutions tailored to your business needs. Whether you're looking to enhance network performance, strengthen cybersecurity, migrate to the cloud, or implement smart technology systems, we're here to help you achieve your goals with confidence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F8] dark:bg-[#070f12] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <h2 className="text-2xl font-black text-slate-800 font-bold dark:text-white mb-6">Contact Information</h2>
                {[
                  { icon: Phone, label: 'Phone', value: '+974 4145 9393', href: 'tel:+97441459393' },
                  { icon: Mail, label: 'Email', value: 'support@nexa.com.qa', href: 'mailto:support@nexa.com.qa' },
                  { icon: MapPin, label: 'Office', value: 'Hilalyton Tower, Floor 7\nAl Saflya St, Doha – Qatar' },
                  { icon: Clock, label: 'Working Hours', value: 'Sun – Thu: 8AM – 6PM' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-white mb-2 dark:bg-brand-navy/60 rounded-[5px] border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                    <div className="w-10 h-10 bg-[#F05B1B]/10 rounded-xl flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-[#F05B1B]" /></div>
                    <div>
                      <div className="text-slate-400 dark:text-white/30 text-xs uppercase tracking-widest mb-1">{label}</div>
                      {href ? <a href={href} className="text-slate-600 dark:text-white/70 text-sm hover:text-slate-900 dark:hover:text-white transition-colors whitespace-pre-line">{value}</a> : <div className="text-slate-600 dark:text-white/70 text-sm whitespace-pre-line">{value}</div>}
                    </div>
                  </div>
                ))}
              </ScrollReveal>

              {/* Google Maps Embed */}
              <ScrollReveal delay={0.15}>
                <div className="w-full h-[280px] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none bg-white dark:bg-[#0d1c22]/60 p-2 backdrop-blur-md">
                  <iframe
                    title="Nexa Network Solutions Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.443288268364!2d51.539761775427976!3d25.289306477651895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5b80f8e2141%3A0xfb3a3cff346bdb9b!2sNEXA%20NETWORK%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1780583159557!5m2!1sen!2sin"
                    className="w-full h-full rounded-2xl border-0  opacity-80 dark:opacity-70 transition-all duration-300 hover:grayscale-0 dark:hover:invert-0 dark:hover:hue-rotate-0 hover:opacity-100"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0d1c22]/60 rounded-[5px] p-8 border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-300 space-y-5">
                  <h3 className="text-slate-800 dark:text-white font-bold text-xl mb-2">Send us a Message</h3>
                  <p className="text-slate-500 dark:text-white/40 text-sm mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Full Name *</label><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="John Doe" /></div>
                    <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Email *</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="john@company.com" /></div>
                    <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="+974 XXXX XXXX" /></div>
                    <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Company</label><input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors" placeholder="Your Company" /></div>
                  </div>
                  <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Service Interested In</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3  dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[5px] text-slate-800 dark:text-white text-sm focus:border-[#F05B1B]/50 focus:outline-none transition-colors appearance-none">
                      <option value="" className="bg-[#F4F6F8] dark:bg-[#0a1518] text-slate-800 dark:text-white">Select a service</option>
                      {serviceOptions.map(s => <option key={s} value={s} className="bg-[#F4F6F8] dark:bg-[#0a1518]  dark:text-white">{s}</option>)}
                    </select>
                  </div>
                  <div><label className="text-slate-600 dark:text-white/50 text-xs font-semibold uppercase tracking-widest mb-2 block">Message *</label><textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-white/25 focus:border-[#F05B1B]/50 focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." /></div>
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 py-4 bg-[#F05B1B] hover:bg-[#FF6B2B] disabled:opacity-50 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-orange">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-[5px] animate-spin" /> : <><Send className="w-4 h-4" />Send Message</>}
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

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F6F8] dark:bg-[#070f12] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#F05B1B]/30 border-t-[#F05B1B] rounded-[5px] animate-spin" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  )
}
