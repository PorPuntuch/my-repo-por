"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { DynamicReadingButton } from "./dynamic-reading-button"

interface Book {
  id: number
  title: string
  author: string
  currentPage: number
  totalPages: number
  coverColor: string
  goalTitle: string
}

export function SandeeHomeContent() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Good morning! 🌟 I'm your daily reading coach. How are you feeling about your reading goals today?",
      sender: "ai" as const,
    },
    {
      id: "2",
      content:
        "Remember, consistency beats perfection. Even 5 minutes of reading today will keep your momentum going! 💪",
      sender: "ai" as const,
    },
    {
      id: "3",
      content: "I see you have a reading session scheduled for 8:00 PM today. I'll remind you when it's time! 📚",
      sender: "ai" as const,
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's wonderful! I'm here to support you every step of the way. Let's make today count! 🌟",
        "I love your enthusiasm! Remember, every page you read is progress toward your goals. 📖",
        "You're building an amazing habit! Keep up the great work and stay consistent. 💪",
        "Perfect mindset! Let's turn that motivation into action. Your future self will thank you! ✨",
      ]

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai" as const,
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleStartReading = (sessionType: "scheduled" | "off-schedule" | "no-goals", goal?: any, book?: Book) => {
    console.log("Starting reading session:", sessionType, goal, book)

    // Add AI response based on session type
    let aiResponse = ""

    if (sessionType === "scheduled") {
      aiResponse = `Great! Starting your scheduled session for "${goal?.bookTitle}". This will count toward your streak! 🎯`
    } else if (sessionType === "off-schedule" && book) {
      aiResponse = `Perfect choice! Let's dive into "${book.title}" by ${book.author}. You're currently on page ${book.currentPage}. Every page counts! 📚`
    } else if (sessionType === "no-goals") {
      aiResponse = "Let's set up your first reading goal! What book would you like to start with? ✨"
    }

    const aiMessage = {
      id: Date.now().toString(),
      content: aiResponse,
      sender: "ai" as const,
    }

    setMessages((prev) => [...prev, aiMessage])
  }

  return (
    <div className="pb-20 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning! 👋</h1>
        <p className="text-gray-600">Ready to continue your reading journey today?</p>
      </div>

      {/* Coach Card */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center gap-3 mb-6 text-lg font-semibold text-gray-900">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white"
            style={{ backgroundColor: "var(--primary-green)" }}
          >
            🤖
          </div>
          <span>Your Daily Coach</span>
        </div>

        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.sender === "ai"
                    ? "bg-[var(--primary-green-soft)] text-[var(--primary-green)]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {message.sender === "ai" ? "🤖" : "👤"}
              </div>
              <div className="flex-1 text-[15px] leading-relaxed text-gray-700">{message.content}</div>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Share your thoughts or ask for motivation..."
            className="w-full py-4 px-4 pr-12 border border-gray-200 rounded-xl text-[15px] bg-white focus:outline-none focus:border-[var(--primary-green)] transition-colors"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-white transition-colors"
            style={{
              backgroundColor: "var(--primary-green)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-green-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-green)")}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dynamic Reading Button */}
      <DynamicReadingButton onStartReading={handleStartReading} />
    </div>
  )
}
