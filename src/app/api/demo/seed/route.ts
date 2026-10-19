import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { seedUserDemoData } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    await seedUserDemoData(user.uid, user.company || undefined);

    return NextResponse.json({
      success: true,
      message: "Realistic MSME test invoices, buyers, commitments, and evidence loaded into your workspace.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to seed demo data";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
