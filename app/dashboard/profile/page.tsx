'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { UserProfile, EmotionType, PurposeOfLife } from '@/types'
import { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    age: 0,
    city: '',
    country: '',
    energy_emotion: 'alegre' as EmotionType,
    purpose_of_life: 'Encontrar el amor verdadero' as PurposeOfLife,
    what_seeking: '',
    what_inspires: '',
    presentation_video_url: ''
  })

  const emotionOptions: EmotionType[] = [
    'alegre', 'reflexiva', 'romántica', 'aventurera', 'inteligente', 
    'emprendedora', 'artística', 'deportiva', 'espiritual', 'social'
  ]

  const purposeOptions: PurposeOfLife[] = [
    'Encontrar el amor verdadero',
    'Construir una familia', 
    'Desarrollar mi carrera',
    'Ayudar a otros',
    'Viajar y vivir experiencias',
    'Crear algo innovador',
    'Crecer personalmente',
    'Encontrar mi propósito',
    'Vivir aventuras',
    'Lograr estabilidad'
  ]

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }
      
      setUser(user)
      
      // Fetch user profile
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }
      
      if (profileData) {
        setProfile(profileData)
        setFormData({
          full_name: profileData.full_name || '',
          age: profileData.age || 18,
          city: profileData.city || '',
          country: profileData.country || '',
          energy_emotion: profileData.energy_emotion || 'alegre',
          purpose_of_life: profileData.purpose_of_life || 'Encontrar el amor verdadero',
          what_seeking: profileData.what_seeking || '',
          what_inspires: profileData.what_inspires || '',
          presentation_video_url: profileData.presentation_video_url || ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }))
  }

  // Función para subir video
  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      
      // Validar que es un video
      if (!file.type.startsWith('video/')) {
        alert('Por favor selecciona un archivo de video válido')
        return
      }

      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}/profile-video-${Date.now()}.${fileExt}`

      // Subir a Supabase Storage
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, file)

      if (error) {
        console.error('Error al subir video:', error)
        alert('Error al subir el video')
        return
      }

      // Obtener URL pública del video
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName)

      setFormData(prev => ({
        ...prev,
        presentation_video_url: urlData.publicUrl
      }))

    } catch (error) {
      console.error('Error al subir video:', error)
      alert('Error al subir el video')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    setUpdating(true)
    
    try {
      const profileData = {
        user_id: user.id,
        ...formData,
        updated_at: new Date().toISOString()
      }
      
      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id)
        
        if (error) throw error
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert([{
            ...profileData,
            is_verified: false,
            is_premium: false,
            beats_balance: 0,
            last_seen: new Date().toISOString(),
            status: 'available',
            created_at: new Date().toISOString()
          }])
        
        if (error) throw error
      }
      
      alert('Perfil actualizado exitosamente')
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error al actualizar el perfil')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
              <p className="text-purple-100 mt-2">Actualiza tu información para conectar mejor</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    max="100"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu edad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu ciudad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu país"
                  />
                </div>
              </div>

              {/* Energía y propósito */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo describes tu energía emocional?
                  </label>
                  <select
                    name="energy_emotion"
                    value={formData.energy_emotion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {emotionOptions.map((emotion) => (
                      <option key={emotion} value={emotion}>
                        {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuál es tu propósito de vida?
                  </label>
                  <select
                    name="purpose_of_life"
                    value={formData.purpose_of_life}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {purposeOptions.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Video de presentación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video de Presentación
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  
                  {formData.presentation_video_url ? (
                    <div className="relative">
                      <video 
                        controls 
                        className="w-full max-w-md rounded-lg"
                        src={formData.presentation_video_url}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, presentation_video_url: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Clic para subir video</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">MP4, MOV, AVI (MAX. 100MB)</p>
                      </div>
                    </label>
                  )}
                  
                  {isUploading && (
                    <div className="flex items-center space-x-2 text-purple-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">Subiendo video...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Textos descriptivos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué estás buscando?
                </label>
                <textarea
                  name="what_seeking"
                  value={formData.what_seeking}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe lo que buscas en una relación o conexión..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué te inspira?
                </label>
                <textarea
                  name="what_inspires"
                  value={formData.what_inspires}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Comparte lo que te motiva y te hace brillar..."
                />
              </div>

              {/* Botones */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? 'Actualizando...' : 'Actualizar Perfil'}
                </button>
                
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
