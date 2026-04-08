"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const archive = [
  {
    year: "2026",
    months: [
      {
        month: "March",
        articles: [
          { title: "Real-time collaboration cursors", date: "Mar 22" },
          { title: "Why We Rewrote Our Query Engine in Rust", date: "Mar 14" },
          { title: "Crafting a Type Scale That Actually Works", date: "Mar 12" },
          { title: "Postgres Advisory Locks for Job Queues", date: "Mar 8" },
        ],
      },
      {
        month: "February",
        articles: [
          { title: "The Signal-to-Noise Problem in Alerting", date: "Feb 28" },
          { title: "Edge Computing for Real-Time Collaboration", date: "Feb 20" },
          { title: "Color Systems Beyond Design Tokens", date: "Feb 14" },
        ],
      },
      {
        month: "January",
        articles: [
          { title: "Our 2025 Year in Review", date: "Jan 31" },
          { title: "Scaling WebSocket Connections to 500K", date: "Jan 18" },
          { title: "The Case for Boring Technology in 2026", date: "Jan 5" },
        ],
      },
    ],
  },
  {
    year: "2025",
    months: [
      {
        month: "December",
        articles: [
          { title: "Migrating 4TB of Live Data Without Downtime", date: "Dec 19" },
          { title: "How We Prioritize Without Story Points", date: "Dec 8" },
        ],
      },
      {
        month: "November",
        articles: [
          { title: "Building Idempotent APIs: A Practical Guide", date: "Nov 22" },
          { title: "Feature Flags at Scale: Lessons from 2,400 Flags", date: "Nov 11" },
          { title: "Against Configuration: The Case for Sensible Defaults", date: "Nov 3" },
        ],
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogArchive() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="mb-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Archive
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Every post, organized by date.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {archive.map((yearGroup) => (
          <motion.div key={yearGroup.year} variants={itemVariants}>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {yearGroup.year}
            </h3>
            <div className="mt-6 space-y-8">
              {yearGroup.months.map((monthGroup) => (
                <div key={monthGroup.month}>
                  <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {monthGroup.month}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {monthGroup.articles.map((article) => (
                      <motion.li
                        key={article.title}
                        variants={itemVariants}
                        className="group flex items-baseline gap-3"
                      >
                        <Badge
                          variant="outline"
                          className="shrink-0 font-mono text-[0.65rem] tabular-nums"
                        >
                          {article.date}
                        </Badge>
                        <a
                          href="#"
                          className="text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                        >
                          {article.title}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
