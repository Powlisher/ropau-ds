"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const articles = [
  {
    category: "Engineering",
    title: "Why We Rewrote Our Query Engine in Rust",
    excerpt:
      "After 18 months on a Node pipeline, p99 latency sat at 340ms. The rewrite brought it to 12ms and cut our compute bill by 63%.",
    author: "Elena Marchetti",
    initials: "EM",
    date: "Mar 14, 2026",
    image: "bg-gradient-to-br from-primary/20 via-primary/5 to-transparent",
  },
  {
    category: "Design",
    title: "Crafting a Type Scale That Actually Works",
    excerpt:
      "Most type scales look great in Figma and collapse on real content. Here is the 5-step audit we run before shipping any new hierarchy.",
    author: "Tomoko Arai",
    initials: "TA",
    date: "Feb 28, 2026",
    image: "bg-gradient-to-br from-accent/15 via-accent/5 to-transparent",
  },
  {
    category: "Product",
    title: "The Signal-to-Noise Problem in Alerting",
    excerpt:
      "Our users ignored 74% of alerts. We redesigned the severity model around user-defined impact thresholds and saw engagement climb to 91%.",
    author: "James Okafor",
    initials: "JO",
    date: "Feb 11, 2026",
    image: "bg-gradient-to-br from-chart-3/15 via-chart-3/5 to-transparent",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogCardsGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          From the blog
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Deep dives on engineering, design, and the decisions behind the
          product.
        </p>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.div key={article.title} variants={itemVariants}>
            <Card
              className="group cursor-pointer transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
              }}
            >
              <div
                className={`mx-4 h-40 rounded-lg ${article.image}`}
                aria-hidden="true"
              />
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
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{article.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">
                      {article.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      &middot;
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground tracking-wide">
                      {article.date}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
