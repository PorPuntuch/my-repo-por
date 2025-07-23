"use client"

export function SandeeHeader() {
  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-2 text-2xl font-bold" style={{ color: "var(--primary-green)" }}>
        <span>📚</span>
        <span>Sandee</span>
      </div>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer"
        style={{
          backgroundColor: "var(--primary-green-soft)",
          color: "var(--primary-green)",
        }}
      >
        JD
      </div>
    </header>
  )
}
