# 00_PROJECT_CHARTER.md

# MSME Delayed-Payment / Invoice Workflow Platform

## 1. Document Purpose

This document establishes the project charter before implementation begins.

It defines:

- why the project exists
- what problem is being investigated
- who the project is for
- what the initial product direction is
- what the project will deliberately not attempt
- how success will be evaluated
- which decisions remain open

This document is a foundation, not a substitute for user validation.

---

# 2. HackFront Context

### Innovation Theme

**FinTech**

### Module Context

HackFront Module 1 expects teams to move through:

**Understand → Identify → Research → Challenge → Validate → Explore**

The project therefore must not treat the first solution idea as the final answer.

The problem statement is expected to evolve after:

- unwinding assumptions
- reframing
- critique
- research
- real user conversations
- prototype testing

The final build should follow the validated version of the problem statement.

---

# 3. Working Project Name

## PayTrack MSME

This is a temporary working name.

The final product name should be selected after the core product direction and positioning are stable.

---

# 4. One-Sentence Product Description

> **A focused receivables workflow for small B2B suppliers that keeps invoice status, due dates, buyer commitments, follow-ups, payments, and supporting evidence together.**

This is intentionally narrower than "MSME financial management."

---

# 5. Problem Being Investigated

## Current Problem Statement

> **Micro and Small Enterprises (MSEs) in India face significant working-capital pressure when B2B customers delay payments for goods and services sold on credit. Before a payment becomes a formal dispute, suppliers often rely on fragmented workflows such as spreadsheets, WhatsApp messages, phone calls, paper records, and accountants to track invoice due dates, follow-ups, buyer payment commitments, and supporting evidence. This makes it difficult to maintain a consistent view of what is outstanding, what a buyer has committed to pay and when, what follow-up has already occurred, and what evidence is available, increasing administrative effort and creating uncertainty around cash flow and collection. The scale of documented delayed-payment exposure in India's MSE sector indicates that delayed B2B payments are a significant financial-management problem, while the specific pre-dispute workflow gap and its severity remain hypotheses that must be validated through conversations and observed behaviour of real MSE suppliers.**

---

# 6. Why This Problem Matters

The research identified delayed payments as a documented problem for formal MSEs.

The research reported:

- 256,892 applications involving approximately ₹55,244.31 crore through December 31, 2025
- 52,744 applications awaiting MSEFC review involving approximately ₹8,397.25 crore

These figures establish that delayed-payment cases have substantial documented scale.

However, the numbers do **not** by themselves establish that:

- every supplier experiences the problem
- the problem begins with poor tracking
- fragmented tracking is the primary cause
- existing software is inadequate
- a new product would be adopted
- a new product would reduce overdue payments

Those are separate questions.

---

# 7. Problem Boundary

The project is focused on the **operational workflow before and around delayed payment**, rather than the entire legal or financial-resolution ecosystem.

### In scope

- invoice record
- payment terms
- due date
- current payment status
- follow-up history
- buyer commitment
- evidence
- payment history
- next action

### Out of scope

- payment processing
- lending
- credit scoring
- legal adjudication
- automated collections
- legal filing
- banking
- accounting replacement
- full ERP

---

# 8. Primary User

The initial user is:

> **A micro or small B2B supplier who regularly sells on credit and personally manages or supervises receivables and buyer follow-ups.**

This is intentionally more specific than "MSMEs."

The team must eventually identify five real people fitting the ICP for validation.

---

# 9. User Situation

The relevant situation begins when:

1. a supplier issues an invoice
2. the buyer has a payment obligation
3. the payment is not immediate
4. the supplier must remember/track when payment is expected
5. the supplier follows up
6. the buyer may provide a payment commitment
7. the supplier may need to follow up again
8. evidence may need to be preserved
9. the payment eventually arrives, partially arrives, remains overdue, or becomes disputed

The prototype should focus on this sequence.

---

# 10. Current Behaviour

Research suggests current approaches can include combinations of:

- Excel
- WhatsApp
- paper ledgers
- accountants
- phone calls
- email
- accounting/invoice software
- other informal tracking methods

Existing alternatives are part of the competitive landscape.

The project must not assume that users currently have no solution.

The real question is:

> **What does the user do today, and where does that workflow break or become unnecessarily difficult?**

---

# 11. Intended Product Direction

The initial product direction is an invoice-centered workflow.

Each invoice becomes a structured record containing:

```text
Invoice
├── Buyer
├── Amount
├── Invoice Date
├── Due Date
├── Payment Status
├── Follow-ups
├── Buyer Commitments
├── Evidence
├── Payments
└── Activity Timeline
```

The dashboard then surfaces:

- outstanding receivables
- overdue invoices
- invoices due soon
- recent payments
- follow-ups
- commitments requiring attention

---

# 12. Core User Outcome

The intended outcome is:

> **A supplier should be able to understand the current state and history of an unpaid invoice without searching through multiple disconnected places.**

This is a hypothesis to test.

---

# 13. Product Philosophy

## 13.1 Problem before technology

The product exists because of a workflow problem.

Technology is subordinate to the workflow.

## 13.2 Evidence before claims

If the project has not measured something, do not present it as measured.

## 13.3 Narrow before broad

A strong invoice workflow is preferable to a weak "complete MSME finance platform."

## 13.4 Human control

AI can accelerate research, implementation, analysis, and iteration.

Humans remain responsible for:

- choosing the problem
- deciding what evidence means
- deciding what to build
- accepting/rejecting assumptions
- interpreting user feedback
- deciding what claims can be made

---

# 14. Success Definition

At the prototype stage, success means:

### Product success

A user can complete the core invoice workflow without developer guidance.

### Research success

The team can determine whether the problem occurs in real user behaviour.

### Validation success

The team can identify:

- what is genuinely painful
- what is already solved by existing tools
- what users currently do
- which product interactions help
- which assumptions were wrong

### HackFront success

The final submission contains a traceable chain:

**Problem → Evidence → Hypothesis → Validation → Spec → Prototype → Test → Iteration**

---

# 15. Initial Non-Goals

The following are intentionally excluded from the first version:

### Financial infrastructure

- UPI integration
- bank integration
- payment gateway
- lending
- financing

### Legal infrastructure

- legal advice
- automated legal notices
- legal claim filing
- dispute adjudication
- guaranteed recovery

### Accounting infrastructure

- full double-entry accounting
- GST filing
- payroll
- inventory
- complete ERP

### Artificial intelligence

AI is not a goal by itself.

AI features must be justified by the validated workflow.

---

# 16. Core Assumptions to Validate

### Assumption 1

Suppliers experience repeated difficulty keeping track of invoice due dates and payment status.

### Assumption 2

Buyer payment commitments are often recorded informally or inconsistently.

### Assumption 3

Follow-up information is fragmented across channels.

### Assumption 4

Supporting evidence is difficult to retrieve when needed.

### Assumption 5

An invoice-centered timeline would be easier to use than the current combination of tools.

### Assumption 6

The problem occurs frequently enough to justify dedicated workflow software.

### Assumption 7

Users would trust such a system with business/financial information.

### Assumption 8

Users may be willing to adopt or pay for the workflow.

These assumptions are not facts.

---

# 17. Research Questions

The project should answer:

1. How do suppliers currently track outstanding invoices?
2. What happens when an invoice becomes overdue?
3. Where are buyer commitments recorded?
4. How are follow-ups tracked?
5. Where is evidence stored?
6. How often do suppliers search across multiple channels?
7. What information is most frequently missing?
8. What causes a follow-up to be delayed or missed?
9. Which existing tools are already adequate?
10. What part of the workflow is genuinely underserved?
11. Does an invoice timeline reduce confusion?
12. Would users trust the workflow with financial records?
13. Would they switch from their current method?
14. Would they pay for it?

---

# 18. Project Constraints

### Time

HackFront requires a focused prototype rather than a production-scale financial platform.

### Access

Initial validation should prioritize users the team can realistically reach.

### Trust

Financial/business information requires careful handling.

### Evidence

Public statistics cannot substitute for interviews about actual workflow behaviour.

### Scope

One meaningful flow must be completed before expansion.

---

# 19. Final Charter Principle

> **Do not build what sounds impressive. Build what the evidence shows is worth testing.**

The first prototype is an instrument for learning, not proof that the final product direction is correct.


---

# 13. Implementation Charter Addendum

## Build objective

The prototype must make one complete receivables workflow testable by a stranger. Feature count is less important than whether a new user can understand the state of an invoice and maintain its history without developer guidance.

## Technology constraint

Firebase Authentication is the identity layer. Supabase PostgreSQL is the system of record for application data. Supabase Storage is used only for private evidence objects. Next.js is the application boundary. Server-side authorization is mandatory.

## Definition of “impressive”

Impressive means the interface feels intentional and trustworthy: strong information hierarchy, excellent table/detail interactions, fast feedback, polished states, realistic data, accessible forms, responsive behaviour, and no unfinished placeholder UI. It does not mean adding unnecessary animation or features.
