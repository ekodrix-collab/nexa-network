require('dotenv').config({ path: '.env.local' })
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
    update: {
      welcomeImage: '/images/service_security.png'
    },
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
      welcomeImage: '/images/service_security.png',
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
  const services = require('./services-seed.json')

  for (const s of services) {
    const existing = await prisma.service.findUnique({
      where: { slug: s.slug }
    })
    if (!existing) {
      await prisma.service.create({ data: s })
    } else {
      await prisma.service.update({
        where: { id: existing.id },
        data: s
      })
    }
  }
  console.log('✅ Services seeded successfully.')

  // 6. Seed Projects
  const projects = [
    {
      title: 'FedEx Qatar Infrastructure Upgrade',
      client: 'FedEx Qatar',
      category: 'Network & Infrastructure',
      description: 'Complete network overhaul with structured cabling and WiFi.',
      tags: [],
      featured: true,
      orderIndex: 0,
      imageUrl: '/images/projects/fedex.jpg'
    },
    {
      title: 'Katara Cultural Village Smart Surveillance System',
      client: 'Katara Cultural Village',
      category: 'CCTV & Security',
      description: 'End-to-end CCTV with HD cameras and remote monitoring.',
      tags: [],
      featured: true,
      orderIndex: 1,
      imageUrl: '/images/projects/katara.jpg'
    },
    {
      title: 'Aida Clinic Cloud Migration',
      client: 'Aida Clinic',
      category: 'Cloud Solutions',
      description: 'Cloud migration to secure HIPAA-compliant infrastructure.',
      tags: [],
      featured: true,
      orderIndex: 2,
      imageUrl: '/images/projects/aida-clinic.jpg'
    },
    {
      title: 'Government Sector Cybersecurity Enhancement',
      client: 'Government Entity',
      category: 'Cyber Security',
      description: 'SOC implementation and firewall deployment.',
      tags: [],
      featured: true,
      orderIndex: 3,
      imageUrl: '/images/projects/government.jpg'
    }
  ]

  // Clear existing projects to align with the frontend seeding
  await prisma.project.deleteMany({})

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log('✅ Projects seeded successfully.')

  // 7. Seed Blog Posts
  const blogPosts = [
    {
      title: 'Future-proofing Qatar Enterprise Networks for 2026 and Beyond',
      slug: 'future-proofing-qatar-enterprise-networks',
      description: 'As business bandwidth demands surge, high-density structured cabling and active switches deployment are paramount. Discover how to plan your network backbone.',
      content: `Qatar enterprises are entering a phase of rapid digital transition where traditional gigabit network infrastructures are no longer sufficient. High-definition media streaming, zero-trust security inspection pipelines, and distributed cloud microservices demand higher throughput, lower latency, and highly resilient layouts.

Here is what enterprise networks should prepare for:
1. Cat6A or Fiber Optic Backbones: Traditional Cat6 is reaching its physical limits at 10 Gbps over longer distances. Upgrading main risers to Single-Mode or Multi-Mode OM4/OM5 fiber ensures future-proof link speeds of 40/100 Gbps.
2. Layer 3 Edge Switch Deployment: Routing at the edge of the network reduces core workload and prevents local segment traffic from bottlenecking primary routers.
3. High Density WiFi 7 Access Points: With Qatar's smart building push, modern office complexes require robust WiFi 7 deployment to support ultra-dense device environments.

Planning your transition now mitigates migration risks and ensures seamless operational continuity.`,
      readTime: '6 mins read',
      imageUrl: '/images/cta-bg.jpg'
    },
    {
      title: 'Zero-Trust Frameworks: Combating Modern Threats in the GCC Area',
      slug: 'zero-trust-frameworks-gcc',
      description: 'Implementing next-generation firewalls and Endpoint Detection Response (EDR) is no longer optional. Discover modern enterprise cyber security approaches.',
      content: `In the GCC region, cybersecurity threats have transitioned from simple malicious scripts to sophisticated, nation-state sponsored ransomware and identity hijacking campaigns. Modern organizations can no longer trust any traffic inside their perimeter by default.

Key pillars of a robust Zero-Trust model:
1. Micro-Segmentation: Restricting traffic flow between server subnets so that even if one server is compromised, lateral threat movement is prevented.
2. Multi-Factor Authentication (MFA): Enforcing hardware keys or push-based mobile MFA for all internal system controls.
3. Real-Time End-Point Telemetry: Continuously monitoring laptops, mobiles, and cloud containers for signs of anomalous behavior using AI-powered EDR agents.

Embracing zero-trust represents a paradigm shift from traditional firewall perimeters, ensuring threat mitigation before damage occurs.`,
      readTime: '8 mins read',
      imageUrl: '/images/cyber-future.png'
    },
    {
      title: 'The SSD Compliance Checklist: Passing CCTV Audits Easily',
      slug: 'ssd-compliance-checklist-cctv',
      description: 'A comprehensive roadmap to designing CCTV storage, frame rates, and camera layouts that meet Qatar SSD and Civil Defense directives perfectly.',
      content: `Operating a business or government site in Qatar requires strict alignment with the Security Systems Department (SSD) of the Ministry of Interior. CCTV systems must adhere to exact specifications for retention, image resolution, and camera placement.

SSD Compliance Essentials Checklist:
1. 120 Days Retention Period: CCTV recordings must be archived for a minimum of 120 days. Ensure storage calculations account for H.265 compression and specific frame rates.
2. Minimum 1080p Resolution: Cameras monitoring main entry/exit points, reception counters, and cashier counters must capture at a minimum of Full HD resolution with high-dynamic range (HDR) for face recognition under bright lighting.
3. Failover Power Supply (UPS): Active storage arrays and switches must be powered by enterprise UPS systems configured to keep systems online during utility outages.

Consulting certified integrators during the planning phase avoids costly redesigns and ensures audit approval on the first attempt.`,
      readTime: '5 mins read',
      imageUrl: '/images/about_who_we_are.png'
    }
  ]

  await prisma.blogPost.deleteMany({})
  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post })
  }
  console.log('✅ Blog posts seeded successfully.')

  // 8. Seed Careers
  const careers = [
    {
      title: 'Senior Network Infrastructure Engineer',
      department: 'Engineering',
      location: 'Doha, Qatar',
      type: 'Full-time',
      description: 'We are looking for a Senior Network Engineer with extensive experience in enterprise switching, fiber routing, and structured cabling design to lead complex client deployments in Qatar.',
      requirements: '• 5+ years of experience in network integration\n• Cisco CCNP or equivalent certification\n• Strong experience with Cat6A/Fiber optic design and testing\n• Knowledge of SSD regulations is a plus'
    },
    {
      title: 'Cybersecurity Threat Analyst',
      department: 'Security Operations',
      location: 'Doha, Qatar',
      type: 'Full-time',
      description: 'Join our SOC team to monitor, analyze, and mitigate security threats for enterprise clients in the finance, hospitality, and government sectors.',
      requirements: '• 3+ years working in a SOC or security monitoring role\n• Experience with EDR, SIEM systems (Splunk/ELK), and Next-Gen Firewalls\n• Certification like CEH, CISSP, or CompTIA Security+'
    },
    {
      title: 'CCTV & Systems Integration Technician',
      department: 'Field Installations',
      location: 'Doha, Qatar',
      type: 'Full-time',
      description: 'We need skilled field technicians to install and integrate CCTV cameras, biometrics access control, turnstiles, and tracking systems on client sites across Doha.',
      requirements: '• 2+ years field experience with CCTV and physical access control installations\n• Basic understanding of IP networks and switch configurations\n• SSD installation training certification preferred'
    }
  ]

  await prisma.career.deleteMany({})
  for (const c of careers) {
    await prisma.career.create({ data: c })
  }
  console.log('✅ Career openings seeded successfully.')

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
