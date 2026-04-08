"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { SearchIcon, XIcon } from "lucide-react"

const suggestions = ["project settings", "invite members", "API keys", "billing history"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ErrorEmptySearch() {
  const [query, setQuery] = useState("zncraft plugin")

  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex size-12 items-center justify-center rounded-full bg-muted"
            >
              <SearchIcon className="size-5 text-muted-foreground" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                No results for &ldquo;{query}&rdquo;
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or browse the suggestions below
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full gap-2">
              <div className="relative flex-1">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pr-8"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                )}
              </div>
              <Button variant="outline">Search</Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-1.5">
              <span className="text-xs text-muted-foreground mr-1">Try:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
                >
                  {s}
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery("")}
              >
                Clear search
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
