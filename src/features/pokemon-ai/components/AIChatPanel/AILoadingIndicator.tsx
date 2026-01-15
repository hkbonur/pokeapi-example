import { motion } from 'framer-motion'

interface Props {
  isLoading: boolean
}

export function AILoadingIndicator(props: Props) {
  if (!props.isLoading) return null

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1 h-3 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-2 rounded-full bg-foreground/50"
            animate={{
              y: [0, -3, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}
