"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Moving our observability stack here saved us $14K per month and gave us better alerting than we had with three separate tools.",
    name: "Marcus Lindgren",
    role: "Platform Lead, Nordlight",
    initials: "ML",
    duration: "2:47",
  },
  {
    quote:
      "The deployment preview system changed how our designers give feedback. They test on real staging URLs instead of static mocks.",
    name: "Yuki Tanaka",
    role: "Design Director, Sakura AI",
    initials: "YT",
    duration: "3:12",
  },
  {
    quote:
      "We went from zero observability to full-stack tracing in a single afternoon. The auto-instrumentation is remarkably accurate.",
    name: "Fatima Al-Rashidi",
    role: "Engineering Manager, Mosaic Health",
    initials: "FA",
    duration: "1:58",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TestimonialsVideo() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Hear it from them
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Short conversations with the teams using it daily.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={itemVariants}>
            <Card
              className="group overflow-hidden transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div className="relative mx-4 mt-0 flex h-44 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-foreground/5 via-foreground/3 to-transparent">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                  className="flex size-12 items-center justify-center rounded-full bg-foreground/90 text-background"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M5 3.5v9l7.5-4.5L5 3.5z" />
                  </svg>
                </motion.div>
                <span className="absolute bottom-2 right-2 rounded bg-foreground/80 px-1.5 py-0.5 font-mono text-[0.65rem] tabular-nums text-background">
                  {t.duration}
                </span>
              </div>
              <CardContent>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
