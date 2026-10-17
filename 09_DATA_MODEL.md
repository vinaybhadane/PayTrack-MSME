# 09_DATA_MODEL.md

# Data Model

## Document Status

**Version:** v1  
**Database direction:** PostgreSQL / Supabase

---

# 1. Data Model Principle

The data model should represent the real operational story of an invoice.

The core object is:

> **Invoice**

Everything relevant to the payment workflow should connect to it.

---

# 2. Entity Relationship

```text
User
 │
 └── Business
      │
      ├── Buyers
      │     └── Invoices
      │            ├── FollowUps
      │            ├── Commitments
      │            ├── Evidence
      │            ├── Payments
      │            └── ActivityEvents
      │
      └── ActivityEvents
```

---

# 3. users

Authentication is preferably managed by Supabase Auth.

Application profile data may include:

```text
users
------
id
name
email
created_at
updated_at
```

Do not duplicate authentication credentials in the application database.

---

# 4. businesses

```text
businesses
----------
id
name
owner_user_id
created_at
updated_at
```

Future multi-user businesses may use a membership table.

---

# 5. business_members

Recommended for future-safe authorization:

```text
business_members
----------------
id
business_id
user_id
role
created_at
```

Roles may initially be:

```text
OWNER
MEMBER
```

Do not implement complex role management unless required.

---

# 6. buyers

```text
buyers
------
id
business_id
name
contact_person
email
phone
address
notes
created_at
updated_at
```

Rules:

- buyer belongs to one business
- buyer name required
- contact fields optional

---

# 7. invoices

```text
invoices
--------
id
business_id
buyer_id
invoice_number
invoice_date
due_date
amount
currency
notes
dispute_status
created_at
updated_at
```

### Important

Payment status should generally be calculated from payments and invoice state rather than manually duplicated everywhere.

---

# 8. invoice_items

Optional for MVP.

If implemented:

```text
invoice_items
-------------
id
invoice_id
description
quantity
unit_price
amount
```

Do not build detailed accounting/inventory functionality around this table.

---

# 9. payments

```text
payments
--------
id
business_id
invoice_id
amount
payment_date
reference
notes
created_at
```

Rules:

- payment belongs to invoice
- payment belongs to business
- amount > 0
- authorization must be enforced

---

# 10. followups

```text
followups
---------
id
business_id
invoice_id
occurred_at
channel
contact_person
notes
buyer_response
next_followup_at
created_by
created_at
```

Channels:

```text
WHATSAPP
PHONE
EMAIL
MEETING
OTHER
```

---

# 11. commitments

```text
commitments
-----------
id
business_id
invoice_id
expected_payment_date
amount
source_channel
notes
created_by
created_at
```

Optional future:

```text
fulfilled_at
```

But fulfillment should not erase historical commitments.

---

# 12. evidence

```text
evidence
--------
id
business_id
invoice_id
category
file_name
storage_path
mime_type
file_size
description
uploaded_by
created_at
```

Categories:

```text
INVOICE
PURCHASE_ORDER
DELIVERY_PROOF
PAYMENT_COMMITMENT
COMMUNICATION
OTHER
```

---

# 13. activity_events

```text
activity_events
---------------
id
business_id
invoice_id
event_type
actor_user_id
metadata
created_at
```

Examples:

```text
INVOICE_CREATED
INVOICE_UPDATED
FOLLOWUP_RECORDED
COMMITMENT_RECORDED
EVIDENCE_ADDED
PAYMENT_RECORDED
STATUS_CHANGED
```

---

# 14. notifications

Optional for MVP.

If needed:

```text
notifications
-------------
id
business_id
user_id
type
title
message
read_at
created_at
```

---

# 15. Relationships

```text
Business 1 ─── N Buyers

Business 1 ─── N Invoices

Buyer 1 ─── N Invoices

Invoice 1 ─── N FollowUps

Invoice 1 ─── N Commitments

Invoice 1 ─── N Evidence

Invoice 1 ─── N Payments

Invoice 1 ─── N ActivityEvents
```

---

# 16. Derived Financial Values

## Paid amount

```text
SUM(payments.amount)
```

## Outstanding amount

```text
invoice.amount - SUM(payments.amount)
```

## Overdue

Conceptually:

```text
outstanding > 0
AND current_date > due_date
```

## Partial

```text
paid_amount > 0
AND outstanding > 0
```

## Paid

```text
outstanding = 0
```

---

# 17. Data Integrity Rules

### Invoice

- amount > 0
- due date should not be silently changed
- invoice belongs to valid buyer/business

### Payment

- amount > 0
- payment belongs to same business as invoice
- payment cannot cross business boundary

### Evidence

- evidence belongs to same business as invoice
- storage object must be authorized

### Follow-up

- follow-up belongs to same business as invoice

### Commitment

- commitment belongs to same business as invoice

---

# 18. Historical Integrity

Historical records should not be silently overwritten.

For example:

If buyer originally promised:

> 5 October

and later promises:

> 12 October

do not replace the first commitment with the second.

Record both.

This is essential to the timeline concept.

---

# 19. Suggested Indexes

Potential indexes:

```text
invoices(business_id)
invoices(business_id, due_date)
invoices(business_id, buyer_id)
invoices(business_id, invoice_number)

payments(invoice_id)
followups(invoice_id)
commitments(invoice_id)
evidence(invoice_id)
activity_events(invoice_id, created_at)
```

Exact indexing should be reviewed after implementation.

---

# 20. Deletion Strategy

For a prototype:

- use explicit delete permissions
- avoid destructive deletion of financial history where possible
- consider soft-delete for business records if needed

Evidence deletion should require authorization.

---

# 21. Demo Seed Data

Demo data should represent realistic workflows:

### Invoice A

- upcoming
- no follow-up

### Invoice B

- overdue
- follow-up recorded
- commitment recorded
- commitment missed

### Invoice C

- partially paid

### Invoice D

- paid

### Invoice E

- disputed flag

All demo data must be clearly fictional.

---

# 22. Future Data Model Extensions

Potential future entities:

- recurring invoices
- reminders
- integrations
- bank transactions
- communication events
- OCR extraction results
- AI extraction review
- accounting mappings

Do not implement these in MVP without scope approval.


---

# 11. Concrete Schema Guidance

## Core tables

### `users`
- `id uuid primary key`
- `firebase_uid text unique not null`
- `email text`
- `display_name text`
- `created_at timestamptz`
- `updated_at timestamptz`

### `businesses`
- `id uuid primary key`
- `name text not null`
- `timezone text not null default 'Asia/Kolkata'`
- `currency char(3) not null default 'INR'`
- timestamps

### `business_members`
- `business_id`
- `user_id`
- `role` constrained to `owner | admin | member`
- unique `(business_id,user_id)`

### `buyers`
- `id`
- `business_id`
- `name`
- `contact_name`
- `email`
- `phone`
- `notes`
- timestamps

### `invoices`
- `id`
- `business_id`
- `buyer_id`
- `invoice_number`
- `issue_date date`
- `due_date date`
- `amount_paise bigint`
- `currency char(3)`
- `status`
- `notes`
- timestamps
- unique `(business_id, invoice_number)`

### `payments`
- `id`
- `business_id`
- `invoice_id`
- `amount_paise bigint`
- `payment_date date`
- `reference text`
- `notes`
- timestamps

### `follow_ups`
- `id`
- `business_id`
- `invoice_id`
- `occurred_at timestamptz`
- `channel` constrained to `phone | whatsapp | email | meeting | other`
- `notes`

### `commitments`
- `id`
- `business_id`
- `invoice_id`
- `promised_date date`
- `promised_amount_paise bigint`
- `notes`
- `recorded_at timestamptz`

### `evidence`
- `id`
- `business_id`
- `invoice_id`
- `storage_path`
- `original_filename`
- `mime_type`
- `size_bytes`
- `uploaded_by`
- `created_at`

### `activity_events`
- `id`
- `business_id`
- `invoice_id`
- `event_type`
- `payload jsonb`
- `actor_user_id`
- `created_at`

## Derived values

`total_paid = SUM(payments.amount_paise)`.

`outstanding = invoice.amount_paise - total_paid`.

Do not persist redundant totals unless there is a measured performance reason. If cached, update transactionally.

## Integrity constraints

- payment cannot be negative
- invoice amount must be positive
- payment should not exceed invoice amount unless an explicit overpayment workflow exists
- buyer and invoice must belong to the same business
- evidence and events must belong to the same business as the invoice
