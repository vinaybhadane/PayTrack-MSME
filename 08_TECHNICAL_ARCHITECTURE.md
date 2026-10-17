# 08_TECHNICAL_ARCHITECTURE.md

# Technical Architecture

## Document Status

**Version:** v1  
**Purpose:** Define a simple, secure architecture suitable for a high-quality HackFront prototype.

---

# 1. Architecture Principle

Use a modular monolithic web application.

Do not introduce microservices for the MVP.

The prototype needs:

- web UI
- authentication
- relational data
- file storage
- secure server operations
- deployment

---

# 2. Recommended Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- accessible component library such as shadcn/ui

## Application Layer

- Next.js App Router
- Server Components where appropriate
- Server Actions and/or Route Handlers for mutations/API boundaries

## Database

- PostgreSQL
- Supabase PostgreSQL

## Authentication

- Supabase Auth

## Storage

- Supabase Storage

## Hosting

- Vercel

---

# 3. High-Level Architecture

```text
                    ┌───────────────────────┐
                    │       Browser         │
                    │   Desktop / Mobile    │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │      Next.js App      │
                    │ UI + Server Boundary  │
                    └───────────┬───────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │ Supabase   │ │ Supabase   │ │ Supabase   │
          │ Auth       │ │ PostgreSQL │ │ Storage    │
          └────────────┘ └────────────┘ └────────────┘
```

---

# 4. Application Modules

Suggested modules:

```text
src/
├── app/
│   ├── dashboard/
│   ├── invoices/
│   ├── buyers/
│   ├── settings/
│   └── auth/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── invoices/
│   ├── buyers/
│   └── timeline/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validation/
│   ├── permissions/
│   └── storage/
│
├── features/
│   ├── invoices/
│   ├── buyers/
│   ├── followups/
│   ├── commitments/
│   ├── payments/
│   └── evidence/
│
└── types/
```

Exact structure can change if there is a documented reason.

---

# 5. Data Ownership Model

Every business record must belong to a business/user scope.

Conceptually:

```text
User
  ↓
Business
  ↓
Buyers
  ↓
Invoices
  ├── Follow-ups
  ├── Commitments
  ├── Evidence
  ├── Payments
  └── Activity Events
```

---

# 6. Authorization Model

The primary authorization rule:

> A user can only read/write records belonging to their authorized business.

Authorization must be enforced server-side/database-side.

Do not rely solely on:

- hidden UI elements
- client-side checks
- URL obscurity
- invoice IDs being hard to guess

---

# 7. Supabase Row-Level Security

If Supabase is used:

Enable RLS on all user/business-owned tables.

Conceptual policy:

```text
Authenticated user
        ↓
Membership / ownership check
        ↓
Business record
        ↓
Related invoice
        ↓
Related data
```

The exact policy implementation must be reviewed before production deployment.

---

# 8. Database Access

Prefer:

- server-side data fetching for protected data
- typed database functions
- centralized validation
- explicit authorization checks

Avoid exposing privileged database credentials to the browser.

---

# 9. File Storage Architecture

Evidence files:

```text
Business
  ↓
Invoice
  ↓
Evidence
  ↓
Storage Object
```

Store metadata in PostgreSQL.

Store actual file bytes in Supabase Storage.

Do not rely on file names as authorization.

---

# 10. File Access

Preferred approach:

1. authenticate user
2. authorize invoice/business
3. authorize evidence record
4. generate/access secure storage object
5. return only authorized content

---

# 11. Validation

Use a schema validation library such as Zod.

Validate:

- invoice amount
- dates
- IDs
- status transitions
- buyer references
- payment amount
- file metadata

Validation must happen at the server boundary.

---

# 12. Business Logic

Centralize important calculations.

Examples:

### Outstanding

```text
outstanding = invoice_amount - sum(payments)
```

### Overdue

```text
today > due_date
AND outstanding > 0
```

### Paid

```text
outstanding = 0
```

### Partial

```text
paid > 0
AND outstanding > 0
```

Do not duplicate these rules in multiple UI components.

---

# 13. Date Handling

Store dates consistently.

Distinguish:

- invoice date
- due date
- payment date
- follow-up date/time
- commitment date
- created_at
- updated_at

Avoid ambiguous local-date conversions.

The UI should display dates in the user's intended business timezone.

---

# 14. Money Handling

Do not use floating-point arithmetic for financial values where precision matters.

Preferred database representation:

- integer smallest currency unit, or
- appropriate PostgreSQL numeric/decimal

For INR:

```text
₹85,000
```

should remain exact.

---

# 15. Status Calculation

Use one central status calculation service/function.

Inputs may include:

- due date
- outstanding amount
- commitment
- dispute flag

Output:

```text
UPCOMING
DUE_SOON
DUE_TODAY
OVERDUE
PARTIALLY_PAID
PAID
DISPUTED
```

Historical events should not be rewritten when status changes.

---

# 16. Timeline Architecture

Timeline events should be append-oriented.

Example:

```text
activity_events
----------------
id
business_id
invoice_id
event_type
actor_id
metadata
created_at
```

Potential event types:

```text
INVOICE_CREATED
INVOICE_UPDATED
FOLLOWUP_RECORDED
COMMITMENT_RECORDED
EVIDENCE_ADDED
PAYMENT_RECORDED
STATUS_CHANGED
```

Avoid storing only the latest state when historical context matters.

---

# 17. Error Architecture

Use predictable application errors.

Categories:

- validation
- authentication
- authorization
- not found
- conflict
- storage failure
- database failure
- unexpected failure

User-facing messages should be safe and understandable.

---

# 18. Observability

For the prototype:

- development logs
- error logging
- clear server errors
- no sensitive financial payloads in logs

If production monitoring is added, ensure sensitive data is excluded.

---

# 19. Environment Variables

Examples:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Only variables explicitly intended for the browser may use the `NEXT_PUBLIC_` prefix.

Never commit secrets.

Provide:

```text
.env.example
```

with placeholders only.

---

# 20. Deployment

Recommended:

```text
Git repository
      ↓
Vercel
      ↓
Next.js application

Supabase
 ├── Auth
 ├── PostgreSQL
 └── Storage
```

---

# 21. Testing Layers

Minimum:

### Unit

- money calculations
- status calculation
- validation

### Integration

- invoice creation
- payment recording
- authorization
- evidence association

### End-to-end

- login
- create invoice
- follow-up
- commitment
- evidence
- payment
- timeline

### Manual

- responsive UI
- stranger test
- error states

---

# 22. Architecture Non-Goals

Do not implement:

- microservices
- event buses
- Kubernetes
- complex queues
- distributed caching
- blockchain
- ML infrastructure

unless later evidence or requirements make them necessary.

---

# 23. Architecture Decision Rule

The best architecture for this prototype is the simplest architecture that:

- preserves data integrity
- protects user data
- supports the core workflow
- can be built and tested within the available time
- can be explained clearly in the HackFront submission


---

# 12. Final Architecture Decision

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Web | Next.js App Router | Strong full-stack React prototype boundary |
| Language | TypeScript | Safer domain/data contracts |
| UI | Tailwind + shadcn/ui + Lucide | Free, accessible, customizable |
| Auth | Firebase Authentication | Mature identity provider and simple Google/email sign-in options |
| Server auth | Firebase Admin SDK | Server-side verification and secure session handling |
| Database | Supabase PostgreSQL | Relational data, SQL, indexes, migrations |
| Files | Supabase Storage | Private object storage with signed URLs |
| Validation | Zod | Shared runtime validation |
| Forms | React Hook Form | Predictable form state |
| Tests | Vitest + Playwright | Unit/integration + browser validation |
| Hosting | Vercel/free-tier-compatible host | Simple deployment for Next.js |

## Request architecture

Browser → Next.js route/server action → verify Firebase session → resolve user/business membership → validate input with Zod → execute parameterized Supabase query → return safe DTO.

The browser must not receive Supabase service-role credentials.

## Session architecture

Use Firebase client SDK only for sign-in. Exchange the Firebase ID token with a server endpoint. Verify it with Firebase Admin SDK and issue a secure HttpOnly session cookie. Verify the session on protected requests.

Cookie requirements: Secure in production, HttpOnly, SameSite=Lax or stricter where compatible, short/controlled lifetime, explicit logout invalidation.

## Database strategy

Use Supabase PostgreSQL migrations as the source of truth. Use foreign keys, check constraints, indexes and unique constraints. All tenant records carry a business/workspace ownership path that the server authorization layer can enforce.

## Storage strategy

Private bucket only. Object names should be opaque UUID-based paths, not user-controlled filenames. Keep original filename as metadata only. Generate short-lived signed URLs from the server after authorization.

## No unnecessary infrastructure

No Redis, Celery, Kubernetes, microservices, message queue or paid observability platform for MVP.
