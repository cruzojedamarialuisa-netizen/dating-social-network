import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for the app
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'ahora mismo'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

export const formatTime = (date: Date | string): string => {
  return new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date()
  const d = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'justo ahora'
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} h`
  return `hace ${Math.floor(diffInSeconds / 86400)} d`
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const generateUsername = (email: string): string => {
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
  const randomNum = Math.floor(Math.random() * 1000)
  return `${base}${randomNum}`
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula')
  }
  if (!/\d/.test(password)) {
    errors.push('Debe contener al menos un número')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const calculateAge = (birthDate: Date | string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength - 3) + '...'
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

export const isVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/')
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

export const getRandomColor = (): string => {
  const colors = [
    '#D4AF37', // primary gold
    '#EAC15F', // light gold
    '#B89A30', // dark gold
    '#22C55E', // success green
    '#EF4444', // error red
    '#F59E0B', // warning amber
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#EC4899', // pink
    '#84CC16', // lime
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Energy/emotion types for the platform
export const EMOTION_TYPES = [
  'alegre',
  'calma',
  'pasión',
  'esperanza',
  'energética',
  'reflexiva',
  'aventurera',
  'romántica',
  'optimista',
  'misteriosa',
  'amigable',
  'creativa',
  'independiente',
  'comprensiva',
  'entusiasta'
] as const

export const PURPOSES_OF_LIFE = [
  'Encontrar el amor verdadero',
  'Construir una familia',
  'Crear amistades duraderas',
  'Desarrollarme personalmente',
  'Encontrar mi propósito',
  'Viajar y explorar',
  'Conseguir estabilidad financiera',
  'Tener una carrera exitosa',
  'Tener aventuras emocionantes',
  'Crear algo significativo',
  'Encontrar equilibrio trabajo-vida',
  'Ser feliz y positivo',
  'Encontrar mi media naranja',
  'Conectar con personas afines',
  'Vivir experiencias únicas'
] as const

export type EmotionType = typeof EMOTION_TYPES[number]
export type PurposeOfLife = typeof PURPOSES_OF_LIFE[number]