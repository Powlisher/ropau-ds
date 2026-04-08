"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { BuildingIcon, DollarSignIcon, PhoneIcon, MailIcon } from "lucide-react"

type Deal = {
  id: string
  company: string
  contact: string
  contactInitials: string
  value: string
  valueNum: number
  lastActivity: string
  probability: number
}

const stages = [
  {
    id: "lead",
    title: "Lead",
    color: "oklch(0.6 0.14 250)",
    deals: [
      { id: "d1", company: "Meridian Health", contact: "Chloe Bergman", contactInitials: "CB", value: "$12,400", valueNum: 12400, lastActivity: "Email sent 2d ago", probability: 15 },
      { id: "d2", company: "Volta Energy", contact: "Rafael Ortega", contactInitials: "RO", value: "$8,750", valueNum: 8750, lastActivity: "Form submitted 5d ago", probability: 10 },
      { id: "d3", company: "Canopy Studios", contact: "Ingrid Haugen", contactInitials: "IH", value: "$23,000", valueNum: 23000, lastActivity: "LinkedIn message 1d ago", probability: 20 },
    ],
  },
  {
    id: "qualified",
    title: "Qualified",
    color: "oklch(0.65 0.16 290)",
    deals: [
      { id: "d4", company: "Axon Logistics", contact: "David Tanaka", contactInitials: "DT", value: "$45,600", valueNum: 45600, lastActivity: "Discovery call yesterday", probability: 35 },
      { id: "d5", company: "Prism Analytics", contact: "Nadia Kowalski", contactInitials: "NK", value: "$18,200", valueNum: 18200, lastActivity: "Demo scheduled Apr 14", probability: 40 },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    color: "oklch(0.7 0.18 55)",
    deals: [
      { id: "d6", company: "Evergreen Finance", contact: "Marcus Webb", contactInitials: "MW", value: "$67,500", valueNum: 67500, lastActivity: "Proposal sent 3d ago", probability: 60 },
      { id: "d7", company: "Helios Robotics", contact: "Yuki Sato", contactInitials: "YS", value: "$34,800", valueNum: 34800, lastActivity: "Awaiting legal review", probability: 55 },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "oklch(0.65 0.18 20)",
    deals: [
      { id: "d8", company: "Nimbus Cloud", contact: "Andrea Fischer", contactInitials: "AF", value: "$92,000", valueNum: 92000, lastActivity: "Contract redlined today", probability: 75 },
    ],
  },
  {
    id: "won",
    title: "Closed Won",
    color: "oklch(0.65 0.18 155)",
    deals: [
      { id: "d9", company: "Tidal Commerce", contact: "James Okonkwo", contactInitials: "JO", value: "$41,300", valueNum: 41300, lastActivity: "Signed Apr 3", probability: 100 },
      { id: "d10", company: "Flux Design Co", contact: "Sophie Laurent", contactInitials: "SL", value: "$28,900", valueNum: 28900, lastActivity: "Signed Mar 28", probability: 100 },
    ],
  },
]

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cardV = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function formatTotal(deals: Deal[]) {
  const total = deals.reduce((s, d) => s + d.valueNum, 0)
  if (total >= 1000) return `$${(total / 1000).toFixed(1)}k`
  return `$${total}`
}

export default function Kanban10() {
  return (
    <div>
      <motion.div
        className="mb-5 flex items-baseline gap-6"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pipeline Value</p>
          <p className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
            $372,450
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Weighted</p>
          <p className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
            $168,730
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deals</p>
          <p className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">
            10
          </p>
        </div>
      </motion.div>

      <motion.div className="flex gap-4 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
        {stages.map((stage) => (
          <motion.div key={stage.id} variants={colVariants} className="w-72 shrink-0">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <h3 className="text-sm font-semibold tracking-tight text-foreground">{stage.title}</h3>
              </div>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">{formatTotal(stage.deals)}</span>
            </div>

            <div className="mb-3 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full" style={{ backgroundColor: stage.color, width: `${(stage.deals.length / 4) * 100}%` }} />
            </div>

            <div className="space-y-2.5">
              {stage.deals.map((deal) => (
                <motion.div key={deal.id} variants={cardV} whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                  <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                    <CardContent className="p-3.5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <BuildingIcon className="size-3.5 text-muted-foreground" />
                          <span className="text-sm font-semibold tracking-tight text-foreground">{deal.company}</span>
                        </div>
                      </div>

                      <div className="mb-3 flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback className="text-[9px]">{deal.contactInitials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{deal.contact}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSignIcon className="size-3 text-emerald-600" />
                          <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{deal.value}</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5">
                          <span className="font-mono text-[10px] font-semibold tabular-nums text-muted-foreground">{deal.probability}%</span>
                        </div>
                      </div>

                      <p className="mt-2.5 text-[11px] text-muted-foreground">{deal.lastActivity}</p>

                      <div className="mt-2.5 flex gap-1.5 border-t border-border/40 pt-2.5">
                        <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <PhoneIcon className="size-3.5" />
                        </button>
                        <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <MailIcon className="size-3.5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
