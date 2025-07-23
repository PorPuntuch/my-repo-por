"use client"

import type React from "react"

import { Home, Target, Trophy, BookOpen } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
  },
  {
    id: "goals",
    title: "Goals",
    icon: Target,
  },
  {
    id: "achievements",
    title: "Achievements",
    icon: Trophy,
  },
]

export function AppSidebar({ activeTab, onTabChange, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span className="font-bold text-lg text-gray-800">ReadFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
