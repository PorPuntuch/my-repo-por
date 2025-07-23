"use client"

interface SandeeNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  {
    id: "home",
    label: "Home",
    icon: "💬",
  },
  {
    id: "goals",
    label: "Goals",
    icon: "🎯",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "🏆",
  },
]

export function SandeeNavigation({ activeTab, onTabChange }: SandeeNavigationProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white flex justify-around py-2 max-w-[480px] mx-auto"
      style={{ boxShadow: "0 -1px 3px 0 rgba(0, 0, 0, 0.1)" }}
    >
      {navigation.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex-1 flex flex-col items-center py-3 px-4 transition-colors ${
            activeTab === item.id ? "text-[var(--primary-green)]" : "text-[var(--netflix-light-grey)]"
          }`}
        >
          <span className="text-2xl mb-1">{item.icon}</span>
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
