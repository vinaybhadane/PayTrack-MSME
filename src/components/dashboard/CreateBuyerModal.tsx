"use client";

import React, { useState } from "react";
import { X, Building2, User, Phone, Mail, MapPin, Calendar, Check, AlertCircle } from "lucide-react";

interface CreateBuyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyerCreated: (buyer: any) => void;
}

export function CreateBuyerModal({ isOpen, onClose, onBuyerCreated }: CreateBuyerModalProps) {
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditPeriodDays, setCreditPeriodDays] = useState("30");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide the buyer legal entity name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          gstin: gstin.trim() || undefined,
          contactPerson: contactPerson.trim() || undefined,
          phone: phone.trim() || undefined,
          email: email.trim() || undefined,
          address: address.trim() || undefined,
          creditPeriodDays: Number(creditPeriodDays) || 30,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to register buyer");
      }
      onBuyerCreated(data.buyer);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating buyer";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#15121B] border border-[#292434] rounded-3xl p-6 shadow-2xl text-white my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292434]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-[#15121A] font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add New Buyer Entity</h2>
              <p className="text-xs text-[#958D9E]">B2B corporate or enterprise customer profile</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#958D9E] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Buyer / Company Legal Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tata AutoComp Systems Ltd"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Buyer GSTIN (15 Digits)
              </label>
              <input
                type="text"
                placeholder="27AAACT2948G1ZQ"
                maxLength={15}
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white uppercase font-mono placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Agreed Credit Period (Days)
              </label>
              <select
                value={creditPeriodDays}
                onChange={(e) => setCreditPeriodDays(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white focus:outline-none focus:border-brand"
              >
                <option value="15">15 Days (Prompt)</option>
                <option value="30">30 Days (Standard)</option>
                <option value="45">45 Days (MSMED Act Maximum)</option>
                <option value="60">60 Days (Requires Special Agreement)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Contact Person / Accounts Lead
              </label>
              <input
                type="text"
                placeholder="e.g. Vinay Bhadane"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                placeholder="+91 98220 14820"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Official Email for Invoicing & Follow-up
            </label>
            <input
              type="email"
              placeholder="accounts@buyercompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CFDC] mb-1.5">
              Plant / Office Address
            </label>
            <input
              type="text"
              placeholder="Plot / Industrial Area, City, State, PIN"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#1C1724] border border-[#292434] rounded-xl text-xs text-white placeholder-[#665F70] focus:outline-none focus:border-brand"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#292434]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#958D9E] hover:text-white bg-[#1C1724] border border-[#292434] hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#15121A] bg-brand hover:bg-brand-hover shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-[#15121A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{loading ? "Registering..." : "Save Buyer Entity"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
