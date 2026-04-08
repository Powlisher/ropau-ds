"use client"

import { useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  UsersIcon,
  FileTextIcon,
  BarChart3Icon,
  MailIcon,
  PlusIcon,
  Trash2Icon,
  PenLineIcon,
  DownloadIcon,
  Share2Icon,
  ArchiveIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  SearchIcon,
  ZapIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Step = "category" | "action" | "confirm"

const categories = [
  { id: "team", label: "Team", icon: UsersIcon, description: "Manage members and roles" },
  { id: "documents", label: "Documents", icon: FileTextIcon, description: "Create, edit, and organize" },
  { id: "reports", label: "Reports", icon: BarChart3Icon, description: "Generate and export analytics" },
  { id: "communications", label: "Communications", icon: MailIcon, description: "Send and manage messages" },
]

const actions: Record<string, { id: string; label: string; icon: typeof PlusIcon; description: string }[]> = {
  team: [
    { id: "invite", label: "Invite Member", icon: PlusIcon, description: "Send invitation via email" },
    { id: "remove", label: "Remove Member", icon: Trash2Icon, description: "Revoke access immediately" },
    { id: "edit-role", label: "Edit Role", icon: PenLineIcon, description: "Change permissions level" },
  ],
  documents: [
    { id: "create", label: "Create Document", icon: PlusIcon, description: "Start from blank or template" },
    { id: "export", label: "Export as PDF", icon: DownloadIcon, description: "Generate downloadable PDF" },
    { id: "share", label: "Share with Team", icon: Share2Icon, description: "Set visibility and access" },
    { id: "archive", label: "Archive Document", icon: ArchiveIcon, description: "Move to archive folder" },
  ],
  reports: [
    { id: "generate", label: "Generate Report", icon: ZapIcon, description: "Build from latest data" },
    { id: "export-csv", label: "Export to CSV", icon: DownloadIcon, description: "Download raw dataset" },
    { id: "share-report", label: "Share Report", icon: Share2Icon, description: "Send link to stakeholders" },
  ],
  communications: [
    { id: "compose", label: "Compose Message", icon: PenLineIcon, description: "New message to team or client" },
    { id: "broadcast", label: "Send Broadcast", icon: MailIcon, description: "Notify entire workspace" },
  ],
}

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export default function CommandMenu09() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  function reset() {
    setStep("category")
    setSelectedCategory(null)
    setSelectedAction(null)
  }

  function handleClose(value: boolean) {
    setOpen(value)
    if (!value) reset()
  }

  function goBack() {
    if (step === "confirm") {
      setStep("action")
      setSelectedAction(null)
    } else if (step === "action") {
      setStep("category")
      setSelectedCategory(null)
    }
  }

  const currentActions = selectedCategory ? actions[selectedCategory] ?? [] : []
  const currentAction = currentActions.find((a) => a.id === selectedAction)
  const currentCategory = categories.find((c) => c.id === selectedCategory)

  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <Button
          variant="outline"
          className="gap-3 pr-2 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <ZapIcon className="size-4" />
          <span>Quick actions...</span>
          <Kbd className="ml-4">⌘K</Kbd>
        </Button>
      </motion.div>

      <CommandDialog open={open} onOpenChange={handleClose}>
        <Command className="rounded-xl">
          <div className="flex items-center gap-2 border-b px-3">
            {step !== "category" && (
              <button
                onClick={goBack}
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowLeftIcon className="size-4" />
              </button>
            )}
            <div className="flex flex-1 items-center gap-1.5">
              {selectedCategory && (
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {currentCategory?.label}
                </span>
              )}
              {selectedAction && (
                <>
                  <span className="text-muted-foreground/40">/</span>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {currentAction?.label}
                  </span>
                </>
              )}
            </div>
          </div>
          {step !== "confirm" && (
            <CommandInput
              placeholder={
                step === "category"
                  ? "Select a category..."
                  : "Select an action..."
              }
            />
          )}
          <AnimatePresence mode="wait">
            {step === "category" && (
              <motion.div
                key="category"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
              >
                <CommandList>
                  <CommandEmpty>
                    <div className="flex flex-col items-center gap-2 py-4">
                      <SearchIcon className="size-6 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground">No categories found.</p>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Choose a category">
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat.id}
                        onSelect={() => {
                          setSelectedCategory(cat.id)
                          setStep("action")
                        }}
                      >
                        <cat.icon className="size-4 text-muted-foreground" />
                        <div className="flex flex-1 flex-col">
                          <span>{cat.label}</span>
                          <span className="text-xs text-muted-foreground">{cat.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </motion.div>
            )}

            {step === "action" && (
              <motion.div
                key="action"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
              >
                <CommandList>
                  <CommandEmpty>
                    <div className="flex flex-col items-center gap-2 py-4">
                      <SearchIcon className="size-6 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground">No actions found.</p>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Choose an action">
                    {currentActions.map((action) => (
                      <CommandItem
                        key={action.id}
                        onSelect={() => {
                          setSelectedAction(action.id)
                          setStep("confirm")
                        }}
                      >
                        <action.icon className="size-4 text-muted-foreground" />
                        <div className="flex flex-1 flex-col">
                          <span>{action.label}</span>
                          <span className="text-xs text-muted-foreground">{action.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </motion.div>
            )}

            {step === "confirm" && currentAction && (
              <motion.div
                key="confirm"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring" as const, stiffness: 400, damping: 28 }}
              >
                <div className="flex flex-col items-center gap-4 px-6 py-8">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <currentAction.icon className="size-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {currentAction.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {currentAction.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={goBack}>
                      Go Back
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => handleClose(false)}
                    >
                      <CheckCircle2Icon className="size-4" />
                      Confirm
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="flex size-1.5 rounded-full bg-primary/60" />
              <span className={`flex size-1.5 rounded-full ${step === "action" || step === "confirm" ? "bg-primary/60" : "bg-muted-foreground/30"}`} />
              <span className={`flex size-1.5 rounded-full ${step === "confirm" ? "bg-primary/60" : "bg-muted-foreground/30"}`} />
              <span className="ml-1.5">Step {step === "category" ? "1" : step === "action" ? "2" : "3"} of 3</span>
            </div>
            {step !== "category" && (
              <div className="flex items-center gap-2">
                <span>Back</span>
                <Kbd>⌫</Kbd>
              </div>
            )}
          </div>
        </Command>
      </CommandDialog>
    </div>
  )
}
