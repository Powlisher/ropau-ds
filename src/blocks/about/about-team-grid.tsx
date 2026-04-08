"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const members = [
  { name: "Sophie Laurent", role: "CEO", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop&crop=face", initials: "SL" },
  { name: "Thomas Nguyen", role: "CTO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face", initials: "TN" },
  { name: "Claire Dubois", role: "Engineering Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face", initials: "CD" },
  { name: "Marco Bellini", role: "Design Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face", initials: "MB" },
  { name: "Yuki Tanaka", role: "Backend Engineer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face", initials: "YT" },
  { name: "Omar Hassan", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face", initials: "OH" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutTeamGrid() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          The people behind Ropau
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A small team doing work that matters.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
        {members.map((m) => (
          <motion.div
            key={m.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card
              className="text-center"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="flex flex-col items-center gap-3 pt-2">
                <Avatar className="size-16 ring-2 ring-foreground/5 sm:size-20">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback className="text-base font-semibold">{m.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold leading-snug">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
