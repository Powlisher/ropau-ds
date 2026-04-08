"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VoteIcon, UsersIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const proposal = {
  id: "DIP-47",
  title: "Increase Treasury Allocation for Ecosystem Grants",
  description: "Proposal to redirect 2.5% of protocol fees toward a community grants fund, managed by a 5-of-9 multisig elected quarterly. Expected impact: $340K annually for builder grants.",
  author: "velvet.eth",
  status: "active" as const,
  endsIn: "2d 14h 37m",
  quorum: 67,
  forVotes: 1847293,
  againstVotes: 412081,
  abstainVotes: 89430,
  totalVoters: 2891,
  yourVotingPower: "12,340 GOV",
}

const totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes
const forPct = Math.round((proposal.forVotes / totalVotes) * 100)
const againstPct = Math.round((proposal.againstVotes / totalVotes) * 100)
const abstainPct = 100 - forPct - againstPct

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Web3DAOVoting() {
  return (
    <motion.div
      className="mx-auto max-w-lg space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadowLg }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wide font-medium">
                {proposal.id}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ClockIcon className="size-3" />
                <span className="tabular-nums">Ends in {proposal.endsIn}</span>
              </div>
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight mt-2 leading-snug">
              {proposal.title}
            </CardTitle>
            <CardDescription className="leading-relaxed mt-1">
              {proposal.description}
            </CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="size-5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
              <span className="text-sm text-muted-foreground">{proposal.author}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-emerald-600" />
                  <span className="font-medium text-foreground">For</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums font-medium">{forPct}%</span>
                  <span className="text-xs text-muted-foreground tabular-nums">({(proposal.forVotes / 1000000).toFixed(2)}M)</span>
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${forPct}%` }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.3 }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <XCircleIcon className="size-4 text-red-500" />
                  <span className="font-medium text-foreground">Against</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums font-medium">{againstPct}%</span>
                  <span className="text-xs text-muted-foreground tabular-nums">({(proposal.againstVotes / 1000).toFixed(0)}K)</span>
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${againstPct}%` }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.4 }}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Abstain</span>
                <span className="tabular-nums">{abstainPct}% ({(proposal.abstainVotes / 1000).toFixed(0)}K)</span>
              </div>
            </div>

            <div className="rounded-xl bg-muted/50 p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quorum</span>
                <span className="font-medium tabular-nums">{proposal.quorum}% reached</span>
              </div>
              <Progress value={proposal.quorum} className="h-1.5" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <UsersIcon className="size-3" />
                  <span className="tabular-nums">{proposal.totalVoters.toLocaleString()} voters</span>
                </div>
                <span className="tabular-nums">{(totalVotes / 1000000).toFixed(2)}M tokens cast</span>
              </div>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Your voting power</span>
                <span className="text-sm font-semibold tabular-nums">{proposal.yourVotingPower}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <VoteIcon className="size-3.5 mr-1.5" />
                  For
                </Button>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Against
                </Button>
                <Button variant="ghost" className="text-muted-foreground">
                  Abstain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
