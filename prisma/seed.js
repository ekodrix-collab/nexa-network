const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // 1. Seed default Admin User
  const adminUsername = 'admin.nexa@gmail.com'
  const adminPassword = 'admin@123!'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { password: hashedPassword },
    create: {
      username: adminUsername,
      password: hashedPassword
    }
  })
  console.log(`✅ Default admin user created/updated!`)
  console.log(`   Username: ${adminUsername}`)
  console.log(`   Password: ${adminPassword}`)

  // 2. Seed Default Home Page Content
  await prisma.homePageContent.upsert({
    where: { id: 'default_home' },
    update: {},
    create: {
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
      ctaBgImage: '/images/cta-bg.jpg'
    }
  })
  console.log('✅ Default Home Page Content seeded.')

  // 3. Seed Default About Page Content
  await prisma.aboutPageContent.upsert({
    where: { id: 'default_about' },
    update: {},
    create: {
      id: 'default_about',
      title: 'About Nexa Network Solutions',
      description: "We are Qatar's leading enterprise IT company delivering cutting-edge integration solutions.",
      bgImage: '/images/about-bg.jpg'
    }
  })
  console.log('✅ Default About Page Content seeded.')

  // 4. Seed Default Contact Info
  await prisma.contactInfo.upsert({
    where: { id: 'default_contact' },
    update: {},
    create: {
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
      instagram: 'https://instagram.com/nexaqatar'
    }
  })
  console.log('✅ Default Contact Info seeded.')

  // 5. Seed Services
  const services = [
    {
      title: 'Network & Passive Infrastructure',
      subtitle: 'Secure & Scalable Solutions',
      description: 'We design, implement, and maintain secure and scalable network infrastructure that keeps your business connected and future-ready.',
      icon: 'Network',
      features: [
        'Structured Cabling (Copper & Fiber)',
        'Network Security & Firewall Setup',
        'Data Center Setup & Rack Installation',
        'Wireless Networking Solutions',
        'LAN/WAN Network Design',
        'Ongoing Network Monitoring'
      ],
      orderIndex: 0,
      active: true
    },
    {
      title: 'IT Solutions & Integration Services',
      subtitle: 'Zero-Trust Security & Enterprise Integration',
      description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats and sophisticated attacks.',
      icon: 'Shield',
      features: [
        'Next-Gen Firewall & UTM',
        'Endpoint Detection & Response',
        'Security Operations Center (SOC)',
        'Penetration Testing & Audits',
        'Email Security & Anti-Phishing',
        'Security Awareness Training'
      ],
      orderIndex: 1,
      active: true
    },
    {
      title: 'Cloud Computing & IT Software Services',
      subtitle: 'Secure & Scalable Cloud Solutions',
      description: 'Scalable cloud solutions to securely store, manage, and access your data and applications from anywhere in the world.',
      icon: 'Cloud',
      features: [
        'Cloud Migration Strategy',
        'Microsoft Azure & AWS Setup',
        'Backup & Disaster Recovery',
        'SaaS Application Setup',
        'Hybrid Cloud Architecture',
        'Cloud Cost Optimization'
      ],
      orderIndex: 2,
      active: true
    },
    {
      title: 'Conference Room & Office IT Services',
      subtitle: 'Smart Office Collaboration',
      description: 'Deploy next-generation conference room audio-visual setups, smart projectors, interactive displays, and robust office IT integration.',
      icon: 'Monitor',
      features: [
        'AV Conference Systems',
        'Smart Interactive Displays',
        'Workspace Scheduling',
        'PA & Sound Systems',
        'Wireless Presentation Tools',
        'IT Hardware Procurement'
      ],
      orderIndex: 3,
      active: true
    },
    {
      title: 'Smart Entry Management',
      subtitle: 'Advanced Access Control Solutions',
      description: 'Intelligent access control systems for modern workplaces ensuring secure and efficient entry management for your facilities.',
      icon: 'Lock',
      features: [
        'Biometric Access Control',
        'RFID Card Systems',
        'Time & Attendance Tracking',
        'Visitor Management Systems',
        'Turnstile & Barrier Gates',
        'Mobile Credentialing'
      ],
      orderIndex: 4,
      active: true
    },
    {
      title: 'Website Development & Digital Solutions',
      subtitle: 'Custom Web & Mobile Applications',
      description: 'Establish a powerful online presence with bespoke website design, enterprise web applications, and digital marketing optimizations.',
      icon: 'Globe',
      features: [
        'Custom Web Development',
        'E-commerce Platforms',
        'UI/UX Design Systems',
        'SEO & Digital Marketing',
        'Web Hosting & Support',
        'Custom API Integrations'
      ],
      orderIndex: 5,
      active: true
    },
    {
      title: 'Vehicle Tracking Solutions',
      subtitle: 'Real-Time Tracking & Fleet Management',
      description: 'Real-time GPS tracking and fleet management solutions to optimize vehicle performance, reduce costs, and ensure fleet security.',
      icon: 'Truck',
      features: [
        'GPS Tracking Systems',
        'Real-Time Monitoring',
        'Route Optimization',
        'Fuel Monitoring',
        'Fleet Analytics'
      ],
      orderIndex: 6,
      active: true
    },
    {
      title: 'CCTV & Surveillance Systems',
      subtitle: 'Smart Video Security & SSD Compliance',
      description: 'High-definition surveillance solutions that provide real-time monitoring, remote access, and AI-powered analytics for enhanced security.',
      icon: 'Camera',
      features: [
        'HD/4K IP Camera Systems',
        'NVR & Large Storage Solutions',
        'Remote Monitoring Apps',
        'AI Video Analytics',
        'License Plate Recognition (ANPR)',
        'Thermal Cameras'
      ],
      orderIndex: 7,
      active: true
    }
  ]

  for (const s of services) {
    const existing = await prisma.service.findFirst({
      where: { title: s.title }
    })
    if (!existing) {
      await prisma.service.create({ data: s })
    }
  }
  console.log('✅ Services seeded successfully.')

  // 6. Seed Projects
  const projects = [
    {
      title: 'Enterprise Data Center Upgrade',
      client: 'Qatar Commercial Bank',
      category: 'Data Center Infrastructure',
      description: 'Complete data center cabling, rack setup and network infrastructure for high availability.',
      tags: ['Cabling', 'Data Center', 'Fiber Optic'],
      featured: true,
      orderIndex: 0
    },
    {
      title: 'Banking Network Security Overhaul',
      client: 'Doha Trust Bank',
      category: 'Cyber Security',
      description: 'Implemented zero-trust architecture and SOC for a major financial institution.',
      tags: ['Zero-Trust', 'SOC', 'Firewall'],
      featured: true,
      orderIndex: 1
    },
    {
      title: 'Enterprise Azure Migration',
      client: 'Nexa Logistics Group',
      category: 'Cloud Computing',
      description: 'Successfully migrated legacy on-premise servers to Azure.',
      tags: ['Azure', 'Cloud Migration', 'DevOps'],
      featured: true,
      orderIndex: 2
    }
  ]

  for (const p of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: p.title }
    })
    if (!existing) {
      await prisma.project.create({ data: p })
    }
  }
  console.log('✅ Projects seeded successfully.')

  console.log('🌱 Seeding process complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
