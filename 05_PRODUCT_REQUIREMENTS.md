# 05_PRODUCT_REQUIREMENTS.md

# Product Requirements Specification

## Document Status

**Version:** v1  
**Status:** MVP requirements  
**Primary reference:** `MASTER_BUILD_BRIEF.md` and `04_USER_WORKFLOWS.md`

---

# 1. Product Goal

Enable a small B2B supplier to maintain a clear operational record of unpaid invoices and the activities surrounding them.

The system should connect:

**invoice → due date → status → follow-up → commitment → evidence → payment**

---

# 2. Functional Requirements

## FR-001 — User Authentication

The system MUST allow a user to securely sign in.

### Acceptance criteria

- user can sign in
- user can sign out
- authenticated routes are protected
- unauthenticated users cannot access private records

---

## FR-002 — Business Profile

The user SHOULD have a business identity associated with their account.

Minimum:

- business name
- optional contact details

---

## FR-003 — Buyer Management

User MUST be able to:

- create buyer
- view buyers
- edit buyer
- select buyer while creating invoice

Minimum buyer data:

- buyer name
- contact person optional
- email optional
- phone optional
- address optional
- notes optional

---

## FR-004 — Create Invoice

User MUST be able to create an invoice.

Required:

- buyer
- invoice number
- invoice date
- amount
- due date

Optional:

- payment terms
- description
- attachment
- notes

---

## FR-005 — Invoice Validation

The system MUST validate:

- required fields
- valid monetary amount
- valid dates
- invoice number
- buyer association

It MUST NOT silently correct user input.

---

## FR-006 — Invoice List

User MUST be able to see invoices in a list.

Each row should expose enough information to answer:

- who owes money?
- how much?
- when is it due?
- what is the status?

---

## FR-007 — Invoice Search

Search MUST support at minimum:

- invoice number
- buyer name

---

## FR-008 — Invoice Filtering

Filtering SHOULD support:

- all
- outstanding
- due soon
- overdue
- partially paid
- paid
- disputed

---

## FR-009 — Invoice Status

The system MUST calculate/display status consistently.

Potential states:

```text
UPCOMING
DUE_SOON
DUE_TODAY
OVERDUE
PARTIALLY_PAID
PAID
DISPUTED
```

Status calculation must have a single source of truth.

---

## FR-010 — Invoice Detail

Invoice detail MUST show:

- buyer
- invoice number
- amount
- amount paid
- outstanding amount
- invoice date
- due date
- current status
- follow-ups
- commitments
- evidence
- payments
- activity timeline

---

## FR-011 — Follow-Up Record

User MUST be able to record a follow-up.

Required:

- date
- channel
- notes

Optional:

- contact person
- buyer response
- next follow-up date

---

## FR-012 — Follow-Up Channels

Initial values:

- WhatsApp
- Phone
- Email
- Meeting
- Other

The system should permit future extensibility.

---

## FR-013 — Payment Commitment

User MUST be able to record a buyer commitment.

Required:

- expected payment date

Optional:

- amount
- channel/source
- notes
- evidence

---

## FR-014 — Commitment Visibility

Invoice detail SHOULD clearly show:

- commitment date
- commitment status
- whether commitment date has passed

A missed commitment should become visible without changing historical records.

---

## FR-015 — Evidence

User SHOULD be able to attach supporting evidence to an invoice.

Minimum:

- file
- category
- uploaded timestamp
- description optional

---

## FR-016 — Evidence Categories

Initial categories:

- Invoice
- Purchase Order
- Delivery Proof
- Payment Commitment
- Communication
- Other

---

## FR-017 — Evidence Association

Every evidence item MUST be associated with exactly one user/business and, where applicable, an invoice.

---

## FR-018 — Payment Recording

User MUST be able to record a received payment.

Required:

- payment date
- amount

Optional:

- payment reference
- note

---

## FR-019 — Partial Payments

The system MUST support partial payment.

Outstanding amount:

```text
Outstanding = Invoice Amount - Sum(Recorded Payments)
```

The system MUST prevent outstanding amount from becoming negative unless an explicit overpayment workflow is later defined.

---

## FR-020 — Payment Status

When:

```text
Paid Amount = 0
```

the invoice remains unpaid.

When:

```text
0 < Paid Amount < Invoice Amount
```

status may be `PARTIALLY_PAID`.

When:

```text
Paid Amount = Invoice Amount
```

status becomes `PAID`.

---

## FR-021 — Activity Timeline

The system MUST create timeline events for important invoice activity.

Potential events:

- invoice created
- invoice updated
- follow-up recorded
- commitment recorded
- evidence uploaded
- payment recorded
- status changed

Timeline events should be chronological.

---

## FR-022 — Dashboard

Dashboard MUST show:

- total outstanding
- overdue amount
- due-soon amount/count
- paid amount or recent collections
- invoices needing attention

---

## FR-023 — Needs Attention

Dashboard should identify items such as:

- overdue invoices
- missed commitments
- invoices due soon

The product should help answer:

> "What should I look at next?"

---

## FR-024 — Responsive Interface

The application MUST work at:

- desktop
- tablet
- mobile widths

The primary workflow may be optimized for desktop, but no critical workflow should become unusable on smaller screens.

---

## FR-025 — Loading States

All asynchronous operations MUST have appropriate loading states.

---

## FR-026 — Empty States

Every major data screen MUST have an intentional empty state.

---

## FR-027 — Error Handling

Errors MUST:

- be understandable
- preserve user input where possible
- avoid exposing technical stack traces
- avoid falsely confirming failed operations

---

## FR-028 — Authorization

A user MUST only access data belonging to their authorized business/account.

---

## FR-029 — File Validation

Uploads MUST enforce:

- allowed file types
- reasonable file size limit
- authenticated access

---

## FR-030 — Auditability

Important state changes SHOULD produce an activity record.

---

# 3. Non-Functional Requirements

## NFR-001 — Performance

Primary dashboard/list interactions should feel responsive under normal prototype data volumes.

## NFR-002 — Reliability

Failed saves must not be presented as successful.

## NFR-003 — Accessibility

Use semantic controls, labels, keyboard-accessible interactions, and sufficient contrast.

## NFR-004 — Maintainability

Use modular components and avoid duplicated business logic.

## NFR-005 — Security

Never expose secrets or private records through client-side shortcuts.

## NFR-006 — Data Integrity

Amounts, dates, statuses, and relationships must remain internally consistent.

---

# 4. UX Requirements

### UX-001

Users should understand invoice status at a glance.

### UX-002

Overdue status should never rely on color alone.

### UX-003

The next action should be discoverable.

### UX-004

Invoice detail should tell a chronological story.

### UX-005

Forms should minimize unnecessary fields.

### UX-006

The user should not have to navigate through multiple pages to record a simple follow-up.

---

# 5. Requirements That Are Explicitly NOT MVP

The following are excluded:

- automatic payment processing
- automatic WhatsApp messages
- automatic email sending
- bank synchronization
- GST filing
- lending
- credit scoring
- legal filing
- automated legal notices
- payment recovery guarantees
- AI-generated legal advice

---

# 6. Acceptance Definition

The core requirement set is satisfied when a test user can:

```text
Sign in
  ↓
Create buyer
  ↓
Create invoice
  ↓
See due date/status
  ↓
Find invoice from dashboard
  ↓
Record follow-up
  ↓
Record buyer commitment
  ↓
Attach evidence
  ↓
Record payment
  ↓
See updated outstanding amount
  ↓
See complete timeline
```

---

# 7. Requirement Traceability

Every major implementation feature should be traceable to an FR/NFR.

If a feature cannot be mapped to a requirement, it should be treated as scope expansion and documented before implementation.


---

# 14. Additional Acceptance Requirements

## Security acceptance

- No service-role secret reaches the browser.
- Every private mutation verifies the Firebase session server-side.
- Every resource lookup is tenant-scoped.
- Direct object IDs cannot bypass authorization.
- Evidence files are private by default.
- Signed evidence URLs expire.
- Unsupported file types are rejected.
- Monetary amounts are validated as integer minor units / decimal-safe values, never floating-point arithmetic.
- Server validation exists even when client validation exists.

## UX acceptance

- Keyboard navigation works for core flows.
- Focus is visible.
- Forms have clear labels and error messages.
- Loading, empty, success, and failure states are designed rather than default browser behaviour.
- Tables work on smaller screens through deliberate responsive transformation, not horizontal overflow alone.
- Destructive actions require confirmation and explain consequences.
- Every status has a text label in addition to colour.

## Performance acceptance

- Initial private dashboard should avoid loading unnecessary history.
- Invoice lists use pagination or bounded queries.
- Timeline queries are bounded and indexed.
- Evidence previews are lazy-loaded.
