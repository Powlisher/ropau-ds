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
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  CopyIcon,
  ClipboardPasteIcon,
  ScissorsIcon,
  Undo2Icon,
  Redo2Icon,
  SaveIcon,
  PrinterIcon,
  SearchIcon,
  Share2Icon,
  MaximizeIcon,
  BookmarkIcon,
  EyeIcon,
  CodeIcon,
  TerminalIcon,
  SplitIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const editActions = [
  { label: "Copy", icon: CopyIcon, keys: ["⌘", "C"] },
  { label: "Paste", icon: ClipboardPasteIcon, keys: ["⌘", "V"] },
  { label: "Cut", icon: ScissorsIcon, keys: ["⌘", "X"] },
  { label: "Undo", icon: Undo2Icon, keys: ["⌘", "Z"] },
  { label: "Redo", icon: Redo2Icon, keys: ["⌘", "⇧", "Z"] },
]

const fileActions = [
  { label: "Save", icon: SaveIcon, keys: ["⌘", "S"] },
  { label: "Save As...", icon: SaveIcon, keys: ["⌘", "⇧", "S"] },
  { label: "Print", icon: PrinterIcon, keys: ["⌘", "P"] },
  { label: "Share", icon: Share2Icon, keys: ["⌘", "⇧", "E"] },
]

const viewActions = [
  { label: "Toggle Fullscreen", icon: MaximizeIcon, keys: ["F11"] },
  { label: "Toggle Sidebar", icon: SplitIcon, keys: ["⌘", "B"] },
  { label: "Toggle Bookmarks", icon: BookmarkIcon, keys: ["⌘", "⇧", "B"] },
  { label: "Preview", icon: EyeIcon, keys: ["⌘", "⇧", "P"] },
  { label: "Source Code", icon: CodeIcon, keys: ["⌘", "U"] },
  { label: "Terminal", icon: TerminalIcon, keys: ["⌘", "`"] },
]

export default function CommandMenu04() {
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
          <span>Keyboard shortcuts...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Search shortcuts..." />
          <CommandList className="max-h-80">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No shortcuts found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Edit">
              {editActions.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <KbdGroup>
                    {item.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="File">
              {fileActions.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <KbdGroup>
                    {item.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              {viewActions.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <KbdGroup>
                    {item.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>
              <span className="font-mono tabular-nums">15</span> shortcuts
            </span>
            <span>Press any shortcut to execute</span>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
