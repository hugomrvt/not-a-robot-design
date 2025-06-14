"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Theme } from "./theme-toggle"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("aero")

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("ui-theme") as Theme
    if (savedTheme && ["aero", "8bit", "3025"].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Save theme to localStorage when it changes
    localStorage.setItem("ui-theme", theme)
    
    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}