"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCaptcha } from "../captcha-context"

export default function ContrastTrap({ onComplete }: { onComplete: () => void }) {
  const { completeStep } = useCaptcha()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmit = () => {
    setShowFeedback(true)

    if (selectedOption === 1) {
      setTimeout(() => {
        completeStep(3)
        onComplete()
      }, 1500)
    } else {
      setTimeout(() => {
        setShowFeedback(false)
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Color Contrast Challenge</h2>
        <p className="text-gray-600 text-sm">
          Select the text/background combination that meets accessibility standards.
        </p>
      </div>

      <div className="space-y-4">
        {/* Option 1: Passes AA (correct) */}
        <div
          className={`relative p-4 rounded-md border-2 cursor-pointer transition-all ${
            selectedOption === 1 ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setSelectedOption(1)}
        >
          <div className="bg-gray-800 text-white p-4 rounded-md">
            <p className="font-medium">Standard Text</p>
            <p className="text-sm">This is readable body text that meets WCAG AA standards.</p>
          </div>
          <div className="absolute top-2 right-2 text-xs text-gray-500">Boring but functional</div>
        </div>

        {/* Option 2: Fails but looks "clean" */}
        <div
          className={`relative p-4 rounded-md border-2 cursor-pointer transition-all ${
            selectedOption === 2 ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setSelectedOption(2)}
        >
          <div className="bg-gray-100 text-gray-400 p-4 rounded-md">
            <p className="font-medium">Minimalist Text</p>
            <p className="text-sm">This is elegant, subtle text that looks clean and modern.</p>
          </div>
          <div className="absolute top-2 right-2 text-xs text-blue-500 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Dribbble Pick
          </div>
        </div>

        {/* Option 3: Eye-melting neon */}
        <div
          className={`relative p-4 rounded-md border-2 cursor-pointer transition-all ${
            selectedOption === 3 ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setSelectedOption(3)}
        >
          <div className="bg-fuchsia-600 text-yellow-300 p-4 rounded-md font-bold">
            <p className="font-medium">VIBRANT TEXT</p>
            <p className="text-sm">THIS TEXT REALLY POPS AND GRABS ATTENTION!</p>
          </div>
          <div className="absolute top-2 right-2 text-xs text-blue-500 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Dribbble Pick
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit} disabled={selectedOption === null}>
          Submit Choice
        </Button>
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-md text-center text-sm ${
            selectedOption === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {selectedOption === 1
            ? "Correct! Accessibility over aesthetics."
            : "Wrong choice. Accessibility isn't optional."}
        </motion.div>
      )}
    </div>
  )
}
