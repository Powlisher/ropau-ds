"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { SendIcon, UserMinusIcon } from "lucide-react"

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

const members = [
  {
    name: "Elena Vasquez",
    email: "elena.vasquez@cordoba.dev",
    initials: "EV",
    role: "owner",
    joinDate: "Sep 2024",
  },
  {
    name: "Mateo Alvarez",
    email: "mateo@cordoba.dev",
    initials: "MA",
    role: "admin",
    joinDate: "Oct 2024",
  },
  {
    name: "Suki Tanaka",
    email: "suki.t@cordoba.dev",
    initials: "ST",
    role: "member",
    joinDate: "Jan 2025",
  },
  {
    name: "Liam O'Brien",
    email: "liam@cordoba.dev",
    initials: "LO",
    role: "member",
    joinDate: "Mar 2025",
  },
  {
    name: "Priya Khatri",
    email: "priya@cordoba.dev",
    initials: "PK",
    role: "viewer",
    joinDate: "Feb 2026",
  },
]

function roleBadge(role: string) {
  switch (role) {
    case "owner":
      return "default" as const
    case "admin":
      return "secondary" as const
    default:
      return "outline" as const
  }
}

export default function SettingsMembers() {
  return (
    <Card className="w-full max-w-3xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Members</CardTitle>
            <CardDescription>
              Invite collaborators and manage team roles.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex gap-2">
            <Input
              type="email"
              placeholder="colleague@company.com"
              className="flex-1"
            />
            <Button size="default">
              <SendIcon className="size-3.5" />
              Send invite
            </Button>
          </motion.div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <motion.tr
                  key={member.email}
                  variants={itemVariants}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {member.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums text-sm">
                    {member.joinDate}
                  </TableCell>
                  <TableCell>
                    {member.role === "owner" ? (
                      <Badge variant={roleBadge(member.role)}>
                        {member.role}
                      </Badge>
                    ) : (
                      <Select defaultValue={member.role}>
                        <SelectTrigger size="sm" className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {member.role !== "owner" && (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <UserMinusIcon className="size-3" />
                      </Button>
                    )}
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
