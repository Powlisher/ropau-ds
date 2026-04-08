"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, PencilIcon, ShieldIcon, Trash2Icon } from "lucide-react"
import { motion } from "framer-motion"

const users = [
  { name: "Elena Marchetti", initials: "EM", email: "elena@company.com", role: "Admin", status: "Active", joined: "Jan 12, 2024" },
  { name: "Thomas Reiner", initials: "TR", email: "thomas@company.com", role: "Engineer", status: "Active", joined: "Mar 5, 2024" },
  { name: "Sophie Duval", initials: "SD", email: "sophie@company.com", role: "Designer", status: "Active", joined: "Jun 18, 2024" },
  { name: "Marcus Chen", initials: "MC", email: "marcus@company.com", role: "PM", status: "Inactive", joined: "Aug 2, 2024" },
  { name: "Aisha Patel", initials: "AP", email: "aisha@company.com", role: "Marketing", status: "Active", joined: "Oct 14, 2024" },
  { name: "Jonas Eriksson", initials: "JE", email: "jonas@company.com", role: "Engineer", status: "Active", joined: "Dec 9, 2024" },
  { name: "Carolina Ruiz", initials: "CR", email: "carolina@company.com", role: "Sales", status: "Invited", joined: "Feb 28, 2025" },
  { name: "Luisa Fernandez", initials: "LF", email: "luisa@company.com", role: "Support", status: "Active", joined: "Apr 1, 2025" },
]

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Engineer: "secondary",
  Designer: "secondary",
  PM: "outline",
  Marketing: "outline",
  Sales: "outline",
  Support: "outline",
}

const statusConfig: Record<string, { dot: string }> = {
  Active: { dot: "bg-emerald-500" },
  Inactive: { dot: "bg-muted-foreground" },
  Invited: { dot: "bg-amber-500" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesUserList() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Team Members</CardTitle>
        <CardDescription>Manage your organization members and roles</CardDescription>
        <CardAction>
          <Button size="sm">Invite Member</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {users.map((user) => (
              <motion.tr
                key={user.email}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleVariant[user.role] || "outline"}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${statusConfig[user.status]?.dot}`} />
                    <span className="text-sm text-muted-foreground">{user.status}</span>
                  </div>
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{user.joined}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs"><MoreHorizontalIcon /></Button>} />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><PencilIcon /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><ShieldIcon /> Change Role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2Icon /> Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
