"use client"

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaletteIcon, CheckIcon } from "lucide-react"

const presets = [
  { name: "Slate", value: "#64748b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Fuchsia", value: "#d946ef" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Orange", value: "#f97316" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Lime", value: "#84cc16" },
  { name: "Indigo", value: "#6366f1" },
]

export default function Popover02() {
  const [color, setColor] = useState("#3b82f6")

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" />}
        >
          <span
            className="size-4 rounded-sm ring-1 ring-inset ring-foreground/10"
            style={{ backgroundColor: color }}
          />
          <PaletteIcon data-icon="inline-start" className="ml-1" />
          Pick color
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <PopoverHeader>
            <PopoverTitle>Color picker</PopoverTitle>
          </PopoverHeader>

          <div>
            <div
              className="mb-3 h-16 w-full rounded-lg ring-1 ring-inset ring-foreground/10"
              style={{ backgroundColor: color }}
            />
            <div className="grid grid-cols-6 gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setColor(preset.value)}
                  className="relative flex size-8 items-center justify-center rounded-md ring-1 ring-inset ring-foreground/10 transition-transform hover:scale-110"
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                >
                  {color === preset.value && (
                    <CheckIcon className="size-3.5 text-white drop-shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="size-7 shrink-0 rounded-md ring-1 ring-inset ring-foreground/10"
              style={{ backgroundColor: color }}
            />
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="font-mono tabular-nums text-xs uppercase"
              maxLength={7}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
