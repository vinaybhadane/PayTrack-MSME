import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, user } = body;

    if (!user || (!idToken && !user.uid)) {
      return NextResponse.json(
        { success: false, message: "Valid user credentials are required to establish session." },
        { status: 400 }
      );
    }

    const sessionPayload = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.name || "",
      company: user.company || "",
      photoURL: user.photoURL || "",
      token: idToken || "dev-session-token",
      createdAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Serialize session payload into a base64 encoded string
    const sessionString = Buffer.from(JSON.stringify(sessionPayload)).toString("base64");

    const response = NextResponse.json({
      success: true,
      message: "Session established successfully.",
      user: {
        uid: sessionPayload.uid,
        email: sessionPayload.email,
        displayName: sessionPayload.displayName,
        company: sessionPayload.company,
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set("paytrack_session", sessionString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
