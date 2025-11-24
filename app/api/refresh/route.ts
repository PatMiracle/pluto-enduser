import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token found" },
        { status: 401 },
      );
    }

    const res = await axios.post(`${process.env.API_URL}auth/refresh`, {
      refreshToken,
    });

    const data = res.data;

    const response = NextResponse.json({ accessToken: data.accessToken });
    if (data.refreshToken) {
      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
