"use client"

import { useState, useCallback, useEffect } from "react"
import { Clipboard, FileIcon, X, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PastedFile {
  id: string
  name: string
  size: string
  type: string
}

export default function FileUpload09() {
  const [files, setFiles] = useState<PastedFile[]>([])
  const [focused, setFocused] = useState(false)
  const [pasted, setPasted] = useState(false)

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    const newFiles: PastedFile[] = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === "file") {
        const file = item.getAsFile()
        if (file) {
          newFiles.push({
            id: `${Date.now()}-${file.name}-${i}`,
            name: file.name || `pasted-${file.type.split("/")[1] || "file"}`,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            type: file.type.split("/")[0] || "file",
          })
        }
      }
    }

    if (newFiles.length > 0) {
      e.preventDefault()
      setFiles((prev) => [...prev, ...newFiles])
      setPasted(true)
      setTimeout(() => setPasted(false), 1500)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("paste", handlePaste)
    return () => document.removeEventListener("paste", handlePaste)
  }, [handlePaste])

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Paste to Upload</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Copy a file and paste it anywhere on this page</p>
      </div>

      <motion.div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
        animate={{
          borderColor: pasted ? "var(--color-primary)" : focused ? "var(--color-border)" : "var(--color-border)",
        }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/15 px-6 py-10 focus:outline-none cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {pasted ? (
            <motion.div
              key="pasted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex flex-col items-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-primary">File received</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className={`flex size-12 items-center justify-center rounded-full transition-colors ${
                focused ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                <Clipboard className="size-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                Press <kbd className="mx-1 inline-flex items-center rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground ring-1 ring-border/60">Cmd+V</kbd> to paste
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Images, screenshots, and files from clipboard
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-1.5 overflow-hidden"
          >
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              <span className="font-mono tabular-nums">{files.length}</span> pasted {files.length === 1 ? "file" : "files"}
            </p>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
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
