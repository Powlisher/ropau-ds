"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react"
import { motion } from "framer-motion"

const experience = [
  { company: "Ropau", role: "Principal Engineer", period: "2023 -- present", description: "Leading the design system and real-time collaboration infrastructure." },
  { company: "Datadog", role: "Senior Software Engineer", period: "2020 -- 2023", description: "Built the anomaly detection pipeline processing 4.2B metrics/day." },
  { company: "Algolia", role: "Software Engineer", period: "2017 -- 2020", description: "Core search engine team. Optimized query latency from 12ms to 3ms p99." },
]

const education = [
  { school: "INSA Lyon", degree: "M.Sc. Computer Science", period: "2013 -- 2017" },
  { school: "Universite de Montreal", degree: "Exchange semester, AI & ML", period: "Spring 2016" },
]

const skills = [
  "Rust", "TypeScript", "Go", "React", "Next.js", "PostgreSQL",
  "Redis", "Kubernetes", "WebSocket", "CRDTs", "GraphQL", "Terraform",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfileResume() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl space-y-5"
    >
      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="size-4 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold tracking-tight">
                Experience
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((job, i) => (
              <motion.div key={job.company} variants={itemVariants} className="space-y-1.5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-medium leading-snug">{job.role}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums tracking-wide text-muted-foreground/70">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
                {i < experience.length - 1 && <Separator className="mt-4" />}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="size-4 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold tracking-tight">
                Education
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu) => (
              <motion.div key={edu.school} variants={itemVariants}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-medium leading-snug">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums tracking-wide text-muted-foreground/70">
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
