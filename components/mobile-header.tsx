"use client"

import { BookOpen, Bell } from "lucide-react"

interface MobileHeaderProps {
  title: string
  subtitle?: string
}

export function MobileHeader({ title, subtitle }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 safe-area-pt">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span className="font-bold text-lg text-gray-800">ReadFlow</span>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
