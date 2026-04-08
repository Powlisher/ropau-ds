"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    company: "Tidepool",
    companyInitial: "T",
    quote:
      "We consolidated five monitoring tools into one. The cost savings were significant, but the real win was having a single source of truth for incident response.",
    name: "Camille Bernstein",
    role: "Staff Engineer",
    initials: "CB",
  },
  {
    company: "Canopy Health",
    companyInitial: "C",
    quote:
      "Product and engineering finally share the same metrics dashboard. Alignment meetings went from 90 minutes to 20.",
    name: "Mateo Alvarez",
    role: "Head of Product",
    initials: "MA",
  },
  {
    company: "Luminary Finance",
    companyInitial: "L",
    quote:
      "The migration tool handled our 230+ API routes without a single breaking change. We were fully live in under a week.",
    name: "Priya Khatri",
    role: "CTO",
    initials: "PK",
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

export default function TestimonialsCompanyLogos() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Trusted by industry leaders
        </h2>
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
              className="h-full transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="flex h-full flex-col pt-2">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-foreground/5">
                  <span className="text-sm font-semibold text-foreground/60">
                    {t.companyInitial}
                  </span>
                </div>
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {t.company}
                </p>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
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
