import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // send HttpOnly cookie
  });

  const data = await response.json();

  return NextResponse.json({ accessToken: data.accessToken });
}
