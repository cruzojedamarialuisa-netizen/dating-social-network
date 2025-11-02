// Mock data for development and testing
import { UserProfile, Gift, Conversation, Message, Affinity, Event, Notification } from '@/types'
import { generateId } from '@/lib/utils'

// Mock User Profiles
export const mockUsers: UserProfile[] = [
  // Super Admin (Default User)
  {
    id: 'super-admin-1',
    user_id: 'super-admin-1',
    full_name: 'Administrador Sistema',
    age: 30,
    city: 'Madrid',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'misteriosa',
    purpose_of_life: 'Crear un mundo más conectado',
    what_seeking: 'Facilitar conexiones genuinas entre personas',
    what_inspires: 'La tecnología al servicio del amor verdadero',
    is_verified: true,
    is_premium: true,
    beats_balance: 10000,
    last_seen: new Date().toISOString(),
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-1',
    user_id: 'user-1',
    full_name: 'María González',
    age: 28,
    city: 'Madrid',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'alegre',
    purpose_of_life: 'Encontrar el amor verdadero',
    what_seeking: 'Busco una conexión auténtica y profunda',
    what_inspires: 'La música, los viajes y las conversaciones interesantes',
    is_verified: true,
    is_premium: false,
    beats_balance: 150,
    last_seen: new Date().toISOString(),
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-2',
    user_id: 'user-2',
    full_name: 'Carlos Ruiz',
    age: 32,
    city: 'Barcelona',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'reflexiva',
    purpose_of_life: 'Desarrollarme personalmente',
    what_seeking: 'Personas con intereses similares',
    what_inspires: 'La filosofía, el arte y la naturaleza',
    is_verified: false,
    is_premium: true,
    beats_balance: 420,
    last_seen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'away',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-3',
    user_id: 'user-3',
    full_name: 'Ana Martín',
    age: 25,
    city: 'Valencia',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'romántica',
    purpose_of_life: 'Crear una familia',
    what_seeking: 'Una relación seria y comprometida',
    what_inspires: 'El cine, la literatura y los atardeceres',
    is_verified: true,
    is_premium: false,
    beats_balance: 85,
    last_seen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'offline',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-4',
    user_id: 'user-4',
    full_name: 'Diego López',
    age: 29,
    city: 'Sevilla',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'aventurera',
    purpose_of_life: 'Viajar y explorar',
    what_seeking: 'Aventuras compartidas y experiencias únicas',
    what_inspires: 'La naturaleza, el deporte y las culturas',
    is_verified: false,
    is_premium: false,
    beats_balance: 275,
    last_seen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-5',
    user_id: 'user-5',
    full_name: 'Sofía Hernández',
    age: 26,
    city: 'Bilbao',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'creativa',
    purpose_of_life: 'Crear algo significativo',
    what_seeking: 'Colaboración creativa y proyectos innovadores',
    what_inspires: 'El diseño, la tecnología y las startups',
    is_verified: true,
    is_premium: true,
    beats_balance: 630,
    last_seen: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'in_date',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Additional Users
  {
    id: 'user-6',
    user_id: 'user-6',
    full_name: 'Roberto Silva',
    age: 35,
    city: 'Málaga',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'calma',
    purpose_of_life: 'Encontrar estabilidad y paz',
    what_seeking: 'Una relación equilibrada y duradera',
    what_inspires: 'La música clásica, la meditación y la cocina',
    is_verified: true,
    is_premium: true,
    beats_balance: 890,
    last_seen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'away',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-7',
    user_id: 'user-7',
    full_name: 'Elena Vega',
    age: 24,
    city: 'Zaragoza',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'energética',
    purpose_of_life: 'Vivir cada momento al máximo',
    what_seeking: 'Aventura, diversión y nuevas experiencias',
    what_inspires: 'Los deportes, la música electrónica y los festivales',
    is_verified: false,
    is_premium: false,
    beats_balance: 45,
    last_seen: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-8',
    user_id: 'user-8',
    full_name: 'Javier Morales',
    age: 31,
    city: 'Murcia',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'optimista',
    purpose_of_life: 'Contribuir al bienestar social',
    what_seeking: 'Personas comprometidas con el cambio positivo',
    what_inspires: 'El voluntariado, la ciencia y la sostenibilidad',
    is_verified: true,
    is_premium: false,
    beats_balance: 320,
    last_seen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-9',
    user_id: 'user-9',
    full_name: 'Carmen Luna',
    age: 27,
    city: 'Toledo',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'amigable',
    purpose_of_life: 'Construir puentes entre las personas',
    what_seeking: 'Amistades sólidas y conexiones profundas',
    what_inspires: 'La literatura, el teatro y las reuniones familiares',
    is_verified: false,
    is_premium: false,
    beats_balance: 180,
    last_seen: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'offline',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-10',
    user_id: 'user-10',
    full_name: 'Alejandro Torres',
    age: 33,
    city: 'Palma de Mallorca',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'pasión',
    purpose_of_life: 'Crear y compartir belleza',
    what_seeking: 'Alma gemela creativa y artística',
    what_inspires: 'La fotografía, el cine independiente y el arte contemporáneo',
    is_verified: true,
    is_premium: true,
    beats_balance: 1200,
    last_seen: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'in_date',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-11',
    user_id: 'user-11',
    full_name: 'Patricia Ruiz',
    age: 29,
    city: 'Pamplona',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'esperanza',
    purpose_of_life: 'Encontrar mi propósito y compartirlo',
    what_seeking: 'Personas que compartan mi visión de vida',
    what_inspires: 'La naturaleza, la espiritualidad y los emprendimientos sociales',
    is_verified: true,
    is_premium: false,
    beats_balance: 275,
    last_seen: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    status: 'away',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'user-12',
    user_id: 'user-12',
    full_name: 'Miguel Ángel Castro',
    age: 28,
    city: 'Santander',
    country: 'España',
    avatar_url: undefined,
    cover_photo_url: undefined,
    presentation_video_url: undefined,
    energy_emotion: 'independiente',
    purpose_of_life: 'Ser libre y autentico',
    what_seeking: 'Alguien que valore la independencia y la honestidad',
    what_inspires: 'La tecnología, los viajes en solitario y la filosofía',
    is_verified: false,
    is_premium: false,
    beats_balance: 95,
    last_seen: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    status: 'offline',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Mock Gifts
export const mockGifts: Gift[] = [
  {
    id: 'gift-1',
    name: 'Rosa',
    description: 'Una hermosa rosa animada',
    price: 1,
    animation_url: '/animations/rose.gif',
    icon: '🌹',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-2',
    name: 'Estrella',
    description: 'Una estrella luminosa que brilla en la oscuridad',
    price: 2,
    animation_url: '/animations/star.gif',
    icon: '✨',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-3',
    name: 'Carta',
    description: 'Una carta emocional personalizada',
    price: 3,
    animation_url: '/animations/letter.gif',
    icon: '💌',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-4',
    name: 'Melodía',
    description: 'Una melodía personalizada',
    price: 5,
    animation_url: '/animations/melody.gif',
    icon: '🎶',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-5',
    name: 'Chocolate',
    description: 'Una caja de chocolates premium',
    price: 10,
    animation_url: '/animations/chocolate.gif',
    icon: '🍫',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-6',
    name: 'Flores',
    description: 'Un ramo de flores naturales',
    price: 15,
    animation_url: '/animations/flowers.gif',
    icon: '🌸',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-7',
    name: 'Anillo',
    description: 'Un anillo de compromiso elegante',
    price: 50,
    animation_url: '/animations/ring.gif',
    icon: '💍',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift-8',
    name: 'Viaje',
    description: 'Un viaje romántico para dos',
    price: 100,
    animation_url: '/animations/travel.gif',
    icon: '✈️',
    is_active: true,
    created_at: new Date().toISOString()
  }
]

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['user-current', 'user-1'],
    last_message: {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás? 😊',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    unread_count: 2,
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-2',
    participants: ['user-current', 'user-2'],
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
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-3',
    participants: ['user-current', 'user-3'],
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
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-4',
    participants: ['user-current', 'user-6'],
    last_message: {
      id: 'msg-4',
      conversation_id: 'conv-4',
      sender_id: 'user-current',
      receiver_id: 'user-6',
      content: 'Me encantaría probar esa receta de cocina mediterránea que mencionaste 🍽️',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    unread_count: 0,
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-5',
    participants: ['user-current', 'user-8'],
    last_message: {
      id: 'msg-5',
      conversation_id: 'conv-5',
      sender_id: 'user-8',
      receiver_id: 'user-current',
      content: '¿Te interesa participar en nuestro próximo evento de voluntariado? 🌱',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    unread_count: 1,
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'conv-6',
    participants: ['user-current', 'user-10'],
    last_message: {
      id: 'msg-6',
      conversation_id: 'conv-6',
      sender_id: 'user-10',
      receiver_id: 'user-current',
      content: '¿Has visto alguna película independiente interesante lately? 🎬',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    unread_count: 0,
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Mock Messages
export const mockMessages: { [key: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: '¡Hola! Me encanta tu energía alegre, ¿cómo estás? 😊',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
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
      created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString()
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
      created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-4',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      receiver_id: 'user-current',
      content: 'Me encantaría conocer más sobre ti. ¿Qué te inspira? ✨',
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
      content: 'También me encanta viajar... ¿has estado en algún lugar increíble últimamente? 🌍',
      type: 'text',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 60 * 1000).toISOString()
    }
  ],
  'conv-2': [
    {
      id: 'msg-6',
      conversation_id: 'conv-2',
      sender_id: 'user-2',
      receiver_id: 'user-current',
      content: 'Hola! Vi tu perfil y me parece muy interesante',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-7',
      conversation_id: 'conv-2',
      sender_id: 'user-current',
      receiver_id: 'user-2',
      content: '¡Gracias Carlos! Me gusta mucho tu energía reflexiva también',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 40 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-8',
      conversation_id: 'conv-2',
      sender_id: 'user-current',
      receiver_id: 'user-2',
      content: 'Perfecto, me encantaría conocerte también 🌟',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  ],
  'conv-3': [
    {
      id: 'msg-9',
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      receiver_id: 'user-current',
      content: '¡Hola! Espero que estés teniendo un buen día 💕',
      type: 'text',
      is_read: true,
      reactions: [],
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'msg-10',
      conversation_id: 'conv-3',
      sender_id: 'user-3',
      receiver_id: 'user-current',
      content: '🎁 Te envié un regalo especial 💖',
      type: 'gift',
      is_read: false,
      reactions: [],
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    }
  ]
}

// Mock Affinities
export const mockAffinities: Affinity[] = [
  {
    id: 'aff-1',
    user1_id: 'user-current',
    user2_id: 'user-1',
    status: 'accepted',
    similarity_score: 0.85,
    common_interests: ['viajes', 'música', 'conversaciones'],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-2',
    user1_id: 'user-current',
    user2_id: 'user-4',
    status: 'pending',
    similarity_score: 0.72,
    common_interests: ['aventura', 'deportes', 'naturaleza'],
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-3',
    user1_id: 'user-2',
    user2_id: 'user-current',
    status: 'rejected',
    similarity_score: 0.45,
    common_interests: ['filosofía'],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-4',
    user1_id: 'user-current',
    user2_id: 'user-6',
    status: 'accepted',
    similarity_score: 0.68,
    common_interests: ['cocina', 'meditación', 'paz interior'],
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-5',
    user1_id: 'user-8',
    user2_id: 'user-current',
    status: 'pending',
    similarity_score: 0.79,
    common_interests: ['voluntariado', 'sostenibilidad', 'cambio social'],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-6',
    user1_id: 'user-current',
    user2_id: 'user-10',
    status: 'accepted',
    similarity_score: 0.91,
    common_interests: ['arte', 'fotografía', 'cine', 'creatividad'],
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-7',
    user1_id: 'user-7',
    user2_id: 'user-current',
    status: 'pending',
    similarity_score: 0.58,
    common_interests: ['música', 'fitness', 'diversión'],
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'aff-8',
    user1_id: 'user-11',
    user2_id: 'user-current',
    status: 'rejected',
    similarity_score: 0.32,
    common_interests: ['espiritualidad'],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Speed Dating Virtual',
    description: 'Conoce a personas increíbles en un ambiente relajado y divertido',
    type: 'speed_dating',
    start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    max_participants: 20,
    current_participants: 12,
    price: 0,
    is_free: true,
    is_active: true,
    created_by: 'user-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-2',
    title: 'Chat Grupal: Pasiones Creativas',
    description: 'Comparte y descubre pasiones creativas con personas afines',
    type: 'chat_room',
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    max_participants: 15,
    current_participants: 8,
    price: 5,
    is_free: false,
    is_active: true,
    created_by: 'user-5',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-3',
    title: 'Workshop: Comunicación Emocional',
    description: 'Aprende técnicas para conectar emocionalmente con otros',
    type: 'workshop',
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    max_participants: 30,
    current_participants: 5,
    price: 15,
    is_free: false,
    is_active: true,
    created_by: 'user-2',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-4',
    title: 'Fiesta Virtual: Energía Alegre',
    description: 'Una noche de diversión con música y juegos interactivos',
    type: 'live_stream',
    start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    max_participants: 100,
    current_participants: 45,
    price: 0,
    is_free: true,
    is_active: true,
    created_by: 'user-7',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-5',
    title: 'Meditación y Conexión Interior',
    description: 'Encuentra paz interior y conecta contigo mismo',
    type: 'workshop',
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    max_participants: 25,
    current_participants: 18,
    price: 8,
    is_free: false,
    is_active: true,
    created_by: 'user-6',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-6',
    title: 'Conferencia: Amor y Relaciones Sanas',
    description: 'Expertos comparten sabiduría sobre relaciones duraderas',
    type: 'workshop',
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    max_participants: 200,
    current_participants: 89,
    price: 25,
    is_free: false,
    is_active: true,
    created_by: 'super-admin-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'event-7',
    title: 'Tarde de Arte y Creatividad',
    description: 'Comparte tus proyectos artísticos y inspirate con otros',
    type: 'chat_room',
    start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    max_participants: 20,
    current_participants: 12,
    price: 0,
    is_free: true,
    is_active: true,
    created_by: 'user-10',
    created_at: new Date().toISOString()
  }
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    user_id: 'user-current',
    type: 'message',
    title: 'Nuevo Mensaje',
    message: 'María González te envió un mensaje',
    data: { sender_id: 'user-1', conversation_id: 'conv-1' },
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-2',
    user_id: 'user-current',
    type: 'affinity',
    title: 'Nueva Afinidad',
    message: 'Diego López expressó afinidad contigo',
    data: { sender_id: 'user-4', affinity_id: 'aff-2' },
    is_read: false,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-3',
    user_id: 'user-current',
    type: 'gift',
    title: 'Regalo Recibido',
    message: 'Ana Martín te envió una rosa',
    data: { sender_id: 'user-3', gift_id: 'gift-1' },
    is_read: true,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-4',
    user_id: 'user-current',
    type: 'event',
    title: 'Nuevo Evento',
    message: 'Speed Dating Virtual comienza mañana',
    data: { event_id: 'event-1' },
    is_read: false,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-5',
    user_id: 'user-current',
    type: 'message',
    title: 'Nuevo Mensaje',
    message: 'Javier Morales te invitó a un evento de voluntariado',
    data: { sender_id: 'user-8', conversation_id: 'conv-5' },
    is_read: false,
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-6',
    user_id: 'user-current',
    type: 'gift',
    title: 'Regalo Enviado',
    message: 'Enviaste una estrella a Alejandro Torres',
    data: { sender_id: 'user-current', receiver_id: 'user-10', gift_id: 'gift-2' },
    is_read: true,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-7',
    user_id: 'user-current',
    type: 'affinity',
    title: 'Afinidad Aceptada',
    message: 'Roberto Silva aceptó tu solicitud de afinidad',
    data: { sender_id: 'user-6', affinity_id: 'aff-4' },
    is_read: true,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-8',
    user_id: 'user-current',
    type: 'system',
    title: 'Racha Activa',
    message: '¡Llevas 7 días consecutivos conectado! 🔥',
    data: { streak_days: 7 },
    is_read: false,
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-9',
    user_id: 'user-current',
    type: 'event',
    title: 'Recordatorio de Evento',
    message: 'Workshop de Comunicación Emocional comienza en 1 hora',
    data: { event_id: 'event-3' },
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-10',
    user_id: 'user-current',
    type: 'message',
    title: 'Nuevo Mensaje',
    message: 'Elena Vega quiere conocerte mejor',
    data: { sender_id: 'user-7', conversation_id: 'conv-7' },
    is_read: false,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  }
]

// Mock User Analytics
export const mockAnalytics = {
  totalViews: 142,
  newMessages: 5,
  newAffinities: 2,
  newGifts: 3,
  todayLogins: 8,
  weeklyLogins: 45,
  monthlyActiveUsers: 1250,
  totalMatches: 23,
  averageSessionTime: 45,
  mostActiveHours: ['14:00', '15:00', '20:00', '21:00'],
  popularEvents: ['Speed Dating', 'Chat Grupal', 'Workshop']
}

// Mock System Stats
export const mockSystemStats = {
  total_users: 25680,
  active_users: 8540,
  verified_users: 19850,
  premium_users: 4290,
  total_messages: 487920,
  total_affinities: 24530,
  total_gifts_sent: 18930,
  total_beats_purchased: 1567890,
  revenue_today: 4890.75,
  revenue_month: 89760.40,
  revenue_total: 456789.90,
  daily_new_signups: 125,
  hourly_active_users: [850, 920, 780, 1200, 1850, 2340, 2890, 3240, 2890, 2450, 2180, 1950],
  top_cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Palma de Mallorca', 'Zaragoza'],
  user_demographics: {
    age_groups: {
      '18-25': 35,
      '26-30': 28,
      '31-35': 22,
      '36-40': 10,
      '40+': 5
    },
    energy_emotions: {
      'alegre': 18,
      'reflexiva': 12,
      'romántica': 15,
      'aventurera': 14,
      'creativa': 11,
      'calma': 9,
      'energética': 8,
      'optimista': 7,
      'misteriosa': 3,
      'amigable': 3
    }
  }
}

// Utility functions for mock data
export const getRandomUser = (): UserProfile => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)]
}

export const getRandomGift = (): Gift => {
  return mockGifts[Math.floor(Math.random() * mockGifts.length)]
}

export const getRandomMessage = (conversationId: string): Message => {
  const message: Message = {
    id: generateId(),
    conversation_id: conversationId,
    sender_id: 'user-1',
    receiver_id: 'user-current',
    content: 'Mensaje de ejemplo',
    type: 'text',
    is_read: false,
    reactions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  return message
}

export const generateMockActivity = () => {
  const activities = [
    'Vió tu perfil',
    'Te envió un mensaje',
    'Expressó afinidad contigo',
    'Te envió un regalo',
    'Se conectó',
    'Completó su verificación'
  ]
  
  const users = mockUsers
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const randomActivity = activities[Math.floor(Math.random() * activities.length)]
  
  return {
    id: generateId(),
    user: {
      name: randomUser.full_name,
      avatar: randomUser.avatar_url
    },
    activity: randomActivity,
    time: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
  }
}