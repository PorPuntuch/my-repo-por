"use client"

import { useState } from "react"
import { MessageSquare, Plus, BookOpen, Clock } from "lucide-react"
import { DynamicReadingButton } from "./dynamic-reading-button"
import { BookSelectionModal } from "./book-selection-modal"

export function SandeeHomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleStartReadingClick = (status) => {
    if (status === "off-schedule") {
      setIsModalOpen(true)
    } else {
      // Handle scheduled session start
      console.log("Starting scheduled session...")
      // Simulate AI response for scheduled session
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "ai",
          text: "Great! Let's start your scheduled reading session. Focus and enjoy!",
        },
      ])
    }
  }

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    setIsModalOpen(false)
    // Simulate AI response for off-schedule session with selected book
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "ai",
        text: `Excellent choice! Starting an off-schedule session with "${book.title}". Remember, every page counts!`,
      },
    ])
  }

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Good morning! 🌟 I'm your daily reading coach. How are you feeling about your reading goals today?",
    },
    {
      type: "ai",
      text: "Remember, consistency beats perfection. Even 5 minutes of reading today will keep your momentum going! 💪",
    },
    {
      type: "ai",
      text: "Your next reading session for 'Atomic Habits' is coming up at 8:00 PM. I'll remind you when it's time! 📚",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, { type: "user", text: inputMessage }])
      setInputMessage("")
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "ai",
            text: "That's wonderful! I'm here to support you every step of the way. Let's make today count! 🌟",
          },
        ])
      }, 1000)
    }
  }

  const handleSuggestedAction = (actionType) => {
    let aiResponse = ""
    switch (actionType) {
      case "reschedule":
        aiResponse = "Of course! Let's find a better time for your reading session. What time works best for you?"
        break
      case "create-goal":
        aiResponse =
          "That's a great idea! Let's set up a new reading goal. What book are you planning to read, and when would you like to read it?"
        break
      case "summarize-reading":
        aiResponse =
          "I'd love to help you reflect! What have you read today, and what were your key takeaways or thoughts?"
        break
      default:
        aiResponse = "How can I assist you further?"
    }
    setMessages((prevMessages) => [...prevMessages, { type: "ai", text: aiResponse }])
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
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-base"
            style={{ backgroundColor: "var(--primary-green)" }}
          >
            🤖
          </div>
          <span>Your Daily Coach</span>
        </div>
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                style={{
                  backgroundColor: msg.type === "ai" ? "var(--primary-green-soft)" : "var(--netflix-off-white)",
                  color: msg.type === "ai" ? "var(--primary-green)" : "#6B7280",
                }}
              >
                {msg.type === "ai" ? "🤖" : "👤"}
              </div>
              <div className="flex-1 text-sm leading-relaxed text-gray-700">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Suggested Actions */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <button
            className="flex flex-col items-center justify-center px-4 py-3 bg-gray-100 rounded-2xl text-blue-500 font-medium text-sm hover:bg-gray-200 transition-colors"
            onClick={() => handleSuggestedAction("reschedule")}
          >
            <Clock className="w-5 h-5 mb-1" />
            Reschedule
          </button>
          <button
            className="flex flex-col items-center justify-center px-4 py-3 bg-gray-100 rounded-2xl text-blue-500 font-medium text-sm hover:bg-gray-200 transition-colors"
            onClick={() => handleSuggestedAction("create-goal")}
          >
            <Plus className="w-5 h-5 mb-1" />
            Create new goal
          </button>
          <button
            className="flex flex-col items-center justify-center px-4 py-3 bg-gray-100 rounded-2xl text-blue-500 font-medium text-sm hover:bg-gray-200 transition-colors"
            onClick={() => handleSuggestedAction("summarize-reading")}
          >
            <BookOpen className="w-5 h-5 mb-1" />
            Summarize reading
          </button>
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            className="w-full py-3 px-4 pr-12 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Share your thoughts or ask for motivation..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
            onClick={handleSendMessage}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      <DynamicReadingButton onStartReading={handleStartReadingClick} />

      <BookSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectBook={handleBookSelect} />
    </div>
  )
}
