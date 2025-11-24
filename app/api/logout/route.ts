import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({}).cookies.delete("refreshToken");
    return response;
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
