import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

const accounts = [
  {
    name: "Google",
    initials: "G",
    email: "elena.vasquez@gmail.com",
    connected: true,
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    name: "GitHub",
    initials: "GH",
    email: "evasquez",
    connected: true,
    bg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    name: "Slack",
    initials: "SL",
    email: "elena.v@cordoba-workspace",
    connected: true,
    bg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    name: "Linear",
    initials: "LN",
    email: "Not connected",
    connected: false,
    bg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
]

export default function AccountConnectedAccounts() {
  return (
    <Card className="w-full max-w-2xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Connected Accounts</CardTitle>
            <CardDescription>
              Link external services for single sign-on and integrations.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {accounts.map((account, index) => (
            <motion.div
              key={account.name}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className={account.bg}>
                    {account.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {account.name}
                    </span>
                    {account.connected && (
                      <Badge variant="secondary" className="text-[10px]">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {account.email}
                  </span>
                </div>
              </div>
              <Button
                variant={account.connected ? "outline" : "default"}
                size="sm"
              >
                {account.connected ? "Disconnect" : "Connect"}
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </motion.div>
    </Card>
  )
}
