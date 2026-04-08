"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { PencilIcon, PlusIcon } from "lucide-react"

type Member = {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinDate: string
}

const initialMembers: Member[] = [
  { id: "m1", name: "Elara Fontaine", email: "elara@company.com", role: "Engineering Lead", department: "Engineering", joinDate: "2023-01-15" },
  { id: "m2", name: "Kai Nakamura", email: "kai@company.com", role: "Product Designer", department: "Design", joinDate: "2023-04-22" },
  { id: "m3", name: "Soren Lindqvist", email: "soren@company.com", role: "Backend Engineer", department: "Engineering", joinDate: "2023-08-03" },
  { id: "m4", name: "Amara Diallo", email: "amara@company.com", role: "Marketing Manager", department: "Marketing", joinDate: "2022-11-10" },
  { id: "m5", name: "Lucian Brandt", email: "lucian@company.com", role: "DevOps Engineer", department: "Infrastructure", joinDate: "2024-02-19" },
]

const deptColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  Marketing: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Infrastructure: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Crud02() {
  const [members, setMembers] = useState(initialMembers)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [form, setForm] = useState({ name: "", email: "", role: "", department: "" })

  const openEdit = (m: Member) => {
    setEditing(m)
    setForm({ name: m.name, email: m.email, role: m.role, department: m.department })
    setSheetOpen(true)
  }

  const openAdd = () => {
    setEditing(null)
    setForm({ name: "", email: "", role: "", department: "" })
    setSheetOpen(true)
  }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) {
      setMembers((prev) => prev.map((m) => m.id === editing.id ? { ...m, ...form } : m))
    } else {
      setMembers((prev) => [...prev, { id: `new-${Date.now()}`, ...form, joinDate: new Date().toISOString().split("T")[0] }])
    }
    setSheetOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Team Members</h2>
          <p className="text-sm text-muted-foreground">{members.length} people across {new Set(members.map((m) => m.department)).size} departments</p>
        </div>
        <Button size="sm" onClick={openAdd} className="gap-1.5">
          <PlusIcon className="size-3.5" />
          Add member
        </Button>
      </div>

      <Card style={{ boxShadow: premiumShadow }} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
              {members.map((member) => (
                <motion.tr key={member.id} variants={rowVariants} className="group border-b border-border/30 transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{member.role}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${deptColors[member.department] ?? "bg-slate-100 text-slate-600"}`}>
                      {member.department}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">{member.joinDate}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(member)}
                      className="flex size-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                    >
                      <PencilIcon className="size-3.5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editing ? "Edit Member" : "Add Member"}</SheetTitle>
            <SheetDescription>{editing ? `Update details for ${editing.name}` : "Add a new team member to the directory"}</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Email</Label>
              <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="jane@company.com" type="email" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Role</Label>
              <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Product Designer" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Department</Label>
              <Input value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} placeholder="Design" />
            </div>
          </div>
          <SheetFooter className="px-4">
            <SheetClose render={<Button variant="outline" size="sm" />}>
              Cancel
            </SheetClose>
            <Button size="sm" onClick={save}>{editing ? "Save Changes" : "Add Member"}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
