"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Clock,
  Calendar,
  Flame,
  Flag,
  Play,
  FileText,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { ChangeScheduleModal } from "./change-schedule-modal"
import { CreateGoalModal } from "./create-goal-modal"
import { ViewNotesModal } from "./view-notes-modal"

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

const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Daily Reading Habit",
    bookTitle: "Atomic Habits",
    bookAuthor: "James Clear",
    duration: 30,
    durationUnit: "minutes",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    preferredTime: "20:00",
    status: "active",
    streak: 5,
    daysLeft: 12,
    weeklyProgress: { completed: 4, total: 5 },
  },
  {
    id: 2,
    title: "Weekend Learning",
    bookTitle: "Sapiens",
    bookAuthor: "Yuval Noah Harari",
    duration: 1,
    durationUnit: "hours",
    days: ["saturday", "sunday"],
    status: "active",
    streak: 3,
    daysLeft: 8,
    weeklyProgress: { completed: 2, total: 2 },
  },
  {
    id: 3,
    title: "Evening Stories",
    bookTitle: "The Midnight Library",
    bookAuthor: "Matt Haig",
    duration: 45,
    durationUnit: "minutes",
    days: ["monday", "wednesday", "friday", "sunday"],
    status: "paused",
    streak: 0,
    daysLeft: 15,
    weeklyProgress: { completed: 0, total: 4 },
  },
]

export function MobileGoalsContent() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)

  const formatDays = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    }

    if (days.length === 7) return "Daily"
    if (days.length === 5 && !days.includes("saturday") && !days.includes("sunday")) return "Mon-Fri"
    if (days.length === 2 && days.includes("saturday") && days.includes("sunday")) return "Sat-Sun"

    return days.map((day) => dayMap[day]).join(", ")
  }

  const formatDuration = (duration: number, unit: "minutes" | "hours") => {
    if (unit === "hours") {
      return duration === 1 ? "1 hr/day" : `${duration} hrs/day`
    }
    return `${duration} min/day`
  }

  const handleCreateNewGoal = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditSchedule = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsScheduleModalOpen(true)
  }

  const handleSaveSchedule = (goalId: number, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)))
    setIsScheduleModalOpen(false)
    setSelectedGoal(null)
  }

  const handleDeleteGoal = (goalId: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
  }

  const handleStartReading = (goal: Goal) => {
    console.log("Starting reading session for:", goal.title)
    // Implement reading session logic
  }

  const handleViewNotes = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsNotesModalOpen(true)
  }

  const handleCreateGoal = (newGoalData: Omit<Goal, "id" | "streak" | "weeklyProgress" | "status">) => {
    const newGoal: Goal = {
      ...newGoalData,
      id: Math.max(...goals.map((g) => g.id), 0) + 1,
      status: "active",
      streak: 0,
      weeklyProgress: { completed: 0, total: newGoalData.days.length },
    }

    setGoals((prev) => [newGoal, ...prev])
    setIsCreateModalOpen(false)
  }

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="text-center pt-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Reading Goals 🎯</h1>
        <p className="text-gray-600 text-base mb-4">Track your progress and build lasting habits</p>
      </div>

      {/* Create New Goal Button - Top Placement */}
      <div className="flex flex-col items-center mb-6">
        <Button
          onClick={handleCreateNewGoal}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[56px]"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Goal
        </Button>

        {/* Microcopy */}
        <p className="text-sm text-gray-500 mt-2 italic">Set a new reading goal to stay consistent 📚</p>
      </div>

      {/* Goals List */}
      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className="border-2 border-blue-200 bg-white shadow-sm"
              style={{ borderRadius: "16px" }}
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">{goal.title}</h3>
                  <Badge
                    variant={goal.status === "active" ? "default" : "secondary"}
                    className={`${
                      goal.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {goal.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </div>

                {/* Book Info */}
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">
                    {goal.bookTitle} by {goal.bookAuthor}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700 text-sm">{formatDuration(goal.duration, goal.durationUnit)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 text-sm">{formatDays(goal.days)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 text-sm">{goal.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 text-sm">{goal.daysLeft} days left</span>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium text-sm">Weekly Progress</span>
                    <span className="text-[#4CAF50] font-semibold text-sm">
                      {goal.weeklyProgress.completed}/{goal.weeklyProgress.total} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[#4CAF50] h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${(goal.weeklyProgress.completed / goal.weeklyProgress.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleStartReading(goal)}
                      disabled={goal.status === "paused"}
                      className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                    >
                      <Play className="w-4 h-4 mr-2" />📖 Start Reading
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 hover:bg-gray-50 bg-transparent min-w-[44px] min-h-[44px]"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditSchedule(goal)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Change Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Goal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handleViewNotes(goal)}
                    className="w-full border-gray-300 hover:bg-gray-50 min-h-[44px]"
                  >
                    <FileText className="w-4 h-4 mr-2" />📝 View Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reading goals yet</h3>
          <p className="text-gray-600 mb-6">Create your first goal to start building a reading habit!</p>
          <Button
            onClick={handleCreateNewGoal}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 px-6 rounded-xl min-h-[44px]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Goal
          </Button>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-lg z-40 transition-all duration-200 transform hover:scale-110 active:scale-95"
        onClick={handleCreateNewGoal}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Change Schedule Modal */}
      <ChangeScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false)
          setSelectedGoal(null)
        }}
        goal={selectedGoal}
        onSave={handleSaveSchedule}
      />

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGoal={handleCreateGoal}
        existingGoals={goals}
      />

      {/* View Notes Modal */}
      <ViewNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => {
          setIsNotesModalOpen(false)
          setSelectedGoal(null)
        }}
        goal={selectedGoal}
      />
    </div>
  )
}
