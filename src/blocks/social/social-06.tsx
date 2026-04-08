"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, UserCheckIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const tabs = ["Followers", "Following"]

const followers = [
  { name: "Marcus Chen", handle: "@marcuschen", bio: "Full-stack engineer at Vercel. Open source contributor.", avatar: "from-blue-400 to-indigo-500", followsYou: true, isFollowing: false },
  { name: "Priya Patel", handle: "@priyapatel", bio: "Product designer. Making complex things simple.", avatar: "from-amber-400 to-orange-500", followsYou: true, isFollowing: true },
  { name: "Liam O'Brien", handle: "@liamobrien", bio: "Startup founder. Building the future of payments.", avatar: "from-emerald-400 to-teal-500", followsYou: false, isFollowing: false },
  { name: "Sofia Andersson", handle: "@sofiaand", bio: "Creative director. Storytelling through interfaces.", avatar: "from-violet-400 to-fuchsia-500", followsYou: true, isFollowing: true },
  { name: "Kai Nakamura", handle: "@kainakamura", bio: "iOS engineer. Obsessed with smooth animations.", avatar: "from-cyan-400 to-blue-500", followsYou: false, isFollowing: false },
  { name: "Nora Williams", handle: "@norawilliams", bio: "Brand strategist. Words matter.", avatar: "from-rose-300 to-red-400", followsYou: true, isFollowing: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialFollowersList() {
  const [activeTab, setActiveTab] = useState("Followers")
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(followers.map((f) => [f.handle, f.isFollowing]))
  )

  return (
    <motion.div
      className="mx-auto max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card style={{ boxShadow: shadow }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold tracking-tight">Connections</CardTitle>
            <div className="flex items-center gap-1 mt-2 bg-muted rounded-lg p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input placeholder="Search people..." className="pl-9" />
            </div>

            <motion.div
              className="space-y-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeTab}
            >
              {followers.map((person) => (
                <motion.div
                  key={person.handle}
                  variants={itemVariants}
                  className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-muted/40 transition-colors"
                >
                  <div className={`size-10 rounded-full bg-gradient-to-br ${person.avatar} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground truncate">{person.name}</span>
                      {person.followsYou && (
                        <Badge variant="secondary" className="text-[9px] px-1 py-0">Follows you</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{person.handle}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{person.bio}</div>
                  </div>
                  <Button
                    variant={following[person.handle] ? "outline" : "default"}
                    size="sm"
                    className="shrink-0 h-8 text-xs"
                    onClick={() => setFollowing((prev) => ({ ...prev, [person.handle]: !prev[person.handle] }))}
                  >
                    {following[person.handle] ? (
                      <><UserCheckIcon className="size-3 mr-1" /> Following</>
                    ) : (
                      "Follow"
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
