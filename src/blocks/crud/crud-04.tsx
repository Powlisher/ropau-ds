"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, PencilIcon, Trash2Icon, ExternalLinkIcon } from "lucide-react"

type Project = {
  id: string
  name: string
  description: string
  gradient: string
  status: "live" | "staging" | "archived"
  tech: string[]
  updatedAt: string
}

const initialProjects: Project[] = [
  { id: "pr1", name: "Meridian Dashboard", description: "Analytics platform for healthcare metrics and patient flow visualization", gradient: "linear-gradient(135deg, oklch(0.82 0.1 220), oklch(0.68 0.14 260))", status: "live", tech: ["Next.js", "Prisma"], updatedAt: "2h ago" },
  { id: "pr2", name: "Volta API Gateway", description: "Rate-limited API proxy with authentication and usage analytics", gradient: "linear-gradient(135deg, oklch(0.85 0.08 155), oklch(0.7 0.14 180))", status: "live", tech: ["Rust", "Redis"], updatedAt: "4h ago" },
  { id: "pr3", name: "Canopy Editor", description: "Collaborative rich text editor with real-time presence and versioning", gradient: "linear-gradient(135deg, oklch(0.88 0.06 55), oklch(0.75 0.12 35))", status: "staging", tech: ["React", "WebSocket"], updatedAt: "1d ago" },
  { id: "pr4", name: "Prism Design System", description: "Component library with tokens, documentation, and Figma sync", gradient: "linear-gradient(135deg, oklch(0.8 0.12 330), oklch(0.68 0.16 300))", status: "live", tech: ["Storybook", "Tailwind"], updatedAt: "6h ago" },
  { id: "pr5", name: "Helios CLI", description: "Developer toolkit for scaffolding, deployment, and log streaming", gradient: "linear-gradient(135deg, oklch(0.82 0.08 80), oklch(0.7 0.12 55))", status: "staging", tech: ["Go", "gRPC"], updatedAt: "3d ago" },
  { id: "pr6", name: "Tidal Marketplace", description: "Multi-vendor e-commerce with dynamic pricing engine", gradient: "linear-gradient(135deg, oklch(0.78 0.1 270), oklch(0.65 0.14 290))", status: "archived", tech: ["Next.js", "Stripe"], updatedAt: "2w ago" },
]

const statusDot: Record<string, string> = {
  live: "bg-emerald-500",
  staging: "bg-amber-500",
  archived: "bg-slate-400",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud04() {
  const [projects, setProjects] = useState(initialProjects)

  const remove = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">{projects.length} projects, {projects.filter((p) => p.status === "live").length} live</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          New project
        </Button>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card className="group overflow-hidden border-border/40" style={{ boxShadow: premiumShadow }}>
                <div className="relative h-24" style={{ background: project.gradient }}>
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="flex size-7 items-center justify-center rounded-md bg-white/80 text-foreground/70 backdrop-blur-sm hover:bg-white dark:bg-black/40 dark:hover:bg-black/60">
                      <PencilIcon className="size-3.5" />
                    </button>
                    <button className="flex size-7 items-center justify-center rounded-md bg-white/80 text-foreground/70 backdrop-blur-sm hover:bg-white dark:bg-black/40 dark:hover:bg-black/60">
                      <ExternalLinkIcon className="size-3.5" />
                    </button>
                    <button onClick={() => remove(project.id)} className="flex size-7 items-center justify-center rounded-md bg-white/80 text-red-600 backdrop-blur-sm hover:bg-white dark:bg-black/40 dark:hover:bg-black/60">
                      <Trash2Icon className="size-3.5" />
                    </button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">{project.name}</h3>
                    <span className={`ml-auto size-2 rounded-full ${statusDot[project.status]}`} />
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] tabular-nums text-muted-foreground">Updated {project.updatedAt}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
