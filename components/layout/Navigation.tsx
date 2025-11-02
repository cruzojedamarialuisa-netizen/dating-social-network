'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Search, 
  MessageCircle, 
  User, 
  Gift, 
  Heart, 
  Settings,
  Bell,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Shield,
  Crown,
  Calendar,
  MoreHorizontal
} from 'lucide-react'
import { useAuth, useApp } from '@/app/providers'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Inicio',
    icon: Home,
    href: '/dashboard',
    description: 'Panel principal y bienvenida'
  },
  {
    id: 'search',
    label: 'Buscar Personas',
    icon: Search,
    href: '/dashboard/search',
    description: 'Encuentra nuevas conexiones'
  },
  {
    id: 'chat',
    label: 'Mensajes',
    icon: MessageCircle,
    href: '/dashboard/chat',
    description: 'Conversaciones en tiempo real'
  },
  {
    id: 'profile',
    label: 'Mi Perfil',
    icon: User,
    href: '/dashboard/profile',
    description: 'Edita tu información personal'
  },
  {
    id: 'gifts',
    label: 'Regalos',
    icon: Gift,
    href: '/dashboard/gifts',
    description: 'Créditos y regalos virtuales'
  },
  {
    id: 'affinities',
    label: 'Afinidades',
    icon: Heart,
    href: '/dashboard/affinities',
    description: 'Conexiones mutuas'
  },
  {
    id: 'events',
    label: 'Eventos',
    icon: Calendar,
    href: '/dashboard/events',
    description: 'Actividades en vivo'
  }
]

const adminItems = [
  {
    id: 'admin',
    label: 'Administración',
    icon: Shield,
    href: '/admin',
    description: 'Panel de administración'
  }
]

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { notifications, theme, toggleTheme } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read).length

  const isActivePath = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="mobile-nav lg:hidden z-50">
        {navigationItems.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex flex-col items-center space-y-1 p-2 rounded-glass transition-colors',
              isActivePath(item.href) 
                ? 'text-primary-500 bg-primary-500/10' 
                : 'text-neutral-400 hover:text-primary-500'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center space-y-1 p-2 rounded-glass text-neutral-400 hover:text-primary-500 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs">Más</span>
        </button>
      </nav>

      {/* Desktop Sidebar */}
      <aside className={cn(
        'desktop-nav fixed left-0 top-0 z-40 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64 lg:w-72',
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-glass-border">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-glass flex items-center justify-center">
                    <Heart className="w-5 h-5 text-neutral-900" />
                  </div>
                  <span className="text-lg font-bold text-gradient">Conexión Real</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-glass text-neutral-400 hover:text-primary-500 hover:bg-glass transition-colors"
            >
              <ChevronLeft className={cn(
                "w-5 h-5 transition-transform",
                isCollapsed && "rotate-180"
              )} />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-neutral-900 font-semibold text-sm">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm font-medium text-neutral-100 truncate">
                        {user.user_metadata?.full_name || 'Usuario'}
                      </p>
                      <div className="flex items-center space-x-2">
                        {user.user_metadata?.is_premium && (
                          <Crown className="w-3 h-3 text-primary-500" />
                        )}
                        <span className="text-xs text-neutral-400">En línea</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'nav-link group',
                  isActivePath(item.href) && 'active'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}

            {/* Admin Section */}
            {user?.user_metadata?.role === 'admin' && (
              <>
                <div className="pt-4 border-t border-glass-border">
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3"
                      >
                        Administración
                      </motion.h3>
                    )}
                  </AnimatePresence>
                  
                  {adminItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        'nav-link group',
                        isActivePath(item.href) && 'active'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="truncate"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-glass-border space-y-2">
            {/* Notifications */}
            <button
              className="nav-link relative w-full"
              title={isCollapsed ? 'Notificaciones' : undefined}
            >
              <Bell className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="truncate"
                  >
                    Notificaciones
                  </motion.span>
                )}
              </AnimatePresence>
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="nav-link w-full"
              title={isCollapsed ? 'Tema' : undefined}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="truncate"
                  >
                    {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              title={isCollapsed ? 'Cerrar Sesión' : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="truncate"
                  >
                    Cerrar Sesión
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] glass-surface border-r border-glass-border p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-glass flex items-center justify-center">
                    <Heart className="w-5 h-5 text-neutral-900" />
                  </div>
                  <span className="text-lg font-bold text-gradient">Conexión Real</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-glass text-neutral-400 hover:text-primary-500 hover:bg-glass transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'nav-link',
                      isActivePath(item.href) && 'active'
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <span>{item.label}</span>
                      <p className="text-xs text-neutral-400">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}