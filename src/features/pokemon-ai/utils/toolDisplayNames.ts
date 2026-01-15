const TOOL_DISPLAY_NAMES: Record<string, { applying: string; applied: string }> = {}

/**
 * Returns a user-friendly display name for a tool.
 * Falls back to a generic message if the tool is not found.
 */
export function getToolDisplayName(toolName: string, applied: boolean): string {
  return TOOL_DISPLAY_NAMES[toolName][applied ? 'applied' : 'applying'] || `Using ${toolName}...`
}
