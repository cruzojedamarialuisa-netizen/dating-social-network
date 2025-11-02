import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Fallback para desarrollo local sin Supabase
const isDevelopment = process.env.NODE_ENV === 'development'
const localStorage = typeof window !== 'undefined' ? window.localStorage : null

// Exportar createClient para compatibilidad
export { createClient }

// Cliente de Supabase o fallback local
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente local para desarrollo
const createLocalClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: (credentials: any) => {
      if (localStorage) {
        localStorage.setItem('mockUser', JSON.stringify({
          id: '123',
          email: credentials.email,
          user_metadata: { full_name: 'Usuario Demo' }
        }))
        return Promise.resolve({ data: { user: JSON.parse(localStorage.getItem('mockUser') || '{}') }, error: null })
      }
      return Promise.reject(new Error('No localStorage available'))
    },
    signUp: (credentials: any) => {
      if (localStorage) {
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: credentials.email,
          user_metadata: credentials.options?.data || {}
        }
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        return Promise.resolve({ data: { user: mockUser }, error: null })
      }
      return Promise.reject(new Error('No localStorage available'))
    },
    signOut: () => {
      if (localStorage) {
        localStorage.removeItem('mockUser')
      }
      return Promise.resolve({ error: null })
    },
    onAuthStateChange: (callback: any) => {
      // Mock listener
      return {
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        }
      }
    }
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
})

export const localClient = createLocalClient()

// Cliente activo basado en el entorno
export const client = isDevelopment && !supabaseUrl.includes('supabase.co') 
  ? localClient 
  : supabase

export default client
