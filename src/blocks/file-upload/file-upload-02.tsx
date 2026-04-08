"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileIcon, X, CheckCircle2, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FileItem {
  id: string
  name: string
  size: string
  progress: number
  status: "uploading" | "complete" | "error"
}

const mockFiles: FileItem[] = [
  { id: "1", name: "brand-guidelines-v4.pdf", size: "3.2 MB", progress: 100, status: "complete" },
  { id: "2", name: "quarterly-metrics.xlsx", size: "1.8 MB", progress: 67, status: "uploading" },
  { id: "3", name: "hero-banner-desktop.png", size: "4.7 MB", progress: 34, status: "uploading" },
  { id: "4", name: "api-documentation.md", size: "245 KB", progress: 12, status: "uploading" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function FileUpload02() {
  const [files, setFiles] = useState(mockFiles)

  useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.status !== "uploading") return f
          const next = Math.min(f.progress + Math.floor(Math.random() * 8) + 2, 100)
          return { ...f, progress: next, status: next >= 100 ? "complete" : "uploading" }
        })
      )
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))
  const uploading = files.filter((f) => f.status === "uploading").length
  const complete = files.filter((f) => f.status === "complete").length

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Uploading</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">{complete}</span> of <span className="font-mono tabular-nums">{files.length}</span> complete
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Upload className="size-3" />
          Add more
        </Button>
      </div>

      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              variants={itemVariants}
              exit={{ opacity: 0, x: -20 }}
              layout
              className="rounded-xl bg-card px-4 py-3.5 ring-1 ring-border/60"
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                  file.status === "complete" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                }`}>
                  {file.status === "complete" ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <FileIcon className="size-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full ${
                          file.status === "complete" ? "bg-emerald-500" : "bg-primary"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                      />
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground w-8 text-right">
                      {file.progress}%
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-mono tabular-nums text-muted-foreground">{file.size}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {uploading > 0 && (
        <div className="mt-3 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1">
            <div className="size-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">
              Uploading <span className="font-mono tabular-nums">{uploading}</span> {uploading === 1 ? "file" : "files"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
