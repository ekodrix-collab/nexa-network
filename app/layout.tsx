import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'
import CinemaIntro from '@/components/ui/CinemaIntro'
import PageTransition from '@/components/ui/PageTransition'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Nexa Network Solutions | Enterprise IT Infrastructure Qatar',
    template: '%s | Nexa Network Solutions',
  },
  description: "Qatar's leading enterprise IT company delivering network infrastructure, cybersecurity, cloud computing, CCTV, smart entry management, and vehicle tracking solutions.",
  keywords: ['IT solutions Qatar', 'network infrastructure Qatar', 'cybersecurity Doha', 'cloud services Qatar', 'CCTV systems Qatar', 'access control Qatar', 'Nexa Network Solutions'],
  authors: [{ name: 'Nexa Network Solutions', url: 'https://nexa.com.qa' }],
  creator: 'Nexa Network Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_QA',
    url: 'https://nexa.com.qa',
    title: 'Nexa Network Solutions | Enterprise IT Infrastructure Qatar',
    description: 'Empowering businesses through smart technology. End-to-end IT solutions across Qatar.',
    siteName: 'Nexa Network Solutions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nexa Network Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa Network Solutions',
    description: 'Enterprise IT Infrastructure, Cybersecurity & Cloud Solutions in Qatar',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: { icon: '/favicon.ico', shortcut: '/favicon-16x16.png', apple: '/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6F8' },
    { media: '(prefers-color-scheme: dark)', color: '#070f12' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-[#F4F6F8] text-slate-800 dark:bg-brand-navy dark:text-white antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <CinemaIntro />
          <PageTransition>
            <ScrollProgress />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </PageTransition>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#111f26', color: '#fff', border: '1px solid rgba(240,91,27,0.3)', borderRadius: '12px', fontSize: '14px' },
              success: { iconTheme: { primary: '#F05B1B', secondary: '#fff' } },
            }}
          />
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
