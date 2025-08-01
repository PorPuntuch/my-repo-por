"use client"

import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MobileSettingsContent } from "./mobile-settings-content"

export function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 max-w-md mx-auto">
      <div className="flex items-center justify-between px-6 py-4 safe-area-pt">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">📚</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">ReadFlow</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Settings className="w-5 h-5 text-gray-600" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full max-h-[90vh] p-0">
              <DialogHeader className="px-4 py-3 border-b">
                <DialogTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <MobileSettingsContent />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
