import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const res = await axios.get(`${process.env.API_URL}user/me`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const data = res.data;

    return NextResponse.json(data);
  } catch (error: any) {
    const message = error?.response?.data?.error || error.message;

    const response = NextResponse.json({ message }, { status: error.status });

    if (error.status == 401) {
      response.cookies.delete("refreshToken");
    }

    return response;
  }
}
