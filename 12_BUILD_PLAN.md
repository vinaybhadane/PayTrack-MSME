# 12_BUILD_PLAN.md

# Build Plan

## Document Status

**Version:** v1  
**Purpose:** Give Antigravity a controlled implementation sequence.

---

# 1. Build Philosophy

Follow:

**Understand → Define → Scope → Plan → Build → Test → Review → Iterate**

Do not start by generating every page.

Build the core vertical slice first.

---

# 2. Phase 0 — Context Loading

Before writing application code:

Read:

```text
AGENTS.md
MASTER_BUILD_BRIEF.md
docs/00_PROJECT_CHARTER.md
docs/01_PROBLEM_STATEMENT.md
docs/02_RESEARCH_EVIDENCE.md
docs/03_USER_PERSONAS.md
docs/04_USER_WORKFLOWS.md
docs/05_PRODUCT_REQUIREMENTS.md
docs/06_MVP_SCOPE.md
docs/07_UX_UI_SPEC.md
docs/08_TECHNICAL_ARCHITECTURE.md
docs/09_DATA_MODEL.md
docs/10_SECURITY_AND_TRUST.md
docs/11_VALIDATION_AND_TEST_PLAN.md
docs/12_BUILD_PLAN.md
```

Then produce a short implementation-readiness summary before coding.

---

# 3. Phase 1 — Create Project Foundation

Set up:

- Next.js
- TypeScript
- Tailwind CSS
- component system
- linting
- formatting
- environment configuration
- Supabase client
- authentication foundation

Create:

```text
.env.example
README.md
IMPLEMENTATION_LOG.md
DECISIONS.md
TODO.md
```

---

# 4. Phase 2 — Design System

Build reusable primitives:

- Button
- Input
- Select
- Date input
- Currency input
- Badge
- Card
- Table
- Modal/Dialog
- Drawer
- Tabs
- Toast
- Skeleton
- Empty State
- Error State

Do not create page-specific copies of these unnecessarily.

---

# 5. Phase 3 — Authentication

Implement:

```text
Sign in
   ↓
Authenticated application
   ↓
Sign out
```

Test:

- unauthenticated access
- authenticated access
- logout
- session persistence

---

# 6. Phase 4 — Database

Create schema in dependency order:

```text
Business
   ↓
Business Members
   ↓
Buyers
   ↓
Invoices
   ├── Followups
   ├── Commitments
   ├── Evidence
   ├── Payments
   └── Activity Events
```

Enable authorization/RLS before building sensitive workflows.

---

# 7. Phase 5 — Buyer Flow

Build:

```text
Buyer list
   ↓
Create buyer
   ↓
Edit buyer
   ↓
Select buyer in invoice
```

Test persistence and authorization.

---

# 8. Phase 6 — Invoice Vertical Slice

Build the most important slice first:

```text
Create invoice
      ↓
Save
      ↓
Invoice detail
      ↓
Invoice list
      ↓
Dashboard
```

At this point, the application should already be useful.

---

# 9. Phase 7 — Status Engine

Implement central logic for:

```text
UPCOMING
DUE_SOON
DUE_TODAY
OVERDUE
PARTIALLY_PAID
PAID
DISPUTED
```

Write tests before building complicated UI around the status.

---

# 10. Phase 8 — Follow-Up

Implement:

```text
Invoice
  ↓
Record Follow-up
  ↓
Activity Event
  ↓
Timeline
```

Make the interaction fast.

---

# 11. Phase 9 — Commitment

Implement:

```text
Invoice
  ↓
Record Commitment
  ↓
Timeline
  ↓
Commitment Status
```

Never automatically claim that a commitment was fulfilled unless a payment record supports that conclusion.

---

# 12. Phase 10 — Evidence

Implement:

```text
Invoice
  ↓
Upload Evidence
  ↓
Storage
  ↓
Metadata
  ↓
Timeline
```

Test:

- valid file
- invalid file
- large file
- unauthorized access
- delete

---

# 13. Phase 11 — Payment

Implement:

```text
Invoice
  ↓
Record Payment
  ↓
Calculate Paid
  ↓
Calculate Outstanding
  ↓
Update Status
  ↓
Timeline
```

Test:

```text
₹100,000 invoice
₹40,000 payment
= ₹60,000 outstanding
```

Then:

```text
₹60,000 payment
= ₹0 outstanding
= PAID
```

---

# 14. Phase 12 — Dashboard

Only after the core data exists.

Dashboard:

```text
Summary
  ↓
Needs Attention
  ↓
Overdue
  ↓
Due Soon
  ↓
Recent Activity
```

Avoid building analytics that are not supported by the available data.

---

# 15. Phase 13 — Search & Filters

Implement:

- buyer search
- invoice number search
- status filter
- date sorting
- amount sorting

Do not build a complex search engine.

---

# 16. Phase 14 — UX Polish

Review every screen for:

- spacing
- typography
- hierarchy
- empty states
- loading
- errors
- mobile
- keyboard
- accessibility
- consistency

Then compare against `07_UX_UI_SPEC.md`.

---

# 17. Phase 15 — Security Review

Run:

### Authorization

- user A → user B data
- invoice IDs changed manually
- evidence IDs changed manually

### Validation

- invalid amount
- invalid dates
- malformed IDs
- unsupported file

### Secrets

- inspect repository
- inspect browser bundle
- inspect `.gitignore`

---

# 18. Phase 16 — Deliberate Break Testing

Run:

1. empty field
2. very long field
3. unsupported input

Also:

4. invalid amount
5. negative amount
6. duplicate invoice
7. payment greater than outstanding
8. unauthorized resource
9. upload failure
10. network/database failure

Document results.

---

# 19. Phase 17 — Stranger Test

Use the exact task from `11_VALIDATION_AND_TEST_PLAN.md`.

Do not explain the interface.

Record:

- hesitation
- wrong clicks
- questions
- completion time
- failure points

---

# 20. Phase 18 — Iterate

Prioritize changes in this order:

1. security
2. data correctness
3. core workflow blockers
4. usability blockers
5. confusing terminology
6. visual polish
7. secondary features

---

# 21. Phase 19 — Demo Preparation

Create a deterministic demo dataset.

Recommended story:

### Invoice 1

Paid on time.

### Invoice 2

Overdue + follow-up + buyer commitment + missed commitment.

### Invoice 3

Partially paid.

### Invoice 4

Due soon.

The demo should show the core product story in under five minutes.

---

# 22. Phase 20 — Documentation

Update:

```text
README.md
IMPLEMENTATION_LOG.md
DECISIONS.md
TODO.md
VALIDATION_LOG.md
```

README must include:

- what it is
- who it is for
- core flow
- tech stack
- setup
- environment variables
- database setup
- demo account if appropriate
- known limitations
- hosted link

---

# 23. HackFront Submission Preparation

Final package should eventually contain:

```text
TeamName_Theme_Module1.zip

├── prototype/
│   ├── source
│   ├── README.md
│   └── setup documentation
│
├── Build-Log/
│   └── Build-Log.pdf
│
└── Build-Summary/
    └── Build-Summary.pdf
```

Do not include:

- node_modules
- build folders
- `.env`
- API keys
- credentials
- private test data

---

# 24. Build Order Summary

```text
DOCUMENTATION
     ↓
PROJECT FOUNDATION
     ↓
DESIGN SYSTEM
     ↓
AUTH
     ↓
DATABASE + RLS
     ↓
BUYERS
     ↓
INVOICE
     ↓
STATUS ENGINE
     ↓
FOLLOW-UP
     ↓
COMMITMENT
     ↓
EVIDENCE
     ↓
PAYMENT
     ↓
TIMELINE
     ↓
DASHBOARD
     ↓
SEARCH/FILTER
     ↓
SECURITY
     ↓
BREAK TESTS
     ↓
STRANGER TEST
     ↓
ITERATE
     ↓
DEMO
     ↓
SUBMISSION
```

---

# 25. Critical Build Rule

Do not start by building:

- landing page animations
- AI features
- analytics
- integrations
- notifications
- payment gateway
- legal workflow

until the core workflow works.

---

# 26. Definition of Technical Done

The core build is technically done when:

```text
User signs in
    ↓
Creates buyer
    ↓
Creates invoice
    ↓
Sees invoice status
    ↓
Finds overdue invoice
    ↓
Records follow-up
    ↓
Records commitment
    ↓
Uploads evidence
    ↓
Records partial payment
    ↓
Sees correct outstanding amount
    ↓
Records final payment
    ↓
Invoice becomes PAID
    ↓
Timeline contains complete history
```

and:

- authorization passes
- validation passes
- break tests pass
- stranger test is performed
- known limitations are documented

---

# 27. Final Build Principle

> **Build the smallest complete version of the validated workflow, then improve it using evidence.**


---

# 15. Antigravity Execution Sequence

## Phase 1 — Repository foundation

Create the Next.js TypeScript app. Add Tailwind, shadcn/ui, Lucide, Zod, React Hook Form, Firebase client/admin packages, Supabase server client, Vitest and Playwright. Configure strict TypeScript and linting.

## Phase 2 — Auth

Implement Firebase sign-in. Implement secure server session establishment. Protect `/app/*`. Add sign-out. Test unauthenticated access and expired sessions.

## Phase 3 — Database

Create Supabase migrations for users, businesses, memberships, buyers, invoices, payments, follow-ups, commitments, evidence and activity events. Add indexes and constraints before UI integration.

## Phase 4 — Design system

Implement typography, spacing, colour tokens, buttons, inputs, badges, tables, sheets/modals, toasts, skeletons and empty states. Create a polished shell before building individual pages.

## Phase 5 — Vertical slice

Build only the core happy path first:

buyer → invoice → invoice detail → follow-up → commitment → evidence → payment → outstanding → timeline.

## Phase 6 — Receivables workspace

Add search, status filters, due/overdue grouping, pagination and “needs attention”.

## Phase 7 — Trust and security hardening

Audit tenant isolation, session verification, server validation, evidence access, secret exposure, request limits and error handling.

## Phase 8 — Deliberate break testing

Run every negative test from `11_VALIDATION_AND_TEST_PLAN.md`. Fix failures before visual polish.

## Phase 9 — Stranger test

Run with two people. Do not explain the UI. Record behaviour and iterate.

## Phase 10 — Production quality

Run typecheck, lint, unit tests, Playwright, production build and a manual responsive/accessibility review. Test the deployed environment with non-sensitive demo data.

## Phase 11 — Submission hygiene

Remove `.env*`, credentials, node_modules, build output and private data. Include README, setup steps, hosted link/demo if available, and the HackFront Build Log/Summary separately as required by the submission instructions.

## Stop conditions

Stop and ask for human review before adding:

- payments/settlement rails
- lending or credit decisions
- legal filing automation
- external messaging integrations
- AI that sends or changes financial communications automatically
- any feature requiring sensitive regulated data

The prototype should be excellent at the narrow workflow before it becomes broad.
