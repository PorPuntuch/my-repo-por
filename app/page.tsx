"use client"

import { useState } from "react"
import { SandeeHeader } from "@/components/sandee-header"
import { SandeeNavigation } from "@/components/sandee-navigation"
import { SandeeHomeContent } from "@/components/sandee-home-content"
import { SandeeGoalsContent } from "@/components/sandee-goals-content"
import { SandeeAchievementsContent } from "@/components/sandee-achievements-content"

export default function SandeeApp() {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <SandeeHomeContent />
      case "goals":
        return <SandeeGoalsContent />
      case "achievements":
        return <SandeeAchievementsContent />
      default:
        return <SandeeHomeContent />
    }
  }

  return (
    <div
      className="min-h-screen max-w-[480px] mx-auto bg-white relative"
      style={{ background: "var(--netflix-off-white)" }}
    >
      <SandeeHeader />
      <main className="flex-1">{renderContent()}</main>
      <SandeeNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
