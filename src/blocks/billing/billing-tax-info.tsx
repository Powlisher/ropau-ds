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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const premiumShadow =
  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

export default function BillingTaxInfo() {
  return (
    <Card className="w-full max-w-lg" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Tax Information</CardTitle>
            <CardDescription>
              Provide your tax details for accurate invoice generation.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="tax-id">Tax ID / VAT number</Label>
            <Input
              id="tax-id"
              defaultValue="ES-B12345678"
              placeholder="e.g. DE123456789"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <Label htmlFor="tax-business">Business name</Label>
            <Input
              id="tax-business"
              defaultValue="Cordoba Dev S.L."
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tax-address">Billing address</Label>
              <Input
                id="tax-address"
                defaultValue="Calle Gran Via 48, 3A"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tax-city">City</Label>
              <Input id="tax-city" defaultValue="Madrid" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tax-postal">Postal code</Label>
              <Input
                id="tax-postal"
                defaultValue="28013"
                className="tabular-nums"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Country</Label>
              <Select defaultValue="es">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end pt-1">
            <Button>Save tax info</Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
