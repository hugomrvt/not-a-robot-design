"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCaptcha } from "../captcha-context"

export default function InputHell({ onComplete }: { onComplete: () => void }) {
  const { completeStep } = useCaptcha()
  const [email, setEmail] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [emailError, setEmailError] = useState("")
  const [portfolioError, setPortfolioError] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)

  const validateForm = () => {
    let isValid = true

    // Validate email (must end with @dribbble.io)
    if (!email.endsWith("@dribbble.io")) {
      setEmailError("Email must end with @dribbble.io")
      isValid = false
    } else {
      setEmailError("")
    }

    // Validate portfolio URL (must contain "comic-sans")
    if (!portfolio.toLowerCase().includes("comic-sans")) {
      setPortfolioError("URL must contain 'comic-sans'")
      isValid = false
    } else {
      setPortfolioError("")
    }

    if (isValid) {
      completeStep(5)
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Designer Credentials</h2>
        <p className="text-gray-600 text-sm">Please provide your professional information.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email" className="text-sm">
              Professional Email
            </Label>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-gray-400"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    ?
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">We don't actually validate, we just judge you.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.name@dribbble.io"
            className={emailError ? "border-red-300" : ""}
          />
          {emailError && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500">
              {emailError}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio" className="text-sm">
            Portfolio URL
          </Label>
          <Input
            id="portfolio"
            type="url"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://your-comic-sans-portfolio.com"
            className={portfolioError ? "border-red-300" : ""}
          />
          {portfolioError && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500">
              {portfolioError}
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={validateForm}>Verify Credentials</Button>
      </div>

      <p className="text-xs text-gray-500 italic text-center">Hint: We only accept the most prestigious credentials.</p>
    </div>
  )
}
