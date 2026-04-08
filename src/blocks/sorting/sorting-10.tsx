"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { BookmarkIcon, PlusIcon, CheckIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SortPreset = {
  id: string
  name: string
  rules: { field: string; direction: "asc" | "desc" }[]
  isDefault: boolean
}

const initialPresets: SortPreset[] = [
  { id: "1", name: "Recently updated", rules: [{ field: "Updated", direction: "desc" }], isDefault: true },
  { id: "2", name: "Priority then date", rules: [{ field: "Priority", direction: "asc" }, { field: "Date", direction: "desc" }], isDefault: false },
  { id: "3", name: "Alphabetical by author", rules: [{ field: "Author", direction: "asc" }, { field: "Title", direction: "asc" }], isDefault: false },
  { id: "4", name: "Largest first", rules: [{ field: "Size", direction: "desc" }], isDefault: false },
]

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

export default function Sorting10() {
  const [presets, setPresets] = useState(initialPresets)
  const [active, setActive] = useState("1")
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")

  function createPreset() {
    if (!newName.trim()) return
    const id = Date.now().toString()
    setPresets((prev) => [...prev, { id, name: newName, rules: [{ field: "Date", direction: "desc" }], isDefault: false }])
    setActive(id)
    setNewName("")
    setShowCreate(false)
  }

  function deletePreset(id: string) {
    setPresets((prev) => prev.filter((p) => p.id !== id))
    if (active === id) setActive(presets[0]?.id ?? "")
  }

  function setDefault(id: string) {
    setPresets((prev) => prev.map((p) => ({ ...p, isDefault: p.id === id })))
  }

  const activePreset = presets.find((p) => p.id === active)

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="size-4 text-muted-foreground" />
            <h3 className="font-heading text-sm font-semibold tracking-tight">Sort Presets</h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowCreate(!showCreate)} className="gap-1.5">
            <PlusIcon className="size-3.5" />
            New
          </Button>
        </div>

        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b"
            >
              <div className="flex gap-2 px-5 py-3">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Preset name..."
                  onKeyDown={(e) => e.key === "Enter" && createPreset()}
                  className="flex-1"
                />
                <Button size="sm" onClick={createPreset} disabled={!newName.trim()}>Save</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="divide-y">
          <AnimatePresence>
            {presets.map((preset) => (
              <motion.div
                key={preset.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <button
                  onClick={() => setActive(preset.id)}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                    active === preset.id ? "bg-muted/50" : "hover:bg-muted/30"
                  }`}
                >
                  <div className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    active === preset.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                  }`}>
                    {active === preset.id && <CheckIcon className="size-3 text-primary-foreground" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{preset.name}</p>
                      {preset.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {preset.rules.map((rule, i) => (
                        <span key={i} className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {rule.field}
                          {rule.direction === "asc" ? <ArrowUpIcon className="size-2.5" /> : <ArrowDownIcon className="size-2.5" />}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!preset.isDefault && active === preset.id && (
                    <div className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => setDefault(preset.id)} className="text-xs">
                        Set default
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => deletePreset(preset.id)}>
                        <TrashIcon className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t px-5 py-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums font-medium text-foreground">{presets.length}</span> presets saved
          </p>
          <Button size="sm" disabled={!activePreset}>
            Apply {activePreset?.name}
          </Button>
        </div>
      </div>
    </div>
  )
}
