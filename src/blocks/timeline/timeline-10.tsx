"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Image, Link2, FileText, Play, ExternalLink } from "lucide-react"

type MediaType = "image" | "link" | "document" | "video"

const mediaIcons: Record<MediaType, typeof Image> = {
  image: Image,
  link: Link2,
  document: FileText,
  video: Play,
}

const entries = [
  {
    date: "Apr 7",
    time: "16:30",
    title: "New office space finalized",
    content: "Signed the lease for the Kreuzberg studio. 280sqm, open plan with 2 meeting rooms and a rooftop terrace. Move-in set for May 12.",
    media: [
      { type: "image" as MediaType, label: "Floor plan", color: "bg-sky-50 text-sky-600" },
      { type: "image" as MediaType, label: "Street view", color: "bg-sky-50 text-sky-600" },
      { type: "document" as MediaType, label: "Lease agreement", color: "bg-amber-50 text-amber-600" },
    ],
  },
  {
    date: "Apr 5",
    time: "11:15",
    title: "Brand guidelines V2 published",
    content: "Updated color palette, new illustration style, and motion principles. All teams should reference this for new work.",
    media: [
      { type: "link" as MediaType, label: "Figma library", color: "bg-violet-50 text-violet-600" },
      { type: "document" as MediaType, label: "Brand book PDF", color: "bg-amber-50 text-amber-600" },
    ],
  },
  {
    date: "Apr 3",
    time: "09:40",
    title: "Product demo recorded",
    content: "20-minute walkthrough of the collaboration features for the enterprise sales deck. Includes live multi-cursor demo and permissions flow.",
    media: [
      { type: "video" as MediaType, label: "Full recording (20:14)", color: "bg-rose-50 text-rose-600" },
      { type: "link" as MediaType, label: "Slide deck", color: "bg-violet-50 text-violet-600" },
    ],
  },
  {
    date: "Mar 29",
    time: "14:22",
    title: "Competitor analysis completed",
    content: "Deep-dive on 6 competitors across pricing, feature parity, and positioning. Key insight: nobody offers real-time + offline together.",
    media: [
      { type: "document" as MediaType, label: "Analysis report", color: "bg-amber-50 text-amber-600" },
      { type: "image" as MediaType, label: "Feature matrix screenshot", color: "bg-sky-50 text-sky-600" },
      { type: "link" as MediaType, label: "Source spreadsheet", color: "bg-violet-50 text-violet-600" },
      { type: "document" as MediaType, label: "Exec summary", color: "bg-amber-50 text-amber-600" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Timeline10() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Project Updates</h2>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Recent updates with attached resources</p>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[5px] top-4 bottom-4 w-px bg-border" />

        <div className="space-y-6">
          {entries.map((entry) => (
            <motion.div
              key={entry.title}
              variants={itemVariants}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-2 z-10 size-[11px] rounded-full bg-foreground ring-3 ring-background" />

              <motion.div
                whileHover={{ y: -1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                <Card
                  style={{
                    boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono font-medium tabular-nums tracking-wide text-muted-foreground uppercase">
                        {entry.date}
                      </span>
                      <span className="text-[11px] font-mono tabular-nums text-muted-foreground/60">
                        {entry.time}
                      </span>
                    </div>

                    <h3 className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {entry.content}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.media.map((m, i) => {
                        const Icon = mediaIcons[m.type]
                        return (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${m.color} transition-opacity hover:opacity-80`}
                          >
                            <Icon className="size-3" />
                            {m.label}
                            <ExternalLink className="size-2.5 opacity-50" />
                          </motion.button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
