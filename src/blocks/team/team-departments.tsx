"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const departments: Record<string, Array<{ name: string; role: string; avatar: string; initials: string }>> = {
  Engineering: [
    { name: "Claire Dubois", role: "Engineering Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face", initials: "CD" },
    { name: "Yuki Tanaka", role: "Backend Engineer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face", initials: "YT" },
    { name: "Sara Lindqvist", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face", initials: "SL" },
    { name: "Leo Fontaine", role: "Frontend Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face", initials: "LF" },
  ],
  Design: [
    { name: "Marco Bellini", role: "Senior Designer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face", initials: "MB" },
    { name: "Ines Garcia", role: "UX Researcher", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face", initials: "IG" },
  ],
  Product: [
    { name: "Omar Hassan", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&crop=face", initials: "OH" },
    { name: "Niklas Braun", role: "Product Analyst", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face", initials: "NB" },
    { name: "Alix Moreau", role: "Growth Lead", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face", initials: "AM" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TeamDepartments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full"
    >
      <Tabs defaultValue="Engineering">
        <TabsList variant="line">
          {Object.keys(departments).map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
              <span className="ml-1 text-xs tabular-nums text-muted-foreground">
                {departments[dept].length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(departments).map(([dept, members]) => (
          <TabsContent key={dept} value={dept} className="mt-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {members.map((m) => (
                <motion.div
                  key={m.name}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardContent className="flex items-center gap-4 pt-2">
                      <Avatar className="size-12 ring-2 ring-foreground/5">
                        <AvatarImage src={m.avatar} alt={m.name} />
                        <AvatarFallback className="text-sm font-semibold">{m.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-snug">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  )
}
