"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ImageIcon,
} from "lucide-react"

const images = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
    alt: "Abstract gradient artwork with warm tones",
    name: "brand-gradient-v3.png",
    size: "2.4 MB",
    dimensions: "2400 x 1600",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop",
    alt: "Geometric pattern in deep blue and gold",
    name: "pattern-geometric-01.png",
    size: "1.8 MB",
    dimensions: "2400 x 1600",
  },
  {
    src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=1200&h=800&fit=crop",
    alt: "Neon light trails on dark background",
    name: "hero-visual-dark.jpg",
    size: "3.1 MB",
    dimensions: "3200 x 2133",
  },
]

export default function Modal05() {
  const [current, setCurrent] = useState(0)
  const image = images[current]

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <ImageIcon data-icon="inline-start" />
          Preview assets
        </DialogTrigger>
        <DialogContent
          className="overflow-hidden bg-slate-950 p-0 ring-slate-800 sm:max-w-3xl"
          showCloseButton={false}
        >
          <div className="relative">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white/70 hover:bg-white/10 hover:text-white"
              >
                <DownloadIcon />
              </Button>
              <DialogClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/70 hover:bg-white/10 hover:text-white"
                  />
                }
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="flex aspect-[3/2] items-center justify-center bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-contain"
              />
            </div>

            <button
              onClick={() =>
                setCurrent((c) => (c - 1 + images.length) % images.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">{image.name}</p>
              <p className="text-xs text-slate-400">
                <span className="font-mono tabular-nums">
                  {image.dimensions}
                </span>
                <span className="mx-1.5 text-slate-600">/</span>
                <span className="font-mono tabular-nums">{image.size}</span>
              </p>
            </div>
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === current
                      ? "w-4 bg-white"
                      : "w-1 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
