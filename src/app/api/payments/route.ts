import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { recordPayment } from "@/lib/db";

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
    const { invoiceId, amount, paymentDate, paymentMode, reference, notes } = body;

    if (!invoiceId || !amount || !paymentDate) {
      return NextResponse.json(
        { success: false, message: "Please specify invoice ID, payment amount, and payment date." },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Payment amount must be greater than zero." },
        { status: 400 }
      );
    }

    const payment = await recordPayment(user.uid, {
      invoiceId,
      amount: parsedAmount,
      paymentDate,
      paymentMode,
      reference,
      notes,
    });

    return NextResponse.json({
      success: true,
      payment,
      message: `Payment of ₹${payment.amount.toLocaleString("en-IN")} recorded successfully.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record payment";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
