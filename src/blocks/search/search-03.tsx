"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  { id: "engineering", label: "Engineering", count: 42 },
  { id: "design", label: "Design", count: 28 },
  { id: "product", label: "Product", count: 19 },
  { id: "marketing", label: "Marketing", count: 13 },
  { id: "finance", label: "Finance", count: 7 },
]

const dateFilters = [
  { id: "today", label: "Today" },
  { id: "week", label: "Past 7 days" },
  { id: "month", label: "Past 30 days" },
  { id: "quarter", label: "Past quarter" },
]

const typeFilters = [
  { id: "document", label: "Documents" },
  { id: "spreadsheet", label: "Spreadsheets" },
  { id: "presentation", label: "Presentations" },
  { id: "image", label: "Images" },
]

const mockResults = [
  { id: 1, title: "Component Library Architecture", category: "Engineering", type: "Document", date: "Apr 2, 2026" },
  { id: 2, title: "Figma Token Migration Plan", category: "Design", type: "Document", date: "Mar 29, 2026" },
  { id: 3, title: "Sprint Velocity Report Q1", category: "Product", type: "Spreadsheet", date: "Mar 26, 2026" },
  { id: 4, title: "Email Campaign Performance", category: "Marketing", type: "Spreadsheet", date: "Mar 21, 2026" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Search03() {
  const [query, setQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(true)

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        className="mb-6 flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all files..."
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0 gap-1.5"
        >
          <SlidersHorizontalIcon className="size-3.5" />
          Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {showFilters && (
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="w-56 shrink-0 space-y-6"
          >
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</h3>
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex cursor-pointer items-center gap-2.5">
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    <span className="flex-1 text-sm">{cat.label}</span>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</h3>
              <div className="space-y-1">
                {dateFilters.map((df) => (
                  <button
                    key={df.id}
                    onClick={() => setSelectedDate(selectedDate === df.id ? null : df.id)}
                    className={`w-full rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                      selectedDate === df.id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {df.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</h3>
              <div className="space-y-2.5">
                {typeFilters.map((tf) => (
                  <label key={tf.id} className="flex cursor-pointer items-center gap-2.5">
                    <Checkbox />
                    <span className="text-sm">{tf.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.aside>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-2">
            {selectedCategories.map((id) => {
              const cat = categories.find((c) => c.id === id)
              return cat ? (
                <Badge key={id} variant="secondary" className="gap-1">
                  {cat.label}
                  <button onClick={() => toggleCategory(id)} className="ml-0.5 text-muted-foreground hover:text-foreground">&times;</button>
                </Badge>
              ) : null
            })}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            )}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {mockResults.map((result) => (
              <motion.div
                key={result.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="cursor-pointer rounded-xl bg-card p-4 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
              >
                <div className="flex items-center gap-2.5">
                  <h4 className="font-heading text-sm font-semibold tracking-tight">{result.title}</h4>
                  <Badge variant="outline">{result.type}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{result.category}</span>
                  <span className="size-0.5 rounded-full bg-muted-foreground/40" />
                  <span className="font-mono tabular-nums tracking-wide">{result.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
