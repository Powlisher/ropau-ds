"use client"

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlobeIcon, CheckIcon, SearchIcon } from "lucide-react"

const languages = [
  { code: "en", label: "English", native: "English", region: "US" },
  { code: "fr", label: "French", native: "Fran\u00e7ais", region: "FR" },
  { code: "de", label: "German", native: "Deutsch", region: "DE" },
  { code: "es", label: "Spanish", native: "Espa\u00f1ol", region: "ES" },
  { code: "pt", label: "Portuguese", native: "Portugu\u00eas", region: "BR" },
  { code: "ja", label: "Japanese", native: "\u65e5\u672c\u8a9e", region: "JP" },
  { code: "ko", label: "Korean", native: "\ud55c\uad6d\uc5b4", region: "KR" },
  { code: "zh", label: "Chinese", native: "\u4e2d\u6587", region: "CN" },
  { code: "ar", label: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", region: "SA" },
  { code: "nl", label: "Dutch", native: "Nederlands", region: "NL" },
]

export default function Popover09() {
  const [selected, setSelected] = useState("en")
  const [search, setSearch] = useState("")

  const filtered = languages.filter(
    (l) =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase())
  )

  const current = languages.find((l) => l.code === selected)

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <GlobeIcon data-icon="inline-start" />
          {current?.label ?? "Language"}
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0">
          <PopoverHeader className="p-3 pb-0">
            <PopoverTitle>Language</PopoverTitle>
          </PopoverHeader>
          <div className="p-3 pt-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search languages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-7 text-xs"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto px-1.5 pb-1.5">
            {filtered.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No languages found
              </p>
            )}
            {filtered.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  selected === lang.code
                    ? "bg-muted font-medium"
                    : "hover:bg-muted/50"
                }`}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold tracking-wide uppercase text-muted-foreground">
                  {lang.region}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block truncate">{lang.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {lang.native}
                  </span>
                </div>
                {selected === lang.code && (
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
