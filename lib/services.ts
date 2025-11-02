// API services for Conexión Real
import { supabase } from '@/lib/supabase'
import { 
  UserProfile, 
  Conversation, 
  Message, 
  Affinity, 
  Gift, 
  GiftTransaction,
  BeatsTransaction,
  Notification,
  UserSettings,
  SearchFilters,
  ApiResponse
} from '@/types'

// Auth Services
export const authService = {
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  }
}

// Profile Services
export const profileService = {
  async getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      return { data }
    } catch (error: any) {
      return { error: { code: 'PROFILE_ERROR', message: error.message } }
    }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      return { data }
    } catch (error: any) {
      return { error: { code: 'UPDATE_ERROR', message: error.message } }
    }
  },

  async uploadPhoto(userId: string, file: File, isPrimary = false): Promise<ApiResponse<string>> {
    try {
      const fileName = `${userId}/${Date.now()}-${file.name}`
      
      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (error) throw error

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Update user profile with new avatar
      if (isPrimary) {
        await this.updateProfile(userId, { avatar_url: data.publicUrl })
      }

      return { data: data.publicUrl }
    } catch (error: any) {
      return { error: { code: 'UPLOAD_ERROR', message: error.message } }
    }
  }
}

// Search Services
export const searchService = {
  async searchUsers(filters: SearchFilters, page = 1, limit = 20): Promise<ApiResponse<UserProfile[]>> {
    try {
      let query = supabase
        .from('user_profiles')
        .select('*')

      // Apply filters
      if (filters.min_age) {
        query = query.gte('age', filters.min_age)
      }
      
      if (filters.max_age) {
        query = query.lte('age', filters.max_age)
      }

      if (filters.location) {
        query = query.or(`city.ilike.%${filters.location}%,country.ilike.%${filters.location}%`)
      }

      if (filters.energy_emotions?.length) {
        query = query.in('energy_emotion', filters.energy_emotions)
      }

      if (filters.purposes?.length) {
        query = query.in('purpose_of_life', filters.purposes)
      }

      if (filters.verified_only) {
        query = query.eq('is_verified', true)
      }

      if (filters.premium_only) {
        query = query.eq('is_premium', true)
      }

      if (filters.is_online) {
        query = query.eq('status', 'available')
      }

      // Apply sorting
      const sortBy = filters.sort_by || 'activity'
      const sortOrder = filters.sort_order || 'desc'

      if (sortBy === 'activity') {
        query = query.order('last_seen', { ascending: sortOrder === 'asc' })
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: sortOrder === 'asc' })
      }

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error } = await query

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'SEARCH_ERROR', message: error.message } }
    }
  },

  async getRecommendations(userId: string, limit = 10): Promise<ApiResponse<UserProfile[]>> {
    try {
      // Get user's preferences
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('energy_emotion, purpose_of_life')
        .eq('id', userId)
        .single()

      if (!userProfile) {
        throw new Error('User profile not found')
      }

      // Find similar users
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('energy_emotion', userProfile.energy_emotion)
        .eq('purpose_of_life', userProfile.purpose_of_life)
        .neq('id', userId)
        .limit(limit)
        .order('last_seen', { ascending: false })

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'RECOMMENDATION_ERROR', message: error.message } }
    }
  }
}

// Chat Services
export const chatService = {
  async getConversations(userId: string): Promise<ApiResponse<Conversation[]>> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages!conversations_last_message_id_fkey (
            id,
            content,
            sender_id,
            created_at
          )
        `)
        .contains('participants', [userId])
        .order('updated_at', { ascending: false })

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'CONVERSATIONS_ERROR', message: error.message } }
    }
  },

  async getMessages(conversationId: string, page = 1, limit = 50): Promise<ApiResponse<Message[]>> {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'MESSAGES_ERROR', message: error.message } }
    }
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Message>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single()

      if (error) throw error

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', message.conversation_id)

      return { data }
    } catch (error: any) {
      return { error: { code: 'SEND_MESSAGE_ERROR', message: error.message } }
    }
  },

  async markAsRead(messageIds: string[]): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .in('id', messageIds)

      if (error) throw error

      return {}
    } catch (error: any) {
      return { error: { code: 'MARK_READ_ERROR', message: error.message } }
    }
  },

  async reactToMessage(messageId: string, userId: string, reactionType: string): Promise<ApiResponse<void>> {
    try {
      // Check if reaction already exists
      const { data: existing } = await supabase
        .from('message_reactions')
        .select('id')
        .eq('message_id', messageId)
        .eq('user_id', userId)
        .eq('reaction_type', reactionType)
        .single()

      if (existing) {
        // Remove reaction
        const { error } = await supabase
          .from('message_reactions')
          .delete()
          .eq('id', existing.id)

        if (error) throw error
      } else {
        // Add reaction
        const { error } = await supabase
          .from('message_reactions')
          .insert({
            message_id: messageId,
            user_id: userId,
            reaction_type: reactionType
          })

        if (error) throw error
      }

      return {}
    } catch (error: any) {
      return { error: { code: 'REACTION_ERROR', message: error.message } }
    }
  }
}

// Affinity Services
export const affinityService = {
  async sendAffinity(user1Id: string, user2Id: string): Promise<ApiResponse<Affinity>> {
    try {
      const { data, error } = await supabase
        .from('affinities')
        .insert({
          user1_id: user1Id,
          user2_id: user2Id,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: user2Id,
          notification_type: 'affinity',
          title: 'Nueva Afinidad',
          message: 'Alguien expressó afinidad contigo',
          data: { user1_id: user1Id }
        })

      return { data }
    } catch (error: any) {
      return { error: { code: 'SEND_AFFINITY_ERROR', message: error.message } }
    }
  },

  async respondToAffinity(affinityId: string, status: 'accepted' | 'rejected'): Promise<ApiResponse<Affinity>> {
    try {
      const { data, error } = await supabase
        .from('affinities')
        .update({ status })
        .eq('id', affinityId)
        .select()
        .single()

      if (error) throw error

      return { data }
    } catch (error: any) {
      return { error: { code: 'RESPOND_AFFINITY_ERROR', message: error.message } }
    }
  },

  async getAffinities(userId: string): Promise<ApiResponse<Affinity[]>> {
    try {
      const { data, error } = await supabase
        .from('affinities')
        .select(`
          *,
          user_profiles:user1_id(*),
          user_profiles!user2_id(*)
        `)
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'GET_AFFINITIES_ERROR', message: error.message } }
    }
  }
}

// Gift Services
export const giftService = {
  async getGifts(): Promise<ApiResponse<Gift[]>> {
    try {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'GET_GIFTS_ERROR', message: error.message } }
    }
  },

  async sendGift(gift: Omit<GiftTransaction, 'id' | 'created_at'>): Promise<ApiResponse<GiftTransaction>> {
    try {
      const { data, error } = await supabase
        .from('gift_transactions')
        .insert(gift)
        .select()
        .single()

      if (error) throw error

      // Deduct beats from sender
      await supabase
        .from('user_profiles')
        .update({ 
          beats_balance: supabase.sql`beats_balance - ${gift.beats_spent}`
        })
        .eq('id', gift.sender_id)

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: gift.receiver_id,
          notification_type: 'gift',
          title: 'Regalo Recibido',
          message: 'Recibiste un regalo especial',
          data: { sender_id: gift.sender_id, gift_id: gift.gift_id }
        })

      return { data }
    } catch (error: any) {
      return { error: { code: 'SEND_GIFT_ERROR', message: error.message } }
    }
  },

  async purchaseBeats(userId: string, amount: number, provider: string): Promise<ApiResponse<BeatsTransaction>> {
    try {
      // This would integrate with actual payment providers
      const { data, error } = await supabase
        .from('beats_transactions')
        .insert({
          user_id: userId,
          amount,
          transaction_type: 'purchase',
          description: `Purchase of ${amount} beats`,
          payment_provider: provider
        })
        .select()
        .single()

      if (error) throw error

      // Add beats to user balance
      await supabase
        .from('user_profiles')
        .update({
          beats_balance: supabase.sql`beats_balance + ${amount}`
        })
        .eq('id', userId)

      return { data }
    } catch (error: any) {
      return { error: { code: 'PURCHASE_BEATS_ERROR', message: error.message } }
    }
  }
}

// Notification Services
export const notificationService = {
  async getNotifications(userId: string, limit = 20): Promise<ApiResponse<Notification[]>> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return { data: data || [] }
    } catch (error: any) {
      return { error: { code: 'GET_NOTIFICATIONS_ERROR', message: error.message } }
    }
  },

  async markAsRead(notificationIds: string[]): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', notificationIds)

      if (error) throw error

      return {}
    } catch (error: any) {
      return { error: { code: 'MARK_READ_ERROR', message: error.message } }
    }
  }
}

// Settings Services
export const settingsService = {
  async getUserSettings(userId: string): Promise<ApiResponse<UserSettings>> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned

      return { data }
    } catch (error: any) {
      return { error: { code: 'GET_SETTINGS_ERROR', message: error.message } }
    }
  },

  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      return { data }
    } catch (error: any) {
      return { error: { code: 'UPDATE_SETTINGS_ERROR', message: error.message } }
    }
  }
}

// Real-time subscriptions
export const realtimeService = {
  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          callback(payload.new as Message)
        }
      )
      .subscribe()
  },

  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as Notification)
        }
      )
      .subscribe()
  },

  subscribeToUserStatus(userId: string, callback: (status: string) => void) {
    return supabase
      .channel(`user_status:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
          filter: `id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new.status)
        }
      )
      .subscribe()
  }
}

export default {
  auth: authService,
  profile: profileService,
  search: searchService,
  chat: chatService,
  affinity: affinityService,
  gift: giftService,
  notification: notificationService,
  settings: settingsService,
  realtime: realtimeService
}