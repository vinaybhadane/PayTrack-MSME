import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { recordEvidence } from "@/lib/db";

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
    const { invoiceId, category, fileName, storagePath, mimeType, fileSize, description } = body;

    if (!invoiceId || !category || !fileName) {
      return NextResponse.json(
        { success: false, message: "Invoice ID, category, and file name are required." },
        { status: 400 }
      );
    }

    const evidence = await recordEvidence(user.uid, {
      invoiceId,
      category,
      fileName,
      storagePath,
      mimeType,
      fileSize: fileSize ? Number(fileSize) : undefined,
      description,
    });

    return NextResponse.json({
      success: true,
      evidence,
      message: `Evidence document '${evidence.fileName}' attached successfully.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record evidence";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
