import fs from "fs";
import path from "path";
import { getSupabaseServerClient, isSupabaseServerConfigured } from "@/lib/supabase/server";

export interface Business {
  id: string;
  userId: string;
  name: string;
  gstin?: string;
  pan?: string;
  msmeRegNumber?: string;
  timezone: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Buyer {
  id: string;
  userId: string;
  businessId: string;
  name: string;
  gstin?: string;
  pan?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  creditPeriodDays: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus =
  | "pending"
  | "promised"
  | "followup_due"
  | "partially_paid"
  | "paid"
  | "overdue_msmed"
  | "disputed";

export interface Invoice {
  id: string;
  userId: string;
  businessId: string;
  buyerId: string;
  buyerName: string;
  buyerGstin: string;
  invoiceNumber: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
  amount: number;    // In Rupees
  currency: string;
  status: InvoiceStatus;
  disputeStatus?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Computed values
  paidAmount: number;
  outstandingAmount: number;
  daysOutstanding: number;
  isOverdueMsmed: boolean;
  lastCommitmentText?: string;
  commitmentDate?: string;
  evidenceCount: number;
}

export interface Payment {
  id: string;
  userId: string;
  businessId: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMode: string;
  reference?: string;
  notes?: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  userId: string;
  businessId: string;
  invoiceId: string;
  occurredAt: string;
  channel: "phone" | "whatsapp" | "email" | "meeting" | "letter" | "other";
  contactPerson?: string;
  notes: string;
  buyerResponse?: string;
  nextFollowupAt?: string;
  createdAt: string;
}

export interface Commitment {
  id: string;
  userId: string;
  businessId: string;
  invoiceId: string;
  promisedDate: string;
  promisedAmount?: number;
  sourceChannel?: string;
  notes?: string;
  status: "active" | "fulfilled" | "broken" | "revised";
  createdAt: string;
}

export interface Evidence {
  id: string;
  userId: string;
  businessId: string;
  invoiceId: string;
  category: "invoice" | "purchase_order" | "delivery_proof" | "payment_commitment" | "communication" | "other";
  fileName: string;
  storagePath?: string;
  mimeType?: string;
  fileSize?: number;
  description?: string;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  businessId: string;
  invoiceId: string;
  eventType: string;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AttentionItem {
  id: string;
  type: "msmed_overdue" | "broken_commitment" | "commitment_due" | "followup_pending";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  invoiceId: string;
  invoiceNumber: string;
  buyerName: string;
  amount: number;
  dueDate: string;
}

export interface DashboardSummary {
  totalOutstanding: number;
  commitmentsDueThisWeek: number;
  overdueMsmedAmount: number;
  totalInvoicesCount: number;
  settledInvoicesCount: number;
  overdueCount: number;
  promisedCount: number;
  followupDueCount: number;
  commitmentKeptRate: number;
  needsAttention: AttentionItem[];
}

// ---------------------------------------------------------------------------
// Local File Persistence for resilient zero-downtime execution
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "paytrack_db.json");

interface LocalDatabase {
  businesses: Business[];
  buyers: Buyer[];
  invoices: Invoice[];
  payments: Payment[];
  followUps: FollowUp[];
  commitments: Commitment[];
  evidence: Evidence[];
  activityEvents: ActivityEvent[];
}

function ensureDataFile(): LocalDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const emptyDb: LocalDatabase = {
      businesses: [],
      buyers: [],
      invoices: [],
      payments: [],
      followUps: [],
      commitments: [],
      evidence: [],
      activityEvents: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(emptyDb, null, 2), "utf-8");
    return emptyDb;
  }
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {
      businesses: [],
      buyers: [],
      invoices: [],
      payments: [],
      followUps: [],
      commitments: [],
      evidence: [],
      activityEvents: [],
    };
  }
}

function saveLocalDatabase(db: LocalDatabase) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function calculateDaysDifference(dateString: string): number {
  try {
    const target = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - target.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  } catch {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Business Operations
// ---------------------------------------------------------------------------
export async function getOrCreateBusiness(userId: string, companyName?: string): Promise<Business> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        return {
          id: data.id,
          userId: data.user_id,
          name: data.name,
          gstin: data.gstin || "",
          pan: data.pan || "",
          msmeRegNumber: data.msme_reg_number || "",
          timezone: data.timezone || "Asia/Kolkata",
          currency: data.currency || "INR",
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }

      // Create new business
      const newBusinessName = companyName?.trim() || "Bhadane Enterprises";
      const { data: inserted, error: insertError } = await supabase
        .from("businesses")
        .insert({
          user_id: userId,
          name: newBusinessName,
          timezone: "Asia/Kolkata",
          currency: "INR",
        })
        .select()
        .single();

      if (inserted && !insertError) {
        return {
          id: inserted.id,
          userId: inserted.user_id,
          name: inserted.name,
          gstin: inserted.gstin || "",
          pan: inserted.pan || "",
          msmeRegNumber: inserted.msme_reg_number || "",
          timezone: inserted.timezone || "Asia/Kolkata",
          currency: inserted.currency || "INR",
          createdAt: inserted.created_at,
          updatedAt: inserted.updated_at,
        };
      }
    } catch (err) {
      console.warn("[Supabase] getOrCreateBusiness fallback:", err);
    }
  }

  // Local DB Fallback
  const db = ensureDataFile();
  let business = db.businesses.find((b) => b.userId === userId);
  if (!business) {
    business = {
      id: generateId("biz"),
      userId,
      name: companyName?.trim() || "Bhadane Enterprises",
      timezone: "Asia/Kolkata",
      currency: "INR",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.businesses.push(business);
    saveLocalDatabase(db);
  }
  return business;
}

// ---------------------------------------------------------------------------
// Buyer Operations
// ---------------------------------------------------------------------------
export async function getBuyers(userId: string): Promise<Buyer[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("buyers")
        .select("*")
        .eq("user_id", userId)
        .order("name", { ascending: true });

      if (data && !error) {
        return data.map((b) => ({
          id: b.id,
          userId: b.user_id,
          businessId: b.business_id,
          name: b.name,
          gstin: b.gstin || "",
          pan: b.pan || "",
          contactPerson: b.contact_person || "",
          email: b.email || "",
          phone: b.phone || "",
          address: b.address || "",
          creditPeriodDays: b.credit_period_days || 30,
          notes: b.notes || "",
          createdAt: b.created_at,
          updatedAt: b.updated_at,
        }));
      }
    } catch (err) {
      console.warn("[Supabase] getBuyers fallback:", err);
    }
  }

  const db = ensureDataFile();
  return db.buyers.filter((b) => b.userId === userId);
}

export async function createBuyer(
  userId: string,
  data: {
    name: string;
    gstin?: string;
    pan?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    creditPeriodDays?: number;
    notes?: string;
  }
): Promise<Buyer> {
  const business = await getOrCreateBusiness(userId);

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("buyers")
        .insert({
          user_id: userId,
          business_id: business.id,
          name: data.name.trim(),
          gstin: data.gstin?.trim() || null,
          pan: data.pan?.trim() || null,
          contact_person: data.contactPerson?.trim() || null,
          email: data.email?.trim() || null,
          phone: data.phone?.trim() || null,
          address: data.address?.trim() || null,
          credit_period_days: data.creditPeriodDays || 30,
          notes: data.notes?.trim() || null,
        })
        .select()
        .single();

      if (inserted && !error) {
        return {
          id: inserted.id,
          userId: inserted.user_id,
          businessId: inserted.business_id,
          name: inserted.name,
          gstin: inserted.gstin || "",
          pan: inserted.pan || "",
          contactPerson: inserted.contact_person || "",
          email: inserted.email || "",
          phone: inserted.phone || "",
          address: inserted.address || "",
          creditPeriodDays: inserted.credit_period_days || 30,
          notes: inserted.notes || "",
          createdAt: inserted.created_at,
          updatedAt: inserted.updated_at,
        };
      }
    } catch (err) {
      console.warn("[Supabase] createBuyer fallback:", err);
    }
  }

  const db = ensureDataFile();
  const newBuyer: Buyer = {
    id: generateId("buy"),
    userId,
    businessId: business.id,
    name: data.name.trim(),
    gstin: data.gstin?.trim() || "",
    pan: data.pan?.trim() || "",
    contactPerson: data.contactPerson?.trim() || "",
    email: data.email?.trim() || "",
    phone: data.phone?.trim() || "",
    address: data.address?.trim() || "",
    creditPeriodDays: data.creditPeriodDays || 30,
    notes: data.notes?.trim() || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.buyers.push(newBuyer);
  saveLocalDatabase(db);
  return newBuyer;
}

// ---------------------------------------------------------------------------
// Invoice Calculations & Operations
// ---------------------------------------------------------------------------
function augmentInvoice(
  inv: any,
  buyer: Buyer | undefined,
  payments: Payment[],
  commitments: Commitment[],
  evidence: Evidence[]
): Invoice {
  const invPayments = payments.filter((p) => p.invoiceId === inv.id);
  const paidAmount = invPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  const invoiceAmount = Number(inv.amount);
  const outstandingAmount = Math.max(0, invoiceAmount - paidAmount);

  // Credit age from issueDate
  const daysOutstanding = calculateDaysDifference(inv.issueDate || inv.issue_date);
  const isOverdueMsmed = daysOutstanding > 45 && outstandingAmount > 0;

  // Active commitment
  const invCommitments = commitments
    .filter((c) => c.invoiceId === inv.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestCommitment = invCommitments[0];

  const invEvidence = evidence.filter((e) => e.invoiceId === inv.id);

  // Status computation
  let status: InvoiceStatus = inv.status;
  if (outstandingAmount === 0 && invoiceAmount > 0) {
    status = "paid";
  } else if (paidAmount > 0 && outstandingAmount > 0) {
    status = "partially_paid";
  } else if (isOverdueMsmed) {
    status = "overdue_msmed";
  } else if (latestCommitment && latestCommitment.status === "active") {
    status = "promised";
  }

  return {
    id: inv.id,
    userId: inv.userId || inv.user_id,
    businessId: inv.businessId || inv.business_id,
    buyerId: inv.buyerId || inv.buyer_id,
    buyerName: buyer?.name || inv.buyer_name || "Unknown Buyer",
    buyerGstin: buyer?.gstin || inv.buyer_gstin || "Unregistered",
    invoiceNumber: inv.invoiceNumber || inv.invoice_number,
    issueDate: inv.issueDate || inv.issue_date,
    dueDate: inv.dueDate || inv.due_date,
    amount: invoiceAmount,
    currency: inv.currency || "INR",
    status,
    disputeStatus: inv.disputeStatus || inv.dispute_status || "none",
    notes: inv.notes || "",
    createdAt: inv.createdAt || inv.created_at,
    updatedAt: inv.updatedAt || inv.updated_at,
    paidAmount,
    outstandingAmount,
    daysOutstanding,
    isOverdueMsmed,
    lastCommitmentText: latestCommitment?.notes || (status === "promised" ? "Commitment recorded" : ""),
    commitmentDate: latestCommitment?.promisedDate,
    evidenceCount: invEvidence.length,
  };
}

export async function getInvoices(
  userId: string,
  options?: {
    status?: string;
    search?: string;
    buyerId?: string;
  }
): Promise<Invoice[]> {
  const db = ensureDataFile();
  const buyers = await getBuyers(userId);
  const buyerMap = new Map(buyers.map((b) => [b.id, b]));

  const supabase = getSupabaseServerClient();
  let rawInvoices: any[] = [];
  let userPayments: Payment[] = [];
  let userCommitments: Commitment[] = [];
  let userEvidence: Evidence[] = [];

  if (supabase) {
    try {
      let query = supabase.from("invoices").select("*").eq("user_id", userId);
      if (options?.buyerId) {
        query = query.eq("buyer_id", options.buyerId);
      }
      const { data: invData, error: invError } = await query.order("created_at", { ascending: false });

      if (invData && !invError) {
        rawInvoices = invData;

        // Fetch user payments
        const { data: pData } = await supabase.from("payments").select("*").eq("user_id", userId);
        if (pData) {
          userPayments = pData.map((p) => ({
            id: p.id,
            userId: p.user_id,
            businessId: p.business_id,
            invoiceId: p.invoice_id,
            amount: Number(p.amount),
            paymentDate: p.payment_date,
            paymentMode: p.payment_mode || "NEFT/RTGS",
            reference: p.reference,
            notes: p.notes,
            createdAt: p.created_at,
          }));
        }

        // Fetch user commitments
        const { data: cData } = await supabase.from("commitments").select("*").eq("user_id", userId);
        if (cData) {
          userCommitments = cData.map((c) => ({
            id: c.id,
            userId: c.user_id,
            businessId: c.business_id,
            invoiceId: c.invoice_id,
            promisedDate: c.promised_date,
            promisedAmount: c.promised_amount ? Number(c.promised_amount) : undefined,
            sourceChannel: c.source_channel,
            notes: c.notes,
            status: c.status,
            createdAt: c.created_at,
          }));
        }

        // Fetch user evidence
        const { data: eData } = await supabase.from("evidence").select("*").eq("user_id", userId);
        if (eData) {
          userEvidence = eData.map((e) => ({
            id: e.id,
            userId: e.user_id,
            businessId: e.business_id,
            invoiceId: e.invoice_id,
            category: e.category,
            fileName: e.file_name,
            storagePath: e.storage_path,
            mimeType: e.mime_type,
            fileSize: e.file_size,
            description: e.description,
            createdAt: e.created_at,
          }));
        }
      }
    } catch (err) {
      console.warn("[Supabase] getInvoices fallback:", err);
    }
  }

  // Fallback to local DB if Supabase returned empty or was not configured
  if (rawInvoices.length === 0) {
    rawInvoices = db.invoices.filter((i) => i.userId === userId);
    userPayments = db.payments.filter((p) => p.userId === userId);
    userCommitments = db.commitments.filter((c) => c.userId === userId);
    userEvidence = db.evidence.filter((e) => e.userId === userId);
  }

  let augmented = rawInvoices.map((inv) =>
    augmentInvoice(inv, buyerMap.get(inv.buyerId || inv.buyer_id), userPayments, userCommitments, userEvidence)
  );

  // Filter by search
  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    augmented = augmented.filter(
      (inv) =>
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.buyerName.toLowerCase().includes(q) ||
        inv.buyerGstin.toLowerCase().includes(q)
    );
  }

  // Filter by status
  if (options?.status && options.status !== "all") {
    augmented = augmented.filter((inv) => inv.status === options.status);
  }

  return augmented;
}

export async function getInvoiceById(userId: string, invoiceId: string): Promise<{
  invoice: Invoice;
  buyer: Buyer;
  payments: Payment[];
  followUps: FollowUp[];
  commitments: Commitment[];
  evidence: Evidence[];
  activityEvents: ActivityEvent[];
} | null> {
  const invoices = await getInvoices(userId);
  const invoice = invoices.find((i) => i.id === invoiceId);
  if (!invoice) return null;

  const buyers = await getBuyers(userId);
  const buyer = buyers.find((b) => b.id === invoice.buyerId) || {
    id: invoice.buyerId,
    userId,
    businessId: invoice.businessId,
    name: invoice.buyerName,
    gstin: invoice.buyerGstin,
    creditPeriodDays: 30,
    createdAt: invoice.createdAt,
    updatedAt: invoice.updatedAt,
  };

  const supabase = getSupabaseServerClient();
  let payments: Payment[] = [];
  let followUps: FollowUp[] = [];
  let commitments: Commitment[] = [];
  let evidence: Evidence[] = [];
  let activityEvents: ActivityEvent[] = [];

  if (supabase) {
    try {
      const [pRes, fRes, cRes, eRes, aRes] = await Promise.all([
        supabase.from("payments").select("*").eq("invoice_id", invoiceId).order("payment_date", { ascending: false }),
        supabase.from("follow_ups").select("*").eq("invoice_id", invoiceId).order("occurred_at", { ascending: false }),
        supabase.from("commitments").select("*").eq("invoice_id", invoiceId).order("created_at", { ascending: false }),
        supabase.from("evidence").select("*").eq("invoice_id", invoiceId).order("created_at", { ascending: false }),
        supabase.from("activity_events").select("*").eq("invoice_id", invoiceId).order("created_at", { ascending: true }),
      ]);

      if (pRes.data) {
        payments = pRes.data.map((p) => ({
          id: p.id,
          userId: p.user_id,
          businessId: p.business_id,
          invoiceId: p.invoice_id,
          amount: Number(p.amount),
          paymentDate: p.payment_date,
          paymentMode: p.payment_mode || "NEFT/RTGS",
          reference: p.reference,
          notes: p.notes,
          createdAt: p.created_at,
        }));
      }
      if (fRes.data) {
        followUps = fRes.data.map((f) => ({
          id: f.id,
          userId: f.user_id,
          businessId: f.business_id,
          invoiceId: f.invoice_id,
          occurredAt: f.occurred_at,
          channel: f.channel,
          contactPerson: f.contact_person,
          notes: f.notes,
          buyerResponse: f.buyer_response,
          nextFollowupAt: f.next_followup_at,
          createdAt: f.created_at,
        }));
      }
      if (cRes.data) {
        commitments = cRes.data.map((c) => ({
          id: c.id,
          userId: c.user_id,
          businessId: c.business_id,
          invoiceId: c.invoice_id,
          promisedDate: c.promised_date,
          promisedAmount: c.promised_amount ? Number(c.promised_amount) : undefined,
          sourceChannel: c.source_channel,
          notes: c.notes,
          status: c.status,
          createdAt: c.created_at,
        }));
      }
      if (eRes.data) {
        evidence = eRes.data.map((e) => ({
          id: e.id,
          userId: e.user_id,
          businessId: e.business_id,
          invoiceId: e.invoice_id,
          category: e.category,
          fileName: e.file_name,
          storagePath: e.storage_path,
          mimeType: e.mime_type,
          fileSize: e.file_size,
          description: e.description,
          createdAt: e.created_at,
        }));
      }
      if (aRes.data) {
        activityEvents = aRes.data.map((a) => ({
          id: a.id,
          userId: a.user_id,
          businessId: a.business_id,
          invoiceId: a.invoice_id,
          eventType: a.event_type,
          description: a.description,
          metadata: a.metadata,
          createdAt: a.created_at,
        }));
      }
    } catch (err) {
      console.warn("[Supabase] getInvoiceById relations fallback:", err);
    }
  }

  // Fallback to local
  const db = ensureDataFile();
  if (payments.length === 0) {
    payments = db.payments.filter((p) => p.invoiceId === invoiceId);
  }
  if (followUps.length === 0) {
    followUps = db.followUps.filter((f) => f.invoiceId === invoiceId);
  }
  if (commitments.length === 0) {
    commitments = db.commitments.filter((c) => c.invoiceId === invoiceId);
  }
  if (evidence.length === 0) {
    evidence = db.evidence.filter((e) => e.invoiceId === invoiceId);
  }
  if (activityEvents.length === 0) {
    activityEvents = db.activityEvents.filter((a) => a.invoiceId === invoiceId);
  }

  return {
    invoice,
    buyer,
    payments,
    followUps,
    commitments,
    evidence,
    activityEvents,
  };
}

export async function createInvoice(
  userId: string,
  data: {
    buyerId: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    amount: number;
    notes?: string;
  }
): Promise<Invoice> {
  const business = await getOrCreateBusiness(userId);
  const buyers = await getBuyers(userId);
  const buyer = buyers.find((b) => b.id === data.buyerId);
  if (!buyer) {
    throw new Error("Specified buyer does not exist.");
  }

  const invoiceAmount = Math.round(Number(data.amount));
  if (invoiceAmount <= 0) {
    throw new Error("Invoice amount must be greater than zero.");
  }

  const supabase = getSupabaseServerClient();
  let createdId = generateId("inv");

  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("invoices")
        .insert({
          user_id: userId,
          business_id: business.id,
          buyer_id: data.buyerId,
          invoice_number: data.invoiceNumber.trim().toUpperCase(),
          issue_date: data.issueDate,
          due_date: data.dueDate,
          amount: invoiceAmount,
          currency: "INR",
          status: "pending",
          notes: data.notes?.trim() || null,
        })
        .select()
        .single();

      if (inserted && !error) {
        createdId = inserted.id;

        // Log initial activity event
        await supabase.from("activity_events").insert({
          user_id: userId,
          business_id: business.id,
          invoice_id: createdId,
          event_type: "INVOICE_CREATED",
          description: `Invoice ${data.invoiceNumber.toUpperCase()} recorded for ₹${invoiceAmount.toLocaleString("en-IN")}.`,
          metadata: { amount: invoiceAmount, dueDate: data.dueDate },
        });
      }
    } catch (err) {
      console.warn("[Supabase] createInvoice fallback:", err);
    }
  }

  // Always mirror in local store for seamless consistency
  const db = ensureDataFile();
  const newInvoice: Invoice = {
    id: createdId,
    userId,
    businessId: business.id,
    buyerId: data.buyerId,
    buyerName: buyer.name,
    buyerGstin: buyer.gstin || "Unregistered",
    invoiceNumber: data.invoiceNumber.trim().toUpperCase(),
    issueDate: data.issueDate,
    dueDate: data.dueDate,
    amount: invoiceAmount,
    currency: "INR",
    status: "pending",
    disputeStatus: "none",
    notes: data.notes?.trim() || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paidAmount: 0,
    outstandingAmount: invoiceAmount,
    daysOutstanding: calculateDaysDifference(data.issueDate),
    isOverdueMsmed: calculateDaysDifference(data.issueDate) > 45,
    evidenceCount: 0,
  };

  db.invoices.push(newInvoice);
  db.activityEvents.push({
    id: generateId("act"),
    userId,
    businessId: business.id,
    invoiceId: createdId,
    eventType: "INVOICE_CREATED",
    description: `Invoice ${data.invoiceNumber.toUpperCase()} recorded for ₹${invoiceAmount.toLocaleString("en-IN")}.`,
    metadata: { amount: invoiceAmount, dueDate: data.dueDate },
    createdAt: new Date().toISOString(),
  });
  saveLocalDatabase(db);

  return newInvoice;
}

// ---------------------------------------------------------------------------
// Payment Recording
// ---------------------------------------------------------------------------
export async function recordPayment(
  userId: string,
  data: {
    invoiceId: string;
    amount: number;
    paymentDate: string;
    paymentMode?: string;
    reference?: string;
    notes?: string;
  }
): Promise<Payment> {
  const invoiceData = await getInvoiceById(userId, data.invoiceId);
  if (!invoiceData) {
    throw new Error("Invoice not found.");
  }

  const payAmount = Math.round(Number(data.amount));
  if (payAmount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const paymentId = generateId("pay");
  const businessId = invoiceData.invoice.businessId;

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("payments").insert({
        id: paymentId,
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        amount: payAmount,
        payment_date: data.paymentDate,
        payment_mode: data.paymentMode || "NEFT/RTGS",
        reference: data.reference?.trim() || null,
        notes: data.notes?.trim() || null,
      });

      await supabase.from("activity_events").insert({
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        event_type: "PAYMENT_RECORDED",
        description: `Payment of ₹${payAmount.toLocaleString("en-IN")} received via ${data.paymentMode || "NEFT/RTGS"}.`,
        metadata: { amount: payAmount, reference: data.reference },
      });
    } catch (err) {
      console.warn("[Supabase] recordPayment fallback:", err);
    }
  }

  const db = ensureDataFile();
  const payment: Payment = {
    id: paymentId,
    userId,
    businessId,
    invoiceId: data.invoiceId,
    amount: payAmount,
    paymentDate: data.paymentDate,
    paymentMode: data.paymentMode || "NEFT/RTGS",
    reference: data.reference?.trim() || "",
    notes: data.notes?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  db.payments.push(payment);
  db.activityEvents.push({
    id: generateId("act"),
    userId,
    businessId,
    invoiceId: data.invoiceId,
    eventType: "PAYMENT_RECORDED",
    description: `Payment of ₹${payAmount.toLocaleString("en-IN")} received via ${data.paymentMode || "NEFT/RTGS"}.`,
    metadata: { amount: payAmount, reference: data.reference },
    createdAt: new Date().toISOString(),
  });
  saveLocalDatabase(db);

  return payment;
}

// ---------------------------------------------------------------------------
// Commitment Logging
// ---------------------------------------------------------------------------
export async function recordCommitment(
  userId: string,
  data: {
    invoiceId: string;
    promisedDate: string;
    promisedAmount?: number;
    sourceChannel?: string;
    notes?: string;
  }
): Promise<Commitment> {
  const invoiceData = await getInvoiceById(userId, data.invoiceId);
  if (!invoiceData) {
    throw new Error("Invoice not found.");
  }

  const commitmentId = generateId("com");
  const businessId = invoiceData.invoice.businessId;

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("commitments").insert({
        id: commitmentId,
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        promised_date: data.promisedDate,
        promised_amount: data.promisedAmount ? Math.round(Number(data.promisedAmount)) : null,
        source_channel: data.sourceChannel || "whatsapp",
        notes: data.notes?.trim() || null,
        status: "active",
      });

      await supabase.from("activity_events").insert({
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        event_type: "COMMITMENT_LOGGED",
        description: `Buyer promised payment on ${data.promisedDate} via ${data.sourceChannel || "communication"}.`,
        metadata: { promisedDate: data.promisedDate, promisedAmount: data.promisedAmount },
      });
    } catch (err) {
      console.warn("[Supabase] recordCommitment fallback:", err);
    }
  }

  const db = ensureDataFile();
  const commitment: Commitment = {
    id: commitmentId,
    userId,
    businessId,
    invoiceId: data.invoiceId,
    promisedDate: data.promisedDate,
    promisedAmount: data.promisedAmount ? Math.round(Number(data.promisedAmount)) : undefined,
    sourceChannel: data.sourceChannel || "whatsapp",
    notes: data.notes?.trim() || "",
    status: "active",
    createdAt: new Date().toISOString(),
  };

  db.commitments.push(commitment);
  db.activityEvents.push({
    id: generateId("act"),
    userId,
    businessId,
    invoiceId: data.invoiceId,
    eventType: "COMMITMENT_LOGGED",
    description: `Buyer promised payment on ${data.promisedDate} via ${data.sourceChannel || "communication"}.`,
    metadata: { promisedDate: data.promisedDate, promisedAmount: data.promisedAmount },
    createdAt: new Date().toISOString(),
  });
  saveLocalDatabase(db);

  return commitment;
}

// ---------------------------------------------------------------------------
// Follow-up Logging
// ---------------------------------------------------------------------------
export async function recordFollowUp(
  userId: string,
  data: {
    invoiceId: string;
    channel: "phone" | "whatsapp" | "email" | "meeting" | "letter" | "other";
    contactPerson?: string;
    notes: string;
    buyerResponse?: string;
    nextFollowupAt?: string;
  }
): Promise<FollowUp> {
  const invoiceData = await getInvoiceById(userId, data.invoiceId);
  if (!invoiceData) {
    throw new Error("Invoice not found.");
  }

  const followUpId = generateId("fol");
  const businessId = invoiceData.invoice.businessId;

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("follow_ups").insert({
        id: followUpId,
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        channel: data.channel,
        contact_person: data.contactPerson?.trim() || null,
        notes: data.notes.trim(),
        buyer_response: data.buyerResponse?.trim() || null,
        next_followup_at: data.nextFollowupAt || null,
      });

      await supabase.from("activity_events").insert({
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        event_type: "FOLLOWUP_LOGGED",
        description: `Follow-up conducted via ${data.channel.toUpperCase()}: ${data.notes.slice(0, 100)}.`,
        metadata: { channel: data.channel, nextFollowupAt: data.nextFollowupAt },
      });
    } catch (err) {
      console.warn("[Supabase] recordFollowUp fallback:", err);
    }
  }

  const db = ensureDataFile();
  const followUp: FollowUp = {
    id: followUpId,
    userId,
    businessId,
    invoiceId: data.invoiceId,
    occurredAt: new Date().toISOString(),
    channel: data.channel,
    contactPerson: data.contactPerson?.trim() || "",
    notes: data.notes.trim(),
    buyerResponse: data.buyerResponse?.trim() || "",
    nextFollowupAt: data.nextFollowupAt,
    createdAt: new Date().toISOString(),
  };

  db.followUps.push(followUp);
  db.activityEvents.push({
    id: generateId("act"),
    userId,
    businessId,
    invoiceId: data.invoiceId,
    eventType: "FOLLOWUP_LOGGED",
    description: `Follow-up conducted via ${data.channel.toUpperCase()}: ${data.notes.slice(0, 100)}.`,
    metadata: { channel: data.channel, nextFollowupAt: data.nextFollowupAt },
    createdAt: new Date().toISOString(),
  });
  saveLocalDatabase(db);

  return followUp;
}

// ---------------------------------------------------------------------------
// Evidence Attachment
// ---------------------------------------------------------------------------
export async function recordEvidence(
  userId: string,
  data: {
    invoiceId: string;
    category: "invoice" | "purchase_order" | "delivery_proof" | "payment_commitment" | "communication" | "other";
    fileName: string;
    storagePath?: string;
    mimeType?: string;
    fileSize?: number;
    description?: string;
  }
): Promise<Evidence> {
  const invoiceData = await getInvoiceById(userId, data.invoiceId);
  if (!invoiceData) {
    throw new Error("Invoice not found.");
  }

  const evidenceId = generateId("evi");
  const businessId = invoiceData.invoice.businessId;

  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("evidence").insert({
        id: evidenceId,
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        category: data.category,
        file_name: data.fileName.trim(),
        storage_path: data.storagePath || null,
        mime_type: data.mimeType || "application/pdf",
        file_size: data.fileSize || 0,
        description: data.description?.trim() || null,
      });

      await supabase.from("activity_events").insert({
        user_id: userId,
        business_id: businessId,
        invoice_id: data.invoiceId,
        event_type: "EVIDENCE_ATTACHED",
        description: `Evidence document '${data.fileName}' attached under category ${data.category.replace("_", " ").toUpperCase()}.`,
        metadata: { category: data.category, fileName: data.fileName },
      });
    } catch (err) {
      console.warn("[Supabase] recordEvidence fallback:", err);
    }
  }

  const db = ensureDataFile();
  const evidence: Evidence = {
    id: evidenceId,
    userId,
    businessId,
    invoiceId: data.invoiceId,
    category: data.category,
    fileName: data.fileName.trim(),
    storagePath: data.storagePath || "",
    mimeType: data.mimeType || "application/pdf",
    fileSize: data.fileSize || 0,
    description: data.description?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  db.evidence.push(evidence);
  db.activityEvents.push({
    id: generateId("act"),
    userId,
    businessId,
    invoiceId: data.invoiceId,
    eventType: "EVIDENCE_ATTACHED",
    description: `Evidence document '${data.fileName}' attached under category ${data.category.replace("_", " ").toUpperCase()}.`,
    metadata: { category: data.category, fileName: data.fileName },
    createdAt: new Date().toISOString(),
  });
  saveLocalDatabase(db);

  return evidence;
}

// ---------------------------------------------------------------------------
// Dashboard Statistics & Needs Attention Surface
// ---------------------------------------------------------------------------
export async function getDashboardSummary(userId: string): Promise<DashboardSummary> {
  const invoices = await getInvoices(userId);

  let totalOutstanding = 0;
  let overdueMsmedAmount = 0;
  let settledCount = 0;
  let overdueCount = 0;
  let promisedCount = 0;
  let followupDueCount = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate start and end of current week
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));

  let commitmentsDueThisWeek = 0;
  const needsAttention: AttentionItem[] = [];

  for (const inv of invoices) {
    if (inv.outstandingAmount > 0) {
      totalOutstanding += inv.outstandingAmount;

      if (inv.isOverdueMsmed) {
        overdueMsmedAmount += inv.outstandingAmount;
        overdueCount++;

        needsAttention.push({
          id: `att_msmed_${inv.id}`,
          type: "msmed_overdue",
          severity: "high",
          title: `Overdue MSMED 45-Day Limit (${inv.daysOutstanding} days)`,
          description: `Invoice ${inv.invoiceNumber} for ${inv.buyerName} exceeds statutory 45-day credit period. Outstanding: ₹${inv.outstandingAmount.toLocaleString("en-IN")}.`,
          invoiceId: inv.id,
          invoiceNumber: inv.invoiceNumber,
          buyerName: inv.buyerName,
          amount: inv.outstandingAmount,
          dueDate: inv.dueDate,
        });
      }

      if (inv.status === "promised") {
        promisedCount++;
        if (inv.commitmentDate) {
          const comDate = new Date(inv.commitmentDate);
          comDate.setHours(0, 0, 0, 0);
          if (comDate >= startOfWeek && comDate <= endOfWeek) {
            commitmentsDueThisWeek += inv.outstandingAmount;
          }
          if (comDate < today) {
            needsAttention.push({
              id: `att_broken_${inv.id}`,
              type: "broken_commitment",
              severity: "high",
              title: "Payment Commitment Missed",
              description: `${inv.buyerName} promised payment by ${inv.commitmentDate}, but invoice remains unpaid. Follow-up required.`,
              invoiceId: inv.id,
              invoiceNumber: inv.invoiceNumber,
              buyerName: inv.buyerName,
              amount: inv.outstandingAmount,
              dueDate: inv.dueDate,
            });
          } else {
            const diffDays = Math.ceil((comDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays <= 3) {
              needsAttention.push({
                id: `att_com_${inv.id}`,
                type: "commitment_due",
                severity: "medium",
                title: `Commitment Due in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
                description: `₹${inv.outstandingAmount.toLocaleString("en-IN")} promised on ${inv.commitmentDate}. Prepare payment confirmation check.`,
                invoiceId: inv.id,
                invoiceNumber: inv.invoiceNumber,
                buyerName: inv.buyerName,
                amount: inv.outstandingAmount,
                dueDate: inv.dueDate,
              });
            }
          }
        }
      } else if (inv.status === "followup_due") {
        followupDueCount++;
        needsAttention.push({
          id: `att_fol_${inv.id}`,
          type: "followup_pending",
          severity: "low",
          title: "Follow-up Call Scheduled",
          description: `No recent commitment logged for ${inv.buyerName} on ${inv.invoiceNumber}. Connect with accounts team.`,
          invoiceId: inv.id,
          invoiceNumber: inv.invoiceNumber,
          buyerName: inv.buyerName,
          amount: inv.outstandingAmount,
          dueDate: inv.dueDate,
        });
      }
    } else {
      settledCount++;
    }
  }

  // Commitment resolution rate
  const totalCommitmentInvoices = promisedCount + settledCount;
  const commitmentKeptRate =
    totalCommitmentInvoices > 0 ? Math.round((settledCount / totalCommitmentInvoices) * 100) : 100;

  return {
    totalOutstanding,
    commitmentsDueThisWeek,
    overdueMsmedAmount,
    totalInvoicesCount: invoices.length,
    settledInvoicesCount: settledCount,
    overdueCount,
    promisedCount,
    followupDueCount,
    commitmentKeptRate,
    needsAttention: needsAttention.slice(0, 6),
  };
}

// ---------------------------------------------------------------------------
// Demo MSME Seed Generator (strictly scoped to the requesting user's UID)
// ---------------------------------------------------------------------------
export async function seedUserDemoData(userId: string, companyName?: string): Promise<void> {
  const business = await getOrCreateBusiness(userId, companyName || "Bhadane Precision Machining Pvt Ltd");

  // Create 4 realistic Indian B2B buyers
  const b1 = await createBuyer(userId, {
    name: "Tata AutoComp Systems Ltd",
    gstin: "27AAACT2948G1ZQ",
    contactPerson: "Vinay Bhadane (Commercial Accounts)",
    email: "vinay.bhadane@tataautocomp.com",
    phone: "+91 98220 14820",
    address: "Plot 32, Chakan Industrial Area, Phase II, Pune 410501",
    creditPeriodDays: 30,
  });

  const b2 = await createBuyer(userId, {
    name: "Bharat Gears Precision Corp",
    gstin: "06AAACB1100F1Z4",
    contactPerson: "Virender Grover (Procurement GM)",
    email: "virender.grover@bharatgears.co.in",
    phone: "+91 98110 32911",
    address: "20 KM Stone, Mathura Road, Faridabad 121006",
    creditPeriodDays: 45,
  });

  const b3 = await createBuyer(userId, {
    name: "Kirloskar Oil Engines Foundry",
    gstin: "27AAACK1010L1Z9",
    contactPerson: "Amol Deshmukh (Commercial Finance)",
    email: "amol.deshmukh@kirloskar.com",
    phone: "+91 97640 55192",
    address: "Laxmanrao Kirloskar Road, Khadki, Pune 411003",
    creditPeriodDays: 30,
  });

  const b4 = await createBuyer(userId, {
    name: "Godrej Aerospace Components",
    gstin: "27AAACG0000A1Z5",
    contactPerson: "Sunil Nair (Vendor Relations)",
    email: "sunil.nair@godrej.com",
    phone: "+91 98200 48201",
    address: "Pirojshanagar, Vikhroli East, Mumbai 400079",
    creditPeriodDays: 30,
  });

  // Helper date calculators
  const formatIsoDate = (d: Date) => d.toISOString().split("T")[0];
  const now = new Date();

  // Invoice 1: Tata AutoComp (Payment Promised for upcoming Friday)
  const d1Issue = new Date(now);
  d1Issue.setDate(now.getDate() - 22);
  const d1Due = new Date(now);
  d1Due.setDate(now.getDate() + 5);
  const inv1 = await createInvoice(userId, {
    buyerId: b1.id,
    invoiceNumber: "INV-2026-088",
    issueDate: formatIsoDate(d1Issue),
    dueDate: formatIsoDate(d1Due),
    amount: 320000,
    notes: "Forged transmission hubs dispatch batch #440.",
  });
  const d1Promise = new Date(now);
  d1Promise.setDate(now.getDate() + 3);
  await recordCommitment(userId, {
    invoiceId: inv1.id,
    promisedDate: formatIsoDate(d1Promise),
    promisedAmount: 320000,
    sourceChannel: "whatsapp",
    notes: "Accounts officer confirmed voucher is in batch payment run for Friday RTGS.",
  });
  await recordEvidence(userId, {
    invoiceId: inv1.id,
    category: "delivery_proof",
    fileName: "Lorry_Receipt_VRL_Logistics_99482.pdf",
    fileSize: 482910,
    description: "Signed transporter receipt with buyer security stamp.",
  });

  // Invoice 2: Bharat Gears (Overdue >45 Days MSMED Section 15 violation with partial payment)
  const d2Issue = new Date(now);
  d2Issue.setDate(now.getDate() - 52);
  const d2Due = new Date(now);
  d2Due.setDate(now.getDate() - 7);
  const inv2 = await createInvoice(userId, {
    buyerId: b2.id,
    invoiceNumber: "INV-2026-074",
    issueDate: formatIsoDate(d2Issue),
    dueDate: formatIsoDate(d2Due),
    amount: 485000,
    notes: "High-precision spur gears for planetary gearbox assembly.",
  });
  const d2Pay = new Date(now);
  d2Pay.setDate(now.getDate() - 12);
  await recordPayment(userId, {
    invoiceId: inv2.id,
    amount: 150000,
    paymentDate: formatIsoDate(d2Pay),
    paymentMode: "NEFT/RTGS",
    reference: "HDFCN26284910384",
    notes: "Partial payment released against materials inspection clearance.",
  });
  await recordFollowUp(userId, {
    invoiceId: inv2.id,
    channel: "phone",
    contactPerson: "Virender Grover",
    notes: "Called accounts manager; informed him credit has crossed 50 days (MSMED Section 15 statutory limit).",
    buyerResponse: "Promised balance ₹3,35,000 will be credited in next Wednesday RTGS cycle.",
    nextFollowupAt: formatIsoDate(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
  });
  await recordEvidence(userId, {
    invoiceId: inv2.id,
    category: "purchase_order",
    fileName: "PO_BharatGears_BG26_0941.pdf",
    fileSize: 620100,
    description: "Original purchase order with 45-day payment clause.",
  });

  // Invoice 3: Kirloskar Oil Engines (Follow-up due, fresh invoice)
  const d3Issue = new Date(now);
  d3Issue.setDate(now.getDate() - 14);
  const d3Due = new Date(now);
  d3Due.setDate(now.getDate() + 16);
  const inv3 = await createInvoice(userId, {
    buyerId: b3.id,
    invoiceNumber: "INV-2026-092",
    issueDate: formatIsoDate(d3Issue),
    dueDate: formatIsoDate(d3Due),
    amount: 195000,
    notes: "Cast iron engine head flanges with QA metallurgical test certificate.",
  });
  await recordFollowUp(userId, {
    invoiceId: inv3.id,
    channel: "email",
    contactPerson: "Amol Deshmukh",
    notes: "Sent invoice copy and delivery challan acknowledging receipt.",
    buyerResponse: "Material logged in SAP ERP, inspection under process.",
  });
  await recordEvidence(userId, {
    invoiceId: inv3.id,
    category: "invoice",
    fileName: "Tax_Invoice_INV_2026_092.pdf",
    fileSize: 310500,
    description: "Digitally stamped GST invoice with IRN QR code.",
  });

  // Invoice 4: Godrej Aerospace (Fully Paid / Settled)
  const d4Issue = new Date(now);
  d4Issue.setDate(now.getDate() - 35);
  const d4Due = new Date(now);
  d4Due.setDate(now.getDate() - 5);
  const inv4 = await createInvoice(userId, {
    buyerId: b4.id,
    invoiceNumber: "INV-2026-069",
    issueDate: formatIsoDate(d4Issue),
    dueDate: formatIsoDate(d4Due),
    amount: 540000,
    notes: "Titanium alloy precision brackets for rocket assembly payload.",
  });
  const d4Pay = new Date(now);
  d4Pay.setDate(now.getDate() - 2);
  await recordPayment(userId, {
    invoiceId: inv4.id,
    amount: 540000,
    paymentDate: formatIsoDate(d4Pay),
    paymentMode: "NEFT/RTGS",
    reference: "AXIS2026101700948",
    notes: "Full payment received on due date without dispute.",
  });
  await recordEvidence(userId, {
    invoiceId: inv4.id,
    category: "delivery_proof",
    fileName: "Godrej_Stores_Receipt_SR994.pdf",
    fileSize: 740120,
    description: "Inspection acceptance note from aerospace QA inspection cell.",
  });
}

// ---------------------------------------------------------------------------
// Reset User Data
// ---------------------------------------------------------------------------
export async function resetUserData(userId: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("activity_events").delete().eq("user_id", userId);
      await supabase.from("evidence").delete().eq("user_id", userId);
      await supabase.from("commitments").delete().eq("user_id", userId);
      await supabase.from("follow_ups").delete().eq("user_id", userId);
      await supabase.from("payments").delete().eq("user_id", userId);
      await supabase.from("invoices").delete().eq("user_id", userId);
      await supabase.from("buyers").delete().eq("user_id", userId);
    } catch (err) {
      console.warn("[Supabase] resetUserData fallback:", err);
    }
  }

  const db = ensureDataFile();
  db.activityEvents = db.activityEvents.filter((a) => a.userId !== userId);
  db.evidence = db.evidence.filter((e) => e.userId !== userId);
  db.commitments = db.commitments.filter((c) => c.userId !== userId);
  db.followUps = db.followUps.filter((f) => f.userId !== userId);
  db.payments = db.payments.filter((p) => p.userId !== userId);
  db.invoices = db.invoices.filter((i) => i.userId !== userId);
  db.buyers = db.buyers.filter((b) => b.userId !== userId);
  saveLocalDatabase(db);
}
