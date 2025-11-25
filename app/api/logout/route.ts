import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.delete("refreshToken");

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Sorry there was an error" },
      { status: error?.status || 500 },
    );
  }
}
