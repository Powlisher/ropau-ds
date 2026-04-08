"use client"

import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const articles = [
  { title: "The Future of Remote Work in 2026", category: "Business", readTime: "4 min", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop" },
  { title: "Designing for Accessibility Beyond WCAG", category: "Design", readTime: "6 min", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=200&fit=crop" },
  { title: "Sustainable Supply Chains: A Practical Guide", category: "Sustainability", readTime: "8 min", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=200&fit=crop" },
  { title: "How We Reduced Build Times by 70%", category: "Engineering", readTime: "5 min", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop" },
  { title: "Customer Research on a Budget", category: "Product", readTime: "3 min", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=200&fit=crop" },
  { title: "Typography Systems That Scale", category: "Design", readTime: "7 min", image: "https://images.unsplash.com/photo-1567095751004-aa51a2690368?w=300&h=200&fit=crop" },
  { title: "Mentorship Programs That Actually Work", category: "Culture", readTime: "5 min", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" },
  { title: "API Design Patterns for 2026", category: "Engineering", readTime: "9 min", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=200&fit=crop" },
  { title: "Brand Voice: Finding Yours", category: "Marketing", readTime: "4 min", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop" },
  { title: "Data Privacy in the AI Era", category: "Business", readTime: "6 min", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop" },
  { title: "Cross-Functional Team Structures", category: "Culture", readTime: "5 min", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop" },
  { title: "Performance Budgets in Practice", category: "Engineering", readTime: "7 min", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=200&fit=crop" },
]

const topRow = articles.filter((_, i) => i % 2 === 0)
const bottomRow = articles.filter((_, i) => i % 2 === 1)

function ArticleCard({ article }: { article: (typeof articles)[0] }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={spring}>
      <Card
        className="overflow-hidden"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="aspect-[3/2] w-full overflow-hidden bg-secondary">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>
        <CardContent className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{article.readTime}</span>
          </div>
          <h3 className="line-clamp-2 font-heading text-sm font-semibold tracking-tight text-foreground">
            {article.title}
          </h3>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CarouselMultiRow() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Latest Articles
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{articles.length} stories</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
        className="space-y-4"
      >
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {topRow.map((article) => (
              <CarouselItem key={article.title} className="basis-1/2 pl-4 md:basis-1/3">
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {bottomRow.map((article) => (
              <CarouselItem key={article.title} className="basis-1/2 pl-4 md:basis-1/3">
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  )
}
