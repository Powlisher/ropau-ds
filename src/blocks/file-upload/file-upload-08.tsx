"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, AlertTriangle, X, FileIcon, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FileItem {
  id: string
  name: string
  size: string
  sizeBytes: number
  error: string | null
  valid: boolean
}

const maxSizeBytes = 5 * 1024 * 1024
const allowedTypes = ["image/png", "image/jpeg", "application/pdf"]

const mockFiles: FileItem[] = [
  { id: "1", name: "wireframe-checkout.png", size: "1.2 MB", sizeBytes: 1258291, error: null, valid: true },
  { id: "2", name: "raw-export-uncompressed.tiff", size: "78.4 MB", sizeBytes: 82214502, error: "File exceeds 5 MB limit (78.4 MB)", valid: false },
  { id: "3", name: "brand-colors.sketch", size: "3.1 MB", sizeBytes: 3250585, error: "Unsupported file type. Allowed: PNG, JPG, PDF", valid: false },
  { id: "4", name: "invoice-march-2024.pdf", size: "456 KB", sizeBytes: 467148, error: null, valid: true },
  { id: "5", name: "background-video.mov", size: "124.7 MB", sizeBytes: 130785484, error: "File exceeds 5 MB limit (124.7 MB). Unsupported type.", valid: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function FileUpload08() {
  const [files, setFiles] = useState(mockFiles)

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))
  const validCount = files.filter((f) => f.valid).length
  const errorCount = files.filter((f) => !f.valid).length

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Upload Validation</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          <span className="font-mono tabular-nums">{validCount}</span> valid, <span className="font-mono tabular-nums text-destructive">{errorCount}</span> with errors
        </p>
      </div>

      {errorCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="mb-3 flex items-start gap-2.5 rounded-xl bg-destructive/5 px-4 py-3 ring-1 ring-destructive/15"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div>
            <p className="text-sm font-medium text-destructive">
              {errorCount} {errorCount === 1 ? "file" : "files"} failed validation
            </p>
            <p className="mt-0.5 text-xs text-destructive/70">
              Accepted formats: PNG, JPG, PDF. Maximum size: 5 MB per file.
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        className="space-y-1.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              variants={itemVariants}
              exit={{ opacity: 0, height: 0 }}
              layout
              className={`flex items-start gap-3 rounded-xl bg-card px-4 py-3 ring-1 transition-colors ${
                file.valid ? "ring-border/60" : "ring-destructive/25 bg-destructive/[0.02]"
              }`}
              style={file.valid ? { boxShadow: "0 1px 2px rgba(20,20,15,0.04)" } : undefined}
            >
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                file.valid
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-destructive/10 text-destructive"
              }`}>
                {file.valid ? <CheckCircle2 className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-[11px] font-mono tabular-nums text-muted-foreground">{file.size}</p>
                {file.error && (
                  <p className="mt-1 text-xs text-destructive">{file.error}</p>
                )}
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => setFiles((prev) => prev.filter((f) => f.valid))}>
          Remove invalid
        </Button>
        <Button size="sm" className="flex-1 h-8 text-xs gap-1.5" disabled={validCount === 0}>
          <Upload className="size-3" />
          Upload {validCount} {validCount === 1 ? "file" : "files"}
        </Button>
      </div>
    </div>
  )
}
