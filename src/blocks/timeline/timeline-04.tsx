"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Code,
  Palette,
  MessageSquare,
  Shield,
  Bug,
  Megaphone,
  Database,
  Wrench,
} from "lucide-react"

const categories = {
  engineering: { icon: Code, bg: "bg-sky-100", text: "text-sky-700", label: "Engineering" },
  design: { icon: Palette, bg: "bg-violet-100", text: "text-violet-700", label: "Design" },
  support: { icon: MessageSquare, bg: "bg-amber-100", text: "text-amber-700", label: "Support" },
  security: { icon: Shield, bg: "bg-rose-100", text: "text-rose-700", label: "Security" },
  bugfix: { icon: Bug, bg: "bg-orange-100", text: "text-orange-700", label: "Bug Fix" },
  marketing: { icon: Megaphone, bg: "bg-emerald-100", text: "text-emerald-700", label: "Marketing" },
  data: { icon: Database, bg: "bg-indigo-100", text: "text-indigo-700", label: "Data" },
  ops: { icon: Wrench, bg: "bg-slate-100", text: "text-slate-700", label: "Ops" },
}

type Category = keyof typeof categories

const events = [
  { date: "Apr 7", category: "security" as Category, title: "SSL certificates rotated", description: "Automated rotation for 23 wildcard certs across staging and production environments." },
  { date: "Apr 6", category: "engineering" as Category, title: "Websocket gateway refactor", description: "Migrated from socket.io to native WS. Connection time dropped from 340ms to 85ms." },
  { date: "Apr 5", category: "design" as Category, title: "Design system V3 tokens published", description: "New semantic color tokens with dark mode support. 47 components updated." },
  { date: "Apr 4", category: "bugfix" as Category, title: "Fixed race condition in cart sync", description: "Concurrent quantity updates now resolved via optimistic locking. Affected ~180 orders/week." },
  { date: "Apr 3", category: "marketing" as Category, title: "Q2 campaign assets approved", description: "Final review on 12 ad creatives and 3 landing page variants for the spring launch." },
  { date: "Apr 2", category: "data" as Category, title: "Analytics pipeline migration", description: "Moved from Segment to first-party collection. Expected savings of $4,200/month." },
  { date: "Apr 1", category: "support" as Category, title: "Knowledge base restructured", description: "Reorganized 340 articles into 28 categories. Internal search relevance improved 31%." },
  { date: "Mar 31", category: "ops" as Category, title: "Terraform modules updated", description: "Upgraded AWS provider to v5.x. Applied drift corrections across 8 environments." },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Timeline04() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Team Updates</h2>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Cross-functional activity log</p>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />

        <div className="space-y-5">
          {events.map((event) => {
            const cat = categories[event.category]
            const Icon = cat.icon

            return (
              <motion.div
                key={event.title}
                variants={itemVariants}
                className="relative flex gap-4"
              >
                <div className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl ${cat.bg} ring-4 ring-background`}>
                  <Icon className={`size-4.5 ${cat.text}`} />
                </div>

                <motion.div
                  className="flex-1"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                >
                  <Card
                    style={{
                      boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="secondary" className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0">
                          {cat.label}
                        </Badge>
                        <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{event.date}</span>
                      </div>
                      <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
