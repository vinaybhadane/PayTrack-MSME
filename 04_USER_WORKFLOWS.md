# 04_USER_WORKFLOWS.md

# User Workflows

## Document Status

**Version:** v1  
**Purpose:** Define the operational flow before designing screens or code.

---

# 1. Core Workflow

The primary product workflow is:

```text
RECORD INVOICE
      ↓
SET PAYMENT TERMS / DUE DATE
      ↓
MONITOR PAYMENT STATUS
      ↓
IDENTIFY DUE / OVERDUE INVOICE
      ↓
OPEN INVOICE
      ↓
REVIEW HISTORY
      ↓
RECORD FOLLOW-UP
      ↓
RECORD BUYER COMMITMENT
      ↓
ATTACH / RECORD EVIDENCE
      ↓
WAIT / FOLLOW UP AGAIN
      ↓
RECORD PAYMENT
      ↓
CLOSE INVOICE
```

This is the workflow the MVP must make coherent.

---

# 2. Workflow Philosophy

The product should be invoice-centered rather than dashboard-centered.

The dashboard is a navigation and prioritization layer.

The invoice detail page is the operational source of truth for the prototype.

---

# 3. Flow A — Create Invoice

## Trigger

Supplier receives/creates a B2B invoice.

## User actions

1. Select or create buyer.
2. Enter invoice number.
3. Enter invoice date.
4. Enter amount.
5. Enter due date/payment terms.
6. Optionally add notes/document.
7. Save invoice.

## System behaviour

After saving:

- validate required fields
- calculate current status
- create invoice record
- create initial activity event
- show invoice detail
- make invoice visible in dashboard/list

## Success condition

User can immediately see:

- invoice amount
- buyer
- due date
- status
- next relevant action

---

# 4. Flow B — Identify Due / Overdue Invoice

## Trigger

User opens dashboard or invoice list.

## User needs to answer

> "Which invoices need my attention?"

## Dashboard should surface

- overdue
- due soon
- outstanding
- recently paid

## Status logic

Suggested conceptual statuses:

```text
DRAFT
UPCOMING
DUE_SOON
DUE_TODAY
OVERDUE
PARTIALLY_PAID
PAID
DISPUTED
```

Status rules must be defined centrally rather than duplicated across components.

---

# 5. Flow C — Record Follow-Up

## Trigger

Supplier contacts buyer regarding payment.

## Required information

- date/time
- channel
- contact/person
- notes
- buyer response
- next expected date, if applicable

## Channels

Initial:

- WhatsApp
- phone
- email
- meeting
- other

These are records of user activity.

The MVP does not need to automatically send messages.

---

# 6. Flow D — Record Buyer Commitment

## Trigger

Buyer communicates an expected payment date or commitment.

## Capture

- commitment date
- commitment amount, if relevant
- source/channel
- note/summary
- optional evidence

## Important

The system must not invent a commitment.

A commitment is either:

- entered by the user
- extracted by a future AI capability and explicitly reviewed by the user

For MVP, manual entry is safer and simpler.

---

# 7. Flow E — Evidence

## Purpose

Keep supporting records associated with the invoice.

Potential evidence:

- invoice PDF
- purchase order
- delivery proof
- email export/screenshot
- payment commitment evidence
- other supporting document

## MVP approach

Allow:

- upload
- metadata
- association to invoice
- timestamp
- document category
- optional description

## Important

The system does not decide whether evidence is legally sufficient.

---

# 8. Flow F — Payment

## Trigger

Supplier receives payment.

## MVP actions

User can record:

- payment date
- amount
- payment reference
- payment note

## Partial payment

If:

```text
Invoice = ₹100,000
Payment = ₹40,000
```

then:

```text
Paid = ₹40,000
Outstanding = ₹60,000
Status = PARTIALLY_PAID
```

After full payment:

```text
Status = PAID
```

The MVP records payment information; it does not process money.

---

# 9. Flow G — Invoice Timeline

The timeline is a core product concept.

Example:

```text
01 Sep
Invoice created
₹85,000
        │
05 Sep
Invoice sent
        │
25 Sep
Payment due
        │
27 Sep
Follow-up via WhatsApp
Buyer requested 3 additional days
        │
27 Sep
Commitment recorded
Expected: 30 Sep
        │
01 Oct
Commitment missed
        │
02 Oct
Follow-up via phone
        │
05 Oct
Payment ₹85,000 received
        │
05 Oct
Invoice closed
```

The timeline should let the user reconstruct the story without searching across other tools.

---

# 10. Alternative Path — Paid on Time

```text
Create Invoice
      ↓
Due Date
      ↓
Payment Received
      ↓
Record Payment
      ↓
PAID
      ↓
Close
```

No unnecessary follow-up workflow should be required.

---

# 11. Alternative Path — Overdue

```text
Due Date Passed
      ↓
OVERDUE
      ↓
Follow-up
      ↓
Buyer response
      ↓
Commitment?
 ┌────┴─────┐
 YES        NO
 │           │
Record       Plan
commitment   next follow-up
 │
Commitment date
 │
Payment received?
 ┌────┴─────┐
 YES        NO
 │           │
Close       Follow-up again
```

---

# 12. Alternative Path — Partial Payment

```text
Overdue
   ↓
Payment received
   ↓
Amount < outstanding
   ↓
PARTIALLY_PAID
   ↓
Remaining amount tracked
   ↓
Further follow-up
```

---

# 13. Alternative Path — Disputed Invoice

The MVP may support a simple status/flag:

```text
DISPUTED
```

but must not attempt:

- legal adjudication
- legal interpretation
- automated legal escalation

The purpose is operational visibility.

---

# 14. Dashboard Workflow

The dashboard should answer four questions:

### 1. How much is outstanding?

### 2. What is overdue?

### 3. What is due soon?

### 4. What needs attention next?

Possible dashboard sections:

```text
Receivables Summary
      ↓
Needs Attention
      ↓
Overdue Invoices
      ↓
Upcoming Due
      ↓
Recent Activity
```

---

# 15. Search / Filter Workflow

User should be able to find an invoice by:

- invoice number
- buyer name
- status

Filters:

- overdue
- due soon
- paid
- partially paid
- disputed
- date range

Sorting:

- due date
- amount
- newest
- oldest

---

# 16. Empty-State Workflows

### No invoices

Explain what the product does and provide:

> Add your first invoice

### No overdue invoices

Show:

> No overdue invoices

and a positive but professional status.

### No follow-ups

Show:

> No follow-ups recorded yet.

### No evidence

Show:

> No supporting records attached.

Do not make empty states look like errors.

---

# 17. Error Workflows

Examples:

### Invalid amount

Explain what is expected.

### Missing due date

Block save and identify the field.

### Invalid due date

Do not silently change it.

### Upload failure

Preserve the invoice form and allow retry.

### Database failure

Show a user-safe error and do not imply that data was saved if it was not.

---

# 18. Core Flow for Stranger Testing

The stranger test should use:

> **"Create an invoice for ABC Industries for ₹85,000 due in 30 days. Then record that you followed up and the buyer promised payment on 5 October. Finally, show me where you would look to understand the full history of this invoice."**

Do not explain where to click.

Record:

- first click
- hesitation
- wrong clicks
- labels misunderstood
- missing information
- questions

---

# 19. One-Flow Principle

HackFront requires one flow.

Therefore:

> **The primary flow is Invoice → Due Date → Follow-up → Commitment → Evidence → Payment.**

Everything else supports this flow.

---

# 20. Future Workflows

Not part of MVP:

- automatic WhatsApp communication
- email ingestion
- bank transaction matching
- automatic payment detection
- OCR
- AI commitment extraction
- legal escalation
- financing
- TReDS integration

These can be explored only after the primary workflow is validated.


---

# 13. Detailed Interaction Rules

## Invoice state model

Use explicit states rather than free-form labels:

`DRAFT → SENT/ISSUED → DUE → OVERDUE → PARTIALLY_PAID → PAID`

A disputed or cancelled state must not silently overwrite payment history. If introduced later, it should be a separate business event/state transition with clear audit semantics.

## Timeline rules

Events are append-oriented. A user may correct a mistaken entry through a controlled edit mechanism, but the system must not rewrite historical payment amounts or delete activity in a way that makes the timeline misleading.

## Date rules

Store timestamps in UTC. Store business timezone explicitly. Store invoice due dates as date values when they are date-only business concepts. Render dates in the business/user timezone. Never calculate monetary status from browser-local time alone.

## Primary interaction principle

Every major invoice action should answer one question: **“What changed?”** After saving a follow-up, commitment, evidence item, or payment, show the resulting state immediately and place the new timeline event in context.
