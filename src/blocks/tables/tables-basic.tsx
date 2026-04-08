"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"

const products = [
  { name: "Wireless Headphones Pro", sku: "WHP-4821", category: "Audio", price: "$179.00", stock: 284, sold: 1247 },
  { name: "Ergonomic Keyboard V2", sku: "EKB-3192", category: "Peripherals", price: "$129.50", stock: 92, sold: 863 },
  { name: "Ultra-Wide Monitor 34\"", sku: "UWM-7834", category: "Displays", price: "$649.00", stock: 38, sold: 412 },
  { name: "USB-C Docking Station", sku: "UCD-2847", category: "Accessories", price: "$89.99", stock: 156, sold: 2103 },
  { name: "Mechanical Mouse Lite", sku: "MML-5618", category: "Peripherals", price: "$54.00", stock: 421, sold: 3847 },
  { name: "Portable SSD 1TB", sku: "PSD-9234", category: "Storage", price: "$94.50", stock: 73, sold: 1582 },
  { name: "Webcam HD 1080p", sku: "WHD-1847", category: "Video", price: "$67.00", stock: 209, sold: 947 },
  { name: "Laptop Stand Aluminum", sku: "LSA-6293", category: "Accessories", price: "$42.00", stock: 518, sold: 2841 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function TablesBasic() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Product Inventory</CardTitle>
        <CardDescription>Current stock levels and sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Sold</TableHead>
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product, i) => (
              <motion.tr
                key={product.sku}
                variants={rowVariants}
                className={`border-b transition-colors hover:bg-muted/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}
              >
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{product.sku}</TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-right tabular-nums">{product.price}</TableCell>
                <TableCell className="text-right tabular-nums">{product.stock.toLocaleString()}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{product.sold.toLocaleString()}</TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
