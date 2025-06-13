"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import IntroScreen from "./screens/intro-screen"
import ButtonHell from "./screens/button-hell"
import ContrastTrap from "./screens/contrast-trap"
import InputHell from "./screens/input-hell"
import FinalScreen from "./screens/final-screen"
import { CaptchaProvider } from "./captcha-context"
import { useKonamiCode } from "@/hooks/use-konami-code"

export default function CaptchaChallenge() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showKonamiIndicator, setShowKonamiIndicator] = useState(false)

  const steps = [
    <IntroScreen key="intro" onComplete={() => setCurrentStep(1)} />,
    <ButtonHell key="buttons" onComplete={() => setCurrentStep(2)} />,
    <ContrastTrap key="contrast" onComplete={() => setCurrentStep(3)} />,
    <InputHell key="input" onComplete={() => setCurrentStep(4)} />,
    <FinalScreen key="final" />,
  ]

  const advanceStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowKonamiIndicator(true)
      setTimeout(() => setShowKonamiIndicator(false), 2000)
    }
  }

  const { keysPressed } = useKonamiCode(advanceStep)

  return (
    <CaptchaProvider>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="bg-white p-4 rounded-sm">
              <header className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-gray-800 rounded-md mr-2"></div>
                  <h1 className="text-lg font-bold">Not-A-Robot.design</h1>
                </div>
                <div className="text-xs text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </header>

              {/* Konami Code Indicator */}
              {showKonamiIndicator && (
                <motion.div
                  className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Konami Code Activated!
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep]}
                </motion.div>
              </AnimatePresence>

              {/* Copyright notice */}
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-xs text-gray-400">
                  Experience proposed by{" "}
                  <a
                    href="https://xn--pn8htg0i.to/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    HUGOMRVT
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaptchaProvider>
  )
}
