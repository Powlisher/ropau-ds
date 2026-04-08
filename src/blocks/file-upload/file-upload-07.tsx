"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, FileSpreadsheet, FileCode, FileArchive, Upload, Download, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DocFile {
  id: string
  name: string
  size: string
  type: "pdf" | "docx" | "xlsx" | "json" | "zip"
  pages?: number
  uploadedBy: string
  date: string
}

const typeConfig = {
  pdf: { icon: FileText, color: "bg-red-500/10 text-red-600 dark:text-red-400", label: "PDF" },
  docx: { icon: FileText, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", label: "DOCX" },
  xlsx: { icon: FileSpreadsheet, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "XLSX" },
  json: { icon: FileCode, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "JSON" },
  zip: { icon: FileArchive, color: "bg-violet-500/10 text-violet-600 dark:text-violet-400", label: "ZIP" },
}

const initialDocs: DocFile[] = [
  { id: "1", name: "contract-amendment-2024.pdf", size: "2.8 MB", type: "pdf", pages: 14, uploadedBy: "Elise G.", date: "Apr 2" },
  { id: "2", name: "api-spec-openapi.json", size: "189 KB", type: "json", uploadedBy: "Romain V.", date: "Apr 1" },
  { id: "3", name: "team-capacity-plan.xlsx", size: "1.4 MB", type: "xlsx", uploadedBy: "Margaux L.", date: "Mar 29" },
  { id: "4", name: "design-assets-export.zip", size: "34.6 MB", type: "zip", uploadedBy: "Agathe P.", date: "Mar 28" },
  { id: "5", name: "meeting-notes-kickoff.docx", size: "567 KB", type: "docx", pages: 3, uploadedBy: "Theo B.", date: "Mar 27" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function FileUpload07() {
  const [docs, setDocs] = useState(initialDocs)

  const removeDoc = (id: string) => setDocs((prev) => prev.filter((d) => d.id !== id))

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Documents</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Project files and attachments</p>
        </div>
        <label>
          <Button size="sm" className="h-8 gap-1.5 text-xs" render={<span />}>
              <Upload className="size-3" />
              Upload
          </Button>
          <input type="file" multiple className="sr-only" />
        </label>
      </div>

      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {docs.map((doc) => {
            const config = typeConfig[doc.type]
            const Icon = config.icon
            return (
              <motion.div
                key={doc.id}
                variants={itemVariants}
                exit={{ opacity: 0, x: -20 }}
                layout
                whileHover={{ y: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="flex items-center gap-3.5 rounded-xl bg-card px-4 py-3.5 ring-1 ring-border/60"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="inline-flex items-center rounded bg-muted px-1.5 py-px text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
                      {config.label}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{doc.size}</span>
                    {doc.pages && (
                      <>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-[11px] text-muted-foreground">{doc.pages} pages</span>
                      </>
                    )}
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground">{doc.uploadedBy}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{doc.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Download className="size-3.5" />
                  </button>
                  <button
                    onClick={() => removeDoc(doc.id)}
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
