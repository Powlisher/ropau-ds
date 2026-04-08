"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const featured = {
  quote:
    "Switching to this platform was the single most impactful infrastructure decision we made in 2025. Our team ships faster, sleeps better, and spends less time on toil. The observability features alone would justify the cost, but the developer experience is what keeps engineers advocating for it internally.",
  name: "Luca Ferretti",
  role: "CTO, Finvest",
  initials: "LF",
}

const secondary = [
  {
    quote:
      "Test parallelization dropped our CI from 22 minutes to 4. Engineers stopped context-switching while waiting for green builds.",
    name: "Anja Kowalski",
    role: "Data Lead, Meridian Labs",
    initials: "AK",
  },
  {
    quote:
      "The API design is so clean that our junior engineers are productive from day one. That is rare in infrastructure tooling.",
    name: "Daisuke Mori",
    role: "VP Engineering, Sakura AI",
    initials: "DM",
  },
  {
    quote:
      "We evaluated this against building in-house. The feature parity would have taken our team 18 months. We were live in 3 days.",
    name: "Nora Bjornstad",
    role: "Principal Engineer, Auroratech",
    initials: "NB",
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

export default function TestimonialsFeaturedHero() {
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
            className="bg-muted/20"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="px-8 py-10 sm:px-12 sm:py-12">
              <svg
                className="mb-4 size-8 text-primary/30"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
              <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                {featured.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{featured.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium text-foreground">
                    {featured.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {featured.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3">
          {secondary.map((t) => (
            <motion.div key={t.name} variants={itemVariants}>
              <Card
                className="h-full transition-shadow duration-200 hover:[box-shadow:0_1px_2px_rgba(20,20,15,0.04),0_2px_4px_rgba(20,20,15,0.04),0_4px_8px_rgba(20,20,15,0.04),0_8px_16px_rgba(20,20,15,0.04)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="pt-1">
                  <blockquote className="text-sm leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
