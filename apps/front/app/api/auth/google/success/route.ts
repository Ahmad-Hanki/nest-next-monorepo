import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryString = req.nextUrl.searchParams.toString();
  if (!queryString)
    return NextResponse.redirect(`http://localhost:3000/signin`);

  // extract accessToken from query params
  const accessToken = searchParams.get("accessToken");
  const role = searchParams.get("role");
  if (!accessToken || !role)
    return NextResponse.redirect(`http://localhost:3000/signin`);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/auth/verify`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status == 401) {
    throw new Error("Invalid access token");
  }

  const cookie = await cookies();

  cookie.set("_auth", JSON.stringify({ accessToken, role }), {
    maxAge: 60 * 60 * 24, // 7 days
  });

  return NextResponse.redirect("http://localhost:3000");
}
