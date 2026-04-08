"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, PaperclipIcon, CalendarIcon, UserIcon, XIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const activeFilters = [
  { label: "From: Elise Morand", icon: UserIcon },
  { label: "Has attachment", icon: PaperclipIcon },
]

const results = [
  { sender: "Elise Morand", subject: "Q2 Campaign Brief - Review Needed", time: "Today", hasAttachment: true, match: "campaign brief" },
  { sender: "Elise Morand", subject: "Re: Brand Guidelines Update", time: "Mar 22", hasAttachment: true, match: "brand guidelines" },
  { sender: "Elise Morand", subject: "Asset delivery schedule - Final", time: "Mar 15", hasAttachment: true, match: "asset delivery" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Inbox07() {
  const [query, setQuery] = useState("campaign")

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">Search Mail</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search emails..."
              className="pl-10 h-10"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter.label} variant="secondary" className="gap-1.5 pr-1.5">
                <filter.icon className="size-3" />
                <span className="text-xs">{filter.label}</span>
                <button className="ml-0.5 rounded-full p-0.5 hover:bg-muted">
                  <XIcon className="size-2.5" />
                </button>
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="h-6 gap-1 px-2 text-[10px]">
              <CalendarIcon className="size-3" />
              Date range
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {results.length} results
            </div>
            <div className="space-y-1">
              {results.map((result) => (
                <motion.div
                  key={result.subject}
                  whileHover={{ backgroundColor: "oklch(0.97 0 0)" }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{result.sender}</span>
                      {result.hasAttachment && <PaperclipIcon className="size-3 shrink-0 text-muted-foreground/50" />}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">{result.subject}</div>
                  </div>
                  <span className="text-[10px] tabular-nums text-muted-foreground shrink-0 ml-3">{result.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
