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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"

const members = [
  {
    name: "Camille Bernstein",
    email: "camille@tidepool.io",
    role: "Owner",
    initials: "CB",
  },
  {
    name: "Mateo Alvarez",
    email: "mateo@tidepool.io",
    role: "Admin",
    initials: "MA",
  },
  {
    name: "Priya Khatri",
    email: "priya@tidepool.io",
    role: "Member",
    initials: "PK",
  },
  {
    name: "Jonas Eriksson",
    email: "jonas@tidepool.io",
    role: "Member",
    initials: "JE",
  },
]

function roleBadgeVariant(role: string) {
  switch (role) {
    case "Owner":
      return "default" as const
    case "Admin":
      return "secondary" as const
    default:
      return "outline" as const
  }
}

export function TeamSettings() {
  return (
    <Card
      className="w-full max-w-3xl"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Manage who has access to this workspace and their permissions.
        </CardDescription>
        <CardAction>
          <Button size="sm">Invite member</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.email}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {member.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.email}
                </TableCell>
                <TableCell>
                  <Badge variant={roleBadgeVariant(member.role)}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreHorizontalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuItem>Remove from team</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
