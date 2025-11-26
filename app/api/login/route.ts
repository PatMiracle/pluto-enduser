import { STORAGE_KEYS } from "@/constants/storage-keys";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await axios.post(
      `${process.env.API_URL}/auth/login/email`,
      body,
    );

    const data = res.data;

    const response = NextResponse.json({ accessToken: data.accessToken });

    response.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    response.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log(error);

    const message = error?.response?.data?.error || error.message;

    return NextResponse.json({ message }, { status: error.status || 500 });
  }
}
