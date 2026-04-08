"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileTextIcon, ImageIcon, FileSpreadsheetIcon, FileArchiveIcon, MoreHorizontalIcon, DownloadIcon, PencilIcon, Trash2Icon, FolderIcon } from "lucide-react"
import { motion } from "framer-motion"

const files = [
  { name: "Q1 Financial Report.pdf", type: "document", icon: FileTextIcon, size: "2.4 MB", modified: "Apr 3, 2026", modifiedBy: "Elena M." },
  { name: "Brand Assets 2026", type: "folder", icon: FolderIcon, size: "148 MB", modified: "Mar 28, 2026", modifiedBy: "Sophie D." },
  { name: "Product Screenshot - Hero.png", type: "image", icon: ImageIcon, size: "847 KB", modified: "Mar 25, 2026", modifiedBy: "Aisha P." },
  { name: "Customer Data Export.xlsx", type: "spreadsheet", icon: FileSpreadsheetIcon, size: "1.1 MB", modified: "Mar 22, 2026", modifiedBy: "Marcus C." },
  { name: "Release Notes v2.14.md", type: "document", icon: FileTextIcon, size: "12 KB", modified: "Mar 18, 2026", modifiedBy: "Thomas R." },
  { name: "Archive - Legacy API Docs.zip", type: "archive", icon: FileArchiveIcon, size: "34.7 MB", modified: "Mar 10, 2026", modifiedBy: "Jonas E." },
  { name: "Onboarding Flow Mockup.png", type: "image", icon: ImageIcon, size: "1.9 MB", modified: "Mar 6, 2026", modifiedBy: "Sophie D." },
  { name: "Vendor Contracts.pdf", type: "document", icon: FileTextIcon, size: "568 KB", modified: "Feb 27, 2026", modifiedBy: "Carolina R." },
]

const typeColors: Record<string, string> = {
  document: "text-blue-600 bg-blue-500/10",
  folder: "text-amber-600 bg-amber-500/10",
  image: "text-violet-600 bg-violet-500/10",
  spreadsheet: "text-emerald-600 bg-emerald-500/10",
  archive: "text-muted-foreground bg-muted",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardFileManager() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Files</CardTitle>
        <CardDescription>Shared team documents and assets</CardDescription>
        <CardAction>
          <Button size="sm">Upload</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead>By</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {files.map((file) => (
              <motion.tr
                key={file.name}
                variants={rowVariants}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`flex size-8 items-center justify-center rounded-lg ${typeColors[file.type]}`}>
                      <file.icon className="size-4" />
                    </div>
                    <span className="font-medium">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{file.size}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{file.modified}</TableCell>
                <TableCell className="text-muted-foreground">{file.modifiedBy}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs"><MoreHorizontalIcon /></Button>} />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><DownloadIcon /> Download</DropdownMenuItem>
                      <DropdownMenuItem><PencilIcon /> Rename</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2Icon /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </motion.tbody>
        </Table>
      </CardContent>
    </Card>
  )
}
