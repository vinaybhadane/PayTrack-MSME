# AGENTS.md

## Project: MSME Delayed-Payment / Invoice Workflow Platform

> This file is the operating instruction set for AI coding agents working on this repository.
> Read this file and every document in `/docs` before making architectural, product, UX, or implementation decisions.

---

## 1. Project Context

### Innovation Theme

**FinTech**

### HackFront objective

The project is being developed as a HackFront Module 1 prototype.

HackFront emphasizes:

- problem-first thinking
- evidence before assumptions
- a specific and researchable problem statement
- explicit exclusions
- one meaningful product flow
- validation with real people
- reviewing AI-generated work rather than blindly accepting it
- documenting how the problem statement evolves

The initial problem statement is **not considered permanently validated**.

The project must preserve the distinction between:

- documented external evidence
- direct user evidence
- inference
- hypothesis
- assumption
- future product opportunity

---

# 2. Core Problem

The current research-derived problem is:

> **Micro and Small Enterprises (MSEs) in India face significant working-capital pressure when B2B customers delay payments for goods and services sold on credit. Before a payment becomes a formal dispute, suppliers often rely on fragmented workflows such as spreadsheets, WhatsApp messages, phone calls, paper records, and accountants to track invoice due dates, follow-ups, buyer payment commitments, and supporting evidence. This makes it difficult to maintain a consistent view of what is outstanding, what a buyer has committed to pay and when, what follow-up has already occurred, and what evidence is available, increasing administrative effort and creating uncertainty around cash flow and collection. The scale of documented delayed-payment exposure in India's MSE sector indicates that delayed B2B payments are a significant financial-management problem, while the specific pre-dispute workflow gap and its severity remain hypotheses that must be validated through conversations and observed behaviour of real MSE suppliers.**

This is a **research hypothesis that must be validated**, not a claim that the proposed software is already proven to solve the problem.

---

# 3. Product Principle

Build around this workflow:

**Invoice → Due Date → Payment Commitment → Follow-up → Evidence → Payment**

The prototype should help a supplier maintain a coherent operational record around an invoice that is awaiting payment.

The product is not intended to become a generic accounting or ERP system.

---

# 4. Critical Instruction: Do Not Build a Generic FinTech App

Do NOT drift into a generic:

- accounting application
- ERP
- banking application
- lending application
- payment gateway
- expense tracker
- personal finance manager
- GST filing system
- legal-services platform
- debt collection agency
- credit underwriting system

The product's center of gravity must remain:

> **Managing the workflow and evidence surrounding invoices and delayed B2B payments.**

---

# 5. Evidence Discipline

Every important product decision should be traceable to one of:

1. Research evidence
2. User interview evidence
3. Prototype usability evidence
4. Explicit product requirement
5. Technical constraint
6. Clearly labelled assumption

Never turn an assumption into a fact simply because it sounds plausible.

Use labels such as:

- `EVIDENCE`
- `VALIDATED`
- `INFERENCE`
- `HYPOTHESIS`
- `ASSUMPTION`
- `UNKNOWN`

Examples:

### Evidence

Documented delayed-payment cases exist in India's formal MSE sector.

### Hypothesis

Suppliers frequently lose track of buyer payment commitments because information is spread across multiple tools.

### Assumption

A unified invoice timeline will reduce the effort required to follow up.

### Unknown

Whether suppliers would pay for this product.

---

# 6. Product Scope Discipline

Before adding a feature, answer:

> **Which specific part of the validated problem does this feature address?**

If there is no strong answer, do not add it to the MVP.

Avoid "feature inflation" caused by AI coding.

Do not add features merely because they are:

- technically impressive
- easy to generate
- visually attractive
- common in SaaS products
- useful in a hypothetical future version

---

# 7. MVP Center

The MVP must make this sequence work well:

1. Create or record an invoice
2. Define payment terms / due date
3. See invoice status
4. Identify upcoming or overdue invoices
5. Record a follow-up
6. Record a buyer's payment commitment
7. Attach or record supporting evidence
8. See the complete invoice timeline
9. Mark payment as received / partially received
10. Understand what needs attention next

This is the primary workflow.

---

# 8. UX Principles

The product should feel like a serious B2B FinTech SaaS product.

Prioritize:

- clarity
- trust
- low cognitive load
- fast scanning
- predictable navigation
- strong information hierarchy
- readable financial data
- clear statuses
- meaningful empty states
- strong form validation
- responsive layouts
- accessibility
- professional visual design

Do not create a flashy consumer-fintech interface that hides important financial information.

---

# 9. Data and Security Rules

Treat all financial/business records as sensitive.

At minimum:

- authenticate users
- enforce user/business-level authorization
- prevent cross-user data access
- validate all inputs
- validate uploaded files
- restrict file size/types
- avoid exposing secrets to the client
- use environment variables for credentials
- never commit `.env` files
- never hard-code API keys
- handle database errors safely
- do not log sensitive information unnecessarily

A user must never be able to access another user's invoices, buyers, follow-ups, payments, or evidence.

---

# 10. Legal / Financial Claims

The prototype must not claim that it:

- guarantees payment
- recovers money automatically
- provides legal advice
- determines legal liability
- adjudicates disputes
- replaces lawyers/accountants
- guarantees MSME Samadhaan outcomes
- guarantees financing
- guarantees cash-flow improvement

If legal or regulatory information is displayed, it must be sourced and clearly presented as informational.

---

# 11. AI Usage

AI may be used where it creates clear workflow value, but AI is NOT a requirement.

Do not add AI just for a hackathon "AI" label.

Potential future AI capabilities may include:

- invoice field extraction
- document classification
- follow-up summarization
- commitment extraction from uploaded communication
- anomaly detection
- overdue-risk signals

However, none of these should enter the MVP unless they support the validated core workflow.

If AI is added:

- explain what the model does
- define inputs/outputs
- handle uncertainty
- never fabricate payment commitments
- never invent invoice information
- clearly distinguish extracted information from user-entered information
- provide human review for consequential outputs

---

# 12. Engineering Standards

Use:

- TypeScript
- strict typing
- reusable components
- modular architecture
- clear naming
- input validation
- server-side authorization
- meaningful error messages
- loading states
- empty states
- skeleton states where appropriate
- responsive design
- accessible components
- maintainable database schema

Avoid:

- duplicated components
- giant files
- hard-coded business data
- fake API abstractions that add no value
- unnecessary dependencies
- premature microservices
- unnecessary complexity

---

# 13. Build Process

Follow:

**Understand → Define → Scope → Plan → Build → Test → Review → Iterate**

Before coding:

1. Read all `/docs`.
2. Identify the current version of the problem statement.
3. Identify the one flow being built.
4. Confirm MVP boundaries.
5. Confirm architecture.
6. Confirm data model.
7. Confirm UX requirements.
8. Identify unresolved assumptions.

During coding:

1. Implement one vertical slice at a time.
2. Keep the application runnable.
3. Validate each slice.
4. Do not silently expand scope.

After coding:

1. Test the happy path.
2. Test empty fields.
3. Test very long input.
4. Test unsupported input.
5. Test invalid dates and amounts.
6. Test authorization.
7. Test upload failures.
8. Test responsive layouts.
9. Review implementation against the spec.
10. Record deviations.

---

# 14. Stranger-Test Requirement

The prototype must eventually be tested by at least two people who have not received a detailed explanation from the builder.

Give each person a task.

Do not guide them immediately.

Record:

- hesitation
- wrong clicks
- questions
- misunderstood labels
- missing information
- unexpected behaviour

Use these observations to improve the product.

---

# 15. Documentation Requirements

Maintain:

- `/docs`
- `README.md`
- `IMPLEMENTATION_LOG.md`
- `DECISIONS.md`
- `TODO.md`

Important product changes must be documented.

If the problem statement changes after validation, preserve the previous version.

---

# 16. Definition of Done

The MVP is not "done" because the pages render.

It is done when:

- the core flow can be completed end-to-end
- data persists correctly
- authorization is enforced
- errors are handled
- the UI works at realistic desktop/mobile sizes
- the product is understandable without the developer explaining every screen
- the prototype can be tested by a stranger
- major assumptions and limitations are documented
- the implementation can be demonstrated reliably

---

# 17. Final Rule

**Build one strong workflow before building many features.**

A smaller, coherent, validated product is preferred over a large collection of incomplete features.

When uncertain, consult the documents in `/docs` before inventing a new direction.


---

# Mandatory Implementation Directives — v2

## A. Non-negotiable stack

Build a web application using only free/open-source or free-tier services that are appropriate for a prototype. The default stack is:

- Next.js App Router + React + TypeScript
- Tailwind CSS
- shadcn/ui for accessible primitives
- Lucide React for icons
- Firebase Authentication for identity/sign-in
- Firebase Admin SDK on the server for token/session verification
- Supabase PostgreSQL for application data
- Supabase Storage for private evidence files, accessed only through server-generated signed URLs
- Zod for runtime validation
- React Hook Form for complex forms
- date-fns for date handling
- Vitest + Testing Library for unit/component tests
- Playwright for end-to-end tests
- Vercel or another free-tier-compatible host for the Next.js prototype

Do not add paid APIs, paid UI kits, proprietary component libraries, or AI APIs unless explicitly approved. AI is not required for the MVP.

## B. Authentication architecture

Firebase is the identity provider. Do not store passwords in the application database. The browser may use Firebase client SDK for sign-in, but private application data must never be fetched directly from Supabase from an untrusted browser using the Supabase service-role key.

Preferred session flow:

1. Browser signs in with Firebase.
2. Browser sends the Firebase ID token to a server session endpoint.
3. Server verifies the token with Firebase Admin SDK.
4. Server creates a secure, HttpOnly, SameSite session cookie or establishes an equivalent server-verified session.
5. Every private server action/API route verifies the session before touching business data.
6. The authenticated Firebase UID is mapped to the application's user/membership record.

Never trust a `user_id`, `business_id`, or role supplied by the browser without deriving and authorizing it server-side.

## C. Database access

Supabase service-role credentials are server-only. Never expose them through `NEXT_PUBLIC_*` variables, client bundles, logs, error pages, or browser network responses.

Every query involving tenant data must be scoped through an authorization helper that establishes:

`authenticated Firebase UID → application user → business membership → permitted resource`

A user must never be able to access another business's invoices by changing an ID in the URL or request body.

## D. Product boundary

The first implementation is a receivables workflow prototype, not an ERP, accounting replacement, lender, payment gateway, legal service, or debt-collection agency. Do not invent regulatory claims. Do not present timeline/evidence records as legally admissible or immutable evidence. Label them as application records.

## E. UX quality bar

The product must not look like a generic AI-generated dashboard. Do not use the common “hero + four colorful cards + giant gradient + random chart” pattern. Build a coherent B2B product system with hierarchy, spacing, typography, data density, keyboard accessibility, responsive behaviour, meaningful empty states, realistic demo data, and deliberate interaction design.

## F. Agent workflow

Before coding: read all 15 project documents. Before every major feature: state which requirement and workflow step it satisfies. After implementation: run tests, typecheck, lint, production build, security review, and the deliberate break tests in `11_VALIDATION_AND_TEST_PLAN.md`.

Never silently weaken a requirement because it is inconvenient to implement. Record deviations in the build log.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
