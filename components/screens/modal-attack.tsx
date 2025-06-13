"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useCaptcha } from "../captcha-context"

type Modal = {
  id: number
  title: string
  content: string
  type: "cookie" | "gdpr" | "figma" | "newsletter"
  closed: boolean
}

export default function ModalAttack({ onComplete }: { onComplete: () => void }) {
  const { completeStep } = useCaptcha()
  const [modals, setModals] = useState<Modal[]>([])
  const [inputClicked, setInputClicked] = useState(false)
  const [allClosed, setAllClosed] = useState(false)

  // Initialize modals when input is clicked
  const handleInputClick = () => {
    if (!inputClicked) {
      setInputClicked(true)

      // Define the modals
      const initialModals: Modal[] = [
        {
          id: 1,
          title: "Cookie Preferences",
          content:
            "We use essential, analytical, functional and advertising cookies to give you the best experience on our site.",
          type: "cookie",
          closed: false,
        },
        {
          id: 2,
          title: "GDPR Compliance",
          content: "We've updated our privacy policy for the 17th time this month. Nothing important changed.",
          type: "gdpr",
          closed: false,
        },
        {
          id: 3,
          title: "Figma Layout Tips",
          content: "Have you tried auto-layout? It will change your life! Click here to learn more about constraints.",
          type: "figma",
          closed: false,
        },
        {
          id: 4,
          title: "Join Our Newsletter",
          content: "Subscribe for daily design tips that you'll immediately archive without reading!",
          type: "newsletter",
          closed: false,
        },
      ]

      // Add modals with slight delay between each
      initialModals.forEach((modal, index) => {
        setTimeout(() => {
          setModals((prev) => [...prev, modal])
        }, index * 300)
      })
    }
  }

  // Close a modal
  const closeModal = (id: number) => {
    setModals((prev) => prev.map((modal) => (modal.id === id ? { ...modal, closed: true } : modal)))
  }

  // Check if all modals are closed
  useEffect(() => {
    if (inputClicked && modals.length > 0 && modals.every((modal) => modal.closed)) {
      setAllClosed(true)
      setTimeout(() => {
        completeStep(4)
        onComplete()
      }, 1000)
    }
  }, [modals, inputClicked, completeStep, onComplete])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Focus Challenge</h2>
        <p className="text-gray-600 text-sm">Click the input field below and stay focused on your task.</p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Click here to continue..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleInputClick}
        />

        {allClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-green-100 bg-opacity-50 flex items-center justify-center rounded-md"
          >
            <p className="text-green-800 font-medium">Well done! You closed them all.</p>
          </motion.div>
        )}
      </div>

      {/* Modal attack */}
      <AnimatePresence>
        {modals.map(
          (modal, index) =>
            !modal.closed && (
              <motion.div
                key={modal.id}
                className="fixed z-50"
                initial={{
                  opacity: 0,
                  x: [100, -50, 0][index % 3],
                  y: [-100, 50, -50][index % 3],
                }}
                animate={{
                  opacity: 1,
                  x: [20, 40, 60, 80][index % 4],
                  y: [30, 60, 90, 120][index % 4],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  top: `${20 + index * 10}%`,
                  left: `${10 + index * 15}%`,
                  maxWidth: "280px",
                }}
              >
                <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                    <h3 className="text-sm font-medium">{modal.title}</h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => closeModal(modal.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-600">{modal.content}</p>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => closeModal(modal.id)}>
                        {modal.type === "cookie"
                          ? "Accept All"
                          : modal.type === "gdpr"
                            ? "I Agree"
                            : modal.type === "figma"
                              ? "Maybe Later"
                              : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <p className="text-xs text-gray-500 italic text-center">
        {inputClicked ? "Close all popups to continue." : "Click the input field to start."}
      </p>
    </div>
  )
}
