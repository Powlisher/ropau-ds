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
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  ClockIcon,
  SparklesIcon,
  FileTextIcon,
  UsersIcon,
  BarChart3Icon,
  MailIcon,
  CalendarIcon,
  FolderIcon,
  ZapIcon,
  SearchIcon,
  ArrowRightIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const recentItems = [
  { label: "Q3 Revenue Analysis", icon: BarChart3Icon, meta: "Opened 12 min ago" },
  { label: "Team Standup Notes", icon: FileTextIcon, meta: "Edited 2h ago" },
  { label: "Client Onboarding Flow", icon: UsersIcon, meta: "Viewed yesterday" },
]

const suggestedItems = [
  { label: "Review pending invoices", icon: MailIcon, meta: "3 awaiting approval", badge: "3" },
  { label: "Upcoming sprint planning", icon: CalendarIcon, meta: "Tomorrow, 10:30 AM" },
  { label: "Unread design feedback", icon: FolderIcon, meta: "From Elise Marchand" },
  { label: "Performance dashboard", icon: ZapIcon, meta: "Updated 5 min ago" },
]

export default function CommandMenu02() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Button
          variant="outline"
          className="gap-3 pr-2 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="size-4" />
          <span>Quick access...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Search or jump to..." />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">Nothing matches your search.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Recent">
              {recentItems.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <ClockIcon className="size-4 text-muted-foreground/60" />
                  <div className="flex flex-1 flex-col">
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.meta}</span>
                  </div>
                  <ArrowRightIcon className="size-3.5 text-muted-foreground/40" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Suggested for you">
              {suggestedItems.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-semibold text-primary">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{item.meta}</span>
                  </div>
                  <SparklesIcon className="size-3.5 text-muted-foreground/30" />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center gap-1.5 border-t px-3 py-2 text-xs text-muted-foreground">
            <SparklesIcon className="size-3 text-primary/60" />
            <span>Suggestions based on your recent activity</span>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
