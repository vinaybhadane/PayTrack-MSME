# 06_MVP_SCOPE.md

# MVP Scope & Feature Boundary

## Document Status

**Version:** v1  
**Purpose:** Prevent feature creep and preserve the one-flow HackFront requirement.

---

# 1. MVP Principle

> **One strong flow beats five incomplete features.**

The MVP exists to test the operational workflow, not to become a full FinTech platform.

---

# 2. Primary MVP Flow

```text
Invoice
  ↓
Due Date
  ↓
Status
  ↓
Follow-up
  ↓
Buyer Commitment
  ↓
Evidence
  ↓
Payment
  ↓
Close
```

---

# 3. MUST HAVE

## Authentication

- sign in
- sign out
- protected application

## Business

- business identity

## Buyers

- create buyer
- select buyer
- edit buyer

## Invoices

- create invoice
- list invoices
- invoice detail
- invoice number
- amount
- invoice date
- due date
- status

## Receivables

- outstanding amount
- paid amount
- overdue visibility
- due-soon visibility

## Follow-ups

- record follow-up
- channel
- date
- notes
- optional next action

## Commitments

- expected payment date
- amount optional
- notes
- source/channel

## Evidence

- upload document
- category
- invoice association
- metadata

## Payments

- record payment
- support partial payment
- calculate outstanding amount

## Timeline

- invoice created
- follow-up
- commitment
- evidence
- payment
- status changes

## Dashboard

- total outstanding
- overdue
- due soon
- needs attention
- recent activity

---

# 4. SHOULD HAVE

Implement only after MUST HAVE is stable.

- search
- filters
- sorting
- CSV export
- simple receivables analytics
- reminder preferences
- buyer summary
- keyboard shortcuts for common actions

---

# 5. COULD HAVE

Only if validation or testing strongly supports them:

- saved filters
- custom payment terms
- recurring invoice templates
- richer activity views
- invoice tags
- custom evidence categories

---

# 6. FUTURE

Explicitly postpone:

### Integrations

- WhatsApp
- email
- bank accounts
- accounting platforms
- GST systems
- TReDS
- MSME Samadhaan
- ERP

### Automation

- automatic payment detection
- automatic reminders
- automatic communication capture
- automatic reconciliation

### AI

- OCR
- invoice extraction
- commitment extraction
- follow-up summarization
- risk scoring

### Financial services

- lending
- credit scoring
- financing
- payment processing

### Legal

- legal notices
- legal filing
- dispute adjudication
- legal advice

---

# 7. OUT OF SCOPE FOREVER FOR THIS PROTOTYPE

The following should not be implied even if a UI placeholder exists:

- guaranteed payment recovery
- guaranteed reduction in overdue days
- guaranteed legal outcome
- legal advice
- financial advice
- bank-level payment execution

---

# 8. Feature Admission Rule

A new feature can enter MVP only if at least one of these is true:

1. It is required for the core workflow.
2. A real user explicitly demonstrated the need.
3. It is required to test a core hypothesis.
4. It fixes a serious usability/security issue.
5. It is required by HackFront submission criteria.

Otherwise defer it.

---

# 9. Feature Rejection Rule

Reject or defer a feature if its main justification is:

- "AI can build it quickly."
- "It looks impressive."
- "Other fintech apps have it."
- "Judges may like it."
- "We have time."
- "It would make the dashboard look better."

---

# 10. MVP Completion Gate

Do not begin secondary features until the core flow passes:

### Functional test

```text
Create invoice
→ Find invoice
→ Record follow-up
→ Record commitment
→ Attach evidence
→ Record payment
→ Verify outstanding amount
→ Verify timeline
```

### Security test

- cross-user access denied
- unauthorized file access denied

### UX test

Two strangers can complete the flow with minimal guidance.

---

# 11. Scope Change Log

Every scope change should use:

```text
Date:
Feature:
Reason:
Evidence:
Impact:
Decision:
Approved by:
```

---

# 12. MVP Definition

The MVP is:

> **A secure web application that allows a small B2B supplier to maintain an invoice-centered record of due dates, payment status, follow-ups, buyer commitments, evidence, and payments, with a dashboard that surfaces invoices requiring attention.**


---

# 8. Strict Scope Gate

## Must ship

1. Firebase authentication.
2. Business/profile onboarding sufficient to identify the workspace.
3. Buyer creation.
4. Invoice creation with amount, issue date, due date, buyer and reference number.
5. Receivables list with status/search/filter.
6. Invoice detail page.
7. Follow-up recording.
8. Buyer commitment recording.
9. Private evidence upload.
10. Payment recording including partial payment.
11. Outstanding amount calculation.
12. Chronological invoice timeline.
13. Dashboard “needs attention” surface.
14. Secure tenant isolation.
15. Demo seed/reset capability for development.

## Explicitly not MVP

- payment gateway
- bank account aggregation
- lending
- credit scoring
- automated legal filing
- automated legal advice
- TReDS integration
- dynamic discounting engine
- autonomous buyer messaging
- WhatsApp API integration
- OCR/LLM extraction
- accounting/tax filing
- collections agency functionality

These may appear only as future hypotheses, not fake buttons.
