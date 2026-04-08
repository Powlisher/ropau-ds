"use client"

import { StarIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

export default function HeroTestimonial() {
  return (
    <section className="w-full px-6 py-20 md:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Loved by teams
            <br />
            who ship daily
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            Join thousands of engineers and designers building faster with a
            system they actually enjoy using.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 pt-2"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button size="lg">Try it free</Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button variant="outline" size="lg">
                Read case studies
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 22, delay: 0.2 }}
        >
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="flex flex-col gap-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <blockquote className="text-base leading-relaxed text-foreground">
                &ldquo;We migrated our entire design system in three weeks.
                The component quality is insane -- accessibility, animations,
                dark mode, all handled. Our team velocity went up 40% and
                we haven&apos;t looked back.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-1">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    CL
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Camille Laurent
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Head of Engineering, Stelara
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
