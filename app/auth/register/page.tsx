'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/app/providers'
import { Eye, EyeOff, Heart, Mail, Lock, User, Calendar, Loader2 } from 'lucide-react'
import { validateEmail, validatePassword } from '@/lib/utils'
import { EMOTION_TYPES, PURPOSES_OF_LIFE } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { signUp, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    full_name: '',
    age: '',
    accept_terms: false,
    accept_privacy: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (step === 1) {
      const newErrors: { [key: string]: string } = {}

      if (!formData.email) {
        newErrors.email = 'El email es requerido'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email inválido'
      }

      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida'
      } else {
        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
          newErrors.password = passwordValidation.errors[0]
        }
      }

      if (!formData.confirm_password) {
        newErrors.confirm_password = 'Confirma tu contraseña'
      } else if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = 'Las contraseñas no coinciden'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setStep(2)
      return
    }

    if (step === 2) {
      const newErrors: { [key: string]: string } = {}

      if (!formData.full_name.trim()) {
        newErrors.full_name = 'El nombre completo es requerido'
      } else if (formData.full_name.trim().length < 2) {
        newErrors.full_name = 'El nombre debe tener al menos 2 caracteres'
      }

      const age = parseInt(formData.age)
      if (!formData.age) {
        newErrors.age = 'La edad es requerida'
      } else if (isNaN(age) || age < 18 || age > 100) {
        newErrors.age = 'Debes tener entre 18 y 100 años'
      }

      if (!formData.accept_terms) {
        newErrors.accept_terms = 'Debes aceptar los términos de servicio'
      }

      if (!formData.accept_privacy) {
        newErrors.accept_privacy = 'Debes aceptar la política de privacidad'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Create account
      try {
        await signUp(formData.email, formData.password, {
          full_name: formData.full_name.trim(),
          age: age
        })
      } catch (error: any) {
        toast.error(error.message || 'Error al crear la cuenta')
      }
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const goToStep1 = () => {
    setStep(1)
    setErrors({})
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary-500/20 to-primary-700/20 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-glass-lg flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-neutral-900" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-100 mb-6">
              Únete a la Comunidad
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Comienza tu viaje hacia conexiones auténticas
            </p>
            <div className="space-y-4">
              {[
                'Crea tu perfil personalizado',
                'Conecta con personas afines',
                'Descubre nuevos intereses',
                'Construye relaciones genuinas'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-100">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-surface p-8 rounded-glass-lg"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-glass flex items-center justify-center">
                  <Heart className="w-6 h-6 text-neutral-900" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-neutral-100 mb-2">Crear Cuenta</h1>
              <p className="text-neutral-400">
                {step === 1 ? 'Configura tus credenciales' : 'Completa tu información'}
              </p>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center mt-6 space-x-2">
                <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-primary-500' : 'bg-neutral-600'}`} />
                <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-neutral-600'}`} />
              </div>
              <div className="flex justify-between text-xs text-neutral-400 mt-2">
                <span>Credenciales</span>
                <span>Información</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`input-field pl-10 w-full ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="tu@email.com"
                        disabled={loading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`input-field pl-10 pr-10 w-full ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Mínimo 8 caracteres"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-300 transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-neutral-300 mb-2">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                      <input
                        id="confirm_password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirm_password}
                        onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                        className={`input-field pl-10 pr-10 w-full ${errors.confirm_password ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Repite tu contraseña"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-300 transition-colors"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirm_password && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-neutral-300 mb-2">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                      <input
                        id="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className={`input-field pl-10 w-full ${errors.full_name ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Tu nombre completo"
                        disabled={loading}
                      />
                    </div>
                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-neutral-300 mb-2">
                      Edad
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                      <input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className={`input-field pl-10 w-full ${errors.age ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="18"
                        min="18"
                        max="100"
                        disabled={loading}
                      />
                    </div>
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.accept_terms}
                          onChange={(e) => handleInputChange('accept_terms', e.target.checked)}
                          className="custom-checkbox mt-1"
                          disabled={loading}
                        />
                        <span className="text-sm text-neutral-300">
                          Acepto los{' '}
                          <Link href="/terms" className="text-primary-500 hover:text-primary-300">
                            términos de servicio
                          </Link>
                        </span>
                      </label>
                      {errors.accept_terms && (
                        <p className="text-red-500 text-sm mt-1">{errors.accept_terms}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.accept_privacy}
                          onChange={(e) => handleInputChange('accept_privacy', e.target.checked)}
                          className="custom-checkbox mt-1"
                          disabled={loading}
                        />
                        <span className="text-sm text-neutral-300">
                          Acepto la{' '}
                          <Link href="/privacy" className="text-primary-500 hover:text-primary-300">
                            política de privacidad
                          </Link>
                        </span>
                      </label>
                      {errors.accept_privacy && (
                        <p className="text-red-500 text-sm mt-1">{errors.accept_privacy}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex space-x-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={goToStep1}
                    className="btn-secondary flex-1"
                    disabled={loading}
                  >
                    Anterior
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`${step === 1 ? 'flex-1' : 'flex-1'} btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span>{step === 1 ? 'Siguiente' : 'Crear Cuenta'}</span>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-neutral-400">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/auth/login" className="text-primary-500 hover:text-primary-300 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}