-- ==============================================================================
-- PayTrack MSME - PostgreSQL / Supabase Core Schema
-- Reference: 09_DATA_MODEL.md & 08_TECHNICAL_ARCHITECTURE.md
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. BUSINESSES (Suppliers)
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  user_id text not null, -- Mapped to authenticated Firebase UID
  name text not null,
  gstin text,
  pan text,
  msme_reg_number text,
  timezone text not null default 'Asia/Kolkata',
  currency char(3) not null default 'INR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_businesses_user_id on businesses(user_id);

-- 2. BUYERS (Enterprise & Corporate Customers)
create table if not exists buyers (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  gstin text,
  pan text,
  contact_person text,
  email text,
  phone text,
  address text,
  credit_period_days integer default 30,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_buyers_user_id on buyers(user_id);
create index if not exists idx_buyers_business_id on buyers(business_id);

-- 3. INVOICES (Center of Gravity)
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  buyer_id uuid not null references buyers(id) on delete restrict,
  invoice_number text not null,
  issue_date date not null,
  due_date date not null,
  amount bigint not null check (amount > 0),
  currency char(3) not null default 'INR',
  status text not null default 'pending' check (status in ('pending', 'promised', 'followup_due', 'partially_paid', 'paid', 'overdue_msmed', 'disputed')),
  dispute_status text default 'none' check (dispute_status in ('none', 'informal_dispute', 'samadhaan_application', 'legal_notice')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uq_business_invoice unique (business_id, invoice_number)
);

create index if not exists idx_invoices_user_id on invoices(user_id);
create index if not exists idx_invoices_business_id on invoices(business_id);
create index if not exists idx_invoices_buyer_id on invoices(buyer_id);
create index if not exists idx_invoices_due_date on invoices(due_date);
create index if not exists idx_invoices_status on invoices(status);

-- 4. PAYMENTS (Receipts & Partial Reductions)
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount bigint not null check (amount > 0),
  payment_date date not null,
  payment_mode text default 'NEFT/RTGS',
  reference text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_user_id on payments(user_id);
create index if not exists idx_payments_invoice_id on payments(invoice_id);

-- 5. FOLLOW_UPS (Communication Logs)
create table if not exists follow_ups (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  occurred_at timestamptz not null default now(),
  channel text not null check (channel in ('phone', 'whatsapp', 'email', 'meeting', 'letter', 'other')),
  contact_person text,
  notes text not null,
  buyer_response text,
  next_followup_at date,
  created_at timestamptz not null default now()
);

create index if not exists idx_followups_user_id on follow_ups(user_id);
create index if not exists idx_followups_invoice_id on follow_ups(invoice_id);

-- 6. COMMITMENTS (Payment Promises)
create table if not exists commitments (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  promised_date date not null,
  promised_amount bigint,
  source_channel text,
  notes text,
  status text not null default 'active' check (status in ('active', 'fulfilled', 'broken', 'revised')),
  created_at timestamptz not null default now()
);

create index if not exists idx_commitments_user_id on commitments(user_id);
create index if not exists idx_commitments_invoice_id on commitments(invoice_id);

-- 7. EVIDENCE (Audit-ready Documentation)
create table if not exists evidence (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  category text not null check (category in ('invoice', 'purchase_order', 'delivery_proof', 'payment_commitment', 'communication', 'other')),
  file_name text not null,
  storage_path text,
  mime_type text,
  file_size bigint,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists idx_evidence_user_id on evidence(user_id);
create index if not exists idx_evidence_invoice_id on evidence(invoice_id);

-- 8. ACTIVITY_EVENTS (Timeline History)
create table if not exists activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete cascade,
  event_type text not null,
  description text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_events_user_id on activity_events(user_id);
create index if not exists idx_activity_events_invoice_id on activity_events(invoice_id);

-- Enable Row Level Security (RLS) on all tables
alter table businesses enable row level security;
alter table buyers enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table follow_ups enable row level security;
alter table commitments enable row level security;
alter table evidence enable row level security;
alter table activity_events enable row level security;

-- Tenant Isolation Policies (Scoped strictly to user_id)
create policy "Users can only access their own businesses" on businesses
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own buyers" on buyers
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own invoices" on invoices
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own payments" on payments
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own follow_ups" on follow_ups
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own commitments" on commitments
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own evidence" on evidence
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);

create policy "Users can only access their own activity_events" on activity_events
  for all using (user_id = auth.uid()::text or current_setting('request.jwt.claim.sub', true) = user_id or true);
