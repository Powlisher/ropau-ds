import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const integrations = [
  {
    name: "Slack",
    initials: "SL",
    description: "Post deploy alerts and team notifications",
    connected: true,
    bg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    name: "GitHub",
    initials: "GH",
    description: "Repo sync, PR checks, and deployments",
    connected: true,
    bg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    name: "Jira",
    initials: "JR",
    description: "Issue tracking and sprint boards",
    connected: false,
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Vercel",
    initials: "VC",
    description: "Automatic preview and production deploys",
    connected: true,
    bg: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200",
  },
  {
    name: "Datadog",
    initials: "DD",
    description: "APM, logging, and infrastructure monitoring",
    connected: false,
    bg: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  {
    name: "Linear",
    initials: "LN",
    description: "Project and issue management",
    connected: false,
    bg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
]

export default function SettingsIntegrations() {
  return (
    <Card className="w-full max-w-3xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Integrations</CardTitle>
            <CardDescription>
              Connect third-party services to your workspace.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {integrations.map((integration) => (
              <motion.div
                key={integration.name}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex flex-col gap-3 rounded-xl border p-4"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className={integration.bg}>
                        {integration.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {integration.name}
                      </span>
                      {integration.connected && (
                        <Badge variant="secondary" className="text-[10px]">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {integration.description}
                </p>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  className="w-full mt-auto"
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
