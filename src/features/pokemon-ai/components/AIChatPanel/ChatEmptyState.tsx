import { cn } from '@/utils/cn'
import { ArrowRightIcon, DnaIcon, FlameIcon, LightbulbIcon, SkullIcon, ZapIcon } from 'lucide-react'

interface Props {
  onPromptClick: (prompt: string) => void
  className?: string
}

const SUGGESTED_PROMPTS = [
  {
    icon: <LightbulbIcon size={18} />,
    title: 'Which pokemon is smartest?',
    prompt: 'Which pokemon is smartest?'
  },
  {
    icon: <FlameIcon size={18} />,
    title: 'How much flame can charizard produce?',
    prompt: 'How much flame can charizard produce?'
  },
  {
    icon: <ZapIcon size={18} />,
    title: 'Who is faster: Jolteon or Regieleki?',
    prompt: 'Who is faster: Jolteon or Regieleki?'
  },
  {
    icon: <DnaIcon size={18} />,
    title: 'Explain the mystery behind Mew and Ditto',
    prompt: 'Explain the mystery behind Mew and Ditto'
  },
  {
    icon: <SkullIcon size={18} />,
    title: 'What is the creepiest Pokedex entry?',
    prompt: 'What is the creepiest Pokedex entry?'
  }
]

export function ChatEmptyState(props: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-4 px-4 text-center', props.className)}>
      {/* Title and Description */}
      <p className="text-xs text-muted-foreground mb-4">Your Pokedex AI buddy</p>

      {/* Suggested Prompts */}
      <div className="w-full max-w-sm space-y-1.5">
        {SUGGESTED_PROMPTS.map((item, index) => (
          <button
            key={index}
            onClick={() => props.onPromptClick(item.prompt)}
            className={cn(
              'w-full flex items-center gap-2 p-2 rounded',
              'bg-muted/50 hover:bg-muted',
              'transition-all duration-200',
              'text-left group'
            )}
          >
            <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium">{item.title}</div>
            </div>
            <ArrowRightIcon
              size={14}
              className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
