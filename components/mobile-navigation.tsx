"use client"

import { Home, Target, Trophy } from "lucide-react"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  {
    id: "dashboard",
    title: "หน้าหลัก",
    icon: Home,
  },
  {
    id: "goals",
    title: "เป้าหมาย",
    icon: Target,
  },
  {
    id: "achievements",
    title: "ความสำเร็จ",
    icon: Trophy,
  },
]

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {navigation.map((item) => {
          const isActive = activeTab === item.id
          const IconComponent = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-emerald-600 bg-emerald-50" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IconComponent className={`w-6 h-6 mb-1 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-emerald-600" : "text-gray-500"}`}>
                {item.title}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
