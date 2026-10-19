import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { resetUserData } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    await resetUserData(user.uid);

    return NextResponse.json({
      success: true,
      message: "Your workspace has been cleared to a clean state.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to reset workspace";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
