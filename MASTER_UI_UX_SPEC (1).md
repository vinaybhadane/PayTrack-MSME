# MASTER_UI_UX_SPEC.md
## Unified UI/UX Design System and Implementation Brief
### Premium B2B FinTech SaaS — Marketing Website + Receivables Application

**Version:** 4.0 — conflict-resolved master specification  
**Scope:** Marketing website, authenticated app, pipeline/leads, receivables, invoice workflows, visual system, motion, accessibility, responsive behavior, and implementation dependencies.  
**Design principle:** Expressive outside. Precise inside.  
**Icon rule:** SVG icons only. Never use emoji characters in UI, wireframes, examples, labels, or documentation intended for implementation. Use placeholders such as `[icon: file-text]`.

## 0. Master implementation instructions

Treat this file as the single source of truth for the public website and authenticated application. Before coding, inspect `AGENTS.md`, `README.md`, `package.json`, the lockfile, existing UI specifications, routes, APIs, data models, and current component/CSS systems. Preserve working business logic, authentication, permissions, API contracts, and data models. Reuse installed dependencies and remove or map conflicting legacy tokens instead of creating a parallel design system.

1. Build the marketing website and authenticated application as distinct layouts with shared semantic design tokens.
2. Use a consistent SVG icon system, preferably the existing project system or `lucide-react`. Replace every emoji placeholder with an explicit icon name, e.g. `[icon: chart-no-axes-combined]`, `[icon: file-text]`, `[icon: users]`, `[icon: triangle-alert]`, `[icon: wallet]`, `[icon: handshake]`, `[icon: phone]`.
   In ASCII/wireframe examples, write `[icon: icon-name]` or `[status: status-name]`; never include emoji as a shorthand for an icon. Wireframe placeholders must map to actual SVG icons during implementation.
3. Never fabricate financial metrics, customer logos, testimonials, integrations, security certifications, legal guarantees, or product capabilities. Clearly mark seed/demo data in development.
4. Every visible control must perform its advertised action. Do not ship decorative buttons, dead links, or fake successful mutations.
5. Marketing previews may be mockups; authenticated operational screens must use real components and actual data.
6. Mobile is a deliberate composition, not a desktop layout scaled down.
7. If a feature is unsupported by the current backend, preserve existing behavior and document the gap rather than faking functionality.

## 1. Product experience and conflict-resolution rules

**Product name:** Use the existing product name and approved brand assets from the repository. If none exist, use `[Product Name]` as a temporary content token; do not invent a final brand name. Centralize marketing copy so it can be replaced without rewriting layout components.

**Product promise:** Help businesses connect lead and buyer relationships with invoices, receivables, follow-ups, payment commitments, confirmed payments, and supporting evidence in one dependable workspace. Do not promise automated collection, integrations, AI features, or legal/compliance outcomes unless the product actually supports them.

### Starter copy direction

Use these as editable draft copy, not immutable branding. Replace `[Product Name]` with the repository's real product name before launch.

- **Hero headline:** “From lead to paid. All in one place.”
- **Hero supporting copy:** “Keep buyer relationships, invoices, follow-ups, and payment history connected in one clear workspace.”
- **Primary CTA:** “Get started” (only if a real sign-up/onboarding route exists).
- **Secondary CTA:** “Explore the workspace” or “See how it works” (only if it leads to a real section or product preview).
- **Feature copy direction:** describe a specific workflow and its user benefit in plain language; avoid unverifiable superlatives such as “best”, “guaranteed”, or “fully automated”.
- **Trust copy:** mention security, privacy, integrations, compliance, or support only when the implementation and current policy substantiate the statement.

### Visual roles

- **Marketing:** expressive editorial typography, generous but deliberate spacing, vivid blue CTA, large product previews, restrained blue/cyan atmosphere, and concise feature storytelling.
- **Authenticated app:** neutral surfaces, efficient navigation, compact financial summaries, clear invoice states, accessible forms, and audit-friendly history.
- **Shared:** consistent semantic colors, typography roles, SVG icon language, focus states, spacing scale, and motion principles.

### Which rule wins if documents or examples conflict?

1. This master document overrides older appendices and individual screen wireframes.
2. For dashboard, invoice, payment, status, and audit behavior, the detailed authenticated-product requirements in **Part III** win over any generic marketing mockup.
3. For the public website, the marketing requirements in **Part II** win over the restrained app visual rules.
4. The unified token table in Section 3 overrides any older `--color-*`, `--brand-*`, navy, emerald, or accent token definitions. Map legacy tokens to the canonical values; do not keep competing palettes.
5. The dependency section in Section 4 is the only authoritative dependency list. `motion` and `framer-motion` are alternatives, not packages to install together.
6. Responsive, reduced-motion, and accessibility rules in Parts IV–V are canonical. Delete duplicate conflicting copies from older appendices after migrating any unique requirements.
7. Marketing gradients/glows are permitted only as specified in Section 2 and Part II. “Avoid generic gradients” means avoid gratuitous decorative gradients; it does not prohibit the defined hero glow.
8. Framework-specific utility examples are illustrative only. Prefer the repository's established styling approach and responsive, fluid layout rules over hard-coded widths/classes.

## 2. Unified design tokens — single source of truth

Use this token set across the marketing website and authenticated application. Do not maintain a second `--color-*` or `--brand-*` palette in an appendix. If legacy tokens exist, map them to these canonical tokens and gradually remove duplicate aliases.

### Canonical color tokens

| Token | Value | Canonical usage |
|---|---|---|
| `--color-brand-ink` | `#10233F` | Brand text, marketing headlines, app headings |
| `--color-text-primary` | `#0F172A` | Primary app text and high-emphasis labels |
| `--color-text-secondary` | `#475569` | Body copy and supporting text |
| `--color-text-muted` | `#64748B` | Non-critical metadata only |
| `--color-primary` | `#145DFF` | Primary CTA, links, active navigation, focus accents |
| `--color-primary-hover` | `#0847D9` | Hover/pressed state for primary actions |
| `--color-primary-soft` | `#EAF2FF` | Active navigation and selected surfaces |
| `--color-cyan` | `#51DDF5` | Decorative marketing glow only; never a primary action color |
| `--color-marketing-page` | `#FCFDFF` | Marketing canvas |
| `--color-marketing-surface` | `#FFFFFF` | Marketing cards and previews |
| `--color-marketing-blue-surface` | `#F1F8FF` | Selected marketing feature/CTA sections |
| `--color-app-page` | `#F6F8FB` | Authenticated app canvas |
| `--color-app-surface` | `#FFFFFF` | App cards, forms, tables, dialogs |
| `--color-border` | `#E2E8F0` | Standard dividers and panel borders |
| `--color-border-subtle` | `#EDF2F7` | Low-emphasis separators |
| `--color-success` | `#047857` | Confirmed paid/completed states only |
| `--color-success-bg` | `#ECFDF5` | Paid/completed status background |
| `--color-warning` | `#B45309` | Due soon / needs attention |
| `--color-warning-bg` | `#FFFBEB` | Due-soon status background |
| `--color-danger` | `#B91C1C` | Overdue, failed, destructive states |
| `--color-danger-bg` | `#FEF2F2` | Overdue/error status background |
| `--color-info` | `#1D4ED8` | Informational and committed states |
| `--color-info-bg` | `#EFF6FF` | Informational status background |
| `--color-partial` | `#5B50C8` | Partial-payment status |
| `--color-disputed` | `#7E22CE` | Disputed status |
| `--color-focus` | `#2563EB` | Visible keyboard focus ring |

**CTA/status rule:** primary CTAs are always brand blue. Emerald/green is not a primary CTA color; reserve it for confirmed paid/completed states. `#1E3A5F` from the older receivables palette is not a separate canonical token; map it to `--color-brand-ink` or an explicitly documented legacy alias only if a migration requires it.

**Background/gradient rule:** gradients are allowed only as restrained, decorative marketing treatments—especially a static blue/cyan glow behind the hero product preview and selected marketing panels. They are not allowed behind financial tables, forms, invoice details, or dashboard data. The app canvas remains neutral and surface-based. This resolves the apparent conflict between “avoid generic gradients” and the marketing glow direction: avoid generic/continuous gradient decoration; retain the specifically defined marketing-only glow.

**Status rule:** every status uses a text label and, where useful, an SVG icon. Never communicate state through color alone. Centralize status semantics in shared code.

### Typography

- **Marketing display:** choose one of `DM Serif Display` or `Instrument Serif`.
- **Application/body:** choose one of `Inter` or `Manrope` (or retain the project's existing accessible sans-serif).
- **Financial values:** use the interface font with tabular numerals. A monospaced font is optional for selected identifiers only.
- Load fonts through the framework's supported strategy or self-hosting to reduce layout shift. Do not load multiple competing font families.
- Use the serif only for marketing display headlines, not tables, form labels, or dense app copy.

| Element | Desktop guidance | Mobile guidance |
|---|---|---|
| Marketing hero | `clamp(3rem, 5.5vw, 5.5rem)` | `clamp(2.5rem, 11vw, 3.6rem)` |
| Marketing section heading | `clamp(2.25rem, 3.6vw, 3.75rem)` | `clamp(2rem, 8vw, 2.75rem)` |
| App page title | 1.5–2rem | 1.375–1.625rem |
| Body copy | 1–1.125rem | 0.9375–1rem |
| UI/table text | 0.8125–0.9375rem | 0.8125–0.9375rem |
| Metadata | 0.75–0.8125rem | 0.75–0.8125rem |

Metadata must not be used for critical financial information. Use comfortable line-height and preserve readability at browser zoom.

### Spacing, radius, and elevation

Use a 4px base spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px.

| Context | Radius guidance | Elevation guidance |
|---|---|---|
| Marketing feature cards / preview panels | 16–24px | Soft layered shadow plus fine border |
| Marketing CTA buttons | Pill or 10–14px | Small hover shadow; no oversized glow |
| App panels/cards | 10–16px | Mostly border-led; subtle shadow only where useful |
| App inputs/buttons | 8–12px | Clear focus ring; minimal shadow |
| Tables and table rows | Keep surfaces square or lightly rounded at container level | No floating card effects per row |

The different radii are intentional: marketing cards are softer and more expressive; operational controls and panels are tighter and more precise. Avoid hard-coded component widths tied to one framework. Prefer fluid constraints such as `min()`, `max-width`, grid/flex rules, and responsive tokens. Tailwind arbitrary values are acceptable only when Tailwind is confirmed as the project stack and the value is justified.

### Theme and dark mode

- Light mode is the default and must match the visual references.
- If the product already supports dark mode, preserve it and map all canonical semantic tokens to dark values. If not, implement a token-ready theme architecture; do not ship a half-finished toggle.
- Dark mode must preserve semantic status meaning, readable financial tables, chart contrast, focus visibility, borders, and dialog/sheet surfaces. Do not merely invert colors.
- Persist the selected theme using the project's existing preference mechanism and avoid a flash of the wrong theme during startup. Respect system preference if no explicit user preference exists.
- Marketing blue/cyan glow should be reduced in dark mode so it does not bloom excessively. Never use glow as the only visual separation.

## 3. Animation and visual effects — mandatory implementation rules

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

## 4. Background assets and images

- Prefer CSS radial gradients, low-contrast linear gradients, and lightweight SVG contours/grid lines for marketing backgrounds.
- Do not generate or add a raster background unless it clearly improves the final composition. The design must work without one.
- If a custom raster texture is justified, store it locally under `public/images/`, optimize its size, provide a fallback color, and avoid a large file that slows the first render.
- Use real product screenshots when available. During development, create maintainable HTML/CSS mockups rather than baking the interface into a static image.
- Give informative screenshots meaningful alt text. Decorative SVGs/backgrounds must be hidden from assistive technology and must not intercept pointer events.
- Keep product mockups crisp, consistently framed, lightly bordered, and cropped to the feature being explained. Never scale a full desktop UI down until its text is unreadable on mobile.

## 5. Dependency installation policy

Inspect `package.json`, the lockfile, and existing components before installing packages. Commands below are conditional recommendations, not a requirement to install every library. Preserve the current framework and compatible versions.

### Baseline, only if missing

```bash
npm install lucide-react clsx tailwind-merge
```

- `lucide-react`: consistent SVG icon set.
- `clsx`: conditional class composition.
- `tailwind-merge`: merge Tailwind utilities only if the project uses Tailwind. If it does not, omit this package.

### Animation, only if needed

```bash
npm install motion
```

Use the current `motion` package if no equivalent is present. If the repository already uses `framer-motion`, keep it and do not install `motion` as a second animation engine. CSS transitions are sufficient for simple hover/focus states. Do not add GSAP unless genuinely complex timeline choreography is required.

### Accessible primitives, if not already provided

```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```

Use only missing primitives. If the project uses shadcn/ui, follow its established component workflow and avoid duplicate wrappers.

### Forms, data UI, and notifications — install only when needed

```bash
npm install react-hook-form zod @hookform/resolvers
npm install @tanstack/react-table
npm install recharts
npm install sonner
npm install date-fns
```

- `react-hook-form`, `zod`, `@hookform/resolvers`: complex invoice/payment forms and schema validation. Validate on the server too.
- `@tanstack/react-table`: complex sorting/filtering/selection/pagination.
- `recharts`: charts that support a real decision; not decorative charts.
- `sonner`: notifications if no notification system exists.
- `date-fns`: date formatting/calculation if the project has no suitable date utility. Centralize overdue/status calculations rather than duplicating them in components.

### Quality tools — only if missing

```bash
npm install -D prettier @playwright/test
npx playwright install
```

Keep the repository's existing ESLint, TypeScript, test runner, and scripts. Do not overwrite configuration without inspection.

### Dependency decision rule

Choose one library per responsibility. Do not install both `motion` and `framer-motion`, multiple icon libraries, multiple component frameworks, or duplicate chart/table/form systems. Verify compatibility against the installed React/Next.js and CSS framework versions.

## 6. Implementation sequence

1. Audit repository instructions, framework/version, routes, components, tokens, dependencies, API contracts, and current behavior.
2. Establish the canonical design tokens and map/remove legacy aliases.
3. Build shared primitives and interaction states before page-specific styling.
4. Implement the marketing page in section order, using reusable components and product previews.
5. Implement the authenticated shell and dashboard using real data and existing APIs.
6. Implement the lead/pipeline workflow, invoice explorer, invoice command center, follow-up, commitment, payment, and evidence flows.
7. Add purposeful motion and verify reduced-motion behavior.
8. Test mobile layouts, accessibility, financial status logic, empty/loading/error/success states, and all actions.
9. Run existing lint, type-check, tests, and production build.
10. Report completed work, known gaps, and any requirements that could not be implemented because the backend or product capability is missing.

# Part II — Public Marketing Website

## 1. Global page layout

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

## 2. Landing page specification

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

# Part III — Authenticated Application and Financial Workflows

## 1. Authenticated product experience

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

**First-time / empty dashboard:**
- If the workspace has no invoices or activity, do not show zero-filled charts that imply a trend or populate fictional KPIs.
- Show a welcoming heading using the actual workspace/product name where available, one sentence explaining what can be set up, and a short ordered checklist (e.g. add/import buyers, create/import the first invoice, record a follow-up) based only on supported capabilities.
- Provide one primary next action and optional secondary import/help action only if those routes exist.
- Explain that metrics will appear after real records are added. Keep the normal navigation visible so the user can explore.
- Distinguish “no data yet” from “data failed to load”; network/API failure must show an error state and retry, not an empty state.

### 6.3 Pipeline / leads

If lead management is part of the product:
- Use a table/list or kanban board according to the real workflow.
- Show lead/account name, stage, owner, estimated value where applicable, last activity, and next action.
- Keep stages understandable and configurable only if the backend supports configuration.
- Filters and search should be visible and easy to reset.
- On mobile, prefer compact cards with stage and next action clearly shown.
- Do not visually mix sales pipeline status with invoice/payment status.

**Pipeline screen requirements (mandatory if lead/pipeline navigation exists):**
- Show a clear stage-based pipeline with stages matching the actual business workflow; do not invent stages without checking the current data model.
- Provide a list/table view as an accessible alternative to any board/kanban view.
- Each lead card/row should show company/buyer, stage, owner, last activity, next action/date, and value only when those fields exist.
- Support search, filtering, sorting, and stage changes only where backed by real functionality and permissions.
- Make drag-and-drop optional; every stage change must also be possible by keyboard and non-drag controls. Confirm destructive or consequential stage changes when required.
- On mobile, use a stage filter plus stacked lead cards or a horizontally scrollable stage navigator; never squeeze a wide kanban board into the viewport.
- Include loading, empty, no-results, error, and permission states. For a new workspace, show a concise onboarding empty state with one primary action such as “Add your first lead” only if that action exists.

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

# Part IV — Responsive Behavior

## 1. Responsive behavior and breakpoints

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

# Part V — Accessibility, Content, and States

## 1. Accessibility and content clarity

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

## 2. States that must be designed

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

# Part VI — Component Architecture

## 1. Suggested component inventory

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

## 2. Definition of done

The UI is ready for review only when:

- [ ] Desktop landing page follows the supplied reference's visual direction.
- [ ] Mobile layout is intentionally composed and has no horizontal overflow.
