import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { recordCommitment } from "@/lib/db";

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
    const { invoiceId, promisedDate, promisedAmount, sourceChannel, notes } = body;

    if (!invoiceId || !promisedDate) {
      return NextResponse.json(
        { success: false, message: "Invoice ID and promised payment date are required." },
        { status: 400 }
      );
    }

    const commitment = await recordCommitment(user.uid, {
      invoiceId,
      promisedDate,
      promisedAmount: promisedAmount ? Number(promisedAmount) : undefined,
      sourceChannel: sourceChannel || "whatsapp",
      notes,
    });

    return NextResponse.json({
      success: true,
      commitment,
      message: `Payment commitment logged for ${commitment.promisedDate}.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record commitment";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
