'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Check, 
  X, 
  MessageCircle, 
  Star,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Sparkles,
  Award,
  Crown,
  UserPlus
} from 'lucide-react'
import { useAuth, useApp } from '@/app/providers'
import { Affinity } from '@/types'
import { mockAffinities, mockUsers } from '@/lib/mockData'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface AffinityCardProps {
  affinity: Affinity & {
    user1_profile?: any
    user2_profile?: any
  }
  currentUserId: string
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onMessage: (userId: string) => void
}

function AffinityCard({ 
  affinity, 
  currentUserId, 
  onAccept, 
  onReject, 
  onMessage 
}: AffinityCardProps) {
  const isReceived = affinity.user2_id === currentUserId
  const isSent = affinity.user1_id === currentUserId
  const otherUser = isReceived ? affinity.user1_profile : affinity.user2_profile

  const getStatusColor = () => {
    switch (affinity.status) {
      case 'accepted': return 'text-green-500'
      case 'rejected': return 'text-red-500'
      case 'pending': return 'text-yellow-500'
      default: return 'text-neutral-400'
    }
  }

  const getStatusIcon = () => {
    switch (affinity.status) {
      case 'accepted': return <Check className="w-4 h-4" />
      case 'rejected': return <X className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const getStatusText = () => {
    if (affinity.status === 'accepted') {
      return isReceived ? 'Aceptó tu afinidad' : 'Afinidad mutua'
    }
    if (affinity.status === 'rejected') {
      return isReceived ? 'Rechazó tu afinidad' : 'Rechazaste esta afinidad'
    }
    return isReceived ? 'Expressó afinidad contigo' : 'Enviada'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="profile-card group"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-glass-lg overflow-hidden bg-primary-500/20 border border-glass-border">
            {otherUser?.avatar_url ? (
              <img 
                src={otherUser.avatar_url} 
                alt={otherUser.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
            )}
          </div>
          
          {/* Status badges */}
          <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
            {otherUser?.is_verified && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            {otherUser?.is_premium && (
              <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-neutral-900" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-neutral-100">
                {otherUser?.full_name || 'Usuario'}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-neutral-400">
                <span>{otherUser?.age} años</span>
                <span>•</span>
                <span>{otherUser?.city}</span>
              </div>
            </div>

            <div className={cn('flex items-center space-x-1', getStatusColor())}>
              {getStatusIcon()}
              <span className="text-sm font-medium capitalize">
                {affinity.status}
              </span>
            </div>
          </div>

          {/* Energy & Purpose */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="badge badge-primary">
              {otherUser?.energy_emotion}
            </span>
            {otherUser?.is_premium && (
              <span className="badge badge-warning">
                Premium
              </span>
            )}
          </div>

          {/* Similarity Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-neutral-400">Afinidad</span>
              <span className="text-primary-500 font-semibold">
                {Math.round(affinity.similarity_score * 100)}%
              </span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-primary-500 to-primary-300 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${affinity.similarity_score * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Common Interests */}
          {affinity.common_interests?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-neutral-400 mb-2">Intereses en común:</p>
              <div className="flex flex-wrap gap-1">
                {affinity.common_interests.slice(0, 3).map((interest, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-glass text-neutral-300 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
                {affinity.common_interests.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-glass text-neutral-400 rounded-full">
                    +{affinity.common_interests.length - 3} más
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Time */}
          <p className="text-xs text-neutral-500 mb-4">
            {formatRelativeTime(affinity.created_at)}
          </p>

          {/* Actions */}
          <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
            {affinity.status === 'pending' && isReceived && (
              <>
                <button
                  onClick={() => onReject(affinity.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-glass hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm">Rechazar</span>
                </button>
                <button
                  onClick={() => onAccept(affinity.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-glass hover:bg-green-500/30 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Aceptar</span>
                </button>
              </>
            )}

            {(affinity.status === 'accepted' || (isSent && affinity.status === 'pending')) && (
              <button
                onClick={() => onMessage(otherUser?.id || '')}
                className="flex items-center space-x-1 px-3 py-2 bg-primary-500/20 text-primary-400 rounded-glass hover:bg-primary-500/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Mensaje</span>
              </button>
            )}

            {isSent && affinity.status === 'rejected' && (
              <span className="text-sm text-red-400">
                Afinidad rechazada
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AffinitiesPage() {
  const { user } = useAuth()
  const { addNotification } = useApp()
  const [affinities, setAffinities] = useState<(Affinity & { user1_profile?: any; user2_profile?: any })[]>([])
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'matches'>('received')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load affinities
    const loadAffinities = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const enrichedAffinities = mockAffinities.map(affinity => ({
        ...affinity,
        user1_profile: mockUsers.find(u => u.id === affinity.user1_id),
        user2_profile: mockUsers.find(u => u.id === affinity.user2_id)
      }))
      
      setAffinities(enrichedAffinities)
      setIsLoading(false)
    }

    loadAffinities()
  }, [])

  const handleAccept = async (affinityId: string) => {
    try {
      setAffinities(prev => prev.map(aff => 
        aff.id === affinityId 
          ? { ...aff, status: 'accepted' as const }
          : aff
      ))

      toast.success('¡Afinidad aceptada! 💖')
      addNotification({
        type: 'success',
        title: 'Afinidad aceptada',
        message: 'Has aceptado esta conexión'
      })
    } catch (error) {
      toast.error('Error al aceptar la afinidad')
    }
  }

  const handleReject = async (affinityId: string) => {
    try {
      setAffinities(prev => prev.map(aff => 
        aff.id === affinityId 
          ? { ...aff, status: 'rejected' as const }
          : aff
      ))

      toast.success('Afinidad rechazada')
      addNotification({
        type: 'info',
        title: 'Afinidad rechazada',
        message: 'Has rechazado esta conexión'
      })
    } catch (error) {
      toast.error('Error al rechazar la afinidad')
    }
  }

  const handleMessage = (userId: string) => {
    // Navigate to chat with this user
    window.location.href = `/dashboard/chat?user=${userId}`
  }

  const filteredAffinities = affinities.filter(aff => {
    if (activeTab === 'received') return aff.user2_id === user?.id
    if (activeTab === 'sent') return aff.user1_id === user?.id
    if (activeTab === 'matches') return aff.status === 'accepted'
    return true
  })

  const stats = {
    received: affinities.filter(a => a.user2_id === user?.id).length,
    sent: affinities.filter(a => a.user1_id === user?.id).length,
    matches: affinities.filter(a => a.status === 'accepted').length,
    pending: affinities.filter(a => a.status === 'pending').length
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-300">Cargando afinidades...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100 mb-2">
            Afinidades y Conexiones
          </h1>
          <p className="text-neutral-300">
            Gestiona tus conexiones y encuentra tu media naranja
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Recibidas', value: stats.received, icon: Heart, color: 'text-red-500' },
            { label: 'Enviadas', value: stats.sent, icon: UserPlus, color: 'text-blue-500' },
            { label: 'Matches', value: stats.matches, icon: Star, color: 'text-green-500' },
            { label: 'Pendientes', value: stats.pending, icon: Clock, color: 'text-yellow-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-surface p-4 rounded-glass text-center"
            >
              <div className={cn('w-8 h-8 mx-auto mb-2', stat.color)}>
                <stat.icon className="w-full h-full" />
              </div>
              <p className="text-2xl font-bold text-neutral-100">{stat.value}</p>
              <p className="text-sm text-neutral-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-surface rounded-glass-lg overflow-hidden"
      >
        <div className="flex border-b border-glass-border">
          {[
            { id: 'received', label: `Recibidas (${stats.received})`, icon: Heart },
            { id: 'sent', label: `Enviadas (${stats.sent})`, icon: UserPlus },
            { id: 'matches', label: `Matches (${stats.matches})`, icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center space-x-2 px-6 py-4 font-medium transition-colors',
                activeTab === tab.id
                  ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-500/5'
                  : 'text-neutral-400 hover:text-neutral-300 hover:bg-glass'
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredAffinities.length > 0 ? (
                filteredAffinities.map((affinity) => (
                  <AffinityCard
                    key={affinity.id}
                    affinity={affinity}
                    currentUserId={user?.id || ''}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onMessage={handleMessage}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  {activeTab === 'received' && (
                    <>
                      <Heart className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                        No hay afinidades recibidas
                      </h3>
                      <p className="text-neutral-400 mb-6">
                        Cuando alguien expresse afinidad contigo, aparecerá aquí
                      </p>
                      <button
                        onClick={() => window.location.href = '/dashboard/search'}
                        className="btn-primary"
                      >
                        Buscar Personas
                      </button>
                    </>
                  )}

                  {activeTab === 'sent' && (
                    <>
                      <UserPlus className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                        No has enviado afinidades
                      </h3>
                      <p className="text-neutral-400 mb-6">
                        Explora perfiles y send afinidades para conectar
                      </p>
                      <button
                        onClick={() => window.location.href = '/dashboard/search'}
                        className="btn-primary"
                      >
                        Explorar Perfiles
                      </button>
                    </>
                  )}

                  {activeTab === 'matches' && (
                    <>
                      <Star className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                        No tienes matches aún
                      </h3>
                      <p className="text-neutral-400 mb-6">
                        Acepta afinidades para crear conexiones mutuas
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => setActiveTab('received')}
                          className="btn-secondary"
                        >
                          Ver Recibidas ({stats.received})
                        </button>
                        <button
                          onClick={() => window.location.href = '/dashboard/search'}
                          className="btn-primary"
                        >
                          Buscar Más
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* AI Suggestions */}
      {stats.matches === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-surface p-6 rounded-glass-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-neutral-100">
              Sugerencias IA para Mejorar Matches
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary-500/10 rounded-glass border border-primary-500/20">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-primary-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">
                    Completa tu perfil
                  </h3>
                  <p className="text-sm text-neutral-300">
                    Perfiles completos tienen 3x más afinidades
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-glass border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-neutral-100 mb-1">
                    Sé más activo
                  </h3>
                  <p className="text-sm text-neutral-300">
                    La actividad aumenta tu visibilidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}