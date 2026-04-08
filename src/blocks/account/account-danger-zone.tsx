import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertTriangleIcon, DownloadIcon, TrashIcon, PauseIcon } from "lucide-react"

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

const actions = [
  {
    icon: DownloadIcon,
    title: "Export your data",
    description:
      "Download a complete archive of your account data including projects, settings, and activity history.",
    button: "Export data",
    variant: "outline" as const,
  },
  {
    icon: PauseIcon,
    title: "Deactivate account",
    description:
      "Temporarily disable your account. Your data will be preserved and you can reactivate within 90 days.",
    button: "Deactivate",
    variant: "outline" as const,
  },
  {
    icon: TrashIcon,
    title: "Delete account permanently",
    description:
      "This action cannot be undone. All your data, projects, and API keys will be permanently removed.",
    button: "Delete account",
    variant: "destructive" as const,
  },
]

export default function AccountDangerZone() {
  return (
    <Card
      className="w-full max-w-2xl ring-destructive/30"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="size-4 text-destructive" />
              <CardTitle className="tracking-tight text-destructive">
                Danger Zone
              </CardTitle>
            </div>
            <CardDescription>
              Irreversible actions that affect your entire account.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {actions.map((action) => (
            <motion.div
              key={action.title}
              variants={itemVariants}
              className="flex items-start justify-between gap-6 rounded-xl px-3 py-4"
            >
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/8">
                  <action.icon className="size-4 text-destructive/70" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">
                    {action.title}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
              <Button
                variant={action.variant}
                size="sm"
                className="shrink-0 mt-0.5"
              >
                {action.button}
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </motion.div>
    </Card>
  )
}
