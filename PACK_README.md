# PayTrack MSME — HackFront Module 1 Build Documentation

This pack contains the 15 implementation documents requested for the PayTrack MSME prototype.

## Current direction
- Theme: FinTech
- Product: PayTrack (working name)
- Core workflow: Invoice → Due Date → Follow-up → Buyer Commitment → Evidence → Payment → Outstanding
- Auth: Firebase Authentication + Firebase Admin verification
- Database: Supabase PostgreSQL
- Files: private Supabase Storage
- Frontend: Next.js + React + TypeScript + Tailwind + shadcn/ui
- Testing: Vitest + Playwright
- Hosting: free-tier-compatible Next.js hosting

## Evidence discipline
The HackFront source explicitly requires evidence to be distinguished from inference, hypothesis and assumption, and the final scoring weights evidence-vs-assumption tagging at 25%. This pack therefore deliberately does not present the pre-dispute workflow gap as proven market fact.

## Build order
Read `AGENTS.md` first, then `MASTER_BUILD_BRIEF.md`, then the numbered documents in order. Do not skip `04_USER_WORKFLOWS.md`, `06_MVP_SCOPE.md`, `07_UX_UI_SPEC.md`, or `10_SECURITY_AND_TRUST.md`.

## Important
No API keys, credentials, `.env` files, production customer data, or private evidence should be committed to the repository.
