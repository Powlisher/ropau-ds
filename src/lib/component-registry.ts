import { type ComponentType } from "react"

export type ComponentCategory = "ui" | "ai" | "block"

export type BlockSubcategory =
  | "landing"
  | "dashboard"
  | "auth"
  | "sidebar"
  | "settings"
  | "forms"

export type RegistryEntry = {
  name: string
  slug: string
  category: ComponentCategory
  subcategory?: BlockSubcategory
  description: string
  component?: ComponentType
}

export const uiComponents: RegistryEntry[] = [
  { name: "Accordion", slug: "accordion", category: "ui", description: "Vertically stacked set of interactive headings" },
  { name: "Alert", slug: "alert", category: "ui", description: "Callout for important contextual messages" },
  { name: "Alert Dialog", slug: "alert-dialog", category: "ui", description: "Modal requiring acknowledgement" },
  { name: "Aspect Ratio", slug: "aspect-ratio", category: "ui", description: "Constrained width-to-height ratio container" },
  { name: "Avatar", slug: "avatar", category: "ui", description: "Circular user representation" },
  { name: "Badge", slug: "badge", category: "ui", description: "Compact label for status or count" },
  { name: "Breadcrumb", slug: "breadcrumb", category: "ui", description: "Hierarchical page trail" },
  { name: "Button", slug: "button", category: "ui", description: "Primary interactive trigger" },
  { name: "Button Group", slug: "button-group", category: "ui", description: "Grouped set of related buttons" },
  { name: "Calendar", slug: "calendar", category: "ui", description: "Date selection grid" },
  { name: "Card", slug: "card", category: "ui", description: "Contained surface for grouped content" },
  { name: "Carousel", slug: "carousel", category: "ui", description: "Horizontally scrollable content" },
  { name: "Chart", slug: "chart", category: "ui", description: "Data visualization wrapper for Recharts" },
  { name: "Checkbox", slug: "checkbox", category: "ui", description: "Binary toggle with label" },
  { name: "Collapsible", slug: "collapsible", category: "ui", description: "Expandable content region" },
  { name: "Combobox", slug: "combobox", category: "ui", description: "Searchable select input" },
  { name: "Command", slug: "command", category: "ui", description: "Command palette with search" },
  { name: "Context Menu", slug: "context-menu", category: "ui", description: "Right-click contextual actions" },
  { name: "Dialog", slug: "dialog", category: "ui", description: "Overlay modal for focused tasks" },
  { name: "Drawer", slug: "drawer", category: "ui", description: "Slide-up bottom panel" },
  { name: "Dropdown Menu", slug: "dropdown-menu", category: "ui", description: "Triggered menu of actions" },
  { name: "Empty", slug: "empty", category: "ui", description: "Placeholder for missing content states" },
  { name: "Field", slug: "field", category: "ui", description: "Form field wrapper with label and validation" },
  { name: "Hover Card", slug: "hover-card", category: "ui", description: "Rich tooltip on hover" },
  { name: "Input", slug: "input", category: "ui", description: "Text entry field" },
  { name: "Input Group", slug: "input-group", category: "ui", description: "Grouped input with prefix/suffix" },
  { name: "Input OTP", slug: "input-otp", category: "ui", description: "One-time password segmented input" },
  { name: "Item", slug: "item", category: "ui", description: "Generic selectable list item" },
  { name: "Kbd", slug: "kbd", category: "ui", description: "Keyboard shortcut display" },
  { name: "Label", slug: "label", category: "ui", description: "Accessible form label" },
  { name: "Menubar", slug: "menubar", category: "ui", description: "Horizontal menu strip" },
  { name: "Native Select", slug: "native-select", category: "ui", description: "Browser-native select element" },
  { name: "Navigation Menu", slug: "navigation-menu", category: "ui", description: "Top-level site navigation" },
  { name: "Pagination", slug: "pagination", category: "ui", description: "Multi-page navigation controls" },
  { name: "Popover", slug: "popover", category: "ui", description: "Floating content triggered by click" },
  { name: "Progress", slug: "progress", category: "ui", description: "Determinate progress indicator" },
  { name: "Radio Group", slug: "radio-group", category: "ui", description: "Exclusive selection from options" },
  { name: "Resizable", slug: "resizable", category: "ui", description: "Draggable resize panels" },
  { name: "Scroll Area", slug: "scroll-area", category: "ui", description: "Custom scrollbar container" },
  { name: "Select", slug: "select", category: "ui", description: "Dropdown option picker" },
  { name: "Separator", slug: "separator", category: "ui", description: "Visual divider between content" },
  { name: "Sheet", slug: "sheet", category: "ui", description: "Slide-out side panel" },
  { name: "Sidebar", slug: "sidebar", category: "ui", description: "Application navigation rail" },
  { name: "Skeleton", slug: "skeleton", category: "ui", description: "Loading placeholder shape" },
  { name: "Slider", slug: "slider", category: "ui", description: "Range value selector" },
  { name: "Sonner", slug: "sonner", category: "ui", description: "Toast notification system" },
  { name: "Spinner", slug: "spinner", category: "ui", description: "Indeterminate loading indicator" },
  { name: "Switch", slug: "switch", category: "ui", description: "Binary on/off toggle" },
  { name: "Table", slug: "table", category: "ui", description: "Structured data rows and columns" },
  { name: "Tabs", slug: "tabs", category: "ui", description: "Segmented content panels" },
  { name: "Textarea", slug: "textarea", category: "ui", description: "Multi-line text entry" },
  { name: "Toggle", slug: "toggle", category: "ui", description: "Pressable state button" },
  { name: "Toggle Group", slug: "toggle-group", category: "ui", description: "Exclusive or multi-select button set" },
  { name: "Tooltip", slug: "tooltip", category: "ui", description: "Contextual hint on hover" },
]

export const aiComponents: RegistryEntry[] = [
  { name: "AI Actions", slug: "ai-actions", category: "ai", description: "Copy, regenerate, and feedback controls" },
  { name: "AI Agent", slug: "ai-agent", category: "ai", description: "Agent identity card with tools" },
  { name: "AI Artifact", slug: "ai-artifact", category: "ai", description: "Collapsible generated content block" },
  { name: "AI Code Block", slug: "ai-code-block", category: "ai", description: "Syntax-styled code with copy" },
  { name: "AI Confirmation", slug: "ai-confirmation", category: "ai", description: "Approve/reject action gate" },
  { name: "AI Conversation", slug: "ai-conversation", category: "ai", description: "Scrollable message thread container" },
  { name: "AI Loader", slug: "ai-loader", category: "ai", description: "Spinning spoke indicator" },
  { name: "AI Message", slug: "ai-message", category: "ai", description: "User or assistant chat bubble" },
  { name: "AI Prompt Input", slug: "ai-prompt-input", category: "ai", description: "Auto-expanding message composer" },
  { name: "AI Reasoning", slug: "ai-reasoning", category: "ai", description: "Collapsible thought process trace" },
  { name: "AI Sources", slug: "ai-sources", category: "ai", description: "Expandable reference links" },
  { name: "AI Suggestion", slug: "ai-suggestion", category: "ai", description: "Pill-shaped quick prompts" },
  { name: "AI Task", slug: "ai-task", category: "ai", description: "Multi-step progress tracker" },
  { name: "AI Tool", slug: "ai-tool", category: "ai", description: "Tool invocation with input/output" },
]

export const blockComponents: RegistryEntry[] = [
  { name: "Hero Split", slug: "hero-split", category: "block", subcategory: "landing", description: "Two-column hero with image" },
  { name: "Hero Centered Gradient", slug: "hero-centered-gradient", category: "block", subcategory: "landing", description: "Centered hero with gradient backdrop" },
  { name: "Hero Code Preview", slug: "hero-code-preview", category: "block", subcategory: "landing", description: "Hero with live code sample" },
  { name: "Hero Bento", slug: "hero-bento", category: "block", subcategory: "landing", description: "Bento grid hero layout" },
  { name: "Hero Pricing", slug: "hero-pricing", category: "block", subcategory: "landing", description: "Hero with pricing emphasis" },
  { name: "Hero Social Proof", slug: "hero-social-proof", category: "block", subcategory: "landing", description: "Hero with testimonial accents" },
  { name: "Hero Steps", slug: "hero-steps", category: "block", subcategory: "landing", description: "Hero with numbered process" },
  { name: "Hero Testimonial", slug: "hero-testimonial", category: "block", subcategory: "landing", description: "Hero featuring a testimonial" },
  { name: "Hero Video Modal", slug: "hero-video-modal", category: "block", subcategory: "landing", description: "Hero with video trigger" },
  { name: "Hero Waitlist", slug: "hero-waitlist", category: "block", subcategory: "landing", description: "Hero with email capture" },
  { name: "Features Grid", slug: "features-grid", category: "block", subcategory: "landing", description: "Multi-column feature cards" },
  { name: "Features Alternating", slug: "features-alternating", category: "block", subcategory: "landing", description: "Zigzag feature sections" },
  { name: "Pricing Three Tier", slug: "pricing-three-tier", category: "block", subcategory: "landing", description: "Three-column pricing table" },
  { name: "CTA Banner", slug: "cta-banner", category: "block", subcategory: "landing", description: "Full-width call to action" },
  { name: "FAQ Section", slug: "faq-section", category: "block", subcategory: "landing", description: "Accordion-based questions" },
  { name: "Footer Columns", slug: "footer-columns", category: "block", subcategory: "landing", description: "Multi-column site footer" },
  { name: "Logo Cloud", slug: "logo-cloud", category: "block", subcategory: "landing", description: "Partner/client logo strip" },
  { name: "Stats Section", slug: "stats-section", category: "block", subcategory: "landing", description: "Key metric highlights" },
  { name: "Testimonials Grid", slug: "testimonials-grid", category: "block", subcategory: "landing", description: "Multi-card testimonial layout" },
  { name: "Login Form", slug: "login-form", category: "block", subcategory: "auth", description: "Email/password authentication" },
  { name: "Register Form", slug: "register-form", category: "block", subcategory: "auth", description: "New account creation" },
  { name: "App Sidebar", slug: "app-sidebar", category: "block", subcategory: "dashboard", description: "Full application sidebar" },
  { name: "Section Cards", slug: "section-cards", category: "block", subcategory: "dashboard", description: "Dashboard metric cards" },
  { name: "Site Header", slug: "site-header", category: "block", subcategory: "dashboard", description: "Top navigation bar" },
  { name: "Data Table", slug: "data-table", category: "block", subcategory: "dashboard", description: "Sortable data grid" },
  { name: "Chart Area Interactive", slug: "chart-area-interactive", category: "block", subcategory: "dashboard", description: "Interactive area chart" },
  { name: "Profile Settings", slug: "profile-settings", category: "block", subcategory: "settings", description: "User profile editor" },
  { name: "Team Settings", slug: "team-settings", category: "block", subcategory: "settings", description: "Team management panel" },
  { name: "Contact Form", slug: "contact-form", category: "block", subcategory: "forms", description: "Multi-field contact form" },
  { name: "Sidebar Left", slug: "sidebar-left", category: "block", subcategory: "sidebar", description: "Left navigation sidebar block" },
  { name: "Sidebar Right", slug: "sidebar-right", category: "block", subcategory: "sidebar", description: "Right contextual sidebar" },
]

export const allComponents = [...uiComponents, ...aiComponents, ...blockComponents]

export function getComponentBySlug(category: string, slug: string): RegistryEntry | undefined {
  return allComponents.find(
    (c) => c.category === category && c.slug === slug
  )
}

export function getComponentsByCategory(category: ComponentCategory): RegistryEntry[] {
  return allComponents.filter((c) => c.category === category)
}

export function getBlocksBySubcategory(sub: BlockSubcategory): RegistryEntry[] {
  return blockComponents.filter((c) => c.subcategory === sub)
}

export const blockSubcategories: { slug: BlockSubcategory; label: string; count: number }[] = [
  { slug: "landing", label: "Landing", count: blockComponents.filter((c) => c.subcategory === "landing").length },
  { slug: "dashboard", label: "Dashboard", count: blockComponents.filter((c) => c.subcategory === "dashboard").length },
  { slug: "auth", label: "Auth", count: blockComponents.filter((c) => c.subcategory === "auth").length },
  { slug: "sidebar", label: "Sidebar", count: blockComponents.filter((c) => c.subcategory === "sidebar").length },
  { slug: "settings", label: "Settings", count: blockComponents.filter((c) => c.subcategory === "settings").length },
  { slug: "forms", label: "Forms", count: blockComponents.filter((c) => c.subcategory === "forms").length },
]
