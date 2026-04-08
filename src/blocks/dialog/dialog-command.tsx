"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import {
  SearchIcon,
  FileTextIcon,
  SettingsIcon,
  UsersIcon,
  PlusIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  GlobeIcon,
  LogOutIcon,
  CommandIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const commands = [
  {
    group: "Navigation",
    items: [
      { label: "Dashboard", icon: LayoutDashboardIcon, shortcut: "G D" },
      { label: "Projects", icon: FileTextIcon, shortcut: "G P" },
      { label: "Team", icon: UsersIcon, shortcut: "G T" },
      { label: "Settings", icon: SettingsIcon, shortcut: "G S" },
    ],
  },
  {
    group: "Actions",
    items: [
      { label: "New project", icon: PlusIcon, shortcut: "N" },
      { label: "Switch theme", icon: PaletteIcon, shortcut: "T" },
      { label: "Open documentation", icon: GlobeIcon, shortcut: undefined },
      { label: "Sign out", icon: LogOutIcon, shortcut: undefined },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DialogCommand() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <CommandIcon data-icon="inline-start" />
          Command palette
          <Kbd className="ml-2">K</Kbd>
        </DialogTrigger>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md" showCloseButton={false}>
          <div className="flex items-center gap-2 border-b px-3">
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-muted-foreground/70">Try a different search term</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={query}
              >
                {filtered.map((group, gi) => (
                  <div key={group.group}>
                    {gi > 0 && <Separator className="my-1.5" />}
                    <p className="px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {group.group}
                    </p>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <motion.button
                          key={item.label}
                          variants={itemVariants}
                          whileHover={{ backgroundColor: "var(--accent)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm outline-none"
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" />
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.shortcut && (
                            <span className="flex shrink-0 gap-1">
                              {item.shortcut.split(" ").map((key) => (
                                <Kbd key={key}>{key}</Kbd>
                              ))}
                            </span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
