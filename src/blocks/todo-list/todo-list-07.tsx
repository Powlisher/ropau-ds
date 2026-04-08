"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Pencil, Check, X, Plus } from "lucide-react"

const initialTasks = [
  { id: "1", text: "Research competitor pricing models", done: false },
  { id: "2", text: "Update the data retention policy document", done: true },
  { id: "3", text: "Configure Cloudflare WAF rules for API", done: false },
  { id: "4", text: "Fix timezone display bug in calendar widget", done: false },
  { id: "5", text: "Prepare demo script for investor meeting", done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList07() {
  const [tasks, setTasks] = React.useState(initialTasks)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editText, setEditText] = React.useState("")
  const [newText, setNewText] = React.useState("")

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const startEdit = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (!editingId || !editText.trim()) return
    setTasks((prev) => prev.map((t) => (t.id === editingId ? { ...t, text: editText.trim() } : t)))
    setEditingId(null)
  }

  const addTask = () => {
    if (!newText.trim()) return
    setTasks((prev) => [...prev, { id: Date.now().toString(), text: newText.trim(), done: false }])
    setNewText("")
  }

  return (
    <motion.div
      className="mx-auto max-w-lg py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="font-heading text-lg tracking-tight">Quick Tasks</CardTitle>
          <CardDescription>Click the pencil to edit inline</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-0.5">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                layout
                className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggle(task.id)}
                  className="size-[18px] shrink-0"
                />

                {editingId === task.id ? (
                  <div className="flex flex-1 items-center gap-1.5">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit()
                        if (e.key === "Escape") setEditingId(null)
                      }}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={saveEdit}>
                      <Check className="size-3.5 text-emerald-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => setEditingId(null)}>
                      <X className="size-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                      {task.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => startEdit(task.id, task.text)}
                    >
                      <Pencil className="size-3 text-muted-foreground" />
                    </Button>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a task..."
              className="h-9 text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              className="size-9 shrink-0"
              onClick={addTask}
              disabled={!newText.trim()}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
