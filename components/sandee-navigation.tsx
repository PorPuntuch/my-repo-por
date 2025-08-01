"use client"

import { Home, Target, Trophy } from "lucide-react"

interface SandeeNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SandeeNavigation({ activeTab, onTabChange }: SandeeNavigationProps) {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
    },
    {
      id: "goals",
      label: "Goals",
      icon: Target,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
                  isActive ? "text-[#4CAF50] bg-green-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
