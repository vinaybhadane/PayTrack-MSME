# MASTER BUILD BRIEF

## MSME Delayed-Payment / Invoice Workflow Platform

**Working product name:** PayTrack MSME  
**Theme:** FinTech  
**Project stage:** HackFront Module 1  
**Document status:** Foundation brief  
**Build status:** Pre-development

---

# 1. Executive Summary

This project explores a focused operational problem faced by micro and small business suppliers that sell goods or services on credit.

The research indicates that delayed payments are a documented problem in India's formal MSE sector. The current research focus is narrower: suppliers may struggle to maintain a consistent record of invoice due dates, buyer payment commitments, follow-ups, and supporting evidence across tools such as spreadsheets, WhatsApp, paper records, accountants, email, and phone calls.

The prototype will test whether bringing this workflow into one coherent invoice-level timeline makes the process easier to understand, maintain, and act on.

The product is therefore **not** positioned initially as a complete accounting platform or a payment-recovery system.

---

# 2. Problem Statement

> **Micro and Small Enterprises (MSEs) in India face significant working-capital pressure when B2B customers delay payments for goods and services sold on credit. Before a payment becomes a formal dispute, suppliers often rely on fragmented workflows such as spreadsheets, WhatsApp messages, phone calls, paper records, and accountants to track invoice due dates, follow-ups, buyer payment commitments, and supporting evidence. This makes it difficult to maintain a consistent view of what is outstanding, what a buyer has committed to pay and when, what follow-up has already occurred, and what evidence is available, increasing administrative effort and creating uncertainty around cash flow and collection. The scale of documented delayed-payment exposure in India's MSE sector indicates that delayed B2B payments are a significant financial-management problem, while the specific pre-dispute workflow gap and its severity remain hypotheses that must be validated through conversations and observed behaviour of real MSE suppliers.**

### Important interpretation

The last clause is deliberate.

We have evidence that delayed payments are a significant documented problem.

We do **not yet have sufficient direct user evidence** proving that the exact proposed workflow is the dominant pain point for a sufficiently large group of suppliers.

That must be tested.

---

# 3. Product Hypothesis

### Current hypothesis

Micro and small B2B suppliers that regularly sell on credit experience avoidable operational friction when managing unpaid invoices because payment status, buyer commitments, follow-ups, and evidence are distributed across multiple tools and communication channels.

### Product hypothesis

If these suppliers can maintain an invoice-centered record containing:

- invoice information
- due date
- payment status
- follow-up history
- buyer commitments
- supporting evidence
- payment history

then they may be able to manage overdue invoices with less searching and fewer missed follow-up details.

This is a hypothesis, not a validated outcome.

---

# 4. Target User

## Primary ICP

A micro or small business supplier that:

- sells goods or services to other businesses
- frequently provides credit/payment terms
- receives payment after delivery
- has recurring invoices
- personally manages or supervises receivables
- uses a mixture of digital and manual tools
- has experienced at least one delayed payment
- can be reached for an interview or prototype test

The ICP must eventually become specific enough to identify five real people.

---

# 5. Core User Job

> **"Help me know what is owed to me, what is overdue, what the buyer promised, what follow-up has already happened, and where the supporting evidence is."**

This is more specific than:

> "Help MSMEs manage money."

---

# 6. Core Workflow

The first product flow is:

```text
Record Invoice
      ↓
Set Due Date / Terms
      ↓
Monitor Status
      ↓
Identify Due / Overdue Invoice
      ↓
Record Follow-up
      ↓
Record Buyer Commitment
      ↓
Attach / Record Evidence
      ↓
Track Payment
      ↓
Close Invoice
```

The product should make this flow easy to understand and complete.

---

# 7. Primary Screens

The initial product should contain only the screens needed to support the core workflow.

### 1. Dashboard

Purpose:

- show outstanding amount
- show overdue amount
- show due-soon invoices
- show recently paid amount
- surface invoices requiring attention
- show recent activity

### 2. Invoice List

Purpose:

- scan invoices
- filter by status
- search buyer/invoice
- sort by due date/amount/status

### 3. Create Invoice

Purpose:

- create a receivable record
- capture buyer
- invoice number
- amount
- invoice date
- due date/payment terms

### 4. Invoice Detail

Purpose:

- show complete state of one invoice
- show amount and status
- show due date
- show follow-ups
- show commitments
- show evidence
- show payments
- show timeline
- expose next action

### 5. Follow-up Recording

Purpose:

- record communication
- channel
- date
- notes
- buyer response
- next expected action/date

### 6. Evidence

Purpose:

- associate documents or records with the invoice
- show what evidence exists
- maintain chronological context

---

# 8. MVP

## Must Have

- authentication
- business profile
- buyer records
- invoice creation
- invoice list
- invoice detail
- invoice status
- due date
- overdue calculation
- follow-up recording
- payment commitment recording
- evidence/document record
- payment recording
- invoice timeline
- dashboard summary
- search/filter
- validation and error handling
- authorization

## Should Have

- reminders
- CSV export
- advanced filtering
- basic receivables analytics
- activity history

## Future

- WhatsApp integration
- email integration
- automatic communication capture
- OCR
- AI extraction
- AI commitment extraction
- GST integration
- accounting integrations
- banking integrations
- TReDS integrations
- MSME Samadhaan workflow integration
- legal workflow
- financing
- automated collections

---

# 9. Explicit Non-Goals

The MVP does not:

- process payments
- move money
- provide credit
- provide loans
- guarantee collection
- automatically recover delayed payments
- adjudicate disputes
- provide legal advice
- replace accountants
- replace ERP/accounting software
- determine whether a legal claim will succeed
- automatically file legal complaints
- claim regulatory compliance beyond what is actually implemented

---

# 10. Value Mechanism

The proposed mechanism is:

> **Create a single invoice-centered operational record that connects due dates, payment status, buyer commitments, follow-ups, evidence, and payments so that the supplier can understand the current state of an unpaid invoice without reconstructing the history from multiple tools.**

Notice that this describes **how value could be created**, not merely:

> "We use AI."

---

# 11. Design Direction

### Desired character

- premium B2B SaaS
- trustworthy
- modern FinTech
- clean
- professional
- information-rich without being cluttered

### Visual priorities

1. Financial information must be immediately readable.
2. Overdue items must be distinguishable.
3. Status must never rely on color alone.
4. Actions must be obvious.
5. Tables must remain readable.
6. Invoice detail must feel like a case file/timeline rather than a generic CRUD page.
7. Important dates must have clear context.

---

# 12. Technology Direction

Recommended initial stack:

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or another accessible component foundation

### Backend

- Next.js server actions/API routes for the initial prototype

### Database

- PostgreSQL through Supabase

### Authentication

- Supabase Auth

### Storage

- Supabase Storage for evidence documents

### Hosting

- Vercel for the web application
- Supabase for backend services

### Why this stack

It is suitable for a fast, maintainable web prototype with:

- authentication
- relational data
- file storage
- server-side operations
- rapid deployment
- strong TypeScript support

The final stack must be documented in the technical architecture document.

---

# 13. Evidence Position

### Strongly supported

- Delayed payments are a documented problem in India's formal MSE sector.
- Formal mechanisms exist for delayed-payment cases.
- Significant application/value backlogs have been documented.

### Needs validation

- Suppliers consistently struggle with the exact invoice-to-follow-up evidence workflow.
- Fragmentation across tools is a recurring operational burden.
- The problem is frequent enough to justify a dedicated workflow.
- A unified invoice timeline is meaningfully better than current substitutes.
- Users would adopt the workflow.
- Users would pay for it.

### Must not be claimed without evidence

- "All MSMEs have this problem."
- "Existing tools do not solve this."
- "Our product will reduce overdue days."
- "Our product will prevent borrowing."
- "Our product will recover money."
- "Our product is legally compliant with every applicable regulation."

---

# 14. Validation Goal

The immediate goal is not to prove that the product will become a large company.

The immediate goal is to answer:

> **Do real micro/small B2B suppliers repeatedly experience the specific workflow problem described here, and does an invoice-centered workflow make that process materially easier to manage?**

---

# 15. Success Criteria for the Prototype

A successful prototype should allow a stranger to:

1. understand what the product does
2. create an invoice
3. identify an overdue invoice
4. record a follow-up
5. record a buyer commitment
6. attach or record supporting evidence
7. understand the invoice timeline
8. update payment status
9. determine what needs attention next

---

# 16. HackFront Alignment

The project should produce evidence for:

- specific problem statement
- evidence vs assumption separation
- specific ICP
- current substitute
- falsifiable hypothesis
- one meaningful flow
- reusable project specification
- testable prototype
- stranger testing
- documented iteration

The product should remain small enough to build and test properly rather than broad enough to look impressive but remain unvalidated.

---

# 17. Decision Rule

Whenever there is a conflict between:

**more features**

and

**better validation of the core workflow**

choose the latter.

Whenever there is a conflict between:

**visual novelty**

and

**clear financial information**

choose clarity.

Whenever there is a conflict between:

**AI-generated assumption**

and

**real user evidence**

choose the evidence.


---

# 17. Final Product Direction — Implementation Baseline

## Product name

**PayTrack** (working name). Subtitle: **B2B Receivables Workflow**.

The word “MSME” may appear in marketing/demo context, but the UI should feel like a professional product rather than a government portal.

## Product promise

> **Know what is owed, what was promised, what happened, and what needs attention next.**

## Core information architecture

- Overview
- Receivables
- Buyers
- Activity / Follow-ups
- Evidence
- Settings

The invoice detail page is the centre of gravity. The dashboard is a decision surface, not the product itself.

## MVP happy path

Create buyer → create ₹85,000 invoice with 30-day terms → invoice becomes due/overdue based on date → record follow-up → record buyer commitment for 5 October → attach evidence → record ₹40,000 payment → system displays ₹45,000 outstanding and the complete chronological timeline.

## Visual direction

Design a premium, restrained B2B SaaS interface inspired by the clarity and density of high-quality products such as Stripe, Linear, Ramp, and modern enterprise finance tools, without copying their branding or layouts.

Use a neutral canvas, strong typography, subtle borders, compact status badges, restrained accent colour, high-quality tables, command/search affordances, and contextual side panels. Avoid excessive glassmorphism, neon gradients, cartoon illustrations, fake AI badges, and decorative charts.

## Free-tool rule

Use free/open-source libraries and free tiers only. If a service's free tier changes, preserve the architecture and substitute an equivalent free/open-source option rather than introducing paid infrastructure.

## AI rule

Do not add AI merely to claim that the product is AI-powered. The MVP can be deterministic. If an AI feature is later proposed, document the user job, data sent externally, privacy impact, failure mode, cost, and human verification step before implementation.
