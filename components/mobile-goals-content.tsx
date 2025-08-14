"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookOpen, FileText, MoreHorizontal, Plus, Edit, Trash2, CheckCircle, Target, Sparkles } from "lucide-react"
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
  status: "active" | "paused" | "completed"
  streak: number
  daysLeft: number
  weeklyProgress: { completed: number; total: number }
  todaysMission?: string
  aiCoachMessage?: string
  hasScheduleToday?: boolean
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
    todaysMission: "Read 15 pages",
    aiCoachMessage: "You're on fire! 🔥 Keep this momentum going to build a lasting habit.",
    hasScheduleToday: true,
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
    todaysMission: "Not scheduled for today",
    aiCoachMessage: "Great progress this week! Take a well-deserved break today. 📚",
    hasScheduleToday: false,
  },
  {
    id: 3,
    title: "Evening Stories",
    bookTitle: "The Midnight Library",
    bookAuthor: "Matt Haig",
    duration: 45,
    durationUnit: "minutes",
    days: ["monday", "wednesday", "friday", "sunday"],
    status: "completed",
    streak: 21,
    daysLeft: 0,
    weeklyProgress: { completed: 4, total: 4 },
    todaysMission: "Goal completed! 🎉",
    aiCoachMessage: "Congratulations! You've finished this book. Ready for your next adventure?",
    hasScheduleToday: false,
  },
]

export function MobileGoalsContent() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)

  const getStatusBadge = (status: Goal["status"]) => {
    const statusConfig = {
      active: { label: "In Progress", color: "bg-orange-100 text-orange-700 border-orange-200" },
      paused: { label: "Paused", color: "bg-gray-100 text-gray-600 border-gray-200" },
      completed: { label: "Completed", color: "bg-green-100 text-green-700 border-green-200" },
    }

    return statusConfig[status] || statusConfig.active
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

  const handleCompleteToday = (goal: Goal) => {
    console.log("Completing today's mission for:", goal.title)
    // Implement completion logic
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
      todaysMission: "Read 10 pages",
      aiCoachMessage: "Welcome to your reading journey! Let's start building this habit together. 🌟",
      hasScheduleToday: true,
    }

    setGoals((prev) => [newGoal, ...prev])
    setIsCreateModalOpen(false)
  }

  return (
    <div className="px-4 space-y-8 pb-32">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Reading Goals 🎯</h1>
        <p className="text-gray-600 text-base mb-6">Track your progress and build lasting habits</p>
      </div>

      {/* Create New Goal Button */}
      <div className="flex flex-col items-center mb-8">
        <Button
          onClick={handleCreateNewGoal}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[56px]"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Goal
        </Button>
        <p className="text-sm text-gray-500 mt-3 italic">Set a new reading goal to stay consistent 📚</p>
      </div>

      {/* Goals List */}
      {goals.length > 0 ? (
        <div className="space-y-6">
          {goals.map((goal) => {
            const statusBadge = getStatusBadge(goal.status)

            return (
              <Card key={goal.id} className="border-0 bg-white shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Header Section */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{goal.bookTitle}</h2>
                        <p className="text-sm font-medium text-gray-500">by {goal.bookAuthor}</p>
                      </div>
                      <Badge className={`${statusBadge.color} border font-medium px-3 py-1 rounded-full text-xs`}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Mission Section */}
                  <div className="px-6 py-4 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[#4CAF50]" />
                      <span className="text-sm font-semibold text-gray-700">Today's Mission</span>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        goal.hasScheduleToday
                          ? "text-[#4CAF50]"
                          : goal.status === "completed"
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {goal.todaysMission}
                    </p>
                  </div>

                  {/* AI Coach Message Section */}
                  <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-purple-100/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-relaxed">{goal.aiCoachMessage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="p-6 pt-5">
                    <div className="flex items-center gap-3">
                      {goal.status !== "completed" && goal.hasScheduleToday && (
                        <Button
                          onClick={() => handleCompleteToday(goal)}
                          className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 px-4 rounded-2xl min-h-[48px] shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Mark Complete
                        </Button>
                      )}

                      {goal.status !== "completed" && !goal.hasScheduleToday && (
                        <Button
                          variant="outline"
                          className="flex-1 border-2 border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-3 px-4 rounded-2xl min-h-[48px] bg-transparent"
                          disabled
                        >
                          No Mission Today
                        </Button>
                      )}

                      {goal.status === "completed" && (
                        <Button
                          variant="outline"
                          onClick={() => handleViewNotes(goal)}
                          className="flex-1 border-2 border-green-200 hover:bg-green-50 text-green-700 font-medium py-3 px-4 rounded-2xl min-h-[48px]"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          View Notes
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-2 border-gray-200 hover:bg-gray-50 bg-white min-w-[48px] min-h-[48px] rounded-2xl"
                          >
                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleEditSchedule(goal)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Change Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewNotes(goal)}>
                            <FileText className="w-4 h-4 mr-2" />
                            View Notes
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
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
        className="fixed bottom-28 right-6 w-14 h-14 rounded-full bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-lg z-40 transition-all duration-200 transform hover:scale-110 active:scale-95"
        onClick={handleCreateNewGoal}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Modals */}
      <ChangeScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false)
          setSelectedGoal(null)
        }}
        goal={selectedGoal}
        onSave={handleSaveSchedule}
      />

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGoal={handleCreateGoal}
        existingGoals={goals}
      />

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
