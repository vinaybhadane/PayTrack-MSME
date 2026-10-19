import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { getInvoiceById } from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const result = await getInvoiceById(user.uid, id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Invoice not found or access denied." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch invoice details";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
