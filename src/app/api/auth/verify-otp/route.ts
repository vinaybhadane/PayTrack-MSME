import { NextRequest, NextResponse } from "next/server";
import { verifyOtpCode } from "@/lib/auth/otp-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const verificationResult = verifyOtpCode(email, otp);

    if (!verificationResult.success) {
      return NextResponse.json(
        { success: false, message: verificationResult.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email successfully verified.",
      registrationToken: verificationResult.registrationToken,
      name: verificationResult.name,
      company: verificationResult.company,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
