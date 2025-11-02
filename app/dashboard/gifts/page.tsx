'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Gift, 
  Heart, 
  Plus, 
  ShoppingCart, 
  CreditCard,
  History,
  Star,
  Crown,
  Coins,
  Zap,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react'
import { useAuth, useApp } from '@/app/providers'
import { Gift as GiftType, GiftTransaction } from '@/types'
import { mockGifts } from '@/lib/mockData'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface GiftCardProps {
  gift: GiftType
  onSelect: (gift: GiftType) => void
  isSelected: boolean
  disabled?: boolean
}

function GiftCard({ gift, onSelect, isSelected, disabled = false }: GiftCardProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={() => !disabled && onSelect(gift)}
      className={cn(
        'profile-card cursor-pointer relative overflow-hidden',
        isSelected && 'ring-2 ring-primary-500 ring-offset-2 ring-offset-neutral-900',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* Gift Icon/Animation */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-glass-lg flex items-center justify-center">
          <span className="text-3xl">{gift.icon}</span>
        </div>
      </div>

      {/* Gift Info */}
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-neutral-100">{gift.name}</h3>
        <p className="text-sm text-neutral-400 min-h-[2rem]">{gift.description}</p>
        
        <div className="flex items-center justify-center space-x-1">
          <Coins className="w-4 h-4 text-primary-500" />
          <span className="text-primary-500 font-semibold">{gift.price}</span>
          <span className="text-xs text-neutral-400">Latidos</span>
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-neutral-900" />
        </div>
      )}
    </motion.div>
  )
}

interface TransactionHistoryProps {
  transactions: GiftTransaction[]
}

function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <Gift className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <p className="text-neutral-400">No tienes transacciones aún</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 bg-glass rounded-glass border border-glass-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-500/20 rounded-glass flex items-center justify-center">
              <Gift className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-100">
                Regalo enviado
              </p>
              <p className="text-xs text-neutral-400">
                {formatRelativeTime(transaction.created_at)}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4 text-primary-500" />
              <span className="text-primary-500 font-semibold">-{transaction.beats_spent}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GiftsPage() {
  const { user } = useAuth()
  const { addNotification } = useApp()
  const [gifts, setGifts] = useState<GiftType[]>(mockGifts)
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null)
  const [beatsBalance, setBeatsBalance] = useState(500)
  const [activeTab, setActiveTab] = useState<'shop' | 'history' | 'purchase'>('shop')
  const [isSending, setIsSending] = useState(false)
  const [transactions, setTransactions] = useState<GiftTransaction[]>([])

  useEffect(() => {
    // Load user's transactions
    const mockTransactions: GiftTransaction[] = [
      {
        id: '1',
        sender_id: user?.id || 'user-current',
        receiver_id: 'user-1',
        gift_id: 'gift-1',
        beats_spent: 1,
        message: 'Para una persona especial 🌹',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        sender_id: user?.id || 'user-current',
        receiver_id: 'user-3',
        gift_id: 'gift-3',
        beats_spent: 3,
        message: 'Espero que te guste 💌',
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ]
    setTransactions(mockTransactions)
  }, [user])

  const handleSelectGift = (gift: GiftType) => {
    setSelectedGift(gift)
  }

  const handleSendGift = async () => {
    if (!selectedGift) return

    setIsSending(true)
    try {
      // Simulate sending gift
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (beatsBalance < selectedGift.price) {
        toast.error('No tienes suficientes Latidos')
        return
      }

      // Deduct beats
      setBeatsBalance(prev => prev - selectedGift.price)

      // Add to transactions
      const newTransaction: GiftTransaction = {
        id: Date.now().toString(),
        sender_id: user?.id || 'user-current',
        receiver_id: 'user-1', // Mock receiver
        gift_id: selectedGift.id,
        beats_spent: selectedGift.price,
        message: '¡Regalo enviado con amor! 💖',
        created_at: new Date().toISOString()
      }
      
      setTransactions(prev => [newTransaction, ...prev])
      setSelectedGift(null)

      toast.success(`¡Regalo de ${selectedGift.name} enviado! 🎁`)
      addNotification({
        type: 'success',
        title: 'Regalo enviado',
        message: `Has enviado un ${selectedGift.name} exitosamente`
      })
    } catch (error) {
      toast.error('Error al enviar el regalo')
    } finally {
      setIsSending(false)
    }
  }

  const handlePurchaseBeats = async (amount: number) => {
    try {
      // Simulate purchase
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setBeatsBalance(prev => prev + amount)
      toast.success(`¡Has comprado ${amount} Latidos!`)
      
      addNotification({
        type: 'success',
        title: 'Compra exitosa',
        message: `${amount} Latidos agregados a tu cuenta`
      })
    } catch (error) {
      toast.error('Error en la compra')
    }
  }

  const purchaseOptions = [
    { amount: 50, price: '€2.99', popular: false },
    { amount: 100, price: '€4.99', popular: true },
    { amount: 250, price: '€9.99', popular: false },
    { amount: 500, price: '€16.99', popular: false },
    { amount: 1000, price: '€29.99', popular: false }
  ]

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
            Regalos y Latidos
          </h1>
          <p className="text-neutral-300">
            Expresa tus sentimientos con regalos virtuales
          </p>
        </div>

        {/* Balance Card */}
        <div className="glass-surface p-4 rounded-glass-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-500/20 rounded-glass flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Saldo Actual</p>
              <p className="text-2xl font-bold text-primary-500">{beatsBalance}</p>
              <p className="text-xs text-neutral-400">Latidos</p>
            </div>
          </div>
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
            { id: 'shop', label: 'Tienda de Regalos', icon: Gift },
            { id: 'purchase', label: 'Comprar Latidos', icon: CreditCard },
            { id: 'history', label: 'Historial', icon: History }
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
          {activeTab === 'shop' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Selected Gift Preview */}
              {selectedGift && (
                <div className="bg-gradient-to-r from-primary-500/10 to-pink-500/10 rounded-glass-lg p-6 border border-primary-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-pink-500/20 rounded-glass-lg flex items-center justify-center">
                        <span className="text-2xl">{selectedGift.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-100">
                          {selectedGift.name}
                        </h3>
                        <p className="text-neutral-300">{selectedGift.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Coins className="w-4 h-4 text-primary-500" />
                          <span className="text-primary-500 font-semibold">{selectedGift.price} Latidos</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedGift(null)}
                        className="btn-secondary"
                        disabled={isSending}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSendGift}
                        disabled={isSending || beatsBalance < selectedGift.price}
                        className="btn-primary flex items-center space-x-2"
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Gift className="w-4 h-4" />
                            <span>Enviar Regalo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Gifts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gifts.map((gift, index) => (
                  <motion.div
                    key={gift.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GiftCard
                      gift={gift}
                      onSelect={handleSelectGift}
                      isSelected={selectedGift?.id === gift.id}
                      disabled={beatsBalance < gift.price}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'purchase' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Current Balance */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500/10 to-pink-500/10 rounded-glass-lg px-6 py-4 border border-primary-500/20">
                  <Coins className="w-8 h-8 text-primary-500" />
                  <div className="text-left">
                    <p className="text-sm text-neutral-400">Saldo Actual</p>
                    <p className="text-3xl font-bold text-primary-500">{beatsBalance}</p>
                    <p className="text-sm text-neutral-400">Latidos</p>
                  </div>
                </div>
              </div>

              {/* Purchase Options */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {purchaseOptions.map((option, index) => (
                  <motion.div
                    key={option.amount}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'profile-card text-center relative cursor-pointer group',
                      option.popular && 'ring-2 ring-primary-500 ring-offset-2 ring-offset-neutral-900'
                    )}
                    onClick={() => handlePurchaseBeats(option.amount)}
                  >
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary-500 text-neutral-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Más Popular</span>
                        </div>
                      </div>
                    )}

                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-pink-500/20 rounded-glass-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Coins className="w-8 h-8 text-primary-500" />
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                      {option.amount}
                    </h3>
                    <p className="text-neutral-400 mb-4">Latidos</p>
                    
                    <div className="text-xl font-semibold text-primary-500">
                      {option.price}
                    </div>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-primary w-full">
                        Comprar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-glass-lg p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-neutral-100 mb-4 text-center">
                  ¿Por qué comprar Latidos?
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Heart,
                      title: 'Expresar Sentimientos',
                      description: 'Envía regalos especiales para mostrar tu interés'
                    },
                    {
                      icon: Star,
                      title: 'Destacar tu Perfil',
                      description: 'Los usuarios premium aparecen primero en búsquedas'
                    },
                    {
                      icon: Crown,
                      title: 'Características Exclusivas',
                      description: 'Accede a funciones premium y filtros avanzados'
                    },
                    {
                      icon: Zap,
                      title: 'Mayor Visibilidad',
                      description: 'Obtén más conexiones con perfiles destacados'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-glass flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-100 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-neutral-300">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-100">
                  Historial de Regalos
                </h2>
                <div className="text-sm text-neutral-400">
                  {transactions.length} transacciones
                </div>
              </div>

              <TransactionHistory transactions={transactions} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}