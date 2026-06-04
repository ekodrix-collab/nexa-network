/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F05B1B',
          'orange-light': '#FF6B2B',
          'orange-dark': '#D94E0F',
          navy: '#0D1C22',
          'navy-light': '#111f26',
          'navy-deep': '#0a1518',
          black: '#070f12',
          'card': 'rgba(255,255,255,0.03)',
          'border': 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1', fontWeight: '900' }],
        'display-xl': ['3.75rem', { lineHeight: '1.05', fontWeight: '900' }],
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '800' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
        'grid-pattern': `linear-gradient(rgba(240,91,27,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(240,91,27,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'scroll-x': 'scrollX 30s linear infinite',
        'scroll-x-slow': 'scrollX 50s linear infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'border-spin': 'borderSpin 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scrollX: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(240,91,27,0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(240,91,27,0)' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(240,91,27,0.3)' },
          to: { boxShadow: '0 0 60px rgba(240,91,27,0.7)' },
        },
      },
      boxShadow: {
        'orange': '0 0 30px rgba(240,91,27,0.4)',
        'orange-lg': '0 0 60px rgba(240,91,27,0.5)',
        'orange-xl': '0 0 100px rgba(240,91,27,0.3)',
        'card': '0 4px 40px rgba(0,0,0,0.4)',
        'inner-white': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '60px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
