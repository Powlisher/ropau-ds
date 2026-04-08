"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ClockIcon } from "lucide-react"
import { motion } from "framer-motion"

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "11:00 AM",
  "1:30 PM",
  "2:00 PM",
  "3:00 PM",
  "4:30 PM",
]

export default function ContactCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Card
          className="w-full max-w-md"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClockIcon className="size-5 text-primary" />
              <CardTitle className="text-lg tracking-tight">
                Schedule a call
              </CardTitle>
            </div>
            <CardDescription>
              Pick a date and time that works for you. Calls last 30 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() ||
                  date.getDay() === 0 ||
                  date.getDay() === 6
                }
              />
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Available times
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      className="text-xs tabular-nums"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            <Button
              className="w-full"
              disabled={!selectedDate || !selectedTime}
            >
              {selectedDate && selectedTime
                ? `Confirm ${selectedTime}`
                : "Select a date and time"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
