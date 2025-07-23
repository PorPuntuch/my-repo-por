"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, Heart, Trophy, Star } from "lucide-react"

const completedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    completedDate: "2024-01-28",
    reflection: "หนังสือเล่มนี้เปลี่ยนวิธีคิดเรื่องการสร้างนิสัยของผมโดยสิ้นเชิง แนวคิด 1% ดีขึ้นทุกวันมันทรงพลังมาก!",
    rating: 5,
    pages: 320,
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    completedDate: "2024-01-15",
    reflection: "การสำรวจความเป็นไปได้ของชีวิตที่สวยงาม ทำให้ผมซาบซึ้งกับทางเลือกที่เคยทำและเส้นทางที่ไม่ได้เดิน",
    rating: 4,
    pages: 288,
  },
]

const bookAchievements = [
  {
    id: 1,
    title: "หนังสือเล่มแรกที่จบ",
    description: "อ่านหนังสือเล่มแรกจบ - 'Educated'",
    icon: BookOpen,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
    dateEarned: "2024-01-02",
  },
  {
    id: 2,
    title: "นักวิชาการพัฒนาตนเอง",
    description: "อ่านหนังสือพัฒนาตนเองจบ - 'Atomic Habits'",
    icon: Trophy,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    dateEarned: "2024-01-28",
  },
]

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
  ))
}

export function MobileAchievementsContent() {
  const totalPages = completedBooks.reduce((sum, book) => sum + book.pages, 0)

  return (
    <div className="pb-20 px-4 space-y-4">
      {/* Reading Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <div>
              <div className="text-2xl font-bold text-emerald-800">{completedBooks.length}</div>
              <div className="text-xs text-emerald-600">หนังสือที่จบแล้ว</div>
            </div>
          </div>
          <p className="text-sm text-emerald-700">
            คุณได้เดินทางผ่าน <span className="font-semibold">{totalPages.toLocaleString()} หน้า</span> แห่งปัญญา เรื่องราว
            และความรู้
          </p>
        </CardContent>
      </Card>

      {/* Completed Books */}
      <div>
        <h3 className="text-lg font-bold mb-3">📖 หนังสือที่คุณพิชิตแล้ว</h3>
        <div className="space-y-4">
          {completedBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h4 className="font-bold text-gray-800">{book.title}</h4>
                  <p className="text-sm text-gray-600">โดย {book.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(book.rating)}</div>
                    <span className="text-xs text-gray-500">• {book.pages} หน้า</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>
                    อ่านจบเมื่อ{" "}
                    {new Date(book.completedDate).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {book.reflection && (
                  <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-emerald-500">
                    <div className="flex items-start gap-2">
                      <Heart className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">ความรู้สึกของคุณ:</p>
                        <p className="text-xs text-gray-600 italic">"{book.reflection}"</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-bold mb-3">🏆 เหรียญความสำเร็จ</h3>
        <div className="space-y-3">
          {bookAchievements.map((achievement) => {
            const IconComponent = achievement.icon
            return (
              <Card key={achievement.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.bgColor}`}>
                      <IconComponent className={`w-4 h-4 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>ได้รับเมื่อ {new Date(achievement.dateEarned).toLocaleDateString("th-TH")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4 text-center">
          <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-purple-800 mb-2">ทุกเล่มคือชัยชนะ 🌟</h3>
          <p className="text-sm text-purple-700">หนังสือแต่ละเล่มที่คุณอ่านจบคือเครื่องพิสูจน์ความอยากรู้ ความมุ่งมั่น และการเติบโต</p>
        </CardContent>
      </Card>
    </div>
  )
}
