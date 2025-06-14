"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-context"

interface VisitData {
  totalVisits: number
  uniqueVisitors: number
}

export default function VisitCounter() {
  const [visitData, setVisitData] = useState<VisitData | null>(null)
  const [isNewVisitor, setIsNewVisitor] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const handleVisit = async () => {
      try {
        // Check if this is a new session
        const lastVisit = localStorage.getItem('lastVisitTime')
        const currentTime = Date.now()
        const sessionTimeout = 30 * 60 * 1000 // 30 minutes
        
        const isNewSession = !lastVisit || (currentTime - parseInt(lastVisit)) > sessionTimeout
        
        if (isNewSession) {
          // This is a new visit, increment the counter
          const response = await fetch('/api/visit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setVisitData(data)
            setIsNewVisitor(true)
            localStorage.setItem('lastVisitTime', currentTime.toString())
            
            // Show new visitor indicator for 3 seconds
            setTimeout(() => setIsNewVisitor(false), 3000)
          } else {
            throw new Error('Failed to update visit count')
          }
        } else {
          // Just get the current count without incrementing
          const response = await fetch('/api/visit')
          if (response.ok) {
            const data = await response.json()
            setVisitData(data)
          }
        }
      } catch (error) {
        console.error("Failed to handle visit:", error)
        // Fallback to show something
        setVisitData({ totalVisits: 1, uniqueVisitors: 1 })
      }
    }

    handleVisit()
  }, [])

  if (visitData === null) return null

  const getCounterStyle = () => {
    switch (theme) {
      case "8bit":
        return "bg-gray-200 text-black border-2 border-gray-400 shadow-md"
      case "3025":
        return "bg-black/80 text-cyan-400 border border-cyan-400/30 shadow-lg shadow-cyan-400/20"
      default:
        return "bg-white/70 text-gray-600 shadow-sm backdrop-blur-sm"
    }
  }

  const getIndicatorColor = () => {
    switch (theme) {
      case "8bit":
        return "bg-green-600"
      case "3025":
        return "bg-cyan-400"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className={`fixed bottom-2 right-2 text-xs px-2 py-1 rounded-md transition-all duration-300 ${
      getCounterStyle()
    } ${isNewVisitor ? 'animate-pulse scale-110' : ''}`}>
      <div className="flex items-center space-x-1">
        <div className={`w-1.5 h-1.5 rounded-full ${getIndicatorColor()} ${
          isNewVisitor ? 'animate-ping' : ''
        }`}></div>
        <span>
          {visitData.totalVisits.toLocaleString()} visits
          {visitData.uniqueVisitors > 1 && (
            <span className="opacity-70"> • {visitData.uniqueVisitors} unique</span>
          )}
        </span>
        {isNewVisitor && (
          <span className="ml-1 text-xs opacity-80">+1</span>
        )}
      </div>
    </div>
  )
}
