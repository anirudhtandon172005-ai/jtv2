# Sovereign Luxury Light Mode Design Specification

## Overview & Vision
The goal is to elevate the light mode experience of the JYC Technical website to match the visual depth, prestige, and cinematic polish of the obsidian dark mode. Instead of a flat, sterile white background, light mode adopts a "Sovereign Luxury" aesthetic: warm ivory/alabaster parchment, burnished bronze, imperial velvet burgundy, tactile frosted glass cards, and a sculpted 3D boundary eagle that has rich contrast and presence.

## Core Pillars
1. **Parchment Surface System:**
   - Background: Warm Alabaster (`#FBF9F5`) and Warm Pearl Linen (`#F3EFE8`).
   - Cards: Pure Porcelain (`#FFFFFF`) with multi-layer diffusion shadows (`rgba(35, 25, 15, 0.06)`).
   - Glassmorphism: Frosted porcelain glass with subtle gold/bronze hairline borders (`rgba(122, 78, 13, 0.14)`).

2. **Typography & Contrast (WCAG AA Compliant):**
   - Headings & Titles: Deep Charcoal (`#15120E`).
   - Body & Subtitles: Warm Velvet Umber (`#3D352D`).
   - Muted/Captions: Cashmere Stone (`#7A6E5E`).
   - Accents: Deep Burnished Bronze (`#7A4E0D`), Imperial Velvet Burgundy (`#7F1E1D`).

3. **Three.js 3D Eagle Insignia in Light Mode:**
   - Dark Mode: Glowing fire amber particles, `THREE.AdditiveBlending`, bloom post-processing.
   - Light Mode: Sculpted metallic burnished bronze and burgundy points, `THREE.NormalBlending`, custom opacity-mapped particle texture, rich boundary wireframe lines (`#7F1E1D` with 0.45 opacity), and warm rim directional lighting.

4. **Seamless User Control:**
   - Mount `ThemeToggle` into both desktop header actions and mobile drawer.
   - Persist preference in `localStorage('jyc-theme')`.
   - Maintain 350ms smooth transition class (`.theme-transitioning`) across theme switches.

