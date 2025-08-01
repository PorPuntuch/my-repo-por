"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash2, Plus, Save, X, Calendar, FileText } from "lucide-react"

interface Note {
  id: number
  date: string
  content: string
  goalId: number
}

interface Goal {
  id: number
  title: string
  bookTitle: string
  bookAuthor: string
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

// Mock notes data - in a real app, this would come from your data store
const mockNotes: Note[] = [
  {
    id: 1,
    date: "2024-01-29",
    content:
      "Started reading Chapter 1 today. The concept of atomic habits is fascinating - small changes compound over time. James Clear's writing style is very engaging and practical.",
    goalId: 1,
  },
  {
    id: 2,
    date: "2024-01-28",
    content:
      "Finished the introduction. Love the story about the British cycling team and how 1% improvements led to Olympic gold. This mindset shift could apply to my own habits.",
    goalId: 1,
  },
  {
    id: 3,
    date: "2024-01-27",
    content:
      "Just started this book. Excited to learn about building better habits. The four laws of behavior change mentioned in the preview look promising.",
    goalId: 1,
  },
  {
    id: 4,
    date: "2024-01-26",
    content:
      "Incredible insights about human evolution and cognitive revolution. Harari's perspective on how language shaped our species is mind-blowing.",
    goalId: 2,
  },
  {
    id: 5,
    date: "2024-01-25",
    content:
      "The agricultural revolution chapter was dense but fascinating. Never thought about how farming changed human society so fundamentally.",
    goalId: 2,
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
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteContent, setNewNoteContent] = useState("")
  const [expandedNote, setExpandedNote] = useState<Note | null>(null)
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false)

  if (!goal) return null

  const goalNotes = notes
    .filter((note) => note.goalId === goal.id)
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
      const newNote: Note = {
        id: Math.max(...notes.map((n) => n.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        content: newNoteContent.trim(),
        goalId: goal.id,
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
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Reading Notes
            </DialogTitle>
            <div className="text-sm text-gray-600 mt-2">
              <strong>{goal.bookTitle}</strong> by {goal.bookAuthor}
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
              {goalNotes.length > 0 ? (
                <div className="space-y-4">
                  {goalNotes.map((note) => (
                    <Card key={note.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        {/* Date Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  <p className="text-gray-600 mb-6">Start adding notes about your reading progress!</p>
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
