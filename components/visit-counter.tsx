'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './theme-context'
import { VISIT_CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants'

interface VisitData {
  totalVisits: number
  uniqueVisitors: number
}

/**
 * Hook for managing visit data and session detection
 */
function useVisitTracking() {
  const [visitData, setVisitData] = useState<VisitData>({ totalVisits: 0, uniqueVisitors: 0 })
  const [showNewVisit, setShowNewVisit] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkNewSession = (): boolean => {
    const lastVisitTime = localStorage.getItem(VISIT_CONFIG.LOCAL_STORAGE_KEY)
    const now = Date.now()
    return !lastVisitTime || (now - parseInt(lastVisitTime)) > VISIT_CONFIG.SESSION_TIMEOUT
  }

  const updateLastVisitTime = (): void => {
    localStorage.setItem(VISIT_CONFIG.LOCAL_STORAGE_KEY, Date.now().toString())
  }

  const handleNewVisit = async (): Promise<void> => {
    try {
      const response = await fetch(API_ENDPOINTS.VISIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setVisitData(data)
      setShowNewVisit(true)
      
      setTimeout(() => setShowNewVisit(false), VISIT_CONFIG.NEW_VISITOR_INDICATOR_DURATION)
      updateLastVisitTime()
    } catch (err) {
      console.error('Failed to handle new visit:', err)
      setError(ERROR_MESSAGES.VISIT_UPDATE_FAILED)
    }
  }

  const fetchCurrentVisitData = async (): Promise<void> => {
    try {
      const response = await fetch(API_ENDPOINTS.VISIT)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setVisitData(data)
    } catch (err) {
      console.error('Failed to fetch visit data:', err)
      setError(ERROR_MESSAGES.VISIT_READ_FAILED)
    }
  }

  const initializeVisitTracking = async (): Promise<void> => {
    try {
      setError(null)
      
      if (checkNewSession()) {
        await handleNewVisit()
      } else {
        await fetchCurrentVisitData()
      }
    } catch (err) {
      console.error('Failed to initialize visit tracking:', err)
      setError(ERROR_MESSAGES.VISIT_HANDLE_FAILED)
    }
  }

  return {
    visitData,
    showNewVisit,
    error,
    initializeVisitTracking
  }
}

/**
 * Hook for theme-based styling
 */
function useCounterStyles() {
  const { theme } = useTheme()

  const getCounterStyle = (): string => {
    switch (theme) {
      case '8bit':
        return 'bg-gray-800 border-2 border-green-400 text-green-400 font-mono'
      case '3025':
        return 'bg-black border border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20'
      default: // aero
        return 'bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-lg'
    }
  }

  const getIndicatorColor = (): string => {
    switch (theme) {
      case '8bit':
        return 'text-yellow-400'
      case '3025':
        return 'text-pink-400'
      default: // aero
        return 'text-blue-300'
    }
  }

  const getErrorStyle = (): string => {
    switch (theme) {
      case '8bit':
        return 'text-red-400'
      case '3025':
        return 'text-red-400'
      default: // aero
        return 'text-red-300'
    }
  }

  return {
    getCounterStyle,
    getIndicatorColor,
    getErrorStyle
  }
}

export default function VisitCounter() {
  const { visitData, showNewVisit, error, initializeVisitTracking } = useVisitTracking()
  const { getCounterStyle, getIndicatorColor, getErrorStyle } = useCounterStyles()

  useEffect(() => {
    initializeVisitTracking()
  }, [])

  if (error) {
    return (
      <div className={`fixed bottom-4 right-4 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${getCounterStyle()}`}>
        <div className={`${getErrorStyle()}`}>
          Error loading visits
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${getCounterStyle()}`}>
      <div className="flex items-center space-x-2">
        <span>Visits: {visitData.totalVisits.toLocaleString()}</span>
        {showNewVisit && (
          <span className={`animate-bounce ${getIndicatorColor()}`}>+1</span>
        )}
      </div>
    </div>
  )
}
