"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const categories = {
  primary: [
    { sender: "Elise Morand", initials: "EM", subject: "Q2 Campaign Brief - Review Needed", preview: "Hey, I've attached the updated brief for the Q2 campaign...", time: "10:24 AM", unread: true, color: "oklch(0.55 0.18 250)" },
    { sender: "Thomas Vigier", initials: "TV", subject: "Re: API rate limits discussion", preview: "I checked the logs and we're hitting the 429 threshold...", time: "9:47 AM", unread: true, color: "oklch(0.55 0.15 160)" },
    { sender: "Hugo Castellan", initials: "HC", subject: "Onboarding flow metrics", preview: "The new onboarding flow dropped completion from 67%...", time: "Yesterday", unread: false, color: "oklch(0.60 0.18 30)" },
  ],
  social: [
    { sender: "LinkedIn", initials: "Li", subject: "Amara Diallo commented on your post", preview: "Your post about design systems has 47 new reactions...", time: "8:15 AM", unread: true, color: "oklch(0.50 0.14 250)" },
    { sender: "Figma Community", initials: "Fi", subject: "Your component got 200 duplicates", preview: "Congrats! Your Premium Card component reached a new milestone...", time: "Yesterday", unread: false, color: "oklch(0.55 0.20 320)" },
  ],
  promotions: [
    { sender: "Vercel", initials: "Ve", subject: "Ship faster with Vercel v0.5", preview: "New features: Edge Middleware improvements, faster builds...", time: "Mar 30", unread: false, color: "oklch(0.20 0 0)" },
    { sender: "Tailwind Labs", initials: "TL", subject: "Tailwind CSS v4.1 is here", preview: "CSS-first configuration, container queries out of the box...", time: "Mar 28", unread: false, color: "oklch(0.55 0.17 200)" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function EmailList({ emails }: { emails: typeof categories.primary }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {emails.map((email) => (
        <motion.div
          key={email.subject}
          variants={itemVariants}
          whileHover={{ backgroundColor: "oklch(0.97 0 0)" }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          className="flex cursor-pointer gap-3 border-b border-border/50 px-4 py-3 last:border-0"
        >
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="text-[10px] font-semibold text-white" style={{ backgroundColor: email.color }}>
              {email.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className={`truncate text-sm ${email.unread ? "font-semibold" : "font-medium text-muted-foreground"}`}>
                {email.sender}
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground shrink-0">{email.time}</span>
            </div>
            <div className={`truncate text-xs ${email.unread ? "font-medium" : "text-muted-foreground"}`}>
              {email.subject}
            </div>
            <div className="truncate text-xs text-muted-foreground/60">{email.preview}</div>
          </div>
          {email.unread && (
            <div className="mt-1.5 shrink-0">
              <div className="size-1.5 rounded-full" style={{ backgroundColor: "oklch(0.55 0.18 250)" }} />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Inbox04() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">Inbox</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Tabs defaultValue="primary">
          <div className="px-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="primary" className="gap-1.5 text-xs">
                Primary
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-[9px] tabular-nums">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-1.5 text-xs">
                Social
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-[9px] tabular-nums">1</Badge>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="text-xs">
                Promotions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="primary" className="mt-0">
            <EmailList emails={categories.primary} />
          </TabsContent>
          <TabsContent value="social" className="mt-0">
            <EmailList emails={categories.social} />
          </TabsContent>
          <TabsContent value="promotions" className="mt-0">
            <EmailList emails={categories.promotions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
