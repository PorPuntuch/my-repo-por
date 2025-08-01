"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash2, Plus, Save, X, Calendar, FileText, BookOpen } from "lucide-react"

interface BookNote {
  id: number
  date: string
  content: string
  bookId: number
  type: "reflection" | "quote" | "idea" | "thought"
}

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

interface ViewBookNotesModalProps {
  isOpen: boolean
  onClose: () => void
  book: CompletedBook | null
}

interface ExpandedBookNoteModalProps {
  isOpen: boolean
  onClose: () => void
  note: BookNote | null
  book: CompletedBook | null
  onSave: (noteId: number, content: string) => void
  onDelete: (noteId: number) => void
}

// Mock book notes data - in a real app, this would come from your data store
const mockBookNotes: BookNote[] = [
  {
    id: 1,
    date: "2024-02-15",
    content:
      "Finished the book today! The 1% better concept has completely changed my perspective on improvement. Small changes really do compound over time.",
    bookId: 1,
    type: "reflection",
  },
  {
    id: 2,
    date: "2024-02-12",
    content:
      "\"You do not rise to the level of your goals. You fall to the level of your systems.\" - This quote hit me hard. It's not about setting big goals, it's about building systems.",
    bookId: 1,
    type: "quote",
  },
  {
    id: 3,
    date: "2024-02-10",
    content:
      "The habit stacking technique is brilliant. I'm going to try: After I pour my morning coffee, I will read for 10 minutes.",
    bookId: 1,
    type: "idea",
  },
  {
    id: 4,
    date: "2024-02-08",
    content:
      "Chapter 4 on the four laws of behavior change: Make it obvious, make it attractive, make it easy, make it satisfying. Simple but powerful framework.",
    bookId: 1,
    type: "thought",
  },
  {
    id: 5,
    date: "2024-02-05",
    content:
      "The story about the British cycling team and marginal gains is fascinating. Dave Brailsford's approach of improving everything by 1% led to Olympic dominance.",
    bookId: 1,
    type: "reflection",
  },
  {
    id: 6,
    date: "2024-01-28",
    content:
      "What a beautiful ending. The concept of infinite lives and possibilities really makes you appreciate the choices we make. Life is full of 'what ifs'.",
    bookId: 2,
    type: "reflection",
  },
  {
    id: 7,
    date: "2024-01-25",
    content:
      '"Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived."',
    bookId: 2,
    type: "quote",
  },
  {
    id: 8,
    date: "2024-01-22",
    content:
      "Nora's journey through different lives is making me think about my own regrets and the paths I didn't take. Maybe every choice leads to something meaningful.",
    bookId: 2,
    type: "thought",
  },
  {
    id: 9,
    date: "2024-01-10",
    content:
      "Finished this masterpiece today. Harari's ability to connect historical dots is incredible. The way he explains how myths and stories shaped civilization is mind-blowing.",
    bookId: 3,
    type: "reflection",
  },
  {
    id: 10,
    date: "2024-01-08",
    content:
      '"How do you cause people to believe in an imagined order such as Christianity, democracy, or capitalism? First, you never admit that the order is imagined."',
    bookId: 3,
    type: "quote",
  },
  {
    id: 11,
    date: "2024-01-05",
    content:
      "The cognitive revolution chapter blew my mind. The idea that language allowed us to cooperate in large numbers by creating shared myths is fascinating.",
    bookId: 3,
    type: "idea",
  },
]

function ExpandedBookNoteModal({ isOpen, onClose, note, book, onSave, onDelete }: ExpandedBookNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")

  if (!note || !book) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quote":
        return "💬"
      case "idea":
        return "💡"
      case "reflection":
        return "🤔"
      case "thought":
        return "💭"
      default:
        return "📝"
    }
  }

  const handleEdit = () => {
    setEditContent(note.content)
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(note.id, editContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent("")
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(note.id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[95vh] flex flex-col p-0 gap-0">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="text-lg">{getTypeIcon(note.type)}</span>
                <Calendar className="w-4 h-4" />
                {formatDate(note.date)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              )}
              <Button onClick={onClose} variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {isEditing ? (
            /* Edit Mode */
            <div className="flex-1 flex flex-col p-6">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex-1 min-h-[400px] resize-none text-base leading-relaxed"
                placeholder="Write your reading note here..."
              />
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Note
                </Button>
                <div className="flex gap-3">
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Read Mode */
            <ScrollArea className="flex-1">
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{note.content}</p>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ViewBookNotesModal({ isOpen, onClose, book }: ViewBookNotesModalProps) {
  const [notes, setNotes] = useState<BookNote[]>(mockBookNotes)
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [expandedNote, setExpandedNote] = useState<BookNote | null>(null)
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false)

  if (!book) return null

  const bookNotes = notes
    .filter((note) => note.bookId === book.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quote":
        return "💬"
      case "idea":
        return "💡"
      case "reflection":
        return "🤔"
      case "thought":
        return "💭"
      default:
        return "📝"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quote":
        return "bg-blue-50 border-blue-200"
      case "idea":
        return "bg-yellow-50 border-yellow-200"
      case "reflection":
        return "bg-green-50 border-green-200"
      case "thought":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleEditNote = (note: BookNote) => {
    setEditingNoteId(note.id)
    setEditContent(note.content)
  }

  const handleSaveEdit = (noteId: number) => {
    setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, content: editContent } : note)))
    setEditingNoteId(null)
    setEditContent("")
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null)
    setEditContent("")
  }

  const handleDeleteNote = (noteId: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
  }

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      const newNote: BookNote = {
        id: Math.max(...notes.map((n) => n.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        content: newNoteContent.trim(),
        bookId: book.id,
        type: "thought",
      }
      setNotes((prev) => [newNote, ...prev])
      setNewNoteContent("")
      setIsAddingNote(false)
    }
  }

  const handleCancelAdd = () => {
    setIsAddingNote(false)
    setNewNoteContent("")
  }

  const handleExpandNote = (note: BookNote) => {
    setExpandedNote(note)
    setIsExpandedModalOpen(true)
  }

  const handleExpandedNoteSave = (noteId: number, content: string) => {
    setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, content } : note)))
    // Update expanded note state
    if (expandedNote && expandedNote.id === noteId) {
      setExpandedNote({ ...expandedNote, content })
    }
  }

  const handleExpandedNoteDelete = (noteId: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
    setIsExpandedModalOpen(false)
    setExpandedNote(null)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4CAF50]" />
              Reading Notes
            </DialogTitle>
            <div className="text-sm text-gray-600 mt-2">
              <strong>{book.title}</strong> by {book.author}
            </div>
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-0">
            {/* Add Note Button */}
            <div className="p-4 border-b">
              {!isAddingNote ? (
                <Button
                  onClick={() => setIsAddingNote(true)}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Note
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Write your reading note here..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddNote}
                      disabled={!newNoteContent.trim()}
                      className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Note
                    </Button>
                    <Button onClick={handleCancelAdd} variant="outline" className="flex-1 min-h-[44px] bg-transparent">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Notes List */}
            <ScrollArea className="flex-1 p-4">
              {bookNotes.length > 0 ? (
                <div className="space-y-4">
                  {bookNotes.map((note) => (
                    <Card key={note.id} className={`border ${getTypeColor(note.type)}`}>
                      <CardContent className="p-4">
                        {/* Date Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-base">{getTypeIcon(note.type)}</span>
                            <Calendar className="w-4 h-4" />
                            {formatDate(note.date)}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => handleEditNote(note)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteNote(note.id)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Note Content */}
                        {editingNoteId === note.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="min-h-[80px] resize-none"
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSaveEdit(note.id)}
                                size="sm"
                                className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                              >
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button onClick={handleCancelEdit} variant="outline" size="sm">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded transition-colors"
                            onClick={() => handleExpandNote(note)}
                          >
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{note.content}</p>
                            {note.content.length > 150 && (
                              <p className="text-xs text-blue-600 mt-2 font-medium">Click to read more...</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
                  <p className="text-gray-600 mb-6">
                    Add notes about your thoughts, quotes, and reflections while reading!
                  </p>
                  <Button
                    onClick={() => setIsAddingNote(true)}
                    className="bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Note
                  </Button>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expanded Book Note Modal */}
      <ExpandedBookNoteModal
        isOpen={isExpandedModalOpen}
        onClose={() => setIsExpandedModalOpen(false)}
        note={expandedNote}
        book={book}
        onSave={handleExpandedNoteSave}
        onDelete={handleExpandedNoteDelete}
      />
    </>
  )
}
