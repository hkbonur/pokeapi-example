import { AnimatePresence, motion, type Variants } from 'framer-motion'

import { FloatingActionButton } from '@/components/FloatingActionButton'
import { cn } from '@/utils/cn'
import { MessageCircleIcon } from 'lucide-react'
import { useChat } from '../../hooks/useChat/useChat'
import { ChatEmptyState } from './ChatEmptyState'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useChatPanel } from './hooks/useChatPanel'

interface Props {
  className?: string
}

const panelVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 1200,
      damping: 40
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      type: 'spring',
      stiffness: 1200,
      damping: 50
    }
  }
}

export function AIChatPanel(props: Props) {
  const {
    messages,
    input,
    setInput,
    model,
    setModel,
    isLoading,
    isLoadingInitialResponse,
    submit,
    abort,
    clearMessages
  } = useChat()

  const { isOpen, scrollRef, handleOpen, handleClose } = useChatPanel({ messagesLength: messages.length })

  return (
    <AnimatePresence>
      {!isOpen ? (
        <FloatingActionButton
          key="fab"
          icon={<MessageCircleIcon size={24} />}
          onClick={handleOpen}
          aria-label="Open AI Chat"
        />
      ) : (
        <motion.div
          key="panel"
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'flex flex-col',
            'w-125',
            'rounded-lg',
            'bg-popover drk:bg-popover/60',
            'border',
            'shadow-lg shadow-black/15 dark:shadow-black/50',
            'overflow-hidden',
            props.className
          )}
          variants={panelVariants}
          initial="initial"
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            height: messages.length > 0 ? '83.33%' : 520
          }}
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 1200,
            damping: 40
          }}
        >
          <ChatHeader onNewChat={clearMessages} onMinimize={handleClose} />
          {messages.length > 0 ? (
            <ChatMessages messages={messages} scrollRef={scrollRef} isLoading={isLoadingInitialResponse} />
          ) : (
            <ChatEmptyState
              onPromptClick={(prompt) => {
                submit(prompt)
              }}
            />
          )}
          <div className="p-3 mt-auto">
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={(e) => {
                e.preventDefault()
                submit(input)
              }}
              isLoading={isLoading}
              currentModel={model}
              setModel={setModel}
              onAbort={abort}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
