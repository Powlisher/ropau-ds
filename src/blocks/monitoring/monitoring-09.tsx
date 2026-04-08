"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Rocket, CheckCircle2, Loader2, XCircle, Clock, GitBranch } from "lucide-react"

type DeployStatus = "success" | "deploying" | "failed" | "queued"

const statusConfig: Record<DeployStatus, { icon: typeof CheckCircle2; color: string; label: string; badge: string }> = {
  success: { icon: CheckCircle2, color: "text-emerald-600", label: "Live", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  deploying: { icon: Loader2, color: "text-sky-600", label: "Deploying", badge: "bg-sky-50 text-sky-700 border-sky-200" },
  failed: { icon: XCircle, color: "text-rose-600", label: "Failed", badge: "bg-rose-50 text-rose-700 border-rose-200" },
  queued: { icon: Clock, color: "text-muted-foreground", label: "Queued", badge: "bg-muted text-muted-foreground border-border" },
}

const deployments = [
  {
    version: "v3.9.2",
    status: "deploying" as DeployStatus,
    branch: "hotfix/checkout-validation",
    commit: "a9f2c1e",
    message: "fix: validate shipping address before payment intent",
    author: { initials: "TR", color: "bg-sky-100 text-sky-700" },
    started: "14:28",
    duration: "2m 14s",
    environment: "production",
  },
  {
    version: "v3.9.1",
    status: "success" as DeployStatus,
    branch: "main",
    commit: "f41a09c",
    message: "feat: add retry mechanism to webhook delivery",
    author: { initials: "EM", color: "bg-rose-100 text-rose-700" },
    started: "11:42",
    duration: "3m 47s",
    environment: "production",
  },
  {
    version: "v3.9.1-rc.2",
    status: "success" as DeployStatus,
    branch: "release/3.9.1",
    commit: "e92d4b8",
    message: "chore: bump dependencies, update lockfile",
    author: { initials: "MC", color: "bg-emerald-100 text-emerald-700" },
    started: "10:15",
    duration: "4m 02s",
    environment: "staging",
  },
  {
    version: "v3.9.1-rc.1",
    status: "failed" as DeployStatus,
    branch: "release/3.9.1",
    commit: "c8b21d3",
    message: "feat: multi-currency support for invoicing",
    author: { initials: "AP", color: "bg-amber-100 text-amber-700" },
    started: "09:31",
    duration: "1m 58s",
    environment: "staging",
  },
  {
    version: "v3.9.0",
    status: "success" as DeployStatus,
    branch: "main",
    commit: "7b3e5a1",
    message: "release: v3.9.0 - real-time collaboration",
    author: { initials: "EM", color: "bg-rose-100 text-rose-700" },
    started: "Yesterday 16:22",
    duration: "4m 31s",
    environment: "production",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Monitoring09() {
  return (
    <motion.div
      className="mx-auto max-w-2xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Rocket className="size-4 text-muted-foreground" />
            <CardTitle className="font-heading text-lg tracking-tight">Deployments</CardTitle>
          </div>
          <CardDescription>Recent deployment activity across environments</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {deployments.map((deploy) => {
            const config = statusConfig[deploy.status]
            const Icon = config.icon

            return (
              <motion.div
                key={deploy.version + deploy.commit}
                variants={itemVariants}
                whileHover={{ x: 1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                className={`rounded-xl p-3.5 transition-colors ${
                  deploy.status === "deploying" ? "bg-sky-50/40 ring-1 ring-sky-200/50" :
                  deploy.status === "failed" ? "bg-rose-50/30 ring-1 ring-rose-200/40" :
                  "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className={`text-[10px] font-semibold ${deploy.author.color}`}>
                      {deploy.author.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-mono font-semibold text-foreground">{deploy.version}</code>
                      <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-medium px-1.5 py-0 ${config.badge}`}>
                        <Icon className={`size-2.5 mr-0.5 ${config.color} ${deploy.status === "deploying" ? "animate-spin" : ""}`} />
                        {config.label}
                      </Badge>
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                        {deploy.environment}
                      </Badge>
                    </div>

                    <p className="mt-1 text-[13px] text-muted-foreground truncate">{deploy.message}</p>

                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground/70">
                      <span className="flex items-center gap-1 font-mono">
                        <GitBranch className="size-3" />
                        {deploy.branch}
                      </span>
                      <code className="text-[10px]">{deploy.commit}</code>
                      <span className="font-mono tabular-nums">{deploy.started}</span>
                      <span className="font-mono tabular-nums">{deploy.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
