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

const hero = {
  category: "Long Read",
  title: "The Invisible Architecture of Fast Software",
  excerpt:
    "Performance is not a feature you bolt on. It is a consequence of thousands of small decisions made consistently over years. This essay examines five architectural patterns that quietly determine whether software feels instant or sluggish.",
  author: "Elena Marchetti",
  initials: "EM",
  date: "Mar 24, 2026",
  readTime: "18 min",
}

const columns = [
  [
    {
      category: "Essay",
      title: "Against Configuration: The Case for Sensible Defaults",
      excerpt:
        "Every config option is an admission that you could not decide. We reduced our settings surface by 80% and NPS climbed 12 points.",
      author: "James Okafor",
      initials: "JO",
      date: "Mar 17, 2026",
    },
    {
      category: "Craft",
      title: "On Naming Things Well",
      excerpt:
        "The two hardest problems in CS. We developed a naming framework that reduced code review comments about naming by 67%.",
      author: "Ines Moreau",
      initials: "IM",
      date: "Mar 3, 2026",
    },
  ],
  [
    {
      category: "Opinion",
      title: "Microservices Were a Scaling Decision, Not an Architecture One",
      excerpt:
        "Most teams adopt microservices before they need them. The monolith served us well at 50 engineers. Here is where it finally broke.",
      author: "Kai Nakamura",
      initials: "KN",
      date: "Mar 10, 2026",
    },
    {
      category: "Research",
      title: "Measuring Developer Experience Without Surveys",
      excerpt:
        "DORA metrics plus git signal analysis gave us a continuous DX score that correlated with survey results at 0.87.",
      author: "Amara Diallo",
      initials: "AD",
      date: "Feb 22, 2026",
    },
  ],
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BlogEditorial() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card
            className="group cursor-pointer overflow-hidden transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04),0_16px_32px_rgba(20,20,15,0.04)]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{hero.category}</Badge>
                <span className="text-xs tabular-nums tracking-wide text-muted-foreground">
                  {hero.readTime} read
                </span>
              </div>
              <h2 className="mt-5 max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors sm:text-3xl lg:text-[2rem]">
                {hero.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {hero.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar size="default">
                  <AvatarFallback>{hero.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {hero.author}
                  </p>
                  <p className="text-xs tabular-nums tracking-wide text-muted-foreground">
                    {hero.date}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6">
              {col.map((article) => (
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
                      <div className="mt-4 flex items-center gap-2">
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
