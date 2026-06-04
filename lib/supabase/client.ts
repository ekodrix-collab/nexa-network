import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

// Client-side Supabase instance
// Uses environment variables — works with custom domains
// No direct supabase.co/products references in code
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Singleton for client components
let clientInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!clientInstance) {
    clientInstance = createClient()
  }
  return clientInstance
}
