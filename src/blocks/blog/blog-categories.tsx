"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const categories = ["All", "Engineering", "Design", "Product", "Culture"]

const articles = [
  {
    category: "Engineering",
    title: "Postgres Advisory Locks for Job Queues",
    excerpt:
      "We replaced our Redis-based job queue with Postgres advisory locks. Throughput dropped 12% but operational complexity dropped 90%.",
    author: "Hugo Lindqvist",
    initials: "HL",
    date: "Mar 19, 2026",
  },
  {
    category: "Design",
    title: "Why We Stopped Using Figma Auto-Layout for Everything",
    excerpt:
      "Auto-layout is powerful, but it trained our team to think in stacks. We reintroduced absolute positioning for editorial layouts.",
    author: "Mei Chen",
    initials: "MC",
    date: "Mar 12, 2026",
  },
  {
    category: "Product",
    title: "Feature Flags at Scale: Lessons from 2,400 Flags",
    excerpt:
      "Technical debt accumulates in flags too. Our quarterly flag audit process and the tooling we built to enforce it.",
    author: "Andre Kowalski",
    initials: "AK",
    date: "Mar 5, 2026",
  },
  {
    category: "Culture",
    title: "The Architecture Review That Changed Our Culture",
    excerpt:
      "We turned architecture reviews from gatekeeping ceremonies into collaborative design sessions. Shipping velocity increased 34%.",
    author: "Farah Al-Rashid",
    initials: "FA",
    date: "Feb 27, 2026",
  },
  {
    category: "Engineering",
    title: "Edge Computing for Real-Time Collaboration",
    excerpt:
      "Moving CRDT resolution to the edge reduced merge latency from 180ms to 23ms for users outside North America.",
    author: "Tomas Eriksson",
    initials: "TE",
    date: "Feb 20, 2026",
  },
  {
    category: "Design",
    title: "Color Systems Beyond Design Tokens",
    excerpt:
      "Tokens solve consistency but not harmony. We built a perceptual color system that generates accessible palettes from a single seed.",
    author: "Yuki Tanaka",
    initials: "YT",
    date: "Feb 14, 2026",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogCategories() {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All"
      ? articles
      : articles.filter((a) => a.category === active)

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Explore by topic
        </h2>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            onClick={() => setActive(cat)}
          >
            <Badge
              variant={active === cat ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm"
            >
              {cat}
            </Badge>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filtered.map((article) => (
            <motion.div key={article.title} variants={itemVariants}>
              <Card
                className="group cursor-pointer transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader className="gap-2">
                  <Badge variant="secondary" className="w-fit">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardContent>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>{article.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-foreground">
                      {article.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      &middot;
                    </span>
                    <span className="text-xs tabular-nums tracking-wide text-muted-foreground">
                      {article.date}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
