'use client'

import { useState, useEffect } from 'react'
import SectionCard from '@/components/admin/SectionCard'
import { Input, Textarea, FieldGrid } from '@/components/admin/AdminFields'
import ImageUploader from '@/components/admin/ImageUploader'
import { Eye, Shield, Target, Award, Star } from 'lucide-react'

async function savePageContent(data: any) {
  const res = await fetch('/api/admin/settings?page=about', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to save')
}

export default function AboutAdminPage() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/settings?page=about')
      .then(res => res.json())
      .then(data => {
        // Hydrate arrays with default item structures to prevent null reference errors during editing
        const vals = Array.isArray(data.values) ? [...data.values] : []
        while (vals.length < 3) {
          vals.push({ title: '', desc: '', icon: 'Target' })
        }

        const bens = Array.isArray(data.benefits) ? [...data.benefits] : []
        while (bens.length < 3) {
          bens.push({ title: '', desc: '', icon: 'Award' })
        }

        const tests = Array.isArray(data.testimonials) ? [...data.testimonials] : []
        while (tests.length < 3) {
          tests.push({ name: '', role: '', stars: 5, quote: '' })
        }

        setSettings({
          ...data,
          values: vals,
          benefits: bens,
          testimonials: tests
        })
        setLoading(false)
      })
  }, [])

  const set = (key: string) => (value: any) =>
    setSettings((prev: any) => ({ ...prev, [key]: value }))

  const setValueItem = (index: number, field: string) => (val: any) => {
    setSettings((prev: any) => {
      const copy = [...prev.values]
      copy[index] = { ...copy[index], [field]: val }
      return { ...prev, values: copy }
    })
  }

  const setBenefitItem = (index: number, field: string) => (val: any) => {
    setSettings((prev: any) => {
      const copy = [...prev.benefits]
      copy[index] = { ...copy[index], [field]: val }
      return { ...prev, benefits: copy }
    })
  }

  const setTestimonialItem = (index: number, field: string) => (val: any) => {
    setSettings((prev: any) => {
      const copy = [...prev.testimonials]
      copy[index] = { ...copy[index], [field]: val }
      return { ...prev, testimonials: copy }
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Live Preview Info Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
        <Eye className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <p className="text-blue-300/70 text-xs">
          Changes saved here appear on the <strong className="text-blue-300">live website about page</strong>. Each section saves independently.
        </p>
      </div>

      {/* Hero Section */}
      <SectionCard
        title="Hero Section"
        description="The large top banner and headline for your About page"
        badge="Hero Banner"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-4">
          <FieldGrid cols={2}>
            <Input
              label="Hero Title"
              hint='The main title, e.g. "Securing Your Digital Future"'
              value={settings.title || ''}
              onChange={e => set('title')(e.target.value)}
              placeholder="Securing Your Digital Future"
            />
            <Input
              label="Hero Subtitle / Badge"
              hint='Small badge above the title, e.g. "About Us"'
              value={settings.subtitle || ''}
              onChange={e => set('subtitle')(e.target.value)}
              placeholder="About Us"
            />
          </FieldGrid>
          <Textarea
            label="Hero Description"
            hint="The introduction paragraph under the title"
            value={settings.description || ''}
            onChange={e => set('description')(e.target.value)}
            placeholder="Nexa Network Solutions is Qatar's leading systems integrator..."
            rows={3}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Background Image</p>
            <ImageUploader label="" value={settings.bgImage || ''} onChange={set('bgImage')} />
          </div>
        </div>
      </SectionCard>

      {/* Who We Are Section */}
      <SectionCard
        title="Who We Are Section"
        description="Second section content area explaining the company scope"
        badge="Who We Are"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-4">
          <Input
            label="Section Title"
            value={settings.whoWeAreTitle || ''}
            onChange={e => set('whoWeAreTitle')(e.target.value)}
            placeholder="Providing Enterprise-Grade Connectivity & Defense"
          />
          <Textarea
            label="Paragraph 1"
            value={settings.whoWeAreDescription1 || ''}
            onChange={e => set('whoWeAreDescription1')(e.target.value)}
            placeholder="Nexa Network Solutions delivers end-to-end IT..."
            rows={3}
          />
          <Textarea
            label="Paragraph 2"
            value={settings.whoWeAreDescription2 || ''}
            onChange={e => set('whoWeAreDescription2')(e.target.value)}
            placeholder="Our solutions are designed to adapt..."
            rows={3}
          />
          <Textarea
            label="Paragraph 3"
            value={settings.whoWeAreDescription3 || ''}
            onChange={e => set('whoWeAreDescription3')(e.target.value)}
            placeholder="Our expert team ensures..."
            rows={3}
          />
          <div>
            <p className="text-xs font-medium text-white/60 mb-1.5">Who We Are Photo</p>
            <ImageUploader label="" value={settings.whoWeAreImage || ''} onChange={set('whoWeAreImage')} />
          </div>
        </div>
      </SectionCard>

      {/* Mission, Vision, Values Section */}
      <SectionCard
        title="Mission, Vision & Values"
        description="Three pillars grid of the about page"
        badge="Pillars Grid"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-8 divide-y divide-white/[0.05]">
          {/* Mission */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-[#F05B1B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> pillar 1: Mission
            </h3>
            <FieldGrid cols={2}>
              <Input
                label="Pillar Title"
                value={settings.values[0]?.title || ''}
                onChange={e => setValueItem(0, 'title')(e.target.value)}
                placeholder="Our Mission"
              />
              <Input
                label="Lucide Icon Name"
                hint="Suggested: Target, Shield, Eye, Gem, Award, Cpu"
                value={settings.values[0]?.icon || ''}
                onChange={e => setValueItem(0, 'icon')(e.target.value)}
                placeholder="Target"
              />
            </FieldGrid>
            <div className="mt-3">
              <Textarea
                label="Description"
                value={settings.values[0]?.desc || ''}
                onChange={e => setValueItem(0, 'desc')(e.target.value)}
                placeholder="To deliver innovative, secure, and scalable technology solutions..."
                rows={2}
              />
            </div>
          </div>

          {/* Vision */}
          <div className="pt-6">
            <h3 className="text-xs font-bold text-[#F05B1B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" /> pillar 2: Vision
            </h3>
            <FieldGrid cols={2}>
              <Input
                label="Pillar Title"
                value={settings.values[1]?.title || ''}
                onChange={e => setValueItem(1, 'title')(e.target.value)}
                placeholder="Our Vision"
              />
              <Input
                label="Lucide Icon Name"
                hint="Suggested: Target, Shield, Eye, Gem, Award, Cpu"
                value={settings.values[1]?.icon || ''}
                onChange={e => setValueItem(1, 'icon')(e.target.value)}
                placeholder="Eye"
              />
            </FieldGrid>
            <div className="mt-3">
              <Textarea
                label="Description"
                value={settings.values[1]?.desc || ''}
                onChange={e => setValueItem(1, 'desc')(e.target.value)}
                placeholder="To be a trusted global technology partner..."
                rows={2}
              />
            </div>
          </div>

          {/* Values */}
          <div className="pt-6">
            <h3 className="text-xs font-bold text-[#F05B1B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> pillar 3: Values
            </h3>
            <FieldGrid cols={2}>
              <Input
                label="Pillar Title"
                value={settings.values[2]?.title || ''}
                onChange={e => setValueItem(2, 'title')(e.target.value)}
                placeholder="Our Values"
              />
              <Input
                label="Lucide Icon Name"
                hint="Suggested: Target, Shield, Eye, Gem, Award, Cpu"
                value={settings.values[2]?.icon || ''}
                onChange={e => setValueItem(2, 'icon')(e.target.value)}
                placeholder="Gem"
              />
            </FieldGrid>
            <div className="mt-3">
              <Textarea
                label="Description"
                value={settings.values[2]?.desc || ''}
                onChange={e => setValueItem(2, 'desc')(e.target.value)}
                placeholder="We are driven by integrity, innovation, and customer commitment..."
                rows={2}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Why Choose Us & Benefits Section */}
      <SectionCard
        title="Why Choose Us & Benefits"
        description="Section mapping benefits grid and details"
        badge="Why Choose Us"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-6">
          <FieldGrid cols={2}>
            <Input
              label="Why Choose Us Title"
              value={settings.whyChooseUsTitle || ''}
              onChange={e => set('whyChooseUsTitle')(e.target.value)}
              placeholder="Your Trusted Partner for Technology-Driven Transformation"
            />
            <div>
              <p className="text-xs font-medium text-white/60 mb-1.5">Why Choose Us Image</p>
              <ImageUploader label="" value={settings.whyChooseUsImage || ''} onChange={set('whyChooseUsImage')} />
            </div>
          </FieldGrid>

          <div className="space-y-6 divide-y divide-white/[0.05] pt-4 border-t border-white/[0.05]">
            {/* Benefit 1 */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#F05B1B]" /> Benefit 1
              </h4>
              <FieldGrid cols={3}>
                <Input
                  label="Title"
                  value={settings.benefits[0]?.title || ''}
                  onChange={e => setBenefitItem(0, 'title')(e.target.value)}
                  placeholder="Proven Industry Experience"
                />
                <Input
                  label="Icon"
                  hint="Suggested: Award, Cpu, Users, Star, Lock"
                  value={settings.benefits[0]?.icon || ''}
                  onChange={e => setBenefitItem(0, 'icon')(e.target.value)}
                  placeholder="Award"
                />
                <div className="col-span-1 sm:col-span-3">
                  <Textarea
                    label="Description"
                    value={settings.benefits[0]?.desc || ''}
                    onChange={e => setBenefitItem(0, 'desc')(e.target.value)}
                    placeholder="With over 10 years of strong presence..."
                    rows={2}
                  />
                </div>
              </FieldGrid>
            </div>

            {/* Benefit 2 */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#F05B1B]" /> Benefit 2
              </h4>
              <FieldGrid cols={3}>
                <Input
                  label="Title"
                  value={settings.benefits[1]?.title || ''}
                  onChange={e => setBenefitItem(1, 'title')(e.target.value)}
                  placeholder="Advanced Technology Expertise"
                />
                <Input
                  label="Icon"
                  value={settings.benefits[1]?.icon || ''}
                  onChange={e => setBenefitItem(1, 'icon')(e.target.value)}
                  placeholder="Cpu"
                />
                <div className="col-span-1 sm:col-span-3">
                  <Textarea
                    label="Description"
                    value={settings.benefits[1]?.desc || ''}
                    onChange={e => setBenefitItem(1, 'desc')(e.target.value)}
                    placeholder="We combine cutting-edge technologies..."
                    rows={2}
                  />
                </div>
              </FieldGrid>
            </div>

            {/* Benefit 3 */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#F05B1B]" /> Benefit 3
              </h4>
              <FieldGrid cols={3}>
                <Input
                  label="Title"
                  value={settings.benefits[2]?.title || ''}
                  onChange={e => setBenefitItem(2, 'title')(e.target.value)}
                  placeholder="End-to-End IT Solutions"
                />
                <Input
                  label="Icon"
                  value={settings.benefits[2]?.icon || ''}
                  onChange={e => setBenefitItem(2, 'icon')(e.target.value)}
                  placeholder="Users"
                />
                <div className="col-span-1 sm:col-span-3">
                  <Textarea
                    label="Description"
                    value={settings.benefits[2]?.desc || ''}
                    onChange={e => setBenefitItem(2, 'desc')(e.target.value)}
                    placeholder="From network infrastructure and cybersecurity..."
                    rows={2}
                  />
                </div>
              </FieldGrid>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Testimonials Section */}
      <SectionCard
        title="Testimonials Section"
        description="Three customer feedback cards on the about page"
        badge="Testimonials"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-6 divide-y divide-white/[0.05]">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className={idx > 0 ? 'pt-4' : 'pt-2'}>
              <h4 className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-[#F05B1B] fill-current" /> Testimonial {idx + 1}
              </h4>
              <FieldGrid cols={3}>
                <Input
                  label="Client Name"
                  value={settings.testimonials[idx]?.name || ''}
                  onChange={e => setTestimonialItem(idx, 'name')(e.target.value)}
                  placeholder="Ahmed"
                />
                <Input
                  label="Role / Subtitle"
                  value={settings.testimonials[idx]?.role || ''}
                  onChange={e => setTestimonialItem(idx, 'role')(e.target.value)}
                  placeholder="Operations Director"
                />
                <Input
                  label="Stars (1-5)"
                  type="number"
                  min={1}
                  max={5}
                  value={settings.testimonials[idx]?.stars || 5}
                  onChange={e => setTestimonialItem(idx, 'stars')(parseInt(e.target.value) || 5)}
                  placeholder="5"
                />
                <div className="col-span-1 sm:col-span-3">
                  <Textarea
                    label="Quote"
                    value={settings.testimonials[idx]?.quote || ''}
                    onChange={e => setTestimonialItem(idx, 'quote')(e.target.value)}
                    placeholder="Nexa Network Solutions transformed our IT infrastructure..."
                    rows={2}
                  />
                </div>
              </FieldGrid>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* CTA Section */}
      <SectionCard
        title="CTA Section"
        description="The call to action container at the bottom of the page"
        badge="CTA banner"
        onSave={() => savePageContent(settings)}
      >
        <div className="space-y-4">
          <Input
            label="CTA Title"
            value={settings.ctaTitle || ''}
            onChange={e => set('ctaTitle')(e.target.value)}
            placeholder="Ready to Get Started?"
          />
          <Textarea
            label="CTA Description"
            value={settings.ctaDescription || ''}
            onChange={e => set('ctaDescription')(e.target.value)}
            placeholder="Let us help you transform your business with smart IT infrastructure..."
            rows={3}
          />
        </div>
      </SectionCard>
    </div>
  )
}
