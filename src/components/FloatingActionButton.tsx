import { motion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

interface FloatingActionButtonProps extends HTMLMotionProps<'button'> {
  icon: React.ReactNode
}

export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ icon, className, ...props }, ref) => {
    // We use motion.button for animation support if wrapped in AnimatePresence
    // But since we are reusing our Button component, we can wrap it or just use motion.create(Button)
    // For simplicity, let's just make it a motion.button styled like a FAB.

    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:focus:ring-slate-300"
        ref={ref}
        {...props} // pass onClick, aria-label etc.
      >
        {icon}
      </motion.button>
    )
  }
)
FloatingActionButton.displayName = 'FloatingActionButton'
