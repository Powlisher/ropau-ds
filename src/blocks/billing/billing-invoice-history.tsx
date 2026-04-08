import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DownloadIcon } from "lucide-react"

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

const invoices = [
  { id: "INV-2026-0041", date: "Apr 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-2026-0032", date: "Mar 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-2026-0023", date: "Feb 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-2026-0014", date: "Jan 1, 2026", amount: "$34.17", status: "Paid" },
  { id: "INV-2025-0128", date: "Dec 1, 2025", amount: "$29.00", status: "Paid" },
  { id: "INV-2025-0119", date: "Nov 1, 2025", amount: "$29.00", status: "Refunded" },
]

function statusVariant(status: string) {
  switch (status) {
    case "Paid":
      return "secondary" as const
    case "Refunded":
      return "outline" as const
    case "Pending":
      return "default" as const
    default:
      return "outline" as const
  }
}

export default function BillingInvoiceHistory() {
  return (
    <Card className="w-full max-w-3xl" style={{ boxShadow: premiumShadow }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="tracking-tight">Invoice History</CardTitle>
            <CardDescription>
              View and download past invoices for your records.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <motion.tr
                  key={invoice.id}
                  variants={itemVariants}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <span className="font-mono text-xs tabular-nums tracking-wide text-foreground">
                      {invoice.id}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="font-medium tabular-nums text-foreground">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(invoice.status)} className="text-[10px]">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-xs">
                      <DownloadIcon className="size-3" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-muted-foreground">
              Showing 6 of 14 invoices
            </span>
            <div className="flex gap-1.5">
              <Button variant="outline" size="xs" disabled>
                Previous
              </Button>
              <Button variant="outline" size="xs">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  )
}
