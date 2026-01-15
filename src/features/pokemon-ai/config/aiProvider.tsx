import { createGoogleGenerativeAI, type GoogleGenerativeAIProviderOptions } from '@ai-sdk/google'
import type { JSONValue, LanguageModel } from 'ai'
import React from 'react'
import { GeminiLogo } from '../components/GeminiLogo'

export type AIProvider = 'google'

export interface AIModel {
  id: string
  provider: AIProvider
  displayName: string
  logo: React.ComponentType<{ className?: string }> // Logo component
  features?: {
    thinking?: boolean
  }
  /**
   * Additional provider-specific options. They are passed through
   * to the provider from the AI SDK and enable provider-specific
   * functionality that can be fully encapsulated in the provider.
   * See AI SDK documentation
   */
  providerOptions?: Record<string, Record<string, JSONValue>>
  temperature?: number
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gemini-3-flash-preview',
    provider: 'google',
    displayName: 'Gemini 3 Flash Preview',
    logo: GeminiLogo,
    temperature: 0.7
  },
  {
    id: 'gemini-3-pro-preview',
    provider: 'google',
    displayName: 'Gemini 3 Pro Preview',
    logo: GeminiLogo,
    temperature: 0.7,
    features: {
      thinking: true
    },
    providerOptions: {
      google: {
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: 'low'
        }
      } satisfies GoogleGenerativeAIProviderOptions
    }
  }
]

export const DEFAULT_MODEL = AI_MODELS[1]

/**
 * Get the language model for the current provider.
 */
export function getAiSdkLanguageModel(model: AIModel): LanguageModel {
  switch (model.provider) {
    case 'google': {
      const google = createGoogleGenerativeAI({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY
      })
      return google(model.id)
    }
    default:
      throw new Error(`Unsupported AI provider: ${model.provider}`)
  }
}
