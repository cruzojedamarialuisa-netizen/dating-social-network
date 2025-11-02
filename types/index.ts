import { User, Session } from '@supabase/supabase-js'
import { EmotionType, PurposeOfLife } from './utils'

// Auth Types
export interface AuthUser extends User {
  user_metadata?: {
    full_name?: string
    avatar_url?: string
    age?: number
    city?: string
    country?: string
    energy_emotion?: EmotionType
    purpose_of_life?: PurposeOfLife
    what_seeking?: string
    what_inspires?: string
    is_verified?: boolean
    is_premium?: boolean
    beats_balance?: number
    last_seen?: string
    status?: 'available' | 'away' | 'in_date' | 'offline'
  }
}

// Profile Types
export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  age: number
  city: string
  country: string
  avatar_url?: string
  cover_photo_url?: string
  presentation_video_url?: string
  energy_emotion: EmotionType
  purpose_of_life: PurposeOfLife
  what_seeking: string
  what_inspires: string
  is_verified: boolean
  is_premium: boolean
  beats_balance: number
  last_seen: string
  status: 'available' | 'away' | 'in_date' | 'offline'
  created_at: string
  updated_at: string
}

// Chat Types
export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  type: 'text' | 'image' | 'video' | 'audio' | 'gift'
  media_url?: string
  is_read: boolean
  reactions: MessageReaction[]
  created_at: string
  updated_at: string
}

export interface MessageReaction {
  id: string
  message_id: string
  user_id: string
  reaction_type: 'love' | 'joy' | 'empathy' | 'wow' | 'sad' | 'angry'
  created_at: string
}

export interface Conversation {
  id: string
  participants: string[]
  last_message?: Message
  unread_count: number
  updated_at: string
  created_at: string
}

// Affinity/Connection Types
export interface Affinity {
  id: string
  user1_id: string
  user2_id: string
  status: 'pending' | 'accepted' | 'rejected'
  similarity_score: number
  common_interests: string[]
  created_at: string
  updated_at: string
}

export interface UserAffinity extends Affinity {
  user1_profile: UserProfile
  user2_profile: UserProfile
}

// Gift/Payment Types
export interface Gift {
  id: string
  name: string
  description: string
  price: number
  animation_url?: string
  icon: string
  is_active: boolean
  created_at: string
}

export interface GiftTransaction {
  id: string
  sender_id: string
  receiver_id: string
  gift_id: string
  beats_spent: number
  message?: string
  created_at: string
}

export interface BeatsTransaction {
  id: string
  user_id: string
  amount: number
  type: 'purchase' | 'spent' | 'earned' | 'refund'
  description: string
  payment_provider?: 'stripe' | 'mercadopago' | 'flow' | 'khipu'
  payment_id?: string
  created_at: string
}

// Admin Types
export interface AdminSettings {
  id: string
  key: string
  value: string
  description?: string
  updated_at: string
  updated_by: string
}

export interface SystemStats {
  total_users: number
  active_users: number
  verified_users: number
  premium_users: number
  total_messages: number
  total_affinities: number
  total_gifts_sent: number
  total_beats_purchased: number
  revenue_today: number
  revenue_month: number
  revenue_total: number
}

// Event Types
export interface Event {
  id: string
  title: string
  description: string
  type: 'speed_dating' | 'chat_room' | 'live_stream' | 'workshop'
  start_time: string
  end_time: string
  max_participants?: number
  current_participants: number
  price?: number
  is_free: boolean
  is_active: boolean
  created_by: string
  created_at: string
}

export interface EventParticipant {
  id: string
  event_id: string
  user_id: string
  joined_at: string
  left_at?: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  type: 'message' | 'affinity' | 'gift' | 'event' | 'system'
  title: string
  message: string
  data?: any
  is_read: boolean
  created_at: string
}

// Search/Filter Types
export interface SearchFilters {
  min_age?: number
  max_age?: number
  location?: string
  energy_emotions?: EmotionType[]
  purposes?: PurposeOfLife[]
  verified_only?: boolean
  premium_only?: boolean
  is_online?: boolean
  sort_by?: 'distance' | 'activity' | 'affinity' | 'newest'
  sort_order?: 'asc' | 'desc'
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterForm {
  email: string
  password: string
  confirm_password: string
  full_name: string
  age: number
  accept_terms: boolean
  accept_privacy: boolean
}

export interface ProfileForm {
  full_name: string
  age: number
  city: string
  country: string
  energy_emotion: EmotionType
  purpose_of_life: PurposeOfLife
  what_seeking: string
  what_inspires: string
}

export interface SearchForm {
  query?: string
  filters: SearchFilters
}

// Payment Types
export interface PaymentProvider {
  name: 'stripe' | 'mercadopago' | 'flow' | 'khipu'
  display_name: string
  is_enabled: boolean
  config: {
    public_key?: string
    private_key?: string
    webhook_secret?: string
    [key: string]: any
  }
}

// Audio/Video Types
export interface AudioRecording {
  id: string
  user_id: string
  duration: number
  file_url: string
  created_at: string
}

export interface VideoCall {
  id: string
  conversation_id: string
  caller_id: string
  callee_id: string
  status: 'initiated' | 'ringing' | 'answered' | 'ended' | 'missed'
  started_at?: string
  ended_at?: string
  duration?: number
}

// Gamification Types
export interface UserBadge {
  id: string
  user_id: string
  badge_type: 'early_adopter' | 'popular' | 'helpful' | 'verified' | 'premium'
  earned_at: string
}

export interface UserStreak {
  id: string
  user_id: string
  current_streak: number
  longest_streak: number
  last_activity: string
}

// Settings Types
export interface UserSettings {
  id: string
  user_id: string
  notifications_enabled: boolean
  email_notifications: boolean
  push_notifications: boolean
  sound_enabled: boolean
  dark_mode: boolean
  language: 'es' | 'en' | 'pt'
  privacy_level: 'public' | 'friends' | 'private'
  auto_accept_affinities: boolean
  show_online_status: boolean
  allow_video_calls: boolean
  max_distance_km: number
  created_at: string
  updated_at: string
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  stack?: string
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Theme Types
export type Theme = 'dark' | 'light' | 'auto'

// Location Types
export interface Coordinates {
  latitude: number
  longitude: number
}

export interface LocationData {
  country: string
  region: string
  city: string
  coordinates?: Coordinates
}

// Social Login Types
export interface SocialProvider {
  name: 'google' | 'facebook' | 'apple' | 'discord'
  is_enabled: boolean
  config: {
    client_id: string
    client_secret?: string
    redirect_uri: string
  }
}

// AI/ML Types
export interface AITracking {
  user_id: string
  interaction_type: 'view' | 'message' | 'like' | 'affinity' | 'gift'
  target_user_id?: string
  context: {
    session_duration: number
    page_url: string
    referrer?: string
    device_info: string
  }
  ai_analysis: {
    sentiment: number
    interests: string[]
    personality_traits: string[]
    recommended_features: string[]
  }
  created_at: string
}

// Real-time Types
export interface RealtimeEvent {
  type: 'message' | 'user_online' | 'user_offline' | 'affinity_match' | 'gift_received'
  user_id: string
  data: any
  timestamp: string
}

// Analytics Types
export interface UserAnalytics {
  user_id: string
  total_logins: number
  total_messages_sent: number
  total_messages_received: number
  total_profiles_viewed: number
  total_affinities_sent: number
  total_affinities_received: number
  total_gifts_sent: number
  total_gifts_received: number
  average_session_duration: number
  preferred_times: string[]
  most_active_day: string
  engagement_score: number
  last_updated: string
}