"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Play, Pause, BookOpen } from "lucide-react"

interface TimerPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function TimerPopup({ isOpen, onClose }: TimerPopupProps) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const encouragingMessages = [
    "🌟 You've got this! Every minute counts toward your goal.",
    "📚 Focus on the words, let everything else fade away.",
    "💪 Building habits one page at a time. You're amazing!",
    "🎯 Stay present with your reading. You're doing great!",
    "✨ Knowledge is power, and you're gaining it right now!",
    "🔥 Your consistency is inspiring. Keep going!",
    "🚀 Every book you read makes you a better version of yourself.",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      // Timer completed - could show celebration
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  // Change message every 90 seconds
  useEffect(() => {
    if (isRunning) {
      const messageInterval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % encouragingMessages.length)
      }, 90000)

      return () => clearInterval(messageInterval)
    }
  }, [isRunning, encouragingMessages.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = ((600 - timeLeft) / 600) * 100

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Reading Time
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-5xl font-mono font-bold text-gray-800 mb-2">{formatTime(timeLeft)}</div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            <p className="text-sm text-gray-600">
              {isRunning ? "Reading in progress..." : "Ready to start your reading session"}
            </p>
          </div>

          {/* Encouraging Message */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-800 text-center font-medium">{encouragingMessages[currentMessage]}</p>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 ${
                isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Reading
                </>
              )}
            </Button>
          </div>

          {/* Quick tip */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              💡 Find a quiet spot and eliminate distractions for the best experience
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
