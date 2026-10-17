# 01_PROBLEM_STATEMENT.md

# MSME Delayed-Payment / Invoice Workflow Problem

## Document Status

**Version:** v1 — Research-derived  
**Status:** Initial problem statement; not fully validated  
**Build status:** Do not treat this as final until Activity 4/5 validation is completed.

---

# 1. Official Working Problem Statement

> **Micro and Small Enterprises (MSEs) in India face significant working-capital pressure when B2B customers delay payments for goods and services sold on credit. Before a payment becomes a formal dispute, suppliers often rely on fragmented workflows such as spreadsheets, WhatsApp messages, phone calls, paper records, and accountants to track invoice due dates, follow-ups, buyer payment commitments, and supporting evidence. This makes it difficult to maintain a consistent view of what is outstanding, what a buyer has committed to pay and when, what follow-up has already occurred, and what evidence is available, increasing administrative effort and creating uncertainty around cash flow and collection. The scale of documented delayed-payment exposure in India's MSE sector indicates that delayed B2B payments are a significant financial-management problem, while the specific pre-dispute workflow gap and its severity remain hypotheses that must be validated through conversations and observed behaviour of real MSE suppliers.**

Do not silently rewrite this statement while building.

If research changes it, create a new version and preserve this one.

---

# 2. Statement Decomposition

## WHO

### Primary population

Micro and small business suppliers that:

- sell goods or services to other businesses
- sell on credit or provide payment terms
- receive payment after delivery/service
- have recurring receivables
- manage or supervise customer payment follow-ups

### Not sufficiently specific yet

The term "MSME supplier" remains broad.

The validation process must identify a narrower ICP that can produce five real, reachable examples.

Potential dimensions to investigate:

- industry
- business size
- invoice frequency
- average invoice value
- buyer type
- payment terms
- owner-managed vs accountant-managed receivables
- number of buyers
- current software
- frequency of overdue payments

Do not choose these dimensions merely because they sound useful. Validate which dimensions actually distinguish the problem.

---

# 3. WHEN DOES THE PROBLEM OCCUR?

The relevant situation is not simply "when running an MSME."

It occurs around B2B receivables:

```text
Invoice issued
      ↓
Payment terms agreed
      ↓
Waiting period
      ↓
Payment due
      ↓
Payment not received
      ↓
Follow-up
      ↓
Buyer response / commitment
      ↓
Commitment date
      ↓
Payment received OR missed commitment
      ↓
Further follow-up / escalation / closure
```

The exact moment at which the largest workflow breakdown occurs is currently unknown.

Possible breakdown points include:

- forgetting the due date
- not knowing which invoices need follow-up
- losing buyer commitments
- finding old WhatsApp messages
- finding email conversations
- locating invoice/supporting documents
- remembering previous follow-ups
- deciding the next action
- recording partial payments
- reconstructing the history of an overdue invoice

These are research questions, not established facts.

---

# 4. WHAT DOES IT COST?

The current research supports several potential consequences.

### Direct operational cost

- time spent chasing payments
- repeated calls/messages
- searching for information
- manual reconciliation of payment status
- administrative effort

### Financial/business cost

Delayed cash receipts can create cash-flow uncertainty and may affect:

- purchases
- payroll
- working capital
- growth

### Evidence/recovery cost

If information is fragmented, reconstructing the history of:

- invoice
- payment promise
- communication
- supporting documents
- payment events

may become difficult.

However, the project must not claim that the proposed workflow itself causes or materially reduces these outcomes until user research demonstrates the relationship.

---

# 5. WHAT DO USERS DO TODAY?

The research identifies a combination of existing methods:

- Excel
- WhatsApp
- paper ledgers
- accountants
- phone calls
- email
- accounting/invoice software
- other manual records

There are also established products and formal pathways in the wider ecosystem.

Therefore:

> **The current competitor is not only another SaaS application. It is also the user's existing combination of tools and habits.**

This is a critical product principle.

---

# 6. WHY IS THIS WORTH INVESTIGATING NOW?

The research indicates substantial documented delayed-payment activity in India's formal MSE sector.

Reported research evidence includes:

- 256,892 applications involving ₹55,244.31 crore through December 31, 2025
- 52,744 applications awaiting MSEFC review involving ₹8,397.25 crore

These figures demonstrate significant documented scale in the formal delayed-payment ecosystem.

They do **not** prove that a pre-dispute tracking product is the answer.

The reason to investigate the workflow is therefore:

> There is a documented high-level financial problem, and there may be a narrower operational workflow problem worth validating before escalation or formal dispute processes.

---

# 7. EVIDENCE / INFERENCE / HYPOTHESIS / ASSUMPTION MAP

| Claim | Classification | Confidence | What is needed next |
|---|---|---:|---|
| Delayed payments are a documented problem for formal MSEs | Evidence | High | Continue monitoring source quality |
| Formal delayed-payment cases have substantial monetary value | Evidence | High | Maintain source citation |
| Formal escalation mechanisms exist | Evidence | High | Verify current details before product claims |
| Suppliers use multiple methods to track receivables | Research finding / needs field validation | Medium | 2–3+ interviews |
| Supplier workflow is fragmented | Hypothesis | Low/Medium | Observe real invoice histories |
| Buyer commitments are difficult to preserve | Hypothesis | Low | Past-behaviour interviews |
| Evidence is difficult to retrieve | Hypothesis | Low | Ask users to show last overdue invoice workflow |
| Existing tools leave a meaningful workflow gap | Hypothesis | Low | Competitor + user comparison |
| An invoice-centered timeline will reduce effort | Hypothesis | Low | Prototype test |
| Users will adopt the product | Assumption | Low | Stranger test + behavioural validation |
| Users will pay for the product | Assumption | Low | Pricing/discovery research |
| The product will reduce overdue days | Unverified | Very low | Longitudinal evidence required |

---

# 8. CURRENT RESEARCH POSITION

The research scorecard placed this candidate at:

**39/45**

The score was based on:

- evidence strength
- frequency/recurrence potential
- severity/cost
- workaround intensity
- interview access
- 48-hour testability
- solution gap
- prototype feasibility
- potential value

The score is a prioritization tool, not proof of product-market fit.

---

# 9. CURRENT WORKING HYPOTHESIS

> **Micro and small B2B suppliers with recurring credit sales experience repeated friction when managing overdue invoices because due dates, payment commitments, follow-ups, and evidence are distributed across multiple tools and communication channels.**

This hypothesis is falsifiable.

It would be weakened if interviews show that:

- suppliers already have a single reliable workflow
- overdue invoices are rare
- the issue is primarily buyer cash shortage rather than tracking
- accountants already solve the workflow adequately
- existing accounting software completely satisfies the need
- users do not value preserving follow-up/commitment evidence
- users do not experience meaningful effort in reconstructing invoice history

---

# 10. WHAT WOULD FALSIFY THE PRODUCT HYPOTHESIS?

Strong disconfirming evidence would include:

### Case A

Most target users already have a reliable system that requires little effort.

### Case B

The real pain is not tracking but buyer behaviour, pricing, credit terms, or cash shortages.

### Case C

Users do not record buyer commitments because they do not need them.

### Case D

The proposed timeline duplicates existing accounting software without meaningful benefit.

### Case E

Users consider evidence tracking unnecessary.

### Case F

The problem occurs too infrequently to justify a dedicated workflow.

These outcomes are acceptable. The goal is to learn, not to prove the initial idea correct.

---

# 11. PROBLEM STATEMENT V2 — RESERVED

HackFront explicitly expects the problem statement to evolve after the Five Whys, reframes, critics, assumptions, and 48-hour tests.

Do not fabricate V2 before completing that work.

Use this section after validation:

```text
## Problem Statement v2

[Validated statement]

## What changed from v1?

1.
2.
3.

## Evidence that caused the change

1.
2.
3.
```

---

# 12. Validation Questions

Use past-behaviour questions.

### Core question

> "Tell me about the last invoice you had that was paid late."

Follow-ups:

1. How did you know the payment was late?
2. Where did you record the invoice?
3. Where did you record the due date?
4. Who followed up?
5. How did you contact the buyer?
6. What did the buyer say?
7. Did they promise a payment date?
8. Where did you record that promise?
9. What happened when that date passed?
10. Did you need to find old WhatsApp/email/call information?
11. Where was the invoice document?
12. Where were other supporting documents?
13. How long did it take to reconstruct the history?
14. What did you do next?
15. What tool would you say currently handles this process best?

Avoid leading questions such as:

> "Would you use an app that stores all this?"

---

# 13. Validation Success Signals

Evidence becomes stronger if multiple users independently describe:

- recurring overdue invoices
- repeated follow-up
- scattered information
- lost/missed commitments
- manual searching
- difficulty knowing next action
- need to preserve evidence
- dissatisfaction with the current workaround

The strongest evidence comes from observed or described past behaviour, not future intention.

---

# 14. Research Caveat

The research itself explicitly distinguishes:

- documented delayed-payment scale
- the unvalidated hypothesis of a specific pre-dispute workflow gap

This distinction must remain visible in all product documentation and presentations.

---

# 15. Source Basis

Primary source basis for this document:

1. **HackFront Documentation.pdf**
   - Activity 1: define the problem
   - Activity 4: unwind and rewrite the problem
   - Activity 5: PMF and field validation
   - Activity 6: one-flow build/spec/test

2. **I am participating in the HackFront Cohort, and my.pdf**
   - India-specific FinTech problem research
   - delayed-payment evidence
   - candidate scorecard
   - evidence/assumption classification
   - validation planning

No claim should be treated as independently verified beyond what those source materials support unless a new source is explicitly added.


---

# 11. Build-Against Statement v2

The following is the current HackFront build statement. It is intentionally problem-first and keeps the proposed product out of the statement:

> **Micro and Small Enterprises (MSEs) in India face significant working-capital pressure when B2B customers delay payments for goods and services sold on credit. Before a payment becomes a formal dispute, suppliers often rely on fragmented workflows such as spreadsheets, WhatsApp messages, phone calls, paper records, and accountants to track invoice due dates, follow-ups, buyer payment commitments, and supporting evidence. This makes it difficult to maintain a consistent view of what is outstanding, what a buyer has committed to pay and when, what follow-up has already occurred, and what evidence is available, increasing administrative effort and creating uncertainty around cash flow and collection. The scale of documented delayed-payment exposure in India\'s MSE sector indicates that delayed B2B payments are a significant financial-management problem, while the specific pre-dispute workflow gap and its severity remain hypotheses that must be validated through conversations and observed behaviour of real MSE suppliers.**

## Important status

This statement is the current working build target, not proof that the proposed workflow is a validated market need. Interview findings may narrow, weaken, or change it. Preserve earlier versions in the Build Log.
