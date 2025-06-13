"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCaptcha } from "../captcha-context"

export default function AlignmentTest({ onComplete }: { onComplete: () => void }) {
  const { completeStep } = useCaptcha()
  const [showModal, setShowModal] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Motion values for draggable square
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Delayed cursor position for lag effect
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  // Track mouse position with delay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTimeout(() => {
        setCursorPos({ x: e.clientX, y: e.clientY })
      }, 150) // 150ms lag
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Check if square is "centered" (but actually not quite)
  const checkAlignment = () => {
    const xPos = x.get()
    const yPos = y.get()

    setAttemptCount((prev) => prev + 1)

    // The trick: the "center" is actually off by a few pixels
    const isAligned = Math.abs(xPos - 5) < 15 && Math.abs(yPos - 8) < 15

    if (isAligned) {
      completeStep(1)
      onComplete()
    } else if (Math.abs(xPos) < 5 && Math.abs(yPos) < 5) {
      // If it's too perfectly centered, show the modal
      setShowModal(true)
    } else {
      alert("Not quite centered. Try again!")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Alignment Test</h2>
        <p className="text-gray-600 text-sm">Drag the square to the center of the grid. Trust your designer eye.</p>
      </div>

      <div
        ref={containerRef}
        className="relative h-64 border-2 border-gray-300 rounded-md grid grid-cols-3 grid-rows-3"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
          backgroundSize: "33.4% 33.4%", // Intentionally off
          backgroundPosition: "-1px -1px", // Slightly misaligned grid
        }}
      >
        {/* Custom cursor */}
        <div
          className="fixed w-4 h-4 rounded-full bg-blue-500 opacity-50 pointer-events-none z-50"
          style={{
            left: `${cursorPos.x - 8}px`,
            top: `${cursorPos.y - 8}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          style={{ x, y }}
          className="w-12 h-12 bg-blue-600 rounded-sm cursor-move absolute left-1/2 top-1/2"
          initial={{ x: 50, y: 30 }}
          whileDrag={{ scale: 1.1 }}
          dragConstraints={containerRef}
        />
      </div>

      <div className="flex justify-center">
        <Button onClick={checkAlignment}>Check Alignment</Button>
      </div>

      {/* "Too perfect" modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <h3 className="text-lg font-bold mb-2">Too Perfect</h3>
            <p className="mb-4">Real designers embrace flaws. Try again with a bit more... character.</p>
            <Button onClick={() => setShowModal(false)}>I'll Be Less Perfect</Button>
          </div>
        </div>
      )}

      {attemptCount > 3 && (
        <p className="text-xs text-gray-500 italic text-center">Hint: The grid might not be what it seems...</p>
      )}
    </div>
  )
}
