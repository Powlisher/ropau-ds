"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "The query builder alone saved us 6 engineering hours per week. No more hand-writing SQL for ad hoc reports.",
    name: "Anja Kowalski",
    role: "Data Lead, Meridian Labs",
    initials: "AK",
  },
  {
    quote:
      "We switched from three different tools to this single platform. The integration was smoother than expected, and our team adapted within two weeks. The unified dashboard gives us visibility we never had before, and the alerting is precise enough that we actually trust it now.",
    name: "Daisuke Mori",
    role: "VP Engineering, Sakura AI",
    initials: "DM",
  },
  {
    quote:
      "Onboarding new engineers went from a week-long slog to a half-day setup. The dev environment provisioning is genuinely magical.",
    name: "Fatima Al-Rashidi",
    role: "Engineering Manager, Mosaic Health",
    initials: "FA",
  },
  {
    quote:
      "Our release cadence went from monthly to multiple times per day. The confidence comes from the test infrastructure and the rollback speed. When something goes wrong, we know in seconds and can revert in under a minute.",
    name: "Luca Ferretti",
    role: "CTO, Finvest",
    initials: "LF",
  },
  {
    quote:
      "Best developer experience I have encountered in 15 years of building software.",
    name: "Nora Bjornstad",
    role: "Principal Engineer, Auroratech",
    initials: "NB",
  },
  {
    quote:
      "The monitoring caught a memory leak at 3am that would have taken down our payment service. The auto-remediation kicked in before anyone was paged. We reviewed the incident the next morning over coffee instead of in a war room.",
    name: "Chen Wei",
    role: "SRE Director, PayBridge",
    initials: "CW",
  },
  {
    quote:
      "We evaluated seven platforms. This was the only one where the free trial actually demonstrated value instead of just teasing features behind paywalls.",
    name: "Isabelle Moreau",
    role: "Head of Infra, Lumiere",
    initials: "IM",
  },
]

const col1 = [testimonials[0], testimonials[3], testimonials[6]]
const col2 = [testimonials[1], testimonials[4]]
const col3 = [testimonials[2], testimonials[5]]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function QuoteCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <motion.div variants={itemVariants}>
      <Card
        className="transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
        }}
      >
        <CardContent className="pt-1">
          <blockquote className="text-sm leading-relaxed text-foreground">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>{t.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function TestimonialsMasonry() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Loved by engineering teams
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>div]:mb-5 [&>div]:break-inside-avoid"
      >
        {[...col1, ...col2, ...col3].map((t) => (
          <QuoteCard key={t.name} t={t} />
        ))}
      </motion.div>
    </section>
  )
}
