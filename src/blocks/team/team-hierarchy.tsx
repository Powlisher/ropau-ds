"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const org = {
  ceo: { name: "Sophie Laurent", role: "CEO & Co-founder", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=128&h=128&fit=crop&crop=face", initials: "SL" },
  vps: [
    { name: "Claire Dubois", role: "VP Engineering", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face", initials: "CD" },
    { name: "Marco Bellini", role: "VP Design", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face", initials: "MB" },
    { name: "Omar Hassan", role: "VP Product", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face", initials: "OH" },
  ],
  teams: [
    [
      { name: "Yuki Tanaka", role: "Backend", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face", initials: "YT" },
      { name: "Leo Fontaine", role: "Frontend", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face", initials: "LF" },
    ],
    [
      { name: "Ines Garcia", role: "UX Research", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face", initials: "IG" },
    ],
    [
      { name: "Niklas Braun", role: "Analytics", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face", initials: "NB" },
      { name: "Alix Moreau", role: "Growth", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face", initials: "AM" },
    ],
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function PersonCard({ person, size = "md" }: { person: { name: string; role: string; avatar: string; initials: string }; size?: "sm" | "md" | "lg" }) {
  const avatarSize = size === "lg" ? "size-16" : size === "md" ? "size-12" : "size-9"
  const nameSize = size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs"

  return (
    <Card
      className="w-fit"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardContent className="flex items-center gap-3 px-4 py-3">
        <Avatar className={`${avatarSize} ring-2 ring-foreground/5`}>
          <AvatarImage src={person.avatar} alt={person.name} />
          <AvatarFallback className="text-xs font-semibold">{person.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className={`${nameSize} font-semibold leading-snug`}>{person.name}</p>
          <p className="text-xs text-muted-foreground">{person.role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TeamHierarchy() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full flex-col items-center gap-8 py-8"
    >
      <motion.div variants={itemVariants}>
        <PersonCard person={org.ceo} size="lg" />
      </motion.div>

      <div className="h-8 w-px bg-border" />

      <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-center gap-6">
        {org.vps.map((vp) => (
          <div key={vp.name} className="flex flex-col items-center gap-4">
            <PersonCard person={vp} size="md" />
          </div>
        ))}
      </motion.div>

      <div className="h-6 w-px bg-border" />

      <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-center gap-10">
        {org.teams.map((team, ti) => (
          <div key={ti} className="flex flex-col items-center gap-3">
            <div className="h-4 w-px bg-border" />
            <div className="flex flex-wrap justify-center gap-3">
              {team.map((member) => (
                <PersonCard key={member.name} person={member} size="sm" />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
