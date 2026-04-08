"use client"

import { useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  FileTextIcon,
  ImageIcon,
  FileCodeIcon,
  FileSpreadsheetIcon,
  CalendarIcon,
  UserIcon,
  SearchIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const items = [
  {
    id: "proposal",
    label: "Mercier Partnership Proposal",
    icon: FileTextIcon,
    iconColor: "text-blue-500/70",
    type: "Document",
    modified: "Mar 28, 2026",
    author: "Camille Dubois",
    preview: {
      title: "Mercier Partnership Proposal",
      description: "Strategic partnership framework for Q2-Q3 2026 collaboration between Ropau and Mercier Group. Covers joint marketing initiatives, shared technology licensing, and revenue-sharing models.",
      words: "3,847",
      status: "Draft",
    },
  },
  {
    id: "campaign",
    label: "Spring Campaign Assets",
    icon: ImageIcon,
    iconColor: "text-emerald-500/70",
    type: "Folder",
    modified: "Apr 2, 2026",
    author: "Elise Marchand",
    preview: {
      title: "Spring Campaign Assets",
      description: "Collection of 24 visual assets for the spring product launch. Includes hero banners, social media templates, email headers, and product photography.",
      words: "24 files",
      status: "Ready",
    },
  },
  {
    id: "api",
    label: "Authentication Service v2",
    icon: FileCodeIcon,
    iconColor: "text-orange-500/70",
    type: "Code",
    modified: "Apr 5, 2026",
    author: "Thomas Lefebvre",
    preview: {
      title: "Authentication Service v2",
      description: "Rewritten auth service with OAuth 2.1, PKCE flow, and session management. Includes rate limiting middleware and audit logging for compliance.",
      words: "1,204 lines",
      status: "In Review",
    },
  },
  {
    id: "budget",
    label: "Q2 Budget Allocation",
    icon: FileSpreadsheetIcon,
    iconColor: "text-green-600/70",
    type: "Spreadsheet",
    modified: "Apr 1, 2026",
    author: "Marie Laurent",
    preview: {
      title: "Q2 Budget Allocation",
      description: "Departmental budget breakdown for April through June. Engineering: 42%, Marketing: 23%, Operations: 18%, R&D: 17%. Total allocation: EUR 1.24M.",
      words: "156 rows",
      status: "Approved",
    },
  },
  {
    id: "standup",
    label: "Design Standup Apr 7",
    icon: CalendarIcon,
    iconColor: "text-purple-500/70",
    type: "Meeting",
    modified: "Apr 7, 2026",
    author: "Hugo Bernard",
    preview: {
      title: "Design Standup Apr 7",
      description: "Weekly design sync covering onboarding redesign progress, component library audit results, and upcoming user testing sessions for the mobile app.",
      words: "Notes attached",
      status: "Completed",
    },
  },
]

export default function CommandMenu07() {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(items[0].id)

  const selected = items.find((i) => i.id === selectedId) ?? items[0]

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
          <span>Search with preview...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search with Preview</DialogTitle>
          <DialogDescription>Search and preview files</DialogDescription>
        </DialogHeader>
        <DialogContent
          className="top-1/3 max-w-2xl translate-y-0 overflow-hidden rounded-xl! p-0"
          showCloseButton={false}
        >
          <Command className="rounded-xl">
            <CommandInput placeholder="Search files and documents..." />
            <div className="flex">
              <CommandList className="max-h-72 w-1/2 border-r">
                <CommandEmpty>
                  <div className="flex flex-col items-center gap-2 py-4">
                    <SearchIcon className="size-6 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">No results.</p>
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => setSelectedId(item.id)}
                      className={selectedId === item.id ? "bg-muted" : ""}
                    >
                      <item.icon className={`size-4 ${item.iconColor}`} />
                      <div className="flex flex-1 flex-col">
                        <span className="truncate text-sm">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>

              <div className="w-1/2 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
                    className="flex h-full flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <selected.icon className={`size-5 ${selected.iconColor}`} />
                      <h3 className="font-heading text-sm font-semibold tracking-tight">
                        {selected.preview.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {selected.preview.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Modified</span>
                        <span className="font-mono tabular-nums text-foreground">{selected.modified}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Author</span>
                        <div className="flex items-center gap-1.5">
                          <UserIcon className="size-3 text-muted-foreground" />
                          <span className="text-foreground">{selected.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-mono tabular-nums text-foreground">{selected.preview.words}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Status</span>
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {selected.preview.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
              <span>
                <span className="font-mono tabular-nums">{items.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <span>Preview</span>
                <Kbd>↑↓</Kbd>
                <span>Open</span>
                <Kbd>↵</Kbd>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}
