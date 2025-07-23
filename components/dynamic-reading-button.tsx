"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock, BookOpen, AlertCircle } from "lucide-react"
import { BookSelectionModal } from "./book-selection-modal"

interface ReadingGoal {
  id: number
  title: string
  bookTitle: string
  scheduledTime: string // Format: "HH:MM"
  isActive: boolean
}

interface Book {
  id: number
  title: string
  author: string
  currentPage: number
  totalPages: number
  coverColor: string
  goalTitle: string
}

interface DynamicReadingButtonProps {
  onStartReading: (sessionType: "scheduled" | "off-schedule" | "no-goals", goal?: ReadingGoal, book?: Book) => void
}

// Mock data - ในแอปจริงจะดึงจาก API หรือ state management
const mockGoals: ReadingGoal[] = [
  {
    id: 1,
    title: "Daily Reading Habit",
    bookTitle: "Atomic Habits",
    scheduledTime: "20:00", // 8:00 PM
    isActive: true,
  },
  {
    id: 2,
    title: "Morning Reading",
    bookTitle: "The Midnight Library",
    scheduledTime: "08:30", // 8:30 AM
    isActive: true,
  },
]

export function DynamicReadingButton({ onStartReading }: DynamicReadingButtonProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showBookModal, setShowBookModal] = useState(false)
  const [buttonState, setButtonState] = useState<{
    type: "scheduled" | "off-schedule" | "no-goals"
    text: string
    color: string
    bgColor: string
    hoverColor: string
    icon: React.ReactNode
    scheduledGoal?: ReadingGoal
  }>({
    type: "off-schedule",
    text: "Start Reading Now",
    color: "#FFC107",
    bgColor: "#FFC107",
    hoverColor: "#FFB300",
    icon: <BookOpen className="w-5 h-5" />,
  })

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Determine button state based on current time and goals
  useEffect(() => {
    const now = currentTime
    const currentTimeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    // Check if there are any active goals
    const activeGoals = mockGoals.filter((goal) => goal.isActive)

    if (activeGoals.length === 0) {
      // No active goals
      setButtonState({
        type: "no-goals",
        text: "Create Reading Goal",
        color: "#BDBDBD",
        bgColor: "#BDBDBD",
        hoverColor: "#A0A0A0",
        icon: <AlertCircle className="w-5 h-5" />,
      })
      return
    }

    // Check for scheduled session (within 5-minute window)
    const scheduledGoal = activeGoals.find((goal) => {
      const [goalHour, goalMinute] = goal.scheduledTime.split(":").map(Number)
      const goalTime = goalHour * 60 + goalMinute
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes()

      // Allow 5-minute window before and after scheduled time
      return Math.abs(currentTimeMinutes - goalTime) <= 5
    })

    if (scheduledGoal) {
      // On-schedule reading
      setButtonState({
        type: "scheduled",
        text: `Start Reading: ${scheduledGoal.bookTitle}`,
        color: "#4CAF50",
        bgColor: "#4CAF50",
        hoverColor: "#45A049",
        icon: <Clock className="w-5 h-5" />,
        scheduledGoal,
      })
    } else {
      // Off-schedule reading
      setButtonState({
        type: "off-schedule",
        text: "Start Reading Now",
        color: "#FFC107",
        bgColor: "#FFC107",
        hoverColor: "#FFB300",
        icon: <BookOpen className="w-5 h-5" />,
      })
    }
  }, [currentTime])

  const handleClick = () => {
    if (buttonState.type === "off-schedule") {
      // Show book selection modal for off-schedule reading
      setShowBookModal(true)
    } else {
      // Direct start for scheduled or no-goals
      onStartReading(buttonState.type, buttonState.scheduledGoal)
    }
  }

  const handleBookSelection = (book: Book) => {
    onStartReading("off-schedule", undefined, book)
    setShowBookModal(false)
  }

  return (
    <div className="space-y-3">
      {/* Status Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: buttonState.color,
              animation: buttonState.type === "scheduled" ? "pulse 2s infinite" : "none",
            }}
          />
          {buttonState.type === "scheduled" && "Scheduled Session Available"}
          {buttonState.type === "off-schedule" && "Free Reading Time"}
          {buttonState.type === "no-goals" && "No Active Goals"}
        </div>
      </div>

      {/* Dynamic Button */}
      <button
        onClick={handleClick}
        className="w-full py-4 px-6 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 transform active:scale-95"
        style={{
          backgroundColor: buttonState.bgColor,
          boxShadow: `0 4px 12px rgba(${buttonState.type === "scheduled" ? "76, 175, 80" : buttonState.type === "off-schedule" ? "255, 193, 7" : "189, 189, 189"}, 0.3)`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonState.hoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonState.bgColor)}
      >
        {buttonState.icon}
        <span className="text-base">{buttonState.text}</span>
      </button>

      {/* Additional Info */}
      {buttonState.type === "scheduled" && buttonState.scheduledGoal && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            🎯 This session will count toward your <strong>{buttonState.scheduledGoal.title}</strong> streak
          </p>
        </div>
      )}

      {buttonState.type === "off-schedule" && (
        <div className="text-center">
          <p className="text-sm text-gray-600">📖 Choose any book from your active goals to start reading</p>
        </div>
      )}

      {buttonState.type === "no-goals" && (
        <div className="text-center">
          <p className="text-sm text-gray-600">✨ Set up your first reading goal to get started</p>
        </div>
      )}

      {/* Book Selection Modal */}
      <BookSelectionModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSelectBook={handleBookSelection}
      />
    </div>
  )
}
