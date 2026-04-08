"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const contacts: Record<string, { id: string; name: string; role: string }[]> = {
  A: [{ id: "a1", name: "Amelie Bernard", role: "Product Manager" }, { id: "a2", name: "Antoine Dubois", role: "Staff Engineer" }],
  B: [{ id: "b1", name: "Baptiste Leclerc", role: "Design Lead" }],
  C: [{ id: "c1", name: "Camille Petit", role: "Frontend Engineer" }, { id: "c2", name: "Charlotte Martin", role: "Data Analyst" }, { id: "c3", name: "Claire Fontaine", role: "UX Researcher" }],
  E: [{ id: "e1", name: "Elise Moreau", role: "Marketing Manager" }],
  F: [{ id: "f1", name: "Florian Blanc", role: "DevOps Engineer" }],
  H: [{ id: "h1", name: "Hugo Leclercq", role: "Backend Engineer" }],
  J: [{ id: "j1", name: "Julie Morin", role: "Solutions Architect" }, { id: "j2", name: "Juliette Vasseur", role: "QA Lead" }],
  L: [{ id: "l1", name: "Lea Nguyen", role: "Mobile Developer" }, { id: "l2", name: "Louis Perrin", role: "CTO" }],
  M: [{ id: "m1", name: "Manon Chevalier", role: "Content Strategist" }, { id: "m2", name: "Margaux Delacroix", role: "Account Executive" }],
  N: [{ id: "n1", name: "Nathan Dupont", role: "Full-stack Developer" }],
  R: [{ id: "r1", name: "Remi Garnier", role: "Sales Director" }, { id: "r2", name: "Romain Girard", role: "Security Engineer" }],
  S: [{ id: "s1", name: "Samuel Bonnet", role: "Database Admin" }, { id: "s2", name: "Sophie Marchand", role: "VP Engineering" }],
  T: [{ id: "t1", name: "Thibault Moreau", role: "Business Analyst" }],
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting08() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  function scrollToLetter(letter: string) {
    setActiveLetter(letter)
    const el = document.getElementById(`letter-${letter}`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const hasLetter = (letter: string) => !!contacts[letter]

  return (
    <div className="mx-auto flex w-full max-w-md gap-2">
      <div
        className="flex-1 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="border-b px-4 py-3">
          <h3 className="font-heading text-sm font-semibold tracking-tight">Contacts</h3>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">{Object.values(contacts).flat().length}</span> people
          </p>
        </div>

        <ScrollArea className="h-[420px]">
          <div className="p-2">
            {Object.entries(contacts).map(([letter, people]) => (
              <div key={letter} id={`letter-${letter}`}>
                <div className="sticky top-0 z-10 bg-card/95 px-2 py-1.5 backdrop-blur-sm">
                  <span className="font-heading text-xs font-bold tracking-wide text-primary">{letter}</span>
                </div>
                {people.map((person) => (
                  <motion.div
                    key={person.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-semibold text-muted-foreground">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{person.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{person.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5 py-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => scrollToLetter(letter)}
            disabled={!hasLetter(letter)}
            className={`flex size-5 items-center justify-center rounded text-[10px] font-medium transition-colors ${
              activeLetter === letter
                ? "bg-primary text-primary-foreground"
                : hasLetter(letter)
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground/20 cursor-default"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}
