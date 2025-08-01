"use client"

import { useState } from "react"
import { Plus, BookOpen, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookSelectionModal } from "./book-selection-modal"

interface Message {
  id: number
  type: "ai" | "user"
  text: string
  timestamp: Date
}

export function SandeeHomeContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      text: "Good morning! 🌟 Remember, consistency beats perfection. Even 5 minutes of reading today will keep your momentum going!",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "ai",
      text: "You have a reading session for 'Atomic Habits' scheduled at 8:00 PM today. I'll remind you when it's time! 📚",
      timestamp: new Date(),
    },
    {
      id: 3,
      type: "ai",
      text: "Your 5-day reading streak is impressive! Let's make it 6 days today. What book are you excited to read?",
      timestamp: new Date(),
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        text: inputMessage,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setInputMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: "ai",
          text: "That's wonderful! I'm here to support you every step of the way. Let's make today count! 🌟",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleActionButton = (action: "reschedule" | "create-goal" | "summarize") => {
    let aiResponse = ""
    switch (action) {
      case "reschedule":
        aiResponse =
          "Of course! Let's find a better time for your reading session. What time works best for you today? ⏰"
        break
      case "create-goal":
        aiResponse =
          "Excellent idea! Let's set up a new reading goal. What book would you like to read, and how many minutes per day? 🎯"
        break
      case "summarize":
        aiResponse = "I'd love to help you reflect! What have you read recently, and what were your key takeaways? 📝"
        break
    }

    const newMessage: Message = {
      id: messages.length + 1,
      type: "ai",
      text: aiResponse,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleStartReading = () => {
    setIsBookModalOpen(true)
  }

  const handleBookSelect = (book: { title: string; author: string }) => {
    setIsBookModalOpen(false)
    const aiResponse: Message = {
      id: messages.length + 1,
      type: "ai",
      text: `Perfect choice! Starting a free reading session with "${book.title}". Remember, every page counts toward your progress! 🚀`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, aiResponse])
  }

  return (
    <div className="pb-20 px-6 space-y-6 max-w-2xl mx-auto">
      {/* Greeting Section */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning! 👋</h1>
        <p className="text-gray-600 text-lg">Ready to continue your reading journey today?</p>
      </div>

      {/* Daily Coach Card */}
      <Card className="bg-white shadow-sm border-0" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <CardContent className="p-6">
          {/* Coach Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Your Daily Coach</h2>
          </div>

          {/* Coach Messages */}
          <div className="space-y-4 mb-6">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.type === "ai" ? "bg-green-100 text-[#4CAF50]" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {message.type === "ai" ? "🤖" : "👤"}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
              onClick={() => handleActionButton("reschedule")}
            >
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Reschedule</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
              onClick={() => handleActionButton("create-goal")}
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs font-medium">Create New Goal</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
              onClick={() => handleActionButton("summarize")}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-medium">Summarize Reading</span>
            </Button>
          </div>

          {/* Input Field */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Share your thoughts or ask for motivation..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12 py-3 text-base border-gray-200 focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-[#4CAF50] hover:bg-[#45a049]"
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Free Reading Section */}
      <div className="space-y-4">
        {/* Section Tag */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-500 font-medium">Free Reading Time</span>
        </div>

        {/* Call-to-Action Button */}
        <Button
          onClick={handleStartReading}
          className="w-full py-6 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)" }}
        >
          <BookOpen className="w-6 h-6 mr-3" />📖 Start Reading Now
        </Button>

        {/* Instruction Note */}
        <p className="text-center text-gray-500 text-sm">Choose any book from your active goals to start reading</p>
      </div>

      {/* Book Selection Modal */}
      <BookSelectionModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSelectBook={handleBookSelect}
      />
    </div>
  )
}
