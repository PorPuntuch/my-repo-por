"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SandeeHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📚</span>
          </div>
          <h1 className="text-2xl font-bold text-[#4CAF50]">Sandee</h1>
        </div>

        <Avatar className="w-9 h-9">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback className="bg-[#4CAF50] text-white font-semibold">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
