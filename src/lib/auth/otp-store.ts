import crypto from "crypto";

interface OtpEntry {
  email: string;
  name: string;
  company?: string;
  otp: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
  registrationToken?: string;
}

// Global in-memory cache for OTP records
// Uses globalThis to survive HMR in Next.js development
const globalForOtp = globalThis as unknown as {
  otpStore?: Map<string, OtpEntry>;
};

const otpStore: Map<string, OtpEntry> = globalForOtp.otpStore || new Map();
if (process.env.NODE_ENV !== "production") {
  globalForOtp.otpStore = otpStore;
}

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of otpStore.entries()) {
      if (entry.expiresAt < now) {
        otpStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Generate a cryptographically secure 6-digit numeric OTP
 */
export function generateOtp(): string {
  const buffer = crypto.randomBytes(3);
  const num = (buffer.readUIntBE(0, 3) % 900000) + 100000;
  return num.toString();
}

/**
 * Save an OTP record with a 10-minute validity
 */
export function createOtpRecord(params: {
  email: string;
  name: string;
  company?: string;
}): { otp: string; expiresAt: number } {
  const normalizedEmail = params.email.trim().toLowerCase();
  const otp = generateOtp();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(normalizedEmail, {
    email: normalizedEmail,
    name: params.name.trim(),
    company: params.company?.trim(),
    otp,
    expiresAt,
    attempts: 0,
    verified: false,
  });

  return { otp, expiresAt };
}

/**
 * Verify an OTP entered by the user
 */
export function verifyOtpCode(email: string, enteredOtp: string): {
  success: boolean;
  message: string;
  registrationToken?: string;
  name?: string;
  company?: string;
} {
  const normalizedEmail = email.trim().toLowerCase();
  const record = otpStore.get(normalizedEmail);

  if (!record) {
    return {
      success: false,
      message: "No active verification request found. Please request a new OTP.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalizedEmail);
    return {
      success: false,
      message: "The verification code has expired. Please request a new one.",
    };
  }

  if (record.attempts >= 5) {
    otpStore.delete(normalizedEmail);
    return {
      success: false,
      message: "Too many incorrect attempts. Please request a new verification code.",
    };
  }

  record.attempts += 1;

  if (record.otp !== enteredOtp.trim()) {
    const remaining = 5 - record.attempts;
    return {
      success: false,
      message: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  }

  // Generate a temporary one-time registration token (valid for 15 mins)
  const registrationToken = crypto.randomBytes(32).toString("hex");
  record.verified = true;
  record.registrationToken = registrationToken;
  record.expiresAt = Date.now() + 15 * 60 * 1000;

  return {
    success: true,
    message: "Email successfully verified.",
    registrationToken,
    name: record.name,
    company: record.company,
  };
}

/**
 * Validate that a registration token is valid for the given email
 */
export function validateRegistrationToken(email: string, token: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  const record = otpStore.get(normalizedEmail);
  if (!record) return false;

  const isValid =
    record.verified &&
    record.registrationToken === token &&
    Date.now() <= record.expiresAt;

  if (isValid) {
    // Consume the token so it cannot be re-used
    otpStore.delete(normalizedEmail);
  }

  return isValid;
}

/**
 * Send Transactional Email with Brevo REST API v3
 */
export async function sendBrevoOtpEmail(params: {
  toEmail: string;
  toName: string;
  otp: string;
}): Promise<{ success: boolean; simulated?: boolean; message?: string }> {
  const { toEmail, toName, otp } = params;
  const apiKey = process.env.BREVO_API_KEY?.trim();

  // If no API key or placeholder key, simulate in development
  const isKeyConfigured = Boolean(apiKey && !apiKey.includes("your_") && apiKey.length > 10);

  if (!isKeyConfigured) {
    console.log(`\n============================================================`);
    console.log(`[PAYTRACK OTP - BREVO DEV SIMULATION]`);
    console.log(`Recipient: ${toName} <${toEmail}>`);
    console.log(`Verification OTP: [ ${otp} ]`);
    console.log(`Valid for 10 minutes.`);
    console.log(`Note: Provide your BREVO_API_KEY in .env.local to send real emails.`);
    console.log(`============================================================\n`);

    return {
      success: true,
      simulated: true,
      message: `Verification code generated. (Dev Mode: code is ${otp})`,
    };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "verify@paytrack.in";
  const senderName = process.env.BREVO_SENDER_NAME || "PayTrack MSME";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PayTrack MSME Verification</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0F0D13; color: #FFFFFF; margin: 0; padding: 40px 20px;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #15121B; border: 1px solid #292434; border-radius: 16px; padding: 36px 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; background-color: #FFD758; color: #15121B; font-weight: 800; font-size: 14px; padding: 6px 14px; border-radius: 9999px; letter-spacing: 0.05em; text-transform: uppercase;">
        PayTrack MSME
      </div>
      <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 20px 0 8px 0; letter-spacing: -0.02em;">Verify your email address</h1>
      <p style="color: #958D9E; font-size: 14px; margin: 0;">Hi ${toName}, use the verification code below to complete your PayTrack MSME account setup.</p>
    </div>

    <div style="background-color: #1C1724; border: 1px dashed rgba(255, 215, 88, 0.4); border-radius: 12px; padding: 24px; text-align: center; margin: 28px 0;">
      <div style="font-size: 12px; font-weight: 600; color: #FFD758; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Your 6-Digit One-Time Code</div>
      <div style="font-size: 38px; font-weight: 800; letter-spacing: 0.25em; color: #FFFFFF; font-family: 'Courier New', Courier, monospace;">${otp}</div>
      <div style="font-size: 12px; color: #958D9E; margin-top: 8px;">Valid for 10 minutes • Single use only</div>
    </div>

    <p style="color: #665F70; font-size: 13px; line-height: 1.6; margin: 0 0 20px 0;">
      If you did not request this verification code, you can safely ignore this email. Someone may have typed your email address by mistake.
    </p>

    <div style="border-top: 1px solid #292434; padding-top: 20px; text-align: center; color: #665F70; font-size: 12px;">
      PayTrack MSME • B2B Invoice Timeline & Commitment Platform
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey as string,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: `Your PayTrack MSME Verification Code: ${otp}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Brevo API Error]", response.status, errorData);
      throw new Error(errorData.message || `Failed to send email via Brevo (Status ${response.status})`);
    }

    return {
      success: true,
      message: "Verification code sent to your email.",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error("[sendBrevoOtpEmail]", message);
    return {
      success: false,
      message,
    };
  }
}
