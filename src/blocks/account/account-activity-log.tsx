import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  LogInIcon,
  KeyRoundIcon,
  ShieldIcon,
  MailIcon,
  MonitorIcon,
} from "lucide-react"

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

const events = [
  {
    icon: LogInIcon,
    description: "Signed in from Chrome on macOS",
    timestamp: "Today, 09:14 AM",
    ip: "83.42.191.7",
    type: "auth",
  },
  {
    icon: KeyRoundIcon,
    description: "API key 'Production API' regenerated",
    timestamp: "Apr 6, 2026, 4:38 PM",
    ip: "83.42.191.7",
    type: "security",
  },
  {
    icon: ShieldIcon,
    description: "Two-factor authentication enabled",
    timestamp: "Apr 3, 2026, 11:22 AM",
    ip: "92.178.45.12",
    type: "security",
  },
  {
    icon: MailIcon,
    description: "Email changed from e.vasquez@old.io to elena.vasquez@cordoba.dev",
    timestamp: "Mar 29, 2026, 2:07 PM",
    ip: "83.42.191.7",
    type: "account",
  },
  {
    icon: LogInIcon,
    description: "Signed in from Safari on iPhone",
    timestamp: "Mar 27, 2026, 8:51 AM",
    ip: "176.83.22.90",
    type: "auth",
  },
  {
    icon: MonitorIcon,
    description: "New device authorized: MacBook Pro M4",
    timestamp: "Mar 15, 2026, 10:30 AM",
    ip: "83.42.191.7",
    type: "device",
  },
]

function typeBadgeVariant(type: string) {
  switch (type) {
    case "security":
      return "default" as const
    case "auth":
      return "secondary" as const
    default:
      return "outline" as const
  }
}

export default function AccountActivityLog() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Activity Log</CardTitle>
            <CardDescription>
              Recent security events and account changes.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col gap-0">
            <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="relative flex gap-4 py-3"
              >
                <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg bg-card ring-1 ring-border">
                  <event.icon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-1 flex-col gap-1 pt-0.5">
                  <p className="text-sm text-foreground">{event.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {event.timestamp}
                    </span>
                    <Badge variant={typeBadgeVariant(event.type)} className="text-[10px]">
                      {event.ip}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
