# Claude Code Instructions

## Project Overview

Personal portfolio and brand website for Ezeikel Pemberton - indie developer, content creator, and software engineer.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with OKLCH colors
- **3D**: React Three Fiber + drei
- **Animation**: Framer Motion
- **Forms**: TanStack Form + Zod validation
- **CMS**: Sanity (headless)
- **Email**: Resend + React Email
- **Payments**: Stripe
- **AI**: Vercel AI SDK (OpenAI + Google Gemini)
- **Analytics**: Plausible + Vercel Analytics

## Commit Guidelines

- Follow semantic commit convention (feat:, fix:, chore:, docs:, style:, refactor:, test:, perf:)
- Keep commit messages as one-liners when possible
- Never include Claude attribution, "Generated with Claude Code", or "Co-Authored-By: Claude" lines
- Write commit messages as if authored by the developer, not AI

## Form Handling

Always use TanStack Form with Zod for form validation:

```typescript
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  // ...
});

const form = useForm({
  defaultValues: { email: '' },
  validatorAdapter: zodValidator(),
  validators: {
    onChange: schema,
  },
  onSubmit: async ({ value }) => {
    // handle submission
  },
});
```

## Email Rate Limiting

Resend has a rate limit of 2 requests/second. Always add 600ms delays between sending multiple emails:

```typescript
await sendAdminNotification();
await new Promise((resolve) => setTimeout(resolve, 600));
await sendUserConfirmation();
```

## Sanity Integration

- Read client: `lib/sanity/client.ts` (uses CDN in production)
- Write client: Uses `SANITY_API_TOKEN` for mutations
- Studio: Mounted at `/studio`
- Webhook: `/api/sanity/revalidate` for ISR

## Blog Generation

Auto-generated weekly via cron job at `/api/blog/generate`:

1. Generates metadata with GPT-4o-mini
2. Generates content with GPT-4o
3. Fetches candidate images from Pexels
4. Evaluates images with Gemini Pro Vision (60% threshold)
5. Falls back to Gemini image generation if needed
6. Saves to Sanity with `generationMeta` for tracking

## Three.js / React Three Fiber

Always use dynamic imports with `ssr: false` for 3D components:

```typescript
const InteractiveGlobe = dynamic(
  () => import('@/components/InteractiveGlobe'),
  { ssr: false }
);
```

## Environment Variables

Required for full functionality:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN` - CMS
- `OPENAI_API_KEY`, `GOOGLE_API_KEY` - AI
- `RESEND_API_KEY` - Email
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` - Payments
- `PEXELS_API_KEY` - Blog images

## GitHub CLI

Use `gh` CLI when referencing GitHub repos that I own or public repos (e.g., `gh repo view`, `gh issue list`, `gh pr list`).

## Key Directories

- `app/` - Next.js App Router pages and API routes
- `components/` - React components (including 3D)
- `lib/` - Utilities, clients, and data
- `sanity/` - Sanity schema definitions
- `emails/` - React Email templates
