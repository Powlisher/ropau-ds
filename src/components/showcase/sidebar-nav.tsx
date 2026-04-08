"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Layers, Sparkles, LayoutGrid, Search } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  uiComponents,
  aiComponents,
  blockComponents,
  blockSubcategories,
  type RegistryEntry,
  type BlockSubcategory,
} from "@/lib/component-registry"

function groupBlocksBySubcategory(blocks: RegistryEntry[]) {
  const grouped: Record<string, RegistryEntry[]> = {}
  for (const block of blocks) {
    const sub = block.subcategory || "other"
    if (!grouped[sub]) grouped[sub] = []
    grouped[sub].push(block)
  }
  return grouped
}

export function ShowcaseSidebar() {
  const pathname = usePathname()
  const [filter, setFilter] = React.useState("")
  const lower = filter.toLowerCase()

  const filteredUi = lower
    ? uiComponents.filter((c) => c.name.toLowerCase().includes(lower))
    : uiComponents
  const filteredAi = lower
    ? aiComponents.filter((c) => c.name.toLowerCase().includes(lower))
    : aiComponents
  const filteredBlocks = lower
    ? blockComponents.filter((c) => c.name.toLowerCase().includes(lower))
    : blockComponents

  const grouped = groupBlocksBySubcategory(filteredBlocks)

  return (
    <Sidebar collapsible="none" className="border-r border-border">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <Link
          href="/showcase"
          className="flex items-center gap-2.5 px-1 mb-3"
        >
          <div
            className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
            }}
          >
            <Layers className="size-3.5" />
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight">ropau-ds</span>
            <span className="ml-1.5 text-[10px] font-medium text-muted-foreground tabular-nums">v0.1</span>
          </div>
        </Link>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter components..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {filteredUi.length > 0 && (
          <NavSection
            icon={<Layers className="size-3.5" />}
            label="UI Components"
            count={uiComponents.length}
            defaultOpen
          >
            <SidebarMenu>
              {filteredUi.map((c) => (
                <SidebarMenuItem key={c.slug}>
                  <SidebarMenuButton
                    isActive={pathname === `/showcase/ui/${c.slug}`}
                    render={<Link href={`/showcase/ui/${c.slug}`} />}
                    size="sm"
                  >
                    <span>{c.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </NavSection>
        )}

        {filteredAi.length > 0 && (
          <NavSection
            icon={<Sparkles className="size-3.5" />}
            label="AI Components"
            count={aiComponents.length}
            defaultOpen
          >
            <SidebarMenu>
              {filteredAi.map((c) => (
                <SidebarMenuItem key={c.slug}>
                  <SidebarMenuButton
                    isActive={pathname === `/showcase/ai/${c.slug}`}
                    render={<Link href={`/showcase/ai/${c.slug}`} />}
                    size="sm"
                  >
                    <span>{c.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </NavSection>
        )}

        {filteredBlocks.length > 0 && (
          <NavSection
            icon={<LayoutGrid className="size-3.5" />}
            label="Blocks"
            count={blockComponents.length}
            defaultOpen={!!lower}
          >
            <SidebarMenu>
              {blockSubcategories.map((sub) => {
                const items = grouped[sub.slug]
                if (!items || items.length === 0) return null
                return (
                  <BlockSubNav
                    key={sub.slug}
                    label={sub.label}
                    subcategory={sub.slug}
                    items={items}
                    pathname={pathname}
                  />
                )
              })}
            </SidebarMenu>
          </NavSection>
        )}
      </SidebarContent>
    </Sidebar>
  )
}

function NavSection({
  icon,
  label,
  count,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode
  label: string
  count: number
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarGroup>
        <CollapsibleTrigger
          className="flex h-8 w-full shrink-0 cursor-pointer select-none items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opacity] duration-200 ease-linear hover:bg-sidebar-accent group/label"
        >
          {icon}
          <span className="flex-1 ml-1.5">{label}</span>
          <span className="font-mono text-[10px] tabular-nums opacity-50">{count}</span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-200 [[data-open]_&]:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

function BlockSubNav({
  label,
  subcategory,
  items,
  pathname,
}: {
  label: string
  subcategory: BlockSubcategory
  items: RegistryEntry[]
  pathname: string
}) {
  const hasActive = items.some(
    (i) => pathname === `/showcase/block/${subcategory}/${i.slug}`
  )

  return (
    <Collapsible defaultOpen={hasActive}>
      <SidebarMenuItem>
        <CollapsibleTrigger
          className="peer/menu-button flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-left text-xs ring-sidebar-ring outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-7"
        >
          <span>{label}</span>
          <span className="ml-auto font-mono text-[10px] tabular-nums opacity-50">{items.length}</span>
          <ChevronRight className="size-3 transition-transform duration-200 [[data-open]_&]:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item) => (
              <SidebarMenuSubItem key={item.slug}>
                <SidebarMenuSubButton
                  isActive={pathname === `/showcase/block/${subcategory}/${item.slug}`}
                  render={<Link href={`/showcase/block/${subcategory}/${item.slug}`} />}
                  size="sm"
                >
                  <span>{item.name}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
