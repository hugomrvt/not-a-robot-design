"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function FinalScreen() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true)

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 py-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold">Fine, you're a designer. I guess.</h2>
        <p className="text-gray-600 mt-2">You've proven your ability to navigate terrible UX. Congratulations?</p>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </motion.div>

      <div className="relative h-12">
        <motion.div
          className="absolute bottom-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          <Button variant="ghost" className="text-[10px] text-gray-400 h-6">
            Submit Form
          </Button>
        </motion.div>
      </div>

      <motion.p
        className="text-xs text-gray-500 italic text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Your suffering has been recorded for future reference.
      </motion.p>
    </div>
  )
}
