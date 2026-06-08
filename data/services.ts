import { Network, Shield, Cloud, DoorOpen, Camera, Truck, Monitor, Globe, Server, Lock, Database, Wifi, Activity, Eye, Zap, Search, Fingerprint, ShieldCheck, Codesandbox, Cpu, HardDrive, Users } from 'lucide-react'

export const serviceData = [
  {
    slug: 'network-infrastructure',
    seo: {
      title: 'Network & Passive Infrastructure Solutions | Nexa Network',
      description: 'Design, implement, and maintain secure and scalable network infrastructure that keeps your business connected and future-ready.',
      keywords: ['Network Infrastructure', 'Passive Infrastructure', 'Structured Cabling', 'Data Center Setup', 'Qatar IT Services', 'LAN/WAN Design', 'Enterprise Networking']
    },
    hero: {
      title: 'Network Infrastructure &',
      highlight: 'Passive Infrastructure',
      description: 'We design, implement, and maintain secure and scalable network infrastructure that keeps your business connected and future-ready.',
      image: '/images/network_hero.png',
      stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '150+', label: 'Projects Delivered' },
        { value: '50+', label: 'Happy Clients' },
        { value: '24/7', label: 'Support & Maintenance' }
      ]
    },
    overview: {
      title: 'Secure & Scalable Network Infrastructure Solutions',
      description: 'Build a strong foundation for your business with reliable and high-performance network infrastructure. At Nexa Network, we design, implement, and maintain complete networking systems that ensure seamless connectivity, security, and scalability for modern enterprises.',
      image: '/images/network_overview.png',
      features: [
        'Structured Cabling (Copper & Fiber)',
        'Network Security & Firewall Setup',
        'Data Center Setup & Rack Installation',
        'Wireless Networking Solutions',
        'LAN/WAN Network Design',
        'Ongoing Network Monitoring'
      ]
    },
    projects: [
      {
        category: 'Data Center Infrastructure',
        title: 'Enterprise Data Center Upgrade',
        description: 'Complete data center cabling, rack setup and network infrastructure for high availability.',
        image: '/images/project_datacenter_1780917785829.png',
        link: '#'
      },
      {
        category: 'Network Infrastructure',
        title: 'Corporate Network Infrastructure',
        description: 'Designed and implemented secure network infrastructure for a multi-location enterprise.',
        image: '/images/project_network_1780917803018.png',
        link: '#'
      },
      {
        category: 'Passive Infrastructure',
        title: 'Structured Cabling Deployment',
        description: 'End-to-end structured cabling solution for a large commercial complex.',
        image: '/images/project_cabling_1780917817633.png',
        link: '#'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Assessment',
        description: 'We analyze your current network and business requirements to identify gaps and opportunities.',
        icon: Activity
      },
      {
        num: '02',
        title: 'Design & Planning',
        description: 'Our experts create a tailor-made network design for optimal performance and scalability.',
        icon: Search
      },
      {
        num: '03',
        title: 'Implementation',
        description: 'We deploy the infrastructure with precision and industry best practices for minimal downtime.',
        icon: Server
      },
      {
        num: '04',
        title: 'Testing & Support',
        description: 'Rigorous testing ensures reliability. We provide ongoing support to keep your systems running.',
        icon: Shield
      }
    ],
    faqs: [
      {
        question: 'What is the difference between active and passive infrastructure?',
        answer: 'Passive infrastructure includes non-electronic components like structured cabling, server racks, and patch panels that provide the foundation. Active infrastructure includes electronic devices like switches, routers, and firewalls that actively direct network traffic.'
      },
      {
        question: 'How long does a typical network infrastructure project take?',
        answer: 'The timeline varies depending on the scale and complexity of the project. A small office setup might take a few weeks, while an enterprise-level data center deployment could span several months. We provide a detailed timeline during the planning phase.'
      },
      {
        question: 'Do you provide ongoing support and maintenance?',
        answer: 'Yes, we offer comprehensive 24/7 support and maintenance contracts (SLA) to proactively monitor your network, perform necessary upgrades, and resolve issues before they impact your business.'
      },
      {
        question: 'Can you upgrade our existing network infrastructure?',
        answer: 'Absolutely. We specialize in analyzing legacy systems and upgrading them with modern, scalable, and secure technologies without causing significant disruption to your daily operations.'
      }
    ]
  },
  {
    slug: 'cyber-security',
    seo: {
      title: 'IT Solutions & Integration Services | Nexa Network',
      description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats.',
      keywords: ['Cyber Security', 'IT Solutions', 'Firewall Setup', 'Endpoint Protection', 'SOC', 'Data Security']
    },
    hero: {
      title: 'IT Solutions &',
      highlight: 'Integration Services',
      description: 'Advanced cybersecurity solutions designed to protect your systems, data, and digital assets from evolving cyber threats and sophisticated attacks.',
      image: '/images/service_security.jpg',
      stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '200+', label: 'Secured Systems' },
        { value: '99.9%', label: 'Threat Prevention' },
        { value: '24/7', label: 'SOC Monitoring' }
      ]
    },
    overview: {
      title: 'Zero-Trust Security & Enterprise Integration',
      description: 'Protect your enterprise with military-grade encryption, zero-trust frameworks, and continuous threat monitoring. We integrate seamlessly with your existing IT stack to provide robust defense without hindering productivity.',
      image: '/images/service_security.jpg',
      features: [
        'Next-Gen Firewall & UTM',
        'Endpoint Detection & Response',
        'Security Operations Center (SOC)',
        'Penetration Testing & Audits',
        'Email Security & Anti-Phishing',
        'Security Awareness Training'
      ]
    },
    projects: [
      {
        category: 'Financial Sector',
        title: 'Banking Network Security Overhaul',
        description: 'Implemented zero-trust architecture and SOC for a major financial institution.',
        image: '/images/projects/cyber_banking_1780919557335.png',
        link: '#'
      },
      {
        category: 'Enterprise IT',
        title: 'Multi-Site Firewall Deployment',
        description: 'Unified threat management deployment across 12 branch offices.',
        image: '/images/projects/cyber_firewall_1780919571231.png',
        link: '#'
      },
      {
        category: 'Healthcare',
        title: 'Hospital Data Protection',
        description: 'Secured patient data with end-to-end encryption and compliance auditing.',
        image: '/images/projects/cyber_hospital_1780919586356.png',
        link: '#'
      }
    ],
    process: [
      { num: '01', title: 'Threat Assessment', description: 'Comprehensive audit of your current vulnerabilities.', icon: Search },
      { num: '02', title: 'Security Architecture', description: 'Designing a tailored zero-trust defense framework.', icon: ShieldCheck },
      { num: '03', title: 'Deployment', description: 'Installing firewalls, endpoint protection, and monitoring tools.', icon: Lock },
      { num: '04', title: '24/7 Monitoring', description: 'Continuous SOC oversight and incident response.', icon: Eye }
    ],
    faqs: [
      { question: 'What is a zero-trust architecture?', answer: 'Zero Trust is a security framework requiring all users, whether in or outside the organization\'s network, to be authenticated, authorized, and continuously validated before being granted or keeping access to applications and data.' },
      { question: 'How do you handle a cyber attack?', answer: 'Our 24/7 SOC immediately isolates the affected systems, neutralizes the threat, and restores data from secure backups while providing a detailed post-incident forensic report.' }
    ]
  },
  {
    slug: 'cloud-computing',
    seo: {
      title: 'Cloud Computing & IT Software Services | Nexa Network',
      description: 'Scalable cloud solutions to store, manage, and access your data and applications efficiently from anywhere.',
      keywords: ['Cloud Computing', 'Azure', 'AWS', 'Cloud Migration', 'SaaS', 'Disaster Recovery']
    },
    hero: {
      title: 'Cloud Computing &',
      highlight: 'IT Software Services',
      description: 'Scalable cloud solutions to securely store, manage, and access your data and applications from anywhere in the world.',
      image: '/images/service_cloud.jpg',
      stats: [
        { value: '3+', label: 'Cloud Platforms' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '100+', label: 'Cloud Migrations' },
        { value: '24/7', label: 'Cloud Support' }
      ]
    },
    overview: {
      title: 'Secure & Scalable Cloud Solutions',
      description: 'Transform your business with agile cloud infrastructure. Whether you need a public, private, or hybrid cloud solution, we help you migrate, manage, and optimize your workloads on leading platforms like Azure and AWS.',
      image: '/images/service_cloud.jpg',
      features: [
        'Cloud Migration Strategy',
        'Microsoft Azure & AWS Setup',
        'Backup & Disaster Recovery',
        'SaaS Application Setup',
        'Hybrid Cloud Architecture',
        'Cloud Cost Optimization'
      ]
    },
    projects: [
      { category: 'Cloud Migration', title: 'Enterprise Azure Migration', description: 'Successfully migrated legacy on-premise servers to Azure.', image: '/images/projects/cloud_migration_1780919614901.png', link: '#' },
      { category: 'Disaster Recovery', title: 'Cloud Backup Implementation', description: 'Automated off-site disaster recovery protocols for zero data loss.', image: '/images/projects/cloud_backup_1780919628334.png', link: '#' },
      { category: 'SaaS Setup', title: 'Microsoft 365 Deployment', description: 'Company-wide rollout of M365 and SharePoint for 500+ users.', image: '/images/projects/cloud_saas_1780919641857.png', link: '#' }
    ],
    process: [
      { num: '01', title: 'Cloud Readiness Assessment', description: 'Evaluating your workloads for cloud compatibility.', icon: Cloud },
      { num: '02', title: 'Migration Strategy', description: 'Planning a phased migration to ensure zero downtime.', icon: Codesandbox },
      { num: '03', title: 'Execution', description: 'Securely transferring data and applications to the cloud.', icon: Server },
      { num: '04', title: 'Optimization & Support', description: 'Monitoring performance and optimizing cloud spend.', icon: Activity }
    ],
    faqs: [
      { question: 'Is the cloud secure?', answer: 'Yes, modern cloud platforms like Azure and AWS invest billions in security. We configure robust access controls, encryption, and monitoring to ensure your cloud environment is highly secure.' },
      { question: 'How long does a cloud migration take?', answer: 'A migration can take anywhere from a few weeks to several months, depending on the complexity and volume of your data and applications.' }
    ]
  },
  {
    slug: 'conference-room',
    seo: {
      title: 'Conference Room & Office IT Services | Nexa Network',
      description: 'Smart conference room audio-visual setups and office IT integration.',
      keywords: ['Conference Room IT', 'Office AV', 'Smart Displays', 'IT Setup', 'Workspace Automation']
    },
    hero: {
      title: 'Conference Room &',
      highlight: 'Office IT Services',
      description: 'Deploy next-generation conference room audio-visual setups, smart projectors, interactive displays, and robust office IT integration.',
      image: '/images/hero-bg.jpg',
      stats: [
        { value: '50+', label: 'Boardrooms Setup' },
        { value: '4K', label: 'Display Systems' },
        { value: '100%', label: 'Wireless Integration' },
        { value: '24/7', label: 'Technical Support' }
      ]
    },
    overview: {
      title: 'Smart Office Collaboration',
      description: 'Modernize your meeting spaces to support hybrid work environments. We design intuitive, high-quality audio-visual systems that make virtual collaboration feel as natural as being in the same room.',
      image: '/images/hero-bg.jpg',
      features: [
        'AV Conference Systems',
        'Smart Interactive Displays',
        'Workspace Scheduling',
        'PA & Sound Systems',
        'Wireless Presentation Tools',
        'IT Hardware Procurement'
      ]
    },
    projects: [
      { category: 'Executive Boardroom', title: 'CEO Boardroom AV Setup', description: 'Implemented a 4K dual-screen video conferencing system.', image: '/images/projects/conf_ceo_1780919662230.png', link: '#' },
      { category: 'Workspace', title: 'Smart Office Automation', description: 'Integrated room scheduling and automated lighting systems.', image: '/images/projects/conf_smart_1780919678755.png', link: '#' },
      { category: 'Auditorium', title: 'Corporate Townhall PA System', description: 'High-fidelity audio system for a 500-seat corporate auditorium.', image: '/images/projects/conf_auditorium_1780919692070.png', link: '#' }
    ],
    process: [
      { num: '01', title: 'Space Analysis', description: 'Evaluating room acoustics and lighting.', icon: Eye },
      { num: '02', title: 'AV Design', description: 'Selecting the right hardware for crystal-clear audio and video.', icon: Monitor },
      { num: '03', title: 'Installation', description: 'Professional cabling and mounting of all equipment.', icon: HardDrive },
      { num: '04', title: 'User Training', description: 'Teaching your team how to seamlessly use the new systems.', icon: Users }
    ],
    faqs: [
      { question: 'Do you support Zoom and Microsoft Teams?', answer: 'Yes, we design hardware agnostic systems or dedicated Teams/Zoom Rooms depending on your organization\'s primary communication platform.' },
      { question: 'Can you hide the cables?', answer: 'Absolutely. We specialize in clean, professional installations where all cabling is routed through tables, walls, or floors for a sleek aesthetic.' }
    ]
  },
  {
    slug: 'smart-entry',
    seo: {
      title: 'Smart Entry Management | Nexa Network',
      description: 'Intelligent access control systems for modern workplaces ensuring secure entry management.',
      keywords: ['Access Control', 'Biometrics', 'RFID', 'Time & Attendance', 'Turnstiles']
    },
    hero: {
      title: 'Smart Entry',
      highlight: 'Management',
      description: 'Intelligent access control systems for modern workplaces ensuring secure and efficient entry management for your facilities.',
      image: '/images/service_access.jpg',
      stats: [
        { value: '500+', label: 'Doors Secured' },
        { value: '10k+', label: 'Daily Users' },
        { value: '100%', label: 'Compliance' },
        { value: '24/7', label: 'Support SLA' }
      ]
    },
    overview: {
      title: 'Advanced Access Control Solutions',
      description: 'Regulate who enters your premises with state-of-the-art access control. From simple RFID card readers to advanced biometric scanners, we provide scalable solutions for businesses of all sizes.',
      image: '/images/service_access.jpg',
      features: [
        'Biometric Access Control',
        'RFID Card Systems',
        'Time & Attendance Tracking',
        'Visitor Management Systems',
        'Turnstile & Barrier Gates',
        'Mobile Credentialing'
      ]
    },
    projects: [
      { category: 'Enterprise Access', title: 'Multi-Floor Biometric Security', description: 'Installed facial recognition access control across a 10-story office.', image: '/images/projects/entry_biometric_1780919714907.png', link: '#' },
      { category: 'Physical Security', title: 'Lobby Turnstile Integration', description: 'Sleek glass turnstiles integrated with the HR attendance system.', image: '/images/projects/entry_turnstile_1780919728899.png', link: '#' },
      { category: 'Vehicle Entry', title: 'Automated Barrier Gates', description: 'UHF RFID readers for seamless employee parking access.', image: '/images/projects/entry_barrier_1780919741882.png', link: '#' }
    ],
    process: [
      { num: '01', title: 'Site Survey', description: 'Identifying critical entry points and security requirements.', icon: Search },
      { num: '02', title: 'System Design', description: 'Mapping out the hardware and software architecture.', icon: Cpu },
      { num: '03', title: 'Installation', description: 'Mounting readers, controllers, and electronic locks.', icon: Lock },
      { num: '04', title: 'Software Integration', description: 'Linking the system with HR and payroll software.', icon: Database }
    ],
    faqs: [
      { question: 'Can access control be linked to payroll?', answer: 'Yes, we integrate Time & Attendance systems directly with popular HR and payroll software to automate timesheets.' },
      { question: 'What happens during a power outage?', answer: 'Our systems are installed with battery backups. Additionally, electronic locks can be configured to fail-safe (open) or fail-secure (locked) depending on fire safety regulations.' }
    ]
  },
  {
    slug: 'web-development',
    seo: {
      title: 'Website Development & Digital Solutions | Nexa Network',
      description: 'Establish a powerful online presence with bespoke website design and enterprise web applications.',
      keywords: ['Web Development', 'App Development', 'SEO', 'UI/UX Design', 'E-commerce']
    },
    hero: {
      title: 'Website Development &',
      highlight: 'Digital Solutions',
      description: 'Establish a powerful online presence with bespoke website design, enterprise web applications, and digital marketing optimizations.',
      image: '/images/hero-bg.jpg',
      stats: [
        { value: '100+', label: 'Websites Launched' },
        { value: '100%', label: 'Custom Design' },
        { value: 'SEO', label: 'Optimized Code' },
        { value: '99.9%', label: 'Hosting Uptime' }
      ]
    },
    overview: {
      title: 'Custom Web & Mobile Applications',
      description: 'We build fast, secure, and highly scalable digital platforms. From corporate websites to complex e-commerce stores, our development team uses modern tech stacks to deliver exceptional user experiences.',
      image: '/images/hero-bg.jpg',
      features: [
        'Custom Web Development',
        'E-commerce Platforms',
        'UI/UX Design Systems',
        'SEO & Digital Marketing',
        'Web Hosting & Support',
        'Custom API Integrations'
      ]
    },
    projects: [
      { category: 'E-Commerce', title: 'Retail Online Store', description: 'Built a high-converting e-commerce platform with payment gateway integration.', image: '/images/hero-bg.jpg', link: '#' },
      { category: 'Corporate Web', title: 'Real Estate Portal', description: 'Developed a dynamic property listing website with advanced search filters.', image: '/images/projects/aida-clinic.jpg', link: '#' },
      { category: 'Web App', title: 'Custom ERP Dashboard', description: 'Created a bespoke web application for internal inventory management.', image: '/images/service_cloud.jpg', link: '#' }
    ],
    process: [
      { num: '01', title: 'Discovery', description: 'Understanding your brand, audience, and business goals.', icon: Search },
      { num: '02', title: 'UI/UX Design', description: 'Creating wireframes and stunning visual prototypes.', icon: Eye },
      { num: '03', title: 'Development', description: 'Writing clean, scalable, and secure code.', icon: Codesandbox },
      { num: '04', title: 'Launch & SEO', description: 'Deploying the site and optimizing for search engines.', icon: Zap }
    ],
    faqs: [
      { question: 'Do you use templates or custom designs?', answer: 'We build 100% custom designs tailored to your brand identity to ensure you stand out from the competition.' },
      { question: 'Will my website be mobile-friendly?', answer: 'Absolutely. All our websites are built with a mobile-first approach, ensuring they look and perform perfectly on smartphones and tablets.' }
    ]
  },
  {
    slug: 'vehicle-tracking',
    seo: {
      title: 'Vehicle Tracking Solutions | Nexa Network',
      description: 'Real-time GPS tracking and fleet management solutions to optimize vehicle performance.',
      keywords: ['Vehicle Tracking', 'GPS Fleet Management', 'Route Optimization', 'Telematics']
    },
    hero: {
      title: 'Vehicle Tracking',
      highlight: 'Solutions',
      description: 'Real-time GPS tracking and fleet management solutions to optimize vehicle performance, reduce costs, and ensure fleet security.',
      image: '/images/service_tracking.jpg',
      stats: [
        { value: '500+', label: 'Vehicles Tracked' },
        { value: '99%', label: 'Live Accuracy' },
        { value: '30%', label: 'Cost Reduction' },
        { value: '24/7', label: 'Support & Alerts' }
      ]
    },
    overview: {
      title: 'Real-Time Vehicle Tracking & Fleet Management',
      description: 'Optimize your fleet operations with advanced GPS tracking systems. Nexa provides real-time tracking solutions that improve safety, efficiency, and operational control.',
      image: '/images/service_tracking.jpg',
      features: [
        'GPS Tracking Systems',
        'Real-Time Monitoring',
        'Route Optimization',
        'Fuel Monitoring',
        'Fleet Analytics'
      ]
    },
    projects: [
      { category: 'Logistics', title: 'Delivery Fleet Tracking', description: 'Implemented real-time tracking for a 50-vehicle delivery fleet.', image: '/images/projects/fedex.jpg', link: '#' },
      { category: 'Construction', title: 'Heavy Equipment Monitoring', description: 'Installed rugged GPS units to monitor heavy machinery usage and fuel.', image: '/images/service_tracking.jpg', link: '#' },
      { category: 'Corporate', title: 'Executive Vehicle Security', description: 'Discreet tracking systems installed for corporate executive vehicles.', image: '/images/projects/government.jpg', link: '#' }
    ],
    process: [
      { num: '01', title: 'Consultation', description: 'Understanding your fleet size and specific tracking needs.', icon: Search },
      { num: '02', title: 'Hardware Setup', description: 'Professional, covert installation of GPS trackers in vehicles.', icon: HardDrive },
      { num: '03', title: 'Software Config', description: 'Setting up geo-fences, alerts, and management dashboards.', icon: Monitor },
      { num: '04', title: 'Training', description: 'Training your logistics team to utilize the tracking software.', icon: Users }
    ],
    faqs: [
      { question: 'Can I track vehicles from my phone?', answer: 'Yes, our solution includes a mobile app for iOS and Android that allows you to monitor your entire fleet in real-time from anywhere.' },
      { question: 'How does it help reduce fuel costs?', answer: 'By monitoring excessive idling, unauthorized vehicle use, and optimizing routing, our clients typically see a 15-30% reduction in fuel expenses.' }
    ]
  },
  {
    slug: 'cctv-surveillance',
    seo: {
      title: 'CCTV & Surveillance Systems | Nexa Network',
      description: 'High-definition surveillance solutions that provide real-time monitoring and AI analytics.',
      keywords: ['CCTV Systems', 'IP Cameras', 'NVR', 'Video Analytics', 'Qatar Security']
    },
    hero: {
      title: 'CCTV & Surveillance',
      highlight: 'Systems',
      description: 'High-definition surveillance solutions that provide real-time monitoring, remote access, and AI-powered analytics for enhanced security.',
      image: '/images/service_cctv.jpg',
      stats: [
        { value: '1000+', label: 'Cameras Installed' },
        { value: '4K', label: 'Ultra HD Vision' },
        { value: 'SSD', label: 'Compliant Systems' },
        { value: '24/7', label: 'Continuous Recording' }
      ]
    },
    overview: {
      title: 'Smart Video Security & SSD Compliance',
      description: 'Protect your premises with state-of-the-art IP camera systems. We specialize in designing CCTV networks that meet local SSD and Civil Defense regulations, utilizing AI analytics for proactive threat detection.',
      image: '/images/service_cctv.jpg',
      features: [
        'HD/4K IP Camera Systems',
        'NVR & Large Storage Solutions',
        'Remote Monitoring Apps',
        'AI Video Analytics',
        'License Plate Recognition (ANPR)',
        'Thermal Cameras'
      ]
    },
    projects: [
      { category: 'Commercial Security', title: 'Shopping Mall Surveillance', description: 'Deployed a 200+ camera 4K IP system with central monitoring.', image: '/images/service_cctv.jpg', link: '#' },
      { category: 'Industrial', title: 'Warehouse Perimeter Defense', description: 'Installed thermal cameras and AI analytics for night-time intrusion detection.', image: '/images/projects/katara.jpg', link: '#' },
      { category: 'Residential', title: 'Luxury Villa Security', description: 'Discreet, high-definition camera coverage with remote mobile access.', image: '/images/service_access.jpg', link: '#' }
    ],
    process: [
      { num: '01', title: 'Security Audit', description: 'Mapping out blind spots and critical monitoring zones.', icon: Eye },
      { num: '02', title: 'System Design', description: 'Selecting appropriate camera types and storage capacities.', icon: Cpu },
      { num: '03', title: 'Deployment', description: 'Running cables and installing cameras with precision.', icon: Camera },
      { num: '04', title: 'Configuration', description: 'Setting up NVRs, motion detection, and remote access.', icon: Monitor }
    ],
    faqs: [
      { question: 'Are your systems SSD compliant?', answer: 'Yes, we design and install CCTV systems that fully comply with the State of Qatar Security Systems Department (SSD) regulations.' },
      { question: 'How long can the footage be stored?', answer: 'Storage duration depends on your requirements and SSD regulations (typically 30 to 120 days). We provide scalable NVR and server storage solutions to meet any retention policy.' }
    ]
  }
]
