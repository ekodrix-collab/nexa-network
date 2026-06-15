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
  const aboutData = {
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
    ctaDescription: 'Let us help you transform your business with smart IT infrastructure and cybersecurity solutions.'
  }

  await prisma.aboutPageContent.upsert({
    where: { id: 'default_about' },
    update: aboutData,
    create: {
      id: 'default_about',
      ...aboutData
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
