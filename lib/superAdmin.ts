// Super Admin Configuration and Setup
// This file contains the logic for managing the super admin user

import { UserProfile } from '@/types'

// Super Admin Configuration
export const SUPER_ADMIN_CONFIG = {
  email: 'virtualnetwork22@gmail.com',
  password: '#Kalilinux22',
  full_name: 'Administrador Sistema',
  role: 'super_admin' as const,
  is_verified: true,
  is_premium: true,
  beats_balance: 10000
}

/**
 * Check if a user is the super admin
 */
export function isSuperAdmin(userEmail: string): boolean {
  return userEmail === SUPER_ADMIN_CONFIG.email
}

/**
 * Get super admin configuration for database insertion
 */
export function getSuperAdminProfile(userId: string): Partial<UserProfile> {
  return {
    id: userId,
    user_id: userId,
    full_name: SUPER_ADMIN_CONFIG.full_name,
    age: 30,
    city: 'Madrid',
    country: 'España',
    energy_emotion: 'misteriosa',
    purpose_of_life: 'Crear un mundo más conectado',
    what_seeking: 'Facilitar conexiones genuinas entre personas',
    what_inspires: 'La tecnología al servicio del amor verdadero',
    is_verified: SUPER_ADMIN_CONFIG.is_verified,
    is_premium: SUPER_ADMIN_CONFIG.is_premium,
    beats_balance: SUPER_ADMIN_CONFIG.beats_balance,
    status: 'available'
  }
}

/**
 * Setup super admin user profile in database
 * This function should be called after successful authentication
 */
export async function setupSuperAdminProfile(userId: string, userEmail: string): Promise<void> {
  if (!isSuperAdmin(userEmail)) {
    return
  }

  const { createClient } = await import('@/lib/supabase')
  const supabase = createClient()

  const profileData = getSuperAdminProfile(userId)
  
  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (!existingProfile) {
      // Insert new profile
      const { error } = await supabase
        .from('user_profiles')
        .insert([profileData])

      if (error) {
        console.error('Error creating super admin profile:', error)
        throw error
      }

      // Add super admin badge
      await supabase
        .from('user_badges')
        .insert([{
          user_id: userId,
          badge_type: 'verified'
        }])
    }
  } catch (error) {
    console.error('Error setting up super admin profile:', error)
    throw error
  }
}

/**
 * Check if current user has super admin privileges
 */
export function hasSuperAdminPrivileges(userEmail: string, userProfile?: any): boolean {
  // Primary check: email match
  if (isSuperAdmin(userEmail)) {
    return true
  }
  
  // Secondary check: role in profile metadata (if available)
  if (userProfile?.role === 'super_admin') {
    return true
  }
  
  return false
}

/**
 * Initialize super admin setup
 * Call this in the auth context after user signs in
 */
export async function initializeSuperAdmin(user: any, userProfile: any) {
  if (!user || !user.email) {
    return
  }

  try {
    await setupSuperAdminProfile(user.id, user.email)
  } catch (error) {
    console.error('Failed to initialize super admin:', error)
  }
}