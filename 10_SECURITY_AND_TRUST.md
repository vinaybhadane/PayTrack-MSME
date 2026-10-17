# 10_SECURITY_AND_TRUST.md

# Security, Privacy & Trust Specification

## Document Status

**Version:** v1  
**Purpose:** Establish security expectations for a FinTech-related prototype handling business and financial records.

---

# 1. Security Principle

The product handles potentially sensitive:

- business information
- buyer information
- invoice amounts
- payment records
- communication records
- supporting documents

Security is therefore a product requirement, not a later enhancement.

---

# 2. Authentication

The application MUST:

- require authentication for private business data
- protect authenticated routes
- support sign-out
- handle expired sessions
- avoid storing passwords directly

Recommended:

**Supabase Auth**

---

# 3. Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to access?

Every protected operation must enforce both.

---

# 4. Tenant Isolation

The fundamental rule:

> **User A must never be able to access User B's business records.**

This applies to:

- buyers
- invoices
- payments
- follow-ups
- commitments
- evidence
- activity events

---

# 5. Database Security

If Supabase is used:

- enable Row Level Security
- define explicit policies
- test unauthorized access
- do not rely only on application UI restrictions

Never assume that hiding a record in the frontend provides security.

---

# 6. Service Role Key

A Supabase service role key, if required, must:

- exist only server-side
- never be exposed to browser code
- never be committed to Git
- never appear in client bundles

---

# 7. Environment Variables

Use:

```text
.env.local
```

locally.

Provide:

```text
.env.example
```

with placeholders.

Never commit:

- `.env`
- `.env.local`
- API keys
- service credentials
- database passwords
- private keys

---

# 8. File Upload Security

Evidence uploads must have:

### Type restrictions

Allow only required file types.

Potential MVP:

- PDF
- PNG
- JPG/JPEG
- XLSX/CSV only if actually needed

Do not allow arbitrary executable files.

### Size restrictions

Define a reasonable maximum.

### Authorization

Users can only view/delete files belonging to their authorized business.

### Metadata

Store:

- original file name
- MIME type
- size
- upload timestamp
- storage path
- uploader

Do not trust client-provided MIME information alone.

---

# 9. Input Validation

Validate all user input server-side.

Important:

- invoice number
- amount
- dates
- buyer IDs
- payment IDs
- evidence IDs
- notes
- search parameters

Use a schema validator such as Zod.

---

# 10. Money Safety

Financial calculations must be exact.

Do not use JavaScript floating-point arithmetic carelessly.

Use:

- integer minor units, or
- PostgreSQL NUMERIC/DECIMAL

and centralize calculations.

---

# 11. Date Safety

Avoid silently changing dates because of timezone conversions.

Distinguish:

- business dates
- timestamps

For due dates and invoice dates, preserve the intended calendar date.

---

# 12. Auditability

Important events should be recorded.

Examples:

- invoice created
- invoice updated
- payment recorded
- follow-up recorded
- commitment recorded
- evidence added

The activity timeline should preserve history.

---

# 13. Trust in Recorded Information

The product must distinguish:

### User-entered information

Example:

> Buyer promised payment on 5 October.

### System-calculated information

Example:

> 18 days overdue.

### Future AI-extracted information

Example:

> "Potential payment commitment detected."

AI-derived information must never be presented as confirmed user facts without review.

---

# 14. AI Safety

If AI is later introduced:

AI MUST NOT:

- invent payment commitments
- invent invoice values
- invent dates
- invent evidence
- fabricate buyer statements
- make legal conclusions
- guarantee payment
- make financial promises

AI outputs should include:

- source
- confidence where appropriate
- human confirmation

---

# 15. Legal / Regulatory Positioning

The prototype should not imply:

- legal advice
- guaranteed legal compliance
- legal representation
- guaranteed MSME claim outcome
- guaranteed recovery
- financial advice

If regulatory information is shown:

- cite the source
- show date/context
- avoid interpreting law beyond the source
- add appropriate informational language

---

# 16. Privacy

Only collect information necessary for the workflow.

Avoid collecting:

- unrelated personal data
- unnecessary identity documents
- unnecessary bank credentials

The MVP does not require bank credentials.

---

# 17. Data Minimization

For example, buyer contact information should only be collected if useful to the workflow.

Fields should be:

- required only when necessary
- optional when not required

---

# 18. Error Messages

Never expose:

- SQL errors
- stack traces
- internal database structure
- access-control details
- secret values

Bad:

> `PostgrestError: relation invoices violates policy...`

Better:

> We couldn't complete that action. Please try again.

---

# 19. Logging

Logs should not contain unnecessary:

- invoice amounts
- buyer contact information
- document contents
- authentication tokens
- secrets

If an identifier is required for debugging, prefer safe internal IDs.

---

# 20. Security Test Checklist

Before demo:

### Authentication

- [ ] unauthenticated user cannot access dashboard
- [ ] logout works
- [ ] expired session handled

### Authorization

- [ ] user cannot access another business by URL
- [ ] user cannot modify another business's invoice
- [ ] user cannot access another business's evidence

### Input

- [ ] invalid amount rejected
- [ ] invalid date rejected
- [ ] invalid ID rejected
- [ ] oversized upload rejected

### Storage

- [ ] unauthorized file access denied
- [ ] unsupported file types rejected

### Secrets

- [ ] no `.env` committed
- [ ] no API key in client bundle
- [ ] no secret in screenshots/demo

---

# 21. Trust UX

The UI should make state clear.

Examples:

```text
Recorded by you
Calculated by system
Pending confirmation
```

Avoid pretending that the software knows more than it actually knows.

---

# 22. Product Trust Statement

Potential product copy:

> **Your invoice records stay organized in one place. The platform helps you track and document your receivables; it does not guarantee payment recovery or provide legal advice.**

This should be refined after legal/product review.

---

# 23. Security Definition of Done

The MVP is not complete until:

- authorization is enforced
- file access is protected
- input validation exists
- secrets are externalized
- financial calculations are deterministic
- failed operations are not falsely reported as successful
- basic security tests pass


---

# 12. Security Implementation Checklist

## Authentication

- Firebase client SDK handles sign-in.
- Firebase Admin verifies identity server-side.
- Session cookie is HttpOnly/Secure in production.
- Logout clears/invalidate session.
- Never trust client-provided Firebase UID.

## Authorization

Create a single server helper such as `requireBusinessAccess(businessId, allowedRoles)` and use it for every private operation. Do not duplicate ad-hoc authorization logic across routes.

Resource authorization must follow the ownership chain. For example, invoice access is allowed only if the authenticated user is a member of the invoice's `business_id`.

## Secrets

Client-safe Firebase configuration may use `NEXT_PUBLIC_` variables. Firebase Admin credentials and Supabase service-role key must never use `NEXT_PUBLIC_`. Keep secrets in hosting environment configuration and local `.env.local`, which must never be committed.

## CSRF

If cookie-authenticated state-changing requests are used, validate Origin/Referer against the expected application origin and/or use a CSRF token strategy. Use SameSite cookies as defense in depth, not as the only control.

## Input security

Validate all server inputs with Zod. Normalize strings. Apply maximum lengths. Reject unexpected enum values. Use parameterized database queries through the Supabase client.

## Evidence upload security

Allow only explicitly supported types such as PDF, PNG, JPEG and WEBP for MVP. Enforce a conservative size limit. Validate MIME and file signature where possible. Generate random storage names. Never execute uploaded files. Never serve evidence from a public bucket.

## Privacy

Collect only data necessary for the workflow. Do not collect bank passwords, card details, Aadhaar, PAN, or unnecessary identity documents in the MVP. Do not claim legal admissibility of stored evidence.

## Logging

Log security events without logging invoice contents, evidence contents, secrets, session tokens or unnecessary personal data. Do not expose stack traces to end users.

## Abuse controls

Rate-limit sign-in/session endpoints and mutation endpoints where practical. Add server-side file limits and request-body limits. Prevent duplicate form submissions with idempotency or transactional checks for payment creation where feasible.

## Security definition of done

A feature is not done until authorization, validation, error handling, tenant isolation and secret handling have been reviewed—not merely because the happy path works.
