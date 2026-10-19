"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Search,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { CreateBuyerModal } from "@/components/dashboard/CreateBuyerModal";
import { RecordInvoiceModal } from "@/components/dashboard/RecordInvoiceModal";

interface Buyer {
  id: string;
  name: string;
  gstin?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  creditPeriodDays: number;
  notes?: string;
}

interface Invoice {
  id: string;
  buyerId: string;
  amount: number;
  outstandingAmount: number;
}

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateBuyerOpen, setIsCreateBuyerOpen] = useState(false);
  const [isRecordInvoiceOpen, setIsRecordInvoiceOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [buyersRes, invoicesRes] = await Promise.all([
        fetch("/api/buyers"),
        fetch("/api/invoices"),
      ]);
      const buyersData = await buyersRes.json();
      const invoicesData = await invoicesRes.json();

      if (buyersData.success) {
        setBuyers(buyersData.buyers || []);
      }
      if (invoicesData.success) {
        setInvoices(invoicesData.invoices || []);
      }
    } catch (err) {
      console.warn("Error fetching buyers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Exposure calculation per buyer
  const buyerExposure = new Map<string, { count: number; outstanding: number }>();
  for (const inv of invoices) {
    const curr = buyerExposure.get(inv.buyerId) || { count: 0, outstanding: 0 };
    curr.count += 1;
    curr.outstanding += inv.outstandingAmount;
    buyerExposure.set(inv.buyerId, curr);
  }

  const filteredBuyers = buyers.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.gstin && b.gstin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.contactPerson && b.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border text-brand text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Customer Entities Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Enterprise &amp; Corporate Buyers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#958D9E]">
            Directory of B2B corporate customers, contact leads &amp; agreed credit terms
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsCreateBuyerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-[#15121A] text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Buyer</span>
          </button>
        </div>
      </div>

      {/* Search & Counter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#958D9E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search buyer name, GSTIN, contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
          />
        </div>

        <div className="text-xs text-[#958D9E]">
          Showing <strong className="text-white">{filteredBuyers.length}</strong> registered buyers
        </div>
      </div>

      {/* Buyers Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[#958D9E]">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading buyer records...
        </div>
      ) : filteredBuyers.length === 0 ? (
        <div className="p-12 text-center bg-[#15121B] border border-[#292434] rounded-3xl">
          <Building2 className="w-8 h-8 text-brand mx-auto mb-2 opacity-80" />
          <h3 className="text-base font-bold text-white mb-1">No Buyers Found</h3>
          <p className="text-xs text-[#958D9E] max-w-sm mx-auto mb-4">
            {searchTerm
              ? "No buyer entities match your search keyword."
              : "Register your corporate and commercial buyers to issue credit invoices."}
          </p>
          <button
            type="button"
            onClick={() => setIsCreateBuyerOpen(true)}
            className="px-4 py-2 bg-brand text-[#15121A] rounded-xl text-xs font-bold"
          >
            Add First Buyer Entity
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuyers.map((b) => {
            const exp = buyerExposure.get(b.id) || { count: 0, outstanding: 0 };
            return (
              <div
                key={b.id}
                className="bg-[#15121B] border border-[#292434] hover:border-brand-border rounded-3xl p-5 sm:p-6 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft border border-brand-border px-2.5 py-0.5 rounded-full">
                      {b.creditPeriodDays} Days Credit
                    </span>
                    <span className="text-xs font-mono text-[#958D9E]">
                      {exp.count} {exp.count === 1 ? "Invoice" : "Invoices"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{b.name}</h3>
                  <div className="text-xs text-[#665F70] font-mono mt-0.5 mb-4">
                    {b.gstin || "GSTIN Not Specified"}
                  </div>

                  <div className="space-y-2 text-xs border-t border-[#292434] pt-3">
                    {b.contactPerson && (
                      <div className="text-[#958D9E] flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="text-white truncate">{b.contactPerson}</span>
                      </div>
                    )}
                    {b.phone && (
                      <div className="text-[#958D9E] flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="text-white font-mono">{b.phone}</span>
                      </div>
                    )}
                    {b.email && (
                      <div className="text-[#958D9E] flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="text-white truncate font-mono">{b.email}</span>
                      </div>
                    )}
                    {b.address && (
                      <div className="text-[#958D9E] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="text-[#958D9E] truncate">{b.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#292434] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#665F70] block uppercase tracking-wider">
                      Outstanding
                    </span>
                    <span className="text-sm font-bold text-white font-mono tabular-nums">
                      ₹{exp.outstanding.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard?search=${encodeURIComponent(b.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                  >
                    <span>View Invoices</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <CreateBuyerModal
        isOpen={isCreateBuyerOpen}
        onClose={() => setIsCreateBuyerOpen(false)}
        onBuyerCreated={fetchData}
      />

      <RecordInvoiceModal
        isOpen={isRecordInvoiceOpen}
        onClose={() => setIsRecordInvoiceOpen(false)}
        onInvoiceCreated={fetchData}
      />
    </div>
  );
}
