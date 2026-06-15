import prismaInstance from './prisma'
import { deleteUploadedFile } from './uploads'

// Cast to any to bypass IDE type-caching bugs for dynamically generated Prisma models
const prisma = prismaInstance as any

export const defaultHomePageContent = {
  id: 'default_home',
  heroTitle: 'INFRASTRUCTURE FOR THE FUTURE',
  heroSubtitle: 'Empowering Businesses',
  heroDescription: 'Secure. Scalable. Intelligent. We deliver advanced networking, cybersecurity, cloud, and surveillance integration solutions for enterprises in Qatar.',
  heroVideo: '',
  heroImage: '/images/hero-fallback.jpg',
  statsYearsExp: 10,
  statsProjects: 150,
  statsClients: 50,
  statsExperts: 25,
  welcomeTitle: "Powering Qatar's Digital Future",
  welcomeDescription: 'We are a leading enterprise IT company delivering network infrastructure, cybersecurity, cloud computing, CCTV, smart entry management, and vehicle tracking solutions.',
  welcomeImage: '/images/service_security.png',
  welcomeIcon: 'Zap',
  ctaTitle: "Let's build a smarter, safer future together.",
  ctaDescription: 'Partner with Nexa Network Solutions to elevate your technology infrastructure with zero-trust security and high-speed network connectivity.',
  ctaBgImage: '/images/cta-bg.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
}

export const defaultAboutPageContent = {
  id: 'default_about',
  title: 'Securing Your Digital Future',
  subtitle: 'About Us',
  description: "Nexa Network Solutions is Qatar's leading systems integrator, delivering state-of-the-art network infrastructure, threat defense, and smart cloud architectures.",
  bgImage: '/images/cyber-future.png',
  whoWeAreTitle: 'Providing Enterprise-Grade Connectivity & Defense',
  whoWeAreDescription1: 'Nexa Network Solutions delivers end-to-end IT and cybersecurity services that help businesses stay secure, connected, and future-ready. With over a decade of industry experience, we leverage advanced technologies, intelligent automation, and proven strategies to protect critical data, strengthen infrastructure, and enhance overall performance.',
  whoWeAreDescription2: 'Our solutions are designed to adapt to evolving digital challenges while ensuring reliability, scalability, and long-term growth. We focus on delivering customized solutions tailored to each client\'s unique business needs.',
  whoWeAreDescription3: 'Our expert team ensures seamless integration, proactive support, and continuous innovation across all services. By combining technology expertise with industry best practices, we help organizations improve efficiency, reduce risks, and achieve sustainable success. We are committed to building long-term partnerships through trust, quality, and consistent service excellence.',
  whoWeAreImage: '/images/about_who_we_are.png',
  values: [
    {
      title: 'Our Mission',
      desc: 'To deliver innovative, secure, and scalable technology solutions that empower businesses to operate efficiently, protect their digital assets, and achieve sustainable growth.',
      icon: 'Target'
    },
    {
      title: 'Our Vision',
      desc: 'To be a trusted global technology partner recognized for excellence in cybersecurity, IT infrastructure, and digital transformation, driving the future of smart and connected businesses.',
      icon: 'Eye'
    },
    {
      title: 'Our Values',
      desc: 'We are driven by integrity, innovation, and customer commitment, delivering quality solutions through teamwork, transparency, and a passion for continuous improvement.',
      icon: 'Gem'
    }
  ],
  whyChooseUsTitle: 'Your Trusted Partner for Technology-Driven Transformation',
  whyChooseUsImage: '/images/about_why_choose_us.png',
  benefits: [
    {
      title: 'Proven Industry Experience',
      desc: 'With over 10 years of strong presence in the Qatar market, Nexa Network Solutions has built a reputation as a trusted partner delivering reliable IT services and technology solutions.',
      icon: 'Award'
    },
    {
      title: 'Advanced Technology Expertise',
      desc: 'We combine cutting-edge technologies with deep technical expertise to deliver innovative solutions that help businesses improve efficiency, security, and digital transformation.',
      icon: 'Cpu'
    },
    {
      title: 'End-to-End IT Solutions',
      desc: 'From network infrastructure and cybersecurity to cloud services and smart business solutions, we provide complete IT services tailored to meet modern business needs.',
      icon: 'Users'
    }
  ],
  testimonials: [
    {
      name: 'Ahmed',
      role: 'Operations Director',
      stars: 5,
      quote: 'Nexa Network Solutions transformed our IT infrastructure with exceptional professionalism. Their team delivered secure and scalable solutions that significantly improved our operations.'
    },
    {
      name: 'Sarah',
      role: 'IT Security Lead',
      stars: 5,
      quote: 'From cybersecurity to cloud services, Nexa provided reliable and efficient support. Their proactive approach and quick response time make them a trusted technology partner.'
    },
    {
      name: 'Khalid',
      role: 'Infrastructure Manager',
      stars: 5,
      quote: 'We experienced outstanding service with Nexa. Their expertise, attention to detail, and commitment to quality helped us enhance security and streamline our business processes.'
    }
  ],
  ctaTitle: 'Ready to Get Started?',
  ctaDescription: 'Let us help you transform your business with smart IT infrastructure and cybersecurity solutions.',
  createdAt: new Date(),
  updatedAt: new Date()
}

export const defaultContactInfo = {
  id: 'default_contact',
  title: 'Get In Touch',
  description: "We're here to help you with any queries. Our team will get back to you within 24 hours.",
  bgImage: '/images/contact-bg.jpg',
  bannerImage: '/images/contact-banner.jpg',
  email1: 'info@nexa.com.qa',
  email2: 'support@nexa.com.qa',
  phone1: '+974 4145 9393',
  phone2: '+974 5555 1234',
  address: 'Zone 55, Street 850, Building 67\nAl Rayyan, Doha, Qatar',
  facebook: 'https://facebook.com/nexaqatar',
  twitter: 'https://twitter.com/nexaqatar',
  linkedin: 'https://linkedin.com/company/nexa',
  instagram: 'https://instagram.com/nexaqatar',
  createdAt: new Date(),
  updatedAt: new Date()
}

// ── Home Page Content ──────────────────────────────────
export async function getHomePageContent() {
  try {
    const content = await prisma.homePageContent.findUnique({
      where: { id: 'default_home' }
    })
    return content || defaultHomePageContent
  } catch (error) {
    console.error('Database connection failed, using fallback homepage content:', error)
    return defaultHomePageContent
  }
}

export async function saveHomePageContent(data: any) {
  const {
    heroTitle, heroSubtitle, heroDescription, heroVideo, heroImage,
    statsYearsExp, statsProjects, statsClients, statsExperts,
    welcomeTitle, welcomeDescription, welcomeImage, welcomeIcon,
    ctaTitle, ctaDescription, ctaBgImage
  } = data

  let existing: any = null
  try {
    existing = await prisma.homePageContent.findUnique({
      where: { id: 'default_home' },
      select: { heroImage: true, welcomeImage: true, ctaBgImage: true }
    })
  } catch (err) {
    console.error('Failed to fetch existing home page settings during save:', err)
  }

  const result = await prisma.homePageContent.upsert({
    where: { id: 'default_home' },
    update: {
      heroTitle: heroTitle || '',
      heroSubtitle: heroSubtitle || '',
      heroDescription: heroDescription || '',
      heroVideo: heroVideo || '',
      heroImage: heroImage || '',
      statsYearsExp: parseInt(statsYearsExp) || 0,
      statsProjects: parseInt(statsProjects) || 0,
      statsClients: parseInt(statsClients) || 0,
      statsExperts: parseInt(statsExperts) || 0,
      welcomeTitle: welcomeTitle || '',
      welcomeDescription: welcomeDescription || '',
      welcomeImage: welcomeImage || '',
      welcomeIcon: welcomeIcon || '',
      ctaTitle: ctaTitle || '',
      ctaDescription: ctaDescription || '',
      ctaBgImage: ctaBgImage || ''
    },
    create: {
      id: 'default_home',
      heroTitle: heroTitle || '',
      heroSubtitle: heroSubtitle || '',
      heroDescription: heroDescription || '',
      heroVideo: heroVideo || '',
      heroImage: heroImage || '',
      statsYearsExp: parseInt(statsYearsExp) || 0,
      statsProjects: parseInt(statsProjects) || 0,
      statsClients: parseInt(statsClients) || 0,
      statsExperts: parseInt(statsExperts) || 0,
      welcomeTitle: welcomeTitle || '',
      welcomeDescription: welcomeDescription || '',
      welcomeImage: welcomeImage || '',
      welcomeIcon: welcomeIcon || '',
      ctaTitle: ctaTitle || '',
      ctaDescription: ctaDescription || '',
      ctaBgImage: ctaBgImage || ''
    }
  })

  if (existing) {
    if (existing.heroImage && existing.heroImage !== heroImage) {
      await deleteUploadedFile(existing.heroImage)
    }
    if (existing.welcomeImage && existing.welcomeImage !== welcomeImage) {
      await deleteUploadedFile(existing.welcomeImage)
    }
    if (existing.ctaBgImage && existing.ctaBgImage !== ctaBgImage) {
      await deleteUploadedFile(existing.ctaBgImage)
    }
  }

  return result
}

// ── About Page Content ──────────────────────────────────
export async function getAboutPageContent() {
  try {
    const content = await prisma.aboutPageContent.findUnique({
      where: { id: 'default_about' }
    })
    return content || defaultAboutPageContent
  } catch (error) {
    console.error('Database connection failed, using fallback about page content:', error)
    return defaultAboutPageContent
  }
}

export async function saveAboutPageContent(data: any) {
  const {
    title, subtitle, description, bgImage,
    whoWeAreTitle, whoWeAreDescription1, whoWeAreDescription2, whoWeAreDescription3, whoWeAreImage,
    values, whyChooseUsTitle, whyChooseUsImage, benefits, testimonials, ctaTitle, ctaDescription
  } = data

  let existing: any = null
  try {
    existing = await prisma.aboutPageContent.findUnique({
      where: { id: 'default_about' },
      select: { bgImage: true, whoWeAreImage: true, whyChooseUsImage: true }
    })
  } catch (err) {
    console.error('Failed to fetch existing about page settings during save:', err)
  }

  const result = await prisma.aboutPageContent.upsert({
    where: { id: 'default_about' },
    update: {
      title: title || '',
      subtitle: subtitle || '',
      description: description || '',
      bgImage: bgImage || '',
      whoWeAreTitle: whoWeAreTitle || '',
      whoWeAreDescription1: whoWeAreDescription1 || '',
      whoWeAreDescription2: whoWeAreDescription2 || '',
      whoWeAreDescription3: whoWeAreDescription3 || '',
      whoWeAreImage: whoWeAreImage || '',
      values: values || [],
      whyChooseUsTitle: whyChooseUsTitle || '',
      whyChooseUsImage: whyChooseUsImage || '',
      benefits: benefits || [],
      testimonials: testimonials || [],
      ctaTitle: ctaTitle || '',
      ctaDescription: ctaDescription || ''
    },
    create: {
      id: 'default_about',
      title: title || '',
      subtitle: subtitle || '',
      description: description || '',
      bgImage: bgImage || '',
      whoWeAreTitle: whoWeAreTitle || '',
      whoWeAreDescription1: whoWeAreDescription1 || '',
      whoWeAreDescription2: whoWeAreDescription2 || '',
      whoWeAreDescription3: whoWeAreDescription3 || '',
      whoWeAreImage: whoWeAreImage || '',
      values: values || [],
      whyChooseUsTitle: whyChooseUsTitle || '',
      whyChooseUsImage: whyChooseUsImage || '',
      benefits: benefits || [],
      testimonials: testimonials || [],
      ctaTitle: ctaTitle || '',
      ctaDescription: ctaDescription || ''
    }
  })

  if (existing) {
    if (existing.bgImage && existing.bgImage !== bgImage) {
      await deleteUploadedFile(existing.bgImage)
    }
    if (existing.whoWeAreImage && existing.whoWeAreImage !== whoWeAreImage) {
      await deleteUploadedFile(existing.whoWeAreImage)
    }
    if (existing.whyChooseUsImage && existing.whyChooseUsImage !== whyChooseUsImage) {
      await deleteUploadedFile(existing.whyChooseUsImage)
    }
  }

  return result
}

// ── Contact Info ───────────────────────────────────────
export async function getContactInfo() {
  try {
    const info = await prisma.contactInfo.findUnique({
      where: { id: 'default_contact' }
    })
    return info || defaultContactInfo
  } catch (error) {
    console.error('Database connection failed, using fallback contact info:', error)
    return defaultContactInfo
  }
}

export async function saveContactInfo(data: any) {
  const {
    title, description, bgImage, bannerImage,
    email1, email2, phone1, phone2, address,
    facebook, twitter, linkedin, instagram
  } = data

  let existing: any = null
  try {
    existing = await prisma.contactInfo.findUnique({
      where: { id: 'default_contact' },
      select: { bgImage: true, bannerImage: true }
    })
  } catch (err) {
    console.error('Failed to fetch existing contact settings during save:', err)
  }

  const result = await prisma.contactInfo.upsert({
    where: { id: 'default_contact' },
    update: {
      title: title || '',
      description: description || '',
      bgImage: bgImage || '',
      bannerImage: bannerImage || '',
      email1: email1 || '',
      email2: email2 || '',
      phone1: phone1 || '',
      phone2: phone2 || '',
      address: address || '',
      facebook: facebook || '',
      twitter: twitter || '',
      linkedin: linkedin || '',
      instagram: instagram || ''
    },
    create: {
      id: 'default_contact',
      title: title || '',
      description: description || '',
      bgImage: bgImage || '',
      bannerImage: bannerImage || '',
      email1: email1 || '',
      email2: email2 || '',
      phone1: phone1 || '',
      phone2: phone2 || '',
      address: address || '',
      facebook: facebook || '',
      twitter: twitter || '',
      linkedin: linkedin || '',
      instagram: instagram || ''
    }
  })

  if (existing) {
    if (existing.bgImage && existing.bgImage !== bgImage) {
      await deleteUploadedFile(existing.bgImage)
    }
    if (existing.bannerImage && existing.bannerImage !== bannerImage) {
      await deleteUploadedFile(existing.bannerImage)
    }
  }

  return result
}


