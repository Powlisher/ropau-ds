"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Loader2, CheckCircle2, AlertCircle, Link2, FileIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImportedFile {
  id: string
  url: string
  name: string
  size: string
  status: "importing" | "complete" | "error"
}

const mockImported: ImportedFile[] = [
  { id: "1", url: "https://cdn.example.com/assets/brand-kit-2024.zip", name: "brand-kit-2024.zip", size: "8.3 MB", status: "complete" },
  { id: "2", url: "https://storage.googleapis.com/proj/analytics-export.csv", name: "analytics-export.csv", size: "2.1 MB", status: "complete" },
]

export default function FileUpload10() {
  const [url, setUrl] = useState("")
  const [files, setFiles] = useState(mockImported)
  const [importing, setImporting] = useState(false)

  function handleImport() {
    if (!url.trim()) return
    const fileName = url.split("/").pop() || "imported-file"
    const newFile: ImportedFile = {
      id: `${Date.now()}`,
      url: url.trim(),
      name: fileName,
      size: "...",
      status: "importing",
    }
    setFiles((prev) => [newFile, ...prev])
    setUrl("")
    setImporting(true)

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? { ...f, size: `${(Math.random() * 10 + 0.5).toFixed(1)} MB`, status: Math.random() > 0.2 ? "complete" : "error" }
            : f
        )
      )
      setImporting(false)
    }, 2000)
  }

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Import from URL</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Paste a link to download a file</p>
      </div>

      <div
        className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Globe className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleImport()}
              placeholder="https://example.com/file.pdf"
              className="h-9 text-sm font-mono"
            />
          </div>
          <Button size="sm" className="h-9 gap-1.5 text-xs" onClick={handleImport} disabled={!url.trim() || importing}>
            {importing ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Link2 className="size-3" />
            )}
            Import
          </Button>
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground">
          Supports direct file URLs from any public source
        </p>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 space-y-1.5"
          >
            <p className="text-xs font-medium text-muted-foreground">
              <span className="font-mono tabular-nums">{files.length}</span> imported {files.length === 1 ? "file" : "files"}
            </p>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex items-center gap-2.5 rounded-xl bg-card px-3.5 py-2.5 ring-1 ring-border/60"
                style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04)" }}
              >
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                  file.status === "complete"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : file.status === "error"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}>
                  {file.status === "importing" ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : file.status === "complete" ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <AlertCircle className="size-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                  <p className="truncate text-[10px] font-mono text-muted-foreground">{file.url}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground">{file.size}</span>
                    {file.status === "error" && (
                      <span className="text-[11px] text-destructive">Failed to import</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="size-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
