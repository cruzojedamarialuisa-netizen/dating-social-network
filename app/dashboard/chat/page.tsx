'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Search,
  Plus,
  Heart,
  Gift,
  Circle,
  CheckCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/app/providers'
import { Message, Conversation, MessageReaction } from '@/types'
import { formatTime, formatRelativeTime, generateId } from '@/lib/utils'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface ConversationWithLastMessage extends Conversation {
  last_message?: Message
  other_user?: {
    id: string
    name: string
    avatar?: string
    is_online: boolean
    last_seen: string
    energy_emotion: string
  }
}

const mockConversations: ConversationWithLastMessage[] = [
  {
    id: 'conv-1',
    participants: ['user-1', 'user-current'],
    last_message: {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás?',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    unread_count: 2,
    other_user: {
      id: 'user-1',
      name: 'María González',
      avatar: undefined,
      is_online: true,
      last_seen: new Date().toISOString(),
      energy_emotion: 'alegre'
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-2',
    participants: ['user-2', 'user-current'],
    last_message: {
      id: 'msg-2',
      conversation_id: 'conv-2',
      sender_id: 'user-current',
      receiver_id: 'user-2',
      content: 'Perfecto, me encantaría conocerte también 🌟',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    unread_count: 0,
    other_user: {
      id: 'user-2',
      name: 'Carlos Ruiz',
      avatar: undefined,
      is_online: false,
      last_seen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      energy_emotion: 'reflexiva'
    },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-3',
    participants: ['user-3', 'user-current'],
    last_message: {
      id: 'msg-3',
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      receiver_id: 'user-current',
      content: '🎁 Te envié un regalo especial 💖',
      type: 'gift',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    unread_count: 1,
    other_user: {
      id: 'user-3',
      name: 'Ana Martín',
      avatar: undefined,
      is_online: false,
      last_seen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      energy_emotion: 'romántica'
    },
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
]

const mockMessages: { [key: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás?',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-2',
      conversation_id: 'conv-1',
      sender_id: 'user-current',
      receiver_id: 'user-1',
      content: '¡Hola María! Estoy muy bien, gracias por preguntar 😊 ¿Cómo ha sido tu día?',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 8 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-3',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Genial! El día ha sido muy productivo, he trabajado en un proyecto que me apasiona mucho 💪',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-4',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás?',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-5',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás?',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    }
  ]
}

const emojiReactions = [
  { type: 'love' as const, emoji: '💖', label: 'Amor' },
  { type: 'joy' as const, emoji: '😄', label: 'Alegría' },
  { type: 'empathy' as const, emoji: '🤗', label: 'Empatía' },
  { type: 'wow' as const, emoji: '😮', label: 'Asombro' },
  { type: 'sad' as const, emoji: '😢', label: 'Tristeza' },
  { type: 'angry' as const, emoji: '😠', label: 'Enojo' }
]

interface ChatInterfaceProps {
  conversationId?: string
}

function MessageBubble({ 
  message, 
  isOwn, 
  otherUser,
  onReaction 
}: { 
  message: Message
  isOwn: boolean
  otherUser?: any
  onReaction: (messageId: string, reaction: any) => void
}) {
  const [showReactions, setShowReactions] = useState(false)

  const renderMessageContent = () => {
    switch (message.type) {
      case 'gift':
        return (
          <div className="flex items-center space-x-2 p-2 bg-pink-500/20 rounded-glass border border-pink-500/30">
            <Gift className="w-5 h-5 text-pink-500" />
            <span className="text-sm">{message.content}</span>
          </div>
        )
      case 'audio':
        return (
          <div className="flex items-center space-x-2 p-2 bg-glass rounded-glass border border-glass-border">
            <Mic className="w-5 h-5 text-neutral-400" />
            <span className="text-sm text-neutral-300">Mensaje de audio</span>
          </div>
        )
      case 'image':
        return (
          <div className="rounded-glass overflow-hidden">
            <img src={message.media_url} alt="Shared image" className="w-48 h-32 object-cover" />
          </div>
        )
      default:
        return <span className="whitespace-pre-wrap">{message.content}</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={cn(
        'flex mb-4',
        isOwn ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        'max-w-xs lg:max-w-md px-4 py-3',
        isOwn ? 'chat-bubble-own' : 'chat-bubble-other',
        'relative group'
      )}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
      >
        {!isOwn && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-500 font-medium">
                {otherUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-xs text-neutral-400">
              {otherUser?.name || 'Usuario'}
            </span>
          </div>
        )}

        {renderMessageContent()}

        <div className={cn(
          'flex items-center mt-2 space-x-1 text-xs',
          isOwn ? 'justify-end' : 'justify-start'
        )}>
          <span className={cn(
            isOwn ? 'text-neutral-700' : 'text-neutral-400'
          )}>
            {formatTime(message.created_at)}
          </span>
          
          {isOwn && (
            <div className="flex items-center">
              {message.is_read ? (
                <CheckCircle2 className="w-4 h-4 text-neutral-700" />
              ) : (
                <CheckCircle className="w-4 h-4 text-neutral-700" />
              )}
            </div>
          )}
        </div>

        {/* Reactions */}
        <AnimatePresence>
          {showReactions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full mb-2 left-0 flex space-x-1 bg-glass backdrop-blur-glass rounded-full p-1 border border-glass-border"
            >
              {emojiReactions.map((reaction) => (
                <button
                  key={reaction.type}
                  onClick={() => onReaction(message.id, reaction)}
                  className="w-8 h-8 hover:bg-glass rounded-full flex items-center justify-center transition-colors"
                  title={reaction.label}
                >
                  {reaction.emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ChatPage(props: ChatInterfaceProps) {
  const { conversationId } = props
  const { user } = useAuth()
  const [conversations, setConversations] = useState<ConversationWithLastMessage[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversationId || null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load conversations
    setConversations(mockConversations)
    
    // Select first conversation if none selected
    if (!selectedConversation && mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0].id)
    }
  }, [])

  useEffect(() => {
    // Load messages for selected conversation
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation] || [])
    }
  }, [selectedConversation])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: generateId(),
      conversation_id: selectedConversation,
      sender_id: user?.id || 'user-current',
      receiver_id: conversations.find(c => c.id === selectedConversation)?.participants.find(p => p !== (user?.id || 'user-current')) || '',
      content: newMessage,
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, last_message: message, updated_at: message.created_at }
        : conv
    ))
  }

  const handleReaction = (messageId: string, reaction: any) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.user_id === (user?.id || 'user-current'))
        if (existingReaction) {
          // Remove reaction
          return {
            ...msg,
            reactions: msg.reactions.filter(r => r.user_id !== (user?.id || 'user-current'))
          }
        } else {
          // Add reaction
          return {
            ...msg,
            reactions: [...msg.reactions, {
              id: generateId(),
              message_id: messageId,
              user_id: user?.id || 'user-current',
              reaction_type: reaction.type,
              created_at: new Date().toISOString()
            }]
          }
        }
      }
      return msg
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const filteredConversations = conversations.filter(conv =>
    conv.other_user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-glass-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-full lg:w-80 border-r border-glass-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-neutral-100">Mensajes</h1>
            <button className="p-2 hover:bg-glass rounded-glass transition-colors">
              <Plus className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 w-full text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={cn(
                'p-4 border-b border-glass-border cursor-pointer transition-colors hover:bg-glass',
                selectedConversation === conversation.id && 'bg-glass border-l-4 border-l-primary-500'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-500 font-medium">
                      {conversation.other_user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  {conversation.other_user?.is_online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-100 truncate">
                      {conversation.other_user?.name || 'Usuario'}
                    </h3>
                    <span className="text-xs text-neutral-400">
                      {conversation.last_message && formatRelativeTime(conversation.last_message.created_at)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-neutral-400 truncate">
                      {conversation.last_message?.content || 'Sin mensajes'}
                    </p>
                    {conversation.unread_count > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {conversation.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <span className="text-primary-500 font-medium text-sm">
                        {selectedConv.other_user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    {selectedConv.other_user?.is_online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900" />
                    )}
                  </div>
                  
                  <div>
                    <h2 className="font-semibold text-neutral-100">
                      {selectedConv.other_user?.name || 'Usuario'}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {selectedConv.other_user?.is_online 
                        ? 'En línea' 
                        : `Última vez ${formatRelativeTime(selectedConv.other_user?.last_seen || new Date())}`
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-glass rounded-glass transition-colors">
                    <Phone className="w-5 h-5 text-neutral-400" />
                  </button>
                  <button className="p-2 hover:bg-glass rounded-glass transition-colors">
                    <Video className="w-5 h-5 text-neutral-400" />
                  </button>
                  <button className="p-2 hover:bg-glass rounded-glass transition-colors">
                    <Info className="w-5 h-5 text-neutral-400" />
                  </button>
                  <button className="p-2 hover:bg-glass rounded-glass transition-colors">
                    <MoreVertical className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender_id === (user?.id || 'user-current')}
                  otherUser={selectedConv.other_user}
                  onReaction={handleReaction}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex items-end space-x-3">
                <button className="p-2 hover:bg-glass rounded-glass transition-colors">
                  <Paperclip className="w-5 h-5 text-neutral-400" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                    className="input-field pr-12 resize-none"
                    rows={1}
                    style={{ 
                      minHeight: '44px',
                      maxHeight: '120px',
                      height: 'auto'
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                    }}
                  />
                  
                  <button className="absolute right-3 top-3 p-1 hover:bg-glass rounded transition-colors">
                    <Smile className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={cn(
                    'p-2 rounded-glass transition-colors',
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'hover:bg-glass text-neutral-400'
                  )}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={cn(
                    'p-2 rounded-glass transition-colors',
                    newMessage.trim()
                      ? 'bg-primary-500 text-neutral-900 hover:bg-primary-300'
                      : 'bg-glass text-neutral-400 cursor-not-allowed'
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-neutral-400">
                Elige una conversación de la lista para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
