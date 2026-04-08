"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPinIcon, LinkIcon, CalendarIcon, UsersIcon } from "lucide-react"
import { motion } from "framer-motion"

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"
const shadowLg = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)"

const profile = {
  name: "Elena Marchetti",
  handle: "@elenamarchetti",
  bio: "Design engineer. Building tools that feel inevitable. Previously at Linear, Vercel. Love typography, espresso, and the space between pixels.",
  location: "Milan, Italy",
  website: "elenamarchetti.design",
  joined: "March 2019",
  following: 847,
  followers: 12400,
  posts: 3291,
  avatar: "from-rose-400 to-pink-500",
  banner: "from-rose-200 via-pink-100 to-fuchsia-200",
}

const recentPosts = [
  { content: "Just shipped the new design system components. The spacing scale alone took 3 iterations...", time: "28m", likes: 247, gradient: "from-slate-100 via-stone-100 to-zinc-100" },
  { content: "Typography is the skeleton of design. Get the type right and everything else follows.", time: "4h", likes: 512, gradient: null },
  { content: "New blog post: 'Why your component library needs fewer components'", time: "1d", likes: 1841, gradient: "from-slate-50 via-stone-50 to-zinc-50" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function SocialProfile() {
  return (
    <motion.div
      className="mx-auto max-w-xl space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden" style={{ boxShadow: shadowLg }}>
          <div className={`h-28 bg-gradient-to-r ${profile.banner}`} />
          <CardContent className="pt-0 px-5 pb-5">
            <div className="flex items-end justify-between -mt-10">
              <div className={`size-20 rounded-full bg-gradient-to-br ${profile.avatar} ring-4 ring-card`} />
              <div className="flex items-center gap-2 mb-1">
                <Button variant="outline" size="sm">Message</Button>
                <Button size="sm">Follow</Button>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">{profile.name}</h1>
                <Badge variant="secondary" className="text-[10px]">Pro</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{profile.handle}</div>
            </div>

            <p className="text-sm text-foreground leading-relaxed mt-2">{profile.bio}</p>

            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {profile.location}
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="size-3.5" />
                <span className="text-foreground font-medium">{profile.website}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                Joined {profile.joined}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm">
              <div>
                <span className="font-semibold text-foreground tabular-nums">{profile.following.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold text-foreground tabular-nums">{(profile.followers / 1000).toFixed(1)}K</span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold text-foreground tabular-nums">{profile.posts.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">Posts</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3">
              <UsersIcon className="size-3.5 text-muted-foreground" />
              <div className="flex -space-x-1.5">
                {["from-blue-400 to-indigo-500", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500"].map((g, i) => (
                  <div key={i} className={`size-5 rounded-full bg-gradient-to-br ${g} ring-2 ring-card`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">Followed by marcus, fern, and 42 others</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {recentPosts.map((post, i) => (
        <motion.div key={i} variants={itemVariants}>
          <Card style={{ boxShadow: shadow }}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className={`size-9 rounded-full bg-gradient-to-br ${profile.avatar} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-foreground">{profile.name}</span>
                    <span className="text-sm text-muted-foreground">{profile.handle}</span>
                    <span className="text-muted-foreground/40">.</span>
                    <span className="text-sm text-muted-foreground">{post.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mt-1">{post.content}</p>
                  {post.gradient && (
                    <div className={`mt-2 rounded-xl bg-gradient-to-br ${post.gradient} aspect-video border border-border`} />
                  )}
                  <div className="text-xs text-muted-foreground mt-2 tabular-nums">{post.likes.toLocaleString()} likes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
