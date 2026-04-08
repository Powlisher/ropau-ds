"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

const members = [
  {
    name: "Claire Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face",
    initials: "CD",
    role: "Engineering Lead",
    skills: [
      { name: "Rust", level: 92 },
      { name: "Systems Design", level: 88 },
      { name: "Team Leadership", level: 85 },
    ],
    tags: ["Rust", "Go", "Distributed Systems"],
  },
  {
    name: "Marco Bellini",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face",
    initials: "MB",
    role: "Senior Designer",
    skills: [
      { name: "Visual Design", level: 95 },
      { name: "Prototyping", level: 87 },
      { name: "Design Systems", level: 78 },
    ],
    tags: ["Figma", "Motion", "Typography"],
  },
  {
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face",
    initials: "YT",
    role: "Backend Engineer",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "API Design", level: 83 },
      { name: "Performance", level: 76 },
    ],
    tags: ["TypeScript", "PostgreSQL", "Redis"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamSkills() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Team Expertise
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Skill profiles across the team.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <motion.div
            key={m.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card
              className="h-full"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 ring-2 ring-foreground/5">
                    <AvatarImage src={m.avatar} alt={m.name} />
                    <AvatarFallback className="text-sm font-semibold">{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {m.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-medium">{skill.name}</span>
                        <span className="text-[11px] tabular-nums text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
