# Ropau DS -- Component Index

## UI Components

| Component | Description | Import |
|-----------|-------------|--------|
| Accordion | Expandable/collapsible content sections | `@/components/ui/accordion` |
| AlertDialog | Modal dialog requiring user confirmation | `@/components/ui/alert-dialog` |
| Alert | Inline feedback message with variants | `@/components/ui/alert` |
| AspectRatio | Constrains child to a given ratio | `@/components/ui/aspect-ratio` |
| Avatar | User profile image with fallback | `@/components/ui/avatar` |
| Badge | Small status label with variants | `@/components/ui/badge` |
| Breadcrumb | Hierarchical navigation trail | `@/components/ui/breadcrumb` |
| ButtonGroup | Groups buttons with shared borders | `@/components/ui/button-group` |
| Button | Clickable action element with variants | `@/components/ui/button` |
| Calendar | Date picker grid via react-day-picker | `@/components/ui/calendar` |
| Card | Contained surface for grouped content | `@/components/ui/card` |
| Carousel | Scrollable content slider via Embla | `@/components/ui/carousel` |
| Chart | Recharts wrapper with theme support | `@/components/ui/chart` |
| Checkbox | Toggle input for boolean selection | `@/components/ui/checkbox` |
| Collapsible | Show/hide content with trigger | `@/components/ui/collapsible` |
| Combobox | Searchable dropdown selection input | `@/components/ui/combobox` |
| Command | Command palette with search filtering | `@/components/ui/command` |
| ContextMenu | Right-click contextual action menu | `@/components/ui/context-menu` |
| Dialog | Modal overlay for focused interaction | `@/components/ui/dialog` |
| Direction | RTL/LTR direction provider and hook | `@/components/ui/direction` |
| Drawer | Slide-in panel from screen edge | `@/components/ui/drawer` |
| DropdownMenu | Trigger-activated action menu | `@/components/ui/dropdown-menu` |
| Empty | Placeholder state for empty content | `@/components/ui/empty` |
| Field | Form field layout with label/description | `@/components/ui/field` |
| HoverCard | Preview card shown on hover | `@/components/ui/hover-card` |
| InputGroup | Composable input with addons/buttons | `@/components/ui/input-group` |
| InputOTP | One-time password segmented input | `@/components/ui/input-otp` |
| Input | Single-line text input field | `@/components/ui/input` |
| Item | List item with variants and layout | `@/components/ui/item` |
| Kbd | Keyboard shortcut display element | `@/components/ui/kbd` |
| Label | Accessible text label for form fields | `@/components/ui/label` |
| Menubar | Horizontal menu bar with dropdowns | `@/components/ui/menubar` |
| NativeSelect | Browser-native select dropdown | `@/components/ui/native-select` |
| NavigationMenu | Site navigation with submenus | `@/components/ui/navigation-menu` |
| Pagination | Page navigation controls | `@/components/ui/pagination` |
| Popover | Floating content anchored to trigger | `@/components/ui/popover` |
| Progress | Determinate progress indicator bar | `@/components/ui/progress` |
| RadioGroup | Single selection from multiple options | `@/components/ui/radio-group` |
| Resizable | Draggable resizable panel layout | `@/components/ui/resizable` |
| ScrollArea | Custom styled scrollable container | `@/components/ui/scroll-area` |
| Select | Styled dropdown selection input | `@/components/ui/select` |
| Separator | Visual divider between content | `@/components/ui/separator` |
| Sheet | Side panel overlay dialog | `@/components/ui/sheet` |
| Sidebar | Collapsible app navigation sidebar | `@/components/ui/sidebar` |
| Skeleton | Animated loading placeholder shape | `@/components/ui/skeleton` |
| Slider | Range value selection control | `@/components/ui/slider` |
| Sonner | Toast notification system (Toaster) | `@/components/ui/sonner` |
| Spinner | Animated loading spinner icon | `@/components/ui/spinner` |
| Switch | Toggle between on/off states | `@/components/ui/switch` |
| Table | Structured data display in rows/columns | `@/components/ui/table` |
| Tabs | Tabbed content navigation panels | `@/components/ui/tabs` |
| Textarea | Multi-line text input field | `@/components/ui/textarea` |
| ToggleGroup | Grouped toggle buttons with context | `@/components/ui/toggle-group` |
| Toggle | Pressable on/off button | `@/components/ui/toggle` |
| Tooltip | Contextual info on hover/focus | `@/components/ui/tooltip` |

## Blocks

### Dashboard (`blocks/dashboard/`)

| Block | Description | Import |
|-------|-------------|--------|
| AppSidebar | Main app sidebar with nav sections | `@/blocks/dashboard/app-sidebar` |
| ChartAreaInteractive | Interactive area chart with filters | `@/blocks/dashboard/chart-area-interactive` |
| DataTable | Full-featured data table with sorting/filters | `@/blocks/dashboard/data-table` |
| NavDocuments | Document list navigation section | `@/blocks/dashboard/nav-documents` |
| NavMain | Primary navigation menu items | `@/blocks/dashboard/nav-main` |
| NavSecondary | Secondary navigation links | `@/blocks/dashboard/nav-secondary` |
| NavUser | User profile dropdown in sidebar | `@/blocks/dashboard/nav-user` |
| SectionCards | Stats cards grid with trends | `@/blocks/dashboard/section-cards` |
| SiteHeader | Top header with breadcrumb and search | `@/blocks/dashboard/site-header` |

### Auth (`blocks/auth/`)

| Block | Description | Import |
|-------|-------------|--------|
| LoginForm | Login form with email/password | `@/blocks/auth/login-form` |

### Sidebar (`blocks/sidebar/`)

| Block | Description | Import |
|-------|-------------|--------|
| Calendars | Calendar list with checkboxes | `@/blocks/sidebar/calendars` |
| DatePicker | Inline date picker for sidebar | `@/blocks/sidebar/date-picker` |
| NavActions | Action buttons in sidebar header | `@/blocks/sidebar/nav-actions` |
| NavFavorites | Favorites list with drag support | `@/blocks/sidebar/nav-favorites` |
| NavProjects | Project list navigation section | `@/blocks/sidebar/nav-projects` |
| NavWorkspaces | Workspace switcher with tree view | `@/blocks/sidebar/nav-workspaces` |
| SearchForm | Search input for sidebar | `@/blocks/sidebar/search-form` |
| SettingsDialog | Settings modal from sidebar | `@/blocks/sidebar/settings-dialog` |
| SidebarLeft | Left sidebar with nav and projects | `@/blocks/sidebar/sidebar-left` |
| SidebarOptInForm | Opt-in CTA form in sidebar | `@/blocks/sidebar/sidebar-opt-in-form` |
| SidebarRight | Right sidebar with calendar/nav | `@/blocks/sidebar/sidebar-right` |
| TeamSwitcher | Team/workspace selector dropdown | `@/blocks/sidebar/team-switcher` |
| VersionSwitcher | Version selector in sidebar | `@/blocks/sidebar/version-switcher` |

### Pages (shadcn block routes)

| Page | Block ID | Route |
|------|----------|-------|
| Dashboard | dashboard-01 | `/dashboard` |
| Login | login-01 | `/login` |

## Hooks

| Hook | Description | Import |
|------|-------------|--------|
| useIsMobile | Detects viewport below 768px breakpoint | `@/hooks/use-mobile` |
