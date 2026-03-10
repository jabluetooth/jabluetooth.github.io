# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lead capture landing page for an AI-powered sales automation service. Built with React, TypeScript, Vite, and shadcn/ui.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

- **Framework**: Vite + React + TypeScript
- **UI Components**: shadcn/ui (Tailwind CSS v4)
- **Backend integration**: Form submits to n8n webhook

### Key Files

- `src/App.tsx` - Main app with navigation and layout
- `src/components/LeadForm.tsx` - Form with validation and webhook submission
- `src/components/HeroSection.tsx` - Marketing content (features, stats)
- `src/components/ui/` - shadcn/ui components

## Configuration

Webhook URL is in `src/components/LeadForm.tsx`:
```typescript
const N8N_WEBHOOK_URL = "https://n8n.filheinzrelatorre.com/webhook-test/ad07da4a-667d-4226-8301-25b49b327980";
```

## Form Data Payload

```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "phone": "string (optional)",
  "companySize": "string (optional)",
  "message": "string (optional)",
  "timestamp": "ISO 8601 string",
  "source": "landing_page",
  "userAgent": "string",
  "referrer": "string"
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```
