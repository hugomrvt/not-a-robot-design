"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [flashingButton, setFlashingButton] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashingButton((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold">Prove You're a Designer</h2>
      <p className="text-gray-600">Complete our totally reasonable challenges to verify your design credentials.</p>

      <div className="space-y-4 py-4">
        <Button variant="default" className="w-full opacity-50 cursor-not-allowed" disabled>
          Let's Go
        </Button>

        <Button
          variant={flashingButton ? "default" : "outline"}
          className={`w-full transition-all ${flashingButton ? "animate-pulse" : ""}`}
          onClick={() => alert("Sorry, this button is experiencing creative differences.")}
        >
          Start the Challenge
        </Button>

        <div className="relative h-10">
          <motion.div className="absolute right-0 bottom-0" whileHover={{ scale: 1.2 }}>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-gray-400 h-6 w-6 p-0"
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
