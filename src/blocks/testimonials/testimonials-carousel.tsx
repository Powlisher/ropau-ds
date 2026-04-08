"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "We cut our deployment pipeline from 45 minutes down to under 8. The team reclaimed almost a full day per sprint just on CI alone.",
    name: "Camille Bernstein",
    role: "Staff Engineer, Tidepool",
    initials: "CB",
  },
  {
    quote:
      "The analytics dashboard finally gives product and engineering a shared language. We stopped arguing about what 'active user' means.",
    name: "Mateo Alvarez",
    role: "Head of Product, Canopy Health",
    initials: "MA",
  },
  {
    quote:
      "I was skeptical about switching mid-project, but the migration tool handled our 230+ API routes without a single breaking change.",
    name: "Priya Khatri",
    role: "CTO, Luminary Finance",
    initials: "PK",
  },
  {
    quote:
      "Our on-call incidents dropped 78% in the first quarter. The alert routing alone paid for the entire annual contract.",
    name: "Tomas Eriksson",
    role: "SRE Lead, Nordlight Systems",
    initials: "TE",
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What our customers say
        </h2>
      </div>

      <Card
        className="relative overflow-hidden"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent className="flex min-h-[200px] flex-col items-center justify-center px-8 py-10 text-center sm:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            >
              <blockquote className="text-base leading-relaxed text-foreground sm:text-lg">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {testimonials[current].initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          aria-label="Previous testimonial"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
        </Button>
        <div className="flex gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`size-2 rounded-full transition-colors ${
                idx === current ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          aria-label="Next testimonial"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 12l4-4-4-4" />
          </svg>
        </Button>
      </div>
    </section>
  )
}
