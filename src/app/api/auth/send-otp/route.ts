import { NextRequest, NextResponse } from "next/server";
import { createOtpRecord, sendBrevoOtpEmail } from "@/lib/auth/otp-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // Create OTP record in memory
    const { otp } = createOtpRecord({
      email,
      name,
      company,
    });

    // Send email using Brevo
    const emailResult = await sendBrevoOtpEmail({
      toEmail: email,
      toName: name,
      otp,
    });

    if (!emailResult.success && !emailResult.simulated) {
      return NextResponse.json(
        {
          success: false,
          message: emailResult.message || "Failed to deliver verification code. Please verify email and try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: emailResult.simulated
        ? `Verification code generated. (Dev Mode: OTP is ${otp})`
        : "Verification code sent to your email.",
      simulated: emailResult.simulated,
      devOtp: emailResult.simulated ? otp : undefined,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
