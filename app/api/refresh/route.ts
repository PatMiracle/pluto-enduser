import axios from "axios";
import { NextResponse } from "next/server";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get(
      STORAGE_KEYS.REFRESH_TOKEN,
    )?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token found" },
        { status: 401 },
      );
    }

    const res = await axios.post(`${process.env.API_URL}/auth/refresh`, {
      refreshToken,
    });

    const data = res.data;

    const response = NextResponse.json({ accessToken: data.accessToken });

    const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    response.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: oneDayFromNow,
    });

    response.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: oneDayFromNow,
    });

    return response;
  } catch (error: any) {
    const message = error?.response?.data?.error || error.message;

    const response = NextResponse.json({ message }, { status: error.status });

    response.cookies.delete(STORAGE_KEYS.REFRESH_TOKEN);
    return response;
  }
}
