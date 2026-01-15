import { type ModelMessage, type StepResult, streamText, type ToolSet } from 'ai'
import { useMemo } from 'react'
import { type AIModel, DEFAULT_MODEL, getAiSdkLanguageModel } from '../config/aiProvider'
import { buildInitialSystemMessage } from '../utils/buildInitialSystemMessage'

import { getActions } from '../tools/getActions'
import { displayActionDetails } from '../tools/displayActionDetails'

export interface AIGenerationOptions {
  abortSignal: AbortSignal | undefined
  onReasoningChunk: (chunk: string) => void
  onTextChunk: (chunk: string) => void
  onToolCall?: (toolName: string) => void
  onToolResult?: (toolName: string) => void
}

export interface AIToolResult {
  text: string
  reasoning?: string
}

const tools: ToolSet = {
  getActions,
  displayActionDetails
}

export function useGenerateWithTools(model: AIModel = DEFAULT_MODEL, options: AIGenerationOptions) {
  const languageModel = useMemo(() => getAiSdkLanguageModel(model), [model])

  const generateWithTools = async (messages: ModelMessage[]): Promise<AIToolResult> => {
    const result = streamText({
      model: languageModel,
      messages: [buildInitialSystemMessage(), ...messages],
      tools,
      toolChoice: 'auto',
      temperature: model.temperature,
      providerOptions: model.providerOptions,
      stopWhen: shouldStopGeneration,
      abortSignal: options.abortSignal,
      onError(error) {
        console.error('❌ AI Generation Stream Error:', error)
        throw Error('Unexpected error during AI generation.')
      },
      onStepFinish(step) {
        step.toolCalls.forEach((call) => {
          console.log('🔧 Tool Call:', call.toolName, call.input)
        })

        step.toolResults.forEach((result) => {
          console.log('🔧 Tool Result:', result.toolName, result.output)
        })
      }
    })

    let fullText = ''
    let fullReasoning = ''

    for await (const chunk of result.fullStream) {
      if (chunk.type === 'tool-call') {
        options.onToolCall?.(chunk.toolName)
      } else if (chunk.type === 'tool-result') {
        options.onToolResult?.(chunk.toolName)
      } else if (chunk.type === 'reasoning-delta') {
        fullReasoning += chunk.text
        options.onReasoningChunk?.(chunk.text)
      } else if (chunk.type === 'reasoning-end') {
        fullReasoning += '<br/>'
        options.onReasoningChunk?.('<br/>')
      } else if (chunk.type === 'text-delta') {
        fullText += chunk.text
        options.onTextChunk?.(chunk.text)
      } else if (chunk.type === 'text-end') {
        fullText += '<br/>'
        options.onTextChunk?.('<br/>')
      }
    }

    return {
      text: fullText,
      reasoning: fullReasoning || undefined
    }
  }

  return {
    generateWithTools
  }
}

const shouldStopGeneration = (result: { steps: Array<StepResult<ToolSet>> }): boolean => {
  // Continue until we get a 'stop' finish reason (model is done)
  // or we've completed 20 steps (safety limit)
  const lastStep = result.steps[result.steps.length - 1]
  return lastStep?.finishReason === 'stop' || result.steps.length >= 20
}
