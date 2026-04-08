"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

const filterGroups = [
  {
    label: "Category",
    options: [
      { id: "design", label: "Design", count: 47 },
      { id: "engineering", label: "Engineering", count: 31 },
      { id: "marketing", label: "Marketing", count: 18 },
      { id: "research", label: "Research", count: 9 },
    ],
  },
  {
    label: "Status",
    options: [
      { id: "active", label: "Active", count: 52 },
      { id: "paused", label: "Paused", count: 14 },
      { id: "completed", label: "Completed", count: 28 },
      { id: "archived", label: "Archived", count: 11 },
    ],
  },
  {
    label: "Priority",
    options: [
      { id: "urgent", label: "Urgent", count: 3 },
      { id: "high", label: "High", count: 17 },
      { id: "medium", label: "Medium", count: 41 },
      { id: "low", label: "Low", count: 44 },
    ],
  },
]

export default function Drawer08() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["design", "active", "high"])
  )

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontalIcon data-icon="inline-start" />
            Filters
            {selected.size > 0 && (
              <Badge variant="default" className="ml-1">
                {selected.size}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter projects</DrawerTitle>
            <DrawerDescription>
              Narrow down results by category, status, and priority.
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
            {filterGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-col gap-1">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 transition-colors hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={selected.has(option.id)}
                        onCheckedChange={() => toggle(option.id)}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      <span className="text-xs font-mono tabular-nums text-muted-foreground">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <DrawerFooter>
            {selected.size > 0 && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setSelected(new Set())}
              >
                <XIcon data-icon="inline-start" />
                Clear all filters
              </Button>
            )}
            <DrawerClose asChild>
              <Button className="w-full">
                Apply filters ({selected.size})
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
