"use client"

import { motion } from "framer-motion"
import { Key, Copy, Eye, EyeOff, Trash2, Plus, Shield } from "lucide-react"
import { useState } from "react"

const apiKeys = [
  { id: "1", name: "Production API", key: "rpau_live_4eC39HqLyjWDarjtT1zdp7dc", created: "Jan 12, 2024", lastUsed: "3 min ago", permissions: "Full access" },
  { id: "2", name: "Staging Webhook", key: "rpau_rpwh_3sJ8kW2mN7xQpR4vL6", created: "Feb 8, 2024", lastUsed: "2 hours ago", permissions: "Read only" },
  { id: "3", name: "Analytics Read", key: "rpau_test_9fG2hR5kM8nT3wX6yB4c", created: "Mar 22, 2024", lastUsed: "Yesterday", permissions: "Read only" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function MaskedKey({ apiKey }: { apiKey: string }) {
  const [visible, setVisible] = useState(false)
  const masked = apiKey.slice(0, 7) + "..." + apiKey.slice(-4)

  return (
    <div className="flex items-center gap-2">
      <code className="font-mono text-xs tabular-nums text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-md">
        {visible ? apiKey : masked}
      </code>
      <button
        onClick={() => setVisible(!visible)}
        className="p-1 text-muted-foreground/30 hover:text-foreground transition-colors"
      >
        {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
      <button className="p-1 text-muted-foreground/30 hover:text-foreground transition-colors">
        <Copy className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function Integration04() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xl mx-auto">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
            <Key className="h-5 w-5 text-foreground/60" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              API Keys
            </h2>
            <p className="text-xs text-muted-foreground/60">{apiKeys.length} keys active</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          className="flex items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-xs font-medium text-background"
        >
          <Plus className="h-3.5 w-3.5" />
          Create key
        </motion.button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200/40 mb-4"
      >
        <Shield className="h-4 w-4 text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800/80">
          API keys grant access to your account. Never share them publicly or commit to source control.
        </p>
      </motion.div>

      <div className="space-y-2">
        {apiKeys.map((key) => (
          <motion.div
            key={key.id}
            variants={itemVariants}
            className="rounded-xl bg-card p-4 ring-1 ring-foreground/5"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-foreground">{key.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground/40">
                    {key.permissions}
                  </span>
                  <span className="text-muted-foreground/20">·</span>
                  <span className="text-[10px] text-muted-foreground/40">Created {key.created}</span>
                </div>
              </div>
              <button className="p-1.5 text-muted-foreground/20 hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <MaskedKey apiKey={key.key} />
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
                Last used {key.lastUsed}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
