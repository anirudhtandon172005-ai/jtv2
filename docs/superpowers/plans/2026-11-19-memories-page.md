# Memories Page & Storage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated, premium "Memories" page (`/memories`) featuring an alternating editorial storytelling layout (zigzag pattern: image-left/content-right alternating with content-left/image-right) showcasing JTV events and student milestones, establish a Supabase storage bucket (`memories`), and provide local fallback assets.

**Architecture:**
1. **Data Model (`src/data/memories.js`):** Structured memory entries containing titles, event categories, narrative prose, metadata pills (venue, date/cohort, vertical), and dual image URLs (Supabase storage URL with local `/memories/` fallback).
2. **Component & Page Architecture (`src/pages/Memories.jsx` & `src/pages/Memories.css`):** Alternating timeline/magazine zigzag layout with central connecting accent track, milestone node badges, glass card containers, interactive image zoom/lightbox viewer, and GSAP scroll-triggered reveals.
3. **Navigation & Routing (`src/App.jsx`, `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`):** Register `/memories` route with lazy loading and include "Memories" in primary desktop/mobile navigation and footer.
4. **Storage Architecture (`supabase/create_memories_bucket.sql`, `scripts/upload_memories.mjs`, `public/memories/`):** SQL migration to provision the `memories` bucket with public read/write RLS policies, a Node upload script, and local public asset mirroring.

**Tech Stack:** React 19, React Router v7, GSAP ScrollTrigger, Vite, CSS Custom Properties (Theme tokens), Supabase Storage.

**Spec:** User prompt mandate for an alternating editorial pattern ("not general slop", image left/content right alternating with image right/content left), dedicated Supabase `memories` storage bucket, and full light/dark mode parity.

## Global Constraints

- Must maintain parity with established luxury light/dark mode design tokens (`--color-surface`, `--color-border-bright`, `--color-accent`, etc.).
- Alternating layout must gracefully collapse to a vertical timeline stack on screens `<= 840px` with no horizontal overflow.
- Images must have accessible `alt` text and support full-screen lightbox inspection when clicked.
- Images must have zero broken image states: use local asset mirroring in `public/memories/` alongside Supabase CDN URLs.

## Review Focus

1. **Alternating Grid Reversal:** Verify CSS `grid` or `flex-direction: row-reverse` on even items so alternating layout strictly follows Image Left / Text Right -> Text Left / Image Right.
2. **Mobile Layout Fluidity:** Verify that on mobile viewports, cards collapse into a clean top-to-bottom sequence without cramped columns or reversed unreadable text.
3. **Theme Parity:** Verify both Light (warm alabaster / burnished bronze) and Dark (obsidian / gold) modes render with WCAG AA compliant text contrast.
4. **Zero Broken Images:** Verify that if the Supabase bucket is pending migration execution, images immediately resolve to local `public/memories/` copies without 404s.
5. **GSAP Scroll Animation Cleanliness:** Verify `revealOnScroll` animates memory items smoothly as they enter viewport and cleans up triggers on unmount.

---

### Task 1: Asset Preparation & Local Mirroring

**Files:**
- Create: `public/memories/master_of_none_trap.jpg`
- Create: `public/memories/interactive_session.jpg`
- Create: `public/memories/society_orientation.jpg`
- Create: `public/memories/cohort_energy.jpg`
- Create: `public/memories/workshop_cohort.jpg`
- Create: `src/data/memories.js`

- [ ] **Step 1: Copy uploaded image files to `public/memories/` with descriptive filenames**
- [ ] **Step 2: Create `src/data/memories.js` with structured data, captions, and narrative copy**
- [ ] **Step 3: Verify image files exist and are readable**

---

### Task 2: Supabase Storage Bucket Migration & Upload Script

**Files:**
- Create: `supabase/create_memories_bucket.sql`
- Create: `scripts/upload_memories.mjs`

- [ ] **Step 1: Write `supabase/create_memories_bucket.sql` with bucket definition and RLS policies**
- [ ] **Step 2: Create `scripts/upload_memories.mjs` using `@supabase/supabase-js` to upload images**
- [ ] **Step 3: Test running the upload script against Supabase**

---

### Task 3: Build the Memories Component & Responsive Alternating Styles

**Files:**
- Create: `src/pages/Memories.jsx`
- Create: `src/pages/Memories.css`

- [ ] **Step 1: Create `Memories.jsx` with alternating zigzag cards, lightbox modal, and GSAP reveals**
- [ ] **Step 2: Create `Memories.css` with responsive alternating grid, timeline stem, and light/dark theme tokens**
- [ ] **Step 3: Verify syntax and linting**

---

### Task 4: Route Registration & Navigation Integration

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Register `/memories` route in `App.jsx` with lazy-loading**
- [ ] **Step 2: Add "Memories" to `navLinks` in `Navbar.jsx`**
- [ ] **Step 3: Add "Memories" to `navLinks` in `Footer.jsx`**

---

### Task 5: Build Verification & Testing

- [ ] **Step 1: Run `npm run build` to ensure zero compilation or chunking errors**
- [ ] **Step 2: Verify page renders on Vite dev server at `http://localhost:5173/memories`**
- [ ] **Step 3: Verify light mode and dark mode visual fidelity**

