"use client"

import { BookOpen, CalendarDays, Star } from "lucide-react"

const completedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    rating: 5,
    completionDate: "January 28, 2024",
    reflection:
      "This book completely changed how I think about building habits. The 1% better every day concept is so powerful!",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    pages: 288,
    rating: 4,
    completionDate: "February 15, 2024",
    reflection: null, // No reflection for this example
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    pages: 464,
    rating: 5,
    completionDate: "March 20, 2024",
    reflection:
      "A truly eye-opening book that reshaped my understanding of human history and our place in the world. Highly recommend!",
  },
]

export function SandeeAchievementsContent() {
  // Changed to named export
  const totalBooksCompleted = completedBooks.length
  const totalPagesRead = completedBooks.reduce((sum, book) => sum + book.pages, 0)

  return (
    <div className="pb-20 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reading Journey 📚</h1>
        <p className="text-gray-600">Celebrating the books that have shaped your mind</p>
      </div>

      <div className="bg-white rounded-2xl p-6 text-center" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-5xl">📚</span>
          <span className="text-6xl font-bold text-gray-900">{totalBooksCompleted}</span>
        </div>
        <div className="text-lg text-gray-600 mb-4">Books Completed</div>
        <div className="text-base text-gray-700 mb-4">
          You've journeyed through <strong>{totalPagesRead} pages</strong> of wisdom, stories, and knowledge.
        </div>
        <div className="italic text-gray-600 text-sm px-4">
          "A reader lives a thousand lives before he dies." - George R.R. Martin
        </div>
      </div>

      <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
        <BookOpen className="w-6 h-6" />
        <span>Books You've Conquered</span>
      </div>

      <div className="space-y-4">
        {completedBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-3">by {book.author}</p>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex gap-0.5 text-yellow-400">
                {Array.from({ length: book.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                {Array.from({ length: 5 - book.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-600">• {book.pages} pages</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <CalendarDays className="w-4 h-4" />
              <span>Finished on {book.completionDate}</span>
            </div>

            {book.reflection && (
              <div className="pl-4 border-l-2 border-green-500">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <span className="text-base">❤️</span>
                  <span>Your reflection:</span>
                </div>
                <p className="text-base leading-relaxed text-gray-700 italic">"{book.reflection}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
