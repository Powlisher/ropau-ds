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
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  FileTextIcon,
  SettingsIcon,
  UsersIcon,
  BarChart3Icon,
  PlusIcon,
  DownloadIcon,
  SearchIcon,
  LayoutDashboardIcon,
  BellIcon,
  PaletteIcon,
  ShieldIcon,
  GlobeIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const pages = [
  { label: "Dashboard", icon: LayoutDashboardIcon, shortcut: "G D" },
  { label: "Analytics", icon: BarChart3Icon, shortcut: "G A" },
  { label: "Team Members", icon: UsersIcon, shortcut: "G T" },
  { label: "Documents", icon: FileTextIcon, shortcut: "G F" },
]

const actions = [
  { label: "Create New Project", icon: PlusIcon, shortcut: "C P" },
  { label: "Export Report", icon: DownloadIcon, shortcut: "C E" },
  { label: "Invite Collaborator", icon: UsersIcon, shortcut: "C I" },
]

const settings = [
  { label: "Notifications", icon: BellIcon },
  { label: "Appearance", icon: PaletteIcon },
  { label: "Security & Privacy", icon: ShieldIcon },
  { label: "Language & Region", icon: GlobeIcon },
]

export default function CommandMenu01() {
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
          <span>Search commands...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No results found. Try a different search term.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span>{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Actions">
              {actions.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span>{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Settings">
              {settings.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-mono tabular-nums">14</span> commands available
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Navigate</span>
              <Kbd>↑↓</Kbd>
              <span>Select</span>
              <Kbd>↵</Kbd>
              <span>Close</span>
              <Kbd>esc</Kbd>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
