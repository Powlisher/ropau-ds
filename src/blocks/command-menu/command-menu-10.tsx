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
  CopyIcon,
  Share2Icon,
  Trash2Icon,
  ArchiveIcon,
  StarIcon,
  PinIcon,
  MoreHorizontalIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  MailIcon,
  SearchIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const items = [
  {
    id: "1",
    label: "Q3 Performance Review",
    icon: FileTextIcon,
    iconColor: "text-blue-500/70",
    meta: "Last edited 3 days ago",
    starred: true,
  },
  {
    id: "2",
    label: "Brand Photography Collection",
    icon: ImageIcon,
    iconColor: "text-emerald-500/70",
    meta: "24 assets, 187 MB",
    starred: false,
  },
  {
    id: "3",
    label: "API Documentation Portal",
    icon: LinkIcon,
    iconColor: "text-orange-500/70",
    meta: "api.ropau.io/docs",
    starred: true,
  },
  {
    id: "4",
    label: "Client Feedback Thread",
    icon: MailIcon,
    iconColor: "text-purple-500/70",
    meta: "8 messages, 2 unread",
    starred: false,
  },
  {
    id: "5",
    label: "Sprint Retrospective Notes",
    icon: FileTextIcon,
    iconColor: "text-blue-500/70",
    meta: "Team sync from Apr 4",
    starred: false,
  },
]

const inlineActions = [
  { id: "copy", icon: CopyIcon, label: "Copy link", className: "hover:text-foreground" },
  { id: "share", icon: Share2Icon, label: "Share", className: "hover:text-foreground" },
  { id: "archive", icon: ArchiveIcon, label: "Archive", className: "hover:text-foreground" },
  { id: "delete", icon: Trash2Icon, label: "Delete", className: "hover:text-red-500" },
]

export default function CommandMenu10() {
  const [open, setOpen] = useState(false)
  const [starredIds, setStarredIds] = useState<Set<string>>(
    new Set(items.filter((i) => i.starred).map((i) => i.id))
  )

  function toggleStar(id: string) {
    setStarredIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
          <MoreHorizontalIcon className="size-4" />
          <span>Quick actions on items...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Search items to act on..." />
          <CommandList className="max-h-80">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No items found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Items">
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  className="group/item flex-col items-start gap-2 py-2.5"
                  value={item.label}
                >
                  <div className="flex w-full items-start gap-2">
                    <item.icon className={`mt-0.5 size-4 ${item.iconColor}`} />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.label}</span>
                        {starredIds.has(item.id) && (
                          <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.meta}</span>
                    </div>
                  </div>

                  <div className="flex w-full items-center gap-1 pl-6 opacity-0 transition-opacity group-data-selected/item:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(item.id)
                      }}
                      className={`flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted ${
                        starredIds.has(item.id) ? "text-amber-400" : "hover:text-amber-400"
                      }`}
                      title={starredIds.has(item.id) ? "Unstar" : "Star"}
                    >
                      <StarIcon className={`size-3.5 ${starredIds.has(item.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
                      title="Pin"
                    >
                      <PinIcon className="size-3.5" />
                    </button>
                    <div className="mx-1 h-4 w-px bg-border" />
                    {inlineActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (action.id === "delete" || action.id === "archive") {
                            setOpen(false)
                          }
                        }}
                        className={`flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted ${action.className}`}
                        title={action.label}
                      >
                        <action.icon className="size-3.5" />
                      </button>
                    ))}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>
              <span className="font-mono tabular-nums">{items.length}</span> items
            </span>
            <div className="flex items-center gap-2">
              <span>Actions</span>
              <Kbd>Tab</Kbd>
              <span>Select</span>
              <Kbd>↵</Kbd>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
