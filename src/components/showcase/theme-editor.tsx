"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Paintbrush, RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

const themeVars = [
  { key: "--primary", label: "Primary", default: "oklch(0.478 0.227 3.6)" },
  { key: "--accent", label: "Accent", default: "oklch(0.519 0.292 25.1)" },
  { key: "--background", label: "Background", default: "oklch(1 0 0)" },
  { key: "--foreground", label: "Foreground", default: "oklch(0.145 0 0)" },
  { key: "--muted", label: "Muted", default: "oklch(0.97 0 0)" },
  { key: "--border", label: "Border", default: "oklch(0.922 0 0)" },
] as const

function oklchToHex(oklch: string): string {
  const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
  if (!match) return "#888888"
  const [, l, c, h] = match.map(Number)
  const a_ = c * Math.cos((h * Math.PI) / 180)
  const b_ = c * Math.sin((h * Math.PI) / 180)

  const lAdj = l + 0.3963377774 * a_ + 0.2158037573 * b_
  const mAdj = l - 0.1055613458 * a_ - 0.0638541728 * b_
  const sAdj = l - 0.0894841775 * a_ - 1.2914855480 * b_

  const lCubed = lAdj * lAdj * lAdj
  const mCubed = mAdj * mAdj * mAdj
  const sCubed = sAdj * sAdj * sAdj

  const r = 4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed
  const g = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed
  const bVal = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.7076147010 * sCubed

  const clamp = (v: number) => Math.max(0, Math.min(1, v))
  const toHex = (v: number) =>
    Math.round(clamp(v) * 255)
      .toString(16)
      .padStart(2, "0")

  return `#${toHex(r)}${toHex(g)}${toHex(bVal)}`
}

function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

  const lLong = Math.cbrt(0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB)
  const mLong = Math.cbrt(0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB)
  const sLong = Math.cbrt(0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB)

  const l = 0.2104542553 * lLong + 0.7936177850 * mLong - 0.0040720468 * sLong
  const a = 1.9779984951 * lLong - 2.4285922050 * mLong + 0.4505937099 * sLong
  const bOklab = 0.0259040371 * lLong + 0.7827717662 * mLong - 0.8086757660 * sLong

  const c = Math.sqrt(a * a + bOklab * bOklab)
  let h = (Math.atan2(bOklab, a) * 180) / Math.PI
  if (h < 0) h += 360

  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`
}

export function ThemeEditor() {
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [radius, setRadius] = React.useState([0.625])

  React.useEffect(() => {
    const initial: Record<string, string> = {}
    const style = getComputedStyle(document.documentElement)
    for (const v of themeVars) {
      const raw = style.getPropertyValue(v.key).trim()
      initial[v.key] = raw || v.default
    }
    setValues(initial)
    const rawR = style.getPropertyValue("--radius").trim()
    if (rawR) setRadius([parseFloat(rawR)])
  }, [])

  const updateVar = React.useCallback((key: string, oklchValue: string) => {
    document.documentElement.style.setProperty(key, oklchValue)
    setValues((prev) => ({ ...prev, [key]: oklchValue }))
  }, [])

  const updateRadius = React.useCallback((val: number | readonly number[]) => {
    const arr = Array.isArray(val) ? [...val] : [val]
    setRadius(arr)
    document.documentElement.style.setProperty("--radius", `${arr[0]}rem`)
  }, [])

  const reset = React.useCallback(() => {
    for (const v of themeVars) {
      document.documentElement.style.removeProperty(v.key)
    }
    document.documentElement.style.removeProperty("--radius")
    const style = getComputedStyle(document.documentElement)
    const fresh: Record<string, string> = {}
    for (const v of themeVars) {
      fresh[v.key] = style.getPropertyValue(v.key).trim() || v.default
    }
    setValues(fresh)
    setRadius([0.625])
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 z-50 size-11 rounded-full"
        style={{
          boxShadow:
            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
        aria-label="Open theme editor"
      >
        <Paintbrush className="size-4" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/5 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-[340px] flex-col border-l border-border bg-card"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04), 0 32px 64px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">Theme Editor</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Modify CSS variables in real-time</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setOpen(false)}
                  aria-label="Close theme editor"
                >
                  <X />
                </Button>
              </div>

              <Separator />

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                <div>
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Colors</p>
                  <div className="space-y-4">
                    {themeVars.map((v) => {
                      const currentOklch = values[v.key] || v.default
                      const hex = oklchToHex(currentOklch)
                      return (
                        <div key={v.key} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">{v.label}</Label>
                            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                              {currentOklch}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div
                              className="relative size-8 shrink-0 overflow-hidden rounded-md ring-1 ring-foreground/10"
                              style={{ backgroundColor: hex }}
                            >
                              <input
                                type="color"
                                value={hex}
                                onChange={(e) => {
                                  const newOklch = hexToOklch(e.target.value)
                                  updateVar(v.key, newOklch)
                                }}
                                className="absolute inset-0 cursor-pointer opacity-0"
                                aria-label={`Pick color for ${v.label}`}
                              />
                            </div>
                            <input
                              type="text"
                              value={hex}
                              onChange={(e) => {
                                if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                                  updateVar(v.key, hexToOklch(e.target.value))
                                }
                              }}
                              className="h-7 w-full rounded-md border border-input bg-transparent px-2 font-mono text-xs text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Radius</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Border Radius</Label>
                      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                        {radius[0].toFixed(3)}rem
                      </span>
                    </div>
                    <Slider
                      value={radius}
                      onValueChange={updateRadius}
                      min={0}
                      max={1.5}
                      step={0.025}
                    />
                    <div className="mt-3 flex items-center gap-3">
                      <div
                        className="size-12 bg-primary/15 ring-1 ring-primary/20"
                        style={{ borderRadius: `${radius[0]}rem` }}
                      />
                      <div
                        className="h-8 w-20 bg-primary/15 ring-1 ring-primary/20"
                        style={{ borderRadius: `${radius[0]}rem` }}
                      />
                      <div
                        className="size-8 bg-primary/15 ring-1 ring-primary/20"
                        style={{ borderRadius: `${radius[0] * 2}rem` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="px-5 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reset}
                  className="w-full"
                >
                  <RotateCcw data-icon="inline-start" />
                  Reset to defaults
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
