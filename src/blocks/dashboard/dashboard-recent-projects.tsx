"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const projects = [
  {
    name: "Checkout Redesign",
    description: "Streamline the purchase flow to reduce cart abandonment by 20%",
    progress: 78,
    status: "On Track",
    team: ["EM", "TR", "SD"],
    updated: "Apr 5, 2026",
  },
  {
    name: "API v3 Migration",
    description: "Migrate all endpoints to the new REST v3 specification",
    progress: 45,
    status: "At Risk",
    team: ["MC", "TR"],
    updated: "Apr 3, 2026",
  },
  {
    name: "Mobile App Launch",
    description: "iOS and Android apps with core feature parity to web",
    progress: 92,
    status: "On Track",
    team: ["AP", "JE", "CR", "SD"],
    updated: "Apr 1, 2026",
  },
  {
    name: "Analytics Dashboard",
    description: "Real-time metrics dashboard for sales and marketing teams",
    progress: 31,
    status: "Planning",
    team: ["EM", "MC"],
    updated: "Mar 28, 2026",
  },
]

const statusVariants: Record<string, string> = {
  "On Track": "secondary",
  "At Risk": "destructive",
  Planning: "outline",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardRecentProjects() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">Recent Projects</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Your active workstreams</p>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div
            key={project.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Card
              className="h-full cursor-pointer"
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <Badge variant={statusVariants[project.status] as "secondary" | "destructive" | "outline"}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">{project.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <AvatarGroup>
                    {project.team.map((member) => (
                      <Avatar key={member} size="sm">
                        <AvatarFallback>{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="text-[11px] tabular-nums text-muted-foreground">{project.updated}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
