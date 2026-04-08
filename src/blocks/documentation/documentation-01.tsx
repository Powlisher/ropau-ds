"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const endpoints = [
  {
    method: "GET",
    path: "/v2/projects/{project_id}/analytics",
    description: "Returns aggregated analytics for a project over a given time range.",
    params: [
      { name: "project_id", type: "string", required: true, desc: "Unique project identifier" },
      { name: "from", type: "ISO 8601", required: true, desc: "Start of the time range" },
      { name: "to", type: "ISO 8601", required: false, desc: "End of range (defaults to now)" },
      { name: "granularity", type: "enum", required: false, desc: "hour | day | week | month" },
    ],
    response: '{\n  "total_views": 48293,\n  "unique_visitors": 12847,\n  "avg_session_s": 214,\n  "bounce_rate": 0.34\n}',
  },
  {
    method: "POST",
    path: "/v2/projects/{project_id}/events",
    description: "Ingests a batch of custom events. Max 500 events per request.",
    params: [
      { name: "project_id", type: "string", required: true, desc: "Unique project identifier" },
      { name: "events", type: "Event[]", required: true, desc: "Array of event objects" },
      { name: "deduplicate", type: "boolean", required: false, desc: "Skip duplicate event IDs" },
    ],
    response: '{\n  "accepted": 487,\n  "rejected": 13,\n  "errors": []\n}',
  },
]

const methodColors: Record<string, string> = {
  GET: "oklch(0.55 0.15 150)",
  POST: "oklch(0.55 0.15 250)",
  PUT: "oklch(0.58 0.14 55)",
  DELETE: "oklch(0.55 0.15 25)",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function Documentation01() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Endpoints for the Analytics API v2. All requests require a valid Bearer token.
        </p>
      </motion.div>

      <div className="space-y-6">
        {endpoints.map((ep, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-center gap-3 border-b px-5 py-3.5">
              <Badge
                className="font-mono text-[11px] font-semibold tabular-nums text-white"
                style={{ backgroundColor: methodColors[ep.method] }}
              >
                {ep.method}
              </Badge>
              <code className="font-mono text-sm tracking-tight text-foreground/90">
                {ep.path}
              </code>
            </div>

            <div className="px-5 py-4">
              <p className="text-sm text-muted-foreground">{ep.description}</p>

              <div className="mt-4">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Parameters
                </p>
                <div className="overflow-hidden rounded-lg ring-1 ring-foreground/5">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-muted/40">
                        <th className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Name
                        </th>
                        <th className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Type
                        </th>
                        <th className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Required
                        </th>
                        <th className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ep.params.map((p) => (
                        <tr key={p.name} className="border-t border-foreground/5">
                          <td className="px-3 py-2 font-mono text-xs tabular-nums">
                            {p.name}
                          </td>
                          <td className="px-3 py-2 font-mono text-xs tabular-nums text-muted-foreground">
                            {p.type}
                          </td>
                          <td className="px-3 py-2">
                            {p.required ? (
                              <span className="text-xs font-medium" style={{ color: "oklch(0.55 0.15 25)" }}>
                                Yes
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">No</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">
                            {p.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Response
                  </p>
                  <button
                    onClick={() => handleCopy(ep.response, idx)}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copiedIdx === idx ? (
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
                  </button>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300">
                  {ep.response}
                </pre>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
