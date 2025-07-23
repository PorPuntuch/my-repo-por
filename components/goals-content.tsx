"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Read 10 minutes daily",
    description: "Build a consistent daily reading habit",
    progress: 33, // 7 out of 21 days
    status: "active",
  },
  {
    id: 2,
    title: "Finish 'Atomic Habits' book",
    description: "Complete reading this productivity book",
    progress: 72, // 297 out of 320 pages
    status: "active",
  },
  {
    id: 3,
    title: "Read 30 minutes on weekends",
    description: "Extended reading sessions on Saturday and Sunday",
    progress: 75, // 6 out of 8 weekends
    status: "active",
  },
]

export function GoalsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Goals 🎯</h2>
          <p className="text-muted-foreground">Simple goals, powerful results</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{goal.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Single Progress Bar */}
              <div className="space-y-2">
                <Progress value={goal.progress} className="h-3" />
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{goal.progress}% complete</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Reading
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simple Motivational Message */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">🌟 Progress, not perfection</h3>
          <p className="text-emerald-700 text-sm">
            Every reading session moves you forward. Start today, and let momentum build naturally.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
