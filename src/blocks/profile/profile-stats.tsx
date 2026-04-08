"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const user = {
  name: "Elise Marchetti",
  handle: "@elise.m",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&crop=face",
  bio: "Building interfaces that feel inevitable. Design engineer who codes.",
  stats: [
    { label: "Posts", value: "247" },
    { label: "Followers", value: "12.4k" },
    { label: "Following", value: "891" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfileStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardContent className="flex flex-col items-center gap-5 pt-2">
            <Avatar className="size-20 ring-2 ring-foreground/5">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl font-semibold">EM</AvatarFallback>
            </Avatar>

            <div className="space-y-1 text-center">
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground">{user.handle}</p>
            </div>

            <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
              {user.bio}
            </p>

            <div className="flex w-full items-center justify-around rounded-xl bg-muted/50 px-4 py-3.5">
              {user.stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-lg font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex w-full gap-3">
              <Button className="flex-1">Follow</Button>
              <Button variant="outline" className="flex-1">
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
