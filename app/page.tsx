"use client"

import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MobileDashboardContent } from "@/components/mobile-dashboard-content"
import { MobileGoalsContent } from "@/components/mobile-goals-content"
import { MobileAchievementsContent } from "@/components/mobile-achievements-content"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <MobileHeader />

      <main className="pb-20 pt-16">
        {activeTab === "home" && <MobileDashboardContent />}
        {activeTab === "goals" && <MobileGoalsContent />}
        {activeTab === "achievements" && <MobileAchievementsContent />}
      </main>

      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
