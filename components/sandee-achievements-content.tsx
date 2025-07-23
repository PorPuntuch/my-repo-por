"use client"

import { Calendar, Heart } from "lucide-react"

const completedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    pages: 320,
    completedDate: "2024-01-28",
    reflection:
      "This book completely changed how I think about building habits. The 1% better every day concept is so powerful!",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4,
    pages: 288,
    completedDate: "2024-02-15",
  },
]

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
      ⭐
    </span>
  ))
}

export function SandeeAchievementsContent() {
  const totalPages = completedBooks.reduce((sum, book) => sum + book.pages, 0)

  return (
    <div className="pb-20 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reading Journey 📚</h1>
        <p className="text-gray-600">Celebrating the books that have shaped your mind</p>
      </div>

      {/* Achievements Header */}
      <div className="bg-white rounded-2xl p-8 text-center" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-3xl">📚</span>
          <span className="text-5xl font-bold text-gray-900">{completedBooks.length}</span>
        </div>
        <div className="text-gray-600 mb-4">Books Completed</div>
        <div className="text-gray-700 mb-4">
          You've journeyed through <strong>{totalPages.toLocaleString()} pages</strong> of wisdom, stories, and
          knowledge.
        </div>
        <div className="text-sm text-gray-600 italic px-8">
          "A reader lives a thousand lives before he dies." - George R.R. Martin
        </div>
      </div>

      {/* Books List */}
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-6">
          <span>📖</span>
          <span>Books You've Conquered</span>
        </div>

        <div className="space-y-4">
          {completedBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-0.5">{renderStars(book.rating)}</div>
                <span className="text-sm text-gray-600">• {book.pages} pages</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                <span>
                  Finished on{" "}
                  {new Date(book.completedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {book.reflection && (
                <div className="pl-4 border-l-4" style={{ borderColor: "var(--primary-green)" }}>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Heart className="w-4 h-4" />
                    <span>Your reflection:</span>
                  </div>
                  <div className="text-[15px] leading-relaxed text-gray-700 italic">"{book.reflection}"</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
