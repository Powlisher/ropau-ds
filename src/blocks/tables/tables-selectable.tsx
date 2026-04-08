"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2Icon, ArchiveIcon, TagIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const contacts = [
  { id: "1", name: "Elena Marchetti", email: "elena@nexusretail.com", company: "Nexus Retail", role: "CTO" },
  { id: "2", name: "Thomas Reiner", email: "thomas@stellarcorp.de", company: "Stellar Corp", role: "Lead Engineer" },
  { id: "3", name: "Sophie Duval", email: "sophie@vortexlabs.fr", company: "Vortex Labs", role: "Design Director" },
  { id: "4", name: "Marcus Chen", email: "marcus@pinnacleinc.com", company: "Pinnacle Inc", role: "PM" },
  { id: "5", name: "Aisha Patel", email: "aisha@horizonmedia.co", company: "Horizon Media", role: "Marketing Lead" },
  { id: "6", name: "Jonas Eriksson", email: "jonas@apexfinance.se", company: "Apex Finance", role: "VP Engineering" },
  { id: "7", name: "Carolina Ruiz", email: "carolina@terrasystems.mx", company: "Terra Systems", role: "Sales Manager" },
  { id: "8", name: "Luisa Fernandez", email: "luisa@pulsedigital.es", company: "Pulse Digital", role: "Support Lead" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesSelectable() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const allSelected = selected.size === contacts.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(contacts.map((c) => c.id)))
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Contacts</CardTitle>
        <CardDescription>Select contacts to perform bulk actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2">
                <span className="text-sm font-medium tabular-nums">{selected.size} selected</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="xs"><TagIcon /> Label</Button>
                  <Button variant="outline" size="xs"><ArchiveIcon /> Archive</Button>
                  <Button variant="destructive" size="xs"><Trash2Icon /> Delete</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contacts.map((contact) => (
              <motion.tr
                key={contact.id}
                variants={rowVariants}
                className={`border-b transition-colors ${selected.has(contact.id) ? "bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(contact.id)}
                    onCheckedChange={() => toggleOne(contact.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                <TableCell className="text-muted-foreground">{contact.company}</TableCell>
                <TableCell className="text-muted-foreground">{contact.role}</TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
