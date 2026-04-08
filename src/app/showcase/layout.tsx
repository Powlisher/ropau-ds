"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ShowcaseSidebar } from "@/components/showcase/sidebar-nav"
import { ThemeEditor } from "@/components/showcase/theme-editor"

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      <ShowcaseSidebar />
      <SidebarInset>
        <div className="flex-1">{children}</div>
      </SidebarInset>
      <ThemeEditor />
    </SidebarProvider>
  )
}
