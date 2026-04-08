"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

const slides = [
  {
    title: "Design tokens, not static values",
    subtitle: "Foundation",
    description:
      "Every color, spacing, and shadow in your system references a semantic token. Change once, propagate everywhere. No more find-and-replace across 200 files.",
    accent: "bg-amber-500/10 text-amber-700",
  },
  {
    title: "Components that compose",
    subtitle: "Architecture",
    description:
      "Primitives snap together like building blocks. A Button inside a Dialog inside a Drawer — each layer respects the context above it. Zero configuration needed.",
    accent: "bg-emerald-500/10 text-emerald-700",
  },
  {
    title: "Ship with confidence",
    subtitle: "Quality",
    description:
      "Visual regression tests catch what code reviews miss. Every pull request generates a pixel-diff report. Your team reviews changes with their eyes, not just their IDE.",
    accent: "bg-blue-500/10 text-blue-700",
  },
]

export default function Modal03() {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button />}>Launch overview</DialogTrigger>
        <DialogContent
          className="fixed inset-0 top-0 left-0 max-w-none -translate-x-0 -translate-y-0 rounded-none sm:max-w-none"
          showCloseButton={false}
        >
          <div className="flex h-dvh flex-col">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                Design System Overview
              </span>
              <DialogClose render={<Button variant="ghost" size="icon-sm" />}>
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <div className="mx-auto w-full max-w-xl space-y-8">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium tracking-wide ${slide.accent}`}
                >
                  {slide.subtitle}
                </span>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {slide.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t px-6 py-4">
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current
                        ? "w-6 bg-foreground"
                        : "w-1.5 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    setCurrent((c) => (c - 1 + slides.length) % slides.length)
                  }
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    setCurrent((c) => (c + 1) % slides.length)
                  }
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
