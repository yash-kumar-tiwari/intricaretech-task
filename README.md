# Campaign Management Dashboard

A campaign management dashboard built with Next.js 16 (App Router), featuring campaign creation workflows, analytics, sender profile management, and dark/light mode theming.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** (or yarn / pnpm / bun)

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/           # Dashboard layout (sidebar + navbar)
│   │   ├── campaigns/         # Campaign list page
│   │   │   ├── create/        # Campaign creation wizard
│   │   │   │   └── steps/     # Wizard steps (sender, settings, stats)
│   │   │   └── page.js
│   │   ├── analytics/         # Analytics page
│   │   └── layout.js          # Dashboard shell
│   ├── globals.css            # Tailwind v4 + theme CSS variables
│   ├── layout.js              # Root layout (ThemeProvider + StoreProvider)
│   └── page.js                # Landing / redirect
├── components/
│   ├── campaigns/             # Campaign-specific components
│   ├── charts/                # Chart components (StatCard, etc.)
│   ├── layout/                # Navbar, Sidebar, ThemeToggle
│   └── ui/                    # Reusable primitives (Button, Card, Table, Modal, etc.)
├── contexts/                  # SidebarContext, ThemeProvider
├── features/campaign/         # Redux slice, constants, mockData, selectors
├── hooks/                     # useMediaQuery, useDebounce, useClickOutside
├── lib/                       # Redux store, StoreProvider, data helpers
├── schemas/                   # Zod schemas
├── store/                     # Store configuration
└── utils/                     # Formatters, validators
```

### Key Pages

| Route | Description |
|-------|-------------|
| `/campaigns` | Campaign list with filtering, sorting, bulk actions |
| `/campaigns/create` | Workflow mode selection (Standard / Advanced) |
| `/campaigns/create/steps/sender` | Sender profile selection (LinkedIn / Email) |
| `/campaigns/create/steps/settings` | Campaign settings form |
| `/campaigns/create/steps/stats` | Campaign summary & analytics |
| `/analytics` | Performance analytics dashboard |

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| **next** 16 | React framework with App Router, server components |
| **react** 19 | UI library |
| **@reduxjs/toolkit** + **react-redux** | Global state management for campaigns, filters, wizard |
| **tailwindcss** v4 | Utility-first CSS framework with `@theme` tokens |
| **next-themes** | Dark/light mode via `class` attribute toggle |
| **framer-motion** | Page transitions, staggered animations, micro-interactions |
| **lucide-react** | Icon set used across the entire UI |
| **react-hook-form** + **zod** + **@hookform/resolvers** | Form handling with schema validation |
| **react-dropzone** | File upload (CSV import) |
| **recharts** | Charts on analytics & stats pages |

---

## Theming

The project uses **next-themes** with Tailwind CSS variables. Color tokens are defined in `globals.css` under `:root` (light) and `.dark` (dark). Toggle via the sidebar ThemeToggle component.
