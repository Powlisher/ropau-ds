"use client"

import { motion } from "framer-motion"
import { BellIcon, MailIcon, MessageSquareIcon, InboxIcon } from "lucide-react"

const items = [
  { icon: BellIcon, label: "Notifications", count: 3 },
  { icon: MailIcon, label: "Messages", count: 14 },
  { icon: MessageSquareIcon, label: "Comments", count: 0 },
  { icon: InboxIcon, label: "Inbox", count: 127 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase05() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Notification dots
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Numeric and dot indicators for unread states
      </p>
      <motion.div
        className="flex items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/80">
                <item.icon className="size-4.5" />
              </div>
              {item.count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 500,
                    damping: 20,
                    delay: 0.3,
                  }}
                  className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold tabular-nums text-white ring-2 ring-card"
                >
                  {item.count > 99 ? "99+" : item.count}
                </motion.span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
