export interface ResultOrErrorWithSuggestion {
  success: boolean
  error?: string
  suggestion?: string
  data?: any
}
