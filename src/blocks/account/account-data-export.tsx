"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { DownloadIcon, FileIcon } from "lucide-react"

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

const dataCategories = [
  { id: "projects", label: "Projects & repositories", size: "~142 MB" },
  { id: "settings", label: "Account settings", size: "~3 KB" },
  { id: "activity", label: "Activity & audit logs", size: "~8.4 MB" },
  { id: "integrations", label: "Integration configs", size: "~12 KB" },
  { id: "billing", label: "Billing & invoices", size: "~156 KB" },
]

export default function AccountDataExport() {
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleExport() {
    setExporting(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setExporting(false)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 400)
  }

  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Data Export</CardTitle>
            <CardDescription>
              Download a copy of your data in your preferred format.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label>Format</Label>
              <Select defaultValue="json">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Date range</Label>
              <div className="flex items-center gap-2">
                <Input type="date" defaultValue="2025-01-01" className="flex-1" />
                <span className="text-xs text-muted-foreground">to</span>
                <Input type="date" defaultValue="2026-04-08" className="flex-1" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
              Include
            </span>
            <div className="flex flex-col gap-2.5">
              {dataCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <Checkbox defaultChecked={cat.id !== "billing"} />
                  <span className="flex-1 text-sm text-foreground">
                    {cat.label}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {cat.size}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {exporting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileIcon className="size-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Preparing archive...
                  </span>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
              <Progress value={Math.min(progress, 100)} />
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex justify-end">
            <Button onClick={handleExport} disabled={exporting}>
              <DownloadIcon className="size-3.5" />
              {exporting ? "Exporting..." : "Download export"}
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
