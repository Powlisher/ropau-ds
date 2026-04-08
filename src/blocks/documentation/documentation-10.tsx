"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"

const responses = [
  {
    status: 200,
    label: "OK",
    color: "oklch(0.55 0.15 150)",
    description: "Successful request. Returns the requested resource.",
    body: `{
  "data": {
    "project_id": "prj_8kv2nX4mLq",
    "total_views": 48293,
    "unique_visitors": 12847,
    "avg_session_s": 214.7,
    "bounce_rate": 0.342,
    "top_referrer": "google.com",
    "period": "2026-03-01/2026-03-31"
  },
  "meta": {
    "request_id": "req_aB7xK9pL2m",
    "latency_ms": 43
  }
}`,
  },
  {
    status: 401,
    label: "Unauthorized",
    color: "oklch(0.58 0.14 55)",
    description: "Missing or invalid API key. Check your Authorization header.",
    body: `{
  "error": {
    "code": "auth_invalid_token",
    "message": "The API key provided is expired or malformed.",
    "hint": "Regenerate your key at dashboard.ropau.dev/settings/keys"
  }
}`,
  },
  {
    status: 422,
    label: "Unprocessable Entity",
    color: "oklch(0.55 0.15 25)",
    description: "Validation failed. The request body contains invalid fields.",
    body: `{
  "error": {
    "code": "validation_failed",
    "message": "2 validation errors",
    "details": [
      { "field": "from", "issue": "Must be a valid ISO 8601 date" },
      { "field": "granularity", "issue": "Must be one of: hour, day, week, month" }
    ]
  }
}`,
  },
  {
    status: 429,
    label: "Too Many Requests",
    color: "oklch(0.60 0.16 280)",
    description: "Rate limit exceeded. Back off and retry after the indicated delay.",
    body: `{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded 1000 requests per minute.",
    "retry_after_s": 12
  }
}`,
  },
]

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

export default function Documentation10() {
  const [activeStatus, setActiveStatus] = useState(200)
  const [copied, setCopied] = useState(false)
  const active = responses.find((r) => r.status === activeStatus)!

  function handleCopy() {
    navigator.clipboard.writeText(active.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Response Examples
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sample responses for <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">GET /v2/projects/:id/analytics</code> across status codes.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <div className="flex items-center gap-2 border-b bg-muted/20 px-4 py-2.5">
          {responses.map((r) => (
            <button
              key={r.status}
              onClick={() => setActiveStatus(r.status)}
              className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors ${
                activeStatus === r.status
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeStatus === r.status && (
                <motion.div
                  layoutId="doc10-tab"
                  className="absolute inset-0 rounded-md bg-background ring-1 ring-foreground/10"
                  style={{
                    boxShadow: "0 1px 2px rgba(20,20,15,0.04)",
                  }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.status}
              </span>
            </button>
          ))}
        </div>

        <div className="border-b px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Badge
              className="font-mono text-[11px] font-semibold tabular-nums text-white"
              style={{ backgroundColor: active.color }}
            >
              {active.status}
            </Badge>
            <span className="text-sm font-medium">{active.label}</span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {active.description}
          </p>
        </div>

        <div className="relative bg-slate-950">
          <div className="absolute right-3 top-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-[11px] text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <motion.pre
            key={activeStatus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-300"
          >
            {active.body}
          </motion.pre>
        </div>
      </motion.div>
    </motion.div>
  )
}
