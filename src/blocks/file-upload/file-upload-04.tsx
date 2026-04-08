"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2, AlertCircle, Loader2, FileIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function FileUpload04() {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState("")

  function simulateUpload(name: string, size: number) {
    setFileName(name)
    setFileSize(`${(size / 1024).toFixed(1)} KB`)
    setStatus("uploading")
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? "success" : "error")
    }, 2200)
  }

  function reset() {
    setStatus("idle")
    setFileName("")
    setFileSize("")
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Attachment</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Upload a single file</p>
      </div>

      <div
        className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Upload className="size-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">No file selected</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, or TXT up to 5 MB</p>
              <label className="mt-4 w-full">
                <Button className="w-full gap-2" render={<span />}>
                    <Upload className="size-3.5" />
                    Choose file
                </Button>
                <input
                  type="file"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) simulateUpload(f.name, f.size)
                  }}
                />
              </label>
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="flex items-center gap-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Loader2 className="size-4 animate-spin" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
                <p className="text-[11px] font-mono tabular-nums text-muted-foreground">{fileSize}</p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{fileSize}</span>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Uploaded</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={reset}>
                  Replace
                </Button>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <AlertCircle className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
                  <p className="text-[11px] text-destructive">Upload failed. Please try again.</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={reset}>
                  Retry
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
