import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { getInvoices, createInvoice, recordEvidence } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const buyerId = searchParams.get("buyerId") || undefined;

    const invoices = await getInvoices(user.uid, { status, search, buyerId });
    return NextResponse.json({
      success: true,
      invoices,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch invoices";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

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
    const {
      buyerId,
      invoiceNumber,
      issueDate,
      dueDate,
      amount,
      notes,
      fileName,
      fileData,
      fileSize,
      fileMimeType,
    } = body;

    if (!buyerId || !invoiceNumber || !issueDate || !dueDate || !amount) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide all required invoice fields: buyer, invoice number, issue date, due date, and amount.",
        },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invoice amount must be a positive number." },
        { status: 400 }
      );
    }

    const invoice = await createInvoice(user.uid, {
      buyerId,
      invoiceNumber,
      issueDate,
      dueDate,
      amount: parsedAmount,
      notes,
    });

    // If an invoice document or file was uploaded during creation, record it in the evidence table
    if (fileName) {
      try {
        await recordEvidence(user.uid, {
          invoiceId: invoice.id,
          category: "invoice",
          fileName: fileName.trim(),
          storagePath: fileData || undefined,
          mimeType: fileMimeType || "application/pdf",
          fileSize: fileSize || 350000,
          description: "Original tax invoice document uploaded at creation time.",
        });
      } catch (eviErr) {
        console.warn("[Invoice API] Could not auto-attach document:", eviErr);
      }
    }

    return NextResponse.json({
      success: true,
      invoice,
      message: `Invoice ${invoice.invoiceNumber} recorded successfully.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create invoice";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
