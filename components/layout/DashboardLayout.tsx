'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/app/providers'
import Navigation from './Navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    // Initialize user data or perform any setup
    if (user && !isInitialized) {
      setIsInitialized(true)
    }
  }, [user, loading, router, isInitialized])

  // Show loading screen while checking authentication
  if (loading || (!user && !pathname.includes('/auth/'))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex items-center justify-center">
        <LoadingSpinner size="large" text="Cargando Conexión Real..." />
      </div>
    )
  }

  // Don't show dashboard layout for auth pages
  if (pathname.includes('/auth/')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
      <Navigation />
      
      {/* Main Content */}
      <main className={`
        lg:ml-64 lg:w-[calc(100vw-16rem)] transition-all duration-300
        min-h-screen pb-20 lg:pb-8
      `}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}