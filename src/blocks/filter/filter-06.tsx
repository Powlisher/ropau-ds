"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { BookmarkIcon, PlusIcon, TrashIcon, CheckIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SavedFilter = {
  id: string
  name: string
  filters: string[]
  isDefault: boolean
}

const initialSaved: SavedFilter[] = [
  { id: "1", name: "My open tasks", filters: ["Status: Active", "Assignee: Me", "Priority: High"], isDefault: true },
  { id: "2", name: "Design review queue", filters: ["Type: Design", "Status: In Review"], isDefault: false },
  { id: "3", name: "Unassigned bugs", filters: ["Type: Bug", "Assignee: None", "Priority: Critical"], isDefault: false },
]

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

export default function Filter06() {
  const [saved, setSaved] = useState(initialSaved)
  const [active, setActive] = useState("1")
  const [showSave, setShowSave] = useState(false)
  const [newName, setNewName] = useState("")

  function saveFilter() {
    if (!newName.trim()) return
    setSaved((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newName, filters: ["Status: Active"], isDefault: false },
    ])
    setNewName("")
    setShowSave(false)
  }

  function deleteFilter(id: string) {
    setSaved((prev) => prev.filter((f) => f.id !== id))
    if (active === id) setActive(saved[0]?.id ?? "")
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="size-4 text-muted-foreground" />
            <h3 className="font-heading text-sm font-semibold tracking-tight">Saved Filters</h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowSave(!showSave)} className="gap-1.5">
            <PlusIcon className="size-3.5" />
            Save current
          </Button>
        </div>

        <AnimatePresence>
          {showSave && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex gap-2 rounded-lg bg-muted p-3">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Filter name..."
                  onKeyDown={(e) => e.key === "Enter" && saveFilter()}
                  className="flex-1 bg-background"
                />
                <Button size="sm" onClick={saveFilter} disabled={!newName.trim()}>
                  Save
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-4">
          <Select value={active} onValueChange={(val) => setActive(val ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a saved filter..." />
            </SelectTrigger>
            <SelectContent>
              {saved.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name} {f.isDefault && "(Default)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          {saved.map((f) =>
            f.id === active ? (
              <motion.div
                key={f.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{f.name}</p>
                    {f.isDefault && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckIcon className="size-2.5" />
                        Default
                      </Badge>
                    )}
                  </div>
                  {!f.isDefault && (
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => deleteFilter(f.id)}>
                      <TrashIcon className="size-3.5" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {f.filters.map((filter) => (
                    <Badge key={filter} variant="outline">{filter}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1">Apply</Button>
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
