# Gauntlet Design System Reference

Complete color palette, typography system, and design principles for the Gauntlet brand.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Design Principles](#design-principles)
4. [Rank Tier Visual Treatments](#rank-tier-visual-treatments)
5. [Component Patterns](#component-patterns)
6. [Shareable Card Design](#shareable-card-design)
7. [Gradient and Effect Library](#gradient-and-effect-library)

---

## 1. Color Palette

### Primary Brand (3 colors)

The core identity. Ember is the default brand accent. Bright for hover/active. Deep for pressed/dark-on-dark.

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Ember | #C0392B | --ember | Primary accent, CTAs, brand mark, stat highlights |
| Ember Bright | #E74C3C | --ember-bright | Hover states, active states, error (intentional overlap) |
| Ember Deep | #962D22 | --ember-deep | Pressed states, dark-on-dark contrast, gradient anchors |

### Core Accents (4 colors)

A thermal progression from rising heat to cooled metal. Every accent belongs to the gauntlet narrative.

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Molten | #E8751A | --molten | Streaks, momentum, hot states, secondary CTA |
| Gauntlet Gold | #C9982A | --gauntlet-gold | Achievement, reward, earned status, milestone badges |
| White Fire | #F0D9A0 | --white-fire | Highlights, peak intensity, premium accents, Pro tier |
| Cooled Steel | #7A8A9A | --cooled-steel | Neutral accent, rest states, secondary/disabled elements |

### Semantic / Status (4 colors)

Desaturated and darkened to sit inside the industrial palette. Clear enough to read as status, muted enough to not fight the brand.

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Success | #4A9A6A | --success | Win, complete, connected, goal met |
| Warning | #D4872A | --warning | Caution, streak at risk, attention needed |
| Error | #E74C3C | --error | Failure, loss, broken streak (shares Ember Bright) |
| Info | #6888A8 | --info | Tooltip, hint, neutral system message |

Note: Error intentionally shares Ember Bright. In a competition app, loss/failure mapping to the brand's intense red is thematically correct.

### Dark Neutrals (6 colors)

Six-step scale from pure background to interactive surface. All carry a subtle blue-violet undertone (not pure gray) for depth.

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Void | #06060A | --void | App background, deepest layer |
| Obsidian | #0C0C12 | --obsidian | Secondary background, card base |
| Charcoal | #14141C | --charcoal | Card background, elevated surface |
| Graphite | #1E1E28 | --graphite | Input fields, nested containers |
| Slate | #2A2A38 | --slate | Borders, dividers, subtle separators |
| Iron | #3A3A4A | --iron | Interactive borders, hover backgrounds, disabled text |

### Light Neutrals (6 colors)

Six-step scale for typography hierarchy and light-mode surfaces. Same blue-violet undertone.

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Ash | #6B6B80 | --ash | Muted text, captions, timestamps, placeholders |
| Silver | #9999AD | --silver | Secondary text, labels, descriptions |
| Mist | #C8C8D6 | --mist | Primary body text (dark mode), subheadings |
| Bone | #E8E8EE | --bone | Light borders, light-mode card backgrounds |
| White Hot | #F5F5F8 | --white-hot | Primary text (dark mode), hero content |
| Pure | #FFFFFF | --pure | Maximum contrast text, buttons on dark fills |

### Rank Tier Colors (7 colors)

Each rank has a signature color used for badges, borders, glow effects, and shareable card treatments. These must ALWAYS be rendered with gradient treatments, never flat.

| Rank | Primary Hex | CSS Variable | Gradient |
|------|------------|-------------|----------|
| Bronze | #8B6A4E | --rank-bronze | linear-gradient(135deg, #5C3D2E, #8B6A4E, #A88060) |
| Silver | #8C9BAA | --rank-silver | linear-gradient(135deg, #5A6A78, #8C9BAA, #B8C8D4) |
| Gold | #C8A84E | --rank-gold | linear-gradient(135deg, #8B6914, #C8A84E, #E8D48A) |
| Platinum | #7BB8D4 | --rank-platinum | linear-gradient(135deg, #4A8AAA, #7BB8D4, #AAD4EA) |
| Diamond | #B8D4F0 | --rank-diamond | linear-gradient(135deg, #6A9FCC, #B8D4F0, #E8F0FF) |
| Titanium | #5A5A6A | --rank-titanium | linear-gradient(135deg, #2A2A34, #5A5A6A, #7A7A8A) |
| Obsidian | #C0392B | --rank-obsidian | linear-gradient(135deg, #1A0A08, #3A1510, #962D22) + box-shadow: 0 0 24px rgba(192,57,43,0.4) |

**Total: 25 named colors** (3 primary + 4 accent + 4 semantic + 6 dark neutral + 6 light neutral) plus 7 rank tier treatments.

---

## 2. Typography

### Font Stack

| Role | Font | Weights | Google Fonts Import |
|------|------|---------|-------------------|
| Display | Bebas Neue | Regular (400) | `family=Bebas+Neue` |
| Body / UI | Outfit | 300, 400, 500, 600, 700 | `family=Outfit:wght@300;400;500;600;700` |

**Combined import URL:**
```
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap
```

Both fonts are free via Google Fonts with full commercial licensing (SIL Open Font License).

### Bebas Neue — Display & Data

Used for: stats, hero numbers, rank names, headlines, shareable card hero elements, section titles in marketing materials.

| Context | Size | Letter Spacing | Color |
|---------|------|---------------|-------|
| Hero stat (miles, steps, wins) | 56–80px | 2–4px | --ember or --white-hot |
| Section title / heading | 28–36px | 3–4px | --mist or --white-hot |
| Subheading / stat label | 18–24px | 2–3px | --silver or --ash |
| Card label / small display | 14–16px | 2–3px | --ash or --iron |

Bebas Neue is always uppercase (it's a caps-only font). Don't force lowercase — it doesn't have lowercase glyphs.

### Outfit — Body & UI

Used for: body text, UI labels, buttons, navigation, descriptions, system messages, input fields, form labels.

| Context | Size | Weight | Color |
|---------|------|--------|-------|
| Body large (feature descriptions) | 16px | 500 | --white-hot |
| Body default (paragraphs, descriptions) | 14px | 400 | --mist |
| Body small (captions, timestamps, metadata) | 12px | 400 | --silver |
| UI label (section labels, categories) | 11px | 700, uppercase, 1.5–2px tracking | --ash |
| Button text | 13px | 700, uppercase, 1.5px tracking | varies by button type |

### Typography Rules

1. **Numbers are the hero.** On any screen showing data, the stat number (in Bebas Neue) should be the largest element. Everything else supports it.
2. **Never use Bebas Neue for body text.** It's display-only. Paragraphs, descriptions, and UI copy are always Outfit.
3. **Never use Outfit for hero stats.** A mile count or rank position in Outfit looks weak. Stats are always Bebas Neue.
4. **Letter spacing matters.** Bebas Neue needs generous tracking (2–4px) to breathe. Outfit at small sizes needs tighter tracking (0–1px).
5. **Line height:** Bebas Neue display: 1.0–1.1. Outfit body: 1.5–1.7. Outfit labels: 1.2–1.4.

---

## 3. Design Principles

These principles govern every visual decision for Gauntlet.

### Bold, not busy.
Strong visual hierarchy with clear focal points. Every screen should have one thing that grabs you first. Negative space is used deliberately, not as filler. If you find yourself adding elements to fill space, you're doing it wrong.

### Dark-mode-first.
The default experience is Void (#06060A) background with high-contrast type and ember accents. Light mode can exist but is not the primary design surface. Design for dark first, adapt for light second.

### Typography-driven.
Heavy, condensed type (Bebas Neue) does the heavy lifting. The type IS the design on most screens. Don't decorate around the type — let it command the space.

### Color as signal, not decoration.
Color has meaning. Ember = brand/primary action. Molten = momentum/hot state. Gauntlet Gold = achievement. Success/Warning/Error = system states. Don't use color for decoration — every colored element should communicate something.

### Numbers as hero elements.
On any data screen, the number is the star. 47.3 miles, 3–1 record, #247 rank. Set these in Bebas Neue at the largest size on the screen. Everything else is supporting context.

### Gradient for rank, flat for UI.
Rank tiers always use gradient treatments (metallic, dimensional, material). Standard UI elements (buttons, inputs, containers) use flat color. This creates a clear visual distinction between "earned status" and "functional interface."

### Stadium energy.
The overall feel should evoke a scoreboard, a stadium display, a race clock. Not a wellness app, not a meditation app, not a corporate dashboard. The energy is competitive, electric, and alive.

---

## 4. Rank Tier Visual Treatments

Each rank tier has a defined visual treatment that escalates in perceived material quality and intensity.

### Bronze
- **Texture:** Matte, raw metal. Unfinished.
- **Colors:** Warm brown tones (#5C3D2E → #8B6A4E → #A88060)
- **Effect:** No glow. Subtle noise texture if applicable.
- **Feel:** Just starting. Honest, unpolished.

### Silver
- **Texture:** Polished steel. Clean sheen.
- **Colors:** Cool gray with blue undertone (#5A6A78 → #8C9BAA → #B8C8D4)
- **Effect:** Subtle specular highlight.
- **Feel:** Consistent, reliable, earned.

### Gold
- **Texture:** Rich gold with depth. Warm glow.
- **Colors:** Deep gold to pale gold (#8B6914 → #C8A84E → #E8D48A)
- **Effect:** Warm ambient glow. Slight metallic reflection.
- **Feel:** Clearly elevated. Serious competitor.

### Platinum
- **Texture:** Brushed platinum with ice-blue highlights.
- **Colors:** Cool blue-silver (#4A8AAA → #7BB8D4 → #AAD4EA)
- **Effect:** Cool-toned glow. Precise, clean edges.
- **Feel:** Premium. Precise. Unquestioned.

### Diamond
- **Texture:** Crystalline facets catching light.
- **Colors:** Brilliant blue-white (#6A9FCC → #B8D4F0 → #E8F0FF)
- **Effect:** Prismatic/refractive highlight. Bright glow.
- **Feel:** Sharp, brilliant, rare.

### Titanium
- **Texture:** Aerospace-grade darkness. Gunmetal sheen.
- **Colors:** Dark industrial gray (#2A2A34 → #5A5A6A → #7A7A8A)
- **Effect:** Matte with subtle edge reflection. No glow — absorbs light.
- **Feel:** Industrial, unbreakable, intimidating.

### Obsidian
- **Texture:** Volcanic glass, razor-edged, lit by molten fire underneath.
- **Colors:** Near-black to deep ember (#1A0A08 → #3A1510 → #962D22)
- **Effect:** Ember glow — box-shadow: 0 0 24px rgba(192,57,43,0.4). Pulsing optional.
- **Feel:** The gauntlet at its most extreme. The brand itself as a rank.

---

## 5. Component Patterns

### Buttons

| Type | Background | Text | Border | Use |
|------|-----------|------|--------|-----|
| Primary | --ember | --pure | none | Primary CTA (Start Challenge, Create Squad) |
| Primary hover | --ember-bright | --pure | none | |
| Ghost | rgba(192,57,43,0.12) | --ember-bright | 1.5px rgba(192,57,43,0.25) | Secondary actions (View Squad, Details) |
| Secondary | transparent | --mist | 1.5px --iron | Tertiary actions (Settings, Cancel) |
| Success | --success | --pure | none | Completion states (Mark Complete) |
| Disabled | --graphite | --iron | none | Inactive states |

Button text: Outfit, 13px, weight 700, uppercase, letter-spacing 1.5px. Border-radius: 8px. Padding: 12px 28px.

### Cards

- Background: --charcoal
- Border: 1px solid --slate
- Border-radius: 14px
- Padding: 24–28px
- Hover: translateY(-2px) with 0.2s ease transition

### Status Indicators

Colored dots (10px circle) paired with Outfit 500 weight text:
- Success (--success): Win, complete, connected
- Warning (--warning): Streak at risk, attention needed
- Error (--error): Loss, failure, broken streak
- Info (--info): Neutral system state, upcoming event

### Progress Bars

- Track: --slate, 4px height, 2px border-radius
- Fill: linear-gradient(90deg, --ember-deep, --ember, --molten)
- Never use flat single-color fills for progress bars — the gradient creates directional momentum.

### Input Fields

- Background: --graphite
- Border: 1px solid --slate (default), 1px solid --ember (focused)
- Text: --white-hot (Outfit 400, 14px)
- Placeholder: --ash
- Border-radius: 8px

---

## 6. Shareable Card Design

Shareable cards are a core product feature and the primary organic distribution mechanism. They should be as distinctive and recognizable as Spotify Wrapped.

### Design Rules

1. **One hero stat.** Every card has exactly one number/stat that dominates the layout. Everything else is supporting context.
2. **Ember gradient bar at top.** Every shareable card has a 3px gradient bar across the top: linear-gradient(90deg, --ember-deep, --ember, --molten, --gauntlet-gold). This is the Gauntlet signature element.
3. **Dark background.** Cards use Obsidian (#0C0C12) or a gradient from Obsidian to Graphite. Never light backgrounds for shareable cards.
4. **Hero stat in Ember.** The main number renders in --ember with Bebas Neue at 64–80px.
5. **Supporting context in Ash/Silver.** Secondary stats, date ranges, and labels use Outfit in --ash or --silver.
6. **GAUNTLET wordmark at bottom.** Bebas Neue, 16px, letter-spacing 6px, color --iron. Always present, always understated.
7. **Aspect ratio:** Optimized for Instagram Stories (9:16) or square (1:1) depending on context.

### Card Types

- **Rank Promotion:** Hero stat = new rank name. Rank gradient treatment on the name. Supporting: previous rank → new rank.
- **Weekly Recap:** Hero stat = win/loss record or total miles. Supporting: rank, streak, top metrics.
- **Streak Milestone:** Hero stat = streak count. Supporting: activity type, dates.
- **Squad Victory:** Hero stat = winning margin or final score. Supporting: squad name, opponent, member count.
- **Competition Result:** Hero stat = final score. Supporting: opponent name, activity type, timeframe.

---

## 7. Gradient and Effect Library

### Brand Gradients

| Name | CSS | Use |
|------|-----|-----|
| Ember Flow | linear-gradient(90deg, #962D22, #C0392B, #E8751A) | Progress bars, energy indicators |
| Gauntlet Heat | linear-gradient(90deg, #962D22, #C0392B, #E8751A, #C9982A) | Shareable card top bar, premium accents |
| Thermal Rise | linear-gradient(180deg, #06060A, #14141C, #1E1E28) | Background depth, card layering |
| Obsidian Glow | radial-gradient(ellipse at center, rgba(192,57,43,0.15), transparent 70%) | Subtle background glow behind hero elements |

### Shadow System

| Level | CSS | Use |
|-------|-----|-----|
| Subtle | 0 2px 8px rgba(0,0,0,0.3) | Cards, elevated surfaces |
| Medium | 0 4px 16px rgba(0,0,0,0.4) | Modals, dropdowns |
| Glow (Ember) | 0 0 24px rgba(192,57,43,0.4) | Obsidian rank, featured elements |
| Glow (Gold) | 0 0 20px rgba(200,168,78,0.3) | Achievement badges, milestone highlights |

### Border Radius Scale

| Size | Value | Use |
|------|-------|-----|
| Small | 6px | Tags, badges, small elements |
| Default | 8px | Buttons, inputs |
| Medium | 10px | Swatches, small cards |
| Large | 14px | Cards, modals, major containers |
| Round | 50% | Rank badges, profile avatars |
