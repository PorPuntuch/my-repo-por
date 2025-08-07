"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Target, Trophy, Star, Calendar, FileText, Share2 } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ViewBookNotesModal } from "./view-book-notes-modal"
import { ShareBookModal } from "./share-book-modal"

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlockedAt: Date
  type: "streak" | "books" | "time" | "milestone"
}

interface CompletedBook {
  id: number
  title: string
  author: string
  completedAt: Date
  rating: number
  totalPages: number
  readingTime: number // in hours
  reflection: string
}

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first reading session",
    icon: "🎯",
    unlockedAt: new Date("2024-01-15"),
    type: "milestone",
  },
  {
    id: 2,
    title: "Streak Master",
    description: "Maintained a 7-day reading streak",
    icon: "🔥",
    unlockedAt: new Date("2024-01-22"),
    type: "streak",
  },
  {
    id: 3,
    title: "Book Lover",
    description: "Finished 5 books",
    icon: "📚",
    unlockedAt: new Date("2024-02-10"),
    type: "books",
  },
  {
    id: 4,
    title: "Time Master",
    description: "Read for 50 hours total",
    icon: "⏰",
    unlockedAt: new Date("2024-02-28"),
    type: "time",
  },
]

const mockCompletedBooks: CompletedBook[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    completedAt: new Date("2024-02-15"),
    rating: 5,
    totalPages: 320,
    readingTime: 8.5,
    reflection:
      "Incredible insights on building habits. The 1% better every day concept really resonated with me. I've already started implementing the habit stacking technique in my daily routine.",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    completedAt: new Date("2024-01-28"),
    rating: 4,
    totalPages: 288,
    readingTime: 6.2,
    reflection:
      "A beautiful exploration of life's possibilities. Made me think about the choices we make and the paths not taken. The concept of infinite lives was fascinating.",
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    completedAt: new Date("2024-01-10"),
    rating: 5,
    totalPages: 443,
    readingTime: 12.3,
    reflection:
      "Mind-blowing perspective on human history. Changed how I think about civilization, money, and social structures. Dense but incredibly rewarding read.",
  },
]

export function MobileAchievementsContent() {
  const totalBooks = mockCompletedBooks.length
  const totalHours = mockCompletedBooks.reduce((sum, book) => sum + book.readingTime, 0)
  const currentStreak = 5 // This would come from your state management

  const [selectedBookForNotes, setSelectedBookForNotes] = useState<CompletedBook | null>(null)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [selectedBookForShare, setSelectedBookForShare] = useState<CompletedBook | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleViewNotes = (book: CompletedBook) => {
    setSelectedBookForNotes(book)
    setIsNotesModalOpen(true)
  }

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false)
    setSelectedBookForNotes(null)
  }

  const handleShareBook = (book: CompletedBook) => {
    setSelectedBookForShare(book)
    setIsShareModalOpen(true)
  }

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false)
    setSelectedBookForShare(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="px-4 space-y-8">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Achievements 🏆</h1>
        <p className="text-gray-600 text-base">Celebrate your reading journey and milestones</p>
      </div>

      {/* Stats Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BookOpen className="w-8 h-8 text-[#4CAF50]" />
            <div className="text-4xl font-bold text-gray-900">{totalBooks}</div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Books Completed</h2>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(totalHours)}h</div>
              <div className="text-sm text-gray-600">Total Reading Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
          </div>
          <p className="text-gray-600 italic mt-5 text-sm leading-relaxed">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one." - George R.R.
            Martin
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Achievements Unlocked</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mockAchievements.map((achievement) => (
            <Card key={achievement.id} className="bg-white border-yellow-200">
              <CardContent className="p-5 text-center">
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{achievement.title}</h3>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{achievement.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {formatDate(achievement.unlockedAt)}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Books */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-5 h-5 text-[#4CAF50]" />
          <h2 className="text-lg font-semibold text-gray-900">Reading History</h2>
        </div>

        <div className="space-y-5">
          {mockCompletedBooks.map((book) => (
            <Card key={book.id} className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">{renderStars(book.rating)}</div>
                    <span className="text-sm text-gray-600">{book.totalPages} pages</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Completed {formatDate(book.completedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{book.readingTime}h reading time</span>
                  </div>
                </div>

                <div className="border-l-4 border-[#4CAF50] pl-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">My Reflection</span>
                  </div>
                  <p className="text-sm text-gray-700 italic leading-relaxed">{book.reflection}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewNotes(book)}
                    variant="outline"
                    className="flex-1 bg-transparent border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white min-h-[44px]"
                  >
                    <FileText className="w-4 h-4 mr-2" />📄 View Notes
                  </Button>
                  <Button
                    onClick={() => handleShareBook(book)}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />📤 Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ViewBookNotesModal isOpen={isNotesModalOpen} onClose={handleCloseNotesModal} book={selectedBookForNotes} />
      <ShareBookModal isOpen={isShareModalOpen} onClose={handleCloseShareModal} book={selectedBookForShare} />
    </div>
  )
}
