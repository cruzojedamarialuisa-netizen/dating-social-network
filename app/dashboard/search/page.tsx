'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  Gift,
  MessageCircle,
  Star,
  Verified,
  Crown,
  User,
  Calendar,
  X,
  Sliders,
  Grid3X3,
  List,
  Loader2
} from 'lucide-react'
import { useAuth, useApp } from '@/app/providers'
import { SearchFilters, UserProfile, EmotionType, PurposeOfLife } from '@/types'
import { EMOTION_TYPES, PURPOSES_OF_LIFE, generateId, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface FilterState {
  min_age: number
  max_age: number
  location: string
  energy_emotions: EmotionType[]
  purposes: PurposeOfLife[]
  verified_only: boolean
  premium_only: boolean
  is_online: boolean
  sort_by: 'distance' | 'activity' | 'affinity' | 'newest'
  sort_order: 'asc' | 'desc'
}

const initialFilters: FilterState = {
  min_age: 18,
  max_age: 65,
  location: '',
  energy_emotions: [],
  purposes: [],
  verified_only: false,
  premium_only: false,
  is_online: false,
  sort_by: 'activity',
  sort_order: 'desc'
}

interface UserCardProps {
  user: UserProfile
  onConnect: (userId: string) => void
  onAffinity: (userId: string) => void
  onGift: (userId: string) => void
  onMessage: (userId: string) => void
}

function UserCard({ user, onConnect, onAffinity, onGift, onMessage }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="profile-card group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Profile Image */}
      <div className="relative mb-4">
        <div className="w-32 h-32 mx-auto rounded-glass-lg overflow-hidden bg-glass border border-glass-border">
          {user.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-500/20">
              <User className="w-12 h-12 text-primary-500" />
            </div>
          )}
        </div>
        
        {/* Status indicators */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {user.is_verified && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Verified className="w-4 h-4 text-white" />
            </div>
          )}
          {user.is_premium && (
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-neutral-900" />
            </div>
          )}
        </div>

        {/* Online status */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
          <div className={cn(
            "w-3 h-3 rounded-full",
            user.status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-neutral-500'
          )} />
          <span className="text-xs text-neutral-300 capitalize">
            {user.status === 'available' ? 'En línea' : user.status}
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-neutral-100 flex items-center justify-center space-x-1">
          <span>{user.full_name}</span>
          <span className="text-sm text-neutral-400">{user.age}</span>
        </h3>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-neutral-400">
          <MapPin className="w-4 h-4" />
          <span>{user.city}, {user.country}</span>
        </div>

        {/* Energy & Purpose badges */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="badge badge-primary">
            {user.energy_emotion}
          </span>
        </div>

        <p className="text-sm text-neutral-300 line-clamp-2">
          {user.what_seeking}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onConnect(user.id)
          }}
          className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-300 transition-colors"
          title="Conectar"
        >
          <User className="w-5 h-5 text-neutral-900" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAffinity(user.id)
          }}
          className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
          title="Expresar afinidad"
        >
          <Heart className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onGift(user.id)
          }}
          className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors"
          title="Enviar regalo"
        >
          <Gift className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMessage(user.id)
          }}
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
          title="Enviar mensaje"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Hover overlay with more info */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-glass-lg flex items-end p-4"
          >
            <div className="text-white w-full">
              <p className="text-sm mb-1">Última conexión:</p>
              <p className="text-xs text-neutral-300">
                {formatDate(user.last_seen)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SearchPage() {
  const { user } = useAuth()
  const { addNotification } = useApp()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)

  // Mock users data
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUsers: UserProfile[] = Array.from({ length: 12 }, (_, i) => ({
        id: `user-${i + 1}`,
        user_id: `user-${i + 1}`,
        full_name: [
          'María González', 'Carlos Ruiz', 'Ana Martín', 'Diego López', 
          'Sofía Hernández', 'Juan Pérez', 'Elena Vargas', 'Roberto Silva',
          'Carmen Torres', 'Miguel Ángel', 'Lucía Fernández', 'Alejandro Castro'
        ][i],
        age: 22 + Math.floor(Math.random() * 30),
        city: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'][Math.floor(Math.random() * 5)],
        country: 'España',
        avatar_url: undefined,
        cover_photo_url: undefined,
        presentation_video_url: undefined,
        energy_emotion: EMOTION_TYPES[Math.floor(Math.random() * EMOTION_TYPES.length)],
        purpose_of_life: PURPOSES_OF_LIFE[Math.floor(Math.random() * PURPOSES_OF_LIFE.length)],
        what_seeking: 'Busco conexiones auténticas y personas con intereses comunes',
        what_inspires: 'La música, los viajes y las conversaciones profundas',
        is_verified: Math.random() > 0.6,
        is_premium: Math.random() > 0.7,
        beats_balance: Math.floor(Math.random() * 1000),
        last_seen: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        status: ['available', 'away', 'in_date'][Math.floor(Math.random() * 3)] as any,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))
      
      setUsers(mockUsers)
      setIsLoading(false)
    }

    loadUsers()
  }, [])

  const handleConnect = (userId: string) => {
    addNotification({
      type: 'info',
      title: 'Conexión enviada',
      message: 'Has enviado una solicitud de conexión'
    })
    toast.success('Conexión enviada correctamente')
  }

  const handleAffinity = (userId: string) => {
    addNotification({
      type: 'success',
      title: 'Afinidad expresada',
      message: 'Has expresado afinidad con esta persona'
    })
    toast.success('Afinidad enviada 💖')
  }

  const handleGift = (userId: string) => {
    addNotification({
      type: 'info',
      title: 'Regalo enviado',
      message: 'Has enviado un regalo especial'
    })
    toast.success('Regalo enviado 🎁')
  }

  const handleMessage = (userId: string) => {
    // Navigate to chat with this user
    window.location.href = `/dashboard/chat?user=${userId}`
  }

  const filteredUsers = users.filter(u => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return u.full_name.toLowerCase().includes(query) ||
             u.city.toLowerCase().includes(query) ||
             u.energy_emotion.toLowerCase().includes(query)
    }
    return true
  })

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
            Buscar Personas
          </h1>
          <p className="text-neutral-300">
            Encuentra conexiones afines a tu energía y propósito
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-glass rounded-glass border border-glass-border p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-400 hover:text-neutral-300'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-primary-500 text-neutral-900' : 'text-neutral-400 hover:text-neutral-300'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-surface p-4 lg:p-6 rounded-glass-lg"
      >
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, ciudad o energía..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'btn-secondary flex items-center space-x-2 px-6',
              showFilters && 'bg-primary-500 text-neutral-900 border-primary-500'
            )}
          >
            <Sliders className="w-5 h-5" />
            <span>Filtros</span>
            {(filters.energy_emotions.length > 0 || filters.purposes.length > 0 || 
              filters.verified_only || filters.premium_only || filters.is_online) && (
              <span className="w-2 h-2 bg-primary-300 rounded-full" />
            )}
          </button>

          <button
            className="btn-primary px-6"
            onClick={() => {
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 1500)
            }}
          >
            Buscar
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-glass-border space-y-6"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Edad: {filters.min_age} - {filters.max_age}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={filters.min_age}
                      onChange={(e) => setFilters(prev => ({ ...prev, min_age: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={filters.max_age}
                      onChange={(e) => setFilters(prev => ({ ...prev, max_age: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad o región"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field w-full"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={`${filters.sort_by}-${filters.sort_order}`}
                    onChange={(e) => {
                      const [sort_by, sort_order] = e.target.value.split('-')
                      setFilters(prev => ({ 
                        ...prev, 
                        sort_by: sort_by as any, 
                        sort_order: sort_order as any 
                      }))
                    }}
                    className="input-field w-full"
                  >
                    <option value="activity-desc">Más activos</option>
                    <option value="activity-asc">Menos activos</option>
                    <option value="newest-desc">Más recientes</option>
                    <option value="newest-asc">Más antiguos</option>
                    <option value="affinity-desc">Mayor afinidad</option>
                    <option value="affinity-desc">Menor afinidad</option>
                  </select>
                </div>

                {/* Quick Filters */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-300">
                    Filtros rápidos
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.verified_only}
                        onChange={(e) => setFilters(prev => ({ ...prev, verified_only: e.target.checked }))}
                        className="custom-checkbox mr-2"
                      />
                      <span className="text-sm text-neutral-300">Solo verificados</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.premium_only}
                        onChange={(e) => setFilters(prev => ({ ...prev, premium_only: e.target.checked }))}
                        className="custom-checkbox mr-2"
                      />
                      <span className="text-sm text-neutral-300">Solo premium</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.is_online}
                        onChange={(e) => setFilters(prev => ({ ...prev, is_online: e.target.checked }))}
                        className="custom-checkbox mr-2"
                      />
                      <span className="text-sm text-neutral-300">Solo en línea</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Emotion & Purpose Filters */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Energía emocional
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTION_TYPES.map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            energy_emotions: prev.energy_emotions.includes(emotion)
                              ? prev.energy_emotions.filter(e => e !== emotion)
                              : [...prev.energy_emotions, emotion]
                          }))
                        }}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs border transition-colors',
                          filters.energy_emotions.includes(emotion)
                            ? 'bg-primary-500 text-neutral-900 border-primary-500'
                            : 'border-neutral-500 text-neutral-300 hover:border-primary-500'
                        )}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Propósito de vida
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PURPOSES_OF_LIFE.slice(0, 8).map((purpose) => (
                      <button
                        key={purpose}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            purposes: prev.purposes.includes(purpose)
                              ? prev.purposes.filter(p => p !== purpose)
                              : [...prev.purposes, purpose]
                          }))
                        }}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs border transition-colors',
                          filters.purposes.includes(purpose)
                            ? 'bg-primary-500 text-neutral-900 border-primary-500'
                            : 'border-neutral-500 text-neutral-300 hover:border-primary-500'
                        )}
                      >
                        {purpose.substring(0, 25)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="large" text="Buscando personas increíbles..." />
          </div>
        ) : (
          <div className={cn(
            "profiles-grid",
            viewMode === 'list' && "grid-cols-1"
          )}>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <UserCard
                  user={user}
                  onConnect={handleConnect}
                  onAffinity={handleAffinity}
                  onGift={handleGift}
                  onMessage={handleMessage}
                />
              </motion.div>
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">
              No se encontraron personas
            </h3>
            <p className="text-neutral-400 mb-6">
              Intenta ajustar tus filtros o búsqueda
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters(initialFilters)
              }}
              className="btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}