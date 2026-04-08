"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { motion } from "framer-motion"

const team = [
  { name: "Claire Dubois", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face", initials: "CD", role: "Engineering Lead", dept: "Engineering", email: "claire@ropau.io" },
  { name: "Marco Bellini", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face", initials: "MB", role: "Senior Designer", dept: "Design", email: "marco@ropau.io" },
  { name: "Yuki Tanaka", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face", initials: "YT", role: "Backend Engineer", dept: "Engineering", email: "yuki@ropau.io" },
  { name: "Omar Hassan", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face", initials: "OH", role: "Product Manager", dept: "Product", email: "omar@ropau.io" },
  { name: "Sara Lindqvist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face", initials: "SL", role: "DevOps Engineer", dept: "Engineering", email: "sara@ropau.io" },
  { name: "Leo Fontaine", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face", initials: "LF", role: "Frontend Engineer", dept: "Engineering", email: "leo@ropau.io" },
]

const deptColor: Record<string, string> = {
  Engineering: "secondary",
  Design: "outline",
  Product: "default",
}

export default function TeamList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full"
    >
      <Card
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden sm:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m) => (
              <TableRow key={m.name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{m.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.role}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={(deptColor[m.dept] as "secondary" | "outline" | "default") || "secondary"}>
                    {m.dept}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {m.email}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-xs" aria-label="Actions">
                    <MoreHorizontalIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  )
}
