# 03_USER_PERSONAS.md

# User Personas & ICP

## Document Status

**Version:** v1  
**Status:** Working hypothesis pending real-user validation  
**Purpose:** Define a reachable, specific target user without pretending synthetic personas are evidence.

---

# 1. Important Rule

These personas are **hypotheses**, not validated facts.

HackFront requires an ICP specific enough to identify five real people.

Therefore:

- Do not present these personas as research findings.
- Do not claim the described behaviour is universal.
- Replace assumptions with interview evidence as validation progresses.
- Preserve contradictions instead of forcing all users into one persona.

---

# 2. Initial ICP Hypothesis

## Primary ICP

> **Owner/operator of a micro or small B2B business in India that regularly sells goods or services on credit, has recurring business invoices, personally manages or supervises receivables, and has experienced at least one delayed payment.**

### Required characteristics

The person should ideally:

- sell to other businesses
- issue invoices regularly
- provide payment terms
- wait for payment after delivery/service
- personally manage or supervise payment follow-up
- use at least one manual or fragmented tracking method
- be reachable for interviews
- be able to describe a recent delayed invoice

---

# 3. ICP Narrowing Dimensions

The current ICP is intentionally not fully narrowed.

Interview research should determine whether these dimensions matter:

| Dimension | Examples | Why investigate |
|---|---|---|
| Business type | manufacturing, distribution, services | Workflow may differ |
| Invoice frequency | weekly, monthly, irregular | Determines recurrence |
| Invoice value | low, medium, high | Determines severity |
| Number of active buyers | 5, 20, 100+ | Determines tracking complexity |
| Payment terms | advance, 15d, 30d, 45d, 60d | Determines waiting period |
| Receivables owner | owner, accountant, staff | Determines user |
| Current software | Excel, Tally, Vyapar, ERP, none | Determines substitute |
| Communication | WhatsApp, email, calls | Determines evidence fragmentation |
| Overdue frequency | rare, occasional, frequent | Determines pain frequency |
| Business maturity | early, established | Determines workflow complexity |

Do not choose a narrow segment until interviews provide evidence.

---

# 4. Persona A — Owner-Managed B2B Supplier

## Status

**Hypothesis**

### Example business

Small industrial/component supplier.

### Business model

- sells products to other businesses
- recurring B2B orders
- customers receive credit/payment terms
- owner remains involved in collections

### Possible current workflow

```text
Invoice
  ↓
Excel / accounting software
  ↓
WhatsApp / call
  ↓
Buyer promise
  ↓
Manual reminder
  ↓
Payment
```

### Potential pain

The owner may need to remember:

- which invoice is due
- which buyer promised what date
- when the last follow-up occurred
- what evidence exists

### What must be validated

- Is the owner actually the right user?
- Does the owner experience repeated tracking friction?
- Is the problem significant enough to change behaviour?

---

# 5. Persona B — Small B2B Service Provider

## Status

**Hypothesis**

### Example business

Small professional/technical service company.

### Business model

- provides services to companies
- invoices after milestones or monthly work
- receives payment later
- follows up through email/WhatsApp/calls

### Possible workflow

```text
Service completed
      ↓
Invoice sent
      ↓
Due date
      ↓
Email follow-up
      ↓
Phone call
      ↓
Buyer commitment
      ↓
Payment
```

### Potential pain

Information may be spread between:

- email
- invoice software
- WhatsApp
- calendar
- spreadsheet
- accountant

### What must be validated

Whether this fragmentation actually creates meaningful effort.

---

# 6. Persona C — Small Distributor / Trader

## Status

**Hypothesis**

### Example business

Small distributor selling inventory to multiple business buyers.

### Possible characteristics

- many recurring invoices
- different payment terms
- multiple buyers
- partial payments
- repeated follow-ups

### Potential pain

The problem may be less about creating invoices and more about:

- knowing which accounts need attention
- tracking promised payment dates
- recording partial payments
- reconstructing buyer history

### What must be validated

Whether the workflow is materially different from the owner-managed supplier.

---

# 7. Anti-Persona

The product should not initially optimize for:

### Large enterprise finance teams

Reason:

- ERP systems
- dedicated accounts-receivable teams
- procurement workflows
- complex integrations

may make the proposed lightweight workflow irrelevant.

### Consumers

The problem is B2B receivables, not personal finance.

### Businesses that always collect upfront

They may not experience the target problem.

### Businesses with no recurring invoices

Low workflow recurrence.

### Users who never personally manage receivables

They may not be the right user for the first workflow.

---

# 8. Interview Recruitment Screener

Use a short screener before a full interview.

### Q1

Do you run or manage a small business that sells goods/services to other businesses?

### Q2

Do customers typically pay immediately or after some period?

### Q3

Approximately how many business invoices do you manage in a typical month?

### Q4

Who normally follows up when a customer has not paid?

### Q5

Tell me about the most recent invoice that was paid later than expected.

If the person cannot describe a recent relevant event, prioritize other participants.

---

# 9. Five-Real-People Requirement

Before treating the ICP as validated, document five actual examples.

Use this format:

| Person | Business | Relevant invoice workflow | Current substitute | Recent delayed payment | Contacted? | Evidence quality |
|---|---|---|---|---|---|---|
| 1 | TBD | TBD | TBD | TBD | Yes/No | TBD |
| 2 | TBD | TBD | TBD | TBD | Yes/No | TBD |
| 3 | TBD | TBD | TBD | TBD | Yes/No | TBD |
| 4 | TBD | TBD | TBD | TBD | Yes/No | TBD |
| 5 | TBD | TBD | TBD | TBD | Yes/No | TBD |

Do not fabricate names or businesses.

---

# 10. Persona Validation Rules

A persona becomes stronger when multiple users independently demonstrate:

- recurring credit sales
- delayed payments
- manual follow-up
- fragmented information
- difficulty tracking commitments
- difficulty retrieving evidence
- meaningful time/effort cost

A persona becomes weaker when users repeatedly report:

- no meaningful pain
- an existing system that works well
- no need to record commitments
- very rare overdue invoices
- a different dominant problem

---

# 11. Key Persona Questions

The most important question is not:

> "Would you use this?"

It is:

> **"Show me how you handled the last invoice that was paid late."**

Observe the actual workflow.

---

# 12. Persona Evolution

After interviews, update this file.

For each major change record:

```text
Previous assumption:
New evidence:
What changed:
Confidence:
Product implication:
```

Never rewrite history silently.


---

# 8. ICP Validation Gate

The primary ICP is only considered validated when the team can name at least five real people/businesses fitting the screening criteria and can describe their recent behaviour without relying on hypothetical answers.

## Preferred screening signals

- B2B customers rather than primarily consumers
- recurring credit sales / payment terms
- at least one recent overdue invoice
- owner/operator or person responsible for receivables follow-up
- currently uses a manual or fragmented process, or can demonstrate why existing software is insufficient

## Strong disqualifiers

- no credit sales
- no responsibility for collections
- only theoretical knowledge of delayed payments
- no recent concrete episode to discuss

Do not invent names for the five-person requirement. Use anonymised IDs if privacy matters.
