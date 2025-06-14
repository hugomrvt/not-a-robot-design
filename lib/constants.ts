// Configuration constants for the application

// Visit tracking configuration
export const VISIT_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
  COUNTER_FILE: 'visitor-count.json',
  NEW_VISITOR_INDICATOR_DURATION: 3000, // 3 seconds
  LOCAL_STORAGE_KEY: 'lastVisitTime'
} as const

// API endpoints
export const API_ENDPOINTS = {
  VISIT: '/api/visit'
} as const

// Theme configuration
export const THEME_CONFIG = {
  THEMES: ['aero', '8bit', '3025'] as const,
  DEFAULT_THEME: 'aero' as const
} as const

// Error messages
export const ERROR_MESSAGES = {
  VISIT_UPDATE_FAILED: 'Failed to update visit count',
  VISIT_READ_FAILED: 'Failed to get visit count',
  VISIT_HANDLE_FAILED: 'Failed to handle visit'
} as const