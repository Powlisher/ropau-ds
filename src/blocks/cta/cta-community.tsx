import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const members = [
  { initials: "SR", color: "bg-primary/15 text-primary" },
  { initials: "ML", color: "bg-accent/15 text-accent" },
  { initials: "TK", color: "bg-chart-3/15 text-chart-3" },
  { initials: "AB", color: "bg-chart-4/15 text-chart-4" },
  { initials: "JW", color: "bg-chart-5/15 text-chart-5" },
]

export default function CtaCommunity() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="flex flex-col items-center gap-6 rounded-2xl bg-muted/40 px-8 py-10 text-center ring-1 ring-foreground/5"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <AvatarGroup>
          {members.map((m) => (
            <Avatar key={m.initials} size="default">
              <AvatarFallback className={m.color}>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>

        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Join the builder community
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Connect with 2,847 engineers and designers shipping real products.
            Weekly office hours, async feedback, and shared playbooks.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <motion.div whileHover={{ y: -2 }} transition={spring}>
            <Button size="lg">Join the community</Button>
          </motion.div>
          <p className="text-xs tabular-nums tracking-wide text-muted-foreground/70">
            2,847 members -- 89 online now
          </p>
        </div>
      </motion.div>
    </section>
  )
}
