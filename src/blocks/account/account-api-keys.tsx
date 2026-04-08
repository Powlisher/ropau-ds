"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CopyIcon, PlusIcon } from "lucide-react"

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

const apiKeys = [
  {
    name: "Production API",
    key: "rpk_live_4f7a...x9k2",
    created: "Jan 14, 2026",
    lastUsed: "3 hours ago",
    active: true,
  },
  {
    name: "Staging Environment",
    key: "rpk_test_b2m8...q3w7",
    created: "Mar 02, 2026",
    lastUsed: "Yesterday",
    active: true,
  },
  {
    name: "CI/CD Pipeline",
    key: "rpk_live_9d1c...h5j8",
    created: "Nov 28, 2025",
    lastUsed: "12 days ago",
    active: false,
  },
]

export default function AccountApiKeys() {
  return (
    <Card className="w-full max-w-3xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for programmatic access. Keep them secret.
            </CardDescription>
          </motion.div>
          <CardAction>
            <motion.div variants={itemVariants}>
              <Button size="sm">
                <PlusIcon className="size-3.5" />
                Generate new key
              </Button>
            </motion.div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <motion.tr
                  key={key.name}
                  variants={itemVariants}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {key.name}
                      </span>
                      {!key.active && (
                        <Badge variant="outline" className="text-[10px]">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted/70 px-1.5 py-0.5 font-mono text-xs tabular-nums tracking-wide">
                      {key.key}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {key.created}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {key.lastUsed}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-xs">
                        <CopyIcon className="size-3" />
                      </Button>
                      <Button variant="destructive" size="xs">
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </motion.div>
    </Card>
  )
}
