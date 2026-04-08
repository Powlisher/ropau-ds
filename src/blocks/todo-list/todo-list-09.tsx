"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const people = {
  EM: { name: "Elena M.", color: "bg-rose-100 text-rose-700" },
  TR: { name: "Thomas R.", color: "bg-sky-100 text-sky-700" },
  SD: { name: "Sophie D.", color: "bg-violet-100 text-violet-700" },
  MC: { name: "Marcus C.", color: "bg-emerald-100 text-emerald-700" },
  AP: { name: "Aisha P.", color: "bg-amber-100 text-amber-700" },
}

type PersonKey = keyof typeof people

const initialTasks = [
  { id: "1", text: "Finalize Q2 OKRs with leadership", assignee: "SD" as PersonKey, done: true },
  { id: "2", text: "Implement WebSocket heartbeat mechanism", assignee: "TR" as PersonKey, done: false },
  { id: "3", text: "Design onboarding flow for enterprise tier", assignee: "AP" as PersonKey, done: false },
  { id: "4", text: "Set up PagerDuty escalation policies", assignee: "MC" as PersonKey, done: false },
  { id: "5", text: "Review and merge i18n pull request", assignee: "EM" as PersonKey, done: true },
  { id: "6", text: "Write customer migration guide for v4", assignee: "SD" as PersonKey, done: false },
  { id: "7", text: "Profile memory usage in image processor", assignee: "TR" as PersonKey, done: false },
  { id: "8", text: "Update Figma component library tokens", assignee: "AP" as PersonKey, done: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList09() {
  const [tasks, setTasks] = React.useState(initialTasks)
  const [filterPerson, setFilterPerson] = React.useState<PersonKey | null>(null)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const filtered = filterPerson ? tasks.filter((t) => t.assignee === filterPerson) : tasks

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
          <CardTitle className="font-heading text-lg tracking-tight">Team Tasks</CardTitle>
          <CardDescription>Assigned across the squad</CardDescription>

          <div className="mt-3 flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterPerson(null)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filterPerson === null ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              }`}
            >
              All
            </motion.button>
            {(Object.keys(people) as PersonKey[]).map((key) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.9 }}
                onClick={() => setFilterPerson(filterPerson === key ? null : key)}
              >
                <Avatar className={`size-7 transition-all ${filterPerson === key ? "ring-2 ring-foreground ring-offset-2" : "opacity-70 hover:opacity-100"}`}>
                  <AvatarFallback className={`text-[9px] font-semibold ${people[key].color}`}>
                    {key}
                  </AvatarFallback>
                </Avatar>
              </motion.button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {filtered.map((task) => {
              const person = people[task.assignee]

              return (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  layout
                  className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    checked={task.done}
                    onCheckedChange={() => toggle(task.id)}
                    className="size-[18px]"
                  />

                  <span className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                    {task.text}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Avatar className="size-6">
                      <AvatarFallback className={`text-[8px] font-semibold ${person.color}`}>
                        {task.assignee}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      {person.name}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
