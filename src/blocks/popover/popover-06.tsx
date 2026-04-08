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
import { SmileIcon } from "lucide-react"

const emojiCategories = [
  {
    label: "Smileys",
    emojis: [
      { char: "\u{1F60A}", name: "smiling" },
      { char: "\u{1F602}", name: "laughing" },
      { char: "\u{1F60D}", name: "heart eyes" },
      { char: "\u{1F914}", name: "thinking" },
      { char: "\u{1F44D}", name: "thumbs up" },
      { char: "\u{1F389}", name: "party" },
      { char: "\u{2764}\u{FE0F}", name: "heart" },
      { char: "\u{1F525}", name: "fire" },
      { char: "\u{1F680}", name: "rocket" },
      { char: "\u{2728}", name: "sparkles" },
      { char: "\u{1F4AF}", name: "hundred" },
      { char: "\u{1F44F}", name: "clap" },
    ],
  },
  {
    label: "Objects",
    emojis: [
      { char: "\u{1F4BB}", name: "laptop" },
      { char: "\u{1F4F1}", name: "phone" },
      { char: "\u{1F3A8}", name: "palette" },
      { char: "\u{1F4DD}", name: "memo" },
      { char: "\u{1F4E6}", name: "package" },
      { char: "\u{1F511}", name: "key" },
      { char: "\u{1F6E1}\u{FE0F}", name: "shield" },
      { char: "\u{26A1}", name: "lightning" },
      { char: "\u{1F4CA}", name: "chart" },
      { char: "\u{1F50D}", name: "search" },
      { char: "\u{1F4A1}", name: "bulb" },
      { char: "\u{2699}\u{FE0F}", name: "gear" },
    ],
  },
  {
    label: "Nature",
    emojis: [
      { char: "\u{1F33F}", name: "herb" },
      { char: "\u{1F338}", name: "cherry blossom" },
      { char: "\u{1F30D}", name: "globe" },
      { char: "\u{2600}\u{FE0F}", name: "sun" },
      { char: "\u{1F319}", name: "moon" },
      { char: "\u{1F30A}", name: "wave" },
      { char: "\u{1F3D4}\u{FE0F}", name: "mountain" },
      { char: "\u{1F332}", name: "tree" },
      { char: "\u{1F33B}", name: "sunflower" },
      { char: "\u{1F308}", name: "rainbow" },
      { char: "\u{2744}\u{FE0F}", name: "snowflake" },
      { char: "\u{1F343}", name: "leaf" },
    ],
  },
]

export default function Popover06() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = emojiCategories
    .map((cat) => ({
      ...cat,
      emojis: cat.emojis.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.emojis.length > 0)

  return (
    <div className="flex min-h-[400px] items-center justify-center gap-3">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="icon" />}>
          {selected ? (
            <span className="text-base">{selected}</span>
          ) : (
            <SmileIcon />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <PopoverHeader className="p-3 pb-0">
            <PopoverTitle>Pick a reaction</PopoverTitle>
          </PopoverHeader>
          <div className="p-3 pt-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs"
            />
          </div>
          <div className="max-h-52 overflow-y-auto px-3 pb-3">
            {filtered.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No results for &ldquo;{search}&rdquo;
              </p>
            )}
            {filtered.map((cat) => (
              <div key={cat.label} className="mb-3 last:mb-0">
                <p className="mb-1.5 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {cat.label}
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {cat.emojis.map((emoji) => (
                    <button
                      key={emoji.name}
                      onClick={() => setSelected(emoji.char)}
                      className="flex size-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-muted"
                      title={emoji.name}
                    >
                      {emoji.char}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {selected && (
        <span className="text-sm text-muted-foreground">
          Selected: {selected}
        </span>
      )}
    </div>
  )
}
