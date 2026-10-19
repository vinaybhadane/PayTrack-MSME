import { cookies, headers } from "next/headers";

export interface SessionUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  company: string | null;
}

export async function getServerSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("paytrack_session")?.value;

    if (sessionCookie) {
      try {
        const decoded = JSON.parse(
          Buffer.from(sessionCookie, "base64").toString("utf-8")
        );
        if (decoded && decoded.uid) {
          return {
            uid: decoded.uid,
            email: decoded.email || null,
            displayName: decoded.displayName || null,
            company: decoded.company || null,
          };
        }
      } catch {
        // Fallback
      }
    }

    // Check custom header if provided by client fetch
    const headersList = await headers();
    const headerUserId = headersList.get("x-user-id");
    if (headerUserId) {
      return {
        uid: headerUserId,
        email: headersList.get("x-user-email") || null,
        displayName: headersList.get("x-user-name") || null,
        company: headersList.get("x-user-company") || null,
      };
    }

    return null;
  } catch (error) {
    console.warn("[Session] Error resolving server session user:", error);
    return null;
  }
}
