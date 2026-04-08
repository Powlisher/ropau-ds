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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const articles = [
  {
    category: "Engineering",
    title: "Building Idempotent APIs: A Practical Guide",
    excerpt:
      "Idempotency keys, request deduplication, and the state machine pattern that eliminated double-charge bugs across our payment flow.",
    author: "Ravi Chandra",
    initials: "RC",
    date: "Mar 20, 2026",
  },
  {
    category: "Design",
    title: "The Spacing System Nobody Notices",
    excerpt:
      "Good spacing is invisible. Our 4-8-12-16-24 scale and the optical adjustment rules that make layouts feel cohesive without rigid grids.",
    author: "Tomoko Arai",
    initials: "TA",
    date: "Mar 13, 2026",
  },
  {
    category: "Product",
    title: "How We Prioritize Without Story Points",
    excerpt:
      "We replaced estimation with impact mapping and cycle time tracking. Delivery predictability improved from 43% to 81%.",
    author: "Clara Novak",
    initials: "CN",
    date: "Mar 6, 2026",
  },
]

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

export default function BlogNewsletter() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 lg:grid-cols-[1fr_340px]"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Recent posts
            </h2>
          </div>
          {articles.map((article) => (
            <motion.div key={article.title} variants={itemVariants}>
              <Card
                className="group cursor-pointer transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader className="gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-fit">
                      {article.category}
                    </Badge>
                    <span className="text-xs tabular-nums tracking-wide text-muted-foreground">
                      {article.date}
                    </span>
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                  <div className="mt-4 flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>{article.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-foreground">
                      {article.author}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="lg:sticky lg:top-8 lg:self-start">
          <Card
            className="bg-muted/30"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Stay in the loop</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                One email per week. Engineering insights, product updates, and
                the occasional deep dive. No fluff. Unsubscribe anytime.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input type="email" placeholder="you@company.com" />
              <Button className="w-full">Subscribe</Button>
              <p className="text-center text-xs text-muted-foreground">
                <span className="tabular-nums">4,823</span> engineers already
                subscribed
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
