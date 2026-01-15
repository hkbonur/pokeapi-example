const TOOL_DISPLAY_NAMES: Record<string, { using: string; used: string }> = {
  getActions: {
    using: 'Fetching actions...',
    used: 'Actions fetched'
  },
  displayActionDetails: {
    using: 'Fetching action details...',
    used: 'Action details fetched'
  }
}

/**
 * Returns a user-friendly display name for a tool.
 * Falls back to a generic message if the tool is not found.
 */
export function getToolDisplayName(toolName: string, used: boolean): string {
  return TOOL_DISPLAY_NAMES[toolName]?.[used ? 'used' : 'using'] || `Using ${toolName}...`
}
