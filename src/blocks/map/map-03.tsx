"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPinIcon, SendIcon, MailIcon, PhoneIcon } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

function MapPlaceholder() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-muted/50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPinIcon className="size-5" />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-lg bg-card/90 px-3 py-2 text-xs text-muted-foreground backdrop-blur-sm ring-1 ring-border">
        814 NW Flanders St, Portland
      </div>
    </div>
  )
}

export default function Map03() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We would love to hear from you. Send us a message or visit our studio.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
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
                      First Name
                    </Label>
                    <Input placeholder="Marie" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Last Name
                    </Label>
                    <Input placeholder="Laurent" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Email
                  </Label>
                  <Input type="email" placeholder="marie@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Message
                  </Label>
                  <Textarea
                    placeholder="Tell us about your project or question..."
                    rows={4}
                  />
                </div>
                <motion.div whileHover={{ y: -2 }} transition={spring}>
                  <Button className="w-full gap-2">
                    <SendIcon className="size-4" />
                    Send Message
                  </Button>
                </motion.div>

                <div className="h-px bg-border" />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MailIcon className="size-4 flex-shrink-0" />
                    hello@luminary.studio
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <PhoneIcon className="size-4 flex-shrink-0" />
                    (503) 555-0147
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="aspect-square overflow-hidden rounded-xl ring-1 ring-border lg:aspect-auto"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <MapPlaceholder />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
