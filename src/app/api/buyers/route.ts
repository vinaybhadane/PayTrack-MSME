import { NextRequest, NextResponse } from "next/server";
import { getServerSessionUser } from "@/lib/auth/session";
import { getBuyers, createBuyer } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || !user.uid) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const buyers = await getBuyers(user.uid);
    return NextResponse.json({
      success: true,
      buyers,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch buyers";
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
    const { name, gstin, pan, contactPerson, email, phone, address, creditPeriodDays, notes } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Buyer legal name is required." },
        { status: 400 }
      );
    }

    const buyer = await createBuyer(user.uid, {
      name,
      gstin,
      pan,
      contactPerson,
      email,
      phone,
      address,
      creditPeriodDays: Number(creditPeriodDays) || 30,
      notes,
    });

    return NextResponse.json({
      success: true,
      buyer,
      message: `Buyer '${buyer.name}' registered successfully.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create buyer";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
