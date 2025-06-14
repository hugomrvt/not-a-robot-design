"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type Theme = "aero" | "8bit" | "3025"

interface ThemeToggleProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

const themes = [
  { id: "aero" as const, name: "Aero", description: "Windows Vista/7 Glass" },
  { id: "8bit" as const, name: "8-bit", description: "Windows 3.1 Retro" },
  { id: "3025" as const, name: "3025", description: "Futuristic UI" },
]

export default function ThemeToggle({ currentTheme, onThemeChange }: ThemeToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentThemeData = themes.find(t => t.id === currentTheme)

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <Button
          variant={currentTheme === "aero" ? "aero" : currentTheme === "8bit" ? "retro" : "futuristic"}
          className="min-w-[120px] justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentThemeData?.name}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
        
        {isOpen && (
          <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg border shadow-lg ${
            currentTheme === "aero" ? "glass-effect border-white/30" :
            currentTheme === "8bit" ? "bg-gray-200 border-gray-400" :
            "bg-black/80 border-cyan-400/50 backdrop-blur-sm"
          }`}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`w-full px-4 py-3 text-left hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  currentTheme === theme.id ? "bg-white/20" : ""
                } ${
                  currentTheme === "aero" ? "text-white" :
                  currentTheme === "8bit" ? "text-black" :
                  "text-cyan-400"
                }`}
                onClick={() => {
                  onThemeChange(theme.id)
                  setIsOpen(false)
                }}
              >
                <div className="font-medium">{theme.name}</div>
                <div className={`text-xs ${
                  currentTheme === "aero" ? "text-white/70" :
                  currentTheme === "8bit" ? "text-gray-600" :
                  "text-cyan-400/70"
                }`}>
                  {theme.description}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export type { Theme }