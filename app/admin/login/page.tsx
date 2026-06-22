'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      router.push('/admin')
    } else {
      setError(data.error || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060D10] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#F05B1B]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-2xl shadow-[#F05B1B]/30 mb-4">
            <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white font-bold text-xl">Nexa Admin</h1>
          <p className="text-white/30 text-sm mt-1">Sign in to manage your website</p>
        </div>

        {/* Card */}
        <div className="bg-[#0A1520]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 shadow-2xl shadow-black/50">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-3 mb-5 rounded-lg bg-red-500/8 border border-red-500/15 text-red-400 text-xs">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F05B1B]/50 focus:bg-white/[0.06] transition-all duration-200"
                  placeholder="admin"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F05B1B]/50 focus:bg-white/[0.06] transition-all duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-lg bg-[#F05B1B] hover:bg-[#FF6B2B] disabled:bg-[#F05B1B]/40 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#F05B1B]/20"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/15 text-[10px] mt-6">
          Nexa Network Solutions • Admin Panel
        </p>
      </div>
    </div>
  )
}
