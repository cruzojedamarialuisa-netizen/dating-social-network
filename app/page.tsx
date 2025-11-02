import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Star, 
  Shield, 
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-surface border-b border-glass-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-neutral-900" />
              </div>
              <span className="text-xl font-bold text-gradient">Conexión Real</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-300 hover:text-primary-500 transition-colors">
                Características
              </a>
              <a href="#how-it-works" className="text-neutral-300 hover:text-primary-500 transition-colors">
                Cómo Funciona
              </a>
              <a href="#testimonials" className="text-neutral-300 hover:text-primary-500 transition-colors">
                Testimonios
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-neutral-300 hover:text-primary-500 transition-colors">
                Iniciar Sesión
              </Link>
              <Link 
                href="/auth/register" 
                className="btn-primary"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-700/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-100 mb-8">
                Conecta con{' '}
                <span className="text-gradient">Personas Reales</span>
                <br />
                de Forma Auténtica
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Una red social emocional diseñada para crear conexiones genuinas. 
                Encuentra personas que compartan tu energía y propósito de vida.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
                <button className="flex items-center space-x-3 text-neutral-300 hover:text-primary-500 transition-colors group">
                  <div className="w-12 h-12 bg-glass rounded-full flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  <span className="text-lg">Ver Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 glass-surface border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Usuarios Activos' },
              { number: '1M+', label: 'Conexiones Hechas' },
              { number: '95%', label: 'Satisfacción' },
              { number: '24/7', label: 'Soporte' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 mb-6">
              Características que Conectan
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Diseñado para crear experiencias auténticas y conexiones profundas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Afinidad Emocional',
                description: 'Algoritmo inteligente que conecta personas con energías similares y propósitos compatibles.'
              },
              {
                icon: MessageCircle,
                title: 'Chat Inteligente',
                description: 'Conversaciones en tiempo real con reacciones emocionales y reconocimiento de voz.'
              },
              {
                icon: Users,
                title: 'Eventos en Vivo',
                description: 'Speed datings, chats grupales y actividades que fomentan conexiones genuinas.'
              },
              {
                icon: Star,
                title: 'Sistema de Regalos',
                description: 'Expresa tus sentimientos con regalos virtuales y mejora tu experiencia social.'
              },
              {
                icon: Shield,
                title: 'Seguridad Avanzada',
                description: 'Verificación facial, moderación automática y protección de privacidad total.'
              },
              {
                icon: Sparkles,
                title: 'Experiencia Premium',
                description: 'Funciones exclusivas, filtros avanzados y personalización completa de tu perfil.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="profile-card group"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-glass flex items-center justify-center mb-6 group-hover:bg-primary-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-100 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 glass-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 mb-6">
              Cómo Funciona
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Tres pasos simples para encontrar tu conexión perfecta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Crea tu Perfil',
                description: 'Comparte tu información, energía emocional y lo que buscas en una relación.'
              },
              {
                step: '02',
                title: 'Encuentra Conexiones',
                description: 'Nuestra IA encuentra personas con afinidades y propósitos similares al tuyo.'
              },
              {
                step: '03',
                title: 'Conecta y Conoce',
                description: 'Inicia conversaciones, envía regalos y construye relaciones auténticas.'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-neutral-900">
                  {step.step}
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-100 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-neutral-300 leading-relaxed">
                  {step.description}
                </p>

                {index < 2 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-primary-500 absolute top-8 -right-6 lg:-right-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 mb-6">
              Lo que Dicen Nuestros Usuarios
            </h2>
            <p className="text-xl text-neutral-300">
              Historias reales de conexiones auténticas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Diseñadora UX',
                content: 'Finalmente encontré personas que realmente entienden mi energía y propósito. Las conexiones aquí son genuinas.',
                rating: 5
              },
              {
                name: 'Carlos Ruiz',
                role: 'Desarrollador',
                content: 'El sistema de afinidad es increíble. He conocido personas afines a mí de formas que otras apps no logran.',
                rating: 5
              },
              {
                name: 'Ana Martín',
                role: 'Psicóloga',
                content: 'La calidad de los usuarios es excepcional. Todas mis conversaciones han sido profundas y significativas.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="profile-card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-neutral-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-500 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 glass-surface">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 mb-6">
              ¿Listo para Encontrar tu Conexión Real?
            </h2>
            
            <p className="text-xl text-neutral-300 mb-8">
              Únete a miles de personas que ya han encontrado conexiones auténticas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                Crear Cuenta Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-400">
              {[
                'Sin tarjeta de crédito',
                'Verificación gratuita',
                'Cancelación en cualquier momento'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-surface border-t border-glass-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-neutral-900" />
                </div>
                <span className="text-xl font-bold text-gradient">Conexión Real</span>
              </div>
              <p className="text-neutral-400">
                Conecta con personas reales de forma auténtica y encuentra tu propósito.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-100 mb-4">Producto</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Seguridad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-100 mb-4">Empresa</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-100 mb-4">Legal</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-primary-500 transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary-500 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-glass-border mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 Conexión Real. Todos los derechos reservados. Desarrollado por MiniMax Agent.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}