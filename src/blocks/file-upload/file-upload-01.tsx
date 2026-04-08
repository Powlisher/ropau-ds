"use client"

import { useState, useCallback } from "react"
import { Upload, FileIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UploadedFile {
  id: string
  name: string
  size: string
}

export default function FileUpload01() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    const newFiles: UploadedFile[] = dropped.map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Upload Files</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Drag and drop or browse your device</p>
      </div>

      <motion.div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.01 : 1,
          borderColor: isDragging ? "var(--color-primary)" : "var(--color-border)",
        }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/20 px-6 py-12 transition-colors"
      >
        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          className={`flex size-12 items-center justify-center rounded-full ${
            isDragging ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          } transition-colors`}
        >
          <Upload className="size-5" />
        </motion.div>
        <p className="mt-4 text-sm font-medium text-foreground">
          {isDragging ? "Drop files here" : "Drop files here, or"}
        </p>
        {!isDragging && (
          <label className="mt-1.5 cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            browse
            <input
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {
                const selected = Array.from(e.target.files || [])
                const newFiles: UploadedFile[] = selected.map((f) => ({
                  id: `${Date.now()}-${f.name}`,
                  name: f.name,
                  size: `${(f.size / 1024).toFixed(1)} KB`,
                }))
                setFiles((prev) => [...prev, ...newFiles])
              }}
            />
          </label>
        )}
        <p className="mt-2 text-xs text-muted-foreground">PNG, JPG, PDF up to 10 MB</p>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1.5 overflow-hidden"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="flex items-center gap-2.5 rounded-lg bg-card px-3 py-2 ring-1 ring-border/60"
              >
                <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                  <FileIcon className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">{file.name}</p>
                  <p className="text-[11px] font-mono tabular-nums text-muted-foreground">{file.size}</p>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
