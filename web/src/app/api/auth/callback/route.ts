import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const registerResponse = await api.post("/register", {
    code,
  });

  const { token } = registerResponse.data;

  const redirectURL = redirectTo ?? new URL("/", request.url);

  // 60min * 1h * 1dia * 30dias
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // = 2 592 000

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  });
}
