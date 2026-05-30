---
name: Frozen Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006686'
  on-secondary: '#ffffff'
  secondary-container: '#7ed4fd'
  on-secondary-container: '#005b78'
  tertiary: '#545d62'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d767b'
  on-tertiary-container: '#fbfdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#c0e8ff'
  secondary-fixed-dim: '#7bd1fa'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d66'
  tertiary-fixed: '#dbe4ea'
  tertiary-fixed-dim: '#bfc8ce'
  on-tertiary-fixed: '#141d21'
  on-tertiary-fixed-variant: '#3f484d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 96px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system embodies the concept of "Frozen Light"—a synthesis of high-alpine clarity and modern industrial precision. It transitions away from heavy shadows and dark transparency in favor of a bright, high-key aesthetic that feels airy and expansive. 

The brand personality is professional, calm, and intellectually rigorous. It targets a sophisticated audience that values clarity of thought and efficiency of movement. The visual style is rooted in **Minimalism** with subtle **Glassmorphic** echoes, utilizing generous whitespace and razor-sharp execution to create a premium, gallery-like experience. The emotional response should be one of "effortless focus," where the interface recedes to let the content shine with crystalline sharpness.

## Colors

The palette is centered on a "Glacial Light" theme. The canvas is a pure, unadulterated white (#FFFFFF) to maximize perceived brightness and space. 

- **Primary Blue (#0284C7):** A deepened version of ice-blue, optimized to meet WCAG AA contrast requirements against white backgrounds. Used for interactive text, links, and primary action states.
- **Secondary Blue (#7DD3FC):** The core brand "ice" color, reserved for large decorative elements, illustrative accents, or button backgrounds where white text is not required.
- **Neutral Slate (#0F172A):** A deep, cold grey-black used for all primary typography to ensure maximum legibility and a grounded feel.
- **Surface Accents:** A very pale blue-tinted grey (#F8FAFC) is used for secondary layout sections to provide subtle structural distinction without breaking the "light" theme.

## Typography

The design system relies exclusively on **Inter** to maintain a systematic, utilitarian, and contemporary feel. The type hierarchy is designed with precision in mind:

- **Headlines:** Use tighter letter-spacing and heavier weights (600-700) to create "anchors" on the page.
- **Body Text:** Set with generous line height (1.5x) to ensure the "airy" brand vibe persists even in content-heavy areas.
- **Labels:** Small caps and increased tracking are used for meta-information, drawing inspiration from technical blueprints.
- **Contrast:** High-contrast text (Slate on White) is non-negotiable for accessibility and a premium, editorial look.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column fluid grid** for mobile. 

- **The 8px Rhythm:** All spatial dimensions are multiples of 8px, ensuring vertical rhythm and alignment across components.
- **Whitespace as a Feature:** Layouts should favor "over-spacing" rather than overcrowding. Margins are generous to reinforce the feeling of an expansive, frozen landscape.
- **The Hairline Grid:** Layout sections are separated by 1px hairlines (#E2E8F0) instead of gutters where maximum precision is required. This "blueprinting" effect helps the UI feel engineered rather than just "designed."

## Elevation & Depth

In this light theme, depth is achieved through **layering and transparency** rather than shadows.

- **Flat Surfaces:** Primary cards and containers sit flush with the canvas, defined only by 1px hairline borders in #E2E8F0.
- **Frozen Overlays:** Modals and dropdowns utilize a `backdrop-filter: blur(12px)` with a semi-transparent white background (rgba(255, 255, 255, 0.8)). This maintains the "ethereal depth" from the original dark theme.
- **Z-Index Logic:** Higher elevation levels (like floating tooltips) are indicated by a slightly darker border or a very subtle, low-opacity tint of the primary blue in the border, rather than a drop shadow.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a subtle "human" touch to an otherwise clinical and precise layout. 

- **Precision Corners:** Standard components like inputs and buttons use a 4px (0.25rem) radius. 
- **Container Radius:** Larger containers (cards, modals) may scale up to 8px (0.5rem) to maintain visual proportion.
- **Consistent Stroke:** All borders, regardless of the element size, must remain a consistent 1px width to preserve the "hairline" aesthetic.

## Components

### Buttons
- **Primary:** Solid #0284C7 with white text. High-contrast and clear.
- **Secondary:** Transparent background with a 1px border (#E2E8F0) and Primary Blue text. 
- **Ghost:** No border or background, using Primary Blue text.

### Input Fields
- **Default State:** 1px hairline border (#E2E8F0), white background, Slate text.
- **Focus State:** 1px border in Primary Blue (#0284C7) with a very subtle 2px outer glow of #7DD3FC at 20% opacity.

### Cards
- **Structure:** White background, 1px hairline border, no shadow.
- **Padding:** Minimum 24px (lg) padding to ensure content breathing room.

### Chips & Tags
- **Style:** Light blue tint (#F0F9FF) background with Primary Blue (#0284C7) text. No borders, or very subtle #7DD3FC borders for status indicators.

### Progress & Data
- **Visuals:** Use the vibrant #7DD3FC for data visualization and progress bars, as it pops beautifully against the white canvas while remaining professional.