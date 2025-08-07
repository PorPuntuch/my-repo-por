"use client"

import { Home, Target, Trophy } from 'lucide-react'

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto safe-area-pb">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 min-w-[48px] min-h-[48px] ${
                isActive
                  ? "text-[#4CAF50] bg-green-50 transform scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
