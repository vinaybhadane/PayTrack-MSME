import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton with Ambient Brand Glow */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-brand/30 animate-spin" />
            <div className="h-5 w-40 bg-brand/20 rounded-full" />
          </div>
          <div className="h-8 w-72 bg-[#292434] rounded-xl" />
          <div className="h-4 w-48 bg-[#1C1724] rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-[#292434] rounded-full" />
          <div className="h-10 w-36 bg-[#292434] rounded-full" />
        </div>
      </div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#15121B] border border-[#292434] rounded-2xl p-5 space-y-3 shadow-sm relative overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-[#292434] rounded" />
              <div className="h-4 w-4 bg-brand/40 rounded-full" />
            </div>
            <div className="h-7 w-32 bg-[#292434] rounded-lg" />
            <div className="h-3 w-40 bg-[#1C1724] rounded" />
          </div>
        ))}
      </div>

      {/* Central Table Skeleton */}
      <div className="bg-[#15121B] border border-[#292434] rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b border-[#292434]">
          <div className="space-y-2">
            <div className="h-5 w-48 bg-[#292434] rounded" />
            <div className="h-3 w-64 bg-[#1C1724] rounded" />
          </div>
          <div className="h-8 w-56 bg-[#1C1724] rounded-xl" />
        </div>

        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="h-14 bg-[#1C1724]/70 border border-[#292434] rounded-xl flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-4 bg-[#292434] rounded" />
                <div className="w-36 h-4 bg-[#292434] rounded" />
              </div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-4 bg-[#292434] rounded" />
                <div className="w-20 h-5 bg-[#292434] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
