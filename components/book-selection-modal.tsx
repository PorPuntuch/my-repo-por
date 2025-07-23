"use client"

import { useState } from "react"
import { X, BookOpen, Clock, Target } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  currentPage: number
  totalPages: number
  coverColor: string
  goalTitle: string
}

interface BookSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectBook: (book: Book) => void
}

// Mock data - ในแอปจริงจะดึงจาก API
const availableBooks: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    currentPage: 230,
    totalPages: 320,
    coverColor: "#4F46E5",
    goalTitle: "Daily Reading Habit",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    currentPage: 45,
    totalPages: 288,
    coverColor: "#7C3AED",
    goalTitle: "Weekend Reading",
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    currentPage: 12,
    totalPages: 334,
    coverColor: "#DC2626",
    goalTitle: "Monthly Challenge",
  },
]

export function BookSelectionModal({ isOpen, onClose, onSelectBook }: BookSelectionModalProps) {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null)

  if (!isOpen) return null

  const handleSelectBook = (book: Book) => {
    onSelectBook(book)
    onClose()
  }

  const calculateProgress = (current: number, total: number) => {
    return Math.round((current / total) * 100)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Choose a Book</h2>
            <p className="text-sm text-gray-600 mt-1">Select from your active reading goals</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Book List */}
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {availableBooks.map((book) => {
            const progress = calculateProgress(book.currentPage, book.totalPages)
            const isSelected = selectedBookId === book.id

            return (
              <div
                key={book.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[var(--primary-green)] bg-[var(--primary-green-soft)]"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => setSelectedBookId(book.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Book Cover */}
                  <div
                    className="w-12 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: book.coverColor }}
                  >
                    📚
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

                    {/* Goal Badge */}
                    <div className="flex items-center gap-1 mb-3">
                      <Target className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{book.goalTitle}</span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          Page {book.currentPage} of {book.totalPages}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: "var(--primary-green)" }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 space-y-3">
          {selectedBookId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-800">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Off-Schedule Session</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                This session won't count toward your daily streak, but every page counts toward your progress!
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const selectedBook = availableBooks.find((book) => book.id === selectedBookId)
                if (selectedBook) {
                  handleSelectBook(selectedBook)
                }
              }}
              disabled={!selectedBookId}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selectedBookId ? "var(--primary-green)" : "#BDBDBD",
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Start Reading
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
