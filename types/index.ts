export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Stat {
  value: number
  suffix: string
  label: string
  description: string
  icon: string
}

export interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  description: string
  features: string[]
  accent: string
  gradient: string
  href: string
}

export interface ProjectCard {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  tags: string[]
  color: string
}

export interface TechPartner {
  name: string
  logo: string
  category: string
}
