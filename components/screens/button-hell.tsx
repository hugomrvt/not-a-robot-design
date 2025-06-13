"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCaptcha } from "../captcha-context"

export default function ButtonHell({ onComplete }: { onComplete: () => void }) {
  const { completeStep } = useCaptcha()
  const [showError, setShowError] = useState(false)
  const movingButtonRef = useRef<HTMLButtonElement>(null)

  const handleCorrectButton = () => {
    completeStep(2)
    onComplete()
  }

  const showFakeError = () => {
    setShowError(true)
    setTimeout(() => setShowError(false), 3000)
  }

  const moveButton = () => {
    if (movingButtonRef.current) {
      const x = Math.random() * 100 - 50
      const y = Math.random() * 100 - 50
      movingButtonRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Button Hell</h2>
        <p className="text-gray-600 text-sm">Find the button that actually works. Choose wisely.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Button 1: Disabled */}
        <Button variant="default" disabled className="opacity-50">
          Validate
        </Button>

        {/* Button 2: Fake error */}
        <Button variant="default" onClick={showFakeError}>
          Validate
        </Button>

        {/* Button 3: Moves on hover */}
        <motion.button
          ref={movingButtonRef}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onMouseEnter={moveButton}
          onClick={moveButton}
        >
          Validate
        </motion.button>

        {/* Button 4: Comic Sans */}
        <Button
          variant="outline"
          className="font-['Comic_Sans_MS',_cursive] text-purple-600 border-purple-300"
          onClick={() => alert("Comic Sans is never the answer.")}
        >
          Validate
        </Button>

        {/* Button 5: Camouflaged but works */}
        <Button variant="ghost" className="text-gray-200 hover:text-gray-900" onClick={handleCorrectButton}>
          Validate
        </Button>

        {/* Button 6: Fake loading */}
        <Button variant="default" className="relative overflow-hidden" onClick={() => alert("Still loading...")}>
          <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
          Validate...
        </Button>

        {/* Button 7: Too small */}
        <Button variant="outline" className="text-[8px] h-6" onClick={() => alert("Too small to be useful!")}>
          Validate
        </Button>

        {/* Button 8: Looks broken */}
        <Button
          variant="default"
          className="bg-gray-300 text-gray-500 line-through"
          onClick={() => alert("This button is deprecated.")}
        >
          Val_date
        </Button>

        {/* Button 9: Fake disabled */}
        <Button
          variant="default"
          className="opacity-50 cursor-not-allowed"
          onClick={() => alert("Surprise! I actually work.")}
        >
          Validate
        </Button>

        {/* Button 10: Looks important but isn't */}
        <Button
          variant="destructive"
          className="animate-pulse"
          onClick={() => alert("Important looking buttons are usually traps.")}
        >
          VALIDATE!
        </Button>
      </div>

      {/* Fake error modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">!</div>
              <h3 className="text-lg font-bold">Error 500</h3>
            </div>
            <p className="mb-4">
              The server encountered an unexpected condition that prevented it from fulfilling the request.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowError(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 italic text-center">
        Tip: Sometimes the least obvious choice is the right one.
      </p>
    </div>
  )
}
