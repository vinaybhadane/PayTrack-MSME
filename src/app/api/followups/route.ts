import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { recordFollowUp } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { invoiceId, channel, contactPerson, notes, buyerResponse, nextFollowupAt } = body;

    if (!invoiceId || !channel || !notes) {
      return NextResponse.json(
        { success: false, message: "Invoice ID, communication channel, and notes are required." },
        { status: 400 }
      );
    }

    const followUp = await recordFollowUp(user.uid, {
      invoiceId,
      channel,
      contactPerson,
      notes,
      buyerResponse,
      nextFollowupAt,
    });

    return NextResponse.json({
      success: true,
      followUp,
      message: "Follow-up record logged successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record follow-up";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
