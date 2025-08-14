"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookOpen, Clock, CalendarIcon, ChevronLeft, ChevronRight, AlertCircle, Check, Search } from "lucide-react"
import { format } from "date-fns"

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

interface CreateGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateGoal: (goalData: Omit<Goal, "id" | "streak" | "weeklyProgress" | "status">) => void
  existingGoals: Goal[]
}

interface BookSuggestion {
  title: string
  author: string
  category: string
}

const popularBooks: BookSuggestion[] = [
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Self-Help" },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "History" },
  { title: "The Midnight Library", author: "Matt Haig", category: "Fiction" },
  { title: "Educated", author: "Tara Westover", category: "Memoir" },
  { title: "Becoming", author: "Michelle Obama", category: "Biography" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Spirituality" },
  { title: "Dune", author: "Frank Herbert", category: "Science Fiction" },
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", category: "Business" },
]

const durationOptions = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
]

const goalDurationOptions = [
  { value: 7, label: "1 week" },
  { value: 14, label: "2 weeks" },
  { value: 21, label: "3 weeks" },
  { value: 30, label: "1 month" },
  { value: 60, label: "2 months" },
  { value: 90, label: "3 months" },
]

const dayOptions = [
  { key: "monday", label: "Mon" },
  { key: "tuesday", label: "Tue" },
  { key: "wednesday", label: "Wed" },
  { key: "thursday", label: "Thu" },
  { key: "friday", label: "Fri" },
  { key: "saturday", label: "Sat" },
  { key: "sunday", label: "Sun" },
]

export function CreateGoalModal({ isOpen, onClose, onCreateGoal, existingGoals }: CreateGoalModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Step 1: Book Selection
  const [bookTitle, setBookTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("")
  const [bookSearch, setBookSearch] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Step 2: Reading Schedule
  const [duration, setDuration] = useState<number>(30)
  const [customDuration, setCustomDuration] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [preferredTime, setPreferredTime] = useState("")

  // Step 3: Goal Duration & Details
  const [goalDuration, setGoalDuration] = useState<number>(30)
  const [customGoalDuration, setCustomGoalDuration] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [goalNote, setGoalNote] = useState("")
  const [goalTitle, setGoalTitle] = useState("")

  const filteredBooks = popularBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(bookSearch.toLowerCase()),
  )

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (step === 1) {
      if (!bookTitle.trim()) newErrors.bookTitle = "Book title is required"
      if (!bookAuthor.trim()) newErrors.bookAuthor = "Author name is required"
    }

    if (step === 2) {
      if (!duration && !customDuration) newErrors.duration = "Reading duration is required"
      if (selectedDays.length === 0) newErrors.days = "Please select at least one day"

      // Check for schedule conflicts
      if (preferredTime && selectedDays.length > 0) {
        const hasConflict = existingGoals.some(
          (goal) => goal.preferredTime === preferredTime && goal.days.some((day) => selectedDays.includes(day)),
        )
        if (hasConflict) {
          newErrors.schedule = "You already have a goal at this time on selected days"
        }
      }
    }

    if (step === 3) {
      if (!goalDuration && !customGoalDuration) newErrors.goalDuration = "Goal duration is required"
      if (!goalTitle.trim()) newErrors.goalTitle = "Goal title is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleBookSelect = (book: BookSuggestion) => {
    setBookTitle(book.title)
    setBookAuthor(book.author)
    setBookSearch("")
    setShowSuggestions(false)
    setErrors({})
  }

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
    setErrors((prev) => ({ ...prev, days: "", schedule: "" }))
  }

  const handleCreateGoal = () => {
    if (!validateStep(3)) return

    const finalDuration = customDuration ? Number.parseInt(customDuration) : duration
    const finalGoalDuration = customGoalDuration ? Number.parseInt(customGoalDuration) : goalDuration

    const newGoalData = {
      title: goalTitle,
      bookTitle,
      bookAuthor,
      duration: finalDuration,
      durationUnit: "minutes" as const,
      days: selectedDays,
      preferredTime: preferredTime || undefined,
      daysLeft: finalGoalDuration,
    }

    onCreateGoal(newGoalData)
    handleClose()
  }

  const handleClose = () => {
    // Reset all form data
    setCurrentStep(1)
    setBookTitle("")
    setBookAuthor("")
    setBookSearch("")
    setShowSuggestions(false)
    setDuration(30)
    setCustomDuration("")
    setSelectedDays([])
    setPreferredTime("")
    setGoalDuration(30)
    setCustomGoalDuration("")
    setStartDate(new Date())
    setGoalNote("")
    setGoalTitle("")
    setErrors({})
    onClose()
  }

  const getEndDate = () => {
    const days = customGoalDuration ? Number.parseInt(customGoalDuration) : goalDuration
    const end = new Date(startDate)
    end.setDate(end.getDate() + days)
    return end
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-5 pb-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4CAF50]" />
            Create New Goal
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full ${step <= currentStep ? "bg-[#4CAF50]" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Step {currentStep} of 3:{" "}
            {currentStep === 1 ? "Book Selection" : currentStep === 2 ? "Reading Schedule" : "Goal Details"}
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 p-5">
          {/* Step 1: Book Selection */}
          {currentStep === 1 && (
            <div className="space-y-7">
              <div>
                <Label htmlFor="book-search" className="text-base font-semibold text-gray-900">
                  📚 What book do you want to read?
                </Label>
                <div className="relative mt-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="book-search"
                      placeholder="Search for a book or enter manually..."
                      value={bookSearch}
                      onChange={(e) => {
                        setBookSearch(e.target.value)
                        setShowSuggestions(e.target.value.length > 0)
                      }}
                      onFocus={() => setShowSuggestions(bookSearch.length > 0)}
                      className="pl-10 min-h-[44px]"
                    />
                  </div>

                  {showSuggestions && filteredBooks.length > 0 && (
                    <Card className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto">
                      <CardContent className="p-2">
                        {filteredBooks.map((book, index) => (
                          <button
                            key={index}
                            onClick={() => handleBookSelect(book)}
                            className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="font-medium text-gray-900">{book.title}</div>
                            <div className="text-sm text-gray-600">by {book.author}</div>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {book.category}
                            </Badge>
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="book-title" className="text-sm font-medium text-gray-700">
                    Book Title *
                  </Label>
                  <Input
                    id="book-title"
                    value={bookTitle}
                    onChange={(e) => {
                      setBookTitle(e.target.value)
                      setErrors((prev) => ({ ...prev, bookTitle: "" }))
                    }}
                    placeholder="Enter book title"
                    className={`mt-1 min-h-[44px] ${errors.bookTitle ? "border-red-500" : ""}`}
                  />
                  {errors.bookTitle && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.bookTitle}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="book-author" className="text-sm font-medium text-gray-700">
                    Author *
                  </Label>
                  <Input
                    id="book-author"
                    value={bookAuthor}
                    onChange={(e) => {
                      setBookAuthor(e.target.value)
                      setErrors((prev) => ({ ...prev, bookAuthor: "" }))
                    }}
                    placeholder="Enter author name"
                    className={`mt-1 min-h-[44px] ${errors.bookAuthor ? "border-red-500" : ""}`}
                  />
                  {errors.bookAuthor && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.bookAuthor}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Reading Schedule */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-gray-900">
                  ⏰ How long do you want to read each day?
                </Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {durationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDuration(option.value)
                        setCustomDuration("")
                        setErrors((prev) => ({ ...prev, duration: "" }))
                      }}
                      className={`p-3 rounded-lg border-2 transition-all min-h-[44px] ${
                        duration === option.value && !customDuration
                          ? "border-[#4CAF50] bg-green-50 text-[#4CAF50]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <Label htmlFor="custom-duration" className="text-sm font-medium text-gray-700">
                    Or enter custom duration (minutes)
                  </Label>
                  <Input
                    id="custom-duration"
                    type="number"
                    value={customDuration}
                    onChange={(e) => {
                      setCustomDuration(e.target.value)
                      setDuration(0)
                      setErrors((prev) => ({ ...prev, duration: "" }))
                    }}
                    placeholder="e.g., 25"
                    className="mt-1 min-h-[44px]"
                  />
                </div>

                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.duration}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold text-gray-900">📅 Which days do you want to read?</Label>
                <div className="grid grid-cols-7 gap-3 mt-3">
                  {dayOptions.map((day) => (
                    <button
                      key={day.key}
                      onClick={() => handleDayToggle(day.key)}
                      className={`p-3 rounded-lg border-2 transition-all min-h-[44px] ${
                        selectedDays.includes(day.key)
                          ? "border-[#4CAF50] bg-green-50 text-[#4CAF50]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium">{day.label}</div>
                    </button>
                  ))}
                </div>

                {errors.days && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.days}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="preferred-time" className="text-sm font-medium text-gray-700">
                  Preferred Reading Time (Optional)
                </Label>
                <Input
                  id="preferred-time"
                  type="time"
                  value={preferredTime}
                  onChange={(e) => {
                    setPreferredTime(e.target.value)
                    setErrors((prev) => ({ ...prev, schedule: "" }))
                  }}
                  className="mt-1 min-h-[44px]"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send you reminders at this time</p>

                {errors.schedule && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.schedule}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Goal Duration & Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="goal-title" className="text-base font-semibold text-gray-900">
                  🎯 Give your goal a name
                </Label>
                <Input
                  id="goal-title"
                  value={goalTitle}
                  onChange={(e) => {
                    setGoalTitle(e.target.value)
                    setErrors((prev) => ({ ...prev, goalTitle: "" }))
                  }}
                  placeholder="e.g., Daily Reading Habit"
                  className={`mt-2 min-h-[44px] ${errors.goalTitle ? "border-red-500" : ""}`}
                />
                {errors.goalTitle && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.goalTitle}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-base font-semibold text-gray-900">
                  📆 How long do you want this goal to last?
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {goalDurationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setGoalDuration(option.value)
                        setCustomGoalDuration("")
                        setErrors((prev) => ({ ...prev, goalDuration: "" }))
                      }}
                      className={`p-3 rounded-lg border-2 transition-all min-h-[44px] ${
                        goalDuration === option.value && !customGoalDuration
                          ? "border-[#4CAF50] bg-green-50 text-[#4CAF50]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CalendarIcon className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <Label htmlFor="custom-goal-duration" className="text-sm font-medium text-gray-700">
                    Or enter custom duration (days)
                  </Label>
                  <Input
                    id="custom-goal-duration"
                    type="number"
                    value={customGoalDuration}
                    onChange={(e) => {
                      setCustomGoalDuration(e.target.value)
                      setGoalDuration(0)
                      setErrors((prev) => ({ ...prev, goalDuration: "" }))
                    }}
                    placeholder="e.g., 45"
                    className="mt-1 min-h-[44px]"
                  />
                </div>

                {errors.goalDuration && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.goalDuration}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1 min-h-[44px] bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500 mt-1">Goal will end on {format(getEndDate(), "PPP")}</p>
              </div>

              <div>
                <Label htmlFor="goal-note" className="text-sm font-medium text-gray-700">
                  Optional Note
                </Label>
                <Textarea
                  id="goal-note"
                  value={goalNote}
                  onChange={(e) => setGoalNote(e.target.value)}
                  placeholder="Add any notes about this goal..."
                  className="mt-1 min-h-[80px] resize-none"
                />
              </div>

              {/* Goal Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Goal Summary
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>
                      <strong>Book:</strong> {bookTitle} by {bookAuthor}
                    </p>
                    <p>
                      <strong>Duration:</strong> {customDuration || duration} minutes/day
                    </p>
                    <p>
                      <strong>Days:</strong>{" "}
                      {selectedDays.map((day) => dayOptions.find((d) => d.key === day)?.label).join(", ")}
                    </p>
                    {preferredTime && (
                      <p>
                        <strong>Time:</strong> {preferredTime}
                      </p>
                    )}
                    <p>
                      <strong>Goal Period:</strong> {customGoalDuration || goalDuration} days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>

        {/* Footer Buttons */}
        <div className="p-5 border-t bg-white">
          <div className="flex gap-4">
            {currentStep > 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1 min-h-[44px] bg-transparent">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            {currentStep < 3 ? (
              <Button onClick={handleNext} className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateGoal}
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white min-h-[44px]"
              >
                <Check className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
