"use client"

import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  { quote: "The attention to detail in the design process was exceptional. Every pixel felt intentional, and the final product exceeded our expectations.", name: "Isabelle Marchand", role: "VP Product, Luminos", initials: "IM" },
  { quote: "Working with this team transformed how we think about our user experience. The results speak for themselves: 40% increase in user engagement.", name: "Thomas Eriksson", role: "CTO, Norden Labs", initials: "TE" },
  { quote: "They didn't just build what we asked for. They challenged our assumptions and delivered something far more elegant than our original brief.", name: "Aisha Patel", role: "Founder, Prism Health", initials: "AP" },
  { quote: "The speed of iteration was remarkable. From concept to production in three weeks, with quality that usually takes months to achieve.", name: "Jean-Luc Beaumont", role: "Design Lead, Atelier Vigne", initials: "JB" },
]

export default function CarouselTestimonial() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          What Clients Say
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.06 }}
      >
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name}>
                <Card
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="flex flex-col items-center gap-5 text-center">
                    <p className="text-sm leading-relaxed text-foreground italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  )
}
