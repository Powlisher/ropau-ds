"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AwardIcon, SendIcon } from "lucide-react"

const categories = [
  "Technical Excellence",
  "Customer Impact",
  "Team Collaboration",
  "Innovation",
  "Leadership",
  "Community Building",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function Awards05() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-500/10">
            <AwardIcon className="size-6 text-amber-600" />
          </div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Nominate a Colleague
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Recognize someone who has gone above and beyond.
            Nominations close April 30, 2026.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-5 py-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Nominee Name
                  </Label>
                  <Input placeholder="Sofia Chen" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Nominee Email
                  </Label>
                  <Input type="email" placeholder="sofia@company.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Award Category
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase().replace(/\s/g, "-")}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Nomination Reason
                </Label>
                <Textarea
                  placeholder="Describe the specific contributions or behaviors that make this person stand out..."
                  rows={4}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Supporting Evidence (optional)
                </Label>
                <Input placeholder="Link to project, document, or Slack thread" />
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Your nomination is anonymous by default.
                </p>
                <motion.div whileHover={{ y: -2 }} transition={spring}>
                  <Button className="gap-2">
                    <SendIcon className="size-4" />
                    Submit Nomination
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
