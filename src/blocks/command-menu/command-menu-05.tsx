"use client"

import { useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  SparklesIcon,
  PenLineIcon,
  LanguagesIcon,
  ListChecksIcon,
  WandIcon,
  FileTextIcon,
  BrainCircuitIcon,
  SearchIcon,
  ArrowRightIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const suggestions = [
  { label: "Summarize this document", icon: FileTextIcon, category: "Content" },
  { label: "Translate selection to French", icon: LanguagesIcon, category: "Transform" },
  { label: "Extract action items from meeting notes", icon: ListChecksIcon, category: "Analyze" },
  { label: "Rewrite in a more professional tone", icon: PenLineIcon, category: "Content" },
  { label: "Generate test cases for this function", icon: WandIcon, category: "Code" },
  { label: "Explain this error message", icon: BrainCircuitIcon, category: "Debug" },
]

const recentPrompts = [
  "Draft a follow-up email for the Mercier proposal",
  "Compare conversion rates between Q2 and Q3",
  "Create a user story for the onboarding redesign",
]

export default function CommandMenu05() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Button
          className="gap-3 pr-2"
          onClick={() => setOpen(true)}
        >
          <SparklesIcon className="size-4" />
          <span>Ask AI anything...</span>
          <Kbd className="ml-4 bg-primary-foreground/20 text-primary-foreground">⌘J</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <div className="flex items-center gap-2 border-b px-3 py-2.5">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
              <SparklesIcon className="size-3.5 text-primary" />
            </div>
            <CommandInput
              placeholder="Ask AI to do anything..."
              className="flex-1"
              value={query}
              onValueChange={setQuery}
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {query.length > 0 ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <SparklesIcon className="size-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-sm font-medium tracking-tight">Run with AI</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Press Enter to execute &quot;{query}&quot;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-4">
                  <SparklesIcon className="size-8 text-muted-foreground/40" />
                  <p className="text-muted-foreground">Type a natural language command</p>
                </div>
              )}
            </CommandEmpty>
            {!query && (
              <CommandGroup heading="Recent prompts">
                {recentPrompts.map((prompt) => (
                  <CommandItem key={prompt} onSelect={() => setQuery(prompt)}>
                    <PenLineIcon className="size-4 text-muted-foreground/60" />
                    <span className="flex-1 truncate text-muted-foreground">{prompt}</span>
                    <ArrowRightIcon className="size-3 text-muted-foreground/30" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Suggestions">
              {suggestions.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {item.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center gap-1.5 border-t px-3 py-2 text-xs text-muted-foreground">
            <SparklesIcon className="size-3 text-primary/60" />
            <span>AI-powered — results may vary</span>
            <div className="ml-auto flex items-center gap-2">
              <span>Submit</span>
              <Kbd>↵</Kbd>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
