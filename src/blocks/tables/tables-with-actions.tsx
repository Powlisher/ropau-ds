"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontalIcon, EyeIcon, PencilIcon, Trash2Icon, CopyIcon } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  { id: "PRJ-2847", name: "E-commerce Platform", client: "Nexus Retail", status: "Active", budget: "$48,200", deadline: "May 15, 2026" },
  { id: "PRJ-3192", name: "CRM Integration", client: "Stellar Corp", status: "In Review", budget: "$22,750", deadline: "Jun 3, 2026" },
  { id: "PRJ-1284", name: "Mobile App MVP", client: "Vortex Labs", status: "Active", budget: "$67,000", deadline: "Jul 20, 2026" },
  { id: "PRJ-4821", name: "Data Migration", client: "Pinnacle Inc", status: "Paused", budget: "$15,300", deadline: "Apr 30, 2026" },
  { id: "PRJ-5618", name: "Brand Refresh", client: "Horizon Media", status: "Completed", budget: "$8,900", deadline: "Mar 1, 2026" },
  { id: "PRJ-7293", name: "Security Audit", client: "Apex Finance", status: "Active", budget: "$31,400", deadline: "Jun 28, 2026" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Active: "default",
  "In Review": "secondary",
  Paused: "destructive",
  Completed: "outline",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesWithActions() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Projects</CardTitle>
        <CardDescription>Manage active and completed project engagements</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <motion.tr
                key={item.id}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{item.id}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.client}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{item.budget}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{item.deadline}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs"><MoreHorizontalIcon /></Button>} />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><EyeIcon /> View Details</DropdownMenuItem>
                      <DropdownMenuItem><PencilIcon /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><CopyIcon /> Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2Icon /> Delete</DropdownMenuItem>
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
