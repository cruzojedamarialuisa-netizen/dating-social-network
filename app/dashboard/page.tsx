'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  User, 
  Gift, 
  Calendar,
  Bell,
  Zap,
  Star,
  TrendingUp,
  Users,
  Eye,
  Activity
} from 'lucide-react'
import { useAuth, useApp } from '@/app/providers'
import { formatDate, generateId } from '@/lib/utils'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface DashboardStats {
  totalViews: number
  newMessages: number
  newAffinities: number
  newGifts: number
  todayLogins: number
  weeklyLogins: number
}

interface QuickAction {
  id: string
  label: string
  icon: any
  color: string
  href: string
  badge?: number
  description: string
}

interface RecentActivity {
  id: string
  type: 'message' | 'affinity' | 'gift' | 'view' | 'login'
  user: {
    name: string
    avatar?: string
  }
  message: string
  time: string
  status?: 'online' | 'offline'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { addNotification, onlineUsers } = useApp()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalViews: 0,
    newMessages: 0,
    newAffinities: 0,
    newGifts: 0,
    todayLogins: 0,
    weeklyLogins: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('¡Buenos días')
    } else if (hour < 18) {
      setGreeting('¡Buenas tardes')
    } else {
      setGreeting('¡Buenas noches')
    }

    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock data
      setStats({
        totalViews: 142,
        newMessages: 5,
        newAffinities: 2,
        newGifts: 3,
        todayLogins: 8,
        weeklyLogins: 45
      })

      setRecentActivity([
        {
          id: generateId(),
          type: 'message',
          user: { name: 'María González' },
          message: '¡Hola! Me encanta tu perfil...',
          time: formatDate(new Date())
        },
        {
          id: generateId(),
          type: 'affinity',
          user: { name: 'Carlos Ruiz' },
          message: 'Expresó afinidad contigo',
          time: formatDate(new Date(Date.now() - 2 * 60 * 60 * 1000))
        },
        {
          id: generateId(),
          type: 'gift',
          user: { name: 'Ana Martín' },
          message: 'Te envió una rosa 🌹',
          time: formatDate(new Date(Date.now() - 4 * 60 * 60 * 1000))
        },
        {
          id: generateId(),
          type: 'view',
          user: { name: 'Diego López' },
          message: 'Vió tu perfil',
          time: formatDate(new Date(Date.now() - 6 * 60 * 60 * 1000))
        },
        {
          id: generateId(),
          type: 'login',
          user: { name: 'Sofía Hernández' },
          message: 'Se conectó recientemente',
          time: formatDate(new Date(Date.now() - 8 * 60 * 60 * 1000))
        }
      ])

      setIsLoading(false)
    }

    loadDashboardData()
  }, [])

  const quickActions: QuickAction[] = [
    {
      id: 'search',
      label: 'Buscar Personas',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      href: '/dashboard/search',
      description: 'Encuentra nuevas conexiones'
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      href: '/dashboard/chat',
      badge: stats.newMessages,
      description: 'Tus conversaciones'
    },
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: User,
      color: 'from-purple-500 to-purple-600',
      href: '/dashboard/profile',
      description: 'Edita tu información'
    },
    {
      id: 'gifts',
      label: 'Regalos',
      icon: Gift,
      color: 'from-pink-500 to-pink-600',
      href: '/dashboard/gifts',
      badge: stats.newGifts,
      description: 'Créditos y regalos'
    },
    {
      id: 'affinities',
      label: 'Afinidades',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      href: '/dashboard/affinities',
      badge: stats.newAffinities,
      description: 'Conexiones mutuas'
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      href: '/dashboard/events',
      description: 'Actividades en vivo'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageCircle
      case 'affinity': return Heart
      case 'gift': return Gift
      case 'view': return Eye
      case 'login': return Activity
      default: return Bell
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-green-500'
      case 'affinity': return 'text-red-500'
      case 'gift': return 'text-pink-500'
      case 'view': return 'text-blue-500'
      case 'login': return 'text-orange-500'
      default: return 'text-neutral-400'
    }
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Cargando tu dashboard..." />
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-surface p-6 rounded-glass-lg"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100 mb-2">
              {greeting}, {user?.user_metadata?.full_name?.split(' ')[0] || 'Usuario'}! 👋
            </h1>
            <p className="text-neutral-300 text-lg">
              Es un gran día para conectar con personas increíbles
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-neutral-400">Estado actual</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-neutral-300">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'Vistas Hoy',
            value: stats.totalViews,
            icon: Eye,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
          },
          {
            label: 'Mensajes Nuevos',
            value: stats.newMessages,
            icon: MessageCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
          },
          {
            label: 'Afinidades',
            value: stats.newAffinities,
            icon: Heart,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10'
          },
          {
            label: 'Regalos',
            value: stats.newGifts,
            icon: Gift,
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="profile-card text-center"
          >
            <div className={`w-12 h-12 ${stat.bgColor} rounded-glass flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-neutral-100">{stat.value}</p>
            <p className="text-sm text-neutral-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.id}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="profile-card group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-glass flex items-center justify-center flex-shrink-0`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-neutral-100 truncate">
                      {action.label}
                    </h3>
                    {action.badge && action.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 truncate">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Suggestions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-surface p-6 rounded-glass-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-100">Actividad Reciente</h2>
            <Bell className="w-5 h-5 text-neutral-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              const colorClass = getActivityColor(activity.type)
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-glass hover:bg-glass transition-colors">
                  <div className={`w-8 h-8 bg-glass rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${colorClass}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-neutral-100 truncate">
                        {activity.user.name}
                      </p>
                      {activity.status && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-300 truncate">{activity.message}</p>
                    <p className="text-xs text-neutral-400">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-surface p-6 rounded-glass-lg"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-neutral-100">Sugerencias IA</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-primary-500/10 rounded-glass border border-primary-500/20">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-neutral-900" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-100 mb-1">
                    Match del día
                  </p>
                  <p className="text-sm text-neutral-300">
                    Ana comparte tu energía alegre y amor por los viajes ✈️
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-glass border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-100 mb-1">
                    Tendencia activa
                  </p>
                  <p className="text-sm text-neutral-300">
                    12 personas verificadas online con tu misma edad
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 rounded-glass border border-green-500/20">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-100 mb-1">
                    Próximo evento
                  </p>
                  <p className="text-sm text-neutral-300">
                    Speed Dating Virtual - Mañana 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}