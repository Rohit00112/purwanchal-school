# Purwanchal Secondary Boarding School — Official Website

> **Location:** Itahari-20, Tarahara, Sunsari, Koshi Province, Nepal  
> **Telephone:** +977-25-475403  
> **Established:** 1994 AD (2051 BS)  
> **Affiliations:** Ministry of Education, Nepal | CDC | National Examinations Board (NEB)

A production-ready, full-stack institutional web application built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Prisma ORM. Designed following high-end editorial and architectural collegiate design principles (anti-slop standard), completely free from generic AI templates.

---

## 🏛️ Architectural & Design Philosophy

- **Editorial Collegiate Typography:** High-contrast pairing of *Cormorant Garamond* (classical, dignified serifs for institutional headings and pull-quotes) with *Inter* (crisp, functional sans-serif for reading and navigation).
- **Institutional Color Palette:**
  - Deep Collegiate Navy (`#0E2038`)
  - Warm Academic Blue (`#1F4E79`)
  - Regal Accent Gold (`#C59B27`)
  - Architectural Warm Parchment (`#FBFBF8` / `#F3F1EA`)
  - Deep Charcoal Text (`#1A202C`)
- **No Generic AI Patterns:**
  - Zero pill-shaped cards or over-rounded buttons.
  - Zero decorative emojis or generic AI glyphs.
  - Zero em dashes (`—`) in copy per antislop standards.
  - Real architectural layouts: asymmetric split screens, audience bifurcation gateways, and structured prospectus matrices.
- **Mobile First & Accessible:**
  - 44px+ minimum tap targets with generous spacing.
  - Zero horizontal overflow across all screen sizes.
  - High contrast (WCAG AA compliant, 4.5:1+ contrast ratios).
  - Native keyboard navigation and focus management.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16.4 (App Router with Turbopack) |
| **UI Library** | React 19, Tailwind CSS v4, Radix UI primitives |
| **Typography** | Cormorant Garamond & Inter (via `next/font/google`) |
| **Forms & Validation** | React Hook Form, Zod v4 schemas |
| **Backend & ORM** | Next.js Route Handlers, Prisma ORM 6.4 |
| **Database** | PostgreSQL (Neon / Supabase compatible) |
| **Authentication** | NextAuth.js v5 (JWT sessions, credentials provider) |
| **Email Dispatch** | Resend API with transactional templates |
| **SEO & Schema** | OpenGraph, Twitter Cards, JSON-LD School Schema |

---

## 📂 Information Architecture & Features

### 1. Public Portal
- **Home (`/`):**
  - Institutional masthead & urgent notice ticker.
  - Audience bifurcation gateways: Prospective Families, Curriculum Pathways, Campus Infrastructure.
  - Founding purpose and educational philosophy with leadership pull-quote.
  - Academic divisions preview (Pre-Primary, Primary, Lower Secondary, Secondary SEE, +2 Wings).
  - Physical facilities and laboratories showcase.
  - Official notice board and upcoming calendar highlights.
  - Admissions consultation callout.
- **About Us (`/about`):**
  - 30-year institutional history in Tarahara since 1994 AD.
  - Guiding vision, mission, and strategic objectives.
  - Principal's official address and message to families.
  - Academic departments and faculty overview.
- **Academics (`/academics`):**
  - Continuous curriculum from Nursery through Grade 10.
  - Higher Secondary (+2) wings: Management, Computer Science, and Education.
  - Academic calendar with terminal exam periods and holiday notices.
- **Campus & Facilities (`/facilities`):**
  - Physics, Chemistry, and Biology demonstration laboratories.
  - Networked Computer Science lab with programming workstations.
  - Central reading library and reference room.
  - Athletics, football, and volleyball grounds.
  - Supervised school bus transit network across Sunsari.
- **Admissions (`/admissions`):**
  - 5-step transparent admission journey.
  - Grade-by-grade eligibility and age criteria.
  - Required document checklist (birth certificate, TC, marksheets).
  - Frequently Asked Questions (FAQ) accordion.
  - **Online Admission Inquiry Form** with client and server-side Zod validation, PostgreSQL persistence, and automatic notification.
- **Notice Board & Events (`/news`, `/events`):**
  - Official administrative circulars with dynamic routes (`/news/[slug]`, `/events/[slug]`).
- **Media Gallery (`/gallery`):**
  - Category-filtered photo archive (Academics, Sports, Classroom, Cultural, Campus).
  - Accessible, full-screen lightbox modal with keyboard navigation.
- **Contact (`/contact`):**
  - Physical address, verified telephone line (+977-25-475403), office hours.
  - Responsive Google Maps embed with exact Tarahara coordinates.
  - Interactive contact message form with rate limiting and database storage.

### 2. Administrative Portal (`/admin`)
- Secure login interface (`/admin/login`) with credential verification and bcrypt password hashing.
- Role-based authorization (`SUPER_ADMIN`, `ADMIN`, `EDITOR`).
- Operational dashboard with real metrics:
  - New admission inquiries requiring review.
  - Unread contact messages from parents.
  - Published notices and upcoming events count.
- Dedicated management endpoints for inquiries, circulars, events, staff, and facilities.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- PostgreSQL database (local or cloud e.g. Neon, Supabase)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/Rohit00112/purwanchal-school.git
cd purwanchal-school
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `.env` with your PostgreSQL database URL, NextAuth secret, and optional Resend API key:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/purwanchal?sslmode=prefer"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
RESEND_API_KEY="re_optional_key"
SCHOOL_EMAIL="info@purwanchalsecondaryschool.com"
```

### 4. Initialize Database
Generate the Prisma client:
```bash
npx prisma generate
```
Apply migrations / push schema to your database:
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build
```bash
npm run build
npm start
```

---

## 📄 License & Rights

Registered Educational Institution, Itahari Sub-Metropolitan City, Ward No. 20, Tarahara, Sunsari, Koshi Province, Nepal.  
All rights reserved © Purwanchal Secondary Boarding School.
