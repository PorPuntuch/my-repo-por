"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AIChat } from "@/components/ai-chat"
import { TimerPopup } from "@/components/timer-popup"
import { Timer } from "lucide-react"

export function DashboardContent() {
  const [showTimer, setShowTimer] = useState(false)

  // Simulate scheduled timer popup (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimer(true)
    }, 5000) // Show after 5 seconds for demo

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <AIChat />

      <div className="text-center">
        <Button onClick={() => setShowTimer(true)} size="lg" className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3">
          <Timer className="w-5 h-5 mr-2" />
          Start 10-Minute Reading Session
        </Button>
      </div>

      <TimerPopup isOpen={showTimer} onClose={() => setShowTimer(false)} />
    </div>
  )
}
