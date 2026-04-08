"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, PencilIcon } from "lucide-react"
import { motion } from "framer-motion"

const profile = {
  name: "Camille Durand-Viel",
  title: "Principal Product Designer",
  location: "Lyon, France",
  bio: "Designing systems that scale for humans, not just pixels. Previously at Datadog, Figma, and a tiny studio in Annecy that made beautiful things nobody used. Now I know better.",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face",
  coverGradient: "linear-gradient(135deg, oklch(0.45 0.22 3.6) 0%, oklch(0.52 0.29 25.1) 50%, oklch(0.60 0.18 40) 100%)",
}

export default function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
      }}
    >
      <div
        className="relative h-36 sm:h-48"
        style={{ background: profile.coverGradient }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
      </div>

      <div className="relative px-5 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:gap-6">
          <Avatar className="size-24 ring-4 ring-card sm:size-28">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-2xl font-semibold">CD</AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col gap-3 pt-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1.5">
              <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {profile.name}
              </h2>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
                <MapPinIcon className="size-3.5" />
                <span>{profile.location}</span>
              </div>
            </div>

            <Button variant="outline" className="w-fit gap-1.5">
              <PencilIcon className="size-3.5" />
              Edit Profile
            </Button>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {profile.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Design Systems</Badge>
          <Badge variant="secondary">Product Strategy</Badge>
          <Badge variant="secondary">Accessibility</Badge>
        </div>
      </div>
    </motion.div>
  )
}
