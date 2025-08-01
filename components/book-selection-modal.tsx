"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, X } from "lucide-react"

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
  onSelectBook: (book: { title: string; author: string }) => void
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    currentPage: 180,
    totalPages: 250,
    coverColor: "bg-blue-500",
    goalTitle: "Daily Reading Habit",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    currentPage: 45,
    totalPages: 288,
    coverColor: "bg-purple-500",
    goalTitle: "Evening Reading",
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    currentPage: 120,
    totalPages: 443,
    coverColor: "bg-green-500",
    goalTitle: "Weekend Learning",
  },
]

export function BookSelectionModal({ isOpen, onClose, onSelectBook }: BookSelectionModalProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book)
  }

  const handleConfirmSelection = () => {
    if (selectedBook) {
      onSelectBook({
        title: selectedBook.title,
        author: selectedBook.author,
      })
      setSelectedBook(null)
    }
  }

  const handleClose = () => {
    setSelectedBook(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[85vh] overflow-y-auto m-4">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Choose a Book</DialogTitle>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-gray-600 text-sm">Select a book from your active goals to start reading:</p>

          {mockBooks.map((book) => {
            const progress = Math.round((book.currentPage / book.totalPages) * 100)
            const isSelected = selectedBook?.id === book.id

            return (
              <Card
                key={book.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected ? "ring-2 ring-[#4CAF50] bg-green-50" : "hover:shadow-md hover:bg-gray-50"
                }`}
                onClick={() => handleBookSelect(book)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Book Cover */}
                    <div
                      className={`w-12 h-16 ${book.coverColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">{book.title}</h3>
                      <p className="text-sm text-gray-600 truncate">by {book.author}</p>
                      <p className="text-xs text-gray-500 mt-1">From: {book.goalTitle}</p>

                      {/* Progress */}
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-[#4CAF50] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent min-h-[44px]">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedBook}
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
            >
              <Clock className="w-4 h-4 mr-2" />
              Start Reading
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
