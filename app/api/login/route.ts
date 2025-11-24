import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await axios.post(
      `${process.env.API_URL}auth/login/email`,
      body,
    );

    const data = res.data;

    const refreshToken = data.refreshToken;

    const response = NextResponse.json({ accessToken: data.accessToken });

    // set refresh token as HttpOnly cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: any) {
    const message = error?.response?.data?.error || error.message;

    return NextResponse.json({ message }, { status: error.status });
  }
}
