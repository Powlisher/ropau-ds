"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WalletIcon, ShieldCheckIcon, ZapIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const providers = [
  {
    name: "MetaMask",
    description: "Browser extension wallet",
    color: "#E2761B",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path d="M21.3 2L13.1 8.2l1.5-3.6L21.3 2z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.25" />
        <path d="M2.7 2l8.1 6.3-1.4-3.7L2.7 2zM18.4 16.8l-2.2 3.3 4.6 1.3 1.3-4.5-3.7-.1zM1.9 16.9l1.3 4.5 4.6-1.3-2.2-3.3-3.7.1z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
        <path d="M7.5 10.5L6.3 12.3l4.6.2-.2-4.9-3.2 2.9zM16.5 10.5l-3.2-3-.1 5 4.6-.2-1.3-1.8z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      </svg>
    ),
    users: "21M+ users",
  },
  {
    name: "WalletConnect",
    description: "Scan with mobile wallet",
    color: "#3B99FC",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path d="M6.1 8.6c3.3-3.2 8.5-3.2 11.8 0l.4.4c.2.2.2.4 0 .6l-1.3 1.3c-.1.1-.2.1-.3 0l-.5-.5c-2.3-2.2-5.9-2.2-8.2 0l-.6.5c-.1.1-.2.1-.3 0L5.8 9.6c-.2-.2-.2-.4 0-.6l.3-.4z" fill="#3B99FC" />
        <path d="M19.8 10.5l1.2 1.2c.2.2.2.4 0 .6l-5.2 5.1c-.2.2-.4.2-.6 0l-3.7-3.6c0-.1-.1-.1-.1 0l-3.7 3.6c-.2.2-.4.2-.6 0L2 12.3c-.2-.2-.2-.4 0-.6l1.2-1.2c.2-.2.4-.2.6 0l3.7 3.6c0 .1.1.1.1 0l3.7-3.6c.2-.2.4-.2.6 0l3.7 3.6c0 .1.1.1.1 0l3.7-3.6c.2-.1.4-.1.5 0z" fill="#3B99FC" />
      </svg>
    ),
    users: "15M+ users",
  },
  {
    name: "Coinbase Wallet",
    description: "Self-custody by Coinbase",
    color: "#0052FF",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0052FF" />
        <rect x="8" y="8" width="8" height="8" rx="2" fill="white" />
      </svg>
    ),
    users: "8.4M+ users",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3WalletConnect() {
  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-muted">
              <WalletIcon className="size-6 text-foreground" />
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight">Connect Wallet</CardTitle>
            <CardDescription>Choose your preferred wallet to interact with the protocol</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {providers.map((provider) => (
              <motion.div
                key={provider.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                <button
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
                  style={{ boxShadow: shadow }}
                >
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${provider.color}12` }}
                  >
                    {provider.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">{provider.description}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs tabular-nums shrink-0">
                    {provider.users}
                  </Badge>
                </button>
              </motion.div>
            ))}

            <div className="flex items-center gap-2 pt-3 text-xs text-muted-foreground">
              <ShieldCheckIcon className="size-3.5 shrink-0" />
              <span>Non-custodial. We never access your private keys.</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ZapIcon className="size-3.5 mr-1.5" />
                What is a wallet?
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums tracking-wide uppercase font-medium">
                EVM compatible
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
