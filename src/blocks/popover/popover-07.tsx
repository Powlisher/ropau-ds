"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MoreHorizontalIcon,
  PencilIcon,
  CopyIcon,
  ArchiveIcon,
  StarIcon,
  ExternalLinkIcon,
  Trash2Icon,
} from "lucide-react"

const actions = [
  {
    group: [
      { icon: PencilIcon, label: "Edit", shortcut: "E" },
      { icon: CopyIcon, label: "Duplicate", shortcut: "D" },
      { icon: ExternalLinkIcon, label: "Open in new tab" },
    ],
  },
  {
    group: [
      { icon: StarIcon, label: "Add to favorites" },
      { icon: ArchiveIcon, label: "Archive" },
    ],
  },
  {
    group: [
      {
        icon: Trash2Icon,
        label: "Delete",
        shortcut: "Del",
        destructive: true,
      },
    ],
  },
]

export default function Popover07() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="icon" />}>
          <MoreHorizontalIcon />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48 p-1.5">
          {actions.map((section, si) => (
            <div key={si}>
              {si > 0 && <Separator className="my-1" />}
              <div className="flex flex-col gap-0.5">
                {section.group.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        "destructive" in action && action.destructive
                          ? "text-destructive hover:bg-destructive/10"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="flex-1 text-left">{action.label}</span>
                      {"shortcut" in action && action.shortcut && (
                        <kbd className="text-xs font-mono text-muted-foreground">
                          {action.shortcut}
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
