import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import ScrollProgress from '@/components/ui/ScrollProgress'

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
  themeColor: '#0D1C22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-brand-navy antialiased`}>
        <ScrollProgress />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#111f26', color: '#fff', border: '1px solid rgba(240,91,27,0.3)', borderRadius: '12px', fontSize: '14px' },
            success: { iconTheme: { primary: '#F05B1B', secondary: '#fff' } },
          }}
        />
        <a href="https://wa.me/97441459393" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-orange">
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </body>
    </html>
  )
}
