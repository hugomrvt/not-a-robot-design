import CaptchaChallenge from "@/components/captcha-challenge"
import VisitCounter from "@/components/visit-counter"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <CaptchaChallenge />
      <VisitCounter />
    </main>
  )
}
