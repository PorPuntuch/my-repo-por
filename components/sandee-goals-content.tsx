"use client"

import { BookOpen } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Read 10 minutes daily",
    description: "Build a consistent daily reading habit",
    progress: 33,
  },
  {
    id: 2,
    title: "Finish 'Atomic Habits' book",
    description: "Complete reading this productivity book",
    progress: 72,
  },
  {
    id: 3,
    title: "Read 30 minutes on weekends",
    description: "Extended reading sessions on Saturday and Sunday",
    progress: 60,
  },
]

export function SandeeGoalsContent() {
  // Changed to named export
  return (
    <div className="pb-20 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Goals 🎯</h1>
        <p className="text-gray-600">Simple goals, powerful results</p>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-2xl p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{goal.description}</p>

            <div className="mb-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
            <div className="text-right text-sm text-gray-600 mb-4">{goal.progress}% complete</div>

            <button
              className="w-full py-3.5 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
              style={{ backgroundColor: "var(--primary-green)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-green-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-green)")}
            >
              <BookOpen className="w-5 h-5" />
              Start Reading
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
