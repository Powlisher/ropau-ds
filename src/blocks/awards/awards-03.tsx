"use client"

import { motion } from "framer-motion"
import { LockIcon, ZapIcon, FlameIcon, TargetIcon, RocketIcon, HeartIcon, StarIcon, ShieldIcon, BrainIcon } from "lucide-react"

const badges = [
  { name: "First Contribution", desc: "Submit your first piece of work", icon: ZapIcon, earned: true, date: "Jan 15" },
  { name: "Team Player", desc: "Collaborate on 10 cross-team projects", icon: HeartIcon, earned: true, date: "Feb 3" },
  { name: "Innovation Spark", desc: "Have a proposal accepted by leadership", icon: RocketIcon, earned: true, date: "Mar 8" },
  { name: "Streak Master", desc: "Maintain a 30-day activity streak", icon: FlameIcon, earned: true, date: "Mar 22" },
  { name: "Mentor", desc: "Guide 3 team members through onboarding", icon: ShieldIcon, earned: false, progress: 67 },
  { name: "Sharpshooter", desc: "Hit 5 quarterly targets in a row", icon: TargetIcon, earned: false, progress: 40 },
  { name: "Thought Leader", desc: "Publish 12 internal knowledge posts", icon: BrainIcon, earned: false, progress: 25 },
  { name: "All-Star", desc: "Earn every badge in a single year", icon: StarIcon, earned: false, progress: 0 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards03() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Achievement Badges
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          4 of 8 earned. Keep going to unlock the full collection.
        </p>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <motion.div key={badge.name} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={spring}
                className={`relative flex flex-col items-center gap-3 rounded-xl p-6 text-center ring-1 ${
                  badge.earned
                    ? "bg-card ring-border"
                    : "bg-muted/30 ring-border/50"
                }`}
                style={{
                  boxShadow: badge.earned
                    ? "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)"
                    : "none",
                }}
              >
                <div className={`flex size-14 items-center justify-center rounded-2xl ${
                  badge.earned
                    ? "bg-primary/10"
                    : "bg-muted"
                }`}>
                  {badge.earned ? (
                    <Icon className="size-6 text-primary" />
                  ) : (
                    <LockIcon className="size-5 text-muted-foreground/50" />
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-semibold tracking-tight ${
                    badge.earned ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {badge.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {badge.desc}
                  </p>
                </div>
                {badge.earned ? (
                  <span className="text-[10px] font-medium tabular-nums text-primary">
                    Earned {badge.date}
                  </span>
                ) : (
                  <div className="w-full">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/40 transition-all"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <span className="mt-1 block text-[10px] font-mono tabular-nums text-muted-foreground">
                      {badge.progress}%
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
