"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Info, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Goal {
  id: number
  title: string
  bookTitle: string
  bookAuthor: string
  duration: number
  durationUnit: "minutes" | "hours"
  days: string[]
  preferredTime?: string
  status: "active" | "paused"
  streak: number
  daysLeft: number
  weeklyProgress: { completed: number; total: number }
}

interface ChangeScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  goal: Goal | null
  onSave: (goalId: number, updates: Partial<Goal>) => void
}

const DAYS_OF_WEEK = [
  { id: "monday", label: "Mon", fullName: "Monday" },
  { id: "tuesday", label: "Tue", fullName: "Tuesday" },
  { id: "wednesday", label: "Wed", fullName: "Wednesday" },
  { id: "thursday", label: "Thu", fullName: "Thursday" },
  { id: "friday", label: "Fri", fullName: "Friday" },
  { id: "saturday", label: "Sat", fullName: "Saturday" },
  { id: "sunday", label: "Sun", fullName: "Sunday" },
]

export function ChangeScheduleModal({ isOpen, onClose, goal, onSave }: ChangeScheduleModalProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [duration, setDuration] = useState<number>(30)
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">("minutes")
  const [preferredTime, setPreferredTime] = useState<string>("")
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize form with goal data
  useEffect(() => {
    if (goal && isOpen) {
      setSelectedDays(goal.days || [])
      setDuration(goal.duration || 30)
      setDurationUnit(goal.durationUnit || "minutes")
      setPreferredTime(goal.preferredTime || "")
      setHasChanges(false)
    }
  }, [goal, isOpen])

  // Check for changes
  useEffect(() => {
    if (!goal) return

    const originalDays = goal.days || []
    const daysChanged =
      selectedDays.length !== originalDays.length || selectedDays.some((day) => !originalDays.includes(day))

    const durationChanged = duration !== goal.duration
    const unitChanged = durationUnit !== goal.durationUnit
    const timeChanged = preferredTime !== (goal.preferredTime || "")

    setHasChanges(daysChanged || durationChanged || unitChanged || timeChanged)
  }, [selectedDays, duration, durationUnit, preferredTime, goal])

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) => (prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]))
  }

  const handleSave = () => {
    if (!goal || !hasChanges || selectedDays.length === 0) return

    const updates: Partial<Goal> = {
      days: selectedDays,
      duration,
      durationUnit,
      preferredTime: preferredTime || undefined,
    }

    onSave(goal.id, updates)
    onClose()
  }

  const handleCancel = () => {
    if (goal) {
      setSelectedDays(goal.days || [])
      setDuration(goal.duration || 30)
      setDurationUnit(goal.durationUnit || "minutes")
      setPreferredTime(goal.preferredTime || "")
    }
    onClose()
  }

  if (!goal) return null

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto m-4">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Change Schedule</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="space-y-7 mt-5">
            {/* Goal Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 text-sm">{goal.title}</h3>
              <p className="text-sm text-gray-600">
                {goal.bookTitle} by {goal.bookAuthor}
              </p>
            </div>

            {/* Reading Days Selector */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Which days do you want to read?</Label>
              <p className="text-sm text-gray-600">Choose the days that work best for you!</p>

              <div className="grid grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = selectedDays.includes(day.id)
                  return (
                    <Button
                      key={day.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`h-12 text-xs font-medium ${
                        isSelected ? "bg-[#4CAF50] hover:bg-[#45a049] text-white" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleDayToggle(day.id)}
                    >
                      {day.label}
                    </Button>
                  )
                })}
              </div>

              {selectedDays.length === 0 && <p className="text-sm text-red-500">Please select at least one day</p>}
            </div>

            {/* Daily Reading Duration */}
            <div className="space-y-4">
              <Label className="text-base font-medium">How long do you want to read each day?</Label>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    min="1"
                    max="480"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="text-center text-lg font-semibold h-12"
                  />
                </div>

                <Select value={durationUnit} onValueChange={(value: "minutes" | "hours") => setDurationUnit(value)}>
                  <SelectTrigger className="w-20 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">min</SelectItem>
                    <SelectItem value="hours">hrs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start Time (Optional) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-medium">Preferred reading time (optional)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We'll remind you before your preferred time</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent min-h-[44px]">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || selectedDays.length === 0}
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white disabled:opacity-50 min-h-[44px]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
