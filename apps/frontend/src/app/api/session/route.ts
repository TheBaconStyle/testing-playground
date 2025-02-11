import { db } from "db";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken");

  const redirectUrl = req.nextUrl.clone();

  redirectUrl.pathname = "/";

  if (sessionToken?.value) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");

    const session = await db.query.sessions.findFirst({
      where: (ses, { eq, and, gt }) =>
        and(
          eq(ses.sessionToken, sessionToken.value),
          gt(ses.expires, new Date())
        ),
    });

    if (session && callbackUrl) {
      redirectUrl.href = callbackUrl;
    }
  }

  Array.from(redirectUrl.searchParams.keys()).forEach((k) =>
    redirectUrl.searchParams.delete(k)
  );

  return NextResponse.redirect(redirectUrl.href, { headers: req.headers });
}
