"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "อ่านหนังสือ 10 นาทีทุกวัน",
    description: "สร้างนิสัยการอ่านที่สม่ำเสมอ",
    progress: 33,
  },
  {
    id: 2,
    title: "อ่าน 'Atomic Habits' ให้จบ",
    description: "จบหนังสือพัฒนาตนเองเล่มนี้",
    progress: 72,
  },
  {
    id: 3,
    title: "อ่าน 30 นาทีในวันหยุด",
    description: "เซสชั่นอ่านยาวในวันเสาร์-อาทิตย์",
    progress: 75,
  },
]

export function MobileGoalsContent() {
  return (
    <div className="pb-20 px-4 space-y-4">
      {/* Add Goal Button */}
      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-3">
        <Plus className="w-4 h-4 mr-2" />
        เพิ่มเป้าหมายใหม่
      </Button>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-800 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{goal.progress}% เสร็จแล้ว</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  เริ่มอ่าน
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-emerald-800 mb-2">🌟 ความก้าวหน้า ไม่ใช่ความสมบูรณ์แบบ</h3>
          <p className="text-sm text-emerald-700">ทุกครั้งที่อ่านคือการก้าวไปข้างหน้า เริ่มวันนี้และปล่อยให้โมเมนตัมสร้างตัวเองไป</p>
        </CardContent>
      </Card>
    </div>
  )
}
