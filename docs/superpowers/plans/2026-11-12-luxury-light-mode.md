# Sovereign Luxury Light Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the website's light mode into a prestigious, warm luxury edition (ivory/alabaster parchment, burnished bronze, imperial maroon, tactile frosted cards, and sculpted 3D boundary eagle) on par with the dark obsidian aesthetic, and mount the theme toggle for seamless switching.

**Architecture:** 
1. **Design System & Semantic Tokens:** Expand `tokens.css` with dedicated surface, border, glass, shadow, and gradient tokens under `[data-theme="light"]` and `[data-theme="dark"]`, removing hardcoded dark rgba values across all UI CSS files.
2. **Three.js 3D Hero Parity:** Adapt `Boundary3DEagleLogo.jsx` and `HeroScene.jsx` so that when `isLight` is active, the eagle uses `THREE.NormalBlending` with rich burnished bronze (`#7A4E0D`) and imperial velvet maroon (`#7F1E1D`), custom light-mode particle textures, and calibrated line opacity, making the eagle look like a sculpted luxury insignia instead of washing out.
3. **Theme Toggle Integration:** Mount `ThemeToggle` into `Navbar.jsx` (both desktop header actions and mobile menu sheet) with smooth spring transitions and accessible attributes.

**Tech Stack:** React 19, Three.js (@react-three/fiber, @react-three/drei), Vite, CSS Custom Properties / Tokens.

**Spec:** [docs/superpowers/specs/2026-11-12-light-mode-design.md](file:///Users/anirudhtandon/Desktop/jtv/jyc_technical/docs/superpowers/specs/2026-11-12-light-mode-design.md) (Synthesized from codebase audit and user mandate for dark-mode parity).

## Global Constraints

- Must preserve the brand colors: Gold (`#EED79A` in dark, `#7A4E0D` burnished bronze in light) and Maroon (`#7F1E1D`).
- Light mode background must be warm alabaster/ivory (`#FBF9F5` / `#F3EFE8`), never sterile `#FFFFFF` blinding white.
- All text must pass WCAG AA contrast (minimum 4.5:1 for body text `#15120E`, `#3D352D`).
- No hardcoded dark `rgba(18, 16, 13, ...)` or `rgba(10, 8, 6, ...)` in component stylesheets; all surfaces must consume CSS tokens.
- The 3D Eagle must remain performant and 60 FPS on both mobile and desktop.
- Existing dark mode styling, animations, and interactions must not be altered or degraded.

## Review Focus

1. **Light Mode Three.js Visibility:** `THREE.AdditiveBlending` causes particles to wash out into white. Verify `THREE.NormalBlending` is used when `isLight` is true.
2. **Card Illegibility:** If any component retains hardcoded `rgba(14, 11, 8, 0.45)`, dark text placed on top becomes unreadable. Verify cards render porcelain/glass surfaces in light mode.
3. **Theme Persistence:** Verify switching theme writes to `localStorage('jyc-theme')` and initializes correctly on page reload.
4. **Mobile Navigation Toggle:** Verify the Theme Toggle is accessible and functional on small screens inside the mobile menu drawer.
5. **Smooth Transitions:** Verify toggling themes does not cause harsh flickering or white flash by checking the `.theme-transitioning` class behavior.

---

### Task 1: Tokens and Core Palette Calibration

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Test: Verification script `tests/verify-tokens.mjs`

**Interfaces:**
- Consumes: CSS Custom properties in `:root` and `[data-theme="light"]`.
- Produces: Complete semantic token set including `--color-surface-glass`, `--color-surface-card`, `--color-border`, `--color-border-bright`, `--color-accent`, `--shadow-md`, `--shadow-lg`, `--color-stats-bg`.

- [ ] **Step 1: Write verification test for semantic tokens**
Create `tests/verify-tokens.mjs` that checks `src/styles/tokens.css` contains all required semantic tokens in both `:root` and `[data-theme="light"]`, and ensures light mode tokens contain no black/void backgrounds.

- [ ] **Step 2: Run verification test to verify current state**
Run: `node tests/verify-tokens.mjs`
Expected: FAIL due to missing tokens like `--color-stats-bg`, `--color-card-border-hover`, etc.

- [ ] **Step 3: Update `tokens.css` and `global.css`**
Define complete light mode tokens:
- `--color-void: #FBF9F5`
- `--color-surface: #FFFFFF`
- `--color-surface-2: #F3EFE8`
- `--color-surface-glass: rgba(255, 255, 255, 0.85)`
- `--color-surface-card: #FFFFFF`
- `--color-stats-bg: rgba(243, 239, 232, 0.85)`
- `--color-border: rgba(122, 78, 13, 0.14)`
- `--color-border-bright: rgba(122, 78, 13, 0.32)`
- `--color-border-maroon: rgba(127, 30, 29, 0.25)`
- `--color-text: #15120E`
- `--color-text-dim: #3D352D`
- `--color-text-muted: #7A6E5E`
- `--color-accent: #7A4E0D`
- Multi-layer diffusion shadows for light mode.
In `global.css`, make scrollbars, code tags, and noise overlay consume semantic variables.

- [ ] **Step 4: Run verification test to verify it passes**
Run: `node tests/verify-tokens.mjs`
Expected: PASS

---

### Task 2: Three.js 3D Eagle Logo Light Mode Optimization

**Files:**
- Modify: `src/three/objects/Boundary3DEagleLogo.jsx`
- Modify: `src/three/scenes/HeroScene.jsx`
- Modify: `src/three/HeroCanvas.jsx`
- Test: Verification script `tests/verify-three-theme.mjs`

**Interfaces:**
- Consumes: `isLight` boolean from `ThemeContext` via props.
- Produces: Correct blending mode (`NormalBlending` vs `AdditiveBlending`), material colors (burnished bronze `#7A4E0D` and maroon `#7F1E1D` in light; gold and crimson in dark), line opacity, and custom light-mode particle texture.

- [ ] **Step 1: Write test for Three.js theme adaptation**
Create `tests/verify-three-theme.mjs` to assert that `Boundary3DEagleLogo.jsx` conditionally switches blending modes based on `isLight` and generates light-mode compatible textures.

- [ ] **Step 2: Run verification test to verify it fails**
Run: `node tests/verify-three-theme.mjs`
Expected: FAIL (currently hardcoded to `AdditiveBlending` and static texture).

- [ ] **Step 3: Implement dynamic blending and lighting in `Boundary3DEagleLogo.jsx` & `HeroScene.jsx`**
1. In `Boundary3DEagleLogo.jsx`:
   - Generate two particle textures or dynamic texture based on `isLight`: light mode texture uses burnished bronze / velvet maroon with smooth alpha falloff to transparent (`rgba(122, 78, 13, 1)` -> `rgba(127, 30, 29, 0.85)` -> `rgba(127, 30, 29, 0)`).
   - In `<pointsMaterial>`, switch `blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}`, `opacity={isLight ? 0.98 : 0.95}`, `size={isLight ? 0.095 : 0.085}`.
   - In `<lineBasicMaterial>`, switch `blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}`, `color={isLight ? '#7F1E1D' : '#EF4444'}`, `opacity={isLight ? 0.45 : 0.25}`.
2. In `HeroScene.jsx`:
   - Calibrate ambient and directional lighting for light mode so particles have strong contrast and specular highlights.

- [ ] **Step 4: Run verification test to verify it passes**
Run: `node tests/verify-three-theme.mjs`
Expected: PASS

---

### Task 3: Replace Hardcoded Dark Surfaces Across UI Components

**Files:**
- Modify: `src/pages/Home.css`
- Modify: `src/components/ui/EventCard.css`
- Modify: `src/components/ui/DoubtCard.css`
- Modify: `src/components/ui/DoubtForm.css`
- Modify: `src/components/ui/AnswerCard.css`
- Modify: `src/components/ui/AnswerForm.css`
- Modify: `src/pages/Events.css`
- Modify: `src/pages/DoubtDetails.css`
- Modify: `src/pages/AdminLogin.css`
- Modify: `src/pages/AdminDashboard.css`
- Modify: `src/components/ui/SectionLabel.css`
- Test: Verification script `tests/verify-no-hardcoded-surfaces.mjs`

**Interfaces:**
- Consumes: Semantic tokens (`--color-surface-glass`, `--color-surface-card`, `--color-stats-bg`, `--color-border`, etc.).
- Produces: Clean, theme-adaptive stylesheets where every card, form, and banner seamlessly respects the active theme.

- [ ] **Step 1: Write test to detect hardcoded dark glass backgrounds**
Create `tests/verify-no-hardcoded-surfaces.mjs` that scans component CSS files for raw `rgba(18, 16, 13, ...)`, `rgba(14, 11, 8, ...)`, and `rgba(10, 8, 6, ...)`.

- [ ] **Step 2: Run test to confirm it detects existing violations**
Run: `node tests/verify-no-hardcoded-surfaces.mjs`
Expected: FAIL with multiple violations found in `Home.css`, `EventCard.css`, `DoubtCard.css`, etc.

- [ ] **Step 3: Refactor CSS files to use semantic tokens**
1. In `Home.css`:
   - Replace `.home-stats` background with `var(--color-stats-bg)` and borders with `var(--color-border)`.
   - Replace `.home-activity-card` background with `var(--color-surface-glass)` and border with `var(--color-border)`.
   - Replace `.home-connect__inner` background with `var(--color-surface-card)` or `var(--color-surface-glass)` and border with `var(--color-border)`.
2. In `EventCard.css`:
   - Replace `.event-card` background with `var(--color-surface-card)`.
   - Update `.event-card__overlay` to be subtle in light mode or use theme-aware backdrop.
3. In `DoubtCard.css`, `DoubtForm.css`, `AnswerCard.css`, `AnswerForm.css`:
   - Replace hardcoded background rgba with `var(--color-surface-card)` or `var(--color-surface-glass)`.
4. In `Events.css`, `DoubtDetails.css`, `AdminLogin.css`, `AdminDashboard.css`:
   - Replace hardcoded modal/form container backgrounds with semantic tokens.

- [ ] **Step 4: Run test to verify all violations are resolved**
Run: `node tests/verify-no-hardcoded-surfaces.mjs`
Expected: PASS (0 hardcoded dark surfaces).

---

### Task 4: Mount ThemeToggle into Navbar (Desktop & Mobile)

**Files:**
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/layout/Navbar.css`
- Modify: `src/components/ui/ThemeToggle.css`
- Test: Verification script `tests/verify-navbar-toggle.mjs`

**Interfaces:**
- Consumes: `ThemeToggle` component from `src/components/ui/ThemeToggle.jsx`.
- Produces: Integrated theme toggle in both desktop header and mobile slide-out drawer.

- [ ] **Step 1: Write test to verify ThemeToggle presence in Navbar**
Create `tests/verify-navbar-toggle.mjs` to ensure `Navbar.jsx` imports `ThemeToggle` and renders it in both desktop actions and mobile drawer.

- [ ] **Step 2: Run test to verify it fails**
Run: `node tests/verify-navbar-toggle.mjs`
Expected: FAIL (ThemeToggle not imported in Navbar).

- [ ] **Step 3: Integrate ThemeToggle into Navbar**
1. Import `ThemeToggle` in `Navbar.jsx`.
2. Place `<ThemeToggle />` inside `.navbar__actions` (desktop).
3. Place `<ThemeToggle showLabel={true} />` inside `.mobile-menu__sheet` (mobile).
4. Update `ThemeToggle.css` and `Navbar.css` to ensure crisp spacing, alignment, and hover effects that look elegant in both dark obsidian and light alabaster.

- [ ] **Step 4: Run test to verify it passes**
Run: `node tests/verify-navbar-toggle.mjs`
Expected: PASS

---

### Task 5: End-to-End Build & Visual Verification

**Files:**
- Test: Run Vite production build `npm run build`
- Test: Automated smoke check of bundle assets

- [ ] **Step 1: Run production build**
Run: `npm run build`
Expected: Build succeeds with 0 errors, generating clean bundle in `dist/`.

- [ ] **Step 2: Run all test verification scripts**
Run: `node tests/verify-tokens.mjs && node tests/verify-three-theme.mjs && node tests/verify-no-hardcoded-surfaces.mjs && node tests/verify-navbar-toggle.mjs`
Expected: All 4 verification scripts report PASS.

- [ ] **Step 3: Verify local dev server running without errors**
Verify dev server on `http://localhost:5173/` logs clean and serves pages smoothly.

