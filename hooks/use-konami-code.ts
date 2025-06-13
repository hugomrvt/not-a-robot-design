"use client"

import { useState, useEffect, useCallback } from "react"

// Konami Code key sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function useKonamiCode(onComplete: () => void) {
  const [keys, setKeys] = useState<string[]>([])

  const keyHandler = useCallback(
    (event: KeyboardEvent) => {
      // Get the key value (lowercase for consistency)
      const key = event.key === "b" || event.key === "a" ? event.key : event.key

      // Add the key to the sequence
      const updatedKeys = [...keys, key]

      // Only keep the most recent keys that could match the Konami code length
      const recentKeys = updatedKeys.slice(-KONAMI_CODE.length)
      setKeys(recentKeys)

      // Check if the sequence matches the Konami code
      const isKonamiCode = recentKeys.length === KONAMI_CODE.length && recentKeys.every((k, i) => k === KONAMI_CODE[i])

      if (isKonamiCode) {
        // Reset keys
        setKeys([])
        // Call the callback
        onComplete()
      }
    },
    [keys, onComplete],
  )

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
  }, [keyHandler])

  return { keysPressed: keys }
}
