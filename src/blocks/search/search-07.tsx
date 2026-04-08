"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, MicIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Search07() {
  const [query, setQuery] = useState("")
  const [listening, setListening] = useState(false)

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div className="relative">
        <div
          className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={listening ? "Listening..." : "Search or speak your query..."}
            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            disabled={listening}
          />
          <Button
            variant={listening ? "default" : "outline"}
            size="icon"
            className="size-9 shrink-0 rounded-lg"
            onClick={() => setListening(!listening)}
          >
            <MicIcon className="size-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="flex flex-col items-center gap-6 py-8"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute size-20 rounded-full bg-primary/10"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                className="absolute size-14 rounded-full bg-primary/15"
              />
              <div className="relative flex size-12 items-center justify-center rounded-full bg-primary">
                <MicIcon className="size-5 text-primary-foreground" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-heading text-sm font-semibold tracking-tight">Listening...</p>
              <p className="mt-1 text-xs text-muted-foreground">Speak clearly to search your workspace</p>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="h-6 w-1 rounded-full bg-primary/60"
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={() => setListening(false)}>
              Cancel
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!listening && !query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 text-center"
        >
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
            <MicIcon className="size-5 text-muted-foreground" />
          </div>
          <p className="font-heading text-sm font-semibold tracking-tight">Voice search ready</p>
          <p className="mt-1.5 max-w-xs mx-auto text-xs leading-relaxed text-muted-foreground">
            Click the microphone button or type your query. Voice search supports natural language questions.
          </p>
        </motion.div>
      )}
    </div>
  )
}
