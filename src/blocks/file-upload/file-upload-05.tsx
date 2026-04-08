"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, FileSpreadsheet, FileImage, Film, Trash2, Upload, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FileItem {
  id: string
  name: string
  size: string
  type: "document" | "spreadsheet" | "image" | "video"
  uploadedAt: string
}

const initialFiles: FileItem[] = [
  { id: "1", name: "project-brief-final.pdf", size: "1.2 MB", type: "document", uploadedAt: "2 min ago" },
  { id: "2", name: "revenue-forecast-q2.xlsx", size: "456 KB", type: "spreadsheet", uploadedAt: "5 min ago" },
  { id: "3", name: "onboarding-flow-v3.png", size: "3.8 MB", type: "image", uploadedAt: "12 min ago" },
  { id: "4", name: "user-interview-notes.pdf", size: "892 KB", type: "document", uploadedAt: "28 min ago" },
  { id: "5", name: "product-demo-cut.mp4", size: "47.3 MB", type: "video", uploadedAt: "1 hr ago" },
  { id: "6", name: "competitive-analysis.xlsx", size: "2.1 MB", type: "spreadsheet", uploadedAt: "1 hr ago" },
]

const typeConfig = {
  document: { icon: FileText, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  spreadsheet: { icon: FileSpreadsheet, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  image: { icon: FileImage, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  video: { icon: Film, color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function FileUpload05() {
  const [files, setFiles] = useState(initialFiles)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function removeSelected() {
    setFiles((prev) => prev.filter((f) => !selected.has(f.id)))
    setSelected(new Set())
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Uploaded Files</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">{files.length}</span> files
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-destructive hover:text-destructive" onClick={removeSelected}>
                <Trash2 className="size-3" />
                Remove ({selected.size})
              </Button>
            </motion.div>
          )}
          <label>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" render={<span />}>
                <Upload className="size-3" />
                Upload
            </Button>
            <input type="file" multiple className="sr-only" />
          </label>
        </div>
      </div>

      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y divide-border/50"
        >
          <AnimatePresence>
            {files.map((file) => {
              const config = typeConfig[file.type]
              const Icon = config.icon
              const isSelected = selected.has(file.id)
              return (
                <motion.div
                  key={file.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, height: 0 }}
                  layout
                  onClick={() => toggleSelect(file.id)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                    isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                  }`}
                >
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{file.size}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[11px] text-muted-foreground">{file.uploadedAt}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <MoreHorizontal className="size-3.5" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
