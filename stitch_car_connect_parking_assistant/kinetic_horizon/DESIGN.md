---
name: Kinetic Horizon
colors:
  surface: '#faf8ff'
  surface-dim: '#d6d9ef'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f2ff'
  surface-container: '#ebedff'
  surface-container-high: '#e4e7fe'
  surface-container-highest: '#dee1f8'
  on-surface: '#171b2b'
  on-surface-variant: '#45464e'
  inverse-surface: '#2c3041'
  inverse-on-surface: '#eff0ff'
  outline: '#76767f'
  outline-variant: '#c6c5cf'
  surface-tint: '#545d82'
  primary: '#081234'
  on-primary: '#ffffff'
  primary-container: '#1e2749'
  on-primary-container: '#868eb6'
  inverse-primary: '#bcc5ef'
  secondary: '#ae3026'
  on-secondary: '#ffffff'
  secondary-container: '#fc6959'
  on-secondary-container: '#690003'
  tertiary: '#00190e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00301e'
  on-tertiary-container: '#00a472'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#bcc5ef'
  on-primary-fixed: '#10193b'
  on-primary-fixed-variant: '#3c4569'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#8c1712'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#171b2b'
  surface-variant: '#dee1f8'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  code-license-plate:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 26px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 2.5rem
  space-4xl: 3.5rem
  screen-edge-padding: 1.25rem
  card-inner-padding: 1.25rem
  touch-target-min: 3rem
---

## Brand & Style

This design system delivers a calm, fast, reassuring, and trustworthy automotive utility experience tailored to urgent roadside encounters and seamless vehicle management ("Scan. Connect. Move."). The aesthetic balances warm hospitality with decisive, high-utility operational precision.

### Aesthetic Movement
The interface relies on **Modern Tactile Warmth**—eschewing clinical cold grays in favor of cream foundations, deep oceanic navy framing, and energetic coral accents. The mood communicates immediate safety, frictionless human-to-human coordination, and calm resolution during high-stress parking or blocking scenarios.

### Design Principles
1. **Stress-Reducing Clarity**: Information architecture favors generous touch targets, distinct visual hierarchies, and clear call-outs. When a vehicle blocks someone, cognitive load must remain near zero.
2. **Warm Tactility**: Softened cream canvases paired with floating white cards foster approachability, stripping away the hostile or purely transactional feel of urban parking logistics.
3. **Decisive Action**: High-priority flows ("Call Owner", "Scan QR") command the viewport with saturated coral-orange accents, ensuring unambiguous paths forward in any lighting condition.

## Colors

The palette balances deep nautical stability with an energetic, inviting signal color for key automotive interactions.

### Palette Architecture
- **Primary Navy (`#1E2749`)**: Used for top app bars, bottom navigation frames, primary headlines, and anchoring status bars. Communicates rock-solid reliability and automotive authority.
- **Accent Coral (`#FF6B5B`)**: Reserved strictly for high-value interactions—such as primary actions ("Scan QR", "Call Owner", "Add Vehicle"), notification dots, active pill tabs, and critical affordances.
- **Tertiary Emerald (`#10B981`)**: Signals success, vehicle readiness, verification checkmarks, and active status states.
- **Warm Canvas Neutral (`#FAF9F6`)**: The primary viewport foundation. Replaces sterile cool white with a grounded, organic cream tone that reduces glare in outdoor daylight.
- **Card Surface (`#FFFFFF`)**: Pure elevated surface for interactive panels, contextual action cards, and modals.
- **Tinted Container Surface (`#F4F3EE`)**: Subtle secondary background for segmented controls, disabled fields, and badge backgrounds.
- **Text & Body Neutral (`#2D3142`)**: High-contrast charcoal/indigo hybrid engineered for high outdoor legibility without the harshness of pure black.
- **Subtle Meta Neutral (`#71788E`)**: Mid-tone slate for supporting subtitles, input placeholders, icon glyphs in idle states, and metadata timestamps.

## Typography

Plus Jakarta Sans powers the entire typographic scale. Its geometric proportions, wide apertures, and friendly rounded terminals mirror the soft automotive industrial design of modern cockpits.

### Hierarchy Guidelines
- **Display & Headlines (`headline-xl`, `headline-lg`)**: Applied to vehicle onboarding titles, owner confirmation screens, and critical emergency overlays. Rendered in deep navy `#1E2749`.
- **Card Titles & Subheaders (`headline-md`, `headline-sm`)**: Used inside individual car profile sheets, contact prompts, and alert banners.
- **Body (`body-lg`, `body-md`, `body-sm`)**: Formulated for maximum legibility at a glance, specifically in midday sunlight. Set in charcoal `#2D3142`.
- **License Plate Typography (`code-license-plate`)**: A dedicated uppercase format with heightened letter spacing and extra-bold weight, tailored for vehicle registration plates, windshield stickers, and VIN lookups.

## Layout & Spacing

This design system employs a **mobile-first fluid column layout** structured on an 8pt base grid with a 4pt sub-grid for fine icon alignment and micro-spacing.

### Layout Philosophy
- **Fluid Viewport Boundaries**: The layout adapts smoothly up to `480px` for pure mobile interfaces, centering within a contained shell (`max-width: 640px`) on tablet or desktop web contexts to prevent card detachment.
- **Screen Margin Rhythm**: Standard screen edge horizontal padding is pinned at `1.25rem` (20px), ensuring safe buffers for modern edge-to-edge mobile glass.
- **Touch Targets**: All mission-critical trigger elements ("Call", "Message", "Scan QR") enforce a minimum bounding box of `3rem` (48px) to support one-handed thumb navigation outdoors while walking.
- **Vertical Chunking**: Content groups are spaced with `1.5rem` (24px) gaps to prevent cognitive clutter during urgent interactions.

## Elevation & Depth

Visual depth is achieved through **ambient warm drop shadows** layered over the cream foundation (`#FAF9F6`). Rather than synthetic black shadows, this design system tints depth using the deep indigo primary tone (`#1E2749`) diffused at low opacities, generating natural, atmospheric lift.

### Elevation Hierarchy
- **Level 0 (Flat / Canvas)**: Ground background `#FAF9F6`.
- **Level 1 (Subtle Stack / Inset)**: Tinted panels `#F4F3EE` with no shadow, defined by tonal contrast for vehicle specification chips, badge backgrounds, and text-field cavities.
- **Level 2 (Standard Card Surface)**: Pure white `#FFFFFF` cards featuring an ambient drop shadow:
  - `box-shadow: 0 4px 12px -2px rgba(30, 39, 73, 0.05), 0 2px 6px -1px rgba(30, 39, 73, 0.03);`
  - Optional subtle edge: `border: 1px solid rgba(244, 243, 238, 0.8)`.
- **Level 3 (Floating Action & Modals)**: Bottom sheets, sticky contact bars, and prominent scan overlays:
  - `box-shadow: 0 12px 32px -4px rgba(30, 39, 73, 0.12), 0 4px 12px -2px rgba(30, 39, 73, 0.04);`
- **Level 4 (Accent Hover / Focus Glow)**: Primary coral CTA interaction state:
  - `box-shadow: 0 6px 20px -2px rgba(255, 107, 91, 0.35);`

## Shapes

The shape system expresses welcoming, high-touch tactility through softened silhouettes, eliminating harsh right angles while retaining an orderly structure.

### Geometric Language
- **Card Containers**: Standard surface cards, bottom sheet dialogs, and dynamic status modules utilize an explicit `16px` border radius (`rounded-2xl`). This curvature balances modern consumer hardware edges with efficient internal content margins.
- **Buttons & Interactive Tags**: Primary actions, segmented switch controls, and action pills utilize fully rounded caps (`pill-shaped` / `rounded-full`) to immediately demarcate clickability from container surfaces.
- **Inputs & Field Cavities**: Form fields adopt a `12px` radius (`rounded-xl`), creating a visual bridge between the larger card shells and the pill controls.
- **Iconography**: Clean 2px stroke line-style icons (Lucide-inspired) featuring rounded caps and joins (`stroke-linejoin: round; stroke-linecap: round;`), mirroring the structural curvature of the typography.

## Components

### Buttons
- **Primary CTA ("Call Owner", "Scan QR")**:
  - Background: Accent Coral (`#FF6B5B`). Text: Pure White (`#FFFFFF`).
  - Height: `52px` (Pill: `rounded-full`). Font: `label-lg`.
  - Icon: Lucide phone or QR code on leading edge with `8px` gap.
  - Active/Press: Transform scale `0.98`, shadow shrinks to `0 2px 8px rgba(255, 107, 91, 0.25)`.
- **Secondary Utility ("Send Quick Message")**:
  - Background: Tinted Container (`#F4F3EE`). Text: Deep Indigo (`#1E2749`).
  - Height: `48px` (Pill: `rounded-full`). Font: `label-md`.
  - Hover/Focus: Border tinted with `#1E2749` at 15% opacity.
- **Ghost / Destructive**:
  - Transparent surface, 1.5px stroke border, text in muted slate `#71788E` or warning rose.

### Cards & Vehicle Profile Sheets
- **Base Card**:
  - Pure White `#FFFFFF`, border-radius `16px` (`rounded-2xl`), ambient navy drop shadow (`Level 2`).
  - Padding: `1.25rem` (20px).
- **Vehicle Identifier Badge**:
  - Inset license plate frame within the card header: Background `#FAF9F6`, high-contrast navy `#1E2749` text (`code-license-plate`), bordered by a subtle 1px divider (`#F4F3EE`).

### Input Fields & Verification Controls
- **Text Inputs**:
  - Surface: Pure White `#FFFFFF` or Inset Tint `#F4F3EE`.
  - Border: 1.5px solid transparent. On focus: 1.5px solid `#1E2749` with `4px` outer ring in `#1E2749` at 8% opacity.
  - Height: `48px`, border-radius `12px`.
  - Text: Charcoal `#2D3142`, Placeholder: `#71788E`.

### Chips & Status Indicators
- **Vehicle Status Badge**:
  - Read/Available: Emerald green tint background (`rgba(16, 185, 129, 0.12)`), text `#10B981`, with a `6px` solid emerald pulsing status dot.
  - Idle/Sent: Slate tint background (`rgba(113, 120, 142, 0.12)`), text `#71788E`.
  - Shape: Fully rounded pill (`rounded-full`), height `28px`, padding `0.25rem 0.75rem`.

### Domain-Specific Components
- **Rapid Contact Bottom-Sheet**:
  - Floating modal anchored to screen bottom with a `24px` top corner radius. Houses instant one-tap canned notifications ("I'm blocked in", "Headlights left on", "Window cracked open", "Custom message") followed by the primary coral action trigger.
- **QR Code Viewport**:
  - Concentric rounded square container with alignment reticles in `#1E2749` and a glowing coral scanning sweep line.