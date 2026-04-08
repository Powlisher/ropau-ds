"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Sync Engine",
    description: "Real-time collaborative editing with CRDTs. Sub-50ms conflict resolution across distributed nodes.",
    gradient: "linear-gradient(135deg, oklch(0.45 0.22 3.6) 0%, oklch(0.55 0.18 30) 100%)",
    tags: ["Rust", "WebSocket", "CRDTs"],
  },
  {
    title: "Lumiere UI",
    description: "Design system with spring-based animations and accessibility baked into every primitive.",
    gradient: "linear-gradient(135deg, oklch(0.50 0.15 250) 0%, oklch(0.45 0.20 280) 100%)",
    tags: ["React", "Framer Motion", "WCAG"],
  },
  {
    title: "Cartograph",
    description: "Interactive data visualization library built on WebGL. Renders 100k+ points at 60fps.",
    gradient: "linear-gradient(135deg, oklch(0.55 0.18 160) 0%, oklch(0.45 0.15 140) 100%)",
    tags: ["WebGL", "TypeScript", "D3"],
  },
  {
    title: "Dispatch",
    description: "Event-driven microservices framework with automatic retry, dead letter queues, and tracing.",
    gradient: "linear-gradient(135deg, oklch(0.50 0.12 60) 0%, oklch(0.42 0.15 40) 100%)",
    tags: ["Go", "gRPC", "OpenTelemetry"],
  },
  {
    title: "Silo",
    description: "Privacy-first analytics. Differential privacy guarantees with less than 2% accuracy loss.",
    gradient: "linear-gradient(135deg, oklch(0.48 0.20 320) 0%, oklch(0.42 0.18 300) 100%)",
    tags: ["Python", "ClickHouse", "Privacy"],
  },
  {
    title: "Terrace",
    description: "Automated infrastructure provisioning for ML pipelines. From notebook to production in one command.",
    gradient: "linear-gradient(135deg, oklch(0.52 0.10 200) 0%, oklch(0.42 0.14 220) 100%)",
    tags: ["Terraform", "Kubernetes", "MLOps"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfilePortfolio() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A selection of things I built or contributed to significantly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Card
              className="h-full cursor-pointer transition-all"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div
                className="h-32 rounded-t-xl"
                style={{ background: project.gradient }}
              >
                <div className="size-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
              </div>
              <CardHeader>
                <CardTitle className="font-semibold tracking-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
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
