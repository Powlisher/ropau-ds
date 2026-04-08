"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const roster = [
  { name: "Claire Dubois", number: "07", position: "Captain", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face", initials: "CD" },
  { name: "Marco Bellini", number: "11", position: "Striker", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face", initials: "MB" },
  { name: "Yuki Tanaka", number: "03", position: "Midfielder", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&crop=face", initials: "YT" },
  { name: "Omar Hassan", number: "22", position: "Defender", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=face", initials: "OH" },
  { name: "Sara Lindqvist", number: "01", position: "Goalkeeper", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=face", initials: "SL" },
  { name: "Leo Fontaine", number: "14", position: "Midfielder", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=face", initials: "LF" },
  { name: "Ines Garcia", number: "09", position: "Forward", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&crop=face", initials: "IG" },
  { name: "Niklas Braun", number: "05", position: "Defender", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=face", initials: "NB" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamRoster() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Squad</h2>
        <p className="mt-1 text-sm text-muted-foreground">Season 2025-26 roster</p>
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {roster.map((player) => (
          <motion.div
            key={player.name}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group flex flex-col items-center gap-3 rounded-2xl bg-card p-5 ring-1 ring-foreground/5 transition-all"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="relative">
              <Avatar className="size-20 ring-2 ring-foreground/5 sm:size-24">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback className="text-xl font-bold">{player.initials}</AvatarFallback>
              </Avatar>
              <Badge className="absolute -right-2 -top-1 font-mono text-sm tabular-nums">
                {player.number}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold leading-snug">{player.name}</p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {player.position}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
