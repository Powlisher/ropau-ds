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
  LayoutDashboardIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  FileTextIcon,
  InboxIcon,
  CalendarIcon,
  CreditCardIcon,
  HelpCircleIcon,
  ArrowRightIcon,
  SearchIcon,
  ComponentIcon,
  ShoppingBagIcon,
  BellIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const mainNav = [
  { label: "Dashboard", icon: LayoutDashboardIcon, section: "Overview", badge: null },
  { label: "Inbox", icon: InboxIcon, section: "Overview", badge: "12" },
  { label: "Calendar", icon: CalendarIcon, section: "Overview", badge: null },
  { label: "Notifications", icon: BellIcon, section: "Overview", badge: "3" },
]

const workspace = [
  { label: "Team Members", icon: UsersIcon, section: "Workspace", badge: null },
  { label: "Projects", icon: ComponentIcon, section: "Workspace", badge: null },
  { label: "Analytics", icon: BarChart3Icon, section: "Workspace", badge: null },
  { label: "Documents", icon: FileTextIcon, section: "Workspace", badge: null },
]

const account = [
  { label: "Billing & Plans", icon: CreditCardIcon, section: "Account", badge: null },
  { label: "Orders", icon: ShoppingBagIcon, section: "Account", badge: null },
  { label: "Settings", icon: SettingsIcon, section: "Account", badge: null },
  { label: "Help & Support", icon: HelpCircleIcon, section: "Account", badge: null },
]

export default function CommandMenu06() {
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
          <span>Go to page...</span>
          <Kbd className="ml-4">⌘G</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Where do you want to go?" />
          <CommandList className="max-h-80">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <SearchIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No pages match your search.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Overview">
              {mainNav.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 font-mono text-[10px] font-semibold tabular-nums text-primary">
                      {item.badge}
                    </span>
                  )}
                  <ArrowRightIcon className="size-3.5 text-muted-foreground/30" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Workspace">
              {workspace.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRightIcon className="size-3.5 text-muted-foreground/30" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              {account.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRightIcon className="size-3.5 text-muted-foreground/30" />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>
              <span className="font-mono tabular-nums">12</span> pages
            </span>
            <div className="flex items-center gap-2">
              <span>Navigate</span>
              <Kbd>↑↓</Kbd>
              <span>Go</span>
              <Kbd>↵</Kbd>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
