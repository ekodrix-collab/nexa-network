'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, ChevronLeft, Mail } from 'lucide-react'

type Career = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
}

export default function CareerDetailPage({ params }: { params: { id: string } }) {
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [contactEmail, setContactEmail] = useState('support@nexa.com.qa')

  useEffect(() => {
    // Fetch career details
    fetch(`/api/careers/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setCareer(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Fetch contact details for HR email
    fetch('/api/admin/settings?page=contact')
      .then(res => res.json())
      .then(data => {
        if (data.email1) setContactEmail(data.email1)
      })
      .catch(() => {})
  }, [params.id])

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-[#F4F6F8] dark:bg-[#070f12] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#F05B1B] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!career) {
    return (
      <div className="pt-32 min-h-screen bg-[#F4F6F8] dark:bg-[#070f12] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Opening Not Found</h1>
        <p className="text-white/40 mb-6">The job vacancy you are looking for does not exist or has been closed.</p>
        <Link href="/careers" className="px-5 py-2.5 bg-[#F05B1B] text-white rounded-xl text-sm font-bold">
          Back to Careers
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24 bg-[#F4F6F8] dark:bg-[#070f12] text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/careers" className="inline-flex items-center gap-1 text-[#F05B1B] hover:text-[#FF6B2B] text-xs font-bold uppercase tracking-wider mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Careers
        </Link>

        {/* Header Card */}
        <div className="bg-white dark:bg-[#0D1C22] p-8 rounded-3xl border border-black/5 dark:border-white/10 mb-8">
          <span className="inline-block px-3 py-1 rounded-lg bg-[#F05B1B]/10 text-[#F05B1B] text-[10px] font-bold tracking-wider uppercase mb-4">
            {career.department}
          </span>
          <h1 className="text-3xl md:text-4xl font-black leading-tight text-slate-800 dark:text-white mb-6">
            {career.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-white/40 pb-6 border-b border-black/5 dark:border-white/5">
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#F05B1B]" />{career.department}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#F05B1B]" />{career.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#F05B1B]" />{career.type}</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-white/50 text-xs">Interested? Send your resume to our HR department directly.</p>
            <a 
              href={`mailto:${contactEmail}?subject=Application for ${career.title}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F05B1B] hover:bg-[#FF6B2B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              <Mail className="w-4 h-4" /> Apply & Send Resume
            </a>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white dark:bg-[#0D1C22]/60 p-8 rounded-3xl border border-black/5 dark:border-white/10 space-y-8">
          {/* Job Description */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-black/5 dark:border-white/5 pb-3 mb-4">Job Description</h2>
            <div className="text-slate-600 dark:text-white/70 leading-relaxed text-sm whitespace-pre-wrap">
              {career.description}
            </div>
          </div>

          {/* Job Requirements */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-black/5 dark:border-white/5 pb-3 mb-4">Requirements</h2>
            <div className="text-slate-600 dark:text-white/70 leading-relaxed text-sm whitespace-pre-wrap">
              {career.requirements}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
