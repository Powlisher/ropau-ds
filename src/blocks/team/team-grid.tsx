"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const members = [
  { name: "Claire Dubois", role: "Engineering Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face", initials: "CD", socials: { gh: "cdubois", li: "clairedubois", x: "@claire_d" } },
  { name: "Marco Bellini", role: "Senior Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face", initials: "MB", socials: { gh: "mbellini", li: "marcobellini", x: "@marco_b" } },
  { name: "Yuki Tanaka", role: "Backend Engineer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face", initials: "YT", socials: { gh: "ytanaka", li: "yukitanaka", x: "@yuki_t" } },
  { name: "Omar Hassan", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face", initials: "OH", socials: { gh: "ohassan", li: "omarhassan", x: "@omar_h" } },
  { name: "Sara Lindqvist", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face", initials: "SL", socials: { gh: "slindqvist", li: "saralindqvist", x: "@sara_l" } },
  { name: "Leo Fontaine", role: "Frontend Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face", initials: "LF", socials: { gh: "lfontaine", li: "leofontaine", x: "@leo_f" } },
  { name: "Ines Garcia", role: "QA Lead", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face", initials: "IG", socials: { gh: "igarcia", li: "inesgarcia", x: "@ines_g" } },
  { name: "Niklas Braun", role: "Data Engineer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face", initials: "NB", socials: { gh: "nbraun", li: "niklasbraun", x: "@niklas_b" } },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Our Team</h2>
        <p className="mt-1 text-sm text-muted-foreground">The people behind the product.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m) => (
          <motion.div
            key={m.name}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Card
              className="text-center"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="flex flex-col items-center gap-3 pt-2">
                <Avatar className="size-16 ring-2 ring-foreground/5">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback className="text-base font-semibold">{m.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold leading-snug">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <div className="flex gap-2">
                  {Object.entries(m.socials).map(([key, val]) => (
                    <a
                      key={key}
                      href="#"
                      className="flex size-7 items-center justify-center rounded-md text-[10px] font-semibold tracking-wide text-muted-foreground uppercase transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={key}
                    >
                      {key}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
