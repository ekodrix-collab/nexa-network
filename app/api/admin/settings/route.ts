import { NextResponse } from 'next/server'
import { 
  getSettings, 
  getHomePageContent, saveHomePageContent,
  getAboutPageContent, saveAboutPageContent,
  getContactInfo, saveContactInfo
} from '@/lib/settings'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')

  if (page === 'home') {
    const data = await getHomePageContent()
    return NextResponse.json(data)
  }
  if (page === 'about') {
    const data = await getAboutPageContent()
    return NextResponse.json(data)
  }
  if (page === 'contact') {
    const data = await getContactInfo()
    return NextResponse.json(data)
  }

  const keys = searchParams.get('keys')?.split(',') || []
  const data = await getSettings(keys)
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const token = cookies().get('admin_token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const data = await request.json()

    if (page === 'home') {
      await saveHomePageContent(data)
      return NextResponse.json({ success: true })
    }
    if (page === 'about') {
      await saveAboutPageContent(data)
      return NextResponse.json({ success: true })
    }
    if (page === 'contact') {
      await saveContactInfo(data)
      return NextResponse.json({ success: true })
    }

    // 1. Fallback: Check if saving Home Page fields from old key-value format
    const hasHomeKeys = Object.keys(data).some(k => [
      'hero_title', 'hero_subtitle', 'hero_description', 'hero_video', 'hero_image',
      'welcome_title', 'welcome_description', 'welcome_image', 'welcome_icon',
      'cta_title', 'cta_description', 'cta_bg_image',
      'about_years_exp', 'about_projects_delivered', 'about_clients', 'about_experts'
    ].includes(k))

    if (hasHomeKeys) {
      const current = await getHomePageContent()
      const updated = {
        heroTitle: data.hero_title !== undefined ? data.hero_title : current.heroTitle,
        heroSubtitle: data.hero_subtitle !== undefined ? data.hero_subtitle : current.heroSubtitle,
        heroDescription: data.hero_description !== undefined ? data.hero_description : current.heroDescription,
        heroVideo: data.hero_video !== undefined ? data.hero_video : current.heroVideo,
        heroImage: data.hero_image !== undefined ? data.hero_image : current.heroImage,
        statsYearsExp: data.about_years_exp !== undefined ? data.about_years_exp : current.statsYearsExp,
        statsProjects: data.about_projects_delivered !== undefined ? data.about_projects_delivered : current.statsProjects,
        statsClients: data.about_clients !== undefined ? data.about_clients : current.statsClients,
        statsExperts: data.about_experts !== undefined ? data.about_experts : current.statsExperts,
        welcomeTitle: data.welcome_title !== undefined ? data.welcome_title : current.welcomeTitle,
        welcomeDescription: data.welcome_description !== undefined ? data.welcome_description : current.welcomeDescription,
        welcomeImage: data.welcome_image !== undefined ? data.welcome_image : current.welcomeImage,
        welcomeIcon: data.welcome_icon !== undefined ? data.welcome_icon : current.welcomeIcon,
        ctaTitle: data.cta_title !== undefined ? data.cta_title : current.ctaTitle,
        ctaDescription: data.cta_description !== undefined ? data.cta_description : current.ctaDescription,
        ctaBgImage: data.cta_bg_image !== undefined ? data.cta_bg_image : current.ctaBgImage,
      }
      await saveHomePageContent(updated)
    }

    // 2. Fallback: Check if saving About Page fields from old key-value format
    const hasAboutKeys = Object.keys(data).some(k => [
      'about_title', 'about_description', 'about_bg_image'
    ].includes(k))

    if (hasAboutKeys) {
      const current = await getAboutPageContent()
      const updated = {
        title: data.about_title !== undefined ? data.about_title : current.title,
        description: data.about_description !== undefined ? data.about_description : current.description,
        bgImage: data.about_bg_image !== undefined ? data.about_bg_image : current.bgImage,
      }
      await saveAboutPageContent(updated)
    }

    // 3. Fallback: Check if saving Contact Page fields from old key-value format
    const hasContactKeys = Object.keys(data).some(k => [
      'contact_title', 'contact_description', 'contact_bg_image', 'contact_banner_image',
      'contact_email1', 'contact_email2', 'contact_phone1', 'contact_phone2',
      'contact_address', 'contact_facebook', 'contact_twitter', 'contact_linkedin', 'contact_instagram'
    ].includes(k))

    if (hasContactKeys) {
      const current = await getContactInfo()
      const updated = {
        title: data.contact_title !== undefined ? data.contact_title : current.title,
        description: data.contact_description !== undefined ? data.contact_description : current.description,
        bgImage: data.contact_bg_image !== undefined ? data.contact_bg_image : current.bgImage,
        bannerImage: data.contact_banner_image !== undefined ? data.contact_banner_image : current.bannerImage,
        email1: data.contact_email1 !== undefined ? data.contact_email1 : current.email1,
        email2: data.contact_email2 !== undefined ? data.contact_email2 : current.email2,
        phone1: data.contact_phone1 !== undefined ? data.contact_phone1 : current.phone1,
        phone2: data.contact_phone2 !== undefined ? data.contact_phone2 : current.phone2,
        address: data.contact_address !== undefined ? data.contact_address : current.address,
        facebook: data.contact_facebook !== undefined ? data.contact_facebook : current.facebook,
        twitter: data.contact_twitter !== undefined ? data.contact_twitter : current.twitter,
        linkedin: data.contact_linkedin !== undefined ? data.contact_linkedin : current.linkedin,
        instagram: data.contact_instagram !== undefined ? data.contact_instagram : current.instagram,
      }
      await saveContactInfo(updated)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
