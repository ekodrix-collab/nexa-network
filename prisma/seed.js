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

  // 2. Seed Default Settings
  const settingsToSeed = [
    { key: 'contact_email1', value: 'info@nexa.com.qa' },
    { key: 'contact_email2', value: 'support@nexa.com.qa' },
    { key: 'contact_phone1', value: '+974 4145 9393' },
    { key: 'contact_phone2', value: '+974 5555 1234' },
    { key: 'contact_address', value: 'Zone 55, Street 850, Building 67\nAl Rayyan, Doha, Qatar' },
    { key: 'contact_title', value: 'Get In Touch' },
    { key: 'contact_description', value: "We're here to help you with any queries..." },
    { key: 'contact_facebook', value: 'https://facebook.com/nexaqatar' },
    { key: 'contact_twitter', value: 'https://twitter.com/nexaqatar' },
    { key: 'contact_linkedin', value: 'https://linkedin.com/company/nexa' },
    { key: 'contact_instagram', value: 'https://instagram.com/nexaqatar' }
  ]

  for (const s of settingsToSeed) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s
    })
  }
  console.log('✅ Settings seeded successfully.')

  // 3. Seed Welcome Cards
  const welcomeCards = [
    {
      title: 'Secure Networks',
      description: 'Enterprise grade active and passive infrastructure setups.',
      icon: 'Network',
      orderIndex: 0
    },
    {
      title: 'Cyber Security',
      description: 'Advanced firewalls, penetration testing, and zero trust architectures.',
      icon: 'Shield',
      orderIndex: 1
    },
    {
      title: 'Cloud Solutions',
      description: 'Agile AWS/Azure migrations and custom software integration.',
      icon: 'Cloud',
      orderIndex: 2
    }
  ]

  for (const card of welcomeCards) {
    const existing = await prisma.welcomeCard.findFirst({
      where: { title: card.title }
    })
    if (!existing) {
      await prisma.welcomeCard.create({ data: card })
    }
  }
  console.log('✅ Welcome cards seeded.')

  // 4. Seed Services
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

  // 5. Seed Projects
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
