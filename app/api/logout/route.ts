import { STORAGE_KEYS } from "@/constants/storage-keys";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.delete(STORAGE_KEYS.REFRESH_TOKEN);
    response.cookies.delete(STORAGE_KEYS.ACCESS_TOKEN);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Sorry there was an error" },
      { status: error?.status || 500 },
    );
  }
}
