"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type CaptchaContextType = {
  completedSteps: number[]
  completeStep: (step: number) => void
  isStepCompleted: (step: number) => boolean
}

const CaptchaContext = createContext<CaptchaContextType | undefined>(undefined)

export function CaptchaProvider({ children }: { children: React.ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step)
  }

  return (
    <CaptchaContext.Provider value={{ completedSteps, completeStep, isStepCompleted }}>
      {children}
    </CaptchaContext.Provider>
  )
}

export function useCaptcha() {
  const context = useContext(CaptchaContext)
  if (context === undefined) {
    throw new Error("useCaptcha must be used within a CaptchaProvider")
  }
  return context
}
