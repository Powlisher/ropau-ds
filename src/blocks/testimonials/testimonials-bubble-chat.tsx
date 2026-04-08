"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const messages = [
  {
    side: "left" as const,
    name: "Camille Bernstein",
    initials: "CB",
    role: "Staff Engineer",
    text: "Just migrated our entire CI pipeline. Went from 45 min builds to under 8. The team is ecstatic.",
  },
  {
    side: "right" as const,
    name: "Mateo Alvarez",
    initials: "MA",
    role: "Head of Product",
    text: "Same here with analytics. Product and engineering finally speak the same language around metrics.",
  },
  {
    side: "left" as const,
    name: "Priya Khatri",
    initials: "PK",
    role: "CTO",
    text: "We were mid-project when we switched. 230+ API routes migrated without a single breaking change. I did not believe it until I saw the test suite pass.",
  },
  {
    side: "right" as const,
    name: "Tomas Eriksson",
    initials: "TE",
    role: "SRE Lead",
    text: "Our on-call incidents dropped 78% in Q1. Alert routing alone justified the contract.",
  },
  {
    side: "left" as const,
    name: "Anja Kowalski",
    initials: "AK",
    role: "Data Lead",
    text: "The query builder saved us 6 engineering hours per week. No more hand-writing SQL for ad hoc stuff.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function TestimonialsBubbleChat() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 lg:px-8">
      <div className="mb-14 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          The conversation around our product
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`flex items-end gap-3 ${
              msg.side === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar size="default">
              <AvatarFallback>{msg.initials}</AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[75%] ${
                msg.side === "right" ? "items-end text-right" : ""
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.side === "left"
                    ? "rounded-bl-md bg-muted/70"
                    : "rounded-br-md bg-primary/8 ring-1 ring-primary/10"
                }`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.03), 0 2px 4px rgba(20,20,15,0.03)",
                }}
              >
                <p className="text-sm leading-relaxed text-foreground">
                  {msg.text}
                </p>
              </div>
              <p
                className={`mt-1.5 text-xs text-muted-foreground ${
                  msg.side === "right" ? "text-right" : ""
                }`}
              >
                <span className="font-medium text-foreground/70">
                  {msg.name}
                </span>{" "}
                &middot; {msg.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
