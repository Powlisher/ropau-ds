"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const articles = [
  {
    category: "Performance",
    title: "Shaving 200ms Off Every Page Load",
    excerpt:
      "Critical CSS inlining, image priority hints, and a font loading strategy that eliminated layout shift for 97% of visits.",
    author: "Lina Bergstrom",
    initials: "LB",
    date: "Mar 21, 2026",
  },
  {
    category: "Security",
    title: "Our Zero-Trust Journey: Year One Retrospective",
    excerpt:
      "We moved from perimeter security to zero-trust in 11 months. Here is what broke, what held, and what we would skip next time.",
    author: "Omar Hassan",
    initials: "OH",
    date: "Mar 14, 2026",
  },
  {
    category: "Design Systems",
    title: "When Your Design System Becomes the Bottleneck",
    excerpt:
      "At 140 components, our DS slowed teams down instead of speeding them up. The pruning strategy that brought us back to 62.",
    author: "Ines Moreau",
    initials: "IM",
    date: "Mar 7, 2026",
  },
  {
    category: "Data",
    title: "Real-Time Pipelines at 850K Events Per Second",
    excerpt:
      "Kafka, Flink, and a custom backpressure mechanism that kept our analytics pipeline stable during Black Friday traffic.",
    author: "Wei Zhang",
    initials: "WZ",
    date: "Feb 28, 2026",
  },
  {
    category: "Mobile",
    title: "React Native to Native: A Measured Decision",
    excerpt:
      "We loved RN for velocity. But at 60fps animation requirements, we needed native. The hybrid strategy that let us keep both.",
    author: "Clara Novak",
    initials: "CN",
    date: "Feb 19, 2026",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.offsetWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Latest articles
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Engineering insights from the team.
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12L6 8l4-4" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 12l4-4-4-4" />
            </svg>
          </Button>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.div
            key={article.title}
            variants={itemVariants}
            className="w-[300px] flex-none sm:w-[340px]"
          >
            <Card
              className="group h-full cursor-pointer transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
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
              <CardContent className="flex-1">
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
    </section>
  )
}
