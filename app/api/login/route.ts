import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await axios.post(
      `https://pluto.reelest.com.ng/api/v1/auth/login/email`,
      body,
    );

    const data = await res.data;

    // backend should send access token in JSON & refresh token here
    const refreshToken = data.refreshToken;

    // set refresh token as HttpOnly cookie
    const response = NextResponse.json({ accessToken: data.accessToken });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    return error;
  }
}
