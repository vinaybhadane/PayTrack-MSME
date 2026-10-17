# PayTrack MSME 🇮🇳

> **A focused B2B invoice timeline, commitment tracking, and evidence management platform designed for India's Micro and Small Enterprises (MSEs).**
> Built as a HackFront Module 1 FinTech prototype.

---

## 📌 Executive Summary

Micro and Small Enterprises (MSEs) in India face intense working-capital pressure when B2B buyers delay payments for goods and services sold on credit. 

Before a delayed payment escalates into a formal dispute (e.g., under the MSMED Act / MSME Samadhaan), suppliers frequently rely on fragmented tools—WhatsApp messages, phone calls, paper slips, spreadsheets, and external accountants—to track payment promises and follow-ups.

**PayTrack MSME** bridges this critical pre-dispute workflow gap by maintaining a structured, chronological audit trail for every invoice awaiting settlement.

---

## 🔄 Core Operational Workflow

PayTrack is built strictly around a unified operational sequence:

```mermaid
flowchart LR
    A[1. Record Invoice] --> B[2. Define Due Date]
    B --> C[3. Record Follow-up]
    C --> D[4. Log Buyer Commitment]
    D --> E[5. Attach Evidence]
    E --> F[6. Mark Settlement]
    F --> G[7. Audit Timeline]
```

1. **Invoice & Terms**: Record invoice number, buyer GSTIN, credit period (15/45 days under MSMED guidelines), and net amount.
2. **Follow-Up Log**: Record outreach attempts (phone, email, WhatsApp, in-person).
3. **Commitment Tracker**: Log specific buyer promises (e.g., *"Committed to pay ₹1,50,000 by 24th Oct"*).
4. **Evidence Vault**: Attach supporting proof (delivery challans, transport receipts, signed acknowledgment, WhatsApp screenshots).
5. **Unified Audit Timeline**: Maintain a complete, unfragmented operational history of every action and commitment.

---

## 📑 Project Specification & Research Documents

This repository includes the complete 15-document design and evidence pack used to architect and construct this application:

| Document | Title | Description |
|---|---|---|
| [00_PROJECT_CHARTER.md](./00_PROJECT_CHARTER.md) | Project Charter | Problem boundary, stakeholder model, and prototype scope |
| [01_PROBLEM_STATEMENT.md](./01_PROBLEM_STATEMENT.md) | Problem Statement | Research hypothesis, empirical evidence vs. assumptions |
| [02_RESEARCH_EVIDENCE.md](./02_RESEARCH_EVIDENCE.md) | Research Evidence | Documented delayed-payment exposure in India's formal MSE sector |
| [03_USER_PERSONAS.md](./03_USER_PERSONAS.md) | User Personas | Profiles of small manufacturing suppliers & wholesale traders |
| [04_USER_WORKFLOWS.md](./04_USER_WORKFLOWS.md) | User Workflows | Detailed step-by-step user journeys and operational flows |
| [05_PRODUCT_REQUIREMENTS.md](./05_PRODUCT_REQUIREMENTS.md) | Product Requirements | Functional & non-functional requirements (PRD) |
| [06_MVP_SCOPE.md](./06_MVP_SCOPE.md) | MVP Scope | Explicit inclusions and strict non-goals (no ERP/accounting bloat) |
| [07_UX_UI_SPEC.md](./07_UX_UI_SPEC.md) | UX/UI Specification | Screen layouts, data density, typography, and states |
| [08_TECHNICAL_ARCHITECTURE.md](./08_TECHNICAL_ARCHITECTURE.md) | Technical Architecture | Next.js App Router, Firebase Auth, Supabase DB & Storage |
| [09_DATA_MODEL.md](./09_DATA_MODEL.md) | Data Model | Relational schema (Businesses, Invoices, Commitments, Evidence) |
| [10_SECURITY_AND_TRUST.md](./10_SECURITY_AND_TRUST.md) | Security & Trust | Multi-tenant isolation, authorization barriers, signed URLs |
| [11_VALIDATION_AND_TEST_PLAN.md](./11_VALIDATION_AND_TEST_PLAN.md) | Validation & Test Plan | End-to-end tests, stranger testing rubric, deliberate break tests |
| [12_BUILD_PLAN.md](./12_BUILD_PLAN.md) | Build Plan | Phased implementation schedule and milestones |
| [AGENTS.md](./AGENTS.md) | AI Agent Instructions | Strict operating rules, evidence discipline, and non-negotiables |
| [MASTER_BUILD_BRIEF.md](./MASTER_BUILD_BRIEF.md) | Master Build Brief | Concise executive directives and technical rules |
| [PACK_README.md](./PACK_README.md) | Pack Overview | Module 1 pack introduction and reading order |

---

## 🎨 Centralized Theme Architecture

The entire visual identity and color palette of PayTrack is centralized in **one single file**:

👉 **[`src/styles/theme.css`](./src/styles/theme.css)**

To change the theme across the **entire website** (navigation, hero badges, buttons, glowing borders, cards, footer, modals, and landing pages), you only need to modify the CSS variables in this one file.

### Built-in Ready-to-Use Presets:
Inside [`src/styles/theme.css`](./src/styles/theme.css), you will find pre-configured palettes that can be swapped in seconds:
- **Sunflower Gold** (`#FFD758`) — *Default active high-contrast executive theme*
- **Amethyst Lavender** (`#9E7EB5`) — *Modern FinTech purple accent*
- **Emerald Mint** (`#0D9488`) — *Trust & cash-flow green accent*
- **Royal Blue** (`#3B82F6`) — *Institutional banking blue accent*

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Hardware-accelerated CSS cubic bezier transitions
- **Identity & Auth**: Firebase Authentication (Session Cookie / Admin SDK token verification)
- **Database & Storage**: Supabase PostgreSQL + Private Bucket Storage with Server-Generated Signed URLs
- **Validation**: Zod + React Hook Form

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm / yarn / pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vinaybhadane/PayTrack-MSME.git
cd PayTrack-MSME
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 🛡️ License & Legal Disclaimers

- Distributed under the [MIT License](./LICENSE).
- **Informational Notice**: PayTrack is a receivables workflow and operational record management prototype. It does not provide legal advice, guarantee debt collection, or act as an NBFC/lender. Any MSMED Act references are provided strictly for informational convenience.
