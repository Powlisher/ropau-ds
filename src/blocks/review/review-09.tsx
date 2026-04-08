"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const criteria = ["Design", "Performance", "Value", "Durability"]

const reviewers = [
  {
    id: 1,
    name: "Alice Munier",
    initials: "AM",
    role: "Product Designer",
    ratings: { Design: 5, Performance: 4, Value: 4, Durability: 5 },
    verdict: "Best in class for design teams. The attention to visual detail sets it apart.",
  },
  {
    id: 2,
    name: "Thomas Ricard",
    initials: "TR",
    role: "Engineering Lead",
    ratings: { Design: 3, Performance: 5, Value: 3, Durability: 4 },
    verdict: "Rock-solid performance. A bit pricey for what you get but reliability matters more.",
  },
  {
    id: 3,
    name: "Nadia Kessler",
    initials: "NK",
    role: "Freelance Consultant",
    ratings: { Design: 4, Performance: 4, Value: 5, Durability: 3 },
    verdict: "Incredible value at this price point. Minor durability concerns after 6 months of daily use.",
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`size-3 ${s <= count ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/15"}`} />
      ))}
    </div>
  )
}

export default function Review09() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
            Reviewer comparison
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            See how different perspectives rate the same product
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground w-[140px]">
                  Criterion
                </th>
                {reviewers.map((r) => (
                  <th key={r.id} className="pb-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Avatar size="sm">
                        <AvatarFallback>{r.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-heading text-xs font-semibold tracking-tight text-foreground">{r.name}</span>
                      <span className="text-[10px] text-muted-foreground">{r.role}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion} className="border-b border-border/20">
                  <td className="py-3 text-sm font-medium text-foreground/80">{criterion}</td>
                  {reviewers.map((r) => (
                    <td key={r.id} className="py-3 text-center">
                      <div className="flex justify-center">
                        <StarRow count={r.ratings[criterion as keyof typeof r.ratings]} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Verdict</td>
                {reviewers.map((r) => (
                  <td key={r.id} className="pt-4 px-3">
                    <p className="text-xs leading-relaxed text-foreground/75 text-center">{r.verdict}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  )
}
