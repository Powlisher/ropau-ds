"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, LoaderIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SaveStatus = "idle" | "saving" | "saved"

export default function FormAutosave() {
  const [status, setStatus] = useState<SaveStatus>("saved")

  function handleChange() {
    setStatus("saving")
  }

  useEffect(() => {
    if (status === "saving") {
      const timer = setTimeout(() => setStatus("saved"), 1200)
      return () => clearTimeout(timer)
    }
  }, [status])

  return (
    <div className="flex items-center justify-center bg-slate-50/80 px-4 py-16">
      <Card
        className="w-full max-w-lg"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg tracking-tight">
                Edit profile
              </CardTitle>
              <CardDescription>
                Changes are saved automatically
              </CardDescription>
            </div>
            <AnimatePresence mode="wait">
              {status === "saving" ? (
                <motion.div
                  key="saving"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  <Badge variant="secondary" className="gap-1">
                    <LoaderIcon className="size-3 animate-spin" />
                    Saving...
                  </Badge>
                </motion.div>
              ) : status === "saved" ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  <Badge
                    variant="outline"
                    className="gap-1 border-emerald-200 text-emerald-700"
                  >
                    <CheckCircle2Icon className="size-3" />
                    Saved
                  </Badge>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fas-display">Display name</Label>
              <Input
                id="fas-display"
                defaultValue="Chloe Winters"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fas-username">Username</Label>
              <Input
                id="fas-username"
                defaultValue="chloewinters"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fas-email">Email</Label>
            <Input
              id="fas-email"
              type="email"
              defaultValue="chloe.w@pelagic.design"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fas-title">Job title</Label>
            <Input
              id="fas-title"
              defaultValue="Senior Product Designer"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fas-bio">Bio</Label>
            <Textarea
              id="fas-bio"
              defaultValue="Design systems advocate. Previously at Figma and Notion. Based in Vancouver."
              onChange={handleChange}
              className="min-h-24"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Last saved at{" "}
            <span className="tabular-nums">14:32:08</span> today
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
