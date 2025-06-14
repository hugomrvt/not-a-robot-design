"use client"

import { useState, useEffect } from "react"
import { incrementVisitorCount } from "@/app/actions"

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Increment the counter on page load
    const updateCounter = async () => {
      try {
        const newCount = await incrementVisitorCount()
        setCount(newCount)
      } catch (error) {
        console.error("Failed to update visitor count:", error)
      }
    }

    updateCounter()
  }, [])

  if (count === null) return null

  return (
    <div className="fixed bottom-2 right-2 text-xs text-gray-400 bg-white bg-opacity-70 px-2 py-1 rounded-md shadow-sm">
      <div className="flex items-center space-x-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        <span>{count.toLocaleString()} visitors</span>
      </div>
    </div>
  )
}
