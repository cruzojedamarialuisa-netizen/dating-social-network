# 🔗 Conexión Real

Una red social emocional moderna para conectar personas auténticas con diseño glassmorphism.

## ✨ Características Principales

### 🎨 Diseño
- **Glassmorphism**: Interfaz moderna con efectos de vidrio esmerilado
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Dark Mode**: Diseño oscuro optimizado para uso nocturno
- **Animaciones fluidas**: Microinteracciones y transiciones suaves

### 🔥 Funcionalidades Core
- **Dashboard Personalizado**: Bienvenida, notificaciones y accesos rápidos
- **Búsqueda Avanzada**: Filtros por ubicación, edad, energía emocional
- **Chat en Tiempo Real**: Mensajería con reacciones emocionales
- **Perfil Multimedia**: Fotos, videos y verificación
- **Sistema de Regalos**: Créditos virtuales "Latidos"
- **Afinidades Mutuas**: Sistema de matching inteligente
- **Eventos en Vivo**: Speed datings y actividades

### 🛠 Panel Administrativo
- **Estadísticas**: Usuarios, mensajes, afinidades
- **Configuración de Pagos**: Flow, MercadoPago, Stripe, Khipu
- **Moderación**: Control de contenido y usuarios
- **Superadmin**: Control maestro del sistema

### 🚀 Tecnologías
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Estilos**: Tailwind CSS + Framer Motion
- **Base de Datos**: Compatible con Vercel Postgres/Supabase
- **Autenticación**: Supabase Auth/Clerk.dev
- **Chat**: Tiempo real con Socket.io/Pusher
- **Hosting**: 100% compatible con Vercel

## 🚀 Instalación y Despliegue

### 1. Clonar el Repositorio
```bash
git clone [url-del-repo]
cd conexion-real
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno
```bash
cp .env.example .env.local
```
Edita `.env.local` con tus credenciales:

#### Para Vercel Postgres:
```env
DATABASE_URL=postgresql://...
```

#### Para Supabase:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-publica
```

#### Para Pagos (Opcional - configurar en admin):
```env
STRIPE_SECRET_KEY=sk_live_...
MERCADOPAGO_TOKEN=...
FLOW_API_KEY=...
```

### 4. Configurar Base de Datos
Ejecuta el script SQL de la carpeta `/database/` en tu base de datos.

### 5. Desarrollo Local
```bash
npm run dev
```
Visita http://localhost:3000

### 6. Desplegar en Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# O conectar con GitHub en vercel.com
```

## 📱 Uso de la Plataforma

### 👤 Para Usuarios
1. **Registro**: Crea cuenta con email o redes sociales
2. **Perfil**: Completa tu información y sube fotos
3. **Buscar**: Encuentra personas con filtros avanzados
4. **Conectar**: Envía mensajes, regalos y expresas afinidad
5. **Chat**: Conversa en tiempo real con reacciones

### 🔧 Para Administradores
1. **Acceso**: Panel en `/admin`
2. **Configuración**: Ajusta pagos, límites, apariencia
3. **Moderación**: Gestiona usuarios y contenido
4. **Estadísticas**: Monitorea actividad de la plataforma

### 👑 Para Superadministradores

#### Acceso Inmediato
**Email:** virtualnetwork22@gmail.com  
**Contraseña:** #Kalilinux22  

1. **Login**: Ve a `/auth/login` e ingresa las credenciales
2. **Auto-configuración**: El sistema configurará automáticamente el perfil de super admin
3. **Acceso Completo**: Dashboard administrativo + configuraciones del sistema

#### Privilegios del Super Admin
- ✅ Control total del sistema
- ✅ Gestión de usuarios y moderación
- ✅ Configuración de gateways de pago
- ✅ Estadísticas avanzadas
- ✅ 10,000 Latidos gratuitos
- ✅ Verificación automática

#### Documentación Completa
Ver `SUPER_ADMIN_GUIDE.md` para instrucciones detalladas.

## 🎯 Funcionalidades Avanzadas

### 🔮 Características IA
- **Matching Inteligente**: Sugerencias basadas en afinidades
- **Detección de Lenguaje**: Filtro automático de contenido ofensivo
- **Análisis de Intereses**: Recomendaciones personalizadas

### 📱 Experiencia Móvil
- **Gestos Táctiles**: Deslizar para navegar
- **Haptic Feedback**: Respuesta táctil en dispositivos compatibles
- **Notificaciones Push**: Alertas en tiempo real
- **Modo Offline**: Funcionalidad básica sin conexión

### 🎮 Gamificación
- **Badges**: Logros por actividad y interacciones
- **Streaks**: Racha de conexiones diarias
- **Mini-juegos**: Juegos de matching y trivia
- **Niveles**: Sistema de progreso social

## 🏗 Arquitectura

```
conexion-real/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Páginas de autenticación
│   ├── dashboard/         # Módulos principales
│   ├── admin/             # Panel administrativo
│   └── api/               # API Routes
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base
│   ├── layout/           # Layout y navegación
│   └── features/         # Funcionalidades específicas
├── hooks/                # Custom React hooks
├── lib/                  # Utilidades y configuración
├── styles/               # Archivos CSS globales
├── types/                # Definiciones TypeScript
└── database/             # Scripts y migraciones
```

## 🔧 Configuración Avanzada

### 🎨 Personalización
- Colores en `tailwind.config.js`
- Fuentes en `app/globals.css`
- Animaciones en `lib/animations.ts`

### 🔒 Seguridad
- Autenticación JWT
- Protección CSRF
- Rate limiting
- Validación de entrada

### 📊 Monitoreo
- Logs de actividad
- Métricas de rendimiento
- Alertas automáticas

## 📞 Soporte

- **Documentación**: /docs
- **Issues**: GitHub Issues
- **Email**: soporte@conexionreal.com

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

---

**Desarrollado por MiniMax Agent** 🚀
*Plataforma de conexión emocional moderna*