'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-200 text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
