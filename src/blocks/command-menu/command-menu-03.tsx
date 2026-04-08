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
  FileIcon,
  FileTextIcon,
  FileCodeIcon,
  FileImageIcon,
  FileSpreadsheetIcon,
  FolderIcon,
  ChevronRightIcon,
  SearchIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const files = [
  {
    name: "brand-guidelines-v3.pdf",
    icon: FileTextIcon,
    path: ["Design", "Brand", "Guidelines"],
    size: "2.4 MB",
    color: "text-red-500/70",
  },
  {
    name: "api-schema.ts",
    icon: FileCodeIcon,
    path: ["src", "lib", "api"],
    size: "18 KB",
    color: "text-blue-500/70",
  },
  {
    name: "hero-banner-dark.png",
    icon: FileImageIcon,
    path: ["assets", "images", "marketing"],
    size: "1.1 MB",
    color: "text-emerald-500/70",
  },
  {
    name: "q3-forecast.xlsx",
    icon: FileSpreadsheetIcon,
    path: ["Finance", "Reports", "2024"],
    size: "342 KB",
    color: "text-green-600/70",
  },
  {
    name: "middleware.ts",
    icon: FileCodeIcon,
    path: ["src"],
    size: "4.2 KB",
    color: "text-blue-500/70",
  },
  {
    name: "user-research-notes.md",
    icon: FileTextIcon,
    path: ["Research", "UX", "Interviews"],
    size: "28 KB",
    color: "text-orange-500/70",
  },
  {
    name: "onboarding-flow.fig",
    icon: FileIcon,
    path: ["Design", "Prototypes"],
    size: "5.7 MB",
    color: "text-purple-500/70",
  },
]

const folders = [
  { name: "Design", icon: FolderIcon, count: 47 },
  { name: "src", icon: FolderIcon, count: 312 },
  { name: "Finance", icon: FolderIcon, count: 23 },
]

export default function CommandMenu03() {
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
          <span>Find a file...</span>
          <Kbd className="ml-4">⌘P</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Search files by name or path..." />
          <CommandList className="max-h-80">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <FileIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No files match your query.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Folders">
              {folders.map((folder) => (
                <CommandItem key={folder.name} onSelect={() => {}}>
                  <FolderIcon className="size-4 text-amber-500/70" />
                  <span className="flex-1 font-medium">{folder.name}</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {folder.count} files
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Files">
              {files.map((file) => (
                <CommandItem key={file.name} onSelect={() => setOpen(false)}>
                  <file.icon className={`size-4 ${file.color}`} />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium">{file.name}</span>
                    <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      {file.path.map((segment, i) => (
                        <span key={i} className="flex items-center gap-0.5">
                          {i > 0 && <ChevronRightIcon className="size-2.5" />}
                          <span>{segment}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {file.size}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>
              <span className="font-mono tabular-nums">382</span> files indexed
            </span>
            <div className="flex items-center gap-2">
              <span>Open</span>
              <Kbd>↵</Kbd>
              <span>Preview</span>
              <Kbd>⌘↵</Kbd>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
