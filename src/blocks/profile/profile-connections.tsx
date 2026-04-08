"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"
import { motion } from "framer-motion"

const connections = [
  { name: "Margaux Petit", role: "Design Lead at Linear", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face", mutual: 14, connected: true },
  { name: "Julien Arnaud", role: "Senior SRE at Datadog", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face", mutual: 8, connected: true },
  { name: "Sophia Chen", role: "Product Manager at Notion", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face", mutual: 23, connected: false },
  { name: "Karim Benziane", role: "CTO at Pennylane", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face", mutual: 5, connected: false },
  { name: "Alix Moreau", role: "Staff Engineer at Stripe", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face", mutual: 31, connected: true },
  { name: "Nils Eriksson", role: "Founding Designer at Klarna", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face", mutual: 2, connected: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfileConnections() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {connections.map((person) => (
            <motion.div
              key={person.name}
              variants={itemVariants}
              className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50"
            >
              <Avatar className="size-10">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback className="text-sm font-medium">
                  {person.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug">{person.name}</p>
                <p className="truncate text-xs text-muted-foreground">{person.role}</p>
              </div>

              <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
                {person.mutual} mutual
              </span>

              {person.connected ? (
                <Button variant="outline" size="sm" className="gap-1 text-muted-foreground">
                  <CheckIcon className="size-3" />
                  Connected
                </Button>
              ) : (
                <Button size="sm">Connect</Button>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
