import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Conexión Real - Red Social Emocional',
  description: 'Conecta con personas reales a través de una red social emocional con diseño glassmorphism moderno.',
  keywords: ['red social', 'conexion emocional', 'relaciones', 'amistad', 'amor', 'glassmorphism'],
  authors: [{ name: 'MiniMax Agent' }],
  openGraph: {
    title: 'Conexión Real - Red Social Emocional',
    description: 'Plataforma moderna para conexiones emocionales auténticas',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conexión Real',
    description: 'Red social emocional para conexiones auténticas',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#D4AF37',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="es" 
      className={`${inter.variable} ${poppins.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#0D0D0D" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Conexión Real" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Analytics (add your tracking ID) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script> */}
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-black`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(26, 26, 26, 0.95)',
                color: '#F9F9F9',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                backdropFilter: 'blur(24px)',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#D4AF37',
                  secondary: '#0D0D0D',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F9F9F9',
                },
              },
            }}
          />
        </Providers>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }, function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}