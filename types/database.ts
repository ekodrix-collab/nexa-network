export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service: string | null
          message: string
          status: 'new' | 'read' | 'replied'
          ip_address: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service?: string | null
          message: string
          status?: 'new' | 'read' | 'replied'
          ip_address?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied'
          ip_address?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          client: string
          category: string
          description: string
          image_url: string | null
          tags: string[]
          featured: boolean
          order_index: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          client: string
          category: string
          description: string
          image_url?: string | null
          tags?: string[]
          featured?: boolean
          order_index?: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          client?: string
          category?: string
          description?: string
          image_url?: string | null
          tags?: string[]
          featured?: boolean
          order_index?: number
        }
      }
      services: {
        Row: {
          id: string
          title: string
          subtitle: string
          description: string
          icon: string
          features: string[]
          order_index: number
          active: boolean
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          description: string
          icon: string
          features?: string[]
          order_index?: number
          active?: boolean
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          description?: string
          icon?: string
          features?: string[]
          order_index?: number
          active?: boolean
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type ContactInsert = Database['public']['Tables']['contacts']['Insert']
export type Project = Database['public']['Tables']['projects']['Row']
export type Service = Database['public']['Tables']['services']['Row']
