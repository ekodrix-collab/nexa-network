import prisma from './prisma'

// ── Home Page Content ──────────────────────────────────
export async function getHomePageContent() {
  let content = await prisma.homePageContent.findUnique({
    where: { id: 'default_home' }
  })
  if (!content) {
    content = {
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
      welcomeImage: '/images/who-we-are.jpg',
      welcomeIcon: 'Zap',
      ctaTitle: "Let's build a smarter, safer future together.",
      ctaDescription: 'Partner with Nexa Network Solutions to elevate your technology infrastructure with zero-trust security and high-speed network connectivity.',
      ctaBgImage: '/images/cta-bg.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
  return content
}

export async function saveHomePageContent(data: any) {
  const {
    heroTitle, heroSubtitle, heroDescription, heroVideo, heroImage,
    statsYearsExp, statsProjects, statsClients, statsExperts,
    welcomeTitle, welcomeDescription, welcomeImage, welcomeIcon,
    ctaTitle, ctaDescription, ctaBgImage
  } = data

  return await prisma.homePageContent.upsert({
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
}

// ── About Page Content ──────────────────────────────────
export async function getAboutPageContent() {
  let content = await prisma.aboutPageContent.findUnique({
    where: { id: 'default_about' }
  })
  if (!content) {
    content = {
      id: 'default_about',
      title: 'About Nexa Network Solutions',
      description: "We are Qatar's leading enterprise IT company delivering cutting-edge integration solutions.",
      bgImage: '/images/about-bg.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
  return content
}

export async function saveAboutPageContent(data: any) {
  const { title, description, bgImage } = data
  return await prisma.aboutPageContent.upsert({
    where: { id: 'default_about' },
    update: {
      title: title || '',
      description: description || '',
      bgImage: bgImage || ''
    },
    create: {
      id: 'default_about',
      title: title || '',
      description: description || '',
      bgImage: bgImage || ''
    }
  })
}

// ── Contact Info ───────────────────────────────────────
export async function getContactInfo() {
  let info = await prisma.contactInfo.findUnique({
    where: { id: 'default_contact' }
  })
  if (!info) {
    info = {
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
  }
  return info
}

export async function saveContactInfo(data: any) {
  const {
    title, description, bgImage, bannerImage,
    email1, email2, phone1, phone2, address,
    facebook, twitter, linkedin, instagram
  } = data

  return await prisma.contactInfo.upsert({
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
}

// ── Backward Compatibility Wrapper ───────────────────────
export async function getSettings(keys: string[]) {
  const home = await getHomePageContent()
  const about = await getAboutPageContent()
  const contact = await getContactInfo()

  const map: Record<string, any> = {
    // Home Page
    hero_title: home.heroTitle,
    hero_subtitle: home.heroSubtitle,
    hero_description: home.heroDescription,
    hero_video: home.heroVideo,
    hero_image: home.heroImage,
    about_years_exp: home.statsYearsExp.toString(),
    about_projects_delivered: home.statsProjects.toString(),
    about_clients: home.statsClients.toString(),
    about_experts: home.statsExperts.toString(),
    welcome_title: home.welcomeTitle,
    welcome_description: home.welcomeDescription,
    welcome_image: home.welcomeImage,
    welcome_icon: home.welcomeIcon,
    cta_title: home.ctaTitle,
    cta_description: home.ctaDescription,
    cta_bg_image: home.ctaBgImage,

    // About Page
    about_title: about.title,
    about_description: about.description,
    about_bg_image: about.bgImage,

    // Contact
    contact_title: contact.title,
    contact_description: contact.description,
    contact_bg_image: contact.bgImage,
    contact_banner_image: contact.bannerImage,
    contact_email1: contact.email1,
    contact_email2: contact.email2 || '',
    contact_phone1: contact.phone1,
    contact_phone2: contact.phone2 || '',
    contact_address: contact.address,
    contact_facebook: contact.facebook || '',
    contact_twitter: contact.twitter || '',
    contact_linkedin: contact.linkedin || '',
    contact_instagram: contact.instagram || ''
  }

  const result: Record<string, string> = {}
  keys.forEach(k => {
    result[k] = map[k] !== undefined ? map[k] : ''
  })
  return result
}
