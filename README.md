# Ignite - AI-Powered Sales Automation Landing Page

> A production-ready lead-capture landing page for an AI sales automation product, built with React 19, TypeScript, and a hand-crafted CSS design system. Deployed via GitHub Actions to GitHub Pages.

**Live site → [jabluetooth.github.io](https://jabluetooth.github.io)**

---

## Overview

Ignite is a B2B SaaS landing page that captures sales leads and pipes them into an n8n automation workflow. When a prospect submits the form, the webhook triggers lead enrichment, AI-written icebreaker generation, CRM sync, and Slack notifications - all without a backend or traditional server.

The page was designed from scratch in a custom prototype (`UIUIX/`), then fully ported to a typed React application with accessibility, animation, and error handling built in.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + TypeScript | Strict typing, concurrent features |
| Build | Vite 7 | Sub-2s production builds |
| Styling | Custom CSS design system | Full token control, zero runtime overhead |
| Fonts | Clash Display + General Sans (Fontshare CDN) | Brand-matched display + readable body |
| Animations | `IntersectionObserver` + `requestAnimationFrame` | No library dependencies, reduced-motion safe |
| Backend | n8n webhook (env var) | No server required, swappable endpoint |
| CI/CD | GitHub Actions → GitHub Pages | Automated build + deploy on push to `main` |

---

## Features

- **Animated pipeline visualization** - 4-stage auto-cycling demo of the enrichment flow (new lead → enrich → AI icebreaker → CRM sync)
- **Ember particle canvas** - performant `requestAnimationFrame` background that respects `prefers-reduced-motion`
- **Scroll-reveal animations** - `IntersectionObserver`-triggered, cubic-eased entry for every section
- **Animated counters** - count up on scroll-entry with eased `rAF` loop
- **Validated lead form** - name / email / company required, inline error states, country-code phone, success/error/misconfigured states
- **Sticky nav with blur** - scroll-aware backdrop-filter, collapses on mobile
- **Accordion FAQ** - accessible `aria-controls` / `aria-expanded` / `role="region"`
- **Error boundary** - top-level class component catches and renders a recovery UI
- **Full WCAG accessibility** - skip link, `aria-live` regions, `aria-invalid`, `aria-describedby` per field, `focus-visible` keyboard ring, semantic landmarks

---

## Project Structure

```
src/
├── App.tsx                  # Root composition + ErrorBoundary
├── index.css                # Design tokens, base styles, all component CSS
├── main.tsx                 # React 19 entry point
└── components/
    ├── Nav.tsx              # Sticky nav + skip link
    ├── Hero.tsx             # Hero section (feats, stats, CTA)
    ├── Pipeline.tsx         # Animated 4-stage pipeline visual
    ├── ProofBar.tsx         # Logo proof bar
    ├── HowItWorks.tsx       # 3-step section
    ├── Features.tsx         # 6-feature grid with hover gradient border
    ├── FAQ.tsx              # Accessible accordion
    ├── FormSection.tsx      # Lead form → n8n webhook
    ├── Footer.tsx           # Footer nav
    ├── EmberCanvas.tsx      # rAF particle background
    ├── Reveal.tsx           # Scroll-reveal wrapper component
    ├── Counter.tsx          # Animated counter
    ├── Ic.tsx               # Inline SVG icon system (28 icons)
    └── ErrorBoundary.tsx    # Class-based error boundary
```

---

## Design System

All styles live in a single `src/index.css` using CSS custom properties - no Tailwind, no runtime CSS-in-JS.

```css
--bg:           #0A0B0C   /* ink canvas */
--accent:       #FF5A1F   /* fire orange */
--fire-grad:    linear-gradient(120deg, #FF3B1E, #FF7A1A, #FFC42E)
--font-display: "Clash Display"
--font:         "General Sans"
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview built output
npm run preview
```

**Environment variable required for the form:**

```bash
# .env (gitignored)
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
```

---

## Deployment

Push to `main` → GitHub Actions automatically:

1. Runs `npm ci`
2. Runs `npm run build` (injects `VITE_N8N_WEBHOOK_URL` from repo secret)
3. Uploads `dist/` as a Pages artifact
4. Deploys to GitHub Pages

**Required repo setup:**
- Settings → Pages → Source → **GitHub Actions**
- Settings → Secrets → Actions → add `VITE_N8N_WEBHOOK_URL`

---

## Form Payload

On submit, a `POST` request is sent to the n8n webhook with:

```json
{
  "name":        "Jordan Chen",
  "email":       "jordan@northwind.io",
  "company":     "Northwind",
  "phone":       "+1 555 0123",
  "companySize": "201–500",
  "message":     "Too much manual research before every email…",
  "timestamp":   "2026-06-01T10:00:00.000Z",
  "source":      "landing_page",
  "userAgent":   "Mozilla/5.0 …",
  "referrer":    "direct"
}
```

---

## Key Decisions

**No Tailwind in production CSS** - the design needed precise custom tokens (fire gradient, surface elevation ladder, 4pt spacing grid). Utility classes would have added friction, not reduced it.

**IntersectionObserver over scroll listeners** - the original prototype used polling + scroll events for reliability in sandboxed iframes. The production app runs in a real browser context, so IO is cleaner and more performant.

**Inline SVG icons** - no icon font or external sprite. 28 icons are defined as path strings in `Ic.tsx`, keeping HTTP requests to a minimum and keeping `currentColor` theming trivial.

**Class-based ErrorBoundary** - React does not yet support error boundaries as function components. The class component is intentionally minimal: log, show a recovery UI, offer a reload.

---

## License

MIT
