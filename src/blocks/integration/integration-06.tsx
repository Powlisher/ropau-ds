"use client"

import { motion } from "framer-motion"
import { Link2, Unlink, ExternalLink, Shield, RefreshCw } from "lucide-react"
import { useState } from "react"

const connections = [
  {
    provider: "Google Workspace",
    email: "team@acme.co",
    connected: true,
    scopes: ["Calendar read/write", "Contacts read", "Drive read"],
    connectedDate: "Oct 14, 2023",
    gradient: "linear-gradient(135deg, oklch(0.55 0.10 25) 0%, oklch(0.48 0.14 10) 100%)",
    initial: "G",
  },
  {
    provider: "Linear",
    email: "workspace: acme-eng",
    connected: true,
    scopes: ["Issues read/write", "Projects read", "Webhooks"],
    connectedDate: "Jan 3, 2024",
    gradient: "linear-gradient(135deg, oklch(0.48 0.16 280) 0%, oklch(0.38 0.12 300) 100%)",
    initial: "L",
  },
  {
    provider: "Notion",
    email: null,
    connected: false,
    scopes: ["Pages read/write", "Databases read"],
    connectedDate: null,
    gradient: "linear-gradient(135deg, oklch(0.35 0.02 260) 0%, oklch(0.25 0.01 240) 100%)",
    initial: "N",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration06() {
  const [conns, setConns] = useState(connections)

  const toggleConnection = (provider: string) => {
    setConns((prev) =>
      prev.map((c) =>
        c.provider === provider ? { ...c, connected: !c.connected } : c
      )
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          OAuth Connections
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage third-party access to your workspace
        </p>
      </motion.div>

      <div className="space-y-3">
        {conns.map((conn) => (
          <motion.div
            key={conn.provider}
            variants={itemVariants}
            className="rounded-2xl bg-card p-5 ring-1 ring-foreground/5"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start gap-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white/80"
                style={{ background: conn.gradient }}
              >
                {conn.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{conn.provider}</h3>
                  {conn.connected && (
                    <Link2 className="h-3 w-3 text-emerald-500" />
                  )}
                </div>
                {conn.email && (
                  <p className="text-xs text-muted-foreground/50 mt-0.5">{conn.email}</p>
                )}
              </div>
            </div>

            {conn.connected && (
              <div className="mt-3.5 pt-3.5 border-t border-border/30">
                <div className="flex items-center gap-1.5 mb-2">
                  <Shield className="h-3 w-3 text-muted-foreground/30" />
                  <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-muted-foreground/40">
                    Permissions
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {conn.scopes.map((scope) => (
                    <span
                      key={scope}
                      className="text-[10px] font-medium text-muted-foreground/50 bg-muted/50 px-2 py-0.5 rounded-md"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
                    Connected {conn.connectedDate}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/40 hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
                      <RefreshCw className="h-3 w-3" />
                      Reauthorize
                    </button>
                    <button
                      onClick={() => toggleConnection(conn.provider)}
                      className="flex items-center gap-1 text-[10px] font-medium text-red-400 hover:text-red-600 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      <Unlink className="h-3 w-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!conn.connected && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                onClick={() => toggleConnection(conn.provider)}
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-medium text-foreground hover:bg-muted/30 transition-colors"
              >
                <Link2 className="h-3.5 w-3.5" />
                Connect {conn.provider}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
