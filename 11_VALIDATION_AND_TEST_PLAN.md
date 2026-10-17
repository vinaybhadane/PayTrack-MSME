# 11_VALIDATION_AND_TEST_PLAN.md

# Validation & Testing Plan

## Document Status

**Version:** v1  
**Purpose:** Validate both the underlying problem and the prototype workflow.

---

# 1. Validation Principle

Do not ask users whether they like the idea.

Observe what they actually did.

HackFront emphasizes past-behaviour questions because future-intent answers are often polite but unreliable.

---

# 2. Validation Questions

The core research question:

> **Do real micro/small B2B suppliers repeatedly experience the specific workflow problem described in the problem statement?**

The product question:

> **Does an invoice-centered workflow make the relevant process easier to manage?**

---

# 3. Interview Recruitment

Target:

**2–3 initial conversations** for early learning.

Prefer participants who:

- operate/manage a B2B business
- sell on credit
- issue recurring invoices
- have experienced delayed payment
- personally manage/supervise follow-up

The project should eventually document five real ICP examples.

---

# 4. Interview Opening

Use:

> "Tell me about the last invoice you had that was paid later than expected."

Do not begin with:

> "We are building an invoice tracking application. Would you use it?"

---

# 5. Interview Script

## Context

1. What does your business sell?
2. Who typically buys from you?
3. How do customers normally pay?
4. How many invoices do you manage approximately?

## Recent event

5. Tell me about the last invoice that was paid late.
6. When did you realize it was late?
7. What did you do next?
8. Who handled the follow-up?

## Tracking

9. Where was the invoice recorded?
10. Where was the due date?
11. How did you know it needed attention?

## Follow-up

12. How did you contact the buyer?
13. How many times did you follow up?
14. Where did you keep the history?

## Commitment

15. Did the buyer promise a payment date?
16. How did they communicate it?
17. Where did you record it?
18. What happened when the promised date passed?

## Evidence

19. Where was the invoice document?
20. Where were delivery proofs/purchase orders?
21. Where were WhatsApp/email records?
22. Have you ever needed to reconstruct the entire history?

## Outcome

23. When was payment finally received?
24. Was it partial?
25. What was the most difficult part?

---

# 6. Observation Task

If appropriate and consented:

> "Can you show me, using your normal process, how you would find the last overdue invoice and show me what happened?"

Observe without taking control.

Record:

- tools opened
- time taken
- searching
- switching between apps
- missing information
- manual calculations
- confusion
- repeated actions

Do not request sensitive documents unnecessarily.

---

# 7. Insight Ledger

Each important insight should use:

```text
Insight:
Origin:
Type: Observed / Stated / Sourced / Assumed
Confidence:
Consequence:
```

Example:

```text
Insight:
Supplier checked WhatsApp and Excel to reconstruct a buyer's promised date.

Origin:
Interview 02.

Type:
Observed.

Confidence:
High for this participant; not yet generalizable.

Consequence:
Strengthens fragmentation hypothesis and supports timeline testing.
```

---

# 8. Assumption Ranking

Rank assumptions by how damaging they would be if false.

Example:

### A1

The workflow is recurring.

### A2

Information is fragmented.

### A3

Commitments are worth recording.

### A4

A timeline is easier than current workflow.

### A5

Users will adopt.

### A6

Users will pay.

---

# 9. 48-Hour Validation Tests

## Test A — Workflow fragmentation

### Hypothesis

Suppliers reconstruct overdue invoice history across multiple tools.

### Test

Interview 3 suppliers about their last overdue invoice.

### Evidence

Ask them to describe or demonstrate:

- invoice record
- due date
- last follow-up
- buyer commitment
- evidence

### Pass signal

Multiple participants independently use multiple sources.

### Fail signal

Most participants have a single reliable workflow.

---

## Test B — Commitment tracking

### Hypothesis

Buyer payment commitments are difficult to track consistently.

### Test

Ask:

> "What did the buyer promise on the last delayed invoice, and where did you record it?"

### Pass signal

Users struggle to locate/remember the commitment.

### Fail signal

Commitments are already captured reliably.

---

## Test C — Evidence retrieval

### Hypothesis

Users spend effort finding supporting records for overdue invoices.

### Test

Ask users to show where they would find:

- invoice
- delivery proof
- buyer communication
- payment commitment

### Pass signal

Multiple systems or searches are required.

### Fail signal

Evidence is already centralized and easy to retrieve.

---

# 10. Prototype Usability Test

## Task

> "Create an invoice for ABC Industries for ₹85,000 due in 30 days. Record a follow-up where the buyer promises payment on 5 October. Attach supporting evidence. Then record a ₹40,000 payment and show me how much remains outstanding."

Do not guide the participant.

---

# 11. Measure

Record:

### Completion

Did they complete the task?

### Time

How long?

### Errors

Wrong clicks/input errors.

### Hesitation

Where did they stop or ask questions?

### Comprehension

Could they explain:

- status
- outstanding amount
- commitment
- timeline?

### Trust

Did they hesitate to enter/upload information?

---

# 12. Stranger Test

At least two people who have not heard the developer's detailed explanation.

Give them only the task.

Observe silently.

Record:

```text
Participant:
Task:
First action:
Hesitations:
Wrong clicks:
Questions:
Unexpected interpretation:
Completion:
Time:
What changed afterward:
```

---

# 13. Deliberate Break Tests

HackFront requires intentionally breaking the flow.

Test:

### Empty field

Create invoice without amount.

Expected:

- validation
- no corrupt record

### Very long entry

Use an extremely long note/buyer name.

Expected:

- UI remains stable
- safe validation/storage

### Unsupported input

Upload unsupported file.

Expected:

- rejection
- clear explanation

Additional recommended tests:

- negative amount
- zero amount
- invalid date
- duplicate invoice number
- payment greater than outstanding
- unauthorized invoice ID
- expired session

---

# 14. Test Matrix

| Test | Expected | Result | Pass? |
|---|---|---|---|
| Login | Protected app | TBD | TBD |
| Create invoice | Saved | TBD | TBD |
| Missing amount | Validation | TBD | TBD |
| Overdue status | Correct | TBD | TBD |
| Follow-up | Timeline event | TBD | TBD |
| Commitment | Visible | TBD | TBD |
| Evidence | Authorized upload | TBD | TBD |
| Partial payment | Correct outstanding | TBD | TBD |
| Full payment | PAID | TBD | TBD |
| Unauthorized access | Denied | TBD | TBD |
| Stranger test | Task completed | TBD | TBD |

---

# 15. Evidence Thresholds

Do not call a pattern "validated" after one person.

Suggested language:

### One participant

> Individual observation.

### Two similar participants

> Emerging pattern.

### Three or more independent participants

> Stronger recurring pattern, still limited sample.

### Repeated observation + behaviour

> High-confidence qualitative signal for this validation stage.

These are working research labels, not statistical claims.

---

# 16. Validation Outcomes

There are three acceptable outcomes.

## Outcome A — Confirm

The workflow repeatedly appears and prototype helps.

Action:

- refine
- expand validation

## Outcome B — Refine

The problem exists but the important workflow is different.

Action:

- modify problem statement
- modify MVP

## Outcome C — Reject

The assumed workflow is not meaningful.

Action:

- document evidence
- revisit problem space

Rejecting the hypothesis is a successful research outcome.

---

# 17. Build Review

After implementation, compare:

### Intended

What the spec says.

### Actual

What the product does.

### Difference

Where implementation diverged.

### Reason

Why.

### Decision

Keep/fix/remove.

---

# 18. AI Review

Ask the coding agent:

> Review the implementation against `PROJECT_SPEC.md`, `AGENTS.md`, and the product requirements. Identify missing requirements, scope creep, security issues, inconsistent business logic, and UX problems. Do not rewrite code yet.

Then independently review its review.

---

# 19. Validation Log

Maintain:

```text
VALIDATION_LOG.md
```

with:

```text
Date:
Participant:
ICP fit:
Situation:
Observed behaviour:
Current substitute:
Pain:
Evidence:
Contradiction:
Confidence:
Product implication:
Next test:
```

---

# 20. Final Validation Question

Before expanding beyond MVP, answer:

> **What did we learn from real users that changed what we built?**

If the answer is "nothing," validation was probably too shallow.


---

# 12. Required Prototype Test Matrix

## Functional test

Create buyer → create invoice → add follow-up → add commitment → upload evidence → record partial payment → verify outstanding → verify timeline.

## Negative tests

1. Empty invoice number.
2. Zero/negative amount.
3. Due date before issue date where disallowed.
4. Payment greater than outstanding.
5. Very long buyer name/notes.
6. Unsupported evidence file.
7. Oversized evidence file.
8. Invalid invoice ID.
9. Access another business's invoice by changing URL ID.
10. Submit the same payment twice quickly.
11. Expired/invalid session.
12. Direct API mutation without authentication.

## Stranger test

Give two people who have not seen the product explanation only this task:

> “Create an invoice for ABC Industries for ₹85,000, due in 30 days. Record a follow-up, add a buyer promise for 5 October, attach evidence, then record a ₹40,000 payment. Show me how much remains outstanding.”

Do not guide them. Record every hesitation, wrong click, question and recovery attempt.

## Success criteria

The flow is considered promising if users can complete the task without developer intervention, correctly interpret the invoice state, and locate the next action. Do not invent a numeric success threshold before observing the first sessions; set a threshold after the initial test if justified.

## Problem validation evidence

Strong evidence includes a real recent episode, concrete workaround, time/money cost, repeated behaviour, and willingness to change current behaviour. “I would use this” alone is weak evidence.
