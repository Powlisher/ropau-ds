"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  ShoppingCartIcon,
  SearchIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  PackageIcon,
} from "lucide-react"
import { motion } from "framer-motion"

const navLinks = [
  { label: "New Arrivals", href: "#new" },
  { label: "Collections", href: "#collections" },
  { label: "Sale", href: "#sale" },
]

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

export default function NavbarCartPreview() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-sm font-bold tracking-tight text-primary-foreground">
              R
            </span>
          </div>
          <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
            Ropau
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              transition={spring}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="h-8 w-44 pl-8 text-sm"
            />
          </div>

          <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground">
            <ShoppingCartIcon className="size-4" />
            <Badge className="absolute -top-1 -right-1 flex size-4 items-center justify-center p-0 text-[10px] font-semibold tabular-nums">
              3
            </Badge>
            <span className="sr-only">Cart with 3 items</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center rounded-lg p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                  <Avatar size="sm">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                </button>
              }
            />
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuLabel>Thomas K.</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PackageIcon />
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}
