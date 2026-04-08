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

const featured = {
  category: "Deep Dive",
  title: "Building a Distributed Cache That Survives Network Partitions",
  excerpt:
    "When we hit 2.3M concurrent connections, our Redis cluster started dropping writes during partial outages. This is how we designed a cache layer that handles partition tolerance without sacrificing read consistency, and what we learned about CAP trade-offs in practice.",
  author: "Sofia Petrovska",
  initials: "SP",
  date: "Mar 22, 2026",
}

const secondary = [
  {
    category: "Culture",
    title: "How Our On-Call Rotation Went from Dreaded to Desired",
    excerpt:
      "We reduced on-call incidents by 78% and turned the rotation into a learning opportunity engineers actually volunteer for.",
    author: "Kai Nakamura",
    initials: "KN",
    date: "Mar 18, 2026",
  },
  {
    category: "Infrastructure",
    title: "Migrating 4TB of Live Data Without Downtime",
    excerpt:
      "A dual-write strategy, shadow reads, and 14 days of paranoia got us from Postgres 12 to 16 with zero user-facing errors.",
    author: "Amara Diallo",
    initials: "AD",
    date: "Mar 9, 2026",
  },
  {
    category: "Product",
    title: "The Metrics That Actually Predict Churn",
    excerpt:
      "We tracked 47 signals. Only 5 mattered. Frequency of feature X usage was 3.2x more predictive than NPS score.",
    author: "Ravi Chandra",
    initials: "RC",
    date: "Feb 25, 2026",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogFeatured() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <Card
            className="group cursor-pointer overflow-hidden transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04),0_16px_32px_rgba(20,20,15,0.04)]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="grid md:grid-cols-2">
              <div className="h-56 bg-gradient-to-br from-primary/20 via-primary/8 to-accent/5 md:h-auto" />
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <Badge variant="secondary" className="mb-4 w-fit">
                  {featured.category}
                </Badge>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors sm:text-2xl lg:text-[1.65rem]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar size="default">
                    <AvatarFallback>{featured.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {featured.author}
                    </p>
                    <p className="text-xs tabular-nums tracking-wide text-muted-foreground">
                      {featured.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondary.map((article) => (
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
        </div>
      </motion.div>
    </section>
  )
}
