"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, Download, Copy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CompletedBook {
  id: number
  title: string
  author: string
  completedAt: Date
  rating: number
  totalPages: number
  readingTime: number
  reflection: string
}

interface ShareBookModalProps {
  isOpen: boolean
  onClose: () => void
  book: CompletedBook | null
}

export function ShareBookModal({ isOpen, onClose, book }: ShareBookModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()

  if (!book) return null

  const estimatedSessions = Math.ceil(book.readingTime / 0.5) // Assuming 30 min sessions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsDownloading(false)
    toast({
      title: "🎉 Image Downloaded!",
      description: "Your achievement card has been saved to your device.",
    })
  }

  const handleCopyLink = async () => {
    setIsCopying(true)
    const shareText = `🎉 Just finished reading "${book.title}" by ${book.author}! Completed in ${estimatedSessions} sessions with ${book.readingTime}h of focused reading. ⭐ Rated it ${book.rating}/5 stars! #ReadingGoals #BookLover`

    try {
      await navigator.clipboard.writeText(shareText)
      setIsCopying(false)
      toast({
        title: "📋 Copied to Clipboard!",
        description: "Share text has been copied. Ready to paste anywhere!",
      })
    } catch (err) {
      setIsCopying(false)
      toast({
        title: "❌ Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSocialShare = async (platform: string) => {
    setIsSharing(true)
    // Simulate sharing process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSharing(false)
    toast({
      title: `🚀 Shared to ${platform}!`,
      description: "Your reading achievement has been shared successfully.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">📤 Share Your Achievement</DialogTitle>
        </DialogHeader>

        {/* Share Card Preview */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6 text-center">
              {/* Book Cover Placeholder */}
              <div className="w-20 h-28 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              {/* Book Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">{renderStars(book.rating)}</div>

              {/* Achievement Badge */}
              <Badge className="bg-[#4CAF50] hover:bg-[#45a049] text-white mb-4">
                🎉 Completed in {estimatedSessions} sessions
              </Badge>

              {/* Congratulatory Message */}
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 italic">
                  "Another book conquered! 📚 Every page turned is a step towards wisdom and growth."
                </p>
              </div>

              {/* Completion Date */}
              <p className="text-xs text-gray-500 mb-4">Finished on {formatDate(book.completedAt)}</p>

              {/* ReadFlow Branding */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-sm font-semibold text-gray-700">ReadFlow</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Building better reading habits</p>
              </div>
            </CardContent>
          </Card>

          {/* Share Options */}
          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "📱 Download Image"}
            </Button>

            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleSocialShare("Facebook")}
                disabled={isSharing}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                📘 Facebook
              </Button>
              <Button
                onClick={() => handleSocialShare("Instagram")}
                disabled={isSharing}
                variant="outline"
                className="text-pink-600 border-pink-200 hover:bg-pink-50"
              >
                📷 Instagram
              </Button>
              <Button
                onClick={() => handleSocialShare("X")}
                disabled={isSharing}
                variant="outline"
                className="text-gray-900 border-gray-200 hover:bg-gray-50"
              >
                🐦 X
              </Button>
            </div>

            <Button
              onClick={handleCopyLink}
              disabled={isCopying}
              variant="outline"
              className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white bg-transparent"
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopying ? "Copying..." : "📋 Copy Share Text"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
