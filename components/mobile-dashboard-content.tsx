"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TimerPopup } from "@/components/timer-popup"
import { Timer, Bot, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MobileDashboardContent() {
  const [showTimer, setShowTimer] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "สวัสดีครับ! 🌟 ผมเป็นโค้ชการอ่านของคุณ วันนี้รู้สึกยังไงกับเป้าหมายการอ่านบ้างครับ?",
      sender: "ai" as const,
    },
    {
      id: "2",
      content: "จำไว้นะครับ ความสม่ำเสมอสำคัญกว่าความสมบูรณ์แบบ แค่อ่าน 5 นาทีวันนี้ก็ช่วยรักษาโมเมนตัมได้แล้ว! 📚",
      sender: "ai" as const,
    },
  ])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: chatInput,
      sender: "user" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "เยี่ยมมากครับ! จำไว้ว่าทุกหน้าที่อ่านคือความก้าวหน้าสู่เป้าหมาย 🎯",
        "ชอบทัศนคติแบบนี้! การกระทำเล็ก ๆ ที่สม่ำเสมอนำไปสู่ผลลัพธ์ใหญ่ 💪",
        "คุณกำลังสร้างนิสัยที่ยอดเยี่ยม! ตัวเองในอนาคตจะขอบคุณสำหรับความมุ่งมั่นนี้ ✨",
      ]

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai" as const,
      }

      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="pb-20 px-4 space-y-4">
      {/* AI Chat Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-800">โค้ชส่วนตัว</span>
          </div>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.sender === "ai" ? "bg-gray-100 text-gray-800" : "bg-emerald-500 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="แชร์ความคิดหรือขอกำลังใจ..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 text-sm"
            />
            <Button onClick={handleSendMessage} size="sm" className="bg-emerald-500 hover:bg-emerald-600 px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reading Session Button */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Timer className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">เริ่มอ่านหนังสือ</h3>
            <p className="text-sm text-gray-600">เซสชั่น 10 นาที</p>
          </div>
          <Button
            onClick={() => setShowTimer(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 text-base font-medium"
          >
            เริ่มอ่านเลย
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">7</div>
            <div className="text-xs text-gray-600">วันติดต่อกัน</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600">หนังสือจบแล้ว</div>
          </CardContent>
        </Card>
      </div>

      <TimerPopup isOpen={showTimer} onClose={() => setShowTimer(false)} />
    </div>
  )
}
