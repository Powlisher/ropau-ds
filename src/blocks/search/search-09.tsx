"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { SearchIcon, PlusIcon, TrashIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FieldRow = {
  id: number
  field: string
  value: string
}

const fieldOptions = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "tag", label: "Tag" },
  { value: "date_after", label: "Created after" },
  { value: "date_before", label: "Created before" },
  { value: "status", label: "Status" },
  { value: "department", label: "Department" },
]

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
}

export default function Search09() {
  const [globalQuery, setGlobalQuery] = useState("")
  const [rows, setRows] = useState<FieldRow[]>([
    { id: 1, field: "author", value: "Sophie Marchand" },
    { id: 2, field: "tag", value: "infrastructure" },
  ])

  function addRow() {
    setRows((prev) => [...prev, { id: Date.now(), field: "title", value: "" }])
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function updateRow(id: number, key: keyof FieldRow, val: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: val } : r)))
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h2 className="font-heading text-lg font-semibold tracking-tight">Advanced Search</h2>
        <p className="mt-1 text-sm text-muted-foreground">Combine multiple field-specific criteria for precise results.</p>
      </div>

      <div
        className="space-y-4 rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-3">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={globalQuery}
            onChange={(e) => setGlobalQuery(e.target.value)}
            placeholder="General keyword search..."
            className="flex-1"
          />
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Field filters</p>

          <AnimatePresence initial={false}>
            {rows.map((row) => (
              <motion.div
                key={row.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2"
              >
                <div className="w-40 shrink-0">
                  <Select value={row.field} onValueChange={(val) => updateRow(row.id, "field", val ?? "")}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  value={row.value}
                  onChange={(e) => updateRow(row.id, "value", e.target.value)}
                  placeholder={`Enter ${fieldOptions.find((f) => f.value === row.field)?.label.toLowerCase()}...`}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeRow(row.id)}
                >
                  <TrashIcon className="size-3.5" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
            <PlusIcon className="size-3.5" />
            Add filter
          </Button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={() => { setRows([]); setGlobalQuery("") }}>
            Reset
          </Button>
          <Button size="sm">
            <SearchIcon className="mr-1.5 size-3.5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
