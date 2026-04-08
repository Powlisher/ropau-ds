"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const thread = [
  {
    user: { initials: "EM", name: "Elena Marchetti", role: "Engineering Lead" },
    time: "09:12 AM",
    content: "The checkout latency issue is back. P95 jumped from 140ms to 890ms overnight. Suspecting the new inventory check we added in v3.8.2.",
    accent: "bg-rose-100 text-rose-700",
  },
  {
    user: { initials: "TR", name: "Thomas Reiner", role: "Backend Engineer" },
    time: "09:24 AM",
    content: "Confirmed. The inventory query is hitting the read replica, which is 47 seconds behind primary. I can add a cache layer or switch to primary for checkout-critical reads.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    user: { initials: "SD", name: "Sophie Duval", role: "Product Manager" },
    time: "09:38 AM",
    content: "How many users are impacted? We have the enterprise demo at 14:00 and I need to know if we should feature-flag this path.",
    accent: "bg-violet-100 text-violet-700",
  },
  {
    user: { initials: "TR", name: "Thomas Reiner", role: "Backend Engineer" },
    time: "09:45 AM",
    content: "About 12% of checkout attempts in the last 3 hours. The cache approach is a 20-minute fix. I can ship it before lunch.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    user: { initials: "EM", name: "Elena Marchetti", role: "Engineering Lead" },
    time: "09:51 AM",
    content: "Go with cache + a 30s TTL. Sophie, I will flag you once it is deployed so QA can validate before the demo.",
    accent: "bg-rose-100 text-rose-700",
  },
  {
    user: { initials: "MC", name: "Marcus Chen", role: "QA Engineer" },
    time: "10:42 AM",
    content: "Verified on staging. P95 is back to 155ms. Cache invalidation tested with concurrent writes. All green.",
    accent: "bg-emerald-100 text-emerald-700",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Timeline08() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Incident Thread</h2>
      <p className="mt-0.5 mb-6 text-sm text-muted-foreground">Checkout latency regression -- April 7, 2026</p>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-5 top-6 bottom-6 w-px bg-border" />

        <div className="space-y-6">
          {thread.map((msg, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex gap-4"
            >
              <div className="relative z-10">
                <Avatar className="size-10 ring-4 ring-background">
                  <AvatarFallback className={`text-xs font-semibold ${msg.accent}`}>
                    {msg.user.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <motion.div
                className="flex-1 pb-1"
                whileHover={{ x: 1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              >
                <Card
                  style={{
                    boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-foreground">{msg.user.name}</span>
                      <span className="text-[11px] text-muted-foreground">{msg.user.role}</span>
                      <span className="ml-auto text-[11px] font-mono tabular-nums text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-foreground/90">
                      {msg.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
