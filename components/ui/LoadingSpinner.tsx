import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  className?: string
  fullScreen?: boolean
}

const sizeConfig = {
  small: { spinner: 'w-6 h-6', text: 'text-sm' },
  medium: { spinner: 'w-8 h-8', text: 'text-base' },
  large: { spinner: 'w-12 h-12', text: 'text-lg' }
}

export default function LoadingSpinner({ 
  size = 'medium', 
  text, 
  className,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const { spinner, text: textSize } = sizeConfig[size]

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-4',
      fullScreen ? 'min-h-screen' : 'py-12',
      className
    )}>
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={cn(
          'bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center p-3',
          spinner
        )}
      >
        <Heart className="w-1/2 h-1/2 text-neutral-900" />
      </motion.div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn('text-neutral-300 font-medium', textSize)}
        >
          {text}
        </motion.p>
      )}
      
      {/* Loading dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black z-50">
        {content}
      </div>
    )
  }

  return content
}