-- ============================================================
-- NEXA NETWORK SOLUTIONS — SUPABASE DATABASE SETUP
-- Run this SQL in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── CONTACTS TABLE ──
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  ip_address TEXT
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.contacts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can submit contact" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- ── PROJECTS TABLE ──
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Service role manage projects" ON public.projects
  FOR ALL USING (auth.role() = 'service_role');

-- ── SERVICES TABLE ──
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Service role manage services" ON public.services
  FOR ALL USING (auth.role() = 'service_role');

-- ── SEED PROJECTS ──
INSERT INTO public.projects (title, client, category, description, tags, featured, order_index)
VALUES
  ('Network Infrastructure Upgrade', 'FedEx Qatar', 'Network & Infrastructure',
   'Complete network overhaul for FedEx Qatar including structured cabling and WiFi.',
   ARRAY['Network', 'WiFi', 'Cabling'], true, 1),
  ('Smart Surveillance Deployment', 'Katara Cultural Village', 'CCTV & Security',
   'End-to-end CCTV system across Katara with HD cameras and centralized NVR.',
   ARRAY['CCTV', 'NVR', 'Security'], true, 2),
  ('Cloud Migration Project', 'Aida Clinic', 'Cloud Solutions',
   'Full cloud migration to secure healthcare-compliant infrastructure.',
   ARRAY['Cloud', 'Migration', 'Healthcare'], true, 3),
  ('Cybersecurity Enhancement', 'Government Sector', 'Cyber Security',
   'SOC implementation and enterprise firewall deployment for Qatar government entity.',
   ARRAY['Security', 'SOC', 'Firewall'], true, 4);

-- ── SEED SERVICES ──
INSERT INTO public.services (title, subtitle, description, icon, features, order_index)
VALUES
  ('Network Infrastructure', 'Passive & Active Networks',
   'Design and implement reliable network infrastructure.',
   'Network', ARRAY['Structured Cabling', 'LAN/WAN', 'WiFi', 'Monitoring'], 1),
  ('Cyber Security Solutions', 'IT Security & Protection',
   'Advanced cybersecurity to protect systems and data.',
   'Shield', ARRAY['Firewall', 'Endpoint Security', 'SOC', 'Pen Testing'], 2),
  ('Cloud Computing Services', 'Cloud & IT Solutions',
   'Scalable cloud solutions for modern business.',
   'Cloud', ARRAY['Cloud Migration', 'Azure/AWS', 'Backup', 'SaaS'], 3),
  ('Smart Entry Management', 'Access Control Systems',
   'Intelligent access control for modern workplaces.',
   'DoorOpen', ARRAY['Biometric', 'Card Systems', 'Attendance', 'Visitor'], 4),
  ('CCTV & Surveillance', 'Smart Video Security',
   'HD surveillance with real-time monitoring.',
   'Camera', ARRAY['HD CCTV', 'NVR', 'Remote View', 'AI Analytics'], 5),
  ('Vehicle Tracking Solutions', 'GPS Fleet Management',
   'Real-time GPS tracking for fleet optimization.',
   'Truck', ARRAY['Real-time GPS', 'Reports', 'Routes', 'Driver Score'], 6);
