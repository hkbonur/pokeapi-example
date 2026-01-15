import { Button } from '@/components/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { cn } from '@/utils/cn'
import { ArrowUpIcon, BrainIcon, SquareIcon } from 'lucide-react'
import React from 'react'
import { AI_MODELS, type AIModel } from '../../config/aiProvider'

interface Props {
  currentModel: AIModel
  setModel: (model: AIModel) => void
  onAbort: () => void
  isLoading: boolean
}

export function ChatInputToolbar(props: Props) {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)
  const items = AI_MODELS.map((model) => ({
    value: model.id,
    label: model.displayName,
    logo: model.logo,
    hasThinking: model.features?.thinking
  }))

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-1">
        <Select
          items={items}
          onOpenChange={setIsSelectOpen}
          disabled={props.isLoading}
          defaultValue={props.currentModel.id}
          onValueChange={(value) => {
            const model = AI_MODELS.find((m) => m.id === value)
            if (model) props.setModel(model)
          }}
        >
          <SelectTrigger
            size="sm"
            className={cn({
              'border-none bg-transparent dark:bg-transparent': !isSelectOpen
            })}
          >
            <SelectValue className="flex flex-row items-center gap-2">
              {React.createElement(props.currentModel.logo, { className: 'size-3.5 shrink-0' })}
              {props.currentModel.displayName}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-auto min-w-44 p-2 h-auto">
            {items.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                <div className="flex flex-row items-center gap-2 pr-4">
                  {React.createElement(model.logo, { className: 'size-3.5 shrink-0' })}
                  {model.label}
                  {model.hasThinking ? <BrainIcon className="size-3 text-muted-foreground" /> : null}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {props.isLoading ? (
        <Button type="button" variant="secondary" size="icon" className="text-destructive" onClick={props.onAbort}>
          <SquareIcon />
          <span className="sr-only">Abort</span>
        </Button>
      ) : (
        <Button type="submit" size="icon" variant="secondary">
          <ArrowUpIcon className="text-muted-foreground" />
          <span className="sr-only">Send</span>
        </Button>
      )}
    </div>
  )
}
