"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, BookOpen, Calendar, Star, Heart } from "lucide-react"

const completedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/placeholder.svg?height=120&width=80",
    completedDate: "2024-01-28",
    reflection:
      "This book completely changed how I think about building habits. The 1% better every day concept is so powerful!",
    rating: 5,
    pages: 320,
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "/placeholder.svg?height=120&width=80",
    completedDate: "2024-01-15",
    reflection:
      "A beautiful exploration of life's possibilities. Made me appreciate the choices I've made and the paths not taken.",
    rating: 4,
    pages: 288,
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    coverUrl: "/placeholder.svg?height=120&width=80",
    completedDate: "2024-01-02",
    reflection:
      "An incredible memoir about the power of education and self-discovery. Truly inspiring and eye-opening.",
    rating: 5,
    pages: 334,
  },
]

const bookAchievements = [
  {
    id: 1,
    title: "First Book Finished",
    description: "Completed your very first book - 'Educated'",
    icon: BookOpen,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-200",
    dateEarned: "2024-01-02",
    bookTitle: "Educated",
  },
  {
    id: 2,
    title: "Self-Help Scholar",
    description: "Finished a productivity book - 'Atomic Habits'",
    icon: Trophy,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    dateEarned: "2024-01-28",
    bookTitle: "Atomic Habits",
  },
]

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
  ))
}

export function AchievementsContent() {
  const totalPages = completedBooks.reduce((sum, book) => sum + book.pages, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Your Reading Journey 📚</h2>
        <p className="text-muted-foreground">Celebrating the books that have shaped your mind</p>
      </div>

      {/* Reading Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="text-3xl font-bold text-emerald-800">{completedBooks.length}</div>
                <div className="text-sm text-emerald-600">Books Completed</div>
              </div>
            </div>
            <p className="text-emerald-700">
              You've journeyed through <span className="font-semibold">{totalPages.toLocaleString()} pages</span> of
              wisdom, stories, and knowledge.
            </p>
            <p className="text-sm text-emerald-600 italic">
              "A reader lives a thousand lives before he dies." - George R.R. Martin
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Completed Books */}
      <div>
        <h3 className="text-xl font-bold mb-6">📖 Books You've Conquered</h3>
        <div className="space-y-6">
          {completedBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <img
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={`${book.title} cover`}
                      className="w-20 h-30 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{book.title}</h4>
                      <p className="text-gray-600">by {book.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(book.rating)}</div>
                        <span className="text-sm text-gray-500">• {book.pages} pages</span>
                      </div>
                    </div>

                    {/* Completion Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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

                    {/* Reflection */}
                    {book.reflection && (
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-500">
                        <div className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Your reflection:</p>
                            <p className="text-sm text-gray-600 italic">"{book.reflection}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Book-Related Achievements */}
      {bookAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">🏆 Reading Milestones</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {bookAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`${achievement.borderColor} border-2 hover:shadow-lg transition-shadow`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Earned on {new Date(achievement.dateEarned).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-purple-800 mb-2">Every Book is a Victory 🌟</h3>
          <p className="text-purple-700 mb-4">
            Each book you finish is a testament to your curiosity, dedication, and growth. You're not just reading
            words—you're expanding your world, one page at a time.
          </p>
          <div className="text-sm text-purple-600">Keep building your personal library of experiences and wisdom.</div>
        </CardContent>
      </Card>
    </div>
  )
}
