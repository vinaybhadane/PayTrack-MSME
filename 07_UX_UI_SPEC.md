# MASTER_UI_UX_SPEC.md
## Unified UI/UX Design System and Implementation Brief
### Premium B2B FinTech SaaS — Marketing Website + Receivables Application

**Version:** 3.0 — consolidated master specification  
**Scope:** Public marketing website, authenticated dashboard, invoice workflows, responsive behavior, visual system, motion, accessibility, and dependencies.  
**Design principle:** Expressive outside. Precise inside.  
**Icon rule:** Use SVG icons only. Do not use emoji characters anywhere in the interface.

---

## 0. Master implementation instructions

This document combines the marketing-led visual direction with the detailed operational receivables requirements. Treat this master as the source of truth. The two experiences should share brand tokens and interaction conventions, but they must not share the same visual density or decorative effects.

Before coding:

1. Read `AGENTS.md`, `README.md`, existing UI/UX files, `package.json`, lockfile, route structure, environment examples, shared components, and current CSS/Tailwind configuration.
2. Identify installed framework versions and reuse existing libraries where possible. Do not install duplicate icon, animation, table, chart, form, or component systems.
3. Preserve working business logic, authentication, permissions, APIs, schemas, and data models. Do not rewrite backend behavior for visual reasons.
4. Build the marketing site and authenticated app as distinct layouts using shared design tokens and reusable primitives.
5. Use SVG icons via `lucide-react` or the project's existing SVG icon system. No emoji in buttons, labels, statuses, empty states, toasts, documentation copy shown in the UI, or navigation.
6. Do not use decorative screenshots as the actual interactive application. Marketing previews may be mockups; operational screens must use real components and data.
7. Never fabricate financial metrics, customer logos, testimonials, integrations, security certifications, legal guarantees, or product capabilities.
8. Every visible button, link, menu, filter, accordion, form, dialog, and tab must perform its advertised action.
9. The final result must be polished on desktop and mobile—not merely responsive by shrinking the desktop layout.
10. If repository reality conflicts with an example in this document, preserve correct existing behavior, inspect the relevant code, and explain any unavoidable deviation.

## 1. Combined design direction

### Public marketing experience

Use the uploaded landing-page references as visual inspiration: compact navigation, editorial serif display headings, generous but deliberate white space, a vivid blue primary CTA, a large product preview, restrained cyan/blue atmospheric glow, alternating feature stories, a clean FAQ, a final CTA, and a compact footer. Mobile must become a carefully composed vertical narrative, not a compressed desktop page.

### Authenticated application

Use the receivables specification for operational screens: a calm neutral canvas, compact sidebar, clear KPIs, efficient invoice explorer, precise financial states, detailed invoice command center, activity timeline, evidence list, and focused payment/follow-up forms. Keep the interface data-first, accessible, and audit-friendly.

### Priority when requirements conflict

| Area | Rule to follow |
|---|---|
| Primary action color | Brand blue. Green is primarily for confirmed paid/completed states. |
| Decorative gradients | Marketing-only and restrained; do not place behind financial tables or forms. |
| Typography | Editorial serif for marketing display headings; sans-serif for the application UI and all dense data. |
| Status colors | Semantic colors plus explicit text labels; never color alone. |
| Data density | Spacious and expressive on the landing page; efficient and scannable in the app. |
| Animation | Purposeful and subtle; never delay interaction or obscure financial information. |
| Backgrounds | Prefer CSS gradients and lightweight SVG; raster art is optional, not required. |
| Icons | SVG icon system only; never emoji. |
| Financial truth | Server-confirmed values and centralized business rules override visual optimism. |

---

## 2. Animation and visual effects — mandatory implementation rules

The goal is a very modern interface that feels considered and premium, not an animated template. Motion should reinforce hierarchy, show interaction feedback, and improve orientation.

### Motion timing

- Hover/pressed feedback: 100–160ms.
- Buttons and small controls: 120–180ms.
- Dropdowns and accordions: 160–220ms.
- Dialogs and mobile drawers: 180–260ms.
- Marketing section reveals: 350–600ms, once per section.
- Avoid long stagger sequences, spring overshoot in financial screens, and transitions that block interaction.

### Marketing animations

- Hero eyebrow, headline, supporting copy, and CTA may fade in with a small upward translate and a short stagger.
- Product preview may fade in and move upward slightly; a scale from approximately 0.985 to 1 is enough.
- Feature stories may reveal once when entering the viewport. Keep content visible if JavaScript or animation fails.
- Cards may have a subtle border, shadow, or 1–2px lift on hover; do not use large floating motion.
- FAQ chevrons may rotate smoothly when the accordion opens.
- The blue/cyan glow should be static by default. If animated, use very slow, low-amplitude movement and disable it for reduced motion and low-powered mobile contexts.

### Application animations

- Sidebar drawer, dialogs, and sheets use short opacity/translate transitions with correct focus management.
- Table rows get subtle background transitions.
- Buttons require hover, active, focus-visible, disabled, and loading states.
- Skeletons may use a gentle low-contrast shimmer; reduce/disable it for reduced motion.
- Charts may animate briefly only if the animation does not delay reading or distort perceived values.
- Do not animate currency numbers in a way that makes them temporarily misleading.

### Prohibited effects

- Emoji or mixed icon styles.
- Cursor-following light effects.
- Scroll-jacking, large parallax, or constant floating cards.
- Flashing or rapidly pulsing status indicators.
- Large animated blur layers behind data.
- Large 3D transforms on tables, invoice details, or forms.
- Animation as the only way to reveal content.
- Motion that creates layout shift, delays input, or causes mobile overflow.

### Reduced motion

Respect `prefers-reduced-motion: reduce`. Remove parallax and large transforms, stop animated backgrounds, and make reveal content appear immediately or with only a brief opacity change. All functionality must remain available when motion is disabled.

### Suggested CSS background treatment

Use this lightweight atmospheric treatment behind the hero product preview, not behind the hero text or dashboard data:

```css
.hero-preview-wrap {
  position: relative;
  isolation: isolate;
}
.hero-preview-wrap::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 8% -4% -6%;
  background:
    radial-gradient(ellipse at 28% 45%, rgba(81, 221, 245, .38), transparent 42%),
    radial-gradient(ellipse at 62% 35%, rgba(20, 93, 255, .26), transparent 48%),
    radial-gradient(ellipse at 80% 68%, rgba(105, 185, 255, .18), transparent 40%);
  filter: blur(26px);
  pointer-events: none;
}
@media (max-width: 767px) {
  .hero-preview-wrap::before { filter: blur(16px); inset: 8% 0 -3%; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

Use these rules as a starting point; integrate them with the project's existing CSS strategy rather than pasting duplicate global rules.

## 3. Background assets and images

- Prefer CSS radial gradients, low-contrast linear gradients, and lightweight SVG contours/grid lines for marketing backgrounds.
- Do not generate or add a raster background unless it clearly improves the final composition. The design must work without one.
- If a custom raster texture is justified, store it locally under `public/images/`, optimize its size, provide a fallback color, and avoid a large file that slows the first render.
- Use real product screenshots when available. During development, create maintainable HTML/CSS mockups rather than baking the interface into a static image.
- Give informative screenshots meaningful alt text. Decorative SVGs/backgrounds must be hidden from assistive technology and must not intercept pointer events.
- Keep product mockups crisp, consistently framed, lightly bordered, and cropped to the feature being explained. Never scale a full desktop UI down until its text is unreadable on mobile.

## 4. Dependency installation policy

Inspect `package.json` and the lockfile first. Keep existing dependencies and versions whenever they meet the requirements. Do not install every option below by default.

### Baseline, only if missing

```bash
npm install lucide-react clsx tailwind-merge
```

- `lucide-react`: consistent SVG icons.
- `clsx`: conditional class composition.
- `tailwind-merge`: safely resolve conflicting Tailwind utilities.

### Animation, only if needed

```bash
npm install motion
```

Use Motion for purposeful entrance/viewport and component transitions if the project has no equivalent. If the project already uses `framer-motion`, keep it rather than installing both. CSS transitions may be sufficient for simple hover/focus effects. Do not add GSAP unless complex timeline choreography genuinely requires it.

### Accessible primitives, if not already provided

```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```

If using shadcn/ui, follow the project's existing setup and add only required components. Do not duplicate Radix primitives already wrapped by the current component system.

### Complex forms, only if needed

```bash
npm install react-hook-form zod @hookform/resolvers
```

Validate on the server as well. Client validation is for usability, not security.

### Optional data UI packages

```bash
npm install @tanstack/react-table
npm install recharts
npm install sonner
npm install date-fns
```

Use only as required:
- `@tanstack/react-table`: complex table sorting/filtering/selection/pagination.
- `recharts`: charts that support real decisions.
- `sonner`: toast notifications if no current notification system exists.
- `date-fns`: consistent date formatting/calculation if no suitable library exists.

Do not add duplicates of existing chart/table/date/toast systems. Centralize overdue calculations and financial status rules in business logic rather than repeating them in UI components.

### Optional quality tools

```bash
npm install -D prettier
npm install -D @playwright/test
npx playwright install
```

Only install tools that are missing and needed. Preserve the existing ESLint, TypeScript, test runner, and package scripts. Verify compatibility with current framework versions before adding dependencies.

---

## 5. Implementation sequence

1. Audit repository instructions, routes, dependencies, design tokens, and current behavior.
2. Establish shared color, typography, spacing, radius, and focus tokens.
3. Build shared primitives and the SVG icon convention.
4. Implement the public marketing layout and all landing-page sections.
5. Implement the responsive authenticated shell and navigation.
6. Implement dashboard, invoice explorer, invoice command center, and action flows using existing APIs.
7. Apply animation and background effects only after layout and behavior are stable.
8. Test loading, empty, error, success, validation, permission, and destructive-action states.
9. Test responsive breakpoints, keyboard behavior, reduced motion, and contrast.
10. Run lint, type-check, tests, and production build; fix issues before completion.

Do not stop at the hero section. Complete all relevant sections and workflows described below.

---

# Appendix A — Marketing Website and Shared UI Guidance

**Version:** 2.0  
**Status:** Implementation specification  
**Design reference:** Uploaded desktop and mobile landing-page screenshots  
**Product direction:** Premium B2B SaaS for lead-to-payment workflows, receivables, invoice tracking, buyer relationships, follow-ups, commitments, and payment visibility.

---

## 1. Purpose and design interpretation

This specification replaces the previous restrained, dashboard-first UI direction with a more polished, marketing-led visual system inspired by the supplied desktop and mobile references.

The reference UI uses:
- A white / near-white canvas with dark navy typography.
- Editorial, high-contrast serif display headings.
- Small, restrained navigation and generous whitespace.
- Electric-blue primary CTAs and soft cyan/blue atmospheric glow.
- Rounded panels and product screenshots presented as the main proof of value.
- A long-form landing page that explains the product progressively.
- Responsive layouts that change composition on mobile instead of shrinking desktop content.

The product must still behave like a trustworthy finance/operations tool. Use the reference's visual confidence for the public website, while keeping authenticated workspaces highly readable and task-oriented. Do not sacrifice data clarity for decoration.

### Primary UX goal

A business user should quickly understand:
1. What the product does.
2. How it connects leads, buyers, invoices, follow-ups, and payments.
3. Which receivables need attention.
4. What action they should take next.
5. Where to find the complete history and supporting evidence.

### Visual balance

- **Public marketing pages:** expressive, editorial, visual, spacious.
- **Authenticated app:** professional, dense where necessary, calm, precise, and efficient.
- **Shared design language:** navy text, blue accents, pale blue surfaces, rounded geometry, consistent typography, clear status semantics.

---

## 2. Non-negotiable design principles

1. **Responsive by design:** mobile is a separately considered composition, not a compressed desktop view.
2. **Product-first storytelling:** show real product UI previews rather than abstract illustrations alone.
3. **Clear hierarchy:** every section has one primary message and one clear action.
4. **Business credibility:** avoid fake customer logos, unsupported claims, fabricated testimonials, or unlabeled sample financial metrics.
5. **Accessible color:** status, validation, and meaning must never depend on color alone.
6. **Functional controls:** every visible button, link, tab, filter, accordion, and menu must work.
7. **Progressive disclosure:** introduce detail when it is relevant; do not expose every metric and field at once.
8. **Consistent spacing:** use a deliberate spacing scale and align elements across sections.
9. **Performance-aware effects:** glows, transitions, charts, and mockups must not harm loading speed or mobile performance.
10. **Reduced motion:** honor the user's operating-system motion preference.

---

## 3. Design tokens

Define these tokens centrally with CSS variables or Tailwind theme tokens. Treat values as the starting point; tune them after comparing the implementation to both reference screenshots.

### Color palette

| Token | Suggested value | Usage |
|---|---|---|
| `--color-ink` | `#10233F` | Main headings and primary text |
| `--color-ink-soft` | `#344762` | Secondary headings and body text |
| `--color-muted` | `#718096` | Supporting copy and metadata |
| `--color-primary` | `#145DFF` | Primary buttons, links, active states |
| `--color-primary-hover` | `#0847D9` | Hover / pressed primary controls |
| `--color-cyan` | `#42D9F5` | Decorative glow and selected highlights |
| `--color-blue-pale` | `#EAF5FF` | Soft section backgrounds |
| `--color-surface` | `#FFFFFF` | Cards, panels, dialogs |
| `--color-page` | `#FBFDFF` | Main page background |
| `--color-border` | `#DCE6F1` | Borders and dividers |
| `--color-success` | `#16845B` | Paid / completed state |
| `--color-warning` | `#B96A08` | Due soon / attention state |
| `--color-danger` | `#C43846` | Overdue / failed state |
| `--color-info` | `#2463C7` | Informational state |

Use semantic colors in the application only where they communicate state. Cyan and blue glows are decorative and must not appear behind dense data tables or small body copy.

### Typography

Use a refined serif display face for large marketing headings and a highly legible sans-serif for interface text.

Suggested pairing:
- **Display:** `DM Serif Display` or `Instrument Serif`
- **Interface/body:** `Inter` or `Manrope`
- **Numeric/data:** the interface sans-serif with tabular numerals enabled

Example Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');
```

Recommended hierarchy:
- Marketing hero: `clamp(2.75rem, 5vw, 5.25rem)`, line-height 0.95–1.05.
- Section title: `clamp(2.1rem, 3.4vw, 3.5rem)`, line-height 1.0–1.1.
- Marketing body: 1rem–1.125rem, line-height 1.55–1.7.
- App page title: 1.5rem–2rem, sans-serif, semibold.
- App section title: 1rem–1.25rem, semibold.
- Body/UI: 0.875rem–1rem, line-height 1.45–1.6.
- Metadata: 0.75rem–0.8125rem; never make essential information too small.

Avoid using the display serif for tables, form labels, charts, navigation, or long paragraphs.

### Spacing and geometry

Use a 4px base grid, with common spacing values of 4, 8, 12, 16, 24, 32, 48, 64, 80, and 112px.

- Marketing content max-width: approximately 1180–1280px.
- Long-form text width: 560–700px.
- App content max-width: flexible; preserve usable space for data.
- Card radius: 16–22px on marketing surfaces.
- App panel radius: 10–16px.
- Pill button radius: 999px for primary marketing CTAs; app controls may use 8–12px.
- Border: 1px solid a pale neutral/blue.
- Shadows: subtle and diffuse; use glow as a separate decorative layer, not as a heavy card shadow.

---

## 4. Global page layout

### Public website shell

1. Compact header.
2. Hero statement and primary CTA.
3. Large product preview / dashboard showcase.
4. Value proposition or quick-start explanation.
5. Feature/story sections with product screenshots.
6. CRM / insights / workflow section.
7. Integration or unified-workspace section.
8. FAQ.
9. Final CTA.
10. Footer.

The page should feel like one coherent narrative. Avoid turning every section into an identical row of three cards.

### Authenticated application shell

Desktop:
- Persistent compact left sidebar.
- Top bar with workspace/business selector, global search where appropriate, notifications, and profile menu.
- Main content area with a clear page title and contextual primary action.
- Use a right contextual rail only when it helps a specific workflow.
- Keep tables and operational data aligned to a grid.

Tablet:
- Collapsible sidebar.
- Reduce secondary columns and keep important actions visible.
- Allow table horizontal scrolling only when a card/list alternative would damage scanability.

Mobile:
- Compact top bar with brand/product identity and menu control.
- Drawer navigation or a carefully selected bottom navigation for primary destinations.
- Single-column page layout.
- Convert wide tables to record cards or a purposeful list.
- Stack actions without allowing primary actions to become difficult to reach.
- Keep forms one column and use full-width primary actions when appropriate.

---

## 5. Landing page specification

### 5.1 Header / navigation

Visual treatment:
- White or near-white background.
- Compact height with generous horizontal alignment.
- Brand mark and wordmark at the left.
- Small, calm navigation links in the middle/right.
- Sign-in as a quiet text link.
- Primary CTA as a dark navy or blue pill button.
- Avoid a tall, heavy navigation bar.

Desktop:
- Use a single horizontal row.
- Keep navigation labels short.
- Use a subtle hover state and visible keyboard focus.

Mobile:
- Show brand on the left and a menu icon on the right.
- Hide desktop links behind an accessible drawer/menu.
- The menu must open/close, close on Escape, and expose correct accessible state.
- Prevent the menu from overflowing the viewport.

### 5.2 Hero section

The hero should match the reference's editorial layout: centered, concise, and visually confident.

Structure:
1. Small eyebrow label above the headline.
2. Large two-line headline describing the lead-to-payment outcome.
3. Short supporting paragraph, ideally no more than 2–3 lines on desktop.
4. Primary CTA.
5. Optional low-emphasis secondary link or short reassurance note.
6. Product preview below the text.

Guidelines:
- Use the display serif for the main headline.
- Keep the text column centered and constrained.
- Avoid long paragraphs, multiple competing CTAs, and oversized navigation.
- Use a soft blue/cyan blurred glow behind or around the product preview, not directly behind the headline text.
- The hero should remain legible if decorative effects fail to load.

CTA behavior:
- Use a clear action such as “Get started” or “Book a demo,” depending on the real onboarding model.
- Never imply free access or a guarantee unless the product actually provides it.
- Include a loading/disabled state during navigation or submission where needed.

### 5.3 Hero product preview

This is a key visual anchor and should show the actual application or a faithful, maintained mockup.

Desktop:
- Wide dashboard preview centered below the hero.
- Use a subtle border, modest radius, and low-elevation shadow.
- Add the soft blue/cyan atmospheric shape behind the preview.
- Keep the preview's content sharp and readable at normal desktop scale.
- Avoid excessive perspective tilt or exaggerated 3D effects.

Mobile:
- Use a mobile-specific preview or crop intentionally.
- Do not simply scale the desktop screenshot until text becomes illegible.
- Keep the preview inside the viewport with a safe side gutter.
- Reduce or soften the glow to prevent performance issues and visual clutter.

If screenshots contain demo data, label it as sample data when there is any risk of it being mistaken for live customer data.

### 5.4 “First win” / quick-start section

Purpose: explain how a new user reaches a useful outcome quickly.

Use a centered heading and short supporting line followed by three concise steps or feature cards. Each step should have:
- Small visual or UI crop.
- Short title.
- One compact explanation.
- Optional step number or small icon.

The cards may have pale-blue surfaces and rounded corners. Keep them visually lightweight; avoid large shadows and excessive text. On desktop, use three columns; on mobile, stack vertically with consistent spacing.

### 5.5 Feature narrative sections

Follow the reference's alternating product-story rhythm. Each section should contain a focused heading, short copy, and a screenshot or product mockup that proves the feature.

Recommended story sequence:
1. **Own your pipeline:** lead/buyer records, stages, ownership, and next action.
2. **Run projects with evidence:** show a buyer, invoice, or account detail with relevant history.
3. **Send invoices / track payments:** show invoice status, amount, due date, outstanding balance, and payment history.
4. **Your CRM, included:** show buyer/contact records and recent activity.
5. **Smart insights:** show only meaningful metrics, exceptions, and suggested next steps.
6. **Better insights, fewer tools:** show a consolidated operational workspace.
7. **One screen for the service/business:** communicate how the workflow fits together.

For every feature section:
- Use one clear message per section.
- Keep copy to a headline, one short paragraph, and optionally 2–4 supporting points.
- Use product screenshots that correspond to the copy.
- Alternate text/image placement on wide screens to create rhythm.
- On mobile, use a consistent order: eyebrow → heading → copy → bullets/CTA → visual.
- Do not use alternating desktop order if it makes the mobile narrative confusing.
- Do not repeat the same generic screenshot across all sections.

### 5.6 Screenshot and mockup standards

- Use consistent browser/app framing across product previews.
- Crop screenshots to emphasize the relevant feature.
- Use realistic interface density and legible text.
- Keep edges aligned to the same container grid.
- Prefer real product screenshots over decorative charts with fabricated data.
- If mock data is used, keep it internally consistent and clearly marked in the demo environment.
- Avoid placing a large screenshot before the user understands what it demonstrates.
- Provide meaningful alt text for informative images; use empty alt text for purely decorative imagery.

### 5.7 Insights / unified-workspace panel

Use a larger pale-blue or soft-gradient panel to distinguish this section from standard alternating feature rows.

Suggested composition:
- Heading and brief explanation.
- One CTA.
- A single product visual or small layered preview.
- Decorative glow kept behind the content.

The panel should not look like a generic gradient banner. Preserve contrast, align the content, and use the same radius system as other major sections.

### 5.8 FAQ

- Center a clear heading above the questions.
- Use a simple accordion/list with dividers or restrained borders.
- Show a clear expand/collapse affordance on the right.
- Only one item needs to be open at a time if that improves scanning; otherwise support multiple open items consistently.
- Ensure keyboard interaction, focus indicators, and `aria-expanded` state.
- Questions should answer real purchase/adoption concerns: setup, data import, invoices, buyer records, access, pricing, security, and support—only where the product has factual answers.
- Do not invent compliance certifications or security guarantees.

### 5.9 Final CTA and footer

Final CTA:
- Use a soft sky-blue / cyan atmospheric background with a clear heading.
- Include one primary CTA and optional secondary text link.
- Keep the copy outcome-focused, not hype-driven.

Footer:
- Brand mark and short product description.
- Group links by product, resources, and company only when those pages exist.
- Include privacy, terms, and contact links when available.
- On mobile, stack link groups and keep touch targets comfortably sized.
- Never show dead links or placeholder social icons in production.

---

## 6. Authenticated product experience

The marketing site can be expressive, but the operational app must prioritize speed, accuracy, and information density.

### 6.1 Navigation model

Primary destinations:
- Overview / Dashboard
- Pipeline / Leads (if supported by the product)
- Invoices / Receivables
- Buyers / Contacts
- Activity
- Settings

Optional later destinations, only if implemented:
- Reports
- Integrations

Do not expose routes that are not functional. Highlight the active route using a blue accent and text/icon state, not color alone.

### 6.2 Dashboard / overview

Header:
- Page title and selected business/workspace context.
- Date range or filter only if it affects displayed metrics.
- Primary action such as “Add invoice” or “Add lead,” depending on the current page focus.

Summary metrics should answer operational questions:
- Total outstanding.
- Overdue amount.
- Due soon.
- Collected within a defined period.

For each metric:
- Include label, value, and relevant comparison/time range if available.
- Make the number's meaning explicit.
- Avoid vanity metrics and unexplained charts.
- Do not hardcode fictional financial data into production.

Needs-attention queue:
- Place this near the top of the dashboard.
- Each item should show buyer, invoice/reference, outstanding amount, overdue/due status, last follow-up, and next action where available.
- Make the entire row/card easy to open, while keeping nested action buttons independent.
- Provide a clear empty state when no records need attention.

Charts:
- Use only when they help explain a trend or support a decision.
- Include title, time period, axis labels, tooltips, and accessible summaries.
- Do not use charts as decoration.
- Ensure chart labels do not become unreadable on mobile.

### 6.3 Pipeline / leads

If lead management is part of the product:
- Use a table/list or kanban board according to the real workflow.
- Show lead/account name, stage, owner, estimated value where applicable, last activity, and next action.
- Keep stages understandable and configurable only if the backend supports configuration.
- Filters and search should be visible and easy to reset.
- On mobile, prefer compact cards with stage and next action clearly shown.
- Do not visually mix sales pipeline status with invoice/payment status.

### 6.4 Invoices / receivables list

Recommended columns:
- Invoice / reference.
- Buyer.
- Amount.
- Due date.
- Outstanding balance.
- Status.
- Last activity.
- Next action, where supported.

Keep the default view focused. Avoid 15+ visible columns. Provide search, filters, sorting, pagination, and a clear reset-filters action where applicable.

Mobile:
- Convert rows to cards/list items.
- Put buyer + invoice identifier first.
- Show outstanding amount and status prominently.
- Put due date and last activity in secondary text.
- Keep “Open invoice” or an equivalent tap action obvious.

### 6.5 Invoice detail page

This is a core operational screen.

Top summary:
- Buyer/account name.
- Invoice identifier.
- Status.
- Outstanding amount.
- Due date or days overdue.
- Contextual primary actions: “Record follow-up” and “Record payment,” where permitted.

Supporting sections:
1. Invoice summary and payment terms.
2. Payment commitment.
3. Chronological activity timeline.
4. Evidence/documents.
5. Payment history.
6. Buyer/contact context.
7. Additional metadata, lower in the hierarchy.

Use a two-column layout on wide desktop when it improves scanning; collapse to one column on mobile. Do not let a right rail push the most important information below the fold.

### 6.6 Create invoice form

Use one page or a focused drawer depending on the application shell. Group fields logically:
1. Buyer.
2. Invoice details: invoice number, invoice date, amount.
3. Payment terms: due date and terms.
4. Supporting information: notes and optional attachment.

Requirements:
- Persistent visible labels.
- Inline validation with a specific corrective message.
- Currency and date formatting appropriate to the configured locale.
- Prevent accidental duplicate submission.
- Show save progress and success/failure feedback.
- Preserve safe user input if submission fails.
- Primary action: “Save invoice”; secondary action: “Cancel.”
- Do not add fields without a defined business purpose.

### 6.7 Follow-up, commitment, and payment flows

Use focused dialogs or bottom sheets for short actions rather than forcing users through large multi-page forms.

Follow-up fields may include:
- Date/time.
- Channel.
- Contact.
- Notes.
- Buyer response.
- Next follow-up date.

Payment commitment:
- Expected payment date.
- Expected amount.
- Recorded source.
- Notes.
- State: upcoming, due today, missed, or fulfilled.

Payment recording:
- Payment date.
- Amount.
- Method/reference where supported.
- Notes or supporting evidence if required.

All mutations should:
- Show pending state.
- Disable duplicate submission.
- Confirm success with clear wording.
- Explain failure and allow retry.
- Update related totals/statuses only after the server confirms the change.

### 6.8 Activity timeline and evidence

Timeline events should show:
- Date/time.
- Event type.
- Concise description.
- Actor.
- Related record where applicable.

Evidence items should show:
- File name.
- Type.
- Date.
- Description.
- Source/category.
- Actions allowed by permission: view, download, or delete.

Do not claim that evidence is legally valid unless independently established. Protect private financial/customer information and avoid exposing file URLs publicly.

---

## 7. Responsive behavior and breakpoints

Use the framework's existing breakpoints if already configured. If none exist, start with:
- **Small mobile:** below 480px.
- **Mobile / large phone:** 480–767px.
- **Tablet:** 768–1023px.
- **Desktop:** 1024–1279px.
- **Wide desktop:** 1280px and above.

These are guidance, not a substitute for content-driven testing.

### Desktop requirements
- Hero and feature sections centered in a consistent max-width container.
- Alternating feature layouts with stable image sizing.
- Large, readable serif headings.
- Product screenshots aligned consistently.
- App sidebar and data tables where useful.

### Tablet requirements
- Reduce horizontal gaps and screenshot width.
- Allow feature text and image to stack before either becomes cramped.
- Collapse secondary navigation.
- Hide nonessential table columns rather than shrinking all text.

### Mobile requirements
- No horizontal page overflow at 320px viewport width.
- Header becomes a compact menu.
- Hero title, copy, CTA, and product preview stack vertically.
- Use a single-column feature flow.
- Cards occupy the available width with 16–20px page gutters.
- Avoid fixed heights for text-heavy sections.
- Do not scale desktop mockups so far down that they become unreadable.
- Replace tables with cards or a purposeful list.
- Use full-width CTAs when they improve usability.
- Accordion rows and controls should have comfortable touch targets (aim for 44×44 CSS px).
- Keep the decorative glow soft and contained; it must not create horizontal overflow.
- Ensure sticky controls do not cover content or the mobile browser's safe area.

### Responsive QA checklist
- 320px, 375px, 390px, 430px widths.
- 768px tablet.
- 1024px small desktop.
- 1440px and 1920px wide desktop.
- Portrait and landscape mobile.
- 200% browser zoom.
- Long labels, long company names, large currency values, empty states, and validation messages.

---

## 8. Interaction and motion

- Use restrained transitions, generally 120–220ms.
- Animate hover, focus, open/close, and loading states only when they clarify interaction.
- Use transform/opacity for low-cost animations.
- Avoid large parallax, constant floating elements, cursor-following effects, and excessive blur animation.
- Decorative glow may use a subtle static or slow animation, but disable or simplify it on low-powered devices and under reduced-motion preferences.
- Buttons need hover, active, focus-visible, disabled, and loading states.
- Links need a visible hover and focus state.
- Accordions and mobile navigation must work with keyboard and touch.
- Use skeletons for major loading surfaces; avoid flashing blank screens.
- Respect `prefers-reduced-motion: reduce`.

---

## 9. Accessibility and content clarity

Target WCAG 2.2 AA practices where feasible.

Required:
- Semantic landmarks and heading order.
- Keyboard-accessible navigation and controls.
- Visible `:focus-visible` styles.
- Form fields with associated labels.
- Dialog focus management and Escape handling.
- Sufficient text contrast.
- Descriptive validation and error messages.
- Status conveyed by text/icon as well as color.
- Alt text for informative screenshots.
- Decorative backgrounds hidden from assistive technology.
- Reduced-motion support.
- Charts accompanied by a textual summary.
- Touch targets sized for comfortable use.

Copy style:
- Be direct, specific, and calm.
- Prefer “₹45,000 outstanding” over vague emotional wording.
- Prefer “Payment due 5 Oct” over “Deadline approaching.”
- Prefer “Record follow-up” over “Take action.”
- Avoid fake urgency, inflated claims, fake AI language, and unsupported performance promises.

---

## 10. States that must be designed

Every screen and flow must cover:

### Loading
- Skeletons for dashboard metrics, tables, invoice details, and product previews.
- Buttons show progress during mutations.
- Avoid layout shifts when data arrives.

### Empty
Examples:
- No invoices: “No invoices yet. Add your first invoice to start tracking receivables.”
- No overdue invoices: “No overdue invoices. Your receivables are currently on schedule.”
- No follow-ups: “No follow-ups recorded for this invoice.”
- No evidence: “No supporting records attached yet.”
- No search results: explain that nothing matched and provide a reset-filters action.

### Error
Explain:
1. What happened.
2. Whether the action succeeded.
3. What the user can do next.

Never expose raw stack traces, SQL errors, provider errors, tokens, or internal identifiers.

### Success
- Confirm the completed action.
- Update UI only when the server confirms the mutation.
- Use concise toast/banner feedback and preserve context.

### Permission / destructive actions
- Hide or disable actions the user cannot perform.
- Confirm irreversible deletion.
- Explain what will be deleted and whether it can be restored.
- Never rely on client-side visibility as the only authorization control.

---

## 11. Suggested component inventory

Build reusable components rather than styling every page independently.

### Marketing components
- `MarketingHeader`
- `MobileNavigation`
- `HeroSection`
- `PrimaryCTA`
- `ProductPreview`
- `QuickStartSteps`
- `FeatureStorySection`
- `FeatureScreenshot`
- `InsightPanel`
- `FAQAccordion`
- `FinalCTA`
- `MarketingFooter`

### Application components
- `AppShell`
- `AppSidebar`
- `AppTopbar`
- `PageHeader`
- `MetricCard`
- `NeedsAttentionList`
- `InvoiceTable`
- `InvoiceCard`
- `StatusBadge`
- `SearchFilterBar`
- `InvoiceSummary`
- `ActivityTimeline`
- `EvidenceList`
- `FollowUpDialog`
- `PaymentCommitmentForm`
- `RecordPaymentDialog`
- `EmptyState`
- `ErrorState`
- `Skeleton`
- `ConfirmDialog`
- `Toast` / notification system

Each component should have consistent spacing, accessible states, and a clear data contract. Avoid creating multiple slightly different versions of the same button, badge, or card.

---

## 12. Recommended dependencies

**Important:** inspect `package.json` first. Keep existing framework and libraries where they already meet the requirements. Do not install a second UI framework or duplicate icon, animation, or chart libraries unnecessarily.

### Core styling and UI

For a Next.js + React + TypeScript + Tailwind CSS project:

```bash
npm install lucide-react clsx tailwind-merge
```

- `lucide-react`: consistent line icons.
- `clsx`: conditional class composition.
- `tailwind-merge`: safely resolve conflicting Tailwind classes.

If the project does not already use Tailwind CSS, install/configure it according to the version and framework already in the repository. Do not blindly replace an existing Tailwind v3/v4 setup.

### Optional, use only when needed

```bash
npm install framer-motion
```

Use for a few purposeful transitions only. For a lightweight landing page, CSS transitions may be sufficient. If the repository already uses Motion (`motion` package) or another animation library, do not add a duplicate.

```bash
npm install recharts
```

Use only if the dashboard needs interactive charts. For simple visual summaries, CSS or the existing chart solution may be enough.

```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```

Use these if accessible primitives are not already supplied by the project's component library. If using shadcn/ui, follow the project's existing shadcn setup and add only the required components through its CLI rather than maintaining duplicate primitives.

```bash
npm install react-hook-form zod @hookform/resolvers
```

Recommended if the app has multi-field invoice, follow-up, or payment forms requiring schema-based validation. If an existing form/validation stack is already used, keep it.

```bash
npm install sonner
```

Optional toast notifications. Use the existing notification system if one is already configured.

```bash
npm install @tanstack/react-table
```

Optional for complex, sortable/filterable invoice tables. Do not use it for a simple static table.

### Development and quality tools

Check whether these are already present before installing:

```bash
npm install -D eslint prettier
```

If the repository already has ESLint/Prettier configuration, preserve it. Add Playwright for browser-level responsive and interaction tests only if the project does not already use an equivalent tool:

```bash
npm install -D @playwright/test
npx playwright install
```

### Installation approach

Do not install every optional dependency by default. Start with the existing stack plus `lucide-react`, `clsx`, and `tailwind-merge` only if missing. Add form, chart, table, dialog, toast, or animation libraries when the implemented feature needs them.

Do not add a 3D library, a large icon pack, or a background-animation dependency solely to imitate the screenshot; the reference is primarily typography, layout, product imagery, and restrained glow.

---

## 13. Implementation guidance

1. Read `package.json`, existing app routes, design tokens, shared components, and current Tailwind configuration before making changes.
2. Preserve current business logic, API contracts, authentication, routing, and data models.
3. Separate the public marketing layout from the authenticated app layout while reusing tokens and primitives.
4. Build the responsive container, typography, buttons, and color tokens first.
5. Implement the marketing page from top to bottom using reusable section components.
6. Use real application screenshots or maintainable product mockups for previews.
7. Build the mobile composition deliberately; do not rely only on breakpoint-based font shrinking.
8. Refine the app dashboard and invoice screens without reducing information accuracy or operational density.
9. Verify every button, link, menu, accordion, filter, form, and dialog.
10. Test empty/loading/error/success states.
11. Check contrast, keyboard navigation, reduced motion, and narrow widths.
12. Run the project's existing lint, type-check, tests, and build commands.

### Implementation constraints
- Do not rewrite the backend or alter APIs for visual reasons.
- Do not hardcode demo metrics into production screens.
- Do not replace real actions with decorative buttons.
- Do not add dependencies without checking the existing stack.
- Do not use giant blurred gradients behind data-heavy screens.
- Do not use fixed widths that break at mobile sizes.
- Do not use screenshots as the only implementation of interactive product UI.
- Do not create dead routes or placeholder links that appear functional.

---

## 14. Definition of done

The UI is ready for review only when:

- [ ] Desktop landing page follows the supplied reference's visual direction.
- [ ] Mobile layout is intentionally composed and has no horizontal overflow.
- [ ] Serif display typography and sans-serif interface typography are consistent.
- [ ] Blue/cyan effects are subtle and do not reduce readability.
- [ ] Product screenshots support the story and are sharp enough to understand.
- [ ] Section spacing and content widths feel consistent.
- [ ] Authenticated dashboard remains data-first and usable.
- [ ] Invoice/receivable status is understandable without color alone.
- [ ] All CTAs, menus, accordions, forms, and dialogs work.
- [ ] Loading, empty, error, and success states exist.
- [ ] Forms validate input and prevent duplicate submissions.
- [ ] Keyboard focus and reduced-motion preferences are supported.
- [ ] No fabricated testimonials, customer logos, financial metrics, or security claims are presented as real.
- [ ] No unnecessary dependencies or duplicate component systems were added.
- [ ] Lint, type-check, tests, and production build pass.

---

## 15. Final design direction

The final experience should feel like a polished, modern B2B SaaS website: editorial serif headlines, clean white space, strong blue calls to action, restrained cyan/blue glow, rounded product-preview surfaces, and a sequence of concise product stories. On mobile, the same visual identity should remain clear and premium through a vertical, touch-friendly layout.

Inside the product, keep the aesthetic but shift the priority to trustworthy financial information, obvious next actions, accessible statuses, and efficient workflows. The goal is not to copy a screenshot pixel-for-pixel; it is to translate its visual system into a credible, responsive, production-ready product.

---

# Appendix B — Receivables Application Specification

## Application-specific UX / UI Specification — B2B FinTech Receivables Platform

## Document Status

- **Version:** v2.0 (Modernized via UI/UX Pro Max Skill)
- **Design Archetype:** Minimalism & Swiss Data-Dense Architecture
- **Tech Stack:** Next.js App Router, Tailwind CSS, shadcn/ui, Lucide React, date-fns
- **Primary Objective:** Deliver instant clarity on outstanding receivables, overdue risk, and end-to-end invoice timelines with serious B2B financial trust.

---

# 1. Design Direction & Archetype

The platform is designed as a high-trust, data-dense B2B FinTech tool (comparable to modern financial workflows like Mercury, Linear, and Stripe Dashboard). It balances extreme operational clarity with calm, professional aesthetics.

### Core Visual Principles
- **Data-Dense & Efficient:** 8px baseline grid, compact 40px table rows, sticky headers, and clear visual grouping to display actionable context without clutter.
- **Authoritative & Calm:** Restrained palette rooted in deep navy (`#1E3A5F`) and slate canvas (`#F8FAFC`), avoiding generic gradients, floating bubbles, or flashy consumer gimmicks.
- **Semantic Color Strictness:** Color is reserved strictly for operational state (Overdue, Due Soon, Committed, Paid). It is never the sole carrier of meaning—always paired with explicit labels and icons.
- **Precision Typography:** Geometric sans-serif (`Plus Jakarta Sans`) for interface legibility, paired with tabular monospace numbers (`JetBrains Mono` / `tabular-nums`) for currency and invoice IDs.
- **Trust & Auditability:** Every financial figure clearly distinguishes between *User-Entered Original*, *Calculated Balance*, and *Logged Payment*.

---

# 2. Design System Tokens (UI/UX Pro Max Engine)

### 2.1 Color Palette & CSS Variables

```css
:root {
  /* Brand & Corporate Tokens */
  --color-primary: #1E3A5F;           /* Deep Navy — Authoritative brand anchor */
  --color-primary-hover: #152B47;
  --color-on-primary: #FFFFFF;

  --color-secondary: #2563EB;         /* Cobalt Blue — Interactive links, filters */
  --color-secondary-hover: #1D4ED8;
  --color-on-secondary: #FFFFFF;

  --color-accent: #059669;            /* Paid Emerald — Primary CTAs, settled states */
  --color-accent-hover: #047857;
  --color-on-accent: #FFFFFF;

  /* Surfaces & Canvas */
  --color-background: #F8FAFC;        /* Slate 50 — Soft, non-glare canvas */
  --color-foreground: #0F172A;        /* Slate 900 — High-contrast primary text */
  --color-card: #FFFFFF;              /* Pure White — Structured container panels */
  --color-card-foreground: #0F172A;
  --color-surface-hover: #F1F5F9;     /* Slate 100 — Interactive row hover */

  /* Muted & Structural */
  --color-muted: #F1F5F9;             /* Slate 100 — Pill and tag backgrounds */
  --color-muted-foreground: #475569;  /* Slate 600 — Secondary captions and timestamps */
  --color-border: #E2E8F0;            /* Slate 200 — Structural 1px division borders */
  --color-border-subtle: #EDF2F7;

  /* Semantic State Tokens */
  --color-overdue: #DC2626;           /* Crimson Red — Invoices past due date */
  --color-overdue-bg: #FEF2F2;
  --color-overdue-border: #FECACA;

  --color-due-soon: #D97706;          /* Amber 600 — Due within next 7 days */
  --color-due-soon-bg: #FFFBEB;
  --color-due-soon-border: #FDE68A;

  --color-committed: #2563EB;         /* Blue 600 — Active buyer payment promise */
  --color-committed-bg: #EFF6FF;
  --color-committed-border: #BFDBFE;

  --color-paid: #059669;              /* Emerald 600 — Settled in full */
  --color-paid-bg: #ECFDF5;
  --color-paid-border: #A7F3D0;

  --color-partial: #6366F1;           /* Indigo 600 — Partial payment recorded */
  --color-partial-bg: #EEF2FF;
  --color-partial-border: #C7D2FE;

  --color-disputed: #7C3AED;          /* Violet 600 — Formal query / disputed invoice */
  --color-disputed-bg: #F5F3FF;
  --color-disputed-border: #DDD6FE;

  /* Focus & Accessibility */
  --color-ring: #1E3A5F;              /* 2px high-visibility keyboard ring */
}
```

### 2.2 Typography Scale

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
```

| Token | Size / Line-Height | Weight | Font Family | Usage |
|---|---|---|---|---|
| `display-lg` | 28px / 36px | Bold (700) | Plus Jakarta Sans | Executive Metric Figures (KPI Cards) |
| `h1` | 24px / 32px | SemiBold (600) | Plus Jakarta Sans | Main Page Headers |
| `h2` | 18px / 24px | SemiBold (600) | Plus Jakarta Sans | Section Headers, Drawer Titles |
| `h3` | 15px / 22px | SemiBold (600) | Plus Jakarta Sans | Card Titles, Modal Headers |
| `body-md` | 14px / 20px | Regular (400) | Plus Jakarta Sans | Standard Body, Table Content |
| `body-sm` | 13px / 18px | Regular / Medium | Plus Jakarta Sans | Secondary Details, Timelines, Form Inputs |
| `caption` | 12px / 16px | Medium (500) | Plus Jakarta Sans | Badges, Microcopy, Column Headers |
| `financial` | 14px–28px | Medium / Bold | JetBrains Mono / `tabular-nums` | Indian Rupee amounts, Invoice IDs, Due Dates |

### 2.3 Spacing, Borders & Radius
- **Base Rhythm:** 8px grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`).
- **Corner Radii:**
  - Containers / Cards: `rounded-lg` (`8px`)
  - Badges / Status Pills: `rounded-full` (`9999px`)
  - Buttons / Inputs / Controls: `rounded-md` (`6px`)
- **Elevation / Shadows:**
  - Standard Cards: `border border-slate-200 shadow-sm`
  - Dropdowns / Popovers: `shadow-md border border-slate-200`
  - Modals / Slide-over Drawers: `shadow-xl border border-slate-200`

---

# 3. Application Shell & Navigation

### 3.1 Layout Architecture (Desktop 1440px)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [Logo] MSME Receivables      [Search Invoices / Buyers (Ctrl+K)]     [Tenant: ABC] 🔔 │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ 📊 Overview  │                                                                         │
│ 📄 Invoices  │  Main Work Area (Max width 1440px, centered with px-8 py-6)             │
│ 👥 Buyers    │                                                                         │
│ ⏱ Activity   │                                                                         │
│ ⚙️ Settings  │                                                                         │
│              │                                                                         │
│ [Support]    │                                                                         │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

- **Sidebar (Desktop):** Persistent `w-60` (240px) navigation on the left. High contrast, clean icon + text layout.
- **Top Bar (Desktop):** `h-14` (56px) border-b containing global shortcut search (`Ctrl+K`), Business Switcher, Notifications, and User Profile.
- **Responsive Navigation:**
  - Desktop (>1024px): Persistent Sidebar.
  - Tablet (768px–1024px): Collapsible icon-only Rail (`w-16`).
  - Mobile (<768px): Top bar with hamburger trigger to slide-out drawer + compact bottom action dock for quick invoice addition.

---

# 4. Core Screen 1: Executive Receivables Dashboard

### 4.1 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Receivables Overview                                          [+ Record Payment] [+ Add Invoice] │
│ Last synced: Today, 14:32 · 12 Active Invoices                                          │
├───────────────────┬───────────────────┬───────────────────┬─────────────────────────────┤
│ Total Outstanding │ Overdue           │ Due in 7 Days     │ Collected (MTD)             │
│ ₹14,85,000        │ ₹4,20,000         │ ₹2,65,000         │ ₹8,00,000                   │
│ 12 Invoices       │ 4 Invoices        │ 3 Invoices        │ 7 Invoices                  │
│                   │ ⚠️ Action required│ ⏳ Follow-up queue │ 🟢 +18% vs last month       │
├───────────────────┴───────────────────┴───────────────────┴─────────────────────────────┤
│ 🚨 NEEDS IMMEDIATE ATTENTION (Priority Queue)                                           │
│ Invoices overdue or with broken payment commitments                                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ [!] Apex Engg Corp     · INV-2026-089  · Overdue 18 Days  · ₹1,45,000 outstanding       │
│     Commitment missed: 12 Oct (Promised ₹1,45,000 via NEFT)                             │
│     Last touch: Call on 10 Oct by Ramesh                                                │
│     [Log Follow-up]  [Record Payment]  [Open Invoice →]                                 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ [!] Bharat Tooling     · INV-2026-094  · Overdue 8 Days   · ₹85,000 outstanding         │
│     No commitment on record · Last touch: WhatsApp 3 days ago                           │
│     [Log Follow-up]  [Record Payment]  [Open Invoice →]                                 │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 KPI Summary Cards
Each card displays:
1. **Label:** Uppercase tracking-wider `text-xs font-medium text-slate-500`.
2. **Metric:** `text-2xl font-bold font-mono tracking-tight text-slate-900`.
3. **Context Pill:** Number of invoices affected + operational sub-status.
4. **Interactive Drill-down:** Clicking a card filters the Invoices Table below directly (e.g., clicking "Overdue" filters by `status=overdue`).

---

# 5. Core Screen 2: Receivables Invoices Explorer (Data Table)

### 5.1 Controls & Filter Toolbar
- **Faceted Search:** Free text matching Invoice ID, Buyer Name, GSTIN, or PO number.
- **Status Filter Chips:** `All (12)` | `Overdue (4)` | `Due Soon (3)` | `Committed (3)` | `Paid (7)`.
- **Aging Tiers:** `< 15 Days` | `16–30 Days` | `31–45 Days` | `> 45 Days (MSMEDA Threshold)`.
- **Sorting:** Default by `urgency_score` (Overdue days descending + commitment proximity).

### 5.2 Table Column Specifications

| Column | Alignment | Type / Component | Cell Rendering Rules |
|---|---|---|---|
| **Invoice #** | Left | Link / Mono | `INV-2026-089` (SemiBold, blue hover) + PO # subtitle |
| **Buyer** | Left | Text + Chip | Primary company name + City/GST tag |
| **Invoice Date** | Left | Date | `15 Aug 2026` (`text-slate-600`) |
| **Due Date** | Left | Status Date | `30 Sep 2026` (Red if overdue, Amber if ≤ 7d) |
| **Total Amount** | Right | Mono Currency | `₹1,45,000` (`tabular-nums font-mono`) |
| **Balance Due** | Right | Mono Currency | `₹1,45,000` (Bold `tabular-nums`) |
| **Status Badge** | Center | Pill with Icon | `[● OVERDUE 18d]` / `[● COMMITTED 20 Oct]` |
| **Next Action** | Left | Text + Icon | "Call buyer today" or "Await NEFT by 20 Oct" |
| **Actions** | Right | Action Menu | Dropdown trigger `[...]` + direct `[Follow-up]` icon |

### 5.3 Resilient Table Layout
- Table is wrapped in an `overflow-x-auto` container with sticky header (`bg-slate-50 border-b`).
- Row height: standard `44px` on desktop; hover effect: `hover:bg-slate-50/80`.
- Text clipping safeguards: Company names truncate with accessible `title` tooltip; numeric figures never wrap or clip.

---

# 6. Core Screen 3: Invoice Detail & Command Center (Centerpiece)

This is the most critical screen in the product. It uses a **65% / 35% two-column split layout** on desktop.

### 6.1 Layout Wireframe

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Invoices  /  INV-2026-089                                                    │
├────────────────────────────────────────────────────────────┬───────────────────────────┤
│ 📄 Apex Engineering Corp                                   │ 💰 RECEIVABLE SUMMARY     │
│ Invoice #INV-2026-089   [● OVERDUE · 18 DAYS]              │ Outstanding: ₹1,45,000    │
│ Issued: 15 Aug 2026  ·  Due: 30 Sep 2026 (Net 45)          │ Original:    ₹1,45,000    │
├────────────────────────────────────────────────────────────┤ Paid to Date:₹0           │
│ ACTION DOCK                                                │ Credit Term: 45 Days      │
│ [📞 Log Follow-up]  [🤝 Log Commitment]  [💵 Record Payment]│ MSMEDA 45d:  Exceeded ⚠️  │
├────────────────────────────────────────────────────────────┼───────────────────────────┤
│ 🤝 CURRENT BUYER COMMITMENT                                │ 🏢 BUYER PROFILE          │
│ Status: ⚠️ OVERDUE (Promised on 12 Oct 2026)                │ Apex Engineering Corp     │
│ Amount: ₹1,45,000 via NEFT                                 │ Contact: Rajesh Verma (VP)│
│ Channel: WhatsApp confirmation                             │ Phone: +91 98200 XXXXX    │
│ Note: "Promised to release payment once director signs"    │ Email: accounts@apex.com  │
├────────────────────────────────────────────────────────────┼───────────────────────────┤
│ ⏱ COMPLETE OPERATIONAL TIMELINE                           │ 📎 ATTACHED EVIDENCE (3)  │
│                                                            │ 📄 Tax_Invoice_089.pdf    │
│ [●] 14 Oct · 11:30 AM  —  FOLLOW-UP (Phone Call)           │    Verified · 1.2 MB      │
│     Actor: Ramesh (Finance Ops)                            │ 🖼️ WhatsApp_Promise.png   │
│     "Spoke with accounts officer. Director traveling.      │    Commitment Proof       │
│      Agreed to follow up on Monday 19 Oct."                │ 📄 Delivery_Challan.pdf   │
│                                                            │    Signed POD · 850 KB    │
│ [●] 10 Oct · 04:15 PM  —  PAYMENT COMMITMENT               │                           │
│     Actor: Ramesh · Channel: WhatsApp                      │ [+ Upload New Evidence]   │
│     "Buyer committed to clear ₹1,45,000 on 12 Oct."        │                           │
│                                                            │                           │
│ [●] 30 Sep · 00:00 AM  —  DUE DATE REACHED                 │                           │
│     System event: Invoice became overdue (45 days)         │                           │
│                                                            │                           │
│ [●] 15 Aug · 10:00 AM  —  INVOICE CREATED                  │                           │
│     Actor: Vinay · Amount ₹1,45,000 · Terms: Net 45        │                           │
└────────────────────────────────────────────────────────────┴───────────────────────────┘
```

### 6.2 Key Subsections on Detail Screen

1. **Header & Context:**
   - Buyer title with external company registry / GST validation status.
   - Status badge with composite indicators (e.g. `[OVERDUE: 18 Days]`, `[COMMITMENT DUE TODAY]`).
2. **Interactive Action Dock:**
   - Direct, high-visibility buttons for the four primary actions (`Log Follow-up`, `Log Commitment`, `Record Payment`, `Attach Evidence`).
   - Clicking any action opens a focused slide-over sheet without navigating away.
3. **Commitment Tracker Banner:**
   - Prominently displays the latest active commitment or warns if a commitment was missed.
4. **Audit Timeline:**
   - Chronological vertical feed with clear visual connectors (`border-l-2 border-slate-200`).
   - Distinct icons for each event type (Invoice created, Due date passed, Follow-up call, WhatsApp record, Payment received, Evidence uploaded).
   - Author, channel, notes, and exact timestamp recorded on each entry.
5. **Right Rail Context:**
   - Real-time balance calculations with breakdown.
   - Direct contact card with one-click call / WhatsApp link.
   - Evidence file manager with thumbnail preview and server-signed secure download.

---

# 7. Slide-Over Modals & Form Sheets

To prevent user context loss, all operational entries are handled via slide-over sheets (`Sheet` component, `w-[440px]`).

### 7.1 "Log Follow-Up" Sheet
- **Date & Time:** Default to current date/time; editable.
- **Channel Selector:** Pill group (`Phone Call`, `WhatsApp`, `Email`, `In-Person`, `Courier Notice`).
- **Contact Person:** Dropdown of buyer contacts or quick-add text.
- **Summary / Notes:** Multi-line text field (`min-h-[100px]`) with placeholder: *"Summarize discussion, buyer sentiments, or operational obstacles..."*
- **Outcome:** Radio buttons (`Promise to pay`, `Requested invoice copy`, `Dispute / deduction claimed`, `No response`, `Call rescheduled`).
- **Commitment Shortcut:** Checkbox: `[x] Buyer promised a specific payment date` (expands commitment fields inline).
- **Next Follow-up Date:** Date picker for automatic queue scheduling.

### 7.2 "Record Payment Commitment" Sheet
- **Commitment Date:** Required date picker.
- **Committed Amount:** Numeric field (defaults to remaining balance, editable for partial commitments).
- **Communication Channel:** WhatsApp, Email, Phone, In-person.
- **Evidence Attachment:** Drag-and-drop file upload for screenshot of WhatsApp message, email PDF, or letter.
- **Notes:** Explanatory context.

### 7.3 "Record Payment" Sheet
- **Payment Date:** Date picker.
- **Amount Received:** Currency input in INR (validates: cannot exceed outstanding balance).
- **Payment Mode:** NEFT/RTGS, Cheque, UPI, IMPS, Cash, Bank Transfer.
- **Reference / UTR Number:** Text input for bank transaction tracking.
- **Settlement Type:** Auto-calculated (`Full Settlement` if balance reaches 0, else `Partial Payment`).
- **Deposit Bank Account:** Dropdown of company accounts.
- **Payment Slip / Evidence:** Optional file upload.

---

# 8. Status Design & Semantics

Status indicators follow a **Triple-Signal Rule** (Color + Icon + Text Label). Never rely on color alone.

| Status | Text Label | Pill Background / Text | Lucide Icon | Meaning |
|---|---|---|---|---|
| **OVERDUE** | `Overdue (X days)` | `bg-red-50 text-red-700 border-red-200` | `<AlertCircle className="w-3.5 h-3.5" />` | Past payment terms |
| **DUE SOON** | `Due in X days` | `bg-amber-50 text-amber-700 border-amber-200` | `<Clock className="w-3.5 h-3.5" />` | Due within 7 days |
| **COMMITTED**| `Committed (DD Mon)`| `bg-blue-50 text-blue-700 border-blue-200` | `<CalendarCheck className="w-3.5 h-3.5" />` | Buyer promised date |
| **PAID** | `Paid (Full)` | `bg-emerald-50 text-emerald-700 border-emerald-200` | `<CheckCircle2 className="w-3.5 h-3.5" />` | Zero balance left |
| **PARTIAL** | `Partial (X% paid)`| `bg-indigo-50 text-indigo-700 border-indigo-200`| `<PieChart className="w-3.5 h-3.5" />` | Part payment logged |
| **DISPUTED**| `Disputed` | `bg-purple-50 text-purple-700 border-purple-200`| `<HelpCircle className="w-3.5 h-3.5" />` | Quality/billing issue |

---

# 9. Accessibility & Keyboard Navigation (WCAG 2.1 AA)

1. **Color Contrast:** All body text and badges maintain a minimum contrast ratio of `4.5:1` against background.
2. **Keyboard Traps & Modals:**
   - Modals and slide-overs trap focus when open.
   - Pressing `Escape` closes modals and returns focus to the trigger button.
3. **Focus States:**
   - `focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2` on all interactive buttons, inputs, links, and table rows.
4. **Resilient Text & Chip Overflow:**
   - Chips use `whitespace-nowrap shrink-0`.
   - Long company names or descriptions truncate gracefully with `max-w-[200px] truncate` and display full value on hover and screen-reader accessible label.
5. **Live Region Status:**
   - Asynchronous updates (e.g., payment recorded, filter changes) communicate via `<div role="status" aria-atomic="true" className="sr-only">`.
6. **Reduced Motion:**
   - All animations respect `@media (prefers-reduced-motion: reduce)` with instantaneous transitions (`transition-none`).

---

# 10. Financial Trust & Data Integrity Rules

1. **Indian Currency Standard:**
   - All rupee values formatted using the Indian numbering system (`₹1,45,000`, `₹12,50,000`, `₹1,00,00,000`).
   - Monospace tabular numerals (`font-mono tabular-nums`) to ensure vertical column alignment.
2. **Provenance Labels:**
   - The UI explicitly marks where every piece of data originates:
     - `[User Input]` — Manually entered details.
     - `[Calculated]` — Balance derived by subtracting recorded payments from invoice total.
     - `[System Generated]` — Automatic due date calculation or overdue day counts.
     - `[Attached Evidence]` — Uploaded documentary evidence.
3. **Disclaimer on Evidence:**
   - File attachment areas clearly state: *"Uploaded documents represent user-recorded operational evidence. They are not legal dispute determinations."*

---

# 11. Empty, Loading & Error States

### 11.1 Skeleton Loading
- Table skeleton displays 6 animated pulse rows with distinct column widths (`animate-pulse bg-slate-200`).
- Metric cards display placeholder pulse blocks instead of layout shifts.

### 11.2 Meaningful Empty States
- **No Invoices:**
  - Icon: `<FileText className="w-12 h-12 text-slate-300" />`
  - Heading: "No invoices recorded yet"
  - Description: "Add your first B2B invoice to begin tracking due dates, follow-ups, and payment commitments."
  - Action: Primary CTA `[+ Create Invoice]`.
- **No Overdue Invoices:**
  - Icon: `<CheckCircle2 className="w-12 h-12 text-emerald-500" />`
  - Heading: "Zero overdue receivables"
  - Description: "All current invoices are within their agreed credit terms."

### 11.3 Error Handling
- Errors are displayed inline next to the affected field or as accessible banner alerts (`Alert` component).
- Error messages offer actionable remedy: *"Failed to save follow-up. Check network connection and [Try Again]."*
- Raw stack traces or internal database IDs are strictly forbidden in user-facing surfaces.

---

# 12. Responsive Breakpoints

| Breakpoint | Viewport | Layout Adjustments |
|---|---|---|
| **Desktop** | `≥ 1024px` | Full 240px sidebar, 12-column grid, 65/35 detail split, complete table view |
| **Tablet** | `768px – 1023px` | Collapsible sidebar rail (64px), horizontal scroll table, single-column detail with tabs |
| **Mobile** | `< 768px` | Drawer navigation, bottom action bar, table converts to card-based list, stacked form sheets |

---

# 13. UX Quality Bar & Stranger-Test Verification

The interface must pass the **1-Minute Stranger Test**:
1. Within 10 seconds, a user identifies how much money is overdue.
2. Within 20 seconds, the user identifies which specific invoice needs urgent action.
3. Within 30 seconds, the user opens the invoice detail and reads the last follow-up note.
4. Within 45 seconds, the user records a new follow-up or payment commitment without assistance.
5. At all times, the user trusts the calculations because the audit breakdown is visibly clear.

---

# Final master directive

The public website should be visually memorable: editorial serif display type, clean white space, bright blue CTAs, restrained cyan/blue atmospheric effects, crisp product previews, alternating feature stories, and subtle purposeful animation. The authenticated application should feel dependable during daily financial work: calm neutral surfaces, readable financial data, clear status semantics, efficient navigation, responsive invoice views, accurate balances, and trustworthy action flows.

No emoji. SVG icons only. No unnecessary dependency duplication. No fake financial data or unsupported claims. Motion and backgrounds must never compromise readability, accessibility, performance, or financial trust.
