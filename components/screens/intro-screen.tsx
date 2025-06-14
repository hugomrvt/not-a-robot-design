"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "../theme-context"

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [flashingButton, setFlashingButton] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashingButton((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const getButtonVariant = () => {
    switch (theme) {
      case "8bit":
        return "retro"
      case "3025":
        return "futuristic"
      default:
        return "aero"
    }
  }

  const getTextColor = () => {
    switch (theme) {
      case "8bit":
        return "text-black"
      case "3025":
        return "text-cyan-400"
      default:
        return "text-white"
    }
  }

  const getSubTextColor = () => {
    switch (theme) {
      case "8bit":
        return "text-gray-600"
      case "3025":
        return "text-cyan-400/80"
      default:
        return "text-white/80"
    }
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className={`text-2xl font-bold drop-shadow-sm ${getTextColor()}`}>Prove You're a Designer</h2>
      <p className={getSubTextColor()}>Complete our totally reasonable challenges to verify your design credentials.</p>

      <div className="space-y-4 py-4">
        <Button variant={getButtonVariant()} className="w-full opacity-50 cursor-not-allowed" disabled>
          Let's Go
        </Button>

        <Button
          variant={getButtonVariant()}
          className={`w-full transition-all ${flashingButton ? "animate-pulse" : ""}`}
          onClick={() => alert("Sorry, this button is experiencing creative differences.")}
        >
          Start the Challenge
        </Button>

        <div className="relative h-10">
          <motion.div className="absolute right-0 bottom-0" whileHover={{ scale: 1.2 }}>
            <Button
              size="sm"
              variant={getButtonVariant()}
              className={`text-xs h-6 w-6 p-0 ${getSubTextColor()}`}
              onClick={onComplete}
              aria-label="Continue to next step"
            >
              →
            </Button>
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-gray-400 italic">
        By continuing, you agree to our ridiculous terms and acknowledge that good UX is overrated.
      </p>
    </div>
  )
}
