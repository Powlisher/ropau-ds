"use client"

import { useState } from "react"
import { Bug, Lightbulb, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const categories = [
  {
    value: "bug",
    label: "Bug report",
    description: "Something isn't working",
    icon: Bug,
    bg: "bg-red-50 dark:bg-red-950/20",
    ring: "ring-red-200 dark:ring-red-800/40",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    value: "feature",
    label: "Feature request",
    description: "I have an idea",
    icon: Lightbulb,
    bg: "bg-amber-50 dark:bg-amber-950/20",
    ring: "ring-amber-200 dark:ring-amber-800/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    value: "question",
    label: "Question",
    description: "I need help",
    icon: HelpCircle,
    bg: "bg-sky-50 dark:bg-sky-950/20",
    ring: "ring-sky-200 dark:ring-sky-800/40",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
]

export default function Feedback06() {
  const [category, setCategory] = useState<string | null>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Send us feedback</h3>
          <p className="mt-1 text-sm text-muted-foreground">What type of feedback do you have?</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 grid grid-cols-3 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.button
                key={cat.value}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
                onClick={() => setCategory(cat.value)}
                className={`flex flex-col items-center gap-2 rounded-xl px-3 py-4 ring-1 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  category === cat.value
                    ? `${cat.bg} ${cat.ring} ring-2`
                    : "bg-transparent ring-border/40 hover:bg-muted/40"
                }`}
              >
                <div className={`flex size-9 items-center justify-center rounded-lg ${cat.bg} ring-1 ${cat.ring}`}>
                  <Icon className={`size-4.5 ${cat.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-foreground">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{cat.description}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {category && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    category === "bug" ? "What went wrong?"
                    : category === "feature" ? "What would you like to see?"
                    : "What do you need help with?"
                  }
                  className="mt-1.5 bg-muted/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Details</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more..."
                  className="mt-1.5 min-h-[100px] bg-muted/30 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setCategory(null)}>Back</Button>
                <Button size="sm" disabled={!subject.trim()}>Send</Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
