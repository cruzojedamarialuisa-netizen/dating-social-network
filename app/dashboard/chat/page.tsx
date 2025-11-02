'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Search,
  Plus,
  Phone,
  Video,
  Info,
  MoreVertical,
  MessageCircle,
  CheckCircle,
  CheckCircle2
} from 'lucide-react'
import { useAuth } from '@/app/providers'

// Tipos simples
interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  type: 'text' | 'image' | 'audio' | 'gift'
  is_read: boolean
  reactions: any[]
  created_at: string
  updated_at: string
}

interface Conversation {
  id: string
  participants: string[]
  last_message?: Message
  unread_count: number
  other_user?: {
    id: string
    name: string
    avatar?: string
    is_online: boolean
    last_seen: string
    energy_emotion: string
  }
  created_at: string
  updated_at: string
}

function ChatPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Datos mock simplificados
  const mockConversations: Conversation[] = [
    {
      id: 'conv-1',
      participants: ['user-1', 'user-current'],
      last_message: {
        id: 'msg-1',
        conversation_id: 'conv-1',
        sender_id: 'user-1',
        receiver_id: 'user-current',
        content: '¡Hola! ¿Cómo estás?',
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
        is_online: true,
        last_seen: new Date().toISOString(),
        energy_emotion: 'alegre'
      },
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    }
  ]

  const mockMessages: { [key: string]: Message[] } = {
    'conv-1': [
      {
        id: 'msg-1',
        conversation_id: 'conv-1',
        sender_id: 'user-1',
        receiver_id: 'user-current',
        content: '¡Hola! ¿Cómo estás?',
        type: 'text',
        is_read: true,
        reactions: [],
        created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
      }
    ]
  }

  useEffect(() => {
    setConversations(mockConversations)
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0].id)
    }
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation] || [])
    }
  }, [selectedConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversation_id: selectedConversation,
      sender_id: user?.id || 'user-current',
      receiver_id: 'user-1',
      content: newMessage,
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-glass-lg overflow-hidden">
      {/* Lista de conversaciones */}
      <div className="w-full lg:w-80 border-r border-glass-border flex flex-col">
        <div className="p-4 border-b border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-neutral-100">Mensajes</h1>
            <button className="p-2 hover:bg-glass rounded-glass transition-colors">
              <Plus className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="input-field pl-9 w-full text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-glass-border cursor-pointer transition-colors hover:bg-glass ${
                selectedConversation === conversation.id 
                ? 'bg-glass border-l-4 border-l-primary-500' 
                : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-500 font-medium">
                    {conversation.other_user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-100 truncate">
                      {conversation.other_user?.name || 'Usuario'}
                    </h3>
                    <span className="text-xs text-neutral-400">
                      {conversation.last_message && formatTime(conversation.last_message.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-neutral-400 truncate mt-1">
                    {conversation.last_message?.content || 'Sin mensajes'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de chat */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Header del chat */}
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-500 font-medium text-sm">
                      {selectedConv.other_user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="font-semibold text-neutral-100">
                      {selectedConv.other_user?.name || 'Usuario'}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {selectedConv.other_user?.is_online ? 'En línea' : 'Desconectado'}
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

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender_id === (user?.id || 'user-current') 
                    ? 'justify-end' 
                    : 'justify-start'
                  }`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 ${
                    message.sender_id === (user?.id || 'user-current')
                      ? 'chat-bubble-own'
                      : 'chat-bubble-other'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center mt-2 space-x-1 text-xs">
                      <span className={
                        message.sender_id === (user?.id || 'user-current')
                          ? 'text-neutral-700'
                          : 'text-neutral-400'
                      }>
                        {formatTime(message.created_at)}
                      </span>
                      
                      {message.sender_id === (user?.id || 'user-current') && (
                        <div className="flex items-center">
                          {message.is_read ? (
                            <CheckCircle2 className="w-4 h-4 text-neutral-700" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-neutral-700" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Escribe un mensaje..."
                    className="input-field pr-12 resize-none"
                    rows={1}
                    style={{ 
                      minHeight: '44px',
                      maxHeight: '120px',
                      height: 'auto'
                    }}
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-glass transition-colors ${
                    newMessage.trim()
                      ? 'bg-primary-500 text-neutral-900 hover:bg-primary-300'
                      : 'bg-glass text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
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

export default ChatPage
