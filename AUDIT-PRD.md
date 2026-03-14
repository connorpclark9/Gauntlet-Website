# Gauntlet Website — Full-Scale UI/UX Audit & Staged PRD

**Audit Date:** 2026-03-14
**Auditor Perspective:** Veteran UI/UX Professional
**Standard:** CTO / Senior Marketing / David Ogilvy approval-grade

---

## Executive Summary

The Gauntlet marketing website has strong bones — the design system, color palette, typography choices, brand voice, and overall dark-mode aesthetic are excellent. The structure, section flow, and copy are compelling.

However, there are **critical CSS omissions** that make the phone mockup screens look broken in production. Multiple component classes referenced in HTML have **zero CSS definitions**, causing tab bars to render at 215px icons, status bars to lose their layout, and gallery labels to be invisible. These are showstoppers that would immediately fail any executive review.

Beyond the critical bugs, there are spacing inconsistencies, missing meta tags for social sharing, unoptimized assets, accessibility gaps, and several polish items that separate a "good" site from a "no-one-can-find-a-flaw" site.

**Issue Count:** 28 issues across 4 severity tiers

---

## Severity Definitions

| Tier | Label | Meaning |
|------|-------|---------|
| P0 | **CRITICAL** | Visually broken. Would be flagged in the first 5 seconds of a review. Blocks launch. |
| P1 | **HIGH** | Noticeable quality gap. A senior designer or CTO would flag this. Must fix before any external sharing. |
| P2 | **MEDIUM** | Polish and consistency. A detail-oriented reviewer would catch these. Fix before launch. |
| P3 | **LOW** | Nitpicks and best practices. Fix when convenient. Won't block approval but elevates quality. |

---

## P0 — CRITICAL (7 issues)

### C-01: Missing `.tab-bar` / `.tab-item` / `.tab-icon` / `.tab-label` CSS

**What's wrong:** The HTML uses `.tab-bar`, `.tab-item`, `.tab-icon`, and `.tab-label` classes across all 7 phone mockups, but **none of these classes have CSS definitions anywhere** in the stylesheet. Result:
- Tab bar icons render at their natural SVG size (~215px) instead of ~20px
- Tab items stack vertically as block elements instead of horizontal flex
- Tab bar has no background, no positioning, no border-top
- The entire tab bar overflows past the phone screen and gets clipped by `overflow: hidden`
- **Every phone mockup is missing its bottom navigation bar**

**Impact:** Every phone screen looks incomplete. The app appears to have no navigation. This is the single biggest visual defect on the entire site.

**File:** `src/styles/components.css`
**Fix:** Add the following CSS block:

```css
/* Tab Bar */
.tab-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(6, 6, 10, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--slate);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 8px;
  z-index: 10;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  cursor: pointer;
}

.tab-icon {
  width: 22px;
  height: 22px;
  color: var(--ash);
}

.tab-item.active .tab-icon {
  color: var(--ember);
}

.tab-label {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  color: var(--ash);
  letter-spacing: 0.3px;
}

.tab-item.active .tab-label {
  color: var(--ember);
}
```

---

### C-02: Missing `.status-bar` CSS

**What's wrong:** The phone status bar (time + signal/battery) has no CSS. It renders as a static block with no flex layout, no padding, no horizontal spacing. The "9:41" text and battery icons stack vertically instead of sitting in a horizontal bar.

**Impact:** Every phone mockup's top area looks unprofessional — the time and battery indicator are not positioned correctly.

**File:** `src/styles/components.css`
**Fix:**

```css
/* Phone Status Bar */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--white-hot);
  position: relative;
  z-index: 5;
}

.status-bar svg {
  display: inline-block;
}
```

---

### C-03: Missing `.phone-label` CSS

**What's wrong:** The gallery phone labels ("Insights & Data", "Shareable Cards", "Profile & Trophies") have no styling. They render as plain text flush-left with no margin, no centering, and no visual treatment.

**Impact:** The App Gallery section looks unfinished — phones have no captions.

**File:** `src/styles/components.css`
**Fix:**

```css
/* Phone Label (gallery captions) */
.phone-label {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--silver);
  text-align: center;
  margin-top: 16px;
  letter-spacing: 0.5px;
}
```

---

### C-04: Missing `.gallery__item` CSS

**What's wrong:** Gallery items are `display: block` with no flex configuration. They don't prevent shrinking within the flex track, don't center their contents, and the phone frames may collapse.

**Impact:** Gallery phones may not lay out correctly, especially at different viewport sizes.

**File:** `src/styles/sections.css`
**Fix:**

```css
.gallery__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
```

---

### C-05: Missing `.phone-screen-glow-bottom` CSS

**What's wrong:** The `<div class="phone-screen-glow-bottom">` element exists in the hero phone HTML but has zero CSS. It renders as a 0px-height invisible element.

**Impact:** The hero phone is missing its bottom atmospheric glow effect that should mirror the top glow.

**File:** `src/styles/components.css`
**Fix:**

```css
/* Phone bottom glow */
.phone-screen-glow-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(0deg, rgba(192, 57, 43, 0.06), transparent);
  pointer-events: none;
  z-index: 2;
}
```

---

### C-06: Phone screen content overflows frame (tab bars invisible)

**What's wrong:** Content inside phone screens vastly exceeds the frame height. For example, the hero phone has 2055px of content in a 689px frame. While `overflow: hidden` clips this, it means:
- The competition card at the bottom of the hero phone is partially cut off
- Tab bars (once styled) will be clipped because they're in the document flow, not absolutely positioned
- The bottom 60-70% of phone content is never visible

**Impact:** Phone mockups show incomplete app screens. Users can't see the full app experience.

**Fix:** Two-part fix:
1. The tab bar fix in C-01 uses `position: absolute; bottom: 0` which will anchor it visibly within the phone frame regardless of content height.
2. Reduce padding-bottom on phone screen content from `100px` to `80px` (matching tab bar height + some breathing room) so the last card isn't pushed too far down.
3. Consider reducing content quantity in the most crowded screens (Hero, Step 2 Compete, Profile) so the visible portion shows a complete, polished view rather than a cut-off one.

**File:** `index.html` — adjust inline `padding` values on phone screen content divs. Change `padding:16px 20px 100px` to `padding:16px 20px 76px` across all phone screens with tab bars.

---

### C-07: Hero phone elements overflow right edge

**What's wrong:** At desktop, 4 elements inside the hero phone screen overflow the right edge of the phone frame by ~6px. This is caused by the profile avatar circle (36px) and its container being positioned with `justify-content: space-between` in a container that's slightly too wide for the phone screen.

**Impact:** Subtle clipping on the hero — the most important visual on the page.

**File:** `index.html` — hero phone screen content
**Fix:** Change the hero phone content padding from `padding:16px 20px 100px` to `padding:16px 16px 76px` to add slightly more horizontal breathing room. Alternatively, reduce the avatar size from 36px to 32px.

---

## P1 — HIGH (8 issues)

### H-01: Footer CSS media query ordering bug

**What's wrong:** In `components.css`, the footer responsive rules are ordered:
```css
@media (max-width: 768px) { .footer__grid { grid-template-columns: 1fr; } }
@media (max-width: 1024px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
```
The 1024px rule comes AFTER the 768px rule and has the same specificity, so it **overrides** the mobile rule. At 375px mobile, the footer shows 2 columns (cramped) instead of 1 column (correct).

**Impact:** Footer is cramped and hard to read on mobile devices.

**File:** `src/styles/components.css` (lines 881-898)
**Fix:** Swap the order — put the wider breakpoint first:

```css
@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
  }
}
```

---

### H-02: Missing `og:image` and `og:url` meta tags

**What's wrong:** The `<head>` has `og:title`, `og:description`, and `og:type` but is missing `og:image` and `og:url`. When the site URL is shared on social media (Twitter/X, LinkedIn, iMessage, Slack), **no preview image will appear**.

**Impact:** Massive missed opportunity for organic distribution. A billion-dollar CTO would flag this immediately — it's Marketing 101.

**File:** `index.html` `<head>`
**Fix:** Add:
```html
<meta property="og:image" content="/images/gauntlet-og-image.png">
<meta property="og:url" content="https://gauntlet.app">
<meta name="twitter:image" content="/images/gauntlet-og-image.png">
```
Also create a 1200x630px OG image asset that shows the brand, tagline, and a phone mockup.

---

### H-03: `rank-tier__desc` unstyled

**What's wrong:** The rank tier descriptions ("The starting line", "Consistent. Showing up.", "Forged.") render at 16px in Mist color — the same size and weight as body text. They should be small, muted secondary labels.

**Impact:** The rank section looks unpolished. Descriptions compete visually with the rank names instead of supporting them.

**File:** `src/styles/sections.css`
**Fix:** Add after `.rank-tier__percentile`:

```css
.rank-tier__desc {
  font-size: 12px;
  color: var(--ash);
  font-weight: 400;
  line-height: 1.4;
  max-width: 120px;
}
```

---

### H-04: Rank tier widths visually uneven

**What's wrong:** Rank tiers use `min-width: 100px` but the tier name lengths vary ("GOLD" vs "PLATINUM" vs "DIAMOND"), causing widths to range from 100px to 185px. This creates uneven spacing in the row.

**Impact:** The ranked system section — a key selling point — looks spatially unbalanced.

**File:** `src/styles/sections.css`
**Fix:** Set a consistent width:

```css
.rank-tier {
  /* existing properties... */
  min-width: 120px;
  max-width: 140px;
}
```

---

### H-05: Copyright symbol missing

**What's wrong:** Footer reads "2026 Gauntlet. All rights reserved." — missing the © symbol.

**Impact:** Looks like an oversight. Small but tells a detail-oriented reviewer that QA was incomplete.

**File:** `index.html` (line 916)
**Fix:** Change to `© 2026 Gauntlet. All rights reserved.`

---

### H-06: Footer social links missing

**What's wrong:** The CSS defines `.footer__social` and `.footer__social a` styles, but the HTML footer has no social links section (no Twitter/X, Instagram, TikTok icons).

**Impact:** A marketing website with no social links is a missed opportunity. Every competitor has them.

**File:** `index.html` — add after the footer tagline paragraph:

```html
<div class="footer__social">
  <a href="#" aria-label="Twitter/X">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  <a href="#" aria-label="Instagram">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </a>
  <a href="#" aria-label="TikTok">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  </a>
</div>
```

---

### H-07: Pricing card heights unequal at tablet widths

**What's wrong:** At tablet viewport widths (~768px), the Free card is 614px tall and the Pro card is 685px — a 71px difference. The grid doesn't equalize heights when the cards have different amounts of content (6 vs 7 feature items).

**Impact:** Misaligned card heights look unprofessional in a pricing comparison.

**File:** `src/styles/sections.css`
**Fix:** The grid already equalizes at desktop (both 730px). For tablet, ensure the grid stays 2-column or add:

```css
.pricing__grid {
  /* existing properties... */
  align-items: start;
}
```

Or for equal visual height, give both cards a matching min-height:

```css
.pricing-card {
  /* existing properties... */
  display: flex;
  flex-direction: column;
}

.pricing-card .btn {
  margin-top: auto;
}
```

This pushes the CTA button to the bottom of both cards regardless of content height.

---

### H-08: Feature cards missing heat bar

**What's wrong:** Feature cards use `.card` but not `.card--heat`, so they lack the signature 3px gradient top bar that testimonial cards have. This inconsistency breaks the visual rhythm. The heat bar is a core Gauntlet brand element (per the design system: "Every shareable card has a gradient bar").

**Impact:** Feature cards look plain compared to testimonial cards. The brand identity is diluted.

**File:** `index.html` — feature cards
**Fix:** Add `card--heat` class to each feature card:
```html
<div class="card card--heat" data-reveal="up" data-delay="1">
```

---

## P2 — MEDIUM (8 issues)

### M-01: Store buttons in Download CTA use inline styles instead of component classes

**What's wrong:** The download CTA store buttons have `<div style="font-size:10px;...">Download on the</div>` inline instead of using the defined `.btn--store__label`, `.btn--store__small`, `.btn--store__name` classes. The inline font-size is 10px while the component class defines 11px.

**Fix:** Replace inline-styled divs with the proper BEM classes:
```html
<div class="btn--store__label">
  <span class="btn--store__small">Download on the</span>
  <span class="btn--store__name">App Store</span>
</div>
```

---

### M-02: Favicon/app icon is 955KB

**What's wrong:** `gauntlet-app-icon.png` is 955KB. A favicon should be under 20KB. This slows initial page load and wastes bandwidth on every page visit.

**Fix:** Create optimized versions:
- `favicon-32.png` (32x32, ~2KB)
- `favicon-192.png` (192x192, ~10KB)
- `apple-touch-icon.png` (180x180, ~8KB)

Update `<head>`:
```html
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
```

---

### M-03: Logo image is 597KB

**What's wrong:** `gauntlet-logo.png` is rendered at 36px height but the source file is 597KB. This is ~30x larger than necessary.

**Fix:** Export an optimized version at 2x resolution (72px height) as WebP (~5-10KB) with PNG fallback (~15KB). Use `srcset` for retina support.

---

### M-04: Gallery missing scroll indicator dots

**What's wrong:** CSS defines `.gallery__dots` and `.gallery__dot` styles, but the HTML doesn't include them. On mobile, the gallery is horizontally scrollable but there's no visual cue that more phones exist off-screen.

**Fix:** Add after `.gallery__track`:
```html
<div class="gallery__dots">
  <button class="gallery__dot active" aria-label="Slide 1"></button>
  <button class="gallery__dot" aria-label="Slide 2"></button>
  <button class="gallery__dot" aria-label="Slide 3"></button>
</div>
```

---

### M-05: Footer "Works with" section is plain text

**What's wrong:** The integrations section in the footer bottom is just `<span>` text elements. Unlike the Step 1 section where integrations are styled `.integration-badge` pills, these are unstyled plain text.

**Fix:** Either use integration badges or add minimal styling:
```css
.footer__integrations span {
  font-size: 12px;
  color: var(--ash);
}

.footer__integrations span:first-child {
  margin-right: 4px;
}
```
Or convert to badges for consistency with Step 1.

---

### M-06: No `loading="lazy"` on below-fold content

**What's wrong:** Only the nav logo has `loading="eager"`. No other images/canvases use lazy loading. The particle canvases start computing immediately even when off-screen.

**Fix:** The particle system already uses IntersectionObserver (good). For any added images, use `loading="lazy"`.

---

### M-07: Testimonial cards missing star ratings

**What's wrong:** CSS defines `.testimonial-card__stars` with `color: var(--gauntlet-gold)`, but the HTML testimonial cards don't include any star elements. The design expects 5-star ratings above each quote.

**Fix:** Add to each testimonial card before the quote:
```html
<div class="testimonial-card__stars">★★★★★</div>
```

---

### M-08: Step 2 content order incorrect on mobile

**What's wrong:** In the CSS, both `.step__content` and `.step--reverse .step__content` get `order: 2` at mobile, meaning the phone visual always appears above the text. However, for Step 2 (`.step--reverse`), the content already has `order: 2` in the base CSS, and the visual has `order: 1`. On mobile, the CSS sets `.step__content { order: 2 }` and `.step__visual { order: 1 }` — which means ALL steps show phone-first on mobile. This is correct behavior (visual first, explanation second) but should be verified intentionally.

**Impact:** Minor — the current behavior (phone first on mobile) is actually reasonable UX.

**Fix:** No code change needed, but document this as intentional in a CSS comment.

---

## P3 — LOW (5 issues)

### L-01: No `<main>` element wrapping page content

**What's wrong:** Page content goes directly inside `<body>` with no `<main>` landmark. Screen readers and accessibility tools expect a `<main>` element.

**Fix:** Wrap all sections (hero through download CTA) in `<main>`:
```html
<body>
  <nav>...</nav>
  <main>
    <section class="hero">...</section>
    <!-- ... all other sections ... -->
  </main>
  <footer>...</footer>
</body>
```

---

### L-02: No skip-to-content link

**What's wrong:** Keyboard users have to tab through all nav links before reaching page content. A skip link is an accessibility best practice (WCAG 2.1 Level A).

**Fix:** Add as the first element inside `<body>`:
```html
<a href="#hero" class="skip-link">Skip to content</a>
```
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--ember);
  color: var(--pure);
  padding: 8px 16px;
  border-radius: var(--radius-default);
  z-index: 9999;
  font-size: 14px;
  font-weight: 600;
}

.skip-link:focus {
  top: 8px;
}
```

---

### L-03: Obsidian rank reveal delay is very long

**What's wrong:** The Obsidian rank badge has `data-delay="7"` (700ms). Combined with the 800ms animation duration, it takes 1.5 seconds to appear after scrolling to the ranks section. Users may scroll past before seeing the climactic final tier.

**Fix:** Reduce to `data-delay="5"` (500ms) or compress the entire stagger range for rank tiers.

---

### L-04: Hero phone date is hardcoded to "March 14, 2026"

**What's wrong:** The hero phone mockup shows "March 14, 2026" as the date. This will look stale/dated to anyone viewing the site on a different day.

**Fix:** Either make the date dynamic with JS, or use a generic representation like "Today" with no specific date, or use a clearly mock date that doesn't pretend to be current.

---

### L-05: Inline styles on phone mockup content

**What's wrong:** All phone screen content uses extensive inline styles (`style="font-family:'Bebas Neue',sans-serif;font-size:32px;..."`) instead of CSS classes. There are approximately 200+ inline style declarations across the phone mockups. This makes maintenance extremely difficult and prevents any global design changes from propagating to phone content.

**Impact:** Not user-facing, but a significant maintenance burden.

**Fix:** This is a large refactor. Extract common patterns into CSS classes:
- `.phone-card` — card containers inside phones
- `.phone-stat` — stat numbers inside phones
- `.phone-stat-label` — stat labels
- `.phone-section-title` — section titles
- `.phone-avatar` — avatar circles
- `.phone-badge` — status badges (Winning, Losing, Completed)
- `.phone-grid-2`, `.phone-grid-3`, `.phone-grid-4` — grid layouts

**Priority:** Do this in a follow-up sprint, not as part of the critical fixes.

---

## Implementation Plan — Staged Execution

### Stage 1: Critical Fixes (P0) — Do First
**Estimated scope:** ~1 hour
**Goal:** Make every phone mockup look correct

| Task | Files Modified |
|------|---------------|
| Add `.tab-bar`, `.tab-item`, `.tab-icon`, `.tab-label` CSS | `components.css` |
| Add `.status-bar` CSS | `components.css` |
| Add `.phone-label` CSS | `components.css` |
| Add `.gallery__item` CSS | `sections.css` |
| Add `.phone-screen-glow-bottom` CSS | `components.css` |
| Fix phone content bottom padding (100px → 76px) | `index.html` |
| Fix hero phone horizontal overflow (padding 20px → 16px) | `index.html` |

**Verification:** After Stage 1, every phone mockup should show:
- Visible, properly-styled bottom tab bar with 4 icons
- Correct status bar with time + battery
- No content overflow outside phone frame
- Gallery phones should have centered caption labels below

---

### Stage 2: High-Priority Fixes (P1) — Do Second
**Estimated scope:** ~45 minutes
**Goal:** Fix layout bugs and complete missing content

| Task | Files Modified |
|------|---------------|
| Fix footer media query ordering | `components.css` |
| Add `og:image`, `og:url`, `twitter:image` meta tags | `index.html` |
| Style `.rank-tier__desc` | `sections.css` |
| Equalize rank tier widths | `sections.css` |
| Add copyright © symbol | `index.html` |
| Add footer social links | `index.html` |
| Make pricing cards equal-height with flex | `components.css`, `sections.css` |
| Add `.card--heat` to feature cards | `index.html` |

**Verification:** After Stage 2:
- Footer should be single-column on mobile
- Sharing the URL on social media should show a preview image
- Rank tiers should be evenly spaced
- Feature cards should have gradient top bars
- Pricing cards should have CTA buttons at the same vertical position

---

### Stage 3: Polish (P2) — Do Third
**Estimated scope:** ~30 minutes
**Goal:** Consistency and optimization

| Task | Files Modified |
|------|---------------|
| Replace store button inline styles with BEM classes | `index.html` |
| Optimize favicon (955KB → ~10KB) | `public/images/` |
| Optimize logo (597KB → ~15KB) | `public/images/` |
| Add gallery scroll dots | `index.html` |
| Style footer integrations | `components.css` or `index.html` |
| Add star ratings to testimonials | `index.html` |

---

### Stage 4: Accessibility & Best Practices (P3) — Do Last
**Estimated scope:** ~15 minutes

| Task | Files Modified |
|------|---------------|
| Add `<main>` landmark element | `index.html` |
| Add skip-to-content link | `index.html`, `base.css` |
| Reduce Obsidian rank reveal delay | `index.html` |
| Update/remove hardcoded date | `index.html` |

---

### Stage 5: Future Sprint — Inline Style Refactor (L-05)
**Estimated scope:** ~2-3 hours
**Goal:** Extract all inline styles from phone mockups into CSS classes

This is a maintenance improvement, not a visual fix. Schedule separately.

---

## Appendix: What's Already Good

To be clear, this audit is intentionally harsh. The following elements are well-executed:

- **Design system tokens** — comprehensive, well-organized, correctly implemented
- **Color palette** — distinct, on-brand, properly applied across all contexts
- **Typography hierarchy** — Bebas Neue / Outfit pairing is excellent and consistently used
- **Scroll reveal system** — smooth, performant, well-timed
- **Particle effects** — tasteful, not overdone, properly uses IntersectionObserver
- **Copy and voice** — sharp, confident, on-brand throughout
- **Section flow** — logical narrative progression (Hero → Stats → How → Features → Ranks → Gallery → Testimonials → Pricing → CTA)
- **Responsive grid system** — well-structured breakpoints with proper mobile adaptations
- **Reduced motion support** — properly handles `prefers-reduced-motion`
- **CSS custom properties** — thorough design token system with consistent naming
- **Performance** — font preconnect, canvas for particles, lean JS modules
- **Brand consistency** — heat bars, ember accents, dark-mode-first all consistently applied
