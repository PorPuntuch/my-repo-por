"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Calendar, Clock, X, Edit, Save, Plus, Trash2 } from "lucide-react"

interface Goal {
  id: number
  title: string
  bookTitle: string
  bookAuthor: string
  duration: number
  durationUnit: "minutes" | "hours"
  days: string[]
  preferredTime?: string
  status: "active" | "paused" | "completed"
  streak: number
  daysLeft: number
  weeklyProgress: { completed: number; total: number }
  todaysMission?: string
  aiCoachMessage?: string
  hasScheduleToday?: boolean
}

interface Note {
  id: number
  date: string
  content: string
  pages?: string
  timeSpent?: number
}

interface ViewNotesModalProps {
  isOpen: boolean
  onClose: () => void
  goal: Goal | null
}

interface ExpandedNoteModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
  goal: Goal | null
  onSave: (noteId: number, content: string) => void
  onDelete: (noteId: number) => void
}

const mockNotes: Note[] = [
  {
    id: 1,
    date: "2024-01-15",
    content:
      "Great insights about habit formation. The 1% better concept really resonates with me. Started implementing the habit stacking technique.",
    pages: "Pages 45-60",
    timeSpent: 30,
  },
  {
    id: 2,
    date: "2024-01-14",
    content:
      "The four laws of behavior change are fascinating: Make it obvious, attractive, easy, and satisfying. Need to apply this to my reading habit.",
    pages: "Pages 30-44",
    timeSpent: 25,
  },
  {
    id: 3,
    date: "2024-01-13",
    content:
      "Identity-based habits vs outcome-based habits - this is a game changer. Focus on becoming the type of person who reads daily.",
    pages: "Pages 15-29",
    timeSpent: 35,
  },
]

function ExpandedNoteModal({ isOpen, onClose, note, goal, onSave, onDelete }: ExpandedNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")

  if (!note || !goal) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
              <h2 className="text-xl font-bold text-gray-900 mb-1">{goal.bookTitle}</h2>
              <p className="text-sm text-gray-600 mb-2">by {goal.bookAuthor}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
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

export function ViewNotesModal({ isOpen, onClose, goal }: ViewNotesModalProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [expandedNote, setExpandedNote] = useState<Note | null>(null)
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false)

  if (!goal) return null

  const goalNotes = notes
    .filter((note) => note.id === goal.id)
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

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setNewNoteContent(note.content)
    setIsEditing(true)
  }

  const handleSaveNote = () => {
    if (editingNote && newNoteContent.trim()) {
      setNotes((prev) =>
        prev.map((note) => (note.id === editingNote.id ? { ...note, content: newNoteContent.trim() } : note)),
      )
      setIsEditing(false)
      setEditingNote(null)
      setNewNoteContent("")
    }
  }

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      const newNote: Note = {
        id: Math.max(...notes.map((n) => n.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        content: newNoteContent.trim(),
        timeSpent: 0,
      }
      setNotes((prev) => [newNote, ...prev])
      setNewNoteContent("")
      setIsAddingNote(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingNote(null)
    setNewNoteContent("")
    setIsAddingNote(false)
  }

  const handleDeleteNote = (noteId: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
  }

  const handleExpandNote = (note: Note) => {
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
          <DialogHeader className="p-5 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4CAF50]" />
                Reading Notes
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Book Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 text-base">{goal.bookTitle}</h3>
              <p className="text-sm text-gray-600">by {goal.bookAuthor}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {goal.status === "completed" ? "Completed" : "In Progress"}
                </Badge>
                {goal.status === "completed" && (
                  <span className="text-xs text-green-600 font-medium">🎉 Goal completed!</span>
                )}
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-5">
            {/* Add Note Button */}
            {!isAddingNote && !isEditing && (
              <Button
                onClick={() => setIsAddingNote(true)}
                className="w-full mb-6 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium py-3 rounded-2xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Note
              </Button>
            )}

            {/* Add New Note Form */}
            {isAddingNote && (
              <div className="mb-6 p-4 border-2 border-[#4CAF50] rounded-2xl bg-green-50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-sm font-medium text-gray-700">
                    {formatDate(new Date().toISOString().split("T")[0])}
                  </span>
                </div>
                <Textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="What did you learn or think about while reading today?"
                  className="min-h-[100px] resize-none border-0 bg-white"
                />
                <div className="flex gap-3 mt-3">
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNoteContent.trim()}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Note
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Notes List */}
            <div className="space-y-4">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div key={note.id} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{formatDate(note.date)}</span>
                      </div>
                      <Button
                        onClick={() => handleEditNote(note)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>

                    {isEditing && editingNote?.id === note.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          className="min-h-[100px] resize-none"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveNote}
                            size="sm"
                            className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{note.content}</p>

                        {(note.pages || note.timeSpent) && (
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {note.pages && (
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {note.pages}
                              </span>
                            )}
                            {note.timeSpent && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {note.timeSpent} min
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                  <p className="text-gray-500 text-sm">Start taking notes about your reading journey!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Expanded Note Modal */}
      <ExpandedNoteModal
        isOpen={isExpandedModalOpen}
        onClose={() => setIsExpandedModalOpen(false)}
        note={expandedNote}
        goal={goal}
        onSave={handleExpandedNoteSave}
        onDelete={handleExpandedNoteDelete}
      />
    </>
  )
}
