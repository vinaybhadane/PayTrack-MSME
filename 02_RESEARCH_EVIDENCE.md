# 02_RESEARCH_EVIDENCE.md

# Research Evidence Base

## MSME Delayed-Payment / Invoice Workflow

**Document status:** Research foundation  
**Purpose:** Give the coding/product agent the evidence context behind the project without turning hypotheses into facts.

---

# 1. Research Objective

The research objective was to identify a specific, defensible FinTech problem in India rather than immediately inventing an application.

The research was instructed to:

- map the India FinTech problem space
- prioritize official/primary sources
- identify candidate problems
- distinguish evidence from inference and assumptions
- examine current workarounds
- examine existing alternatives
- identify gaps
- assess prototype feasibility
- define a narrow, researchable problem statement
- create 48-hour validation plans

The resulting shortlist identified **MSME delayed-payment / invoice workflow** as the highest-scoring candidate in the research scorecard.

---

# 2. Important HackFront Principle

HackFront states that:

> A solution-first brief is an invitation to investigate, not a command to build.

The project must therefore preserve the distinction between:

**documented problem**

and

**specific workflow/product opportunity.**

A large public problem does not automatically prove that the proposed software is the correct solution.

---

# 3. Candidate Score

The research scorecard gave:

## MSME delayed-payment / invoice tracking

**39/45**

This was the highest-scoring candidate in the research pass.

The scorecard considered:

1. evidence strength
2. frequency
3. severity/cost
4. workaround intensity
5. interview access
6. 48-hour testability
7. solution gap
8. prototype feasibility
9. potential value

### Interpretation

The score means this candidate was considered strong enough to investigate further.

It does not mean:

- product-market fit is proven
- users want the proposed software
- competitors are inadequate
- users will pay
- the workflow is the primary cause of delayed payments

---

# 4. Strong Evidence: Documented Delayed-Payment Activity

The research reports Ministry of MSME evidence showing:

- **256,892 applications**
- involving approximately **₹55,244.31 crore**
- through **December 31, 2025**

It also reports:

- **52,744 applications awaiting MSEFC review**
- involving approximately **₹8,397.25 crore**

These numbers support the claim:

> Delayed payments are a significant documented issue in India's formal MSE ecosystem.

They do not establish the precise workflow failure being targeted by the prototype.

---

# 5. Strong Evidence: Formal Mechanism Exists

The research reports that MSEs have a statutory route for delayed payments after the applicable payment period, including the MSEFC mechanism.

The exact legal/regulatory details should be independently verified before they are presented as current legal guidance inside the product.

The prototype should therefore avoid making legal claims unless sourced.

---

# 6. Important Distinction

## What the evidence establishes

There is a documented delayed-payment problem in the formal MSE ecosystem.

## What the evidence does NOT establish

It does not prove that:

- poor invoice tracking causes delayed payments
- fragmented communication causes delayed payments
- missing evidence causes delayed payments
- existing accounting tools fail users
- users need a dedicated SaaS workflow
- a timeline will reduce overdue days
- users will pay for the proposed solution

These are research questions.

---

# 7. Current Workflow Evidence / Research Finding

The research identifies current approaches including:

- Excel
- WhatsApp
- paper
- ledgers
- accountants
- repeated calls
- email
- accounting/invoice software
- other manual methods

This suggests a potentially fragmented workflow.

However, the research correctly marks the specific claim:

> Suppliers lack a complete pre-dispute evidence trail

as a **hypothesis**, requiring walkthroughs of actual overdue invoices.

Therefore, the product must not say:

> "MSMEs currently have no way to track this."

That would be unsupported.

---

# 8. Existing Alternatives

The research identifies a broad alternative landscape including:

- Tally/ledger systems
- Excel
- WhatsApp
- Khatabook
- Vyapar
- invoice software
- accountants
- lawyers
- MSME Samadhaan
- ODR
- other existing accounting/payment workflows

This matters because the project competes against:

### Software

Existing accounting/invoicing products.

### Informal tools

WhatsApp, spreadsheets, notebooks.

### People

Accountants, staff, lawyers.

### Institutional mechanisms

Formal escalation/dispute mechanisms.

The project therefore needs to identify the **specific workflow gap**, not claim that no alternatives exist.

---

# 9. Cost Categories

The research identifies potential costs associated with delayed payments and workflow friction.

### Cash-flow uncertainty

Late payments can constrain available working capital.

### Operational effort

Repeated calls, messages, reminders, and information searching consume time.

### Business impact

Cash-flow uncertainty can affect:

- purchases
- payroll
- growth

### Administrative friction

A supplier may need to reconstruct:

- invoice details
- due dates
- buyer communication
- commitments
- evidence
- payment events

The final two categories require direct user validation before being presented as quantified pain.

---

# 10. Research Classification Table

| Research claim | Type | Confidence | Validation needed |
|---|---|---|---|
| Delayed payments are documented in formal MSEs | Evidence | High | Maintain source |
| Delayed-payment cases have substantial monetary value | Evidence | High | Maintain source |
| Formal delayed-payment mechanisms exist | Evidence | High | Verify current legal details |
| Suppliers use spreadsheets/WhatsApp/paper/accountants/calls | Research finding | Medium | Interviews |
| Workflow information is fragmented | Hypothesis | Low/Medium | Observe real workflows |
| Buyer commitments are poorly recorded | Hypothesis | Low | Interviews |
| Supporting evidence is hard to retrieve | Hypothesis | Low | Walkthrough |
| Existing tools leave a specific gap | Hypothesis | Low | Competitive/user research |
| Unified workflow improves efficiency | Hypothesis | Low | Prototype test |
| Users will adopt | Assumption | Low | Behavioural testing |
| Users will pay | Assumption | Low | Pricing research |
| Product reduces overdue days | Assumption | Very Low | Longitudinal test |

---

# 11. Candidate Problem Details

## Candidate A — Delayed-payment workflow

### User

Micro/small suppliers selling B2B on credit.

### Situation

Invoices remain unpaid beyond expected payment dates.

### Current workaround

Combinations of:

- spreadsheets
- WhatsApp
- paper
- calls
- email
- accountants
- invoice/accounting tools

### Potential cost

- cash-flow uncertainty
- follow-up effort
- information searching
- difficulty reconstructing payment history

### Evidence strength

Strong at the macro delayed-payment level.

### Remaining uncertainty

The exact pre-dispute workflow failure.

---

# 12. Why Invoice-Centered Workflow Is a Reasonable Prototype Direction

The invoice is the natural object around which the relevant information can be connected:

```text
Buyer
  │
  └── Invoice
       │
       ├── Amount
       ├── Due Date
       ├── Payment Status
       ├── Follow-ups
       ├── Commitments
       ├── Evidence
       ├── Payments
       └── Timeline
```

This structure does not claim that every supplier works this way.

It is a testable product hypothesis.

---

# 13. What the Prototype Can Credibly Test

The research indicates that a prototype can credibly test workflow-related questions such as:

- can users organize invoice information?
- can they identify overdue invoices?
- can they record follow-ups?
- can they record commitments?
- can they find evidence?
- can they reconstruct invoice history?
- can they identify the next action?
- is this easier than their current workflow?

---

# 14. What the Prototype Cannot Claim

Without additional evidence, the prototype cannot claim:

- it recovers delayed payments
- it prevents fraud
- it guarantees collection
- it improves legal outcomes
- it replaces lawyers
- it replaces accountants
- it provides lending
- it provides credit
- it guarantees cash-flow improvement
- it reduces overdue days
- it guarantees payment

---

# 15. Research Questions for User Interviews

## Past-event opening

> "Tell me about the last B2B invoice you had that was paid late."

Then:

### Tracking

- How did you know it was due?
- Where was the invoice recorded?
- Where did you record the due date?
- Did anyone else manage this?

### Follow-up

- When did you first follow up?
- How did you contact the buyer?
- How many times did you follow up?
- Where did you keep the history?

### Commitment

- Did the buyer promise a date?
- How was that promise communicated?
- Did you record it anywhere?
- What happened if the promised date was missed?

### Evidence

- Where was the invoice document?
- Where were purchase orders/delivery proofs?
- Where were messages/emails?
- Have you ever needed to reconstruct the history?

### Outcome

- What happened next?
- Was payment received?
- Was it partial?
- Did you escalate?
- What was the hardest part?

---

# 16. Validation Red Flags

Stop and reconsider the product direction if interviews repeatedly show:

### Red flag 1

Users already have a reliable system and do not experience meaningful friction.

### Red flag 2

The actual problem is buyer cash shortage and no tracking system would materially change it.

### Red flag 3

Accountants already handle the workflow completely.

### Red flag 4

Existing accounting software provides the exact required workflow with high satisfaction.

### Red flag 5

Users do not care about payment commitments or evidence.

### Red flag 6

Delayed invoices are too rare for the target group.

### Red flag 7

Users cannot trust a new platform with their business records.

These outcomes should be documented rather than rationalized away.

---

# 17. Competitive Research Direction

Do not compare products only by feature count.

Compare:

| Dimension | Question |
|---|---|
| Invoice creation | Does it exist? |
| Due-date tracking | How is it represented? |
| Overdue visibility | How quickly can users identify it? |
| Buyer commitments | Can promised payment dates be recorded? |
| Follow-up history | Is communication history captured? |
| Evidence | Can supporting files/records be linked? |
| Timeline | Can the entire invoice story be reconstructed? |
| Next action | Does the interface tell the user what needs attention? |
| Ease of use | Can a small supplier operate it without accounting expertise? |
| Existing workflow fit | Does it fit how users already work? |

The purpose is to discover the remaining gap.

---

# 18. Evidence Hierarchy

Use this hierarchy when evaluating claims.

### Level 1 — Direct official evidence

Government/regulatory/official datasets or reports.

### Level 2 — Direct user evidence

A real user describes or demonstrates past behaviour.

### Level 3 — Observed prototype evidence

A real user attempts a task and demonstrates friction or improvement.

### Level 4 — Secondary research

Competitor documentation, industry reports, credible analysis.

### Level 5 — Inference

A reasoned conclusion based on evidence.

### Level 6 — Assumption

A statement not yet supported by evidence.

The project should never present Level 5/6 as Level 1/2.

---

# 19. Research Source Notes

Primary research basis:

- HackFront Documentation.pdf
- India-specific HackFront FinTech research PDF supplied for this project

The research document contains source references to official Indian institutions including the Ministry of MSME and other financial/regulatory bodies.

If any external statistic is added later, record:

```text
Claim:
Source:
URL:
Publication date:
Access date:
Population:
Relevant period:
Why it supports the claim:
Limitations:
```

---

# 20. Current Evidence Summary

### High confidence

**Delayed payment is a real documented MSE problem.**

### Medium confidence

**There is likely a recurring operational workflow around tracking and follow-up.**

### Low confidence

**The specific workflow is poorly served by existing tools.**

### Unknown

**Whether a new product would materially improve outcomes.**

### Unknown

**Whether users will pay.**

This is the correct starting position for the build.

---

# 21. Research-to-Product Chain

```text
Documented delayed-payment problem
                ↓
Potential operational workflow gap
                ↓
Interview real suppliers
                ↓
Observe actual workflow
                ↓
Refine ICP
                ↓
Refine problem statement
                ↓
Choose one flow
                ↓
Build prototype
                ↓
Stranger test
                ↓
Measure friction
                ↓
Iterate
```

The prototype must not skip the validation steps simply because the technology is easy to build.


---

# 10. Implementation Evidence Rules

## Evidence hierarchy

1. Primary government/regulator source
2. Official programme/agency report
3. Reputable secondary source quoting the primary source
4. Direct user interview / observed workflow
5. Team inference
6. Team hypothesis
7. Team assumption

Never upgrade a lower category into a higher one without new evidence.

## Current evidence position

**Evidence:** delayed-payment cases are documented at substantial scale in the formal MSE sector; the research source reports 256,892 applications involving ₹55,244.31 crore through 31 December 2025 and 52,744 applications awaiting MSEFC review involving ₹8,397.25 crore.

**Evidence:** a statutory delayed-payment mechanism exists for covered MSE transactions.

**Inference:** formal redressal volumes suggest delayed payment is consequential for at least the affected filing population.

**Hypothesis:** some suppliers lack a consistent pre-dispute invoice-to-collection evidence trail.

**Assumption:** improving tracking/follow-up would reduce overdue duration, administrative effort, or financing pressure.

The prototype is a test of the workflow hypothesis, not proof of the macro market claim.

## Source discipline

Do not use the ₹10.7 lakh crore estimate as if it were equivalent to the Ministry of MSME's Samadhaan application value. They measure different things. If both are shown, label their source, scope, date, and meaning separately.
