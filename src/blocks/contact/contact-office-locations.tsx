import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPinIcon, PhoneIcon } from "lucide-react"
import { motion } from "framer-motion"

const offices = [
  {
    city: "San Francisco",
    address: "388 Market St, Suite 1200",
    phone: "+1 (415) 903-7214",
    timezone: "PST",
  },
  {
    city: "London",
    address: "71 Queen Victoria St, EC4V 4AY",
    phone: "+44 20 7946 0123",
    timezone: "GMT",
  },
  {
    city: "Tokyo",
    address: "Roppongi Hills Mori Tower 23F",
    phone: "+81 3-6384-9012",
    timezone: "JST",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function ContactOfficeLocations() {
  return (
    <div className="bg-slate-50/80 px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Our offices
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Visit us in person or give us a call
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-3"
        >
          {offices.map((office) => (
            <motion.div
              key={office.city}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <Card
                className="h-full"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                }}
              >
                <CardContent className="flex flex-col gap-3 pt-5">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="size-4 text-primary" />
                    <p className="text-sm font-semibold tracking-tight">
                      {office.city}
                    </p>
                    <span className="ml-auto text-[10px] font-medium tabular-nums tracking-wide text-muted-foreground uppercase">
                      {office.timezone}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {office.address}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <PhoneIcon className="size-3" />
                    <span className="tabular-nums">{office.phone}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              General inquiry
            </CardTitle>
            <CardDescription>
              Not sure which office to contact? We&apos;ll route it for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="col-name">Name</Label>
                <Input id="col-name" placeholder="Sofia Petrov" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="col-email">Email</Label>
                <Input
                  id="col-email"
                  type="email"
                  placeholder="sofia@nexbridge.bg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="col-message">Message</Label>
              <Textarea
                id="col-message"
                placeholder="What can we help with?"
                className="min-h-24"
              />
            </div>
            <Button className="w-full sm:w-auto sm:self-end">
              Send message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
