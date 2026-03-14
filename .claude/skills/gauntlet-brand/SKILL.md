---
name: gauntlet-brand
description: Gauntlet brand design system, voice guidelines, and product context for a social fitness competition app. Use this skill whenever the user writes, designs, builds, or reviews anything for Gauntlet — UI components, marketing copy, App Store text, social media, pitch decks, shareable cards, onboarding, push notifications, website pages, investor materials, or any visual/written Gauntlet asset. Trigger on "Gauntlet app," "Gauntlet brand," "Gauntlet design," "Gauntlet copy," "Gauntlet voice," ranked system, squads, competitions, Gauntlet tournament, or any Gauntlet feature. Also trigger for React/HTML/frontend work or copywriting when it's for Gauntlet. When in doubt, trigger — better to have brand context loaded than to produce off-brand output.
---

# Gauntlet Brand Skill

Gauntlet is a social fitness app that turns every workout into a competition. Tagline: **Compete. Climb. Conquer.**

This skill contains everything needed to produce on-brand Gauntlet output — visual design, written copy, and product context. Before producing any Gauntlet asset, read the relevant reference file(s) listed below.

---

## Quick Reference: When to Read What

| Task | Read First |
|------|-----------|
| UI design, components, frontend code | `references/design-system.md` |
| Marketing copy, App Store text, social, push notifications | `references/voice-guide.md` |
| Pitch decks, investor materials, product explainers | `references/voice-guide.md` + `references/product-context.md` |
| Shareable cards, social share assets | `references/design-system.md` + `references/voice-guide.md` |
| Anything involving rank tiers or the competitive system | `references/design-system.md` (rank colors) + `references/product-context.md` (rank mechanics) |
| Brand guidelines document or style guide export | All three reference files |

Always read the relevant reference(s) BEFORE writing any code or copy. The brand context matters more than speed.

---

## Brand Identity Summary

**What Gauntlet is:** A social fitness competition platform with deep gamification, tiered ranked competition (Bronze through Obsidian), squad mechanics, and shareable social content. Think Duolingo's gamification + Strava's social layer + League of Legends' ranked system, built for anyone who moves.

**Who it's for:** The primary launch audience is the social fitness casual — college students, friend groups, and coworkers who download because their squad invited them and stay because the competition is addictive. Competitive athletes and wellness-focused users follow once network density exists.

**What it's not:**
- Not a fitness tracker (it's a competition platform that pulls data from trackers)
- Not a wellness app (it doesn't lecture about mindfulness or self-care)
- Not a coaching app (it doesn't prescribe workouts)
- Not a health app (it competes on activity output, not body metrics)

**Core brand language:**
- Tagline: "Compete. Climb. Conquer."
- Core insight: "The best accountability partner isn't a coach or an app notification — it's a friend you're trying to beat."
- Identity: Where fitness meets gaming culture. Stadium scoreboard crossed with streetwear lookbook.

---

## Design System Summary

Full details in `references/design-system.md`. Key facts:

**Dark-mode-first.** The default experience is dark backgrounds (Void #06060A through Iron #3A3A4A) with high-contrast type and ember red accents. Light mode exists but is not the primary design surface.

**Primary color: Ember #C0392B.** Deep red with bright (#E74C3C) and deep (#962D22) variants. This is the color people associate with Gauntlet.

**Accent palette tells a thermal story:** Molten (#E8751A) → Gauntlet Gold (#C9982A) → White Fire (#F0D9A0) → Cooled Steel (#7A8A9A). Rising heat to cooled metal.

**Typography:** Bebas Neue for display/stats/headlines. Outfit for body/UI. Both free via Google Fonts.

**Rank tiers have distinct color treatments** that escalate in material quality: Bronze (raw metal) → Silver (polished steel) → Gold (rich warmth) → Platinum (ice-blue precision) → Diamond (crystalline brilliance) → Titanium (gunmetal darkness) → Obsidian (volcanic fire + ember glow).

---

## Voice Summary

Full details in `references/voice-guide.md`. Key principles:

**Confident, not arrogant.** No hedging, no apologizing, no explaining itself. But never punches down — the energy is "you belong here and you're about to surprise yourself."

**Crisp, not clever.** Short sentences. Active voice. If a sentence can lose a word and still land, lose the word.

**Competitive, not hostile.** Competition as play, not war. The vibe is the group chat after a pickup game, not an internet argument.

**Inclusive through action.** Gauntlet doesn't lecture about inclusivity — it demonstrates it through the ranked system ensuring fair competition at every level.

**Words we use:** Climb, forge, earn, squad, crew, compete, battle, grind, track, prove, show up, rank up, level up, promote.

**Words we avoid:** Journey, tribe, challenge yourself, wellness, mindfulness, optimize, hack, biohack.

---

## Output Standards

### For UI/Frontend Assets
- Always dark-mode-first unless explicitly asked for light mode
- Use CSS custom properties matching the design system variable names (--ember, --void, --charcoal, etc.)
- Bebas Neue for any number, stat, rank name, or headline; Outfit for everything else
- Numbers are the hero — miles, steps, rank positions, win counts should be the largest elements
- Load fonts from Google Fonts: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap`
- Rank badges and tier indicators always use gradient treatments, never flat color
- Shareable cards: minimal, high-contrast, one key stat as hero, instantly recognizable as Gauntlet even without the logo

### For Written Copy
- Default to short, punchy sentences. Period-separated rhythm, not comma-chain flow.
- Push notifications and in-app copy: max 2 sentences. Every word earns its place.
- Marketing copy and App Store descriptions: same voice, slightly longer form allowed. Still no fluff.
- Never use passive voice in user-facing copy
- Never use exclamation marks in primary copy (they undercut confidence)
- Contractions are fine and preferred (don't, you're, it's)

### For Pitch/Investor Materials
- Same brand voice but can shift to a more analytical register
- Data and competitive positioning are welcome here
- Still no corporate buzzwords or jargon
- Visual slides should use the Gauntlet design system colors and typography
