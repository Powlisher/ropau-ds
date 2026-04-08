"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  FilterIcon,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react"

const statusOptions = [
  { value: "active", label: "Active", color: "bg-emerald-500" },
  { value: "paused", label: "Paused", color: "bg-amber-500" },
  { value: "completed", label: "Completed", color: "bg-blue-500" },
  { value: "archived", label: "Archived", color: "bg-slate-400" },
]

const priorityOptions = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

export default function Popover10() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <FilterIcon data-icon="inline-start" />
          Filter
          <Badge variant="secondary" className="ml-1">
            2
          </Badge>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-52 p-1.5">
          <div className="flex flex-col gap-0.5">
            <Popover>
              <PopoverTrigger
                render={
                  <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted" />
                }
              >
                <span className="flex-1 text-left">Status</span>
                <Badge variant="secondary" className="text-[10px]">
                  1
                </Badge>
                <ChevronRightIcon className="size-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="start"
                sideOffset={8}
                className="w-44 p-1.5"
              >
                <PopoverHeader className="px-2 pb-1.5">
                  <PopoverTitle className="text-xs">Status</PopoverTitle>
                </PopoverHeader>
                <div className="flex flex-col gap-0.5">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                        opt.value === "active" ? "bg-muted/50 font-medium" : ""
                      }`}
                    >
                      <span
                        className={`size-2 shrink-0 rounded-full ${opt.color}`}
                      />
                      <span className="flex-1 text-left">{opt.label}</span>
                      {opt.value === "active" && (
                        <CheckIcon className="size-3.5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger
                render={
                  <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted" />
                }
              >
                <span className="flex-1 text-left">Priority</span>
                <Badge variant="secondary" className="text-[10px]">
                  1
                </Badge>
                <ChevronRightIcon className="size-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="start"
                sideOffset={8}
                className="w-40 p-1.5"
              >
                <PopoverHeader className="px-2 pb-1.5">
                  <PopoverTitle className="text-xs">Priority</PopoverTitle>
                </PopoverHeader>
                <div className="flex flex-col gap-0.5">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                        opt.value === "high" ? "bg-muted/50 font-medium" : ""
                      }`}
                    >
                      <span className="flex-1 text-left">{opt.label}</span>
                      {opt.value === "high" && (
                        <CheckIcon className="size-3.5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Separator className="my-1" />

            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Category
              <ChevronRightIcon className="ml-auto size-3.5" />
            </button>
            <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              Assignee
              <ChevronRightIcon className="ml-auto size-3.5" />
            </button>
          </div>

          <Separator className="my-1" />
          <button className="flex w-full items-center justify-center rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Clear all filters
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
