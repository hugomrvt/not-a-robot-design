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
import { useTheme } from "./theme-context"
import ThemeToggle from "./theme-toggle"

export default function CaptchaChallenge() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showKonamiIndicator, setShowKonamiIndicator] = useState(false)
  const { theme, setTheme } = useTheme()

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

  const getCardClass = () => {
    switch (theme) {
      case "8bit":
        return "retro-card"
      case "3025":
        return "futuristic-card rounded-xl overflow-hidden"
      default:
        return "aero-card rounded-xl overflow-hidden"
    }
  }

  const getInnerClass = () => {
    switch (theme) {
      case "8bit":
        return "bg-gray-200 p-4 text-black"
      case "3025":
        return "bg-black/20 p-4 rounded-lg text-cyan-400"
      default:
        return "glass-effect p-4 rounded-lg text-white"
    }
  }

  const getHeaderClass = () => {
    switch (theme) {
      case "8bit":
        return "p-1 bg-gray-300"
      case "3025":
        return "p-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-cyan-400/20"
      default:
        return "p-1 bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30"
    }
  }

  return (
    <CaptchaProvider>
      <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
      <div className="w-full max-w-md">
        <div className={getCardClass()}>
          <div className={getHeaderClass()}>
            <div className={getInnerClass()}>
              <header className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`h-6 w-6 rounded-md mr-2 shadow-sm ${
                    theme === "8bit" ? "bg-black" :
                    theme === "3025" ? "bg-cyan-400" :
                    "bg-white/80"
                  }`}></div>
                  <h1 className={`text-lg font-bold drop-shadow-sm ${
                    theme === "8bit" ? "text-black" :
                    theme === "3025" ? "text-cyan-400" :
                    "text-white"
                  }`}>Not-A-Robot.design</h1>
                </div>
                <div className={`text-xs ${
                  theme === "8bit" ? "text-gray-600" :
                  theme === "3025" ? "text-cyan-400/80" :
                  "text-white/80"
                }`}>
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
              <div className={`mt-6 pt-4 border-t text-center ${
                theme === "8bit" ? "border-gray-400" :
                theme === "3025" ? "border-cyan-400/20" :
                "border-white/20"
              }`}>
                <p className={`text-xs ${
                  theme === "8bit" ? "text-gray-600" :
                  theme === "3025" ? "text-cyan-400/70" :
                  "text-white/70"
                }`}>
                  Experience proposed by{" "}
                  <a
                    href="https://xn--pn8htg0i.to/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline transition-colors ${
                      theme === "8bit" ? "text-black hover:text-gray-700" :
                      theme === "3025" ? "text-cyan-400 hover:text-cyan-300" :
                      "text-white hover:text-white/80"
                    }`}
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
