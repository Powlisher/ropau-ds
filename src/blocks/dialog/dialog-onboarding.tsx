"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RocketIcon, UsersIcon, PaletteIcon, CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    id: 1,
    icon: RocketIcon,
    title: "Welcome to Meridian",
    description: "Let's get your workspace ready in under a minute.",
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Your name</label>
          <Input defaultValue="Margaux Delacroix" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Role</label>
          <Input defaultValue="Design Engineer" placeholder="e.g. Product Designer" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    icon: UsersIcon,
    title: "Invite your team",
    description: "Collaboration works best with others. Add at least one teammate.",
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Email addresses</label>
          <Input placeholder="camille@company.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Input placeholder="raphael@company.com" />
        </div>
        <p className="text-xs text-muted-foreground">Separate multiple emails with commas, or invite later from Settings.</p>
      </div>
    ),
  },
  {
    id: 3,
    icon: PaletteIcon,
    title: "Customize your workspace",
    description: "Choose how you want your workspace to look and feel.",
    content: (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Minimal", bg: "bg-slate-50 ring-primary", active: true },
            { label: "Warm", bg: "bg-amber-50/80", active: false },
            { label: "Dark", bg: "bg-slate-900", active: false },
          ].map((theme) => (
            <button
              key={theme.label}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 ring-1 transition-all ${
                theme.active ? "ring-2 ring-primary" : "ring-foreground/10 hover:ring-foreground/20"
              }`}
            >
              <div className={`h-10 w-full rounded-lg ${theme.bg}`} />
              <span className="text-xs font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    icon: CheckCircle2Icon,
    title: "You're all set!",
    description: "Your workspace is ready. Start building something beautiful.",
    content: (
      <div
        className="flex flex-col items-center gap-3 rounded-xl bg-primary/5 py-8"
        style={{ boxShadow: "inset 0 1px 2px rgba(20,20,15,0.03)" }}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2Icon className="size-6" />
        </div>
        <div className="text-center">
          <p className="font-heading text-sm font-semibold tracking-tight">Workspace created</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Meridian Studio is live</p>
        </div>
      </div>
    ),
  },
]

export default function DialogOnboarding() {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const Icon = current.icon
  const isLast = step === steps.length - 1

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button />}>
          Start onboarding
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <div className="mb-2 flex justify-center gap-1.5">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`h-1 rounded-full transition-all ${
                  i <= step ? "w-8 bg-primary" : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <DialogHeader>
                <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <DialogTitle className="text-center">{current.title}</DialogTitle>
                <DialogDescription className="text-center">{current.description}</DialogDescription>
              </DialogHeader>

              <div className="mt-4">{current.content}</div>
            </motion.div>
          </AnimatePresence>

          <DialogFooter className="mt-2">
            {step > 0 && !isLast && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>Back</Button>
            )}
            {isLast ? (
              <Button className="flex-1">Open workspace</Button>
            ) : (
              <Button className="flex-1" onClick={() => setStep((s) => s + 1)}>
                {step === 0 ? "Get started" : "Continue"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
