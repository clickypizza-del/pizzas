---
Task ID: 1
Agent: main (orchestrator)
Task: Analyze and improve the uploaded `index.html` (Click & Pizza landing page) by rebuilding it as a production Next.js 16 page.

Work Log:
- Read the full 666-line `upload/index.html` (Spanish dark-themed D2C pizza subscription landing page).
- Documented analysis: strengths (clean dark theme, red accent, 10 sections, ES-AR localization, IntersectionObserver fade-ins) and weaknesses (Tailwind CDN, no a11y for mobile menu, no plan CTAs, no FAQ, no scrollspy, no JSON-LD, footer date 2026, redundant QR, no OG tags).
- Configured `next.config.ts` with `images.remotePatterns` for `i.postimg.cc` and `images.unsplash.com`.
- Rewrote `src/app/layout.tsx`: `lang="es"`, Inter + Bebas Neue via `next/font`, full Metadata (title template, OG, Twitter, canonical), JSON-LD `Restaurant` schema with `makesOffer`.
- Rewrote `src/app/globals.css` with the Click & Pizza brand palette (dark surfaces `#0f0f0f/#1a1a1a`, primary `#c81009`, WhatsApp `#25d366`), utilities (`.text-gradient-brand`, `.cp-glass`, `.cp-dotgrid`, `.font-brand`), `scroll-padding-top` for anchor offset, custom scrollbar, `prefers-reduced-motion` support.
- Created `src/lib/site-data.ts` (centralized content: nav, features, pizzas, plans, steps, stats, testimonials, FAQs, zones) and `src/lib/whatsapp.ts` (deep-link builder + per-plan/pizza prefilled messages).
- Built 13 section components in `src/components/site/`: SiteHeader (scrollspy + Sheet mobile menu + skip link), Hero, Philosophy, Features, Menu, Plans (with per-card CTAs + "popular" highlight), HowItWorks, Coverage (new zones section), Order (QR), Stats (count-up animation), Testimonials (Embla carousel), Faq (Accordion), SiteFooter, plus Reveal (Framer Motion whileInView) and floating-actions (WhatsApp FAB + BackToTop).
- Assembled `src/app/page.tsx` with `min-h-screen flex flex-col` sticky-footer layout.
- Ran `bun run lint` — fixed one `react-hooks/set-state-in-effect` error in CountUp by deriving initial state from props instead of calling setState synchronously in the effect body. Lint now clean.
- Verified with Agent Browser: page loads HTTP 200, no console/runtime errors, all 13 sections render (total ~9369px), hero/Plans visual confirmed via VLM, nav smooth-scroll offset correct (80px), mobile Sheet opens/closes on link click, FAQ accordion toggles `aria-expanded`, WhatsApp links carry URL-encoded prefilled messages, back-to-top scrolls to 0 and auto-hides, sticky footer at bottom.

Stage Summary:
- Stack: Next.js 16 + Tailwind CSS 4 + shadcn/ui + Framer Motion + Embla + Lucide.
- 13 sections, fully componentized, brand-locked to dark theme.
- Key improvements over original: removed Tailwind CDN, added scrollspy, accessible mobile Sheet menu, per-plan & per-pizza WhatsApp CTAs with prefilled messages, new FAQ + Coverage sections, JSON-LD + OG metadata, count-up stats, testimonials carousel, floating WhatsApp FAB + back-to-top, sticky footer, reduced-motion support, dynamic copyright year.
- Lint clean, dev server clean, browser-verified interactivity.
