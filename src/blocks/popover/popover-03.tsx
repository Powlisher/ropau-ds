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
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function Popover03() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(2)
  const [selected, setSelected] = useState<number | null>(14)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = 8

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <CalendarIcon data-icon="inline-start" />
          <span className="font-mono tabular-nums">
            {selected ? `${MONTHS[month].slice(0, 3)} ${selected}, ${year}` : "Pick a date"}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3">
          <PopoverHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon-xs" onClick={prevMonth}>
                <ChevronLeftIcon />
              </Button>
              <PopoverTitle className="text-sm">
                {MONTHS[month]} {year}
              </PopoverTitle>
              <Button variant="ghost" size="icon-xs" onClick={nextMonth}>
                <ChevronRightIcon />
              </Button>
            </div>
          </PopoverHeader>

          <div className="grid grid-cols-7 gap-0.5">
            {DAYS.map((d) => (
              <div
                key={d}
                className="flex h-8 items-center justify-center text-xs font-medium tracking-wide text-muted-foreground"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const isSelected = day === selected
              const isToday = day === today && month === 3 && year === 2026
              return (
                <button
                  key={day}
                  onClick={() => setSelected(day)}
                  className={`flex h-8 items-center justify-center rounded-md text-sm font-mono tabular-nums transition-colors ${
                    isSelected
                      ? "bg-primary font-medium text-primary-foreground"
                      : isToday
                        ? "bg-muted font-medium"
                        : "hover:bg-muted"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {selected && (
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Selected</span>
              <span className="text-xs font-mono tabular-nums font-medium">
                {MONTHS[month].slice(0, 3)} {selected}, {year}
              </span>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
