"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  MapPinIcon,
  LinkIcon,
  GitCommitHorizontalIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const profile = {
  name: "Lena Hoffmann",
  handle: "@lena.h",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=256&h=256&fit=crop&crop=face",
  title: "Design Engineer",
  location: "Berlin, Germany",
  website: "lenahoffmann.design",
  bio: "I bridge the gap between design and engineering. Obsessed with motion, craft, and making interfaces that feel alive.",
  coverGradient: "linear-gradient(135deg, oklch(0.42 0.20 3.6) 0%, oklch(0.35 0.15 340) 100%)",
}

const projects = [
  { title: "Motion Kit", description: "Spring animation primitives for React", tags: ["React", "Motion"] },
  { title: "Type Scale", description: "Fluid typography calculator with live preview", tags: ["TypeScript", "CSS"] },
  { title: "Palette Lab", description: "OKLCH color space explorer and palette generator", tags: ["Svelte", "Color"] },
]

const activities = [
  { icon: GitCommitHorizontalIcon, text: "Pushed 3 commits to motion-kit/core", time: "2h ago" },
  { icon: MessageSquareIcon, text: "Commented on type-scale issue #42", time: "5h ago" },
  { icon: GitCommitHorizontalIcon, text: "Merged PR: fluid container queries", time: "1d ago" },
]

const connections = [
  { name: "Margaux P.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face", initials: "MP" },
  { name: "Julien A.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face", initials: "JA" },
  { name: "Sophia C.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face", initials: "SC" },
  { name: "Karim B.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face", initials: "KB" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function ProfilePublic() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl space-y-5"
    >
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
        }}
      >
        <div
          className="relative h-32 sm:h-40"
          style={{ background: profile.coverGradient }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        <div className="relative px-5 pb-5 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:gap-5">
            <Avatar className="size-20 ring-4 ring-card sm:size-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-xl font-semibold">LH</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-heading text-xl font-semibold tracking-tight">
                  {profile.name}
                </h2>
                <p className="text-sm text-muted-foreground">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/80">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="size-3" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <LinkIcon className="size-3" />
                    {profile.website}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Follow</Button>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-5 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Card
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardTitle>Top Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projects.slice(0, 2).map((p) => (
                    <div key={p.title} className="space-y-1">
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card
                style={{
                  boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                }}
              >
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activities.slice(0, 2).map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <a.icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-xs leading-snug">{a.text}</p>
                        <p className="text-[11px] tabular-nums text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <motion.div
                  key={p.title}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <Card
                    className="cursor-pointer"
                    style={{
                      boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                      <div className="flex gap-1.5">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-5">
            <Card
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="space-y-4 pt-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <a.icon className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-snug">{a.text}</p>
                      <p className="text-xs tabular-nums text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections" className="mt-5">
            <Card
              style={{
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
              }}
            >
              <CardContent className="space-y-3 pt-4">
                {connections.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
                    <Avatar className="size-9">
                      <AvatarImage src={c.avatar} alt={c.name} />
                      <AvatarFallback className="text-xs">{c.initials}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-sm font-medium">{c.name}</span>
                    <Button variant="outline" size="xs">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
