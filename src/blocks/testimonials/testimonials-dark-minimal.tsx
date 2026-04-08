"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "The developer experience is exceptional. Our team ships twice as fast since adopting the platform.",
    name: "Elena Marchetti",
    role: "Staff Engineer, Tidepool",
    initials: "EM",
  },
  {
    quote:
      "We replaced a 6-tool stack with a single platform. Monthly spend dropped 40% and reliability improved across the board.",
    name: "Omar Hassan",
    role: "VP Infrastructure, Canopy Health",
    initials: "OH",
  },
  {
    quote:
      "Auto-instrumentation picked up traces we did not even know we needed. Found 3 performance bottlenecks in the first week.",
    name: "Isabelle Moreau",
    role: "Head of Infra, Lumiere",
    initials: "IM",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TestimonialsDarkMinimal() {
  return (
    <section className="bg-[#0f0f10] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#fafaf9] sm:text-3xl">
            Words from the community
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              className="rounded-xl border border-[#1f1f22] p-6"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <svg
                className="mb-3 size-6 text-[#fafaf9]/15"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
              <blockquote className="text-sm leading-relaxed text-[#e4e4e2]">
                {t.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <Avatar size="sm" className="border border-[#2a2a2d]">
                  <AvatarFallback className="bg-[#1a1a1d] text-[#a1a1a0]">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-[#fafaf9]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#78787a]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
