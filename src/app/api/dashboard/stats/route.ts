import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { getDashboardSummary } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const stats = await getDashboardSummary(user.uid);
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load dashboard metrics";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
