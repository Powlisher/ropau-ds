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
  SunIcon,
  MoonIcon,
  MonitorIcon,
  PaletteIcon,
  TypeIcon,
  MaximizeIcon,
  MinimizeIcon,
  ContrastIcon,
  EyeIcon,
  SearchIcon,
  CheckIcon,
} from "lucide-react"
import { motion } from "framer-motion"

type ThemeOption = {
  label: string
  icon: typeof SunIcon
  description: string
  value: string
}

const themeOptions: ThemeOption[] = [
  { label: "Light", icon: SunIcon, description: "Clean and bright interface", value: "light" },
  { label: "Dark", icon: MoonIcon, description: "Easy on the eyes at night", value: "dark" },
  { label: "System", icon: MonitorIcon, description: "Follow your OS preference", value: "system" },
]

const accentColors = [
  { label: "Slate", value: "slate", color: "bg-slate-500" },
  { label: "Blue", value: "blue", color: "bg-blue-500" },
  { label: "Emerald", value: "emerald", color: "bg-emerald-500" },
  { label: "Amber", value: "amber", color: "bg-amber-500" },
  { label: "Rose", value: "rose", color: "bg-rose-500" },
  { label: "Violet", value: "violet", color: "bg-violet-500" },
]

const displayOptions = [
  { label: "Compact Density", icon: MinimizeIcon, description: "Tighter spacing, more content" },
  { label: "Comfortable Density", icon: MaximizeIcon, description: "Default balanced layout" },
  { label: "Large Text", icon: TypeIcon, description: "Increase base font size to 18px" },
  { label: "High Contrast", icon: ContrastIcon, description: "Enhanced borders and text contrast" },
  { label: "Reduce Motion", icon: EyeIcon, description: "Minimize animations throughout" },
]

export default function CommandMenu08() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState("system")
  const [accent, setAccent] = useState("blue")

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
          <PaletteIcon className="size-4" />
          <span>Appearance...</span>
          <Kbd className="ml-4">⌘T</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl">
          <CommandInput placeholder="Search appearance options..." />
          <CommandList className="max-h-80">
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-4">
                <PaletteIcon className="size-8 text-muted-foreground/40" />
                <p className="text-muted-foreground">No appearance options found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Theme">
              {themeOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => setTheme(option.value)}
                >
                  <option.icon className="size-4 text-muted-foreground" />
                  <div className="flex flex-1 flex-col">
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                  {theme === option.value && (
                    <CheckIcon className="size-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Accent Color">
              <div className="flex flex-wrap gap-2 px-2 py-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccent(color.value)}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={`flex size-8 items-center justify-center rounded-full ${color.color} ring-2 ring-offset-2 ring-offset-popover transition-all ${
                        accent === color.value ? "ring-foreground/40" : "ring-transparent"
                      }`}
                    >
                      {accent === color.value && (
                        <CheckIcon className="size-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{color.label}</span>
                  </button>
                ))}
              </div>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Display">
              {displayOptions.map((option) => (
                <CommandItem key={option.label}>
                  <option.icon className="size-4 text-muted-foreground" />
                  <div className="flex flex-1 flex-col">
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>Changes apply instantly</span>
            <div className="flex items-center gap-2">
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
